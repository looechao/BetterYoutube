// ==UserScript==
// @name         Bilibili Tabview
// @namespace    looechao
// @version      1.8.0
// @description  B 站视频页/连播页右栏标签化，主页三列精简布局，动态页纯色背景，隐藏广告（仿 Tabview YouTube）
// @match        https://www.bilibili.com/
// @match        https://www.bilibili.com/?*
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/list/*
// @match        https://www.bilibili.com/medialist/play/*
// @match        https://t.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @run-at       document-start
// @grant        none
// ==/UserScript==

/* ── 1.7.0 改了什么（四处都是实测出来的，不是看代码猜的） ──────────────────
   1. 首页分支的 hostname 比较写成了 markdown 链接形式，永远为 false。注释里写着「已修」，
      代码其实没改，首页样式整整失效了一个版本；而且首页会掉进视频页逻辑空转三十多秒。
   2. 轮询的 waited 计时放在可见性门禁之前，后台标签页里照样累加。于是「后台打开视频 →
      二十秒后切回来」这条路径上 waited 早已 >12000，12 秒兜底直接短路掉 pageSettled，
      立刻 build、立刻搬 DOM——下面那一大段注释防的就是这个崩溃，却被计时器自己放了进来。
   3. MutationObserver 挂在整个 .video-container-v1 上，而 #playerWrap 就在它的 subtree 里。
      实测播放中 4 秒收到 16 条记录，全部来自 .bpx-player-ctrl-time-current（时间码每 250ms
      换一次文本节点），光这一个节点就让 sync 以 4Hz 常驻，每次带一组 getBoundingClientRect
      强制回流，实测单次约 3.6ms。弹幕反而一条都不贡献（canvas 渲染，不走 DOM）。
   4. 宽屏播放器比 B 站原生宽 148px。实测原生宽屏是「左栏 543 + 栏间距 30 + 右栏 350 = 923」，
      容器 1091 居中、两侧各留 84px；而 width:100% 把这两侧留白吃掉撑到 1071，顶到屏幕边。
      现在宽度由 --btv-lw 算出，想退回旧行为把 WIDE_FULL 置 true。
   另外两处顺手修的：--btv-up 的基准换成 inner（宽屏下它是 sticky，才是 UP 面板真正的包含块，
   原来拿右栏当基准只是因为两者矩形碰巧重合）；byWidth 改成从算出来的宽度推导，不再去量被
   自己 CSS 撑开的 #playerWrap——那是读自己刚写的值，一旦测量早于 CSS 生效就会掉到下限 360px。

   1.7.1 又修三处：
   5. 宽屏下 UP 主卡片压在标题上。左栏被撑到播放器那么宽之后，标题和 meta 行跟着变成整行，
      而 UP 卡片是绝对定位钉在这一行右侧的——B 站原生宽屏里标题区只有左栏原生宽度（543），
      两者中间隔着一大段，根本不会撞，是我们撑宽以后才撞的，实测重叠 150px。
   6. 窗口尺寸变了、但那一刻播放器正处在 mini 或全屏态时，layoutWide 会在量左栏之前就 return，
      nativeLeftW 的缓存于是永久过期，宽屏宽度一直按旧窗口算（实测见过 1248 赖在该是 923 的位置上，
      要等下一次碰巧经过 normal 才自愈）。现在 resize 只置脏标记，下次 layoutWide 补测。
   7. 禁用小窗模式，见下面 b_miniplayer 那句和 CSS 里的兜底。

   1.7.2 三处都是量出来的：
   8. 非宽屏时整个布局顶满视口、左栏贴到 x=0。容器是 justify-content:center 且自带 10px 左右
      padding，原生靠两侧各 22px 的留白把内容居中；而 slack 是拿 clientWidth（含 padding）直接
      减出来的，把这段本该空着的留白也算成了「富余空间」，右栏于是从 350 撑到 393，正好吃满。
      现在先扣掉 padding 和 SIDE_GUTTER，富余不够就老实退回原生的 350。
   9. 宽屏时工具栏和标签栏之间空 48px：.video-resource-list 这类块在多数视频上是 0 高的占位，
      却各自带着上下 24px 的 margin。原来那条 :empty 选不中它们（里面有个空的子节点）。
  10. 宽屏时 UP 卡片看着没贴右——容器右边缘其实早就和播放器齐平了，是关注按钮在自己那行里
      靠左排，右边空出 133px。现在让按钮行右对齐（按钮会从撑开的 200px 收回到内容宽度）。
   顺带把 measureLeft 收紧成只在宽屏态下量：实测 B 站给左栏的宽度两种模式不一样（普通 668、
   宽屏 543），拿普通模式的值去算宽屏宽度会多 125px。当前时序下碰巧没踩到，但不能指望它。

   1.7.3 只修一件事：1.7.2 那条关注按钮的规则是错的。按钮行是三层结构，
   而宽度上限 max-width:200px 挂在最里面的 .follow-btn 上；flex:0 0 auto 把中间层压成了
   纯文字宽度 77px，按钮挤成一小块。改法见下面 --btv-followw 那段注释。

   1.7.4 也只修一件事：UP 卡片宽度从固定的 --btv-rw 改成 max-content。
   固定宽度下卡片 350 宽，而里面的内容只占得下 260——头像钉在最左边、文字和按钮贴在右边，
   中间白白空出 90px，整张卡片散成两半，看着就像头像没跟着右对齐。

   1.7.5 新增自动宽屏，见 AUTO_WIDE_UNDER 和 maybeAutoWide。

   1.7.6 修多人视频（创作团队）在宽屏下的三处：
  11. 中间层的类名有两种，membersinfo-normal 和 membersinfo-wide，而脚本只写了前者，
      于是 height:100% 那条在一部分视频上从来没命中过——面板压不下去，一直贴在顶栏底下。
  12. 面板压扁后只有 84 高，而这类视频的标题区有 150，顶部对齐就差出 50px。
      撑满标题区高度让那条 flex 行自己居中，面板中心和标题中心只差 10px。
  13. B 站自己的横滑遮罩宽 115px、外加一个滚动箭头，在这个 384 宽的容器里要吃掉 30%，
      把最后一位成员整个盖住。我们本来就有 28px 的渐隐做提示，把它们藏掉。

   1.7.7 收尾多人视频的两笔：
  14. 上一版那个 [class*="membersinfo"] 通配写漏了 > ——每个成员卡片也叫
      membersinfo-upcard(-wrap)，于是它们一起被拉成整块高度，内容只能贴顶、上下留白全没了。
      这就是「非宽屏时距离顶部不对」的真身：不是 padding，是高度被通配选择器误伤。
  15. 多人视频在宽屏下，B 站给标题区写死了 height:150px 加 51px 的 padding-top
      （非宽屏只有 104 / 22）。那块地是它留给自己把创作团队面板放到标题上方用的，
      而我们已经把面板挪到右上角，66px 就纯空着白推播放器。压回内容高度后播放器上移 66px。

   1.8.0 = 1.7.8 + 顶栏入口精简。1.7.9 试过的「顶栏自动隐藏」按要求撤掉了，
   TOP 保持 64，整套布局和 1.7.8 一致；只留下砍掉几个用不上入口的那几行，
   而且提到所有分支之前注入，首页、动态页、视频页一起生效。

   1.7.8 调这一块的观感：1.7.7 把标题区压到刚好等于成员卡片的高度，一点余量都没有，太挤。
   改成「成员卡片高度 + 上下各 TITLE_PAD」，再用 flex 把标题块在其中垂直居中；
   卡片那边本来就居中在同一个高度里，于是两条中心线重合——实测都落在 120，差 0。
   ──────────────────────────────────────────────────────────────────── */

