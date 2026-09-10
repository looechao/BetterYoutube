// ==UserScript==
// @name         NodeSeek Plaintext
// @namespace    https://looechao.com/userscripts/nodeseek-plaintext
// @version      3.3.0
// @description  把 NodeSeek 剥成纯 HTML 观感：白底黑字衬线、蓝链接、无侧栏无头像无图标；附每日静默签到、评论无限滚动。
// @author       looechao
// @match        *://www.nodeseek.com/*
// @match        *://nodeseek.com/*
// @run-at       document-start
// @inject-into  content
// @grant        GM_addStyle
// @grant        GM_getValue
// @grant        GM_setValue
// @icon         https://www.nodeseek.com/static/image/favicon/favicon-32x32.png
// ==/UserScript==

// @inject-into content：本脚本只碰 DOM 和 GM API，从不读写页面自己的 JS 对象，
// 所以直接跑在 content（隔离）上下文里 —— 不受站点 CSP 影响，注入时机也更靠前。
// Tampermonkey 会忽略这条指令，不影响兼容。

(function () {
  'use strict';

  // 脚本开始执行的时刻。和首屏绘制时间一比，就能判定"原版样式闪一下"到底是不是注入太晚。
  const T0 = performance.now();

  const ID = 'mfw-nodeseek';
  const CSS = `
/* ---------- 全站基础 ---------- */
html, body {
  background:#fff !important; color:#000 !important;
  font-size:18px !important; line-height:1.6 !important;
}
html, body, input, textarea, button, select,
article.post-content, article.post-content *,
.post-title, .post-title * {
  font-family:Georgia,"Times New Roman","Songti SC",SimSun,"Noto Serif CJK SC",serif !important;
}
article.post-content pre, article.post-content code, article.post-content pre *,
#editor textarea, #editor-body {
  font-family:Menlo,Consolas,"Courier New",monospace !important;
}

#nsk-frame, #nsk-body, #nsk-body-left {
  display:block !important; max-width:700px !important; width:auto !important;
  margin:0 auto !important; padding:0 1em !important;
  background:none !important; box-shadow:none !important; border:none !important;
}

/* 全部干掉：侧栏、头像、图标、徽章、签名档、悬浮按钮、页脚 */
#nsk-left-panel-container, #fast-nav-button-group,
.avatar-wrapper, .avatar-normal, .iconpark-icon, .nsk-badge, .role-tag,
.pined, .hot-badge, .signature, .topic-warning,
header img, #nsk-body-left-block, footer { display:none !important; }

header {
  background:none !important; box-shadow:none !important;
  border-bottom:1px solid #ddd !important; margin-bottom:1em !important;
  position:static !important; height:auto !important;
}
header * { position:static !important; float:none !important; }

a { color:#00e !important; text-decoration:underline !important; }
a:visited { color:#551a8b !important; }

/* ---------- 列表页 ---------- */
ul.post-list { list-style:none !important; padding:0 !important; margin:0 !important; }
.post-list-item {
  display:block !important; padding:.7em 0 !important; margin:0 !important;
  border:none !important; border-bottom:1px solid #ddd !important;
  background:none !important; box-shadow:none !important;
}
.post-list-content { display:block !important; margin:0 !important; }
.post-list-item .post-title { font-size:1em !important; font-weight:normal !important; }
.post-info { display:block !important; font-size:.75em !important; color:#666 !important; margin-top:.15em !important; }
.post-info .info-item { display:inline !important; margin-right:.9em !important; color:#666 !important; }
.post-info a { color:#666 !important; text-decoration:none !important; }
.post-list-controler, .sorter, .post-list-controler * {
  position:static !important; float:none !important; transform:none !important;
  background:none !important; border:none !important; padding:0 !important;
}
.post-list-controler { margin:.5em 0 !important; font-size:.85em !important; }
.sorter { display:block !important; margin:1em 0 .5em !important; }
.sorter a { margin-right:1em !important; }
.sorter a.selected { font-weight:bold !important; color:#000 !important; text-decoration:none !important; }
.post-category {
  position:static !important; float:none !important; background:none !important;
  border:none !important; padding:0 !important; margin:0 !important; font-size:inherit !important;
}
.post-category::before { content:"·" !important; margin-right:.5em !important; }

/* ---------- 帖子页 ---------- */
.nsk-post-wrapper, .nsk-post, .comment-container, .content-item, ul.comments {
  background:none !important; border:none !important; box-shadow:none !important;
  padding:0 !important; margin:0 !important; width:auto !important; max-width:none !important;
}
.nsk-post > .post-title { border:none !important; padding:0 !important; margin:1.2em 0 .2em !important; }
.nsk-post > .post-title h1 { font-size:1.6em !important; font-weight:bold !important; line-height:1.3 !important; margin:0 !important; }
.post-title-link { color:#000 !important; text-decoration:none !important; }

ul.comments { list-style:none !important; }
.content-item { display:block !important; padding:1.2em 0 !important; border-bottom:1px solid #ddd !important; }

.nsk-content-meta-info {
  display:block !important; font-size:.75em !important; color:#666 !important;
  margin:0 0 .4em !important; padding:0 !important; border:none !important; background:none !important;
}
.nsk-content-meta-info > div { display:inline !important; margin:0 !important; padding:0 !important; }
.author-info, .content-info, .floor-link-wrapper { display:inline !important; }
.author-name { font-weight:bold !important; color:#000 !important; text-decoration:none !important; margin-right:.8em !important; }
.date-created, .date-updated { color:#666 !important; margin-right:.8em !important; }
.floor-link { color:#999 !important; text-decoration:none !important; }

article.post-content {
  display:block !important; font-size:1em !important; line-height:1.65 !important;
  margin:0 !important; padding:0 !important; background:none !important; overflow:visible !important;
}
article.post-content p { margin:0 0 .8em !important; }
article.post-content h1, article.post-content h2, article.post-content h3,
article.post-content h4, article.post-content h5, article.post-content h6 {
  color:#000 !important; font-weight:bold !important; border:none !important;
  background:none !important; margin:1.2em 0 .4em !important; line-height:1.3 !important;
}
article.post-content h1 { font-size:1.3em !important; }
article.post-content h2 { font-size:1.2em !important; }
article.post-content h3 { font-size:1.1em !important; }
article.post-content h4, article.post-content h5, article.post-content h6 { font-size:1em !important; }
article.post-content ul, article.post-content ol { margin:.6em 0 .8em !important; padding-left:1.6em !important; }
article.post-content li { margin:.2em 0 !important; }
article.post-content hr { border:none !important; border-top:1px solid #ddd !important; margin:1.2em 0 !important; }

article.post-content img { max-width:100% !important; height:auto !important; border:1px solid #ddd !important; margin:.6em 0 !important; }
article.post-content img.sticker {
  display:inline !important; width:auto !important;
  max-width:1.4em !important; max-height:1.4em !important;
  vertical-align:-.25em !important; margin:0 .1em !important; border:none !important;
}

article.post-content pre, article.post-content code {
  font-size:.85em !important; background:#f5f5f5 !important; border:1px solid #e0e0e0 !important;
}
article.post-content pre { padding:.7em !important; overflow-x:auto !important; }
article.post-content code { padding:.1em .3em !important; }
article.post-content pre code { border:none !important; padding:0 !important; background:none !important; }
article.post-content blockquote {
  margin:.6em 0 !important; padding:0 0 0 1em !important;
  border-left:3px solid #ccc !important; color:#555 !important; background:none !important;
}
article.post-content table { border-collapse:collapse !important; width:100% !important; font-size:.9em !important; }
article.post-content th, article.post-content td { border:1px solid #ccc !important; padding:.3em .5em !important; }

/* 楼层操作条：图标没了，用文字标签补回语义 */
.comment-menu {
  display:block !important; font-size:.72em !important; margin-top:.5em !important;
  padding:0 !important; border:none !important; background:none !important; opacity:.55 !important;
}
.comment-menu .menu-item {
  display:inline !important; margin-right:1em !important; color:#666 !important;
  background:none !important; border:none !important; padding:0 !important; cursor:pointer !important;
}
.comment-menu .menu-item:nth-child(1)::before { content:"赞 " !important; }
.comment-menu .menu-item:nth-child(2)::before { content:"鸡腿 " !important; }
.comment-menu .menu-item:nth-child(3)::before { content:"踩 " !important; }
.comment-menu .menu-item:nth-child(4)::before { content:"收藏 " !important; }

.nsk-pager { background:none !important; border:none !important; padding:0 !important; margin:1em 0 !important; font-size:.85em !important; }

#editor, .md-editor { background:none !important; border:1px solid #ccc !important; box-shadow:none !important; margin:1.5em 0 !important; }
#editor textarea, #editor-body { font-size:.9em !important; background:#fff !important; }

/* ---------- v2.1 修补 ---------- */
/* 站方残留的阴影/圆角（分类 tag 的方框就来自 box-shadow） */
#nsk-body *, header * { box-shadow:none !important; border-radius:0 !important; text-shadow:none !important; }

/* 顶部滚动 banner：面板高度写死 52px，改成块级后会被裁掉 */
.topic-carousel-wrapper { margin:0 0 .3em !important; }
.topic-carousel-panel { height:auto !important; min-height:3.4em !important; overflow:hidden !important; }
.topic-carousel-item { padding:0 !important; border:none !important; }
.carousel-mask, .topic-carousel-index-wrapper { display:none !important; }

/* 列表 meta：· 分隔，数字补语义，分类 tag 用斜体而不是方框 */
.post-info .info-item { margin-right:0 !important; }
.post-info .info-item + .info-item::before,
.post-info .post-category::before { content:" · " !important; color:#bbb !important; margin:0 .45em !important; }
.post-info .info-views::after { content:" 阅" !important; color:#aaa !important; }
.post-info .info-comments-count::after { content:" 评" !important; color:#aaa !important; }
.post-category { font-size:inherit !important; color:#666 !important; text-decoration:none !important; font-style:italic !important; }

.sorter { display:block !important; }
.sorter a { display:inline !important; }

/* ---------- v2.2 找回账号区 ---------- */
/* 右栏不再隐藏，而是重排到正文上方，压成一段纯文本导航 */
#nsk-body { display:flex !important; flex-direction:column !important; }
#nsk-body-left { order:0 !important; }
#nsk-right-panel-container {
  display:block !important; order:-1 !important;
  width:auto !important; max-width:none !important;
  margin:0 0 1em !important; padding:0 0 .8em !important;
  border-bottom:1px solid #ddd !important; font-size:.8em !important;
}
#nsk-right-panel-container .nsk-panel,
#nsk-right-panel-container > div {
  background:none !important; border:none !important; box-shadow:none !important;
  padding:0 !important; margin:0 0 .35em !important;
}
#nsk-right-panel-container .nsk-panel.category-list { display:block !important; }
#nsk-right-panel-container h4 {
  display:inline !important; font-size:1em !important; font-weight:bold !important;
  margin:0 .6em 0 0 !important; padding:0 !important; border:none !important; background:none !important;
}
#nsk-right-panel-container h4::after { content:"：" !important; }
#nsk-right-panel-container ul { display:inline !important; list-style:none !important; margin:0 !important; padding:0 !important; }
#nsk-right-panel-container li { display:inline !important; margin:0 !important; padding:0 !important; }
#nsk-right-panel-container li + li::before { content:" · " !important; color:#bbb !important; }
#nsk-right-panel-container a { color:#00e !important; text-decoration:underline !important; }

/* 用户卡：用户名 + 操作 + 统计，各压成一行 */
.user-card, .user-head, .user-card .menu, .user-card .menu > div,
.user-stat .stat-block, .user-stat .stat-block > div {
  display:inline !important; margin:0 !important; padding:0 !important;
  background:none !important; border:none !important;
}
.user-card .Username { font-weight:bold !important; color:#000 !important; text-decoration:none !important; }
.user-stat { display:block !important; margin-top:.2em !important; }
.user-stat .stat-block > div + div::before,
.user-stat .stat-block + .stat-block::before { content:" · " !important; color:#bbb !important; }
.user-stat a { color:#666 !important; text-decoration:none !important; }

/* 签到/转账/设置/登出 只有图标，用 title 属性把文字补回来 */
.user-card .menu > div { margin-left:.6em !important; }
.user-card .menu > div > *[title] {
  display:inline !important; margin-left:.6em !important;
  color:#00e !important; text-decoration:underline !important; cursor:pointer !important;
}
.user-card .menu > div > *[title]::before { content:attr(title) !important; }

.btn.new-discussion {
  display:inline !important; background:none !important; border:none !important;
  padding:0 !important; color:#00e !important; text-decoration:underline !important; font-weight:bold !important;
}
.btn.new-discussion::before { content:"[" !important; }
.btn.new-discussion::after { content:"]" !important; }

/* 广告位、用户数/欢迎新用户墙不要 */
.promotation-item { display:none !important; }

/* ---------- v2.3 账号区改回侧边 ---------- */
/* 窄屏（<1140px）左侧没有空白，仍然退回正文上方的横排 */
@media (min-width:1140px) {
  /* 正文保持 700px 居中不动，导航块用 fixed 停在左边的空白里 */
  #nsk-right-panel-container {
    position:fixed !important;
    left:calc(50% - 350px - 210px) !important;
    top:4.5em !important;
    width:180px !important;
    max-height:calc(100vh - 6em) !important;
    overflow-y:auto !important;
    margin:0 !important; padding:0 !important;
    border:none !important;
    font-size:.72em !important;
    line-height:1.7 !important;
  }
  #nsk-right-panel-container .nsk-panel,
  #nsk-right-panel-container > div { margin:0 0 1em !important; }

  #nsk-right-panel-container h4 {
    display:block !important; margin:0 0 .2em !important;
    color:#999 !important; font-weight:normal !important;
  }
  #nsk-right-panel-container h4::after { content:"" !important; }
  #nsk-right-panel-container ul { display:block !important; }
  #nsk-right-panel-container li { display:block !important; }
  #nsk-right-panel-container li + li::before { content:"" !important; margin:0 !important; }
  #nsk-right-panel-container li a { display:block !important; }

  #nsk-right-panel-container .user-card,
  #nsk-right-panel-container .user-head,
  #nsk-right-panel-container .user-card .menu { display:block !important; }
  #nsk-right-panel-container .user-head { margin-bottom:.3em !important; }
  #nsk-right-panel-container .user-stat { padding:0 !important; margin:.3em 0 0 !important; }
  #nsk-right-panel-container .user-stat .stat-block > div { display:block !important; }
  #nsk-right-panel-container .user-stat .stat-block > div + div::before,
  #nsk-right-panel-container .user-stat .stat-block + .stat-block::before { content:"" !important; }

  #nsk-right-panel-container li, #nsk-right-panel-container li a,
  #nsk-right-panel-container .user-stat div {
    border:none !important; padding:0 !important; margin:0 !important; text-align:left !important;
  }
  #nsk-right-panel-container .btn.new-discussion {
    display:block !important; text-align:left !important; margin:.6em 0 !important;
  }
  .user-card .menu > div > *[title] {
    margin:0 .7em 0 0 !important; white-space:nowrap !important; display:inline-block !important;
  }
}

/* 统计块的浅黄底（站方 highlight）去掉 */
.user-stat, .user-stat * { background:none !important; border:none !important; }
#nsk-right-panel-container .user-stat a, #nsk-right-panel-container .user-stat span { color:#666 !important; }

/* ---------- v2.4 侧栏改到右边 / 修签到 / 去重版块 ---------- */
@media (min-width:1140px) {
  #nsk-right-panel-container { left:auto !important; right:calc(50% - 350px - 210px) !important; }
}

/* 悬浮用户卡是 body 级的另一个 .user-card，之前被行内化规则误伤，
   会以 "loading..." 的形式卡在页面左上角 */
body > .user-card.hover-user-card { display:none !important; }

/* 签到/转账这类按钮，站方的点击委托要命中 <svg>，图标一旦 display:none 就失效。
   改成把图标透明化并铺满整个按钮，当热区盖在文字上面。 */
#nsk-right-panel-container .user-card .menu > div > *[title] {
  position:relative !important; display:inline-block !important;
}
#nsk-right-panel-container .user-card .menu > div > *[title] > svg.iconpark-icon {
  display:block !important; position:absolute !important; left:0 !important; top:0 !important;
  width:100% !important; height:100% !important;
  opacity:0 !important; z-index:2 !important; margin:0 !important;
}

/* 顶部导航补全后可以换行 */
header { padding:.4em 0 !important; }
header > * { max-width:none !important; }
header ul.nav-menu {
  display:inline-flex !important; flex-wrap:wrap !important; align-items:center !important;
  row-gap:.2em !important; column-gap:.9em !important;
  margin:0 !important; padding:0 !important; list-style:none !important;
}
header ul.nav-menu li { display:inline !important; margin:0 !important; padding:0 !important; white-space:nowrap !important; }
header ul.nav-menu li a { display:inline !important; padding:0 !important; margin:0 !important; }
header ul.nav-menu li.current-category a { font-weight:bold !important; color:#000 !important; text-decoration:none !important; }

/* 由脚本打标记的冗余面板（所有版块、用户数目/欢迎新用户） */
#nsk-right-panel-container .mfw-hide.mfw-hide, .mfw-hide.mfw-hide { display:none !important; }

/* ---------- v2.5 顶部导航缩小 / 消除切页闪动 ---------- */
/* 补全成 15 个版块后 18px 会折成两行，缩到 .8em 正好一行 */
header { font-size:.8em !important; }
header .site-title { font-size:1.3em !important; margin-right:.6em !important; }
header ul.nav-menu { column-gap:.75em !important; }

/* 侧栏那份版块列表是纯静态判断，直接用 CSS 关掉，
   不走 JS —— 否则每次 SPA 切页它都会先渲染出来再被脚本隐藏，就是一次闪动 */
#nsk-right-panel-container .category-list.category-list { display:none !important; }

/* ---------- v3.3 评论无限滚动 ---------- */
/* 多页帖子的底部翻页器由滚动加载代替；顶部那份保留，用来跳页。
   开关挂在 body 上，非帖子页和单页帖子不会加 */
body.mfw-scroll .post-bottom-pager { display:none !important; }
.mfw-scroll-tip {
  text-align:center !important; padding:1em 0 !important;
  font-size:.8em !important; color:#999 !important;
}
.mfw-scroll-tip[data-retry] { color:#00e !important; text-decoration:underline !important; cursor:pointer !important; }`;

  // 顶部 tab 只有 7 个版块，侧栏那份有 14 个。这里写死是为了在 <ul class="nav-menu">
  // 一出现就能补齐 —— 若等右栏渲染出来再去抄，补全会发生在首屏绘制之后，
  // 顶部会先显示 8 项再跳成 15 项，那一跳就是切页时看到的闪动。
  const CATEGORIES = [
    ['日常', '/categories/daily'],
    ['技术', '/categories/tech'],
    ['情报', '/categories/info'],
    ['测评', '/categories/review'],
    ['交易', '/categories/trade'],
    ['拼车', '/categories/carpool'],
    ['推广', '/categories/promotion'],
    ['生活', '/categories/life'],
    ['Dev', '/categories/dev'],
    ['贴图', '/categories/photo-share'],
    ['曝光', '/categories/expose'],
    ['内版', '/categories/inside'],
    ['无意义', '/categories/meaningless'],
    ['沙盒', '/categories/sandbox'],
  ];

  // 这个面板没有可用的 class，只能按标题文字识别；
  // 不能按位置选（右栏面板数量随版块变，还会误伤弹层）
  const NOISE_PANEL = /用户数目|欢迎新用户/;

  /* ---------- 样式注入 ---------- */

  // 用 GM_addStyle 而不是自己 createElement：油猴的 @grant 一旦不是 none，
  // 脚本就跑在扩展的沙箱里，CSS 由扩展通道注入，不受页面 CSP 影响，
  // 也不会因为页面阻塞而排到首屏绘制之后 —— 那正是"原版样式闪一下"的成因。
  let node = null;
  try {
    node = GM_addStyle(CSS);
  } catch (e) {
    /* 万一 GM_addStyle 不可用，下面的 ensure() 会兜底 */
  }

  function ensure() {
    const root = document.head || document.documentElement;
    if (!root) return;
    if (!node || !node.isConnected) {
      node = document.getElementById(ID);
      if (!node) {
        node = document.createElement('style');
        node.textContent = CSS;
        root.appendChild(node);
      }
    }
    if (!node.id) node.id = ID;
    // 站方和其它用户脚本会在运行期追加 <style>，同为 !important 时后来者胜出，
    // 样式就会闪一下再被顶掉。所以每次都把自己挪回末尾。
    if (node.parentNode !== root || root.lastElementChild !== node) root.appendChild(node);
  }

  /* ---------- DOM 整理：CSS 表达不了的部分 ---------- */

  function fillNav() {
    // 解析途中 nav 可能只 parse 了一半，这时候追加会插到站方剩下的 li 前面，顺序就乱了。
    // 等 DOM 解析完再动它；此时仍在首屏绘制之前，看不出变化。
    if (document.readyState === 'loading') return;
    const nav = document.querySelector('header ul.nav-menu');
    if (!nav) return;
    if (nav.lastElementChild && nav.lastElementChild.dataset.mfw) return;

    const have = new Set();
    nav.querySelectorAll('a').forEach((a) => have.add(a.getAttribute('href')));

    // 写死的列表打底；若站方以后新增了版块，再从右栏那份补上（会晚一拍，但不常发生）
    const extra = document.querySelectorAll('#nsk-right-panel-container .category-list li a');
    const all = CATEGORIES.concat(
      Array.prototype.map.call(extra, (a) => [a.textContent.trim(), a.getAttribute('href')])
    );

    all.forEach((pair) => {
      const text = pair[0], href = pair[1];
      if (!href || have.has(href)) return;
      have.add(href);
      const li = document.createElement('li');
      li.dataset.mfw = '1';
      const link = document.createElement('a');
      link.href = href;
      link.textContent = text;
      li.appendChild(link);
      nav.appendChild(li);
    });
  }

  function hideNoisePanels() {
    const rp = document.getElementById('nsk-right-panel-container');
    if (!rp) return;
    rp.querySelectorAll(':scope > .nsk-panel:not(.mfw-hide)').forEach((p) => {
      const h = p.querySelector('h4');
      if (h && NOISE_PANEL.test(h.textContent)) p.classList.add('mfw-hide');
    });
  }

  /* ---------- 评论无限滚动 ---------- */

  // NodeSeek 的翻页是服务端渲染的普通链接（/post-<id>-<page>），
  // fetch 下一页、解析出 li.content-item 追加到当前列表即可，不碰站方接口。
  // 追加的是原生节点，Vue 不认识它们：楼层文字和链接正常，
  // 赞/踩/回复这类靠 Vue 事件绑定的按钮在新加载的楼层上不响应。
  // 幂等靠 ul.comments 上的 data-mfw-scroll 标记：SPA 切帖时 Vue 会造一个全新的 ul，
  // 标记跟旧节点一起消失，新帖自然重新初始化。
  let scrollIO = null;
  let scrollTip = null;

  function infiniteComments() {
    if (!document.body) return;
    if (!/^\/post-\d+-\d+/.test(location.pathname)) {
      document.body.classList.remove('mfw-scroll');
      return;
    }
    const list = document.querySelector('ul.comments');
    if (!list || list.dataset.mfwScroll) return;
    list.dataset.mfwScroll = '1';

    // 上一个帖子的 observer 和提示条先清掉
    if (scrollIO) scrollIO.disconnect();
    if (scrollTip) scrollTip.remove();

    const first = document.querySelector('.post-bottom-pager a.pager-next');
    let nextHref = first ? first.getAttribute('href') : null;
    if (!nextHref) {
      document.body.classList.remove('mfw-scroll'); // 只有一页
      return;
    }

    document.body.classList.add('mfw-scroll');
    scrollTip = document.createElement('div');
    scrollTip.className = 'mfw-scroll-tip';
    list.after(scrollTip);

    let loading = false;
    const seen = new Set();
    list.querySelectorAll('li[data-comment-id]').forEach((li) => seen.add(li.dataset.commentId));

    function loadNext() {
      if (!nextHref || loading) return;
      loading = true;
      scrollTip.textContent = '加载中…';
      scrollTip.removeAttribute('data-retry');
      fetch(nextHref, { credentials: 'same-origin' })
        .then((r) => (r.ok ? r.text() : Promise.reject(r.status)))
        .then((html) => {
          const doc = new DOMParser().parseFromString(html, 'text/html');
          doc.querySelectorAll('ul.comments > li.content-item').forEach((li) => {
            const id = li.dataset.commentId;
            if (id && seen.has(id)) return;
            if (id) seen.add(id);
            list.appendChild(document.adoptNode(li));
          });
          const n = doc.querySelector('.post-bottom-pager a.pager-next');
          nextHref = n ? n.getAttribute('href') : null;
          if (nextHref) {
            scrollTip.textContent = '';
          } else {
            scrollTip.textContent = '— 没有更多了 —';
            if (scrollIO) scrollIO.disconnect();
          }
        })
        .catch(() => {
          scrollTip.textContent = '加载失败，点击重试';
          scrollTip.dataset.retry = '1';
        })
        .then(() => {
          loading = false;
        });
    }

    scrollTip.addEventListener('click', () => {
      if (scrollTip.dataset.retry) loadNext();
    });

    // 提前 600px 触发；一次只拉一页，NodeSeek 对高频请求有限速
    scrollIO = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadNext();
      },
      { rootMargin: '600px 0px' }
    );
    scrollIO.observe(scrollTip);
  }

  /* ---------- 每日静默签到 ---------- */

  // 站方 /board 页上那两个按钮分别是 attendance(false) 和 attendance(true)，
  // 打到同一个接口，random 决定固定领取还是试试手气。这里用随机。
  const SIGN_URL = '/api/attendance?random=true';
  const SIGN_KEY = 'mfw-attendance-date';

  function today() {
    const d = new Date();
    return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
  }

  function readMark() {
    try { return GM_getValue(SIGN_KEY, ''); } catch (e) {}
    try { return localStorage.getItem(SIGN_KEY) || ''; } catch (e) {}
    return '';
  }

  function writeMark(v) {
    try { GM_setValue(SIGN_KEY, v); return; } catch (e) {}
    try { localStorage.setItem(SIGN_KEY, v); } catch (e) {}
  }

  let signTried = false;

  function autoAttendance() {
    if (signTried) return;
    if (readMark() === today()) return;
    // 没登录就别打接口
    if (!document.querySelector('#nsk-right-panel-container .user-card .Username')) return;

    signTried = true;
    fetch(SIGN_URL, {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((r) => r.json())
      .then((j) => {
        // success=true 是刚签上；今天已经签过时 success=false 且 message 会说明。
        // 两种都记下日期，免得每次刷新都打一次请求。
        const done = j && (j.success === true || /已|already/i.test(j.message || ''));
        if (done) {
          writeMark(today());
          console.log('[mfw] 签到:', (j && j.message) || 'ok');
        } else {
          signTried = false; // 失败就留给下次页面加载重试
        }
      })
      .catch(() => {
        signTried = false;
      });
  }

  // 同步执行，不要 requestAnimationFrame：MutationObserver 的回调是微任务，
  // 在这一帧绘制之前跑完，DOM 改动因此不会被看见。丢进 rAF 就会先亮一帧再改。
  function run() {
    ensure();
    try {
      fillNav();
      hideNoisePanels();
      infiniteComments();
      autoAttendance();
    } catch (e) {
      /* 站方改版时别把页面拖下水 */
    }
  }

  /* ---------- 观察 ---------- */

  ensure();

  const headObs = new MutationObserver(ensure);
  let watchedHead = null;
  function watchHead() {
    ensure();
    if (document.head && watchedHead !== document.head) {
      watchedHead = document.head;
      headObs.observe(document.head, { childList: true });
    }
  }

  let watchedBody = null;
  const bodyObs = new MutationObserver(run);
  function watchBody() {
    if (document.body && watchedBody !== document.body) {
      watchedBody = document.body;
      bodyObs.observe(document.body, { childList: true, subtree: true });
      run();
    }
  }

  watchHead();
  watchBody();

  // document-start 时 head/body 都还不存在，等它们出现
  new MutationObserver(function () {
    watchHead();
    watchBody();
    run();
  }).observe(document.documentElement, { childList: true });

  document.addEventListener('DOMContentLoaded', run);

  /* ---------- 自检：把注入时机打到 console ---------- */
  // 想关掉就删掉这一段。它只在 load 之后打一行。
  window.addEventListener('load', function () {
    const paint = performance.getEntriesByType('paint');
    const fp = paint.length ? Math.round(paint[0].startTime) : -1;
    const t0 = Math.round(T0);
    const verdict =
      fp < 0 ? '拿不到首屏时间' : t0 < fp ? '注入早于首屏绘制，不该闪' : '注入晚于首屏绘制 → 这就是闪动的原因';
    console.log('[mfw] 脚本 @' + t0 + 'ms / 首屏绘制 @' + fp + 'ms — ' + verdict);
  });
})();
