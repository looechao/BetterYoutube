// ==UserScript==
// @name         Bilibili Tabview
// @namespace    looechao
// @version      1.2.5
// @description  B 站视频页右栏标签化，主页三列精简布局，动态页纯色背景，隐藏广告（仿 Tabview YouTube）
// @match        https://www.bilibili.com/
// @match        https://www.bilibili.com/?*
// @match        https://www.bilibili.com/video/*
// @match        https://www.bilibili.com/list/*
// @match        https://t.bilibili.com/*
// @icon         https://www.bilibili.com/favicon.ico
// @run-at       document-start
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  // 主页只注入样式，不运行视频页的标签栏和轮询逻辑。
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
      .bili-header .bili-header__bar svg { color: #18191C !important; fill: currentColor !important; }

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

  const RIGHT_W = 420;
  const TOP = 64;                 // B 站顶栏高度
  const STORE_KEY = 'btv-tab';

  // 标签 → 右栏里对应的节点。合集和推荐都住在 .rcmd-tab 这层壳里，留在 Vue 原位不搬，只用 CSS 显隐；
  // 简介/标签/评论是从左栏搬过来的（#commentapp 是独立挂载点，简介和标签有固定 id/class，Vue 原地 patch 不重建）。
  const TABS = [
    { name: '简介', sel: '#btv-desc' },
    { name: '合集', sel: '.video-pod' },
    { name: '评论', sel: '#commentapp' },
    { name: '视频', sel: '.recommend-list-v1' },
  ];

  const css = `
    /* 广告 */
    .slide-ad-exp,.activity-m-v1,.video-card-ad-small,.ad-report,.ad-floor-exp,.vcd,
    .right-container-inner .right-bottom-banner{display:none!important}
    .rcmd-tab:empty{display:none!important}
    /* 弹幕列表不再作为标签，整个藏掉 */
    .right-container-inner .video-pod-above-modules{display:none!important}

    /* 布局：右栏加宽。注意左栏宽度绝对不能动——B 站是先按窗口和高度算出播放器尺寸，再把左栏设成播放器那么宽；
       强行把左栏撑宽只会让播放器右边留出一条黑色空白（#playerWrap 的黑底）。
       右栏宽度取「本来就空着的富余空间」，最多 ${RIGHT_W}px、最少还原成 B 站的 350px，由 JS 写进 --btv-rw */
    .video-container-v1 .right-container{width:var(--btv-rw,350px)!important;flex:0 0 auto}
    /* 播放器尺寸不碰：B 站按窗口宽算的播放器会比缩窄后的左栏宽几个像素，吃进 30px 的栏间距里看不出来；
       强行 width:100% 会把宽屏模式一起废掉 */
    /* 面板整体钉住不动：UP 主卡片和标签栏固定，只有下面当前那个内容块自己滚（当前标签之外的块是 display:none，不参与 flex）。
       普通模式用 position:fixed 而不是 sticky —— sticky 只能在父元素高度范围内粘住，而面板正好等于一屏高，
       父元素没有多余高度，页面一滚面板就整块被带走。fixed 之后右栏在文档流里高度归零，页面也就不再有多余滚动空间了。
       横向位置由 JS 写进 --btv-rx（跟着右栏原本的位置走）。 */
    .right-container-inner{height:calc(100vh - ${TOP}px);display:flex!important;flex-direction:column;overflow:hidden!important}
    html:not(.btv-wide) .right-container-inner{position:fixed!important;top:${TOP}px!important;left:var(--btv-rx,auto)!important;width:var(--btv-rw,350px)!important}
    /* 面板脱离文档流后右栏高度归零，页面底部会露出灰色页面底色；把右栏在流里的高度补回一屏 */
    html:not(.btv-wide) .video-container-v1 .right-container{height:calc(100vh - ${TOP}px)}
    .right-container-inner>.up-panel-container,.right-container-inner>#btv-tabs{flex:0 0 auto}
    /* flex-basis 用 0，让当前显示的那块正好填满剩余高度（用 auto 会按内容分配，评论区会短一截）。
       B 站给面板留了 250px 的 padding-bottom（原本是给固定评论框腾位置的），这里压掉，否则白白吃掉一截高度 */
    .right-container-inner>*:not(.up-panel-container):not(#btv-tabs){flex:1 1 0;min-height:0;overflow-y:auto;overscroll-behavior:contain;scrollbar-width:thin}
    .right-container-inner{padding-bottom:12px!important}

    /* B 站给 .right-container 设了 pointer-events:none，自建/搬来的节点要显式打开 */
    #btv-tabs,#btv-desc,.right-container-inner #commentapp{pointer-events:auto}
    /* 标签栏 + 内容合成一张带边框的卡片（仿 YouTube Tabview），直角无圆角。
       margin 归零后 UP 卡片底边正好接上标签栏，卡片顶边与播放器顶边齐平 */
    #btv-tabs{display:flex;gap:4px;margin:0;background:var(--bg1,#fff);position:sticky;top:0;z-index:5;
      border:1px solid var(--line_regular,#e3e5e7);box-sizing:border-box}
    .right-container-inner>*:not(.up-panel-container):not(#btv-tabs){border:1px solid var(--line_regular,#e3e5e7);border-top:0;box-sizing:border-box}
    #btv-tabs button{flex:1;border:0;background:none;padding:8px 0;font-size:14px;color:#61666d;cursor:pointer;border-bottom:2px solid transparent}
    #btv-tabs button:hover{color:#00aeec}
    #btv-tabs button.on{color:#00aeec;border-bottom-color:#00aeec;font-weight:600}
    #btv-tabs button[hidden]{display:none}

    /* 简介/合集/视频 这三块是 B 站按整页布局做的，塞进卡片后内容几乎贴着边框；
       补一点左右内边距，让缩进和评论区看齐（评论正文离边框约 15px） */
    #btv-desc{padding:12px 14px}
    .right-container-inner>.rcmd-tab{padding:0 7px;box-sizing:border-box}
    ${location.pathname.startsWith('/video/') ? `
    .right-container .right-container-inner .rcmd-tab{padding-left:20px!important;padding-right:20px!important}
    ` : ''}
    #btv-desc .video-desc-container{margin:0!important}
    /* 简介永远展开：B 站是用内联 height 把它压成两行再配一个「展开」按钮的，两套 class 名都盖掉 */
    #btv-desc .basic-desc-info,#btv-desc .desc-info{height:auto!important;max-height:none!important;-webkit-line-clamp:none!important}
    #btv-desc .toggle-btn{display:none!important}
    #btv-desc .video-tag-container{margin-top:12px!important}
    .right-container-inner #commentapp{width:100%!important;padding:4px 8px 0;box-sizing:border-box}
    .right-container-inner .video-pod{margin-top:8px}
    /* 合集列表 B 站限高 250px 内部滚动；面板本身会滚，所以放开让它全部展开 */
    .right-container-inner .video-pod__body{max-height:none!important;height:auto!important}
    /* B 站有时仍会把评论输入框「传送」到 .right-container 下一个 width:0 的固定层里（文字被挤成一列）；
       藏掉这个容器，下面的 JS 再把输入框搬回评论区头部 */
    .right-container>.bili-comments-bottom-fixed-wrapper{display:none!important}

    /* 宽屏模式（仿 Tabview 的剧场模式）：两栏换行，播放器铺满整行，标签面板整行宽放在播放器下面、自己滚。
       B 站宽屏时播放器宽高是按窗口算死的，这里改成跟着左栏走，高度 = 宽*9/16 + 46px 控制栏，由 JS 写进 --btv-ph */
    html.btv-wide .video-container-v1{flex-wrap:wrap}
    html.btv-wide .video-container-v1 .left-container{width:100%!important;position:relative!important;top:0!important}
    html.btv-wide .video-container-v1 .right-container{width:100%!important;margin-left:0!important;margin-top:0!important}
    html.btv-wide #btv-tabs{margin-top:0}
    html.btv-wide .left-container>*:empty{margin:0!important}
    /* 宽屏下 UP 卡片是绝对定位跑到页面右上角的，面板若还 overflow:hidden 会把它裁掉——
       内容块各自有滚动条，这里放开不影响布局 */
    html.btv-wide .right-container-inner{position:sticky!important;top:${TOP}px!important;overflow:visible!important}
    html.btv-wide #btv-tabs{top:0}
    /* 宽屏时 UP 主卡片留在页面右上角（B 站原位），不跟面板一起掉到播放器下面；
       它的包含块是 .right-container，所以要用 JS 算出负的 top 把它顶回标题那一行 */
    html.btv-wide .video-container-v1{position:relative}
    html.btv-wide .up-panel-container{position:absolute;top:var(--btv-up,0px);right:0;width:var(--btv-rw,350px);pointer-events:auto}
    html.btv-wide #playerWrap,html.btv-wide #bilibili-player,html.btv-wide .bpx-player-container[data-screen="wide"]{width:100%!important;height:var(--btv-ph)!important}

    ${TABS.map(t => `html[data-btv-tab]:not([data-btv-tab="${t.name}"]) .right-container-inner ${t.sel}{display:none!important}`).join('\n')}
    /* 合集和推荐视频同住在 .rcmd-tab 里，而且是并排的两个兄弟节点：
       壳在「合集」或「视频」任一标签下显示，壳里两块各自按标签显隐（否则看合集时下面会跟着一长条推荐） */
    html[data-btv-tab]:not([data-btv-tab="合集"]):not([data-btv-tab="视频"]) .right-container-inner .rcmd-tab{display:none!important}
    html[data-btv-tab="合集"] .right-container-inner .rcmd-tab>.recommend-list-v1,
    html[data-btv-tab="视频"] .right-container-inner .rcmd-tab>.video-pod{display:none!important}
  `;

  // 先手：脚本改到 document-start 运行，一进来就注入这段「过渡样式」。它不碰 DOM，纯 CSS，没有撞 Vue 的风险，
  // 却能在 B 站第一帧就生效。
  // 目的是别让 B 站原样式先完整画一遍再被我们替换掉——推荐流长长一条渲染出来又消失、
  // 简介和评论在左栏闪一下再被搬走，就是那个「官方页面 → 我们页面」的替换感。
  // 全部用 html:not([data-btv-tab]) 限定：面板一建好我们就会写上这个属性，这段样式随即自动失效。
  const preCss = `
    html:not([data-btv-tab]) .right-container-inner .recommend-list-v1,
    html:not([data-btv-tab]) .right-container-inner .video-pod-above-modules,
    .slide-ad-exp,.activity-m-v1,.video-card-ad-small,.ad-report,.ad-floor-exp,.vcd{display:none!important}
    html:not([data-btv-tab]) .left-container .video-desc-container,
    html:not([data-btv-tab]) .left-container .video-tag-container,
    html:not([data-btv-tab]) .left-container #commentapp{visibility:hidden}
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
    const inner = $('.right-container-inner');
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
    const p = $('.bpx-player-container'), pw = $('#playerWrap'), inner = $('.right-container-inner');
    if (!p || !pw || !inner) return;
    const screen = p.dataset.screen;
    if (screen !== 'wide' && screen !== 'normal') return;
    const wide = screen === 'wide';
    document.documentElement.classList.toggle('btv-wide', wide);
    const rc0 = $('.right-container'), lc0 = $('.left-container'), vc0 = $('.video-container-v1');
    if (rc0 && lc0 && vc0) {
      const root0 = document.documentElement.style;
      if (!wide) {
        // 富余空间 = 整行宽 - 左栏（播放器）宽 - 栏间距，超出的部分才用来加宽右栏
        const slack = vc0.clientWidth - lc0.offsetWidth - 30;
        root0.setProperty('--btv-rw', Math.round(Math.max(350, Math.min(RIGHT_W, slack))) + 'px');
      }
      root0.setProperty('--btv-rx', Math.round(rc0.getBoundingClientRect().left) + 'px');
    }
    if (wide !== lastWide) {
      lastWide = wide;
      inner.scrollTop = 0;
      window.dispatchEvent(new Event('resize'));
    }
    if (wide) {
      const root = document.documentElement.style;
      root.setProperty('--btv-ph', Math.round(pw.getBoundingClientRect().width * 9 / 16 + 46) + 'px');
      const rc = $('.right-container'), vc = $('.video-container-v1');
      if (rc && vc) root.setProperty('--btv-up', (vc.getBoundingClientRect().top - rc.getBoundingClientRect().top) + 'px');
    }
  }

  // 哪些标签该显示（比如没合集就不显示合集）；当前标签没了就退回评论
  function refresh() {
    const inner = $('.right-container-inner');
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
    const inner = $('.right-container-inner');
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
    new MutationObserver(() => {
      if (pending) return;
      pending = setTimeout(() => { pending = 0; adopt(); refresh(); layoutWide(); styleCommentHeader(); }, 100);
    }).observe($('.video-container-v1') || document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['data-screen'] });
    window.addEventListener('resize', layoutWide);
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
  // 现在等三个都满足：评论组件已挂载（bili-comments 存在）、UP 主头像的 img 节点已建出、
  // 关注/充电按钮在位。崩溃那次三项全为假（连 img 都没有），健康加载时三项同时成立。
  // 注意别用 img[src]：头像是懒加载的，后台标签页里只有 data-src，会永远等不到。
  function pageSettled() {
    const up = $('.up-panel-container');
    if (!up || !$('.right-container-inner') || !$('#commentapp')) return false;
    if (!$('bili-comments')) return false;                       // 评论组件挂载完
    if (!up.querySelector('.bili-avatar img')) return false;     // 头像节点真的建出来了（骨架屏阶段连 img 都没有）
    if (!up.querySelector('.default-btn, .follow-btn')) return false;
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