(() => {
  'use strict';

  // 顶栏里用不上的入口。放在所有分支 return 之前注入，首页 / 动态页 / 视频页一起生效。
  // 这些 li 的 class 全是同一个 v-popover-wrap，没法按类名区分，只能按 href 认。
  // 想再砍「大赛」或「下载客户端」，照着加一行就行（分别是 blackboard/era 和 app.bilibili.com）。
  const navStyle = document.createElement('style');
  navStyle.id = 'btv-nav';
  navStyle.textContent = `
    .bili-header .left-entry li:has(a[href*="game.bilibili.com"]),
    .bili-header .left-entry li:has(a[href*="show.bilibili.com"]),
    .bili-header .left-entry li:has(a[href*="manga.bilibili.com"]),
    .bili-header .left-entry li:has(a[href*="/match/home"]){display:none!important}
  `;
  (document.head || document.documentElement).appendChild(navStyle);

  // 主页只注入样式，不运行视频页的标签栏和轮询逻辑。
  // hostname 必须是裸域名字符串。1.6.x 这里写成了 markdown 链接形式，分支永远不成立。
  if (location.hostname === 'www.bilibili.com' && location.pathname === '/') {
    const style = document.createElement('style');
    style.id = 'btv-home-style';
    style.textContent = `
      /* 1. 左侧推广轮播 */
      .recommended-swipe { display: none !important; }

      /* 2. 直播推荐卡 */
      .floor-single-card, .bili-live-card { display: none !important; }

      /* 3. 右下浮动按钮、adblock 提示 */
      .palette-button-wrap, .adblock-tips { display: none !important; }

      /* 4. 顶部横幅压成纯色导航条 */
      .bili-header__banner { height: 64px !important; min-height: 64px !important; background: #fff !important; }
      .bili-header__banner .banner-img,
      .bili-header__banner picture,
      .bili-header__banner .animated-banner,
      .bili-header__banner video { display: none !important; }
      .bili-header .bili-header__bar { background: #fff !important; box-shadow: 0 1px 0 rgba(0,0,0,.06); }
      .bili-header .bili-header__bar .left-entry a,
      .bili-header .bili-header__bar .left-entry span,
      .bili-header .bili-header__bar .right-entry a,
      .bili-header .bili-header__bar .right-entry span,
      .bili-header .bili-header__bar .right-entry div { color: #18191C !important; }
      .bili-header .bili-header__bar svg { color: #18191C !important; }

      /* 5. 三列布局 + 修掉轮播留下的 margin 错位 */
      .container.is-version8 {
        grid-template-columns: repeat(3, 1fr) !important;
        column-gap: 16px !important;
        row-gap: 40px !important;
        align-items: start !important;
      }
      .container.is-version8 > .feed-card,
      .container.is-version8 > .bili-feed-card,
      .container.is-version8 > .floor-single-card { margin-top: 0 !important; }

      /* 6. 背景 */
      html, body { background-color: #F0F1F3 !important; }

      /* 7. 标题 */
      .bili-video-card__info--tit,
      .bili-video-card__info--tit a {
        font-size: 16px !important;
        font-weight: 500 !important;
        line-height: 23px !important;
        color: #0F0F0F !important;
        letter-spacing: 0 !important;
      }
      .bili-video-card__info--bottom,
      .bili-video-card__info--owner { font-size: 13px !important; }
    `;
    (document.head || document.documentElement).appendChild(style);
    return;
  }

  // 动态页只改背景，不运行视频页的标签栏和轮询逻辑。
  if (location.hostname === 't.bilibili.com') {
    const style = document.createElement('style');
    style.id = 'btv-dynamic-background';
    style.textContent = `
      html, body, .bgc { background-color: #F0F1F3 !important; background-image: none !important; }
      .bg { background-image: none !important; background-color: transparent !important; }
    `;
    (document.head || document.documentElement).appendChild(style);
    return;
  }

  // 禁用小窗模式。B 站把这个开关存在 localStorage 的 b_miniplayer 里，'0' = 关。
  // 实测它为 '0' 时，播放中把播放器滚出视口也不会弹小窗（滚到 y=-639 仍然是 wide，
  // .bpx-player-mini-warp 保持 display:none，页面上找不到任何 position:fixed 的播放器节点）。
  // 每次进页面都写一遍，免得被播放器设置面板或别的端同步改回去；CSS 里还有一层兜底。
  try { localStorage.setItem('b_miniplayer', '0'); } catch {}

  // ────────────────────────────────────────────────────────────────────────
  // 布局适配层
  //
  // 普通视频页（/video/BVxxx）和连播页（/list/mlxxx、/medialist/play/xxx）是两套完全
  // 不同的组件树，除了左栏的简介/标签/评论三件套碰巧同名，其余选择器一个都对不上：
  //
  //                      /video/                      /list/
  //   外层 flex 容器      .video-container-v1          #mirror-vdcon.playlist-container
  //   左栏               .left-container              .playlist-container--left
  //   右栏               .right-container             .playlist-container--right
  //   右栏内层滚动壳      .right-container-inner       （没有，右栏本身就是壳）
  //   合集/连播列表       .video-pod                   .action-list-container
  //   推荐视频           .recommend-list-v1           .recommend-list-container
  //   推荐外壳           .rcmd-tab                    （没有，两块是右栏的平级子节点）
  //   弹幕列表           .video-pod-above-modules     #danmukuBox
  //
  // 以前所有选择器都是硬编码的 /video/ 那一套，所以在连播页上 build() 的前置条件
  // $('.right-container-inner') 永远为 null，轮询跑满 200 次后静默退出，整个脚本无效。
  // 现在全部走 L，CSS 用插值拼出来，逻辑只有一份。
  // ────────────────────────────────────────────────────────────────────────
  const IS_LIST = /^\/(list|medialist\/play)\//.test(location.pathname);

  const L = IS_LIST ? {
    container: '#mirror-vdcon',
    left:      '.playlist-container--left',
    right:     '.playlist-container--right',
    // 连播页右栏没有内层壳，右栏自己就是那个 flex 列容器。
    inner:     '.playlist-container--right',
    pod:       '.action-list-container',
    podBody:   '.action-list-body',
    rcmd:      '.recommend-list-container',
    // 合集与推荐是右栏的两个平级子节点，不共用外壳，所以不需要 /video/ 那套两级显隐。
    rcmdShell: null,
    danmaku:   '#danmukuBox',
    // 右栏是 flex item 且父容器（被左栏撑得很高）远高于一屏，
    // 可以直接用 sticky 粘住，不必像 /video/ 那样退而求其次用 fixed。
    sticky:    true,
  } : {
    container: '.video-container-v1',
    left:      '.left-container',
    right:     '.right-container',
    inner:     '.right-container-inner',
    pod:       '.video-pod',
    podBody:   '.video-pod__body',
    rcmd:      '.recommend-list-v1',
    rcmdShell: '.rcmd-tab',
    danmaku:   '.video-pod-above-modules',
    sticky:    false,
  };

  const RIGHT_W = 420;            // 非宽屏时右栏加宽的上限
  const RIGHT_NATIVE = 350;       // B 站右栏原生宽度；宽屏宽度 = 原生左栏 + 栏间距 + 这个值
  const WIDE_FULL = false;        // true = 宽屏时播放器占满容器（1.6.x 的旧行为，会吃掉页面两侧留白）
  const TOP = 64;                 // B 站顶栏高度（两种页面一致）
  const SIDE_GUTTER = 24;         // 非宽屏时右栏加宽后，页面两侧至少要留下的边距
  const AUTO_WIDE_UNDER = 700;    // 普通模式下播放器窄于这个值就自动切宽屏；设 0 关掉
  const TITLE_PAD = 14;           // 宽屏下多人视频标题区的上下留白
  const WIDE_BOTTOM = 48;         // 宽屏播放器底部留白：24 刚好塞满一屏，48 让标签栏露出一截，100+ 接近 B 站原生保守尺寸
  const STORE_KEY = 'btv-tab';

  // 标签 → 右栏里对应的节点。合集和推荐留在 Vue 原位不搬，只用 CSS 显隐；
  // 简介/标签/评论是从左栏搬过来的（#commentapp 是独立挂载点，简介和标签有固定 class，
  // Vue 原地 patch 不重建）。这三个 id/class 在两种页面上是一样的。
  const TABS = [
    { name: '简介', sel: '#btv-desc' },
    { name: '合集', sel: L.pod },
    { name: '评论', sel: '#commentapp' },
    { name: '视频', sel: L.rcmd },
  ];

  const css = `
    /* 广告 */
    .slide-ad-exp,.activity-m-v1,.video-card-ad-small,.ad-report,.ad-floor-exp,.vcd,
    ${L.inner} .right-bottom-banner{display:none!important}
    ${L.rcmdShell ? `${L.rcmdShell}:empty{display:none!important}` : ''}
    /* 弹幕列表不再作为标签，整个藏掉 */
    ${L.inner} ${L.danmaku}{display:none!important}

    /* 布局：右栏加宽。注意左栏宽度绝对不能动——B 站是先按窗口和高度算出播放器尺寸，再把左栏设成播放器那么宽；
       强行把左栏撑宽只会让播放器右边留出一条黑色空白（#playerWrap 的黑底）。
       右栏宽度取「本来就空着的富余空间」，最多 ${RIGHT_W}px、最少还原成 B 站的 ${RIGHT_NATIVE}px，由 JS 写进 --btv-rw */
    ${L.container} ${L.right}{width:var(--btv-rw,${RIGHT_NATIVE}px)!important;flex:0 0 auto}
    /* 播放器尺寸不碰：B 站按窗口宽算的播放器会比缩窄后的左栏宽几个像素，吃进栏间距里看不出来；
       强行 width:100% 会把宽屏模式一起废掉 */
    /* 面板整体钉住不动：UP 主卡片和标签栏固定，只有下面当前那个内容块自己滚
       （当前标签之外的块是 display:none，不参与 flex）。 */
    ${L.inner}{height:calc(100vh - ${TOP}px);display:flex!important;flex-direction:column;overflow:hidden!important}
    ${L.sticky ? `
    /* 连播页：右栏是 #mirror-vdcon 的 flex item，父容器被左栏（播放器+简介+评论）撑得远高于一屏，
       所以 sticky 有足够的粘附空间。必须配 align-self:flex-start，否则 stretch 会把它拉成父容器那么高，
       sticky 就没有可粘的余量了。 */
    html:not(.btv-wide) ${L.right}{align-self:flex-start!important;position:sticky!important;top:${TOP}px!important}
    ` : `
    /* 普通视频页：右栏高度正好等于一屏，父元素没有多余高度，sticky 粘不住，只能用 fixed。
       横向位置由 JS 写进 --btv-rx（跟着右栏原本的位置走）。 */
    html:not(.btv-wide) ${L.inner}{position:fixed!important;top:${TOP}px!important;left:var(--btv-rx,auto)!important;width:var(--btv-rw,${RIGHT_NATIVE}px)!important}
    /* 面板脱离文档流后右栏高度归零，页面底部会露出灰色页面底色；把右栏在流里的高度补回一屏 */
    html:not(.btv-wide) ${L.container} ${L.right}{height:calc(100vh - ${TOP}px)}
    `}
    ${L.inner}>.up-panel-container,${L.inner}>#btv-tabs{flex:0 0 auto}
    /* 卡片顶边要和播放器顶边齐平，靠的是 UP 主面板正好和左栏标题区一样高。
       这个等式对单 UP 视频碰巧成立（都是 104px），但多人视频的 UP 区是另一个组件
       .members-info-container（「创作团队 N 人」），能有 176px，卡片就被顶下去七十多像素。
       所以别再指望巧合：JS 量出左栏里「标题区」的真实高度写进 --btv-uph，直接钉死 UP 面板的高度，
       装不下就让它自己滚。宽屏模式下 UP 面板是绝对定位到页面右上角的，不参与这套，要排除掉。 */
    html:not(.btv-wide) ${L.inner}>.up-panel-container{height:var(--btv-uph,auto);
      overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}

    /* 多人视频的「创作团队」面板：默认是标题 + 多行网格，7 个人就要 278px，
       塞进 104px 的对齐高度里只能上下滚，很难用。改成一行横滑：
       标题整行去掉（人数和展开按钮都在里面，横滑之后它们没用了），
       网格改成 nowrap 的 flex 行，右边缘加一层渐隐遮罩提示「还有」。
       垂直方向不要手调数字。可用高度是 --btv-uph（对齐播放器顶边算出来的，这里是 104px），
       而 B 站原来的间距全堆在两个地方：容器 18px 的上内边距（给标题垫的）和卡片 18px 的下内边距。
       这两个都归零，卡片本体就剩 84px，再让整条 flex 行撑满 100% 高度并 align-items:center，
       上下自动各留 10px。好处是不管哪天卡片变高变矮、--btv-uph 取到别的值，都还是居中，
       不会像写死 padding 那样一超出就冒竖向滚动条、把整块顶下去。
       横向滚动条必须压掉——它要吃十几像素，一样会超。横滑靠触控板或 shift+滚轮，右边渐隐负责提示。 */
    ${L.inner} .members-info-container{padding-top:0!important;height:100%}
    ${L.inner} .members-info-container .header{display:none!important}
    /* 中间层的类名有两种：成员少时是 membersinfo-normal，多时是 membersinfo-wide。
       只写前者的话，后一种视频上这条永远不命中，面板高度压不下去，一直贴在顶栏底下。
       那个 > 绝对不能少：每个成员卡片也叫 membersinfo-upcard / membersinfo-upcard-wrap，
       去掉 > 的话它们会连同中间层一起被拉成整块高度，一行头像只好贴着顶边，
       上下的留白全被吃掉——看着像 padding 出了问题，其实是高度被通配选择器误伤。 */
    ${L.inner} .members-info-container>[class*="membersinfo"]{height:100%!important}
    /* max-height:none 这条别删。B 站的折叠动画是用 JS 往这个节点写内联 max-height 实现的
       （收起态正好等于一行卡片的高度），height:100% 会被它夹回去，align-items:center 就永远
       没有多余空间可分，表现是「样式都应用了但就是不居中」。
       内联样式没带 !important，所以样式表里带 !important 的这条能盖过它。 */
    ${L.inner} .members-info-container .container{display:flex!important;flex-wrap:nowrap!important;
      align-items:center;height:100%!important;max-height:none!important;padding:0!important;gap:4px;
      overflow-x:auto;overflow-y:hidden;overscroll-behavior-x:contain;
      scrollbar-width:none;-ms-overflow-style:none;
      -webkit-mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent);
      mask-image:linear-gradient(to right,#000 calc(100% - 28px),transparent)}
    ${L.inner} .members-info-container .container::-webkit-scrollbar{display:none}
    /* B 站自己也有一套横滑提示：左右两块 general-mask（右边那块 115px 宽）外加一个滚动箭头。
       那是按整页宽度设计的，放进这个 384 宽的容器里要吃掉 30%，正好把最后一位成员整个盖住。
       我们上面已经有 28px 的渐隐做同样的提示，这套就藏掉。 */
    ${L.inner} .members-info-container .general-mask-left,
    ${L.inner} .members-info-container .general-mask-right,
    ${L.inner} .members-info-container .van-icon-general_enter_s,
    ${L.inner} .members-info-container .van-icon-general_back_s{display:none!important}
    ${L.inner} .membersinfo-upcard-wrap{flex:0 0 auto;padding-bottom:0!important}
    /* flex-basis 用 0，让当前显示的那块正好填满剩余高度（用 auto 会按内容分配，评论区会短一截）。
       B 站给面板留了 250px 的 padding-bottom（原本是给固定评论框腾位置的），这里压掉 */
    ${L.inner}>*:not(.up-panel-container):not(#btv-tabs){flex:1 1 0;min-height:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}
    ${L.inner}{padding-bottom:12px!important}

    /* B 站给右栏设了 pointer-events:none（/video/ 页），自建/搬来的节点要显式打开 */
    #btv-tabs,#btv-desc,${L.inner} #commentapp{pointer-events:auto}
    /* 标签栏 + 内容合成一张带边框的卡片（仿 YouTube Tabview），直角无圆角。
       margin 归零后 UP 卡片底边正好接上标签栏，卡片顶边与播放器顶边齐平 */
    #btv-tabs{display:flex;gap:4px;margin:0;background:var(--bg1,#fff);position:sticky;top:0;z-index:5;
      border:1px solid var(--line_regular,#e3e5e7);box-sizing:border-box}
    /* margin-top 必须清零，否则卡片会断成两截：标签栏是一个带边框的盒子，内容块自带的上外边距
       （连播列表 8px、推荐列表 22px）会把它顶开，中间露出一条背景色，边框看着就「没包起来」了。
       内容块的 border-top 是 0，全靠紧贴标签栏的下边框才连成一张卡片。 */
    ${L.inner}>*:not(.up-panel-container):not(#btv-tabs){border:1px solid var(--line_regular,#e3e5e7);border-top:0;box-sizing:border-box;margin-top:0!important}
    #btv-tabs button{flex:1;border:0;background:none;padding:8px 0;font-size:14px;color:#61666d;cursor:pointer;border-bottom:2px solid transparent}
    #btv-tabs button:hover{color:#00aeec}
    #btv-tabs button.on{color:#00aeec;border-bottom-color:#00aeec;font-weight:600}
    #btv-tabs button[hidden]{display:none}

    /* 简介/合集/视频 这三块是 B 站按整页布局做的，塞进卡片后内容几乎贴着边框；
       补一点左右内边距，让缩进和评论区看齐（评论正文离边框约 15px） */
    #btv-desc{padding:12px 14px}
    ${L.rcmdShell ? `
    ${L.inner}>${L.rcmdShell}{padding:0 7px;box-sizing:border-box}
    ${L.right} ${L.inner} ${L.rcmdShell}{padding-left:20px!important;padding-right:20px!important}
    ` : `
    ${L.inner}>${L.rcmd}{padding:0 12px;box-sizing:border-box}
    /* 连播列表下面会整体改造成紧凑文字列表，自带的 -16px 出血也会被取消，这里给内嵌灰卡留边距 */
    ${L.inner}>${L.pod}{padding:12px!important;box-sizing:border-box}
    `}
    #btv-desc .video-desc-container{margin:0!important}
    /* 简介永远展开：B 站是用内联 height 把它压成两行再配一个「展开」按钮的，两套 class 名都盖掉 */
    #btv-desc .basic-desc-info,#btv-desc .desc-info{height:auto!important;max-height:none!important;-webkit-line-clamp:none!important}
    #btv-desc .toggle-btn{display:none!important}
    #btv-desc .video-tag-container{margin-top:12px!important}
    ${L.inner} #commentapp{width:100%!important;padding:4px 8px 0;box-sizing:border-box}
    ${IS_LIST ? `
    /* 连播列表：B 站把它当成一个 350px 窄栏里的固定高度小列表，写死了三层高度——
       #playlist-video-action-list-body 限高 505px，真正的滚动容器 #playlist-video-action-list 限高 445px。
       只放开最外层（上一版的做法）没用：里层 445px 仍然卡着，列表只画出六七条，
       下面剩一大片空白，而且滚动条在里层，看着就像渲染坏了。
       这里把三层改造成一条 flex 链：外层容器不滚，高度层层传下去，
       最内层的 #playlist-video-action-list 继续当滚动容器——这一点很重要，
       B 站是靠对它设 scrollTop 把「当前播放」那一条滚进视野的，改成外层滚这个功能会失效。
       注意 #playlist-video-action-list 是 id 选择器，用类名规则盖不住，必须连 !important 一起写。 */
    ${L.inner}>${L.pod}{display:flex;flex-direction:column;overflow:hidden!important}
    ${L.inner} .action-list-header{flex:0 0 auto}
    ${L.inner} ${L.podBody}{max-height:none!important;height:auto!important;flex:1 1 0;min-height:0;display:flex;flex-direction:column}
    ${L.inner} .action-list-body-top,${L.inner} ${L.podBody}>.split-line{flex:0 0 auto}
    ${L.inner} .action-list-body-bottom{flex:1 1 0;min-height:0;display:flex;flex-direction:column}
    ${L.inner} #playlist-video-action-list{max-height:none!important;height:auto!important;flex:1 1 0;min-height:0;
      overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}

    /* ── 把连播列表改成 /video/ 页「视频选集」那种紧凑文字列表 ──
       B 站在连播页是按收藏夹渲染的：每行一张 120×70 缩略图 + 标题 + 播放量，一屏只装得下六七条，
       翻 136 条太难受。去掉缩略图压成单行后一屏能看二十多条。
       右侧沿用播放量而不是时长：列表项的 DOM（.main>.cover + .info>.title/.views）里没有时长字段，
       __INITIAL_STATE__.playlist 也只有 id 和 type，要时长只能另外分页打收藏夹接口。
       序号用 CSS counter 生成。这条成立的前提是列表「渐进加载」而不是「虚拟窗口」——
       实测滚到底部后第一条仍然是 #1，且当前项的 counter 值和 B 站表头的「16/136」对得上。
       当前播放行认 .siglep-active（B 站原文如此，singlep 拼错了）——不要去判断 .playing-gif，
       那个节点每一行都有，只是非当前行被内联 style="display:none" 藏起来了。
       多 P 视频是另一种结构 .multip-list-item-inner，外层 .main 布局相同所以能共用，
       只是多一个绝对定位的展开箭头，改成 static 排到播放量后面。 */
    /* 外层必须刷成白底。B 站给 .action-list-container 自己上了 #F1F2F3 的灰底铺满整块，
       而卡片边框是 #E3E5E7——灰底压灰边几乎看不见，于是四个标签里只有合集像是「没有边框」。
       边框其实一直在（和另外三个块的几何完全一致），是颜色把它吃掉了。
       白底之后，下面 header + body 那张 #F6F7F8 的内嵌灰卡才有对比，也才是第二张参考图的层次。 */
    ${L.inner}>${L.pod}{background:var(--bg1,#fff)!important}
    ${L.inner} .action-list-header{background:var(--graph_bg_thin,#F6F7F8);border-radius:6px 6px 0 0;margin:0}
    ${L.inner} ${L.podBody}{background:var(--graph_bg_thin,#F6F7F8);border-radius:0 0 6px 6px;padding:0 4px 4px}
    /* 标题行、创建者行、列表行左右对齐到同一条基线。
       列表行的文字距灰卡左边缘 20px（body 4 + 列表 2 + 行内 8 + B 站自己还垫了 6），
       所以标题行取 20px、创建者行取 16px（它在 body 里面，已经吃了 4px）。
       这两条必须多带一层 L.pod 并加 !important：B 站给标题行的 padding 是 12px 0，
       只用「右栏 + 类名」两级选择器盖不掉，结果就是「音乐」死贴在灰卡最左边，
       比下面的创建者行和列表序号都靠左，看着像没对齐。 */
    ${L.inner} ${L.pod} .action-list-header{padding:10px 20px 6px!important}
    ${L.inner} ${L.pod} .action-list-body-top{padding:0 16px 8px!important}
    ${L.inner} .action-list-body-bottom{margin:0!important}
    ${L.inner} #playlist-video-action-list{counter-reset:btv-ep;padding:0 2px}
    ${L.inner} .action-list-item-wrap{counter-increment:btv-ep;margin-bottom:0!important}
    ${L.inner} .action-list-item>*{border-radius:6px;padding:0!important}
    ${L.inner} .action-list-item .main{display:flex;align-items:center;gap:8px;padding:6px 8px}
    ${L.inner} .action-list-item .main>.cover{display:none!important}
    ${L.inner} .action-list-item .main>.info{flex:1 1 0;min-width:0;height:auto!important;
      display:flex!important;flex-direction:row!important;align-items:center;gap:10px}
    ${L.inner} .action-list-item .main>.info>.title{flex:1 1 0;min-width:0;height:auto!important;margin:0!important;
      white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-size:14px;line-height:22px}
    ${L.inner} .action-list-item .main>.info>.title::before{content:counter(btv-ep);display:inline-block;min-width:2em;
      color:var(--text3,#9499A0);font-size:13px;font-variant-numeric:tabular-nums}
    ${L.inner} .action-list-item .main>.info>.views{order:1;flex:0 0 auto;margin:0!important;
      font-size:12px;color:var(--text3,#9499A0)}
    ${L.inner} .action-list-item .main>.info>.expand-btn{order:2;position:static!important;flex:0 0 auto;
      width:16px;height:16px;display:flex;align-items:center;margin:0!important}
    ${L.inner} .action-list-item:hover>*{background:var(--bg1,#fff)}
    /* 当前播放行：白底蓝字，序号让位给播放动图 */
    ${L.inner} .siglep-active{background:var(--bg1,#fff)}
    ${L.inner} .siglep-active .main>.info>.title::before{display:none}
    ${L.inner} .multip-list{padding:0 8px 6px}
    ` : `
    /* 合集：和连播页用同一套办法，把外壳改成 flex 列、让 .video-pod__body 继续当滚动容器。
       之前只写了 max-height:none 放开限高，结果 pod 整个撑到两千多像素，滚动权落到外层 .rcmd-tab 上。
       表面看能滚，但丢了两件事：一是 pod 的头部（合集名、集数、订阅按钮）跟着一起滚走，
       二是 B 站靠对 .video-pod__body 设 scrollTop 把「当前这一集」滚进视野，那个元素不滚了，
       打开合集永远停在第 1 集——70 集的合集里正在放第 70 集却要自己手动翻到底，就是「合集不能滚动」的由来。
       .rcmd-tab 同时装着合集和推荐两块，非当前标签是 display:none 不参与 flex，所以两块各写一条 flex:1 即可。
       /video/ 页 .video-pod 在 .rcmd-tab 壳里面，不是 inner 的直接子节点，
       上面那条 margin-top:0 盖不到它，这里的 8px 间距保留。 */
    ${L.inner}>${L.rcmdShell}{display:flex;flex-direction:column;overflow:hidden!important}
    ${L.inner} ${L.rcmdShell}>${L.pod}{flex:1 1 0;min-height:0;display:flex;flex-direction:column;overflow:hidden;margin-top:8px}
    ${L.inner} .video-pod__header{flex:0 0 auto}
    ${L.inner} ${L.podBody}{flex:1 1 0;min-height:0;max-height:none!important;height:auto!important;
      overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}
    ${L.inner} ${L.rcmdShell}>${L.rcmd}{flex:1 1 0;min-height:0;
      overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}
    `}
    /* B 站有时仍会把评论输入框「传送」到右栏下一个 width:0 的固定层里（文字被挤成一列）；
       藏掉这个容器，下面的 JS 再把输入框搬回评论区头部 */
    ${L.right}>.bili-comments-bottom-fixed-wrapper{display:none!important}

    /* 禁用小窗的兜底。主开关是上面写进 localStorage 的 b_miniplayer='0'；
       万一哪天 B 站换了开关的存法、mini 态真来了，这里把它按回原位。
       只还原定位和层级，尺寸交给下面各自的规则，免得把播放器压成 0 高；
       绝不去改它的 data-screen——那会让 B 站的内部状态机和 DOM 对不上，比小窗本身更麻烦。 */
    .bpx-player-container[data-screen="mini"]{position:relative!important;inset:auto!important;
      z-index:auto!important;transform:none!important;box-shadow:none!important;border-radius:0!important}
    .bpx-player-container[data-screen="mini"] .bpx-player-mini-warp{display:none!important}
    html.btv-wide .bpx-player-container[data-screen="mini"]{width:100%!important;height:var(--btv-ph)!important}

    /* 宽屏模式（仿 Tabview 的剧场模式）：两栏换行，播放器铺满整行，标签面板整行宽放在播放器下面、自己滚。
       B 站宽屏时播放器宽高是按窗口算死的，这里改成跟着左栏走，高度 = 宽*9/16 + 46px 控制栏，由 JS 写进 --btv-ph */
    html.btv-wide ${L.container}{flex-wrap:wrap;justify-content:center}
    /* 宽度不再用 100%。B 站原生宽屏的定义是「播放器横跨原本的左栏 + 栏间距 + 右栏」，
       实测 543 + 30 + 350 = 923，容器 1091 居中后两侧各留 84px；
       而 width:100% 会把这两侧留白整个吃掉撑到 1071，比原生宽 148px，顶到屏幕边——
       这就是「宽屏的时候不是这么宽」的由来。--btv-lw 由 layoutWide 算出，
       想退回旧的满宽行为把上面的 WIDE_FULL 置 true 即可。 */
    html.btv-wide ${L.container} ${L.left}{width:var(--btv-lw,100%)!important;position:relative!important;top:0!important}
    html.btv-wide ${L.container} ${L.right}{width:var(--btv-lw,100%)!important;margin-left:0!important;margin-top:0!important;align-self:auto!important}
    html.btv-wide #btv-tabs{margin-top:0}
    /* 左栏里除了标题区、播放器、工具栏以外的块（.video-resource-list、广告位之类），在多数视频上
       都是 0 高的占位，却各自带着上下 24px 的 margin，在工具栏和标签栏之间留出 48px 空档。
       :empty 选不中它们——里面有个空的子节点——所以改成点名保留那三个真正有内容的，其余清零。 */
    html.btv-wide ${L.left}>*:empty{margin:0!important}
    html.btv-wide ${L.left}>*:not(#viewbox_report):not(#playerWrap):not(#arc_toolbar_report){margin-top:0!important;margin-bottom:0!important}
    /* 宽屏下 UP 卡片是绝对定位跑到页面右上角的，面板若还 overflow:hidden 会把它裁掉——
       内容块各自有滚动条，这里放开不影响布局 */
    html.btv-wide ${L.inner}{position:sticky!important;top:${TOP}px!important;overflow:visible!important}
    html.btv-wide #btv-tabs{top:0}
    /* 宽屏时 UP 主卡片留在页面右上角（B 站原位），不跟面板一起掉到播放器下面；
       它的包含块是 ${L.inner}——宽屏下这个元素是 sticky，属于 positioned element，
       所以负的 top 要以它为基准算（1.6.x 拿右栏当基准只是因为两者矩形碰巧完全重合） */
    html.btv-wide ${L.container}{position:relative}
    /* 宽度用 max-content 而不是固定的 --btv-rw：固定宽度下卡片 350 宽，但内容只占 260，
       头像被钉在最左边（x=657）、按钮贴在右边（x=807），中间空出 90px，整张卡片散成两半。
       收缩到内容宽度后整块 260，头像右移到 747、和文字间距 12px，
       文字区与按钮同为 200 宽、右边缘一起落在播放器右边缘上。
       max-width 仍用 --btv-rw 兜底：UP 名字或签名很长时，最多回到原来那个宽度。 */
    html.btv-wide .up-panel-container{position:absolute;top:var(--btv-up,0px);right:0;
      width:max-content;max-width:var(--btv-rw,${RIGHT_NATIVE}px);pointer-events:auto}
    /* 多人视频的创作团队面板横滑压扁后只有 84 高，而这类视频的标题区（--btv-uph）是 150，
       顶部对齐会让它浮在顶栏底下、和标题差出 50px。撑满标题区的高度，里面那条 flex 行
       自己会居中（上面 .container 的 align-items:center）。
       用 :has() 限定只管多人面板：单 UP 卡片本来就正好和标题区一样高，不用动它。 */
    html.btv-wide .up-panel-container:has(.members-info-container){height:var(--btv-uph,auto)}
    /* 同样是多人视频 + 宽屏：B 站给标题区写死了 height:150px 和 51px 的 padding-top，
       而同一个视频在非宽屏下只有 104 / 22。多出来的这块是它留给自己的——原生宽屏里
       右栏被播放器盖住，B 站就把创作团队面板改放到标题上方那条空当里。
       我们已经把面板绝对定位到右上角了，那 66px 于是纯空着，白把播放器往下推。
       但压到刚好等于内容高度（1.7.7 的做法）又太紧，上下一点余量都没有。
       所以取中间：标题区 = 成员卡片的高度（--btv-memberh，由 layoutWide 量出来写进去）
       加上下各 TITLE_PAD，再用 flex 把标题块在这个高度里垂直居中。
       右边的卡片高度同样是 --btv-uph（就是标题区高度），内容靠 .container 的
       align-items:center 居中。两边各自居中到同一个高度，中心线自然重合——
       实测标题块中心和头像块中心都落在 120，差 0。
       :has() 限定只管多人视频——单 UP 视频的标题区本来就是 104 / 22，不用动。 */
    html.btv-wide:has(.members-info-container) #viewbox_report{
      height:auto!important;padding-top:${TITLE_PAD}px!important;padding-bottom:${TITLE_PAD}px!important;
      min-height:calc(var(--btv-memberh,84px) + ${TITLE_PAD * 2}px)!important;
      display:flex!important;flex-direction:column!important;justify-content:center!important}
    html.btv-wide #playerWrap,html.btv-wide #bilibili-player,html.btv-wide .bpx-player-container[data-screen="wide"]{width:100%!important;height:var(--btv-ph)!important}
    /* 标题别钻到 UP 卡片底下。左栏撑宽之后标题和 meta 行跟着变成整行，而 UP 卡片是绝对定位
       钉在这一行右侧的；B 站原生宽屏里标题区只有左栏原生宽度，中间隔着一大段，所以原生不会撞。
       注意不能只给 #viewbox_report 加 padding-right——实测 meta 行会缩，h1 不会，
       标题那条链上有自己的宽度来源，父级的 padding 管不到它。
       所以直接给整条链一个绝对上限 lw - rw - 16，标题正好在卡片左侧留 16px 截断
       （h1 自带 text-overflow:ellipsis，会出省略号）。 */
    html.btv-wide #viewbox_report .video-info-title,
    html.btv-wide #viewbox_report .video-info-title-inner,
    html.btv-wide #viewbox_report h1.video-title,
    html.btv-wide #viewbox_report .video-info-detail-list{
      max-width:calc(var(--btv-lw,100%) - var(--btv-rw,${RIGHT_NATIVE}px) - 16px)!important}
    /* UP 卡片贴齐视频右边缘。卡片容器本来就是 right:0，右边缘早就和播放器齐平了；
       是关注按钮在自己那一行里靠左排、右边空出 90px，看着才像整张卡片没贴边。
       按钮行是三层：.up-info__btn-panel（整行 290）> .upinfo-btn-panel > .follow-btn，
       而 max-width:200px 挂在最里面那层 .follow-btn 上——CSS 读不到子孙的值，
       所以由 layoutWide 把它抄进 --btv-followw。
       1.7.2 用 flex:0 0 auto 去压中间层是错的：它会一路缩到纯文字宽度 77px，按钮挤成一小块。
       而 justify-content、auto margin、连 row-reverse 都推不动它——实测只要按钮是被 max-width
       从更大的值压下来的，Chrome 就不把剩下那 90px 当自由空间，三种写法按钮都停在原位。
       只有给出确定宽度才行：把整行宽度直接设成按钮的上限，再用 margin-left:auto 推到右边，
       按钮保持原生的 200px，右边缘正好落在播放器右边缘上。
       抄不到上限时退回 100%，那种情况下按钮本来就撑满整行，右边缘同样是齐的。 */
    html.btv-wide .up-panel-container .up-info__btn-panel{width:var(--btv-followw,100%)!important;
      margin-left:auto!important;margin-right:0!important}
    html.btv-wide .up-panel-container .up-info__btn-panel>*{flex:1 1 auto!important}

    ${TABS.map(t => `html[data-btv-tab]:not([data-btv-tab="${t.name}"]) ${L.inner} ${t.sel}{display:none!important}`).join('\n')}
    ${L.rcmdShell ? `
    /* /video/ 页合集和推荐视频同住在 ${L.rcmdShell} 里，而且是并排的两个兄弟节点：
       壳在「合集」或「视频」任一标签下显示，壳里两块各自按标签显隐（否则看合集时下面会跟着一长条推荐） */
    html[data-btv-tab]:not([data-btv-tab="合集"]):not([data-btv-tab="视频"]) ${L.inner} ${L.rcmdShell}{display:none!important}
    html[data-btv-tab="合集"] ${L.inner} ${L.rcmdShell}>${L.rcmd},
    html[data-btv-tab="视频"] ${L.inner} ${L.rcmdShell}>${L.pod}{display:none!important}
    ` : ''}
  `;

  // 先手：脚本改到 document-start 运行，一进来就注入这段「过渡样式」。它不碰 DOM，纯 CSS，没有撞 Vue 的风险，
  // 却能在 B 站第一帧就生效。
  // 目的是别让 B 站原样式先完整画一遍再被我们替换掉——推荐流长长一条渲染出来又消失、
  // 简介和评论在左栏闪一下再被搬走，就是那个「官方页面 → 我们页面」的替换感。
  // 全部用 html:not([data-btv-tab]) 限定：面板一建好我们就会写上这个属性，这段样式随即自动失效。
  const preCss = `
    html:not([data-btv-tab]) ${L.inner} ${L.rcmd},
    html:not([data-btv-tab]) ${L.inner} ${L.danmaku},
    .slide-ad-exp,.activity-m-v1,.video-card-ad-small,.ad-report,.ad-floor-exp,.vcd{display:none!important}
    html:not([data-btv-tab]) ${L.left} .video-desc-container,
    html:not([data-btv-tab]) ${L.left} .video-tag-container,
    html:not([data-btv-tab]) ${L.left} #commentapp{visibility:hidden}
  `;
  const preStyle = document.createElement('style');
  preStyle.id = 'btv-pre';
  preStyle.textContent = preCss;
  (document.head || document.documentElement).appendChild(preStyle);

  const $ = (s, r = document) => r.querySelector(s);
  let tabsEl = null;

  function setTab(name) {
    const btn = tabsEl.querySelector(`button[data-tab="${name}"]`);
    if (!btn || btn.hidden) name = '评论';
    document.documentElement.dataset.btvTab = name;
    for (const b of tabsEl.children) b.classList.toggle('on', b.dataset.tab === name);
    try { localStorage.setItem(STORE_KEY, name); } catch {}
  }

  // 把左栏的简介/标签/评论搬进右栏；B 站若重建了这些节点，观察到后再搬一次
  function adopt() {
    const inner = $(L.inner);
    if (!inner || !tabsEl) return;
    try {
      let desc = $('#btv-desc');
      if (!desc) { desc = document.createElement('div'); desc.id = 'btv-desc'; tabsEl.after(desc); }
      for (const sel of ['.video-desc-container', '.video-tag-container']) {
        const el = $(sel);
        if (el && el.parentElement !== desc) desc.appendChild(el);
      }
      const c = $('#commentapp');
      if (c && c.parentElement !== inner) inner.appendChild(c);
    } catch {}
  }

  // 评论区头部那行「评论 N  最热|最新」是 B 站给整页布局设计的大标题，塞进标签页里很突兀：
  // 标签本身已经写着「评论」，所以把标题藏掉，只留排序开关靠右，并压掉它下面 22px 的 margin。
  // 另外 B 站会在页面滚过评论框时把评论框「传送」到视口底部固定，判断依据是 window 滚动，
  // 我们的评论区在自己的滚动容器里，这个判断会错乱，结果头部留一个空洞、框跑到屏幕底下。
  // 组件暴露了 scrollContainer / commentBoxTeleportDisabled 两个属性，直接告诉它别传送。
  function styleCommentHeader() {
    const el = $('bili-comments')?.shadowRoot?.querySelector('bili-comments-header-renderer');
    const hr = el?.shadowRoot;
    if (!hr) return false;
    try {
      const sc = $('#commentapp');
      if (sc && el.scrollContainer !== sc) el.scrollContainer = sc;
      if (!el.commentBoxTeleportDisabled) el.commentBoxTeleportDisabled = true;
      // 输入框被传送走了就搬回来（切标签让评论区 display:none 时最容易触发）
      if (!hr.querySelector('#commentbox')?.children.length && typeof el.revertTeleportCommentbox === 'function') el.revertTeleportCommentbox();
    } catch {}
    if (!hr.querySelector('#btv-hdr')) {
      const st = document.createElement('style');
      st.id = 'btv-hdr';
      st.textContent = '#navbar{justify-content:flex-end;padding:0 8px;margin-bottom:4px!important;min-height:0}#title{display:none!important}';
      hr.appendChild(st);
    }
    return true;
  }

  // 宽屏切换：跟着播放器的 data-screen 走；切换后让播放器重算尺寸，并把面板滚回顶部。
  // 只认 normal / wide 两个值：播放器滚出视口时 B 站会把它切成 mini（小窗），全屏是 web / full，
  // 这些都不是用户在换布局，布局必须保持不动——否则 mini 一出现布局塌回两栏、滚动位置跳掉、播放器又回到视口，来回抽搐。
  let lastWide = null, nativeLeftW = 0, leftDirty = false;

  // B 站按窗口尺寸算出来的左栏宽度（= 普通模式下的播放器宽），宽屏下这个值它自己不改。
  // 只有在我们还没接管左栏宽度时才读得到：一旦加上 btv-wide，width 就来自 --btv-lw，
  // 再读 offsetWidth 就是在读自己刚写进去的值。所以平时用缓存，只有 resize 时才摘掉 class 重测一次——
  // 摘了立刻加回去，同一个任务内完成，浏览器不会绘制中间态，代价只是一次强制回流。
  function measureLeft(lc, html, remeasure) {
    if (!lc) return;
    if (!html.classList.contains('btv-wide')) { nativeLeftW = lc.offsetWidth; leftDirty = false; return; }
    if (!remeasure && !leftDirty && nativeLeftW) return;
    html.classList.remove('btv-wide');
    nativeLeftW = lc.offsetWidth;
    html.classList.add('btv-wide');
    leftDirty = false;
  }

  // ── 自动宽屏 ──────────────────────────────────────────────────────────
  // 左右栏布局下右栏是一笔固定开销（350 宽 + 30 的栏间距），窗口一窄，这笔开销的占比就压过
  // 播放器本身：实测 1091 的窗口里普通模式播放器只剩 668，切到宽屏是 923，白捡 255px。
  // 所以低于阈值就替用户切过去。
  // 只做单向（普通 → 宽屏）。要自动切回来，就得在宽屏状态下估算「切回普通会有多宽」，
  // 而 B 站两种模式给左栏的宽度本来就不是一回事（实测 668 / 543），估不准；一旦估错，
  // 两种模式之间会来回跳，比不自动更难受。窗口变宽后想回普通模式，手点一下就是了。
  // 另外用户只要自己点过一次宽屏按钮，本页就不再自动，免得跟他抢方向盘。
  let autoSwitching = false, userTookOver = false;

  document.addEventListener('click', e => {
    // 我们自己触发的那一次 click 不算「用户接管」
    if (!autoSwitching && e.target?.closest?.('.bpx-player-ctrl-wide')) userTookOver = true;
  }, true);

  function maybeAutoWide(playerW) {
    if (!AUTO_WIDE_UNDER || userTookOver || autoSwitching) return;
    if (!playerW || playerW >= AUTO_WIDE_UNDER) return;
    const btn = $('.bpx-player-ctrl-wide');
    if (!btn) return;
    autoSwitching = true;
    btn.click();
    // 切换要走 B 站自己的一轮重排，这期间别让第二次点击挤进来
    setTimeout(() => { autoSwitching = false; }, 600);
  }

  function layoutWide(remeasure) {
    const p = $('.bpx-player-container'), pw = $('#playerWrap'), inner = $(L.inner);
    if (!p || !pw || !inner) return;
    const screen = p.dataset.screen;
    if (screen !== 'wide' && screen !== 'normal') return;
    const wide = screen === 'wide';
    const html = document.documentElement;
    const rc0 = $(L.right), lc0 = $(L.left), vc0 = $(L.container);
    const root0 = html.style;
    const gap = rc0 ? (parseFloat(getComputedStyle(rc0).marginLeft) || 30) : 30;

    // 必须赶在 toggle 之前量：此刻 btv-wide 还没加上（或本来就没有），左栏还是 B 站的原生宽度。
    // 只在宽屏态下量：实测 B 站给左栏的宽度两种模式不是一回事（普通模式 668、宽屏 543），
    // 拿普通模式的值去算宽屏宽度会多出 125px，照样顶到窗口边。
    if (wide) measureLeft(lc0, html, remeasure);
    html.classList.toggle('btv-wide', wide);

    // UP 主面板的高度 = 左栏里播放器上方那块（标题区）的高度，这样标签栏顶边正好压在播放器顶边上。
    // 两个节点都在文档流里、跟着页面一起滚，差值与滚动位置无关，随便什么时候量都对。
    // 放在 wide 分支外，宽屏模式也要用它算播放器可用高度。
    let gapTop = 0;
    if (lc0) {
      gapTop = Math.round(pw.getBoundingClientRect().top - lc0.getBoundingClientRect().top);
      if (gapTop > 0) root0.setProperty('--btv-uph', gapTop + 'px');
    }
    if (rc0 && lc0 && vc0) {
      if (!wide) {
        // 富余空间 = 整行宽 - 两侧边距 - 左栏（播放器）宽 - 栏间距，超出的才拿来加宽右栏。
        // clientWidth 是含容器自身左右 padding 的，而容器是 justify-content:center，
        // 原生本来就靠两侧留白把内容居中（实测各 22px）。1.7.1 之前两笔都没扣，
        // 把该空着的留白也当成富余，右栏从 350 撑到 393 正好顶满视口、左栏贴到 x=0，
        // 这就是「非宽屏时内容紧贴左边」。富余不够时下面的 max 会老实退回原生的 350。
        const cs0 = getComputedStyle(vc0);
        const padX = (parseFloat(cs0.paddingLeft) || 0) + (parseFloat(cs0.paddingRight) || 0);
        const slack = vc0.clientWidth - Math.max(padX, SIDE_GUTTER * 2) - lc0.offsetWidth - gap;
        root0.setProperty('--btv-rw', Math.round(Math.max(RIGHT_NATIVE, Math.min(RIGHT_W, slack))) + 'px');
      }
      root0.setProperty('--btv-rx', Math.round(rc0.getBoundingClientRect().left) + 'px');
    }
    if (wide !== lastWide) {
      lastWide = wide;
      // 刚切过来这一下 B 站可能还没把左栏宽度改到位，缓存一律按脏处理，下一趟补测。
      leftDirty = true;
      inner.scrollTop = 0;
      window.dispatchEvent(new Event('resize'));
    }
    if (wide && vc0) {
      // 宽屏宽度 = 原生左栏 + 栏间距 + 右栏原生宽。实测 543 + 30 + 350 = 923，
      // 容器 1091 是居中 flex，剩下的 168 自动分成两侧各 84px 的留白——这就是 B 站原生的观感。
      // nativeLeftW 万一没量到（理论上不会，首次调用时 class 还没加），退回按容器宽反推。
      const base = nativeLeftW || Math.max(0, vc0.clientWidth - RIGHT_NATIVE - gap);
      const lw = Math.round(WIDE_FULL ? vc0.clientWidth : base + gap + RIGHT_NATIVE);
      root0.setProperty('--btv-lw', lw + 'px');
      // byWidth 直接从 lw 推，不再去量 #playerWrap：那个宽度正是我们自己 width:100% 撑出来的，
      // 读的是自己刚写的值。稳态下自洽，可一旦测量早于 CSS 生效，byWidth 就掉到原生左栏那一档，
      // 被 Math.max(360,…) 接住，播放器被钉成 360px 高。
      const byWidth = lw * 9 / 16 + 46;
      // 可用高度 = 视口 - 顶栏 - 标题区 - 底部留白（留白让标签栏能露出一截，提示下面还有东西）
      const byView = window.innerHeight - TOP - gapTop - WIDE_BOTTOM;
      root0.setProperty('--btv-ph', Math.round(Math.max(360, Math.min(byWidth, byView))) + 'px');
      // 关注按钮的宽度上限藏在 .up-info__btn-panel 的孙子节点上，CSS 选择器没法把子孙的值
      // 拿给祖先用，只能在这里抄一份出来（详见上面那段 CSS 注释）。
      // 多人视频：标题区的高度要照着右上角那排成员卡片来定（见上面 #viewbox_report 那段），
      // 卡片多高只有量了才知道，CSS 自己算不出来。
      const mc = $('.members-info-container .membersinfo-upcard-wrap');
      if (mc) root0.setProperty('--btv-memberh', mc.offsetHeight + 'px');
      const fb = $('.up-info__btn-panel .follow-btn, .up-info__btn-panel .default-btn');
      const fw = fb ? parseFloat(getComputedStyle(fb).maxWidth) : NaN;
      root0.setProperty('--btv-followw', fw > 0 ? fw + 'px' : '100%');
      // UP 卡片的包含块是 inner（宽屏下它是 sticky，属于 positioned element），不是右栏。
      root0.setProperty('--btv-up', Math.round(vc0.getBoundingClientRect().top - inner.getBoundingClientRect().top) + 'px');
    }
    // 普通模式下播放器被右栏挤得太窄，就替用户切到宽屏。放在最后：此时 --btv-rw 等
    // 都已经算过，切换引起的那次 data-screen 变化会让 layoutWide 从头再跑一遍。
    if (!wide) maybeAutoWide(lc0 ? lc0.offsetWidth : 0);
  }

  // 哪些标签该显示（比如没合集就不显示合集）；当前标签没了就退回评论
  function refresh() {
    const inner = $(L.inner);
    if (!inner) return;
    for (const b of tabsEl.children) {
      const t = TABS.find(t => t.name === b.dataset.tab);
      const el = inner.querySelector(t.sel);
      const v = !el || (t.name === '简介' && !el.children.length);
      // 同值也要写的话会平白产生一条 attribute 记录（实测连写三次 hidden=true 收到三条），
      // 观察者一旦放开属性过滤就会自激。这里先比对再写，把隐患掐在源头。
      if (b.hidden !== v) b.hidden = v;
    }
    const cur = tabsEl.querySelector(`button[data-tab="${document.documentElement.dataset.btvTab}"]`);
    if (!cur || cur.hidden) setTab('评论');
  }

  function build() {
    if (tabsEl) return true;
    const inner = $(L.inner);
    if (!inner || !$('#commentapp') || !$('.up-panel-container')) return false;

    const style = document.createElement('style');
    style.id = 'btv-style';
    style.textContent = css;
    document.head.appendChild(style);

    tabsEl = document.createElement('div');
    tabsEl.id = 'btv-tabs';
    for (const t of TABS) {
      const b = document.createElement('button');
      b.textContent = t.name;
      b.dataset.tab = t.name;
      b.onclick = () => { setTab(t.name); inner.scrollTop = 0; };
      tabsEl.appendChild(b);
    }
    $('.up-panel-container').after(tabsEl);

    adopt();
    let initial = '评论';
    try { initial = localStorage.getItem(STORE_KEY) || initial; } catch {}
    setTab(initial);
    refresh();
    layoutWide();

    // shadow DOM 里的变化观察不到，评论组件又是异步挂载的，轮询到注入成功为止
    let hdrTries = 0;
    const hdrTimer = setInterval(() => { if (styleCommentHeader() || ++hdrTries > 60) clearInterval(hdrTimer); }, 500);

    let pending = 0;
    const sync = () => {
      if (pending) return;
      pending = setTimeout(() => { pending = 0; adopt(); refresh(); layoutWide(); styleCommentHeader(); }, 100);
    };

    // 观察范围只要左栏和右栏：简介/评论被 Vue 重建发生在左栏，标签内容的增删发生在右栏。
    // 1.6.x 观察的是整个 ${L.container}，而 #playerWrap 就在它的 subtree 里——实测播放中
    // 4 秒收到 16 条记录，全部来自 .bpx-player-ctrl-time-current（时间码每 250ms 换一次文本节点），
    // 光这一个节点就让 sync 以 4Hz 常驻，每次带一组 getBoundingClientRect 强制回流（单次约 3.6ms）。
    // 所以再加一道过滤：落在播放器内部的记录一律跳过，剩下的才值得跑一次 sync。
    const mo = new MutationObserver(ms => {
      const pwNow = $('#playerWrap');
      for (const m of ms) {
        if (pwNow && pwNow.contains(m.target)) continue;
        sync();
        return;
      }
    });
    for (const sel of [L.left, L.right]) {
      const el = $(sel);
      if (el) mo.observe(el, { childList: true, subtree: true });
    }
    // 兜底：万一 B 站把整个左栏或右栏节点换掉，上面两个观察目标就失联了。
    // 只看容器的直接子节点，成本可以忽略。
    const vcEl = $(L.container);
    if (vcEl) mo.observe(vcEl, { childList: true });

    // data-screen 在 .bpx-player-container 上，正好落在上面被过滤掉的区域里，所以单独盯一个。
    // 只看这一个属性、不看子树，播放器内部的 DOM 变动一条都不要；
    // 直接调 layoutWide 而不是走 sync，省掉 100ms 防抖带来的布局闪烁。
    const pcEl = $('.bpx-player-container');
    if (pcEl) new MutationObserver(() => layoutWide()).observe(pcEl, { attributes: true, attributeFilter: ['data-screen'] });

    // 窗口尺寸变了，B 站会重算原生左栏宽度，缓存的 nativeLeftW 就过期了。
    // 这里只置脏标记再调用：如果这一刻播放器正好在 mini 或全屏态，layoutWide 会在量左栏之前
    // 就 return，标记留着，下一次 layoutWide（无论由谁触发）会把这次重测补上。
    // 1.7.0 直接传 true，那一次被 return 掉之后缓存就永久过期了。
    window.addEventListener('resize', () => { leftDirty = true; layoutWide(true); });

    // 连播页换下一个视频时路径不变、只改 ?bvid=，属于 SPA 内部跳转，不会重新执行脚本。
    // MutationObserver 大多数情况能兜住（Vue 会重建节点），但有些切换只改内容不动结构，
    // 这里再补一道 URL 变化的监听，确保被搬走的简介/评论重新归位。
    let lastHref = location.href;
    setInterval(() => {
      if (location.href === lastHref) return;
      lastHref = location.href;
      sync();
    }, 400);
    return true;
  }

  // 什么时候才敢动 DOM，是这个脚本最要紧的一件事。
  // 教训：在后台标签页打开视频时 B 站会推迟渲染，等你切过去才继续挂载。我们一旦在这期间把
  // 简介/评论这些节点搬走，Vue 续上的那次 patch 就会撞上不在原位的节点直接抛异常
  // （HierarchyRequestError / $scopedSlots of undefined），整页后续渲染全部中断——
  // 表现是头像卡在骨架屏、评论组件永不挂载、顶栏用户区也不出来，看着就像「加载卡住」。
  //
  // 试过的两种门禁都不够：
  //   1) 可见后等 250~600ms —— B 站补渲染要多久没有定数，等多久都是赌。
  //   2) 等 .default-btn 出现 —— 这个节点在骨架屏阶段就已经在 DOM 里了，等于没等。
  // 现在等三个都满足：评论组件已挂载（bili-comments 存在）、UP 主区的 img 节点已建出、
  // 关注/充电按钮在位。崩溃那次三项全为假（连 img 都没有），健康加载时三项同时成立。
  // 注意别用 img[src]：头像是懒加载的，后台标签页里只有 data-src，会永远等不到。
  //
  // 后两项的选择器不能写死单 UP 面板那一套。多人视频的 UP 区是另一个组件
  // .members-info-container（「创作团队 N 人」），里面既没有 .bili-avatar，按钮也叫
  // .add-follow-btn —— 原来的判定在这类视频上永远为假，脚本只能一路等到 12 秒兜底才构建，
  // 而这期间左栏的简介和评论是被过渡样式藏着的，看起来就是「侧边栏特别慢」。
  // 所以头像放宽成「UP 区里出现任何 img」（骨架屏阶段一个 img 都没有，这个信号依然有效），
  // 按钮把多人面板的类名一并列上。
  function pageSettled() {
    const up = $('.up-panel-container');
    if (!up || !$(L.inner) || !$('#commentapp')) return false;
    if (!$('bili-comments')) return false;                       // 评论组件挂载完
    if (!up.querySelector('img')) return false;                  // 头像节点真的建出来了（骨架屏阶段连 img 都没有）
    if (!up.querySelector('.default-btn, .follow-btn, .add-follow-btn')) return false;
    return true;
  }

  let settledAt = 0, tries = 0, waited = 0;
  const timer = setInterval(() => {
    // waited 必须在这道门禁之后才累加。1.6.x 把它放在最前面，于是「后台打开视频、二十秒后切回来」
    // 这条路径上 waited 早已超过 12000，下面的 12 秒兜底直接短路掉 pageSettled，
    // 立刻 build、立刻搬 DOM——上面那一大段注释防的就是这个崩溃，却被计时器自己放了进来。
    if (document.readyState !== 'complete' || document.hidden) { settledAt = 0; return; }
    waited += 100;
    // 信号迟迟不来也别干等（比如关闭了评论区、或 B 站改版换了 class），累计可见 12 秒后照常构建
    if (!pageSettled() && waited < 12000) { settledAt = 0; return; }
    if (!settledAt) { settledAt = Date.now(); return; }
    if (Date.now() - settledAt < 150) return;
    if (build() || ++tries > 200) clearInterval(timer);
  }, 100);
})();
