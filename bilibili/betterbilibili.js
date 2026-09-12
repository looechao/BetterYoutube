// ==UserScript==
// @name         Bilibili Tabview
// @namespace    looechao
// @version      1.6.1
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

(() => {
  'use strict';

  // 主页只注入样式，不运行视频页的标签栏和轮询逻辑。
  // 注意：hostname 必须是裸域名字符串，之前写成 markdown 链接形式会导致这个分支永远不成立。
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

  const RIGHT_W = 420;
  const TOP = 64;                 // B 站顶栏高度（两种页面一致）
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
       右栏宽度取「本来就空着的富余空间」，最多 ${RIGHT_W}px、最少还原成 B 站的 350px，由 JS 写进 --btv-rw */
    ${L.container} ${L.right}{width:var(--btv-rw,350px)!important;flex:0 0 auto}
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
    html:not(.btv-wide) ${L.inner}{position:fixed!important;top:${TOP}px!important;left:var(--btv-rx,auto)!important;width:var(--btv-rw,350px)!important}
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
    ${L.inner} .members-info-container .membersinfo-normal{height:100%!important}
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

    /* 宽屏模式（仿 Tabview 的剧场模式）：两栏换行，播放器铺满整行，标签面板整行宽放在播放器下面、自己滚。
       B 站宽屏时播放器宽高是按窗口算死的，这里改成跟着左栏走，高度 = 宽*9/16 + 46px 控制栏，由 JS 写进 --btv-ph */
    html.btv-wide ${L.container}{flex-wrap:wrap}
    html.btv-wide ${L.container} ${L.left}{width:100%!important;position:relative!important;top:0!important}
    html.btv-wide ${L.container} ${L.right}{width:100%!important;margin-left:0!important;margin-top:0!important;align-self:auto!important}
    html.btv-wide #btv-tabs{margin-top:0}
    html.btv-wide ${L.left}>*:empty{margin:0!important}
    /* 宽屏下 UP 卡片是绝对定位跑到页面右上角的，面板若还 overflow:hidden 会把它裁掉——
       内容块各自有滚动条，这里放开不影响布局 */
    html.btv-wide ${L.inner}{position:sticky!important;top:${TOP}px!important;overflow:visible!important}
    html.btv-wide #btv-tabs{top:0}
    /* 宽屏时 UP 主卡片留在页面右上角（B 站原位），不跟面板一起掉到播放器下面；
       它的包含块是右栏，所以要用 JS 算出负的 top 把它顶回标题那一行 */
    html.btv-wide ${L.container}{position:relative}
    html.btv-wide .up-panel-container{position:absolute;top:var(--btv-up,0px);right:0;width:var(--btv-rw,350px);pointer-events:auto}
    html.btv-wide #playerWrap,html.btv-wide #bilibili-player,html.btv-wide .bpx-player-container[data-screen="wide"]{width:100%!important;height:var(--btv-ph)!important}

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
  let lastWide = null;
  function layoutWide() {
    const p = $('.bpx-player-container'), pw = $('#playerWrap'), inner = $(L.inner);
    if (!p || !pw || !inner) return;
    const screen = p.dataset.screen;
    if (screen !== 'wide' && screen !== 'normal') return;
    const wide = screen === 'wide';
    document.documentElement.classList.toggle('btv-wide', wide);
    const rc0 = $(L.right), lc0 = $(L.left), vc0 = $(L.container);
    if (rc0 && lc0 && vc0) {
      const root0 = document.documentElement.style;
      if (!wide) {
        // 富余空间 = 整行宽 - 左栏（播放器）宽 - 栏间距，超出的部分才用来加宽右栏。
        // 栏间距从右栏的实际 margin-left 读，不再写死 30，两种页面通用。
        const gap = parseFloat(getComputedStyle(rc0).marginLeft) || 30;
        const slack = vc0.clientWidth - lc0.offsetWidth - gap;
        root0.setProperty('--btv-rw', Math.round(Math.max(350, Math.min(RIGHT_W, slack))) + 'px');
      }
      root0.setProperty('--btv-rx', Math.round(rc0.getBoundingClientRect().left) + 'px');
      // UP 主面板的高度 = 左栏里播放器上方那块（标题区）的高度，这样标签栏顶边正好压在播放器顶边上。
      // 两个节点都在文档流里、跟着页面一起滚，差值与滚动位置无关，随便什么时候量都对。
      const gapTop = Math.round(pw.getBoundingClientRect().top - lc0.getBoundingClientRect().top);
      if (gapTop > 0) root0.setProperty('--btv-uph', gapTop + 'px');
    }
    if (wide !== lastWide) {
      lastWide = wide;
      inner.scrollTop = 0;
      window.dispatchEvent(new Event('resize'));
    }
    if (wide) {
      const root = document.documentElement.style;
      root.setProperty('--btv-ph', Math.round(pw.getBoundingClientRect().width * 9 / 16 + 46) + 'px');
      const rc = $(L.right), vc = $(L.container);
      if (rc && vc) root.setProperty('--btv-up', (vc.getBoundingClientRect().top - rc.getBoundingClientRect().top) + 'px');
    }
  }

  // 哪些标签该显示（比如没合集就不显示合集）；当前标签没了就退回评论
  function refresh() {
    const inner = $(L.inner);
    if (!inner) return;
    for (const b of tabsEl.children) {
      const t = TABS.find(t => t.name === b.dataset.tab);
      const el = inner.querySelector(t.sel);
      b.hidden = !el || (t.name === '简介' && !el.children.length);
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
    new MutationObserver(sync).observe($(L.container) || document.body,
      { childList: true, subtree: true, attributes: true, attributeFilter: ['data-screen'] });
    window.addEventListener('resize', layoutWide);

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
    waited += 100;
    if (document.readyState !== 'complete' || document.hidden) { settledAt = 0; return; }
    // 信号迟迟不来也别干等（比如关闭了评论区、或 B 站改版换了 class），12 秒后照常构建
    if (!pageSettled() && waited < 12000) { settledAt = 0; return; }
    if (!settledAt) { settledAt = Date.now(); return; }
    if (Date.now() - settledAt < 150) return;
    if (build() || ++tries > 200) clearInterval(timer);
  }, 100);
})();
