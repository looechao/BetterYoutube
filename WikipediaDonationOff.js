// ==UserScript==
// @name         Wikipedia Donation Banner Remover
// @namespace    https://github.com/looechao/BetterYoutube
// @icon         https://www.wikipedia.org/static/favicon/wikipedia.ico
// @version      1.0.0
// @description  Hides Wikipedia fundraising/donation banners and full-screen overlays. Local DOM-only, no network requests, no data collection.
// @author       looe
// @license      MIT
// @match        https://wikipedia.org/*
// @match        https://*.wikipedia.org/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  var HIDE_SELECTORS = [
    "#frb-inline",
    "#frb-overlay",
    '[id^="frb-"]',
    ".frb",
    ".frb-banner",
    ".mw-donation-banner",
    ".cn-fundraising",
  ];

  var CSS = HIDE_SELECTORS.join(",") + "{display:none !important;}";

  function injectStyle() {
    var style = document.createElement("style");
    style.textContent = CSS;
    var target = document.head || document.documentElement;
    if (target) target.appendChild(style);
    else document.addEventListener("DOMContentLoaded", injectStyle, { once: true });
  }

  function isFundraisingCentralNotice(node) {
    if (node.classList.contains("cn-fundraising")) return true;
    if (node.querySelector(".cn-fundraising, .frb, .mw-donation-banner")) return true;
    return /donat|fundrais/i.test(node.getAttribute("data-cn-notice") || "");
  }

  function unlockScroll() {
    if (document.querySelector("#frb-overlay, .frb")) return;
    document.documentElement.style.removeProperty("overflow");
    if (document.body) document.body.style.removeProperty("overflow");
  }

  function sweep(root) {
    var scope = root && root.querySelectorAll ? root : document;

    HIDE_SELECTORS.forEach(function (sel) {
      try {
        scope.querySelectorAll(sel).forEach(function (el) {
          el.remove();
        });
      } catch (e) {}
    });

    scope.querySelectorAll("#centralNotice").forEach(function (cn) {
      if (isFundraisingCentralNotice(cn)) cn.remove();
    });

    var siteNotice = document.querySelector("#siteNotice");
    if (siteNotice && siteNotice.children.length === 0) siteNotice.remove();

    unlockScroll();
  }

  injectStyle();

  var scheduled = false;
  function scheduleSweep() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(function () {
      scheduled = false;
      sweep(document);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scheduleSweep, { once: true });
  } else {
    scheduleSweep();
  }

  new MutationObserver(function (mutations) {
    for (var i = 0; i < mutations.length; i++) {
      if (mutations[i].addedNodes.length) return scheduleSweep();
    }
  }).observe(document, { childList: true, subtree: true });
})();
