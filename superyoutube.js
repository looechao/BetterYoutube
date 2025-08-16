// ==UserScript==
// @name        Better YouTube
// @name:zh-CN  Better YouTube
// @description       A simple YouTube enhancer focusing on layout optimization and basic features
// @description:zh-CN 简单的YouTube增强器，专注于布局优化和基本功能
// @namespace   FunnyMonkey_NameScope
// @version     1.0.0
// @author      Privacy-Focused
// @icon        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAwRJREFUaEPtWUtOAzEMTQZRcQkqlnCKlpO1PRnlFLBEcAkEao0c4siTyceTDNMG6AraJPbL8z9aNf7Rjeuv/gaAp5urtToe17Oy1XX7u5f3fU5mkoGn5WKrldrkDvnJ30Gp3d3rxzYmIwgAb1wfDhul9by3HtMSYA8XF7sQI0EAz9eXDznloevu8UC3FmB/+/Z5b8Afjw+Ts2LP988dABCbjacwUS3eX4AwZE4DAM/LBYjO9gEQI9L9IiHDRbevHz2de/+Mpd+Z0XIBdLC7AGu3GL1cILDfkX/hflRxjMmRTILWBzA26hALy8UWIwWZjzOnm6s1+om7GLYeQQ1AC1jxzWgSACSXHJozw/9WZwdAKcUpJfPBm6Vbpxsz4JRSJlJZpk/PAAPAo09bAGym/AcgcGBcMq0TswN/FQPk2AiKCjHj4Cz5YX7o/XZODJCipJNjh9UzGKWoOBNn/58wIaMkwHfdzqtX+s7/ntbj2tC+DBOT+4CQ+cmW1QPAekbrR9V10W4p1kmZzi70Yd1eroGqAuAXUpNdq3dQqh8pBpBr7aYEk6qKywB44S+kbKxvdQMBYZPuF4a+rCIA2W4r0u6hcL/EljIVM6M6AHa8ogFWJmQyh446rq08x5pgrDWtAuAnJolSEgZ4UnMyIsOBMgC2300B4KUC0W/KauryMGnZRNfrIdgEhCsXc+STAsD8YeK815mhUmSWro46NwZcZ8aKuh5TVuEmAZjphJ1e8IFAaFpxMhNKMcBDa5MA/GGVyR9N+sDhsKEh7ux5gMIoKkC2y8NoyoSCPhAZspX5gDejDyWnUFfVywOskUnZOW9HQ6V1EYBBi2jfDzCuUxFnQAGskAETUQBWbtyOpoE9BDZtdg2VHrTP4GNvAGW1UGy2nyjWpMXZ2HWxPjk53EUh0Y2Zp56xCqbWp94YkuN1Xv6GBEiKt1ogKeVFDxyGhdwTk50mkF3XKG1qIPqk3uSkT0wuibT8yOeXzTU3XLs3Z7ail/pmH7prb2+O/SIG5lCkVEbzAL4A07+gbQ8x85sAAAAASUVORK5CYII=
// @include     https://www.youtube.com
// @include     *://*.youtube.com/**
// @exclude     *://accounts.youtube.com/*
// @exclude     *://www.youtube.com/live_chat_replay*
// @exclude     *://www.youtube.com/persist_identity*
// @license     MIT
// @run-at      document-start
// @grant       GM_registerMenuCommand
// @grant       GM_openInTab
// @grant       GM.openInTab
// @grant       GM_addStyle
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       unsafeWindow
// ==/UserScript==
(function () {
  'use strict';

  
  /*!
  * Copyright (c) 2024 - 2025, FunnyMonkey. All rights reserved.
  *
  * Permission is hereby granted, free of charge, to any person obtaining a copy
  * of this software and associated documentation files (the "Software"), to deal
  * in the Software without restriction, including without limitation the rights
  * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  * copies of the Software, and to permit persons to whom the Software is
  * furnished to do so, subject to the following conditions:
  *
  * The above copyright notice and this permission notice shall be included in
  * all copies or substantial portions of the Software.
  *
  * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  *
  * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  * SOFTWARE.
  */


  var css_248z$1 = "@keyframes relatedElementProvided{0%{background-position-x:3px}to{background-position-x:4px}}html[tabview-loaded=icp] #related.ytd-watch-flexy{animation:relatedElementProvided 1ms linear 0s 1 normal forwards}html[tabview-loaded=icp] #right-tabs #related.ytd-watch-flexy,html[tabview-loaded=icp] #right-tabs ytd-expander#expander,html[tabview-loaded=icp] [hidden] #related.ytd-watch-flexy,html[tabview-loaded=icp] [hidden] ytd-expander#expander,html[tabview-loaded=icp] ytd-comments ytd-expander#expander{animation:initial}#secondary.ytd-watch-flexy{position:relative}#secondary-inner.style-scope.ytd-watch-flexy{height:100%}secondary-wrapper{border:0;box-sizing:border-box;contain:strict;flex-wrap:nowrap;height:100%;left:0;max-height:calc(100vh - var(--ytd-toolbar-height, 56px));padding:0;padding-bottom:var(--ytd-margin-6x);padding-right:var(--ytd-margin-6x);padding-top:var(--ytd-margin-6x);position:absolute;right:0;top:0}#right-tabs,secondary-wrapper{display:flex;flex-direction:column;margin:0}#right-tabs{flex-grow:1;padding:0;position:relative}[tyt-tab=\"\"] #right-tabs{flex-grow:0}[tyt-tab=\"\"] #right-tabs .tab-content{border:0}#right-tabs .tab-content{flex-grow:1}ytd-watch-flexy[hide-default-text-inline-expander] #primary.style-scope.ytd-watch-flexy ytd-text-inline-expander{display:none}ytd-watch-flexy:not([keep-comments-scroller]) #tab-comments.tab-content-hidden{--comment-pre-load-sizing:90px;border:0;contain:strict;display:block!important;height:var(--comment-pre-load-sizing)!important;left:2px;margin:0;overflow:hidden;padding:0;pointer-events:none!important;position:fixed!important;top:2px;visibility:collapse;width:var(--comment-pre-load-sizing)!important;z-index:-1}ytd-watch-flexy:not([keep-comments-scroller]) #tab-comments.tab-content-hidden ytd-comments#comments>*{display:none!important}ytd-watch-flexy:not([keep-comments-scroller]) #tab-comments.tab-content-hidden ytd-comments#comments>ytd-item-section-renderer#sections{border:0;contain:strict;display:block!important;height:var(--comment-pre-load-sizing);margin:0;overflow:hidden;padding:0;width:var(--comment-pre-load-sizing)}ytd-watch-flexy:not([keep-comments-scroller]) #tab-comments.tab-content-hidden ytd-comments#comments>ytd-item-section-renderer#sections>*{display:none!important}ytd-watch-flexy:not([keep-comments-scroller]) #tab-comments.tab-content-hidden ytd-comments#comments>ytd-item-section-renderer#sections>#contents{border:0;contain:strict;display:flex!important;flex-direction:row;gap:60px;height:var(--comment-pre-load-sizing);margin:0;overflow:hidden;padding:0;width:var(--comment-pre-load-sizing)}ytd-watch-flexy:not([keep-comments-scroller]) #tab-comments.tab-content-hidden ytd-comments#comments>ytd-item-section-renderer#sections>#contents>*{border:0;box-sizing:content-box;contain:strict;display:block!important;height:var(--comment-pre-load-sizing);margin:calc(var(--comment-pre-load-sizing)*2)!important;overflow:hidden;padding:0;visibility:collapse!important;width:var(--comment-pre-load-sizing)}ytd-watch-flexy:not([keep-comments-scroller]) #tab-comments.tab-content-hidden ytd-comments#comments>ytd-item-section-renderer#sections>#contents>:empty{box-sizing:content-box;contain:strict;display:none!important;height:0;margin:0!important;overflow:hidden;visibility:collapse!important;width:0}ytd-watch-flexy:not([keep-comments-scroller]) #tab-comments.tab-content-hidden ytd-comments#comments>ytd-item-section-renderer#sections>#contents>ytd-continuation-item-renderer{box-sizing:initial;contain:strict;display:block!important;height:1px;margin:0!important;overflow:initial;visibility:collapse!important;width:1px}ytd-watch-flexy:not([keep-comments-scroller]) #tab-comments.tab-content-hidden ytd-comments#comments>ytd-item-section-renderer#sections>#contents>*>*{box-sizing:content-box;contain:strict;display:none!important;height:0;margin:0!important;overflow:hidden;visibility:collapse!important;width:0}#right-tabs #material-tabs{border:1px solid var(--ytd-searchbox-legacy-border-color);display:flex;overflow:hidden;padding:0;position:relative}[tyt-tab] #right-tabs #material-tabs{border-radius:var(--tyt-rounded-a1) var(--tyt-rounded-a1) var(--tyt-rounded-a1) var(--tyt-rounded-a1)}[tyt-tab^=\"#\"] #right-tabs #material-tabs{border-radius:var(--tyt-rounded-a1) var(--tyt-rounded-a1) 0 0}ytd-watch-flexy[flexy]:not([is-two-columns_]) #right-tabs #material-tabs{outline:0}#right-tabs #material-tabs a.tab-btn[tyt-tab-content]>*{pointer-events:none}#right-tabs #material-tabs a.tab-btn[tyt-tab-content]>.font-size-right{display:none;pointer-events:auto}ytd-watch-flexy #right-tabs .tab-content{border:1px solid var(--ytd-searchbox-legacy-border-color);border-radius:0 0 var(--tyt-rounded-a1) var(--tyt-rounded-a1);border-top:0;box-sizing:border-box;display:block;display:flex;flex-direction:row;overflow:hidden;padding:0;position:relative;top:0}ytd-watch-flexy:not([is-two-columns_]) #right-tabs .tab-content{height:100%}ytd-watch-flexy #right-tabs .tab-content-cld{--tab-content-padding:var(--ytd-margin-4x);box-sizing:border-box;contain:layout paint;display:block;overflow:auto;padding:var(--tab-content-padding);position:relative;width:100%}#right-tabs,.tab-content,.tab-content-cld{animation:none;transition:none}ytd-watch-flexy[is-two-columns_] #right-tabs .tab-content-cld{contain:size layout paint style;height:100%;position:absolute;width:100%}ytd-watch-flexy #right-tabs .tab-content-cld.tab-content-hidden{contain:size layout paint style;display:none;width:100%}@supports (color:var(--tabview-tab-btn-define )){ytd-watch-flexy #right-tabs .tab-btn{background:var(--yt-spec-general-background-a)}html{--tyt-tab-btn-flex-grow:1;--tyt-tab-btn-flex-basis:0%;--tyt-tab-bar-color-1-def:#ff4533;--tyt-tab-bar-color-2-def:var(--yt-brand-light-red);--tyt-tab-bar-color-1:var(--main-color,var(--tyt-tab-bar-color-1-def));--tyt-tab-bar-color-2:var(--main-color,var(--tyt-tab-bar-color-2-def))}ytd-watch-flexy #right-tabs .tab-btn[tyt-tab-content]{--tyt-tab-btn-color:var(--yt-spec-text-secondary);background-color:var(--ytd-searchbox-legacy-button-color);border:0;border-bottom:4px solid transparent;color:var(--tyt-tab-btn-color);cursor:pointer;display:inline-block;flex-basis:0%;flex-basis:var(--tyt-tab-btn-flex-basis);flex-grow:1;flex-grow:var(--tyt-tab-btn-flex-grow);flex-shrink:1;font-size:12px;font-weight:500;line-height:18px;overflow:hidden;padding:14px 8px 10px;position:relative;text-align:center;text-decoration:none;text-overflow:clip;text-transform:uppercase;text-transform:var(--yt-button-text-transform,inherit);transition:border .2s linear .1s;white-space:nowrap}ytd-watch-flexy #right-tabs .tab-btn[tyt-tab-content]>svg{fill:var(--iron-icon-fill-color,currentcolor);stroke:var(--iron-icon-stroke-color,none);color:var(--yt-button-color,inherit);height:18px;margin-right:0;opacity:.5;padding-right:0;vertical-align:bottom}ytd-watch-flexy #right-tabs .tab-btn{--tabview-btn-txt-ml:8px}ytd-watch-flexy[tyt-comment-disabled] #right-tabs .tab-btn[tyt-tab-content=\"#tab-comments\"]{--tabview-btn-txt-ml:0px}ytd-watch-flexy #right-tabs .tab-btn[tyt-tab-content]>svg+span{margin-left:var(--tabview-btn-txt-ml)}ytd-watch-flexy #right-tabs .tab-btn[tyt-tab-content] svg{pointer-events:none}ytd-watch-flexy #right-tabs .tab-btn[tyt-tab-content].active{--tyt-tab-btn-color:var(--yt-spec-text-primary);background-color:var(--ytd-searchbox-legacy-button-focus-color);border-bottom-color:var(--tyt-tab-bar-color-1);border-bottom:2px solid var(--tyt-tab-bar-color-2);font-weight:500;outline:0}ytd-watch-flexy #right-tabs .tab-btn[tyt-tab-content].active svg{opacity:.9}ytd-watch-flexy #right-tabs .tab-btn[tyt-tab-content]:not(.active):hover{--tyt-tab-btn-color:var(--yt-spec-text-primary);background-color:var(--ytd-searchbox-legacy-button-hover-color)}ytd-watch-flexy #right-tabs .tab-btn[tyt-tab-content]:not(.active):hover svg{opacity:.9}ytd-watch-flexy #right-tabs .tab-btn[tyt-tab-content]{user-select:none!important}ytd-watch-flexy #right-tabs .tab-btn[tyt-tab-content].tab-btn-hidden{display:none}ytd-watch-flexy[tyt-comment-disabled] #right-tabs .tab-btn[tyt-tab-content=\"#tab-comments\"],ytd-watch-flexy[tyt-comment-disabled] #right-tabs .tab-btn[tyt-tab-content=\"#tab-comments\"]:hover{--tyt-tab-btn-color:var(--yt-spec-icon-disabled)}ytd-watch-flexy[tyt-comment-disabled] #right-tabs .tab-btn[tyt-tab-content=\"#tab-comments\"] span#tyt-cm-count:empty{display:none}ytd-watch-flexy #right-tabs .tab-btn span#tyt-cm-count:empty:after{color:currentColor;display:inline-block;font-size:inherit;text-align:left;transform:scaleX(.8);width:4em}}@supports (color:var(--tyt-cm-count-define )){ytd-watch-flexy{--tyt-x-loading-content-letter-spacing:2px}html{--tabview-text-loading:\"Loading\";--tabview-text-fetching:\"Fetching\";--tabview-panel-loading:var(--tabview-text-loading)}html:lang(ja){--tabview-text-loading:\"読み込み中\";--tabview-text-fetching:\"フェッチ..\"}html:lang(ko){--tabview-text-loading:\"로딩..\";--tabview-text-fetching:\"가져오기..\"}html:lang(zh-Hant){--tabview-text-loading:\"載入中\";--tabview-text-fetching:\"擷取中\"}html:lang(zh-Hans){--tabview-text-loading:\"加载中\";--tabview-text-fetching:\"抓取中\"}html:lang(ru){--tabview-text-loading:\"Загрузка\";--tabview-text-fetching:\"Получение\"}ytd-watch-flexy #right-tabs .tab-btn span#tyt-cm-count:empty:after{content:var(--tabview-text-loading);letter-spacing:var(--tyt-x-loading-content-letter-spacing)}}@supports (color:var(--tabview-font-size-btn-define )){.font-size-right{align-content:space-evenly;bottom:0;display:inline-flex;flex-direction:column;justify-content:space-evenly;padding:4px 0;pointer-events:none;position:absolute;right:0;top:0;width:16px}html body ytd-watch-flexy.style-scope .font-size-btn{user-select:none!important}.font-size-btn{--tyt-font-size-btn-display:none;background-color:var(--yt-spec-badge-chip-background);box-sizing:border-box;color:var(--yt-spec-text-secondary);cursor:pointer;display:var(--tyt-font-size-btn-display,none);font-family:Menlo,Lucida Console,Monaco,Consolas,monospace;font-weight:900;height:12px;line-height:100%;margin:0;padding:0;pointer-events:all;position:relative;transform-origin:left top;transition:background-color 90ms linear,color 90ms linear;width:12px}.font-size-btn:hover{background-color:var(--yt-spec-text-primary);color:var(--yt-spec-general-background-a)}@supports (zoom:0.5){.tab-btn .font-size-btn{--tyt-font-size-btn-display:none}.tab-btn.active:hover .font-size-btn{--tyt-font-size-btn-display:inline-block}}}body ytd-watch-flexy:not([is-two-columns_]) #columns.ytd-watch-flexy{flex-direction:column}body ytd-watch-flexy:not([is-two-columns_]) #secondary.ytd-watch-flexy{box-sizing:border-box;display:block;width:100%}body ytd-watch-flexy:not([is-two-columns_]) #secondary.ytd-watch-flexy secondary-wrapper{contain:content;height:auto;padding-left:var(--ytd-margin-6x)}body ytd-watch-flexy:not([is-two-columns_]) #secondary.ytd-watch-flexy secondary-wrapper #right-tabs{overflow:auto}[tyt-chat=\"+\"] secondary-wrapper>[tyt-chat-container]{display:flex;flex-direction:column;flex-grow:1;flex-shrink:0}[tyt-chat=\"+\"] secondary-wrapper>[tyt-chat-container]>#chat{flex-grow:1}ytd-watch-flexy[is-two-columns_]:not([theater]) #columns.style-scope.ytd-watch-flexy{min-height:calc(100vh - var(--ytd-toolbar-height, 56px))}ytd-watch-flexy[is-two-columns_] ytd-live-chat-frame#chat{height:auto!important;min-height:auto!important}ytd-watch-flexy[tyt-tab^=\"#\"]:not([is-two-columns_]):not([tyt-chat=\"+\"]) #right-tabs{min-height:var(--ytd-watch-flexy-chat-max-height)}body ytd-watch-flexy:not([is-two-columns_]) #chat.ytd-watch-flexy{margin-top:0}body ytd-watch-flexy:not([is-two-columns_]) ytd-watch-metadata.ytd-watch-flexy{margin-bottom:0}ytd-watch-metadata.ytd-watch-flexy ytd-metadata-row-container-renderer{display:none}#tab-info [show-expand-button] #expand-sizer.ytd-text-inline-expander{visibility:initial}#tab-info #social-links.style-scope.ytd-video-description-infocards-section-renderer>#left-arrow-container.ytd-video-description-infocards-section-renderer>#left-arrow,#tab-info #social-links.style-scope.ytd-video-description-infocards-section-renderer>#right-arrow-container.ytd-video-description-infocards-section-renderer>#right-arrow{border:6px solid transparent;opacity:.65}#tab-info #social-links.style-scope.ytd-video-description-infocards-section-renderer>#left-arrow-container.ytd-video-description-infocards-section-renderer>#left-arrow:hover,#tab-info #social-links.style-scope.ytd-video-description-infocards-section-renderer>#right-arrow-container.ytd-video-description-infocards-section-renderer>#right-arrow:hover{opacity:1}#tab-info #social-links.style-scope.ytd-video-description-infocards-section-renderer>div#left-arrow-container:before{background:transparent;content:\"\";display:block;height:40px;left:-20px;position:absolute;top:0;width:40px;z-index:-1}#tab-info #social-links.style-scope.ytd-video-description-infocards-section-renderer>div#right-arrow-container:before{background:transparent;content:\"\";display:block;height:40px;position:absolute;right:-20px;top:0;width:40px;z-index:-1}body ytd-watch-flexy[is-two-columns_][tyt-egm-panel_] #columns.style-scope.ytd-watch-flexy #panels.style-scope.ytd-watch-flexy{display:flex;flex-direction:column;flex-grow:1;flex-shrink:0}body ytd-watch-flexy[is-two-columns_][tyt-egm-panel_] #columns.style-scope.ytd-watch-flexy #panels.style-scope.ytd-watch-flexy ytd-engagement-panel-section-list-renderer[target-id][visibility=ENGAGEMENT_PANEL_VISIBILITY_EXPANDED]{display:flex;flex-direction:column;flex-grow:1;flex-shrink:0;height:auto;max-height:none;min-height:auto}secondary-wrapper [visibility=ENGAGEMENT_PANEL_VISIBILITY_EXPANDED] #body.ytd-transcript-renderer:not(:empty),secondary-wrapper [visibility=ENGAGEMENT_PANEL_VISIBILITY_EXPANDED] #content.ytd-transcript-renderer:not(:empty),secondary-wrapper [visibility=ENGAGEMENT_PANEL_VISIBILITY_EXPANDED] ytd-transcript-renderer:not(:empty){flex-grow:1;height:auto;max-height:none;min-height:auto}secondary-wrapper #content.ytd-engagement-panel-section-list-renderer{position:relative}secondary-wrapper #content.ytd-engagement-panel-section-list-renderer>[panel-target-id]:only-child{contain:style size}secondary-wrapper #content.ytd-engagement-panel-section-list-renderer ytd-transcript-segment-list-renderer.ytd-transcript-search-panel-renderer{contain:strict;flex-grow:1}secondary-wrapper #content.ytd-engagement-panel-section-list-renderer ytd-transcript-segment-renderer.style-scope.ytd-transcript-segment-list-renderer,secondary-wrapper #content.ytd-engagement-panel-section-list-renderer ytd-transcript-segment-renderer.style-scope.ytd-transcript-segment-list-renderer>.segment{contain:layout paint style}body ytd-watch-flexy[theater] #secondary.ytd-watch-flexy{margin-top:var(--ytd-margin-3x);padding-top:0}body ytd-watch-flexy[theater] secondary-wrapper{margin-top:0;padding-top:0}body ytd-watch-flexy[theater] #chat.ytd-watch-flexy{margin-bottom:var(--ytd-margin-2x)}#tab-comments ytd-comments#comments [field-of-cm-count]{margin-top:0}#tab-info>ytd-expandable-video-description-body-renderer{margin-bottom:var(--ytd-margin-3x)}#tab-info [class]:last-child{margin-bottom:0;padding-bottom:0}#tab-info ytd-rich-metadata-row-renderer ytd-rich-metadata-renderer{max-width:none}ytd-watch-flexy[is-two-columns_] secondary-wrapper #chat.ytd-watch-flexy{margin-bottom:var(--ytd-margin-3x)}ytd-watch-flexy[tyt-tab] tp-yt-paper-tooltip{contain:content;white-space:nowrap}ytd-watch-info-text tp-yt-paper-tooltip.style-scope.ytd-watch-info-text{margin-bottom:-300px;margin-top:-96px}[hide-default-text-inline-expander] #bottom-row #description.ytd-watch-metadata{font-size:1.2rem;line-height:1.8rem}[hide-default-text-inline-expander] #bottom-row #description.ytd-watch-metadata yt-animated-rolling-number{font-size:inherit}[hide-default-text-inline-expander] #bottom-row #description.ytd-watch-metadata #info-container.style-scope.ytd-watch-info-text{align-items:center}ytd-watch-flexy[hide-default-text-inline-expander]{--tyt-bottom-watch-metadata-margin:6px}[hide-default-text-inline-expander] #bottom-row #description.ytd-watch-metadata>#description-inner.ytd-watch-metadata{margin:6px 12px}[hide-default-text-inline-expander] ytd-watch-metadata[title-headline-xs] h1.ytd-watch-metadata{font-size:1.8rem}ytd-watch-flexy[is-two-columns_][hide-default-text-inline-expander] #below.style-scope.ytd-watch-flexy ytd-merch-shelf-renderer{border:0;margin:0;padding:0}ytd-watch-flexy[is-two-columns_][hide-default-text-inline-expander] #below.style-scope.ytd-watch-flexy ytd-watch-metadata.ytd-watch-flexy{margin-bottom:6px}#tab-info yt-video-attribute-view-model .yt-video-attribute-view-model--horizontal .yt-video-attribute-view-model__link-container .yt-video-attribute-view-model__hero-section{flex-shrink:0}#tab-info yt-video-attribute-view-model .yt-video-attribute-view-model__overflow-menu{background:var(--yt-emoji-picker-category-background-color);border-radius:99px}#tab-info yt-video-attribute-view-model .yt-video-attribute-view-model--image-square.yt-video-attribute-view-model--image-large .yt-video-attribute-view-model__hero-section{max-height:128px}#tab-info yt-video-attribute-view-model .yt-video-attribute-view-model--image-large .yt-video-attribute-view-model__hero-section{max-width:128px}#tab-info ytd-reel-shelf-renderer #items.yt-horizontal-list-renderer ytd-reel-item-renderer.yt-horizontal-list-renderer{max-width:142px}ytd-watch-info-text#ytd-watch-info-text.style-scope.ytd-watch-metadata #date-text.style-scope.ytd-watch-info-text,ytd-watch-info-text#ytd-watch-info-text.style-scope.ytd-watch-metadata #view-count.style-scope.ytd-watch-info-text{align-items:center}ytd-watch-info-text:not([detailed]) #info.ytd-watch-info-text a.yt-simple-endpoint.yt-formatted-string{pointer-events:none}body ytd-app>ytd-popup-container>tp-yt-iron-dropdown>#contentWrapper>[slot=dropdown-content]{backdrop-filter:none}#tab-info [tyt-clone-refresh-count]{overflow:visible!important}#tab-info #items.ytd-horizontal-card-list-renderer yt-video-attribute-view-model.ytd-horizontal-card-list-renderer{contain:layout}#tab-info #thumbnail-container.ytd-structured-description-channel-lockup-renderer,#tab-info ytd-media-lockup-renderer[is-compact] #thumbnail-container.ytd-media-lockup-renderer{flex-shrink:0}secondary-wrapper ytd-donation-unavailable-renderer{--ytd-margin-6x:var(--ytd-margin-2x);--ytd-margin-5x:var(--ytd-margin-2x);--ytd-margin-4x:var(--ytd-margin-2x);--ytd-margin-3x:var(--ytd-margin-2x)}[tyt-no-less-btn] #less{display:none}.tyt-metadata-hover-resized #analytics-button,.tyt-metadata-hover-resized #purchase-button,.tyt-metadata-hover-resized #sponsor-button,.tyt-metadata-hover-resized #subscribe-button{display:none!important}.tyt-metadata-hover #upload-info{flex-basis:100vw;flex-shrink:0;max-width:max-content;min-width:max-content}#tab-info ytd-structured-description-playlist-lockup-renderer[collections] #playlist-thumbnail.style-scope.ytd-structured-description-playlist-lockup-renderer{max-width:100%}#tab-info ytd-structured-description-playlist-lockup-renderer[collections] #lockup-container.ytd-structured-description-playlist-lockup-renderer{padding:1px}#tab-info ytd-structured-description-playlist-lockup-renderer[collections] #thumbnail.ytd-structured-description-playlist-lockup-renderer{outline:1px solid hsla(0,0%,50%,.5)}ytd-live-chat-frame#chat[collapsed] ytd-message-renderer~#show-hide-button.ytd-live-chat-frame>ytd-toggle-button-renderer.ytd-live-chat-frame{padding:0}.tyt-info-invisible{display:none}[tyt-playlist-expanded] secondary-wrapper>ytd-playlist-panel-renderer#playlist{flex-grow:1;flex-shrink:1;max-height:unset!important;overflow:auto}[tyt-playlist-expanded] secondary-wrapper>ytd-playlist-panel-renderer#playlist>#container{max-height:unset!important}secondary-wrapper ytd-playlist-panel-renderer{--ytd-margin-6x:var(--ytd-margin-3x)}ytd-watch-flexy[theater] ytd-playlist-panel-renderer[collapsible][collapsed] .header.ytd-playlist-panel-renderer{padding:6px 8px}ytd-watch-flexy[theater] #playlist.ytd-watch-flexy{margin-bottom:var(--ytd-margin-2x)}ytd-watch-flexy[theater] #right-tabs .tab-btn[tyt-tab-content]{border-bottom:0 solid transparent;padding:8px 4px 6px}ytd-watch-flexy{--tyt-bottom-watch-metadata-margin:12px}ytd-watch-flexy[rounded-info-panel],ytd-watch-flexy[rounded-player-large]{--tyt-rounded-a1:${VAL_ROUNDED_A1}px}#bottom-row.style-scope.ytd-watch-metadata .item.ytd-watch-metadata{margin-right:var(--tyt-bottom-watch-metadata-margin,12px);margin-top:var(--tyt-bottom-watch-metadata-margin,12px)}#cinematics{contain:layout style size}";

  const VAL_ROUNDED_A1 = 12;
  const styles = {
    main: css_248z$1.replace("${VAL_ROUNDED_A1}", VAL_ROUNDED_A1)
  };

  /*!
   * table function
   * MIT, https://github.com/tabview-youtube/Tabview-Youtube
   * @param {*} communicationKey
   * Optimize project structure to make it more reliable
   */
  const executionScript = (communicationKey) => {
    if (typeof trustedTypes !== "undefined" && trustedTypes.defaultPolicy === null) {
      let s = (s2) => s2;
      trustedTypes.createPolicy("default", {
        createHTML: s,
        createScriptURL: s,
        createScript: s
      });
    }
    const defaultPolicy = typeof trustedTypes !== "undefined" && trustedTypes.defaultPolicy || { createHTML: (s) => s };
    function createHTML(s) {
      return defaultPolicy.createHTML(s);
    }
    let trustHTMLErr = null;
    try {
      document.createElement("div").innerHTML = createHTML("1");
    } catch (e) {
      trustHTMLErr = e;
    }
    if (trustHTMLErr) {
      trustHTMLErr();
    }
    const setTimeout_ = setTimeout.bind(window);
    try {
      let getWord = function(tag) {
        return langWords[pageLang][tag] || langWords["en"][tag] || "";
      }, getTabsHTML = function() {
        const sTabBtnVideos = `${svgElm(
        16,
        16,
        90,
        90,
        svgVideos
      )}<span>${getWord("videos")}</span>`;
        const sTabBtnInfo = `${svgElm(16, 16, 60, 60, svgInfo)}<span>${getWord(
        "info"
      )}</span>`;
        const sTabBtnPlayList = `${svgElm(
        16,
        16,
        20,
        20,
        svgPlayList
      )}<span>${getWord("playlist")}</span>`;
        let str1 = `
        <paper-ripple class="style-scope yt-icon-button">
            <div id="background" class="style-scope paper-ripple" style="opacity:0;"></div>
            <div id="waves" class="style-scope paper-ripple"></div>
        </paper-ripple>
        `;
        let str_fbtns = `
    <div class="font-size-right">
    <div class="font-size-btn font-size-plus" tyt-di="8rdLQ">
    <svg width="12" height="12" viewbox="0 0 50 50" preserveAspectRatio="xMidYMid meet" 
    stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-size">
      <path d="M12 25H38M25 12V38"/>
    </svg>
    </div><div class="font-size-btn font-size-minus" tyt-di="8rdLQ">
    <svg width="12" height="12" viewbox="0 0 50 50" preserveAspectRatio="xMidYMid meet"
    stroke="currentColor" stroke-width="6" stroke-linecap="round" vector-effect="non-scaling-size">
      <path d="M12 25h26"/>
    </svg>
    </div>
    </div>
    `.replace(/[\r\n]+/g, "");
        const str_tabs = [
          `<a id="tab-btn1" tyt-di="q9Kjc" tyt-tab-content="#tab-info" class="tab-btn${(hiddenTabsByUserCSS & 1) === 1 ? " tab-btn-hidden" : ""}">${sTabBtnInfo}${str1}${str_fbtns}</a>`,
          `<a id="tab-btn3" tyt-di="q9Kjc" tyt-tab-content="#tab-comments" class="tab-btn${(hiddenTabsByUserCSS & 2) === 2 ? " tab-btn-hidden" : ""}">${svgElm(
          16,
          16,
          120,
          120,
          svgComments
        )}<span id="tyt-cm-count"></span>${str1}${str_fbtns}</a>`,
          `<a id="tab-btn4" tyt-di="q9Kjc" tyt-tab-content="#tab-videos" class="tab-btn${(hiddenTabsByUserCSS & 4) === 4 ? " tab-btn-hidden" : ""}">${sTabBtnVideos}${str1}${str_fbtns}</a>`,
          `<a id="tab-btn5" tyt-di="q9Kjc" tyt-tab-content="#tab-list" class="tab-btn tab-btn-hidden">${sTabBtnPlayList}${str1}${str_fbtns}</a>`
        ].join("");
        let addHTML = `
        <div id="right-tabs">
            <tabview-view-pos-thead></tabview-view-pos-thead>
            <header>
                <div id="material-tabs">
                    ${str_tabs}
                </div>
            </header>
            <div class="tab-content">
                <div id="tab-info" class="tab-content-cld tab-content-hidden" tyt-hidden userscript-scrollbar-render></div>
                <div id="tab-comments" class="tab-content-cld tab-content-hidden" tyt-hidden userscript-scrollbar-render></div>
                <div id="tab-videos" class="tab-content-cld tab-content-hidden" tyt-hidden userscript-scrollbar-render></div>
                <div id="tab-list" class="tab-content-cld tab-content-hidden" tyt-hidden userscript-scrollbar-render></div>
            </div>
        </div>
        `;
        return addHTML;
      }, getLang = function() {
        let lang = "en";
        let htmlLang = ((document || 0).documentElement || 0).lang || "";
        switch (htmlLang) {
          case "en":
          case "en-GB":
            lang = "en";
            break;
          case "de":
          case "de-DE":
            lang = "du";
            break;
          case "fr":
          case "fr-CA":
          case "fr-FR":
            lang = "fr";
            break;
          case "zh-Hant":
          case "zh-Hant-HK":
          case "zh-Hant-TW":
            lang = "tw";
            break;
          case "zh-Hans":
          case "zh-Hans-CN":
            lang = "cn";
            break;
          case "ja":
          case "ja-JP":
            lang = "jp";
            break;
          case "ko":
          case "ko-KR":
            lang = "kr";
            break;
          case "ru":
          case "ru-RU":
            lang = "ru";
            break;
          default:
            lang = "en";
        }
        return lang;
      }, getLangForPage = function() {
        let lang = getLang();
        if (langWords[lang])
          pageLang = lang;
        else
          pageLang = "en";
      }, isTheater = function() {
        const ytdFlexyElm = elements.flexy;
        return ytdFlexyElm && ytdFlexyElm.hasAttribute000("theater");
      }, ytBtnSetTheater = function() {
        if (!isTheater()) {
          const sizeBtn = document.querySelector(
            "ytd-watch-flexy #ytd-player button.ytp-size-button"
          );
          if (sizeBtn)
            sizeBtn.click();
        }
      }, ytBtnCancelTheater = function() {
        if (isTheater()) {
          const sizeBtn = document.querySelector(
            "ytd-watch-flexy #ytd-player button.ytp-size-button"
          );
          if (sizeBtn)
            sizeBtn.click();
        }
      }, ytBtnExpandChat = function() {
        let button = document.querySelector(
          "ytd-live-chat-frame#chat[collapsed] > .ytd-live-chat-frame#show-hide-button"
        );
        if (button) {
          button = button.querySelector000("div.yt-spec-touch-feedback-shape") || button.querySelector000("ytd-toggle-button-renderer");
          if (button)
            button.click();
        }
      }, ytBtnCollapseChat = function() {
        let button = document.querySelector(
          "ytd-live-chat-frame#chat:not([collapsed]) > .ytd-live-chat-frame#show-hide-button"
        );
        if (button) {
          button = button.querySelector000("div.yt-spec-touch-feedback-shape") || button.querySelector000("ytd-toggle-button-renderer");
          if (button)
            button.click();
        }
      }, ytBtnEgmPanelCore = function(arr) {
        if (!arr)
          return;
        if (!("length" in arr))
          arr = [arr];
        const ytdFlexyElm = elements.flexy;
        if (!ytdFlexyElm)
          return;
        let actions = [];
        for (const entry of arr) {
          if (!entry)
            continue;
          let panelId = entry.panelId;
          let toHide = entry.toHide;
          let toShow = entry.toShow;
          if (toHide === true && !toShow) {
            actions.push({
              changeEngagementPanelVisibilityAction: {
                targetId: panelId,
                visibility: "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN"
              }
            });
          } else if (toShow === true && !toHide) {
            actions.push({
              showEngagementPanelEndpoint: {
                panelIdentifier: panelId
              }
            });
          }
          if (actions.length > 0) {
            const cnt = insp(ytdFlexyElm);
            cnt.resolveCommand(
              {
                signalServiceEndpoint: {
                  signal: "CLIENT_SIGNAL",
                  actions
                }
              },
              {},
              false
            );
          }
          actions = null;
        }
      }, ytBtnCloseEngagementPanels = function() {
        const actions = [];
        for (const panelElm of document.querySelectorAll(
          `ytd-watch-flexy[flexy][tyt-tab] #panels.ytd-watch-flexy ytd-engagement-panel-section-list-renderer[target-id][visibility]:not([hidden])`
        )) {
          if (panelElm.getAttribute("visibility") == "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED" && !panelElm.closest("[hidden]")) {
            actions.push({
              panelId: panelElm.getAttribute000("target-id"),
              toHide: true
            });
          }
        }
        ytBtnEgmPanelCore(actions);
      }, ytBtnOpenPlaylist = function() {
        const cnt = insp(elements.playlist);
        if (cnt && typeof cnt.collapsed === "boolean") {
          cnt.collapsed = false;
        }
      }, ytBtnClosePlaylist = function() {
        const cnt = insp(elements.playlist);
        if (cnt && typeof cnt.collapsed === "boolean") {
          cnt.collapsed = true;
        }
      };
      let executionFinished = 0;
      if (typeof CustomElementRegistry === "undefined")
        return;
      if (CustomElementRegistry.prototype.define000)
        return;
      if (typeof CustomElementRegistry.prototype.define !== "function")
        return;
      const HTMLElement_ = HTMLElement.prototype.constructor;
      const qsOne = (elm, selector) => {
        return HTMLElement_.prototype.querySelector.call(elm, selector);
      };
      const qsAll = (elm, selector) => {
        return HTMLElement_.prototype.querySelectorAll.call(elm, selector);
      };
      const pdsBaseDF = Object.getOwnPropertyDescriptors(
        DocumentFragment.prototype
      );
      Object.defineProperties(DocumentFragment.prototype, {
        replaceChildren000: pdsBaseDF.replaceChildren
      });
      const pdsBaseNode = Object.getOwnPropertyDescriptors(Node.prototype);
      Object.defineProperties(Node.prototype, {
        appendChild000: pdsBaseNode.appendChild,
        insertBefore000: pdsBaseNode.insertBefore
      });
      const pdsBaseElement = Object.getOwnPropertyDescriptors(Element.prototype);
      Object.defineProperties(Element.prototype, {
        setAttribute000: pdsBaseElement.setAttribute,
        getAttribute000: pdsBaseElement.getAttribute,
        hasAttribute000: pdsBaseElement.hasAttribute,
        removeAttribute000: pdsBaseElement.removeAttribute,
        querySelector000: pdsBaseElement.querySelector,
        replaceChildren000: pdsBaseElement.replaceChildren
      });
      Element.prototype.setAttribute111 = function(p, v) {
        v = `${v}`;
        if (this.getAttribute000(p) === v)
          return;
        this.setAttribute000(p, v);
      };
      Element.prototype.incAttribute111 = function(p) {
        let v = +this.getAttribute000(p) || 0;
        v = v > 1e9 ? v + 1 : 9;
        this.setAttribute000(p, `${v}`);
        return v;
      };
      Element.prototype.assignChildern111 = function(previousSiblings, node, nextSiblings) {
        let nodeList = [];
        for (let t = this.firstChild; t instanceof Node; t = t.nextSibling) {
          if (t === node)
            continue;
          nodeList.push(t);
        }
        inPageRearrange = true;
        if (node.parentNode === this) {
          let fm = new DocumentFragment();
          if (nodeList.length > 0) {
            fm.replaceChildren000(...nodeList);
          }
          if (previousSiblings && previousSiblings.length > 0) {
            fm.replaceChildren000(...previousSiblings);
            this.insertBefore000(fm, node);
          }
          if (nextSiblings && nextSiblings.length > 0) {
            fm.replaceChildren000(...nextSiblings);
            this.appendChild000(fm);
          }
          fm.replaceChildren000();
          fm = null;
        } else {
          if (!previousSiblings)
            previousSiblings = [];
          if (!nextSiblings)
            nextSiblings = [];
          this.replaceChildren000(...previousSiblings, node, ...nextSiblings);
        }
        inPageRearrange = false;
        if (nodeList.length > 0) {
          for (const t of nodeList) {
            if (t instanceof Element && t.isConnected === false)
              t.remove();
          }
        }
        nodeList.length = 0;
        nodeList = null;
      };
      const DISABLE_FLAGS_SHADYDOM_FREE = true;
      (() => {
        let e = "undefined" != typeof unsafeWindow ? unsafeWindow : void 0 instanceof Window ? void 0 : window;
        if (!e._ytConfigHacks) {
          let r = function(t2) {
            o(), t2 && e.removeEventListener("DOMContentLoaded", r, false);
          };
          let t = 4;
          class n extends Set {
            add(e2) {
              if (t <= 0)
                return void 0;
              "function" == typeof e2 && super.add(e2);
            }
          }
          let a = (async () => {
          })().constructor, i = e._ytConfigHacks = new n(), l = () => {
            let t2 = e.ytcsi.originalYtcsi;
            t2 && (e.ytcsi = t2, l = null);
          }, c = null, o = () => {
            if (t >= 1) {
              let n2 = (e.yt || 0).config_ || (e.ytcfg || 0).data_ || 0;
              if ("string" == typeof n2.INNERTUBE_API_KEY && "object" == typeof n2.EXPERIMENT_FLAGS)
                for (let a2 of (--t <= 0 && l && l(), c = true, i))
                  a2(n2);
            }
          }, f = 1, d = (t2) => {
            if (t2 = t2 || e.ytcsi)
              return e.ytcsi = new Proxy(t2, {
                get: (e2, t3, n2) => "originalYtcsi" === t3 ? e2 : (o(), c && --f <= 0 && l && l(), e2[t3])
              }), true;
          };
          d() || Object.defineProperty(e, "ytcsi", {
            get() {
            },
            set: (t2) => (t2 && (delete e.ytcsi, d(t2)), true),
            enumerable: false,
            configurable: true
          });
          let { addEventListener: s, removeEventListener: y } = Document.prototype;
          new a((e2) => {
            if ("undefined" != typeof AbortSignal)
              s.call(document, "yt-page-data-fetched", e2, { once: true }), s.call(document, "yt-navigate-finish", e2, { once: true }), s.call(document, "spfdone", e2, { once: true });
            else {
              let t2 = () => {
                e2(), y.call(document, "yt-page-data-fetched", t2, false), y.call(document, "yt-navigate-finish", t2, false), y.call(document, "spfdone", t2, false);
              };
              s.call(document, "yt-page-data-fetched", t2, false), s.call(document, "yt-navigate-finish", t2, false), s.call(document, "spfdone", t2, false);
            }
          }).then(o), new a((e2) => {
            if ("undefined" != typeof AbortSignal)
              s.call(document, "yt-action", e2, { once: true, capture: true });
            else {
              let t2 = () => {
                e2(), y.call(document, "yt-action", t2, true);
              };
              s.call(document, "yt-action", t2, true);
            }
          }).then(o), a.resolve().then(() => {
            "loading" !== document.readyState ? r() : e.addEventListener("DOMContentLoaded", r, false);
          });
        }
      })();
      let configOnce = false;
      window._ytConfigHacks.add((config_) => {
        if (configOnce)
          return;
        configOnce = true;
        const EXPERIMENT_FLAGS = config_.EXPERIMENT_FLAGS || 0;
        const EXPERIMENTS_FORCED_FLAGS = config_.EXPERIMENTS_FORCED_FLAGS || 0;
        for (const flags of [EXPERIMENT_FLAGS, EXPERIMENTS_FORCED_FLAGS]) {
          if (flags) {
            flags.web_watch_chat_hide_button_killswitch = false;
            flags.web_watch_theater_chat = false;
            flags.suppress_error_204_logging = true;
            flags.kevlar_watch_grid = false;
            if (DISABLE_FLAGS_SHADYDOM_FREE) {
              flags.enable_shadydom_free_scoped_node_methods = false;
              flags.enable_shadydom_free_scoped_query_methods = false;
              flags.enable_shadydom_free_scoped_readonly_properties_batch_one = false;
              flags.enable_shadydom_free_parent_node = false;
              flags.enable_shadydom_free_children = false;
              flags.enable_shadydom_free_last_child = false;
            }
          }
        }
      });
      const mWeakRef = typeof WeakRef === "function" ? (o) => o ? new WeakRef(o) : null : (o) => o || null;
      const kRef = (wr) => wr && wr.deref ? wr.deref() : wr;
      const Promise = (async () => {
      })().constructor;
      const delayPn = (delay) => new Promise((fn) => setTimeout(fn, delay));
      const insp = (o) => o ? o.polymerController || o.inst || o || 0 : o || 0;
      const PromiseExternal = ((resolve_, reject_) => {
        const h = (resolve, reject) => {
          resolve_ = resolve;
          reject_ = reject;
        };
        return class PromiseExternal extends Promise {
          constructor(cb = h) {
            super(cb);
            if (cb === h) {
              this.resolve = resolve_;
              this.reject = reject_;
            }
          }
        };
      })();
      !function(e) {
        "use strict";
        if (e.nextBrowserTick)
          return;
        if (!function() {
          if (e.postMessage && !e.importScripts && e.addEventListener) {
            let t2 = true, s2 = () => {
              t2 = false;
            };
            return e.addEventListener("message", s2, false), e.postMessage("", "*"), e.removeEventListener("message", s2, false), t2;
          }
        }())
          return void 0;
        const t = (async () => {
        })().constructor, s = ((e2, s2) => {
          const n2 = (t2, n3) => {
            e2 = t2, s2 = n3;
          };
          return class extends t {
            constructor(t2 = n2) {
              super(t2), t2 === n2 && (this.resolve = e2, this.reject = s2);
            }
          };
        })();
        let n, r = null;
        do {
          n = `$$nextBrowserTick$$${(Math.random() + 8).toString().slice(2)}$$`;
        } while (n in e);
        const o = n;
        e[o] = 1;
        e.addEventListener(
          "message",
          (e2) => {
            (null !== r ? (e2 || 0).data : 0) === o && e2.source === (e2.target || 1) && r.resolve(r = null);
          },
          false
        ), e.nextBrowserTick = (t2) => {
          r || (r = new s(), e.postMessage(o, "*")), r.then(t2).catch(console.warn);
        };
      }(
        "undefined" == typeof self ? "undefined" == typeof global ? void 0 : global : self
      );
      const isPassiveArgSupport = typeof IntersectionObserver === "function";
      const bubblePassive = isPassiveArgSupport ? { capture: false, passive: true } : false;
      const capturePassive = isPassiveArgSupport ? { capture: true, passive: true } : true;
      class Attributer {
        constructor(list) {
          this.list = list;
          this.flag = 0;
        }
        makeString() {
          let k = 1;
          let s = "";
          let i = 0;
          while (this.flag >= k) {
            if (this.flag & k) {
              s += this.list[i];
            }
            i++;
            k <<= 1;
          }
          return s;
        }
      }
      const mLoaded = new Attributer("icp");
      const wrSelfMap = /* @__PURE__ */ new WeakMap();
      const elements = new Proxy(
        {
          related: null,
          comments: null,
          infoExpander: null
        },
        {
          get(target, prop) {
            return kRef(target[prop]);
          },
          set(target, prop, value) {
            if (value) {
              let wr = wrSelfMap.get(value);
              if (!wr) {
                wr = mWeakRef(value);
                wrSelfMap.set(value, wr);
              }
              target[prop] = wr;
            } else {
              target[prop] = null;
            }
            return true;
          }
        }
      );
      const getMainInfo = () => {
        const infoExpander = elements.infoExpander;
        if (!infoExpander)
          return null;
        const mainInfo = infoExpander.matches("[tyt-main-info]") ? infoExpander : infoExpander.querySelector000("[tyt-main-info]");
        return mainInfo || null;
      };
      const asyncWrap = (asyncFn) => {
        return () => {
          Promise.resolve().then(asyncFn);
        };
      };
      let pageType = null;
      let pageLang = "en";
      const langWords = {
        en: {
          info: "Info",
          videos: "Videos",
          playlist: "Playlist"
        },
        jp: {
          info: "情報",
          videos: "動画",
          playlist: "再生リスト"
        },
        tw: {
          info: "資訊",
          videos: "影片",
          playlist: "播放清單"
        },
        cn: {
          info: "资讯",
          videos: "视频",
          playlist: "播放列表"
        },
        du: {
          info: "Info",
          videos: "Videos",
          playlist: "Playlist"
        },
        fr: {
          info: "Info",
          videos: "Vidéos",
          playlist: "Playlist"
        },
        kr: {
          info: "정보",
          videos: "동영상",
          playlist: "재생목록"
        },
        ru: {
          info: "Описание",
          videos: "Видео",
          playlist: "Плейлист"
        }
      };
      const svgComments = `<path d="M80 27H12A12 12 90 0 0 0 39v42a12 12 90 0 0 12 12h12v20a2 2 90 0 0 3.4 2L47 93h33a12 
  12 90 0 0 12-12V39a12 12 90 0 0-12-12zM20 47h26a2 2 90 1 1 0 4H20a2 2 90 1 1 0-4zm52 28H20a2 2 90 1 1 0-4h52a2 2 90 
  1 1 0 4zm0-12H20a2 2 90 1 1 0-4h52a2 2 90 1 1 0 4zm36-58H40a12 12 90 0 0-12 12v6h52c9 0 16 7 16 16v42h0v4l7 7a2 2 90 
  0 0 3-1V71h2a12 12 90 0 0 12-12V17a12 12 90 0 0-12-12z"/>`.trim();
      const svgVideos = `<path d="M89 10c0-4-3-7-7-7H7c-4 0-7 3-7 7v70c0 4 3 7 7 7h75c4 0 7-3 7-7V10zm-62 2h13v10H27V12zm-9 
  66H9V68h9v10zm0-56H9V12h9v10zm22 56H27V68h13v10zm-3-25V36c0-2 2-3 4-2l12 8c2 1 2 4 0 5l-12 8c-2 1-4 0-4-2zm25 
  25H49V68h13v10zm0-56H49V12h13v10zm18 56h-9V68h9v10zm0-56h-9V12h9v10z"/>`.trim();
      const svgInfo = `<path d="M30 0C13.3 0 0 13.3 0 30s13.3 30 30 30 30-13.3 30-30S46.7 0 30 0zm6.2 46.6c-1.5.5-2.6 
  1-3.6 1.3a10.9 10.9 0 0 1-3.3.5c-1.7 0-3.3-.5-4.3-1.4a4.68 4.68 0 0 1-1.6-3.6c0-.4.2-1 .2-1.5a20.9 20.9 90 0 1 
  .3-2l2-6.8c.1-.7.3-1.3.4-1.9a8.2 8.2 90 0 0 .3-1.6c0-.8-.3-1.4-.7-1.8s-1-.5-2-.5a4.53 4.53 0 0 0-1.6.3c-.5.2-1 
  .2-1.3.4l.6-2.1c1.2-.5 2.4-1 3.5-1.3s2.3-.6 3.3-.6c1.9 0 3.3.6 4.3 1.3s1.5 2.1 1.5 3.5c0 .3 0 .9-.1 1.6a10.4 10.4 
  90 0 1-.4 2.2l-1.9 6.7c-.2.5-.2 1.1-.4 1.8s-.2 1.3-.2 1.6c0 .9.2 1.6.6 1.9s1.1.5 2.1.5a6.1 6.1 90 0 0 1.5-.3 9 9 90 
  0 0 1.4-.4l-.6 2.2zm-3.8-35.2a1 1 0 010 8.6 1 1 0 010-8.6z"/>`.trim();
      const svgPlayList = `<path d="M0 3h12v2H0zm0 4h12v2H0zm0 4h8v2H0zm16 0V7h-2v4h-4v2h4v4h2v-4h4v-2z"/>`.trim();
      const svgDiag1 = `<svg stroke="currentColor" fill="none"><path d="M8 2h2v2M7 5l3-3m-6 8H2V8m0 2l3-3"/></svg>`;
      const svgDiag2 = `<svg stroke="currentColor" fill="none"><path d="M7 3v2h2M7 5l3-3M5 9V7H3m-1 3l3-3"/></svg>`;
      const getGMT = () => {
        let m = new Date("2023-01-01T00:00:00Z");
        return m.getDate() === 1 ? `+${m.getHours()}` : `-${24 - m.getHours()}`;
      };
      const svgElm = (w, h, vw, vh, p, m) => `<svg${m ? ` class=${m}` : ""} width="${w}" height="${h}" viewBox="0 0 ${vw} ${vh}" preserveAspectRatio="xMidYMid meet">${p}</svg>`;
      let hiddenTabsByUserCSS = 0;
      const _locks = {};
      const lockGet = new Proxy(_locks, {
        get(target, prop) {
          return target[prop] || 0;
        },
        set(target, prop, val) {
          return true;
        }
      });
      const lockSet = new Proxy(_locks, {
        get(target, prop) {
          if (target[prop] > 1e9)
            target[prop] = 9;
          return target[prop] = (target[prop] || 0) + 1;
        },
        set(target, prop, val) {
          return true;
        }
      });
      const videosElementProvidedPromise = new PromiseExternal();
      const navigateFinishedPromise = new PromiseExternal();
      let isRightTabsInserted = false;
      const rightTabsProvidedPromise = new PromiseExternal();
      const infoExpanderElementProvidedPromise = new PromiseExternal();
      const funcCanCollapse = function(s) {
        if (!s)
          return;
        this.canToggle = this.shouldUseNumberOfLines && (this.alwaysCollapsed || this.collapsed) ? this.alwaysToggleable || this.$.content.offsetHeight < this.$.content.scrollHeight : this.alwaysToggleable || this.$.content.scrollHeight > this.collapsedHeight;
      };
      const aoChatAttrChangeFn = async (lockId) => {
        if (lockGet["aoChatAttrAsyncLock"] !== lockId)
          return;
        const chatElm = elements.chat;
        const ytdFlexyElm = elements.flexy;
        if (chatElm && ytdFlexyElm) {
          const isChatCollapsed = chatElm.hasAttribute000("collapsed");
          if (isChatCollapsed) {
            ytdFlexyElm.setAttribute111("tyt-chat-collapsed", "");
          } else {
            ytdFlexyElm.removeAttribute000("tyt-chat-collapsed");
          }
          ytdFlexyElm.setAttribute111("tyt-chat", isChatCollapsed ? "-" : "+");
        }
      };
      const aoPlayListAttrChangeFn = async (lockId) => {
        if (lockGet["aoPlayListAttrAsyncLock"] !== lockId)
          return;
        const playlistElm = elements.playlist;
        const ytdFlexyElm = elements.flexy;
        if (playlistElm && ytdFlexyElm) {
          if (playlistElm.hasAttribute000("collapsed")) {
            ytdFlexyElm.removeAttribute000("tyt-playlist-expanded");
          } else {
            ytdFlexyElm.setAttribute111("tyt-playlist-expanded", "");
          }
        } else if (ytdFlexyElm) {
          ytdFlexyElm.removeAttribute000("tyt-playlist-expanded");
        }
      };
      const aoChat = new MutationObserver(() => {
        Promise.resolve(lockSet["aoChatAttrAsyncLock"]).then(aoChatAttrChangeFn).catch(console.warn);
      });
      const aoPlayList = new MutationObserver(() => {
        Promise.resolve(lockSet["aoPlayListAttrAsyncLock"]).then(aoPlayListAttrChangeFn).catch(console.warn);
      });
      const aoComment = new MutationObserver(async (mutations) => {
        const commentsArea = elements.comments;
        const ytdFlexyElm = elements.flexy;
        if (!commentsArea)
          return;
        let bfHidden = false;
        let bfCommentsVideoId = false;
        let bfCommentDisabled = false;
        for (const mutation of mutations) {
          if (mutation.attributeName === "hidden" && mutation.target === commentsArea) {
            bfHidden = true;
          } else if (mutation.attributeName === "tyt-comments-video-id" && mutation.target === commentsArea) {
            bfCommentsVideoId = true;
          } else if (mutation.attributeName === "tyt-comments-data-status" && mutation.target === commentsArea) {
            bfCommentDisabled = true;
          }
        }
        if (bfHidden) {
          if (!commentsArea.hasAttribute000("hidden")) {
            Promise.resolve(commentsArea).then(eventMap["settingCommentsVideoId"]).catch(console.warn);
          }
          Promise.resolve(lockSet["removeKeepCommentsScrollerLock"]).then(removeKeepCommentsScroller).catch(console.warn);
        }
        if ((bfHidden || bfCommentsVideoId || bfCommentDisabled) && ytdFlexyElm) {
          const commentsDataStatus = +commentsArea.getAttribute000(
            "tyt-comments-data-status"
          );
          if (commentsDataStatus === 2) {
            ytdFlexyElm.setAttribute111("tyt-comment-disabled", "");
          } else if (commentsDataStatus === 1) {
            ytdFlexyElm.removeAttribute000("tyt-comment-disabled");
          }
          Promise.resolve(lockSet["checkCommentsShouldBeHiddenLock"]).then(eventMap["checkCommentsShouldBeHidden"]).catch(console.warn);
          const lockId = lockSet["rightTabReadyLock01"];
          await rightTabsProvidedPromise.then();
          if (lockGet["rightTabReadyLock01"] !== lockId)
            return;
          if (elements.comments !== commentsArea)
            return;
          if (commentsArea.isConnected === false)
            return;
          if (commentsArea.closest("#tab-comments")) {
            const shouldTabVisible = !commentsArea.closest("[hidden]");
            document.querySelector('[tyt-tab-content="#tab-comments"]').classList.toggle("tab-btn-hidden", !shouldTabVisible);
          }
        }
      });
      const ioComment = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            const target = entry.target;
            const cnt = insp(target);
            if (entry.isIntersecting && target instanceof HTMLElement_ && typeof cnt.calculateCanCollapse === "function") {
              lockSet["removeKeepCommentsScrollerLock"];
              cnt.calculateCanCollapse(true);
              target.setAttribute111("io-intersected", "");
              const ytdFlexyElm = elements.flexy;
              if (ytdFlexyElm && !ytdFlexyElm.hasAttribute000("keep-comments-scroller")) {
                ytdFlexyElm.setAttribute111("keep-comments-scroller", "");
              }
            } else if (target.hasAttribute000("io-intersected")) {
              target.removeAttribute000("io-intersected");
            }
          }
        },
        {
          threshold: [0],
          rootMargin: "32px"
        }
      );
      let bFixForResizedTabLater = false;
      let lastRoRightTabsWidth = 0;
      const roRightTabs = new ResizeObserver((entries) => {
        const entry = entries[entries.length - 1];
        const width = Math.round(entry.borderBoxSize.inlineSize);
        if (lastRoRightTabsWidth !== width) {
          lastRoRightTabsWidth = width;
          if ((tabAStatus & 2) === 2) {
            bFixForResizedTabLater = false;
            Promise.resolve(1).then(eventMap["fixForTabDisplay"]);
          } else {
            bFixForResizedTabLater = true;
          }
        }
      });
      const switchToTab = (activeLink) => {
        if (typeof activeLink === "string") {
          activeLink = document.querySelector(`a[tyt-tab-content="${activeLink}"]`) || null;
        }
        const ytdFlexyElm = elements.flexy;
        const links = document.querySelectorAll(
          "#material-tabs a[tyt-tab-content]"
        );
        for (const link of links) {
          const content = document.querySelector(
            link.getAttribute000("tyt-tab-content")
          );
          if (link && content) {
            if (link !== activeLink) {
              link.classList.remove("active");
              content.classList.add("tab-content-hidden");
              if (!content.hasAttribute000("tyt-hidden")) {
                content.setAttribute111("tyt-hidden", "");
              }
            } else {
              link.classList.add("active");
              if (content.hasAttribute000("tyt-hidden")) {
                content.removeAttribute000("tyt-hidden");
              }
              content.classList.remove("tab-content-hidden");
            }
          }
        }
        const switchingTo = activeLink ? activeLink.getAttribute000("tyt-tab-content") : "";
        if (switchingTo) {
          lastTab = lastPanel = switchingTo;
        }
        if (ytdFlexyElm.getAttribute000("tyt-chat") === "")
          ytdFlexyElm.removeAttribute000("tyt-chat");
        ytdFlexyElm.setAttribute111("tyt-tab", switchingTo);
        if (switchingTo) {
          bFixForResizedTabLater = false;
          Promise.resolve(0).then(eventMap["fixForTabDisplay"]);
        }
      };
      let tabAStatus = 0;
      const calculationFn = (r = 0, flag) => {
        const ytdFlexyElm = elements.flexy;
        if (!ytdFlexyElm)
          return r;
        if (flag & 1) {
          r |= 1;
          if (!ytdFlexyElm.hasAttribute000("theater"))
            r -= 1;
        }
        if (flag & 2) {
          r |= 2;
          if (!ytdFlexyElm.getAttribute000("tyt-tab"))
            r -= 2;
        }
        if (flag & 4) {
          r |= 4;
          if (ytdFlexyElm.getAttribute000("tyt-chat") !== "-")
            r -= 4;
        }
        if (flag & 8) {
          r |= 8;
          if (ytdFlexyElm.getAttribute000("tyt-chat") !== "+")
            r -= 8;
        }
        if (flag & 16) {
          r |= 16;
          if (!ytdFlexyElm.hasAttribute000("is-two-columns_"))
            r -= 16;
        }
        if (flag & 32) {
          r |= 32;
          if (!ytdFlexyElm.hasAttribute000("tyt-egm-panel_"))
            r -= 32;
        }
        if (flag & 64) {
          r |= 64;
          if (!document.fullscreenElement)
            r -= 64;
        }
        if (flag & 128) {
          r |= 128;
          if (!ytdFlexyElm.hasAttribute000("tyt-playlist-expanded"))
            r -= 128;
        }
        return r;
      };
      const updateChatLocation498 = function() {
        if (this.is !== "ytd-watch-grid") {
          this.updatePageMediaQueries();
          this.schedulePlayerSizeUpdate_();
        }
      };
      const mirrorNodeWS = /* @__PURE__ */ new WeakMap();
      const dummyNode = document.createElement("noscript");
      const __j4836__ = Symbol();
      const __j5744__ = Symbol();
      const __j5733__ = Symbol();
      const monitorDataChangedByDOMMutation = async function(mutations) {
        const nodeWR = this;
        const node = kRef(nodeWR);
        if (!node)
          return;
        const cnt = insp(node);
        const __lastChanged__ = cnt[__j5733__];
        const val = cnt.data ? cnt.data[__j4836__] || 1 : 0;
        if (__lastChanged__ !== val) {
          cnt[__j5733__] = val > 0 ? cnt.data[__j4836__] = Date.now() : 0;
          await Promise.resolve();
          attributeInc(node, "tyt-data-change-counter");
        }
      };
      const moChangeReflection = function(mutations) {
        const nodeWR = this;
        const node = kRef(nodeWR);
        if (!node)
          return;
        const originElement = kRef(node[__j5744__] || null) || null;
        if (!originElement)
          return;
        const cnt = insp(node);
        const oriCnt = insp(originElement);
        if (mutations) {
          let bfDataChangeCounter = false;
          for (const mutation of mutations) {
            if (mutation.attributeName === "tyt-clone-refresh-count" && mutation.target === originElement) {
              bfDataChangeCounter = true;
            } else if (mutation.attributeName === "tyt-data-change-counter" && mutation.target === originElement) {
              bfDataChangeCounter = true;
            }
          }
          if (bfDataChangeCounter && oriCnt.data) {
            node.replaceWith(dummyNode);
            cnt.data = Object.assign({}, oriCnt.data);
            dummyNode.replaceWith(node);
          }
        }
      };
      const attributeInc = (elm, prop) => {
        let v = (+elm.getAttribute000(prop) || 0) + 1;
        if (v > 1e9)
          v = 9;
        elm.setAttribute000(prop, v);
        return v;
      };
      const isChannelId = (x) => {
        if (typeof x === "string" && x.length === 24) {
          return /UC[-_a-zA-Z0-9+=.]{22}/.test(x);
        }
        return false;
      };
      const infoFix = (lockId) => {
        if (lockId !== null && lockGet["infoFixLock"] !== lockId)
          return;
        const infoExpander = elements.infoExpander;
        const infoContainer = (infoExpander ? infoExpander.parentNode : null) || document.querySelector("#tab-info");
        const ytdFlexyElm = elements.flexy;
        if (!infoContainer || !ytdFlexyElm)
          return;
        if (infoExpander) {
          const match = infoExpander.matches("#tab-info > [class]") || infoExpander.matches("#tab-info > [tyt-main-info]");
          if (!match)
            return;
        }
        const requireElements = [
          ...document.querySelectorAll(
            'ytd-watch-metadata.ytd-watch-flexy div[slot="extra-content"] > *, ytd-watch-metadata.ytd-watch-flexy #extra-content > *'
          )
        ].filter((elm) => {
          return typeof elm.is == "string";
        }).map((elm) => {
          const is = elm.is;
          while (elm instanceof HTMLElement_) {
            const q = [...elm.querySelectorAll(is)].filter((e) => insp(e).data);
            if (q.length >= 1)
              return q[0];
            elm = elm.parentNode;
          }
        }).filter((elm) => !!elm && typeof elm.is === "string");
        const source = requireElements.map((entry) => {
          const inst = insp(entry);
          return {
            data: inst.data,
            tag: inst.is,
            elm: entry
          };
        });
        let noscript_ = document.querySelector("noscript#aythl");
        if (!noscript_) {
          noscript_ = document.createElement("noscript");
          noscript_.id = "aythl";
          inPageRearrange = true;
          ytdFlexyElm.insertBefore000(noscript_, ytdFlexyElm.firstChild);
          inPageRearrange = false;
        }
        const noscript = noscript_;
        let requiredUpdate = false;
        const mirrorElmSet = /* @__PURE__ */ new Set();
        const targetParent = infoContainer;
        for (const { data, tag, elm: s } of source) {
          let mirrorNode = mirrorNodeWS.get(s);
          mirrorNode = mirrorNode ? kRef(mirrorNode) : mirrorNode;
          if (!mirrorNode) {
            const cnt = insp(s);
            const cProto = cnt.constructor.prototype;
            const element = document.createElement(tag);
            noscript.appendChild(element);
            mirrorNode = element;
            mirrorNode[__j5744__] = mWeakRef(s);
            const nodeWR = mWeakRef(mirrorNode);
            new MutationObserver(moChangeReflection.bind(nodeWR)).observe(s, {
              attributes: true,
              attributeFilter: [
                "tyt-clone-refresh-count",
                "tyt-data-change-counter"
              ]
            });
            s.jy8432 = 1;
            if (!(cProto instanceof Node) && !cProto._dataChanged496 && typeof cProto._createPropertyObserver === "function") {
              cProto._dataChanged496 = function() {
                const cnt2 = this;
                const node = cnt2.hostElement || cnt2;
                if (node.jy8432) {
                  attributeInc(node, "tyt-data-change-counter");
                }
              };
              cProto._createPropertyObserver(
                "data",
                "_dataChanged496",
                void 0
              );
            } else if (!(cProto instanceof Node) && !cProto._dataChanged496 && cProto.useSignals === true && insp(s).signalProxy) {
              const dataSignal = cnt?.signalProxy?.signalCache?.data;
              if (dataSignal && typeof dataSignal.setWithPath === "function" && !dataSignal.setWithPath573 && !dataSignal.controller573) {
                dataSignal.controller573 = mWeakRef(cnt);
                dataSignal.setWithPath573 = dataSignal.setWithPath;
                dataSignal.setWithPath = function() {
                  const cnt2 = kRef(this.controller573 || null) || null;
                  cnt2 && typeof cnt2._dataChanged496k === "function" && Promise.resolve(cnt2).then(cnt2._dataChanged496k).catch(console.warn);
                  return this.setWithPath573(...arguments);
                };
                cProto._dataChanged496 = function() {
                  const cnt2 = this;
                  const node = cnt2.hostElement || cnt2;
                  if (node.jy8432) {
                    attributeInc(node, "tyt-data-change-counter");
                  }
                };
                cProto._dataChanged496k = (cnt2) => cnt2._dataChanged496();
              }
            }
            if (!cProto._dataChanged496) {
              new MutationObserver(
                monitorDataChangedByDOMMutation.bind(mirrorNode[__j5744__])
              ).observe(s, { attributes: true, childList: true, subtree: true });
            }
            mirrorNodeWS.set(s, nodeWR);
            requiredUpdate = true;
          } else {
            if (mirrorNode.parentNode !== targetParent) {
              requiredUpdate = true;
            }
          }
          if (!requiredUpdate) {
            const cloneNodeCnt = insp(mirrorNode);
            if (cloneNodeCnt.data !== data) {
              requiredUpdate = true;
            }
          }
          mirrorElmSet.add(mirrorNode);
          source.mirrored = mirrorNode;
        }
        const mirroElmArr = [...mirrorElmSet];
        mirrorElmSet.clear();
        if (!requiredUpdate) {
          let e = infoExpander ? -1 : 0;
          for (let n = targetParent.firstChild; n instanceof Node; n = n.nextSibling) {
            let target = e < 0 ? infoExpander : mirroElmArr[e];
            e++;
            if (n !== target) {
              requiredUpdate = true;
              break;
            }
          }
          if (!requiredUpdate && e !== mirroElmArr.length + 1)
            requiredUpdate = true;
        }
        if (requiredUpdate) {
          if (infoExpander) {
            targetParent.assignChildern111(null, infoExpander, mirroElmArr);
          } else {
            targetParent.replaceChildren000(...mirroElmArr);
          }
          for (const mirrorElm of mirroElmArr) {
            const j = attributeInc(mirrorElm, "tyt-clone-refresh-count");
            const oriElm = kRef(mirrorElm[__j5744__] || null) || null;
            if (oriElm) {
              oriElm.setAttribute111("tyt-clone-refresh-count", j);
            }
          }
        }
        mirroElmArr.length = 0;
        source.length = 0;
      };
      const layoutFix = (lockId) => {
        if (lockGet["layoutFixLock"] !== lockId)
          return;
        const secondaryWrapper = document.querySelector(
          "#secondary-inner.style-scope.ytd-watch-flexy > secondary-wrapper"
        );
        if (secondaryWrapper) {
          const secondaryInner = secondaryWrapper.parentNode;
          const chatContainer = document.querySelector(
            "#columns.style-scope.ytd-watch-flexy [tyt-chat-container]"
          );
          if (secondaryInner.firstChild !== secondaryInner.lastChild || chatContainer && !chatContainer.closest("secondary-wrapper")) {
            let w = [];
            let w2 = [];
            for (let node = secondaryInner.firstChild; node instanceof Node; node = node.nextSibling) {
              if (node === chatContainer && chatContainer) {
              } else if (node === secondaryWrapper) {
                for (let node2 = secondaryWrapper.firstChild; node2 instanceof Node; node2 = node2.nextSibling) {
                  if (node2 === chatContainer && chatContainer) {
                  } else {
                    if (node2.id === "right-tabs" && chatContainer) {
                      w2.push(chatContainer);
                    }
                    w2.push(node2);
                  }
                }
              } else {
                w.push(node);
              }
            }
            inPageRearrange = true;
            secondaryWrapper.replaceChildren000(...w, ...w2);
            inPageRearrange = false;
            const chatElm = elements.chat;
            const chatCnt = insp(chatElm);
            if (chatCnt && typeof chatCnt.urlChanged === "function" && secondaryWrapper.contains(chatElm)) {
              if (typeof chatCnt.urlChangedAsync12 === "function") {
                chatCnt.urlChanged();
              } else {
                setTimeout(() => chatCnt.urlChanged(), 136);
              }
            }
          }
        }
      };
      let lastPanel = "";
      let lastTab = "";
      const aoEgmPanels = new MutationObserver(() => {
        Promise.resolve(lockSet["updateEgmPanelsLock"]).then(updateEgmPanels).catch(console.warn);
      });
      const removeKeepCommentsScroller = async (lockId) => {
        if (lockGet["removeKeepCommentsScrollerLock"] !== lockId)
          return;
        await Promise.resolve();
        if (lockGet["removeKeepCommentsScrollerLock"] !== lockId)
          return;
        const ytdFlexyFlm = elements.flexy;
        if (ytdFlexyFlm) {
          ytdFlexyFlm.removeAttribute000("keep-comments-scroller");
        }
      };
      const updateEgmPanels = async (lockId) => {
        if (lockId !== lockGet["updateEgmPanelsLock"])
          return;
        await navigateFinishedPromise.then().catch(console.warn);
        if (lockId !== lockGet["updateEgmPanelsLock"])
          return;
        const ytdFlexyElm = elements.flexy;
        if (!ytdFlexyElm)
          return;
        let newVisiblePanels = [];
        let newHiddenPanels = [];
        let allVisiblePanels = [];
        for (const panelElm of document.querySelectorAll(
          "[tyt-egm-panel][target-id][visibility]"
        )) {
          const visibility = panelElm.getAttribute000("visibility");
          if (visibility === "ENGAGEMENT_PANEL_VISIBILITY_HIDDEN" || panelElm.closest("[hidden]")) {
            if (panelElm.hasAttribute000("tyt-visible-at")) {
              panelElm.removeAttribute000("tyt-visible-at");
              newHiddenPanels.push(panelElm);
            }
          } else if (visibility === "ENGAGEMENT_PANEL_VISIBILITY_EXPANDED" && !panelElm.closest("[hidden]")) {
            let visibleAt = panelElm.getAttribute000("tyt-visible-at");
            if (!visibleAt) {
              panelElm.setAttribute111("tyt-visible-at", Date.now());
              newVisiblePanels.push(panelElm);
            }
            allVisiblePanels.push(panelElm);
          }
        }
        if (newVisiblePanels.length >= 1 && allVisiblePanels.length >= 2) {
          const targetVisible = newVisiblePanels[newVisiblePanels.length - 1];
          const actions = [];
          for (const panelElm of allVisiblePanels) {
            if (panelElm === targetVisible)
              continue;
            actions.push({
              panelId: panelElm.getAttribute000("target-id"),
              toHide: true
            });
          }
          if (actions.length >= 1) {
            ytBtnEgmPanelCore(actions);
          }
        }
        if (allVisiblePanels.length >= 1) {
          ytdFlexyElm.setAttribute111("tyt-egm-panel_", "");
        } else {
          ytdFlexyElm.removeAttribute000("tyt-egm-panel_");
        }
        newVisiblePanels.length = 0;
        newVisiblePanels = null;
        newHiddenPanels.length = 0;
        newHiddenPanels = null;
        allVisiblePanels.length = 0;
        allVisiblePanels = null;
      };
      const checkElementExist = (css, exclude) => {
        for (const p of document.querySelectorAll(css)) {
          if (!p.closest(exclude))
            return p;
        }
        return null;
      };
      let fixInitialTabStateK = 0;
      const { handleNavigateFactory } = (() => {
        let isLoadStartListened = false;
        function findLcComment(lc) {
          if (arguments.length === 1) {
            let element = document.querySelector(
              `#tab-comments ytd-comments ytd-comment-renderer #header-author a[href*="lc=${lc}"]`
            );
            if (element) {
              let commentRendererElm = closestFromAnchor.call(
                element,
                "ytd-comment-renderer"
              );
              if (commentRendererElm && lc) {
                return {
                  lc,
                  commentRendererElm
                };
              }
            }
          } else if (arguments.length === 0) {
            let element = document.querySelector(
              `#tab-comments ytd-comments ytd-comment-renderer > #linked-comment-badge span:not(:empty)`
            );
            if (element) {
              let commentRendererElm = closestFromAnchor.call(
                element,
                "ytd-comment-renderer"
              );
              if (commentRendererElm) {
                let header = _querySelector.call(
                  commentRendererElm,
                  "#header-author"
                );
                if (header) {
                  let anchor = _querySelector.call(header, 'a[href*="lc="]');
                  if (anchor) {
                    let href = anchor.getAttribute("href") || "";
                    let m = /[&?]lc=([\w_.-]+)/.exec(href);
                    if (m) {
                      lc = m[1];
                    }
                  }
                }
              }
              if (commentRendererElm && lc) {
                return {
                  lc,
                  commentRendererElm
                };
              }
            }
          }
          return null;
        }
        function lcSwapFuncA(targetLcId, currentLcId) {
          let done = 0;
          try {
            let r1 = findLcComment(currentLcId).commentRendererElm;
            let r2 = findLcComment(targetLcId).commentRendererElm;
            if (typeof insp(r1).data.linkedCommentBadge === "object" && typeof insp(r2).data.linkedCommentBadge === "undefined") {
              let p = Object.assign({}, insp(r1).data.linkedCommentBadge);
              if (((p || 0).metadataBadgeRenderer || 0).trackingParams) {
                delete p.metadataBadgeRenderer.trackingParams;
              }
              const v1 = findContentsRenderer(r1);
              const v2 = findContentsRenderer(r2);
              if (v1.parent === v2.parent && (v2.parent.nodeName === "YTD-COMMENTS" || v2.parent.nodeName === "YTD-ITEM-SECTION-RENDERER")) {
              } else {
                return false;
              }
              if (v2.index >= 0) {
                if (v2.parent.nodeName === "YTD-COMMENT-REPLIES-RENDERER") {
                  if (lcSwapFuncB(targetLcId, currentLcId, p)) {
                    done = 1;
                  }
                  done = 1;
                } else {
                  const v2pCnt = insp(v2.parent);
                  const v2Conents = (v2pCnt.data || 0).contents || 0;
                  if (!v2Conents)
                    ;
                  v2pCnt.data = Object.assign({}, v2pCnt.data, {
                    contents: [].concat(
                      [v2Conents[v2.index]],
                      v2Conents.slice(0, v2.index),
                      v2Conents.slice(v2.index + 1)
                    )
                  });
                  if (lcSwapFuncB(targetLcId, currentLcId, p)) {
                    done = 1;
                  }
                }
              }
            }
          } catch (e) {
          }
          return done === 1;
        }
        function lcSwapFuncB(targetLcId, currentLcId, _p) {
          let done = 0;
          try {
            let r1 = findLcComment(currentLcId).commentRendererElm;
            let r1cnt = insp(r1);
            let r2 = findLcComment(targetLcId).commentRendererElm;
            let r2cnt = insp(r2);
            const r1d = r1cnt.data;
            let p = Object.assign({}, _p);
            r1d.linkedCommentBadge = null;
            delete r1d.linkedCommentBadge;
            let q = Object.assign({}, r1d);
            q.linkedCommentBadge = null;
            delete q.linkedCommentBadge;
            r1cnt.data = Object.assign({}, q);
            r2cnt.data = Object.assign({}, r2cnt.data, { linkedCommentBadge: p });
            done = 1;
          } catch (e) {
          }
          return done === 1;
        }
        const loadStartFx = async (evt) => {
          let media = (evt || 0).target || 0;
          if (media.nodeName === "VIDEO" || media.nodeName === "AUDIO") {
          } else
            return;
          const newMedia = media;
          const media1 = common.getMediaElement(0);
          const media2 = common.getMediaElements(2);
          if (media1 !== null && media2.length > 0) {
            if (newMedia !== media1 && media1.paused === false) {
              if (isVideoPlaying(media1)) {
                Promise.resolve(newMedia).then((video) => video.paused === false && video.pause()).catch(console.warn);
              }
            } else if (newMedia === media1) {
              for (const s of media2) {
                if (s.paused === false) {
                  Promise.resolve(s).then((s2) => s2.paused === false && s2.pause()).catch(console.warn);
                  break;
                }
              }
            } else {
              Promise.resolve(media1).then((video1) => video1.paused === false && video1.pause()).catch(console.warn);
            }
          }
        };
        const getBrowsableEndPoint = (req) => {
          let valid = false;
          let endpoint = req ? req.command : null;
          if (endpoint && (endpoint.commandMetadata || 0).webCommandMetadata && endpoint.watchEndpoint) {
            let videoId = endpoint.watchEndpoint.videoId;
            let url = endpoint.commandMetadata.webCommandMetadata.url;
            if (typeof videoId === "string" && typeof url === "string" && url.indexOf("lc=") > 0) {
              let m = /^\/watch\?v=([\w_-]+)&lc=([\w_.-]+)$/.exec(url);
              if (m && m[1] === videoId) {
                let targetLc = findLcComment(m[2]);
                let currentLc = targetLc ? findLcComment() : null;
                if (targetLc && currentLc) {
                  let done = targetLc.lc === currentLc.lc ? 1 : lcSwapFuncA(targetLc.lc, currentLc.lc) ? 1 : 0;
                  if (done === 1) {
                    common.xReplaceState(history.state, url);
                    return;
                  }
                }
              }
            }
          }
          if (endpoint && (endpoint.commandMetadata || 0).webCommandMetadata && endpoint.browseEndpoint && isChannelId(endpoint.browseEndpoint.browseId)) {
            valid = true;
          } else if (endpoint && (endpoint.browseEndpoint || endpoint.searchEndpoint) && !endpoint.urlEndpoint && !endpoint.watchEndpoint) {
            if (endpoint.browseEndpoint && endpoint.browseEndpoint.browseId === "FEwhat_to_watch") {
              const playerMedia = common.getMediaElement(1);
              if (playerMedia && playerMedia.paused === false)
                valid = true;
            } else if (endpoint.commandMetadata && endpoint.commandMetadata.webCommandMetadata) {
              let meta = endpoint.commandMetadata.webCommandMetadata;
              if (meta && meta.url && meta.webPageType) {
                valid = true;
              }
            }
          }
          if (!valid)
            endpoint = null;
          return endpoint;
        };
        const shouldUseMiniPlayer = () => {
          const isSubTypeExist = document.querySelector(
            "ytd-page-manager#page-manager > ytd-browse[page-subtype]"
          );
          if (isSubTypeExist)
            return true;
          const movie_player = [
            ...document.querySelectorAll("#movie_player")
          ].filter((e) => !e.closest("[hidden]"))[0];
          if (movie_player) {
            const media = qsOne(movie_player, "video[class], audio[class]");
            if (media && media.currentTime > 3 && media.duration - media.currentTime > 3 && media.paused === false) {
              return true;
            }
          }
          return false;
        };
        const conditionFulfillment = (req) => {
          const endpoint = req ? req.command : null;
          if (!endpoint)
            return;
          if (endpoint && (endpoint.commandMetadata || 0).webCommandMetadata && endpoint.watchEndpoint) {
          } else if (endpoint && (endpoint.commandMetadata || 0).webCommandMetadata && endpoint.browseEndpoint && isChannelId(endpoint.browseEndpoint.browseId)) {
          } else if (endpoint && (endpoint.browseEndpoint || endpoint.searchEndpoint) && !endpoint.urlEndpoint && !endpoint.watchEndpoint) {
          } else {
            return false;
          }
          if (!shouldUseMiniPlayer())
            return false;
          if (pageType !== "watch")
            return false;
          if (!checkElementExist(
            "ytd-watch-flexy #player button.ytp-miniplayer-button.ytp-button",
            "[hidden]"
          )) {
            return false;
          }
          return true;
        };
        let u38 = 0;
        const fixChannelAboutPopup = async (t38) => {
          let promise = new PromiseExternal();
          const f = () => {
            promise && promise.resolve();
            promise = null;
          };
          document.addEventListener("yt-navigate-finish", f, false);
          await promise.then();
          promise = null;
          document.removeEventListener("yt-navigate-finish", f, false);
          if (t38 !== u38)
            return;
          setTimeout(() => {
            const currentAbout = [
              ...document.querySelectorAll("ytd-about-channel-renderer")
            ].filter((e) => !e.closest("[hidden]"))[0];
            let okay = false;
            if (!currentAbout)
              okay = true;
            else {
              const popupContainer = currentAbout.closest("ytd-popup-container");
              if (popupContainer) {
                const cnt = insp(popupContainer);
                let arr = null;
                try {
                  arr = cnt.handleGetOpenedPopupsAction_();
                } catch (e) {
                }
                if (arr && arr.length === 0)
                  okay = true;
              } else {
                okay = false;
              }
            }
            if (okay) {
              const descriptionModel = [
                ...document.querySelectorAll("yt-description-preview-view-model")
              ].filter((e) => !e.closest("[hidden]"))[0];
              if (descriptionModel) {
                const button = [
                  ...descriptionModel.querySelectorAll("button")
                ].filter(
                  (e) => !e.closest("[hidden]") && `${e.textContent}`.trim().length > 0
                )[0];
                if (button) {
                  button.click();
                }
              }
            }
          }, 80);
        };
        const handleNavigateFactory2 = (handleNavigate) => {
          return function(req) {
            if (u38 > 1e9)
              u38 = 9;
            const t38 = ++u38;
            const $this = this;
            const $arguments = arguments;
            let endpoint = null;
            if (conditionFulfillment(req)) {
              endpoint = getBrowsableEndPoint(req);
            }
            if (!endpoint || !shouldUseMiniPlayer())
              return handleNavigate.apply($this, $arguments);
            const ytdAppElm = document.querySelector("ytd-app");
            const ytdAppCnt = insp(ytdAppElm);
            let object = null;
            try {
              object = ytdAppCnt.data.response.currentVideoEndpoint.watchEndpoint || null;
            } catch (e) {
              object = null;
            }
            if (typeof object !== "object")
              object = null;
            const once = { once: true };
            if (object !== null && !("playlistId" in object)) {
              let wObject = mWeakRef(object);
              const N = 3;
              let count = 0;
              Object.defineProperty(kRef(wObject) || {}, "playlistId", {
                get() {
                  count++;
                  if (count === N) {
                    delete this.playlistId;
                  }
                  return "*";
                },
                set(value) {
                  delete this.playlistId;
                  this.playlistId = value;
                },
                enumerable: false,
                configurable: true
              });
              let playlistClearout = null;
              let timeoutid = 0;
              Promise.race([
                new Promise((r) => {
                  timeoutid = setTimeout(r, 4e3);
                }),
                new Promise((r) => {
                  playlistClearout = () => {
                    if (timeoutid > 0) {
                      clearTimeout(timeoutid);
                      timeoutid = 0;
                    }
                    r();
                  };
                  document.addEventListener(
                    "yt-page-type-changed",
                    playlistClearout,
                    once
                  );
                })
              ]).then(() => {
                if (timeoutid !== 0) {
                  playlistClearout && document.removeEventListener(
                    "yt-page-type-changed",
                    playlistClearout,
                    once
                  );
                  timeoutid = 0;
                }
                playlistClearout = null;
                count = N - 1;
                let object2 = kRef(wObject);
                wObject = null;
                return object2 ? object2.playlistId : null;
              }).catch(console.warn);
            }
            if (!isLoadStartListened) {
              isLoadStartListened = true;
              document.addEventListener("loadstart", loadStartFx, true);
            }
            const endpointURL = `${endpoint?.commandMetadata?.webCommandMetadata?.url || ""}`;
            if (endpointURL && endpointURL.endsWith("/about") && /\/channel\/UC[-_a-zA-Z0-9+=.]{22}\/about/.test(endpointURL)) {
              fixChannelAboutPopup(t38);
            }
            handleNavigate.apply($this, $arguments);
          };
        };
        return { handleNavigateFactory: handleNavigateFactory2 };
      })();
      const common = (() => {
        let mediaModeLock = 0;
        const _getMediaElement = (i) => {
          if (mediaModeLock === 0) {
            let e = document.querySelector(".video-stream.html5-main-video") || document.querySelector(
              "#movie_player video, #movie_player audio"
            ) || document.querySelector("body video[src], body audio[src]");
            if (e) {
              if (e.nodeName === "VIDEO")
                mediaModeLock = 1;
              else if (e.nodeName === "AUDIO")
                mediaModeLock = 2;
            }
          }
          if (!mediaModeLock)
            return null;
          if (mediaModeLock === 1) {
            switch (i) {
              case 1:
                return "ytd-player#ytd-player video[src]";
              case 2:
                return 'ytd-browse[role="main"] video[src]';
              case 0:
              default:
                return "#movie_player video[src]";
            }
          } else if (mediaModeLock === 2) {
            switch (i) {
              case 1:
                return "ytd-player#ytd-player audio.video-stream.html5-main-video[src]";
              case 2:
                return 'ytd-browse[role="main"] audio.video-stream.html5-main-video[src]';
              case 0:
              default:
                return "#movie_player audio.video-stream.html5-main-video[src]";
            }
          }
          return null;
        };
        return {
          xReplaceState(s, u) {
            try {
              history.replaceState(s, "", u);
            } catch (e) {
            }
            if (s.endpoint) {
              try {
                const ytdAppElm = document.querySelector("ytd-app");
                const ytdAppCnt = insp(ytdAppElm);
                ytdAppCnt.replaceState(s.endpoint, "", u);
              } catch (e) {
              }
            }
          },
          getMediaElement(i) {
            let s = _getMediaElement(i) || "";
            if (s)
              return document.querySelector(s);
            return null;
          },
          getMediaElements(i) {
            let s = _getMediaElement(i) || "";
            if (s)
              return document.querySelectorAll(s);
            return [];
          }
        };
      })();
      let inPageRearrange = false;
      let tmpLastVideoId = "";
      const getCurrentVideoId = () => {
        const ytdFlexyElm = elements.flexy;
        const ytdFlexyCnt = insp(ytdFlexyElm);
        if (ytdFlexyCnt && typeof ytdFlexyCnt.videoId === "string")
          return ytdFlexyCnt.videoId;
        if (ytdFlexyElm && typeof ytdFlexyElm.videoId === "string")
          return ytdFlexyElm.videoId;
        return "";
      };
      const holdInlineExpanderAlwaysExpanded = (inlineExpanderCnt) => {
        if (inlineExpanderCnt.alwaysShowExpandButton === true)
          inlineExpanderCnt.alwaysShowExpandButton = false;
        if (typeof (inlineExpanderCnt.collapseLabel || 0) === "string")
          inlineExpanderCnt.collapseLabel = "";
        if (typeof (inlineExpanderCnt.expandLabel || 0) === "string")
          inlineExpanderCnt.expandLabel = "";
        if (inlineExpanderCnt.showCollapseButton === true)
          inlineExpanderCnt.showCollapseButton = false;
        if (inlineExpanderCnt.showExpandButton === true)
          inlineExpanderCnt.showExpandButton = false;
        if (inlineExpanderCnt.expandButton instanceof HTMLElement_) {
          inlineExpanderCnt.expandButton = null;
          inlineExpanderCnt.expandButton.remove();
        }
      };
      const fixInlineExpanderMethods = (inlineExpanderCnt) => {
        if (inlineExpanderCnt && !inlineExpanderCnt.__$$idncjk8487$$__) {
          inlineExpanderCnt.__$$idncjk8487$$__ = true;
          inlineExpanderCnt.updateTextOnSnippetTypeChange = function() {
          };
          inlineExpanderCnt.isResetMutation = true;
          try {
            inlineExpanderCnt.updateIsAttributedExpanded();
          } catch (e) {
          }
          try {
            inlineExpanderCnt.updateIsFormattedExpanded();
          } catch (e) {
          }
          try {
            inlineExpanderCnt.updateTextOnSnippetTypeChange();
          } catch (e) {
          }
          try {
            inlineExpanderCnt.updateStyles();
          } catch (e) {
          }
        }
      };
      const fixInlineExpanderContent = () => {
        const mainInfo = getMainInfo();
        if (!mainInfo)
          return;
        const inlineExpanderElm = mainInfo.querySelector(
          "ytd-text-inline-expander"
        );
        const inlineExpanderCnt = insp(inlineExpanderElm);
        fixInlineExpanderMethods(inlineExpanderCnt);
      };
      const plugin = {
        minibrowser: {
          activated: false,
          toUse: true,
          activate() {
            if (this.activated)
              return;
            const isPassiveArgSupport2 = typeof IntersectionObserver === "function";
            if (!isPassiveArgSupport2)
              return;
            this.activated = true;
            const ytdAppElm = document.querySelector("ytd-app");
            const ytdAppCnt = insp(ytdAppElm);
            if (!ytdAppCnt)
              return;
            const cProto = ytdAppCnt.constructor.prototype;
            if (!cProto.handleNavigate)
              return;
            if (cProto.handleNavigate.__ma355__)
              return;
            cProto.handleNavigate = handleNavigateFactory(cProto.handleNavigate);
            cProto.handleNavigate.__ma355__ = 1;
          }
        },
        autoExpandInfoDesc: {
          activated: false,
          toUse: false,
          mo: null,
          promiseReady: new PromiseExternal(),
          moFn(lockId) {
            if (lockGet["autoExpandInfoDescAttrAsyncLock"] !== lockId)
              return;
            const mainInfo = getMainInfo();
            if (!mainInfo)
              return;
            switch (((mainInfo || 0).nodeName || "").toLowerCase()) {
              case "ytd-expander":
                if (mainInfo.hasAttribute000("collapsed")) {
                  let success = false;
                  try {
                    insp(mainInfo).handleMoreTap(new Event("tap"));
                    success = true;
                  } catch (e) {
                  }
                  if (success)
                    mainInfo.setAttribute111("tyt-no-less-btn", "");
                }
                break;
              case "ytd-expandable-video-description-body-renderer":
                const inlineExpanderElm = mainInfo.querySelector(
                  "ytd-text-inline-expander"
                );
                const inlineExpanderCnt = insp(inlineExpanderElm);
                if (inlineExpanderCnt && inlineExpanderCnt.isExpanded === false) {
                  inlineExpanderCnt.isExpanded = true;
                  inlineExpanderCnt.isExpandedChanged();
                }
                break;
            }
          },
          activate() {
            if (this.activated)
              return;
            this.moFn = this.moFn.bind(this);
            this.mo = new MutationObserver(() => {
              Promise.resolve(lockSet["autoExpandInfoDescAttrAsyncLock"]).then(this.moFn).catch(console.warn);
            });
            this.activated = true;
            this.promiseReady.resolve();
          },
          async onMainInfoSet(mainInfo) {
            await this.promiseReady.then();
            if (mainInfo.nodeName.toLowerCase() === "ytd-expander") {
              this.mo.observe(mainInfo, {
                attributes: true,
                attributeFilter: ["collapsed", "attr-8ifv7"]
              });
            } else {
              this.mo.observe(mainInfo, {
                attributes: true,
                attributeFilter: ["attr-8ifv7"]
              });
            }
            mainInfo.incAttribute111("attr-8ifv7");
          }
        },
        fullChannelNameOnHover: {
          activated: false,
          toUse: true,
          mo: null,
          ro: null,
          promiseReady: new PromiseExternal(),
          checkResize: 0,
          mouseEnterFn(evt) {
            const target = evt ? evt.target : null;
            if (!(target instanceof HTMLElement_))
              return;
            const metaDataElm = target.closest("ytd-watch-metadata");
            metaDataElm.classList.remove("tyt-metadata-hover-resized");
            this.checkResize = Date.now() + 300;
            metaDataElm.classList.add("tyt-metadata-hover");
          },
          mouseLeaveFn(evt) {
            const target = evt ? evt.target : null;
            if (!(target instanceof HTMLElement_))
              return;
            const metaDataElm = target.closest("ytd-watch-metadata");
            metaDataElm.classList.remove("tyt-metadata-hover-resized");
            metaDataElm.classList.remove("tyt-metadata-hover");
          },
          moFn(lockId) {
            if (lockGet["fullChannelNameOnHoverAttrAsyncLock"] !== lockId)
              return;
            const uploadInfo = document.querySelector(
              "#primary.ytd-watch-flexy ytd-watch-metadata #upload-info"
            );
            if (!uploadInfo)
              return;
            const evtOpt = { passive: true, capture: false };
            uploadInfo.removeEventListener(
              "pointerenter",
              this.mouseEnterFn,
              evtOpt
            );
            uploadInfo.removeEventListener(
              "pointerleave",
              this.mouseLeaveFn,
              evtOpt
            );
            uploadInfo.addEventListener(
              "pointerenter",
              this.mouseEnterFn,
              evtOpt
            );
            uploadInfo.addEventListener(
              "pointerleave",
              this.mouseLeaveFn,
              evtOpt
            );
          },
          async onNavigateFinish() {
            await this.promiseReady.then();
            const uploadInfo = document.querySelector(
              "#primary.ytd-watch-flexy ytd-watch-metadata #upload-info"
            );
            if (!uploadInfo)
              return;
            this.mo.observe(uploadInfo, {
              attributes: true,
              attributeFilter: ["hidden", "attr-3wb0k"]
            });
            uploadInfo.incAttribute111("attr-3wb0k");
            this.ro.observe(uploadInfo);
          },
          activate() {
            if (this.activated)
              return;
            const isPassiveArgSupport2 = typeof IntersectionObserver === "function";
            if (!isPassiveArgSupport2)
              return;
            this.activated = true;
            this.mouseEnterFn = this.mouseEnterFn.bind(this);
            this.mouseLeaveFn = this.mouseLeaveFn.bind(this);
            this.moFn = this.moFn.bind(this);
            this.mo = new MutationObserver(() => {
              Promise.resolve(lockSet["fullChannelNameOnHoverAttrAsyncLock"]).then(this.moFn).catch(console.warn);
            });
            this.ro = new ResizeObserver((mutations) => {
              if (Date.now() > this.checkResize)
                return;
              for (const mutation of mutations) {
                const uploadInfo = mutation.target;
                if (uploadInfo && mutation.contentRect.width > 0 && mutation.contentRect.height > 0) {
                  const metaDataElm = uploadInfo.closest("ytd-watch-metadata");
                  if (metaDataElm.classList.contains("tyt-metadata-hover")) {
                    metaDataElm.classList.add("tyt-metadata-hover-resized");
                  }
                  break;
                }
              }
            });
            this.promiseReady.resolve();
          }
        }
      };
      if (sessionStorage.__$$tmp_UseAutoExpandInfoDesc$$__)
        plugin.autoExpandInfoDesc.toUse = true;
      const __attachedSymbol__ = Symbol();
      const makeInitAttached = (tag) => {
        const inPageRearrange_ = inPageRearrange;
        inPageRearrange = false;
        for (const elm of document.querySelectorAll(`${tag}`)) {
          const cnt = insp(elm) || 0;
          if (typeof cnt.attached498 === "function" && !elm[__attachedSymbol__])
            Promise.resolve(elm).then(eventMap[`${tag}::attached`]).catch(console.warn);
        }
        inPageRearrange = inPageRearrange_;
      };
      const getGeneralChatElement = async () => {
        for (let i = 2; i-- > 0; ) {
          let t = document.querySelector(
            "#columns.style-scope.ytd-watch-flexy ytd-live-chat-frame#chat"
          );
          if (t instanceof Element)
            return t;
          if (i > 0) {
            await delayPn(200);
          }
        }
        return null;
      };
      const nsTemplateObtain = () => {
        let nsTemplate = document.querySelector(
          "ytd-watch-flexy noscript[ns-template]"
        );
        if (!nsTemplate) {
          nsTemplate = document.createElement("noscript");
          nsTemplate.setAttribute("ns-template", "");
          document.querySelector("ytd-watch-flexy").appendChild(nsTemplate);
        }
        return nsTemplate;
      };
      const isPageDOM = (elm, selector) => {
        if (!elm || !(elm instanceof Element) || !elm.nodeName)
          return false;
        if (!elm.closest(selector))
          return false;
        if (elm.isConnected !== true)
          return false;
        return true;
      };
      const invalidFlexyParent = (hostElement2) => {
        if (hostElement2 instanceof HTMLElement) {
          const hasFlexyParent = HTMLElement.prototype.closest.call(
            hostElement2,
            "ytd-watch-flexy"
          );
          if (!hasFlexyParent)
            return true;
          const currentFlexy = elements.flexy;
          if (currentFlexy && currentFlexy !== hasFlexyParent)
            return true;
        }
        return false;
      };
      const eventMap = {
        ceHack: () => {
          mLoaded.flag |= 2;
          document.documentElement.setAttribute111(
            "tabview-loaded",
            mLoaded.makeString()
          );
          retrieveCE("ytd-watch-flexy").then(eventMap["ytd-watch-flexy::defined"]).catch(console.warn);
          retrieveCE("ytd-expander").then(eventMap["ytd-expander::defined"]).catch(console.warn);
          retrieveCE("ytd-watch-next-secondary-results-renderer").then(eventMap["ytd-watch-next-secondary-results-renderer::defined"]).catch(console.warn);
          retrieveCE("ytd-comments-header-renderer").then(eventMap["ytd-comments-header-renderer::defined"]).catch(console.warn);
          retrieveCE("ytd-live-chat-frame").then(eventMap["ytd-live-chat-frame::defined"]).catch(console.warn);
          retrieveCE("ytd-comments").then(eventMap["ytd-comments::defined"]).catch(console.warn);
          retrieveCE("ytd-engagement-panel-section-list-renderer").then(eventMap["ytd-engagement-panel-section-list-renderer::defined"]).catch(console.warn);
          retrieveCE("ytd-watch-metadata").then(eventMap["ytd-watch-metadata::defined"]).catch(console.warn);
          retrieveCE("ytd-playlist-panel-renderer").then(eventMap["ytd-playlist-panel-renderer::defined"]).catch(console.warn);
          retrieveCE("ytd-expandable-video-description-body-renderer").then(
            eventMap["ytd-expandable-video-description-body-renderer::defined"]
          ).catch(console.warn);
        },
        fixForTabDisplay: (isResize) => {
          bFixForResizedTabLater = false;
          for (const element of document.querySelectorAll("[io-intersected]")) {
            const cnt = insp(element);
            if (element instanceof HTMLElement_ && typeof cnt.calculateCanCollapse === "function") {
              try {
                cnt.calculateCanCollapse(true);
              } catch (e) {
              }
            }
          }
          if (!isResize) {
            for (const element of document.querySelectorAll(
              "ytd-video-description-infocards-section-renderer, yt-chip-cloud-renderer, ytd-horizontal-card-list-renderer"
            )) {
              const cnt = insp(element);
              if (element instanceof HTMLElement_ && typeof cnt.notifyResize === "function") {
                try {
                  cnt.notifyResize();
                } catch (e) {
                }
              }
            }
          }
        },
        "ytd-watch-flexy::defined": (cProto) => {
          if (!cProto.updateChatLocation498 && typeof cProto.updateChatLocation === "function" && cProto.updateChatLocation.length === 0) {
            cProto.updateChatLocation498 = cProto.updateChatLocation;
            cProto.updateChatLocation = updateChatLocation498;
          }
        },
        "ytd-watch-next-secondary-results-renderer::defined": (cProto) => {
          if (!cProto.attached498 && typeof cProto.attached === "function") {
            cProto.attached498 = cProto.attached;
            cProto.attached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(
                  eventMap["ytd-watch-next-secondary-results-renderer::attached"]
                ).catch(console.warn);
              return this.attached498();
            };
          }
          if (!cProto.detached498 && typeof cProto.detached === "function") {
            cProto.detached498 = cProto.detached;
            cProto.detached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(
                  eventMap["ytd-watch-next-secondary-results-renderer::detached"]
                ).catch(console.warn);
              return this.detached498();
            };
          }
          makeInitAttached("ytd-watch-next-secondary-results-renderer");
        },
        "ytd-watch-next-secondary-results-renderer::attached": (hostElement2) => {
          if (invalidFlexyParent(hostElement2))
            return;
          if (hostElement2 instanceof Element)
            hostElement2[__attachedSymbol__] = true;
          if (!(hostElement2 instanceof HTMLElement_) || !(hostElement2.classList.length > 0) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== true)
            return;
          if (hostElement2 instanceof HTMLElement_ && hostElement2.matches(
            "#columns #related ytd-watch-next-secondary-results-renderer"
          ) && !hostElement2.matches(
            "#right-tabs ytd-watch-next-secondary-results-renderer, [hidden] ytd-watch-next-secondary-results-renderer"
          )) {
            elements.related = hostElement2.closest("#related");
            hostElement2.setAttribute111("tyt-videos-list", "");
          }
        },
        "ytd-watch-next-secondary-results-renderer::detached": (hostElement2) => {
          if (!(hostElement2 instanceof HTMLElement_) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== false)
            return;
          if (hostElement2.hasAttribute000("tyt-videos-list")) {
            elements.related = null;
            hostElement2.removeAttribute000("tyt-videos-list");
          }
        },
        settingCommentsVideoId: (hostElement2) => {
          if (!(hostElement2 instanceof HTMLElement_) || !(hostElement2.classList.length > 0) || hostElement2.closest("noscript"))
            return;
          const cnt = insp(hostElement2);
          const commentsArea = elements.comments;
          if (commentsArea !== hostElement2 || hostElement2.isConnected !== true || cnt.isAttached !== true || !cnt.data || cnt.hidden !== false)
            return;
          const ytdFlexyElm = elements.flexy;
          const ytdFlexyCnt = ytdFlexyElm ? insp(ytdFlexyElm) : null;
          if (ytdFlexyCnt && ytdFlexyCnt.videoId) {
            hostElement2.setAttribute111(
              "tyt-comments-video-id",
              ytdFlexyCnt.videoId
            );
          } else {
            hostElement2.removeAttribute000("tyt-comments-video-id");
          }
        },
        checkCommentsShouldBeHidden: (lockId) => {
          if (lockGet["checkCommentsShouldBeHiddenLock"] !== lockId)
            return;
          const commentsArea = elements.comments;
          const ytdFlexyElm = elements.flexy;
          if (commentsArea && ytdFlexyElm && !commentsArea.hasAttribute000("hidden")) {
            const ytdFlexyCnt = insp(ytdFlexyElm);
            if (typeof ytdFlexyCnt.videoId === "string") {
              const commentsVideoId = commentsArea.getAttribute(
                "tyt-comments-video-id"
              );
              if (commentsVideoId && commentsVideoId !== ytdFlexyCnt.videoId) {
                commentsArea.setAttribute111("hidden", "");
              }
            }
          }
        },
        "ytd-comments::defined": (cProto) => {
          if (!cProto.attached498 && typeof cProto.attached === "function") {
            cProto.attached498 = cProto.attached;
            cProto.attached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-comments::attached"]).catch(console.warn);
              return this.attached498();
            };
          }
          if (!cProto.detached498 && typeof cProto.detached === "function") {
            cProto.detached498 = cProto.detached;
            cProto.detached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-comments::detached"]).catch(console.warn);
              return this.detached498();
            };
          }
          cProto._createPropertyObserver("data", "_dataChanged498", void 0);
          cProto._dataChanged498 = function() {
            Promise.resolve(this.hostElement).then(eventMap["ytd-comments::_dataChanged498"]).catch(console.warn);
          };
          makeInitAttached("ytd-comments");
        },
        "ytd-comments::_dataChanged498": (hostElement2) => {
          if (!hostElement2.hasAttribute000("tyt-comments-area"))
            return;
          let commentsDataStatus = 0;
          const cnt = insp(hostElement2);
          const data = cnt ? cnt.data : null;
          const contents = data ? data.contents : null;
          if (data) {
            if (contents && contents.length === 1 && contents[0].messageRenderer) {
              commentsDataStatus = 2;
            }
            if (contents && contents.length > 1 && contents[0].commentThreadRenderer) {
              commentsDataStatus = 1;
            }
          }
          if (commentsDataStatus) {
            hostElement2.setAttribute111(
              "tyt-comments-data-status",
              commentsDataStatus
            );
          } else {
            hostElement2.removeAttribute000("tyt-comments-data-status");
          }
          Promise.resolve(hostElement2).then(eventMap["settingCommentsVideoId"]).catch(console.warn);
        },
        "ytd-comments::attached": async (hostElement2) => {
          if (invalidFlexyParent(hostElement2))
            return;
          if (hostElement2 instanceof Element)
            hostElement2[__attachedSymbol__] = true;
          if (!(hostElement2 instanceof HTMLElement_) || !(hostElement2.classList.length > 0) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== true)
            return;
          if (!hostElement2 || hostElement2.id !== "comments")
            return;
          elements.comments = hostElement2;
          Promise.resolve(hostElement2).then(eventMap["settingCommentsVideoId"]).catch(console.warn);
          aoComment.observe(hostElement2, { attributes: true });
          hostElement2.setAttribute111("tyt-comments-area", "");
          const lockId = lockSet["rightTabReadyLock02"];
          await rightTabsProvidedPromise.then();
          if (lockGet["rightTabReadyLock02"] !== lockId)
            return;
          if (elements.comments !== hostElement2)
            return;
          if (hostElement2.isConnected === false)
            return;
          if (hostElement2 && !hostElement2.closest("#right-tabs")) {
            document.querySelector("#tab-comments").assignChildern111(null, hostElement2, null);
          } else {
            const shouldTabVisible = elements.comments && elements.comments.closest("#tab-comments") && !elements.comments.closest("[hidden]");
            document.querySelector('[tyt-tab-content="#tab-comments"]').classList.toggle("tab-btn-hidden", !shouldTabVisible);
            Promise.resolve(lockSet["removeKeepCommentsScrollerLock"]).then(removeKeepCommentsScroller).catch(console.warn);
          }
        },
        "ytd-comments::detached": (hostElement2) => {
          if (!(hostElement2 instanceof HTMLElement_) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== false)
            return;
          if (hostElement2.hasAttribute000("tyt-comments-area")) {
            hostElement2.removeAttribute000("tyt-comments-area");
            aoComment.disconnect();
            aoComment.takeRecords();
            elements.comments = null;
            document.querySelector('[tyt-tab-content="#tab-comments"]').classList.add("tab-btn-hidden");
            Promise.resolve(lockSet["removeKeepCommentsScrollerLock"]).then(removeKeepCommentsScroller).catch(console.warn);
          }
        },
        "ytd-comments-header-renderer::defined": (cProto) => {
          if (!cProto.attached498 && typeof cProto.attached === "function") {
            cProto.attached498 = cProto.attached;
            cProto.attached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-comments-header-renderer::attached"]).catch(console.warn);
              Promise.resolve(this.hostElement).then(eventMap["ytd-comments-header-renderer::dataChanged"]).catch(console.warn);
              return this.attached498();
            };
          }
          if (!cProto.detached498 && typeof cProto.detached === "function") {
            cProto.detached498 = cProto.detached;
            cProto.detached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-comments-header-renderer::detached"]).catch(console.warn);
              return this.detached498();
            };
          }
          if (!cProto.dataChanged498 && typeof cProto.dataChanged === "function") {
            cProto.dataChanged498 = cProto.dataChanged;
            cProto.dataChanged = function() {
              Promise.resolve(this.hostElement).then(eventMap["ytd-comments-header-renderer::dataChanged"]).catch(console.warn);
              return this.dataChanged498();
            };
          }
          makeInitAttached("ytd-comments-header-renderer");
        },
        "ytd-comments-header-renderer::attached": (hostElement2) => {
          if (invalidFlexyParent(hostElement2))
            return;
          if (hostElement2 instanceof Element)
            hostElement2[__attachedSymbol__] = true;
          if (!(hostElement2 instanceof HTMLElement_) || !(hostElement2.classList.length > 0) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== true)
            return;
          if (!hostElement2 || !hostElement2.classList.contains("ytd-item-section-renderer"))
            return;
          const targetElement = document.querySelector(
            "[tyt-comments-area] ytd-comments-header-renderer"
          );
          if (hostElement2 === targetElement) {
            hostElement2.setAttribute111("tyt-comments-header-field", "");
          } else {
            const parentNode = hostElement2.parentNode;
            if (parentNode instanceof HTMLElement_ && parentNode.querySelector("[tyt-comments-header-field]")) {
              hostElement2.setAttribute111("tyt-comments-header-field", "");
            }
          }
        },
        "ytd-comments-header-renderer::detached": (hostElement2) => {
          if (!(hostElement2 instanceof HTMLElement_) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== false)
            return;
          if (hostElement2.hasAttribute000("field-of-cm-count")) {
            const cmCount = document.querySelector("#tyt-cm-count");
            if (cmCount) {
              cmCount.textContent = "";
              hostElement2.removeAttribute000("field-of-cm-count");
            }
          }
          if (hostElement2.hasAttribute000("tyt-comments-header-field")) {
            hostElement2.removeAttribute000("tyt-comments-header-field");
          }
        },
        "ytd-comments-header-renderer::dataChanged": (hostElement2) => {
          if (!(hostElement2 instanceof HTMLElement_) || !(hostElement2.classList.length > 0) || hostElement2.closest("noscript"))
            return;
          const ytdFlexyElm = elements.flexy;
          let b = false;
          const cnt = insp(hostElement2);
          if (cnt && hostElement2.closest("#tab-comments") && document.querySelector(
            "#tab-comments ytd-comments-header-renderer"
          ) === hostElement2) {
            b = true;
          } else if (hostElement2 instanceof HTMLElement_ && hostElement2.parentNode instanceof HTMLElement_ && hostElement2.parentNode.querySelector("[tyt-comments-header-field]")) {
            b = true;
          }
          if (b) {
            hostElement2.setAttribute111("tyt-comments-header-field", "");
            ytdFlexyElm && ytdFlexyElm.removeAttribute000("tyt-comment-disabled");
          }
          if (hostElement2.hasAttribute000("tyt-comments-header-field") && hostElement2.isConnected === true) {
            const data = cnt.data;
            let ez = "";
            if (data.commentsCount && data.commentsCount.runs && data.commentsCount.runs.length >= 1) {
              let max = -1;
              const z = data.commentsCount.runs.map((e) => {
                let c = e.text.replace(/\D+/g, "").length;
                if (c > max)
                  max = c;
                return [e.text, c];
              }).filter((a) => a[1] === max);
              if (z.length >= 1) {
                ez = z[0][0];
              }
            } else if (data.countText && data.countText.runs && data.countText.runs.length >= 1) {
              let max = -1;
              const z = data.countText.runs.map((e) => {
                let c = e.text.replace(/\D+/g, "").length;
                if (c > max)
                  max = c;
                return [e.text, c];
              }).filter((a) => a[1] === max);
              if (z.length >= 1) {
                ez = z[0][0];
              }
            }
            const cmCount = document.querySelector("#tyt-cm-count");
            if (ez) {
              hostElement2.setAttribute111("field-of-cm-count", "");
              cmCount && (cmCount.textContent = ez.trim());
            } else {
              hostElement2.removeAttribute000("field-of-cm-count");
              cmCount && (cmCount.textContent = "");
            }
          }
        },
        "ytd-expander::defined": (cProto) => {
          if (!cProto.attached498 && typeof cProto.attached === "function") {
            cProto.attached498 = cProto.attached;
            cProto.attached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-expander::attached"]).catch(console.warn);
              return this.attached498();
            };
          }
          if (!cProto.detached498 && typeof cProto.detached === "function") {
            cProto.detached498 = cProto.detached;
            cProto.detached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-expander::detached"]).catch(console.warn);
              return this.detached498();
            };
          }
          if (!cProto.calculateCanCollapse498 && typeof cProto.calculateCanCollapse === "function") {
            cProto.calculateCanCollapse498 = cProto.calculateCanCollapse;
            cProto.calculateCanCollapse = funcCanCollapse;
          }
          if (!cProto.childrenChanged498 && typeof cProto.childrenChanged === "function") {
            cProto.childrenChanged498 = cProto.childrenChanged;
            cProto.childrenChanged = function() {
              Promise.resolve(this.hostElement).then(eventMap["ytd-expander::childrenChanged"]).catch(console.warn);
              return this.childrenChanged498();
            };
          }
          makeInitAttached("ytd-expander");
        },
        "ytd-expander::childrenChanged": (hostElement2) => {
          if (hostElement2 instanceof Node && hostElement2.hasAttribute000("hidden") && hostElement2.hasAttribute000("tyt-main-info") && hostElement2.firstElementChild) {
            hostElement2.removeAttribute("hidden");
          }
        },
        "ytd-expandable-video-description-body-renderer::defined": (cProto) => {
          if (!cProto.attached498 && typeof cProto.attached === "function") {
            cProto.attached498 = cProto.attached;
            cProto.attached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(
                  eventMap["ytd-expandable-video-description-body-renderer::attached"]
                ).catch(console.warn);
              return this.attached498();
            };
          }
          if (!cProto.detached498 && typeof cProto.detached === "function") {
            cProto.detached498 = cProto.detached;
            cProto.detached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(
                  eventMap["ytd-expandable-video-description-body-renderer::detached"]
                ).catch(console.warn);
              return this.detached498();
            };
          }
          makeInitAttached("ytd-expandable-video-description-body-renderer");
        },
        "ytd-expandable-video-description-body-renderer::attached": async (hostElement2) => {
          if (hostElement2 instanceof HTMLElement_ && isPageDOM(hostElement2, "[tyt-info-renderer]") && !hostElement2.matches("[tyt-main-info]")) {
            elements.infoExpander = hostElement2;
            infoExpanderElementProvidedPromise.resolve();
            hostElement2.setAttribute111("tyt-main-info", "");
            if (plugin.autoExpandInfoDesc.toUse) {
              plugin.autoExpandInfoDesc.onMainInfoSet(hostElement2);
            }
            const lockId = lockSet["rightTabReadyLock03"];
            await rightTabsProvidedPromise.then();
            if (lockGet["rightTabReadyLock03"] !== lockId)
              return;
            if (elements.infoExpander !== hostElement2)
              return;
            if (hostElement2.isConnected === false)
              return;
            elements.infoExpander.classList.add("tyt-main-info");
            const infoExpander = elements.infoExpander;
            const inlineExpanderElm = infoExpander.querySelector(
              "ytd-text-inline-expander"
            );
            if (inlineExpanderElm) {
              const mo = new MutationObserver(() => {
                const p = document.querySelector(
                  "#tab-info ytd-text-inline-expander"
                );
                sessionStorage.__$$tmp_UseAutoExpandInfoDesc$$__ = p && p.hasAttribute("is-expanded") ? "1" : "";
                if (p)
                  fixInlineExpanderContent();
              });
              mo.observe(inlineExpanderElm, {
                attributes: ["is-expanded", "attr-6v8qu", "hidden"],
                subtree: true
              });
              hostElement2.incAttribute111("attr-6v8qu");
              const cnt = insp(inlineExpanderElm);
              if (cnt) {
                try {
                  cnt.updateIsAttributedExpanded();
                } catch (e) {
                }
                try {
                  cnt.updateIsFormattedExpanded();
                } catch (e) {
                }
                try {
                  cnt.updateTextOnSnippetTypeChange();
                } catch (e) {
                }
                try {
                  cnt.updateStyles();
                } catch (e) {
                }
              }
            }
            if (infoExpander && !infoExpander.closest("#right-tabs")) {
              document.querySelector("#tab-info").assignChildern111(null, infoExpander, null);
            } else {
              if (document.querySelector('[tyt-tab-content="#tab-info"]')) {
                const shouldTabVisible = elements.infoExpander && elements.infoExpander.closest("#tab-info");
                document.querySelector('[tyt-tab-content="#tab-info"]').classList.toggle("tab-btn-hidden", !shouldTabVisible);
              }
            }
            Promise.resolve(lockSet["infoFixLock"]).then(infoFix).catch(console.warn);
          }
          if (hostElement2 instanceof Element)
            hostElement2[__attachedSymbol__] = true;
          if (!(hostElement2 instanceof HTMLElement_) || !(hostElement2.classList.length > 0) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== true)
            return;
          if (isPageDOM(hostElement2, "#tab-info [tyt-main-info]")) {
          } else if (!hostElement2.closest("#tab-info")) {
            const bodyRenderer = hostElement2;
            let bodyRendererNew = document.querySelector(
              "ytd-expandable-video-description-body-renderer[tyt-info-renderer]"
            );
            if (!bodyRendererNew) {
              bodyRendererNew = document.createElement(
                "ytd-expandable-video-description-body-renderer"
              );
              bodyRendererNew.setAttribute("tyt-info-renderer", "");
              nsTemplateObtain().appendChild(bodyRendererNew);
            }
            const cnt = insp(bodyRendererNew);
            cnt.data = Object.assign({}, insp(bodyRenderer).data);
            const inlineExpanderElm = bodyRendererNew.querySelector(
              "ytd-text-inline-expander"
            );
            const inlineExpanderCnt = insp(inlineExpanderElm);
            fixInlineExpanderMethods(inlineExpanderCnt);
            elements.infoExpanderRendererBack = bodyRenderer;
            elements.infoExpanderRendererFront = bodyRendererNew;
            bodyRenderer.setAttribute("tyt-info-renderer-back", "");
            bodyRendererNew.setAttribute("tyt-info-renderer-front", "");
          }
        },
        "ytd-expandable-video-description-body-renderer::detached": async () => {
          if (!(hostElement instanceof HTMLElement_) || hostElement.closest("noscript"))
            return;
          if (hostElement.isConnected !== false)
            return;
          if (hostElement.hasAttribute000("tyt-main-info")) {
            elements.infoExpander = null;
            hostElement.removeAttribute000("tyt-main-info");
          }
        },
        "ytd-expander::attached": async (hostElement2) => {
          if (invalidFlexyParent(hostElement2))
            return;
          if (hostElement2 instanceof Element)
            hostElement2[__attachedSymbol__] = true;
          if (!(hostElement2 instanceof HTMLElement_) || !(hostElement2.classList.length > 0) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== true)
            return;
          if (hostElement2 instanceof HTMLElement_ && hostElement2.matches(
            "[tyt-comments-area] #contents ytd-expander#expander"
          ) && !hostElement2.matches("[hidden] ytd-expander#expander")) {
            hostElement2.setAttribute111("tyt-content-comment-entry", "");
            ioComment.observe(hostElement2);
          }
        },
        "ytd-expander::detached": (hostElement2) => {
          if (!(hostElement2 instanceof HTMLElement_) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== false)
            return;
          if (hostElement2.hasAttribute000("tyt-content-comment-entry")) {
            ioComment.unobserve(hostElement2);
            hostElement2.removeAttribute000("tyt-content-comment-entry");
          } else if (hostElement2.hasAttribute000("tyt-main-info")) {
            elements.infoExpander = null;
            hostElement2.removeAttribute000("tyt-main-info");
          }
        },
        "ytd-live-chat-frame::defined": (cProto) => {
          let lastDomAction = 0;
          if (!cProto.attached498 && typeof cProto.attached === "function") {
            cProto.attached498 = cProto.attached;
            cProto.attached = function() {
              lastDomAction = Date.now();
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-live-chat-frame::attached"]).catch(console.warn);
              return this.attached498();
            };
          }
          if (!cProto.detached498 && typeof cProto.detached === "function") {
            cProto.detached498 = cProto.detached;
            cProto.detached = function() {
              lastDomAction = Date.now();
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-live-chat-frame::detached"]).catch(console.warn);
              return this.detached498();
            };
          }
          if (typeof cProto.urlChanged === "function" && !cProto.urlChanged66 && !cProto.urlChangedAsync12 && cProto.urlChanged.length === 0) {
            cProto.urlChanged66 = cProto.urlChanged;
            let ath = 0;
            cProto.urlChangedAsync12 = async function() {
              const t = ath = (ath & 1073741823) + 1;
              const chatframe = this.chatframe || (this.$ || 0).chatframe || 0;
              if (chatframe instanceof HTMLIFrameElement) {
                if (chatframe.contentDocument === null) {
                  await Promise.resolve("#").catch(console.warn);
                  if (t !== ath)
                    return;
                }
                const p1 = new Promise(
                  (resolve) => setTimeout_(resolve, 706)
                ).catch(console.warn);
                const p2 = new Promise((resolve) => {
                  new IntersectionObserver((entries, observer) => {
                    for (const entry of entries) {
                      const rect = entry.boundingClientRect || 0;
                      if (rect.width > 0 && rect.height > 0) {
                        observer.disconnect();
                        resolve("#");
                        break;
                      }
                    }
                  }).observe(chatframe);
                }).catch(console.warn);
                await Promise.race([p1, p2]);
                if (t !== ath)
                  return;
              }
              this.urlChanged66();
            };
            cProto.urlChanged = function() {
              this.urlChangedAsync12();
            };
          }
          makeInitAttached("ytd-live-chat-frame");
        },
        "ytd-live-chat-frame::attached": async (hostElement2) => {
          if (invalidFlexyParent(hostElement2))
            return;
          if (hostElement2 instanceof Element)
            hostElement2[__attachedSymbol__] = true;
          if (!(hostElement2 instanceof HTMLElement_) || !(hostElement2.classList.length > 0) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== true)
            return;
          if (!hostElement2 || hostElement2.id !== "chat")
            return;
          const lockId = lockSet["ytdLiveAttachedLock"];
          const chatElem = await getGeneralChatElement();
          if (lockGet["ytdLiveAttachedLock"] !== lockId)
            return;
          if (chatElem === hostElement2) {
            elements.chat = chatElem;
            aoChat.observe(chatElem, { attributes: true });
            const isFlexyReady = elements.flexy instanceof Element;
            chatElem.setAttribute111(
              "tyt-active-chat-frame",
              isFlexyReady ? "CF" : "C"
            );
            const chatContainer = chatElem ? chatElem.closest("#chat-container") || chatElem : null;
            if (chatContainer && !chatContainer.hasAttribute000("tyt-chat-container")) {
              for (const p of document.querySelectorAll("[tyt-chat-container]")) {
                p.removeAttribute000("[tyt-chat-container]");
              }
              chatContainer.setAttribute111("tyt-chat-container", "");
            }
            Promise.resolve(lockSet["layoutFixLock"]).then(layoutFix);
          } else {
          }
        },
        "ytd-live-chat-frame::detached": (hostElement2) => {
          if (!(hostElement2 instanceof HTMLElement_) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== false)
            return;
          if (hostElement2.hasAttribute000("tyt-active-chat-frame")) {
            aoChat.disconnect();
            aoChat.takeRecords();
            hostElement2.removeAttribute000("tyt-active-chat-frame");
            elements.chat = null;
            const ytdFlexyElm = elements.flexy;
            if (ytdFlexyElm) {
              ytdFlexyElm.removeAttribute000("tyt-chat-collapsed");
              ytdFlexyElm.setAttribute111("tyt-chat", "");
            }
          }
        },
        "ytd-engagement-panel-section-list-renderer::defined": (cProto) => {
          if (!cProto.attached498 && typeof cProto.attached === "function") {
            cProto.attached498 = cProto.attached;
            cProto.attached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(
                  eventMap["ytd-engagement-panel-section-list-renderer::attached"]
                ).catch(console.warn);
              return this.attached498();
            };
          }
          if (!cProto.detached498 && typeof cProto.detached === "function") {
            cProto.detached498 = cProto.detached;
            cProto.detached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(
                  eventMap["ytd-engagement-panel-section-list-renderer::detached"]
                ).catch(console.warn);
              return this.detached498();
            };
          }
          makeInitAttached("ytd-engagement-panel-section-list-renderer");
        },
        "ytd-engagement-panel-section-list-renderer::bindTarget": (hostElement2) => {
          if (hostElement2.matches(
            "#panels.ytd-watch-flexy > ytd-engagement-panel-section-list-renderer[target-id][visibility]"
          )) {
            hostElement2.setAttribute111("tyt-egm-panel", "");
            Promise.resolve(lockSet["updateEgmPanelsLock"]).then(updateEgmPanels).catch(console.warn);
            aoEgmPanels.observe(hostElement2, {
              attributes: true,
              attributeFilter: ["visibility", "hidden"]
            });
          }
        },
        "ytd-engagement-panel-section-list-renderer::attached": (hostElement2) => {
          if (invalidFlexyParent(hostElement2))
            return;
          if (hostElement2 instanceof Element)
            hostElement2[__attachedSymbol__] = true;
          if (!(hostElement2 instanceof HTMLElement_) || !(hostElement2.classList.length > 0) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== true)
            return;
          if (!hostElement2.matches(
            "#panels.ytd-watch-flexy > ytd-engagement-panel-section-list-renderer"
          ))
            return;
          if (hostElement2.hasAttribute000("target-id") && hostElement2.hasAttribute000("visibility")) {
            Promise.resolve(hostElement2).then(
              eventMap["ytd-engagement-panel-section-list-renderer::bindTarget"]
            ).catch(console.warn);
          } else {
            hostElement2.setAttribute000("tyt-egm-panel-jclmd", "");
            moEgmPanelReady.observe(hostElement2, {
              attributes: true,
              attributeFilter: ["visibility", "target-id"]
            });
          }
        },
        "ytd-engagement-panel-section-list-renderer::detached": (hostElement2) => {
          if (!(hostElement2 instanceof HTMLElement_) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== false)
            return;
          if (hostElement2.hasAttribute000("tyt-egm-panel")) {
            hostElement2.removeAttribute000("tyt-egm-panel");
            Promise.resolve(lockSet["updateEgmPanelsLock"]).then(updateEgmPanels).catch(console.warn);
          } else if (hostElement2.hasAttribute000("tyt-egm-panel-jclmd")) {
            hostElement2.removeAttribute000("tyt-egm-panel-jclmd");
            moEgmPanelReadyClearFn();
          }
        },
        "ytd-watch-metadata::defined": (cProto) => {
          if (!cProto.attached498 && typeof cProto.attached === "function") {
            cProto.attached498 = cProto.attached;
            cProto.attached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-watch-metadata::attached"]).catch(console.warn);
              return this.attached498();
            };
          }
          if (!cProto.detached498 && typeof cProto.detached === "function") {
            cProto.detached498 = cProto.detached;
            cProto.detached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-watch-metadata::detached"]).catch(console.warn);
              return this.detached498();
            };
          }
          makeInitAttached("ytd-watch-metadata");
        },
        "ytd-watch-metadata::attached": (hostElement2) => {
          if (invalidFlexyParent(hostElement2))
            return;
          if (hostElement2 instanceof Element)
            hostElement2[__attachedSymbol__] = true;
          if (!(hostElement2 instanceof HTMLElement_) || !(hostElement2.classList.length > 0) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== true)
            return;
          if (plugin.fullChannelNameOnHover.activated)
            plugin.fullChannelNameOnHover.onNavigateFinish();
        },
        "ytd-watch-metadata::detached": (hostElement2) => {
          if (!(hostElement2 instanceof HTMLElement_) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== false)
            return;
        },
        "ytd-playlist-panel-renderer::defined": (cProto) => {
          if (!cProto.attached498 && typeof cProto.attached === "function") {
            cProto.attached498 = cProto.attached;
            cProto.attached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-playlist-panel-renderer::attached"]).catch(console.warn);
              return this.attached498();
            };
          }
          if (!cProto.detached498 && typeof cProto.detached === "function") {
            cProto.detached498 = cProto.detached;
            cProto.detached = function() {
              if (!inPageRearrange)
                Promise.resolve(this.hostElement).then(eventMap["ytd-playlist-panel-renderer::detached"]).catch(console.warn);
              return this.detached498();
            };
          }
          makeInitAttached("ytd-playlist-panel-renderer");
        },
        "ytd-playlist-panel-renderer::attached": (hostElement2) => {
          if (invalidFlexyParent(hostElement2))
            return;
          if (hostElement2 instanceof Element)
            hostElement2[__attachedSymbol__] = true;
          if (!(hostElement2 instanceof HTMLElement_) || !(hostElement2.classList.length > 0) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== true)
            return;
          elements.playlist = hostElement2;
          aoPlayList.observe(hostElement2, {
            attributes: true,
            attributeFilter: ["hidden", "collapsed", "attr-1y6nu"]
          });
          hostElement2.incAttribute111("attr-1y6nu");
        },
        "ytd-playlist-panel-renderer::detached": (hostElement2) => {
          if (!(hostElement2 instanceof HTMLElement_) || hostElement2.closest("noscript"))
            return;
          if (hostElement2.isConnected !== false)
            return;
        },
        _yt_playerProvided: () => {
          mLoaded.flag |= 4;
          document.documentElement.setAttribute111(
            "tabview-loaded",
            mLoaded.makeString()
          );
        },
        relatedElementProvided: (target) => {
          if (target.closest("[hidden]"))
            return;
          elements.related = target;
          videosElementProvidedPromise.resolve();
        },
        onceInfoExpanderElementProvidedPromised: () => {
          const ytdFlexyElm = elements.flexy;
          if (ytdFlexyElm) {
            ytdFlexyElm.setAttribute111("hide-default-text-inline-expander", "");
          }
        },
        refreshSecondaryInner: (lockId) => {
          if (lockGet["refreshSecondaryInnerLock"] !== lockId)
            return;
          const ytdFlexyElm = elements.flexy;
          if (ytdFlexyElm && ytdFlexyElm.matches(
            "ytd-watch-flexy[theater][flexy][full-bleed-player]:not([full-bleed-no-max-width-columns])"
          )) {
            ytdFlexyElm.setAttribute111("full-bleed-no-max-width-columns", "");
          }
          const related = elements.related;
          if (related && related.isConnected && !related.closest("#right-tabs #tab-videos")) {
            document.querySelector("#tab-videos").assignChildern111(null, related, null);
          }
          const infoExpander = elements.infoExpander;
          if (infoExpander && infoExpander.isConnected && !infoExpander.closest("#right-tabs #tab-info")) {
            document.querySelector("#tab-info").assignChildern111(null, infoExpander, null);
          } else {
          }
          const commentsArea = elements.comments;
          if (commentsArea) {
            const isConnected = commentsArea.isConnected;
            if (isConnected && !commentsArea.closest("#right-tabs #tab-comments")) {
              const tab = document.querySelector("#tab-comments");
              tab.assignChildern111(null, commentsArea, null);
            } else {
            }
          }
        },
        "yt-navigate-finish": (evt) => {
          const ytdAppElm = document.querySelector(
            "ytd-page-manager#page-manager.style-scope.ytd-app"
          );
          const ytdAppCnt = insp(ytdAppElm);
          pageType = ytdAppCnt ? (ytdAppCnt.data || 0).page : null;
          if (!document.querySelector("ytd-watch-flexy #player"))
            return;
          const flexyArr = [
            ...document.querySelectorAll("ytd-watch-flexy")
          ].filter((e) => !e.closest("[hidden]") && e.querySelector("#player"));
          if (flexyArr.length === 1) {
            elements.flexy = flexyArr[0];
            if (isRightTabsInserted) {
              Promise.resolve(lockSet["refreshSecondaryInnerLock"]).then(eventMap["refreshSecondaryInner"]).catch(console.warn);
              Promise.resolve(lockSet["removeKeepCommentsScrollerLock"]).then(removeKeepCommentsScroller).catch(console.warn);
            } else {
              navigateFinishedPromise.resolve();
              if (plugin.minibrowser.toUse)
                plugin.minibrowser.activate();
              if (plugin.autoExpandInfoDesc.toUse)
                plugin.autoExpandInfoDesc.activate();
              if (plugin.fullChannelNameOnHover.toUse)
                plugin.fullChannelNameOnHover.activate();
            }
            const chat = elements.chat;
            if (chat instanceof Element) {
              chat.setAttribute111("tyt-active-chat-frame", "CF");
            }
            const infoExpander = elements.infoExpander;
            if (infoExpander && infoExpander.closest("#right-tabs")) {
              Promise.resolve(lockSet["infoFixLock"]).then(infoFix).catch(console.warn);
            }
            Promise.resolve(lockSet["layoutFixLock"]).then(layoutFix);
            if (plugin.fullChannelNameOnHover.activated)
              plugin.fullChannelNameOnHover.onNavigateFinish();
          }
        },
        onceInsertRightTabs: () => {
          const related = elements.related;
          let rightTabs = document.querySelector("#right-tabs");
          if (!document.querySelector("#right-tabs") && related) {
            getLangForPage();
            let docTmp = document.createElement("template");
            docTmp.innerHTML = createHTML(getTabsHTML());
            let newElm = docTmp.content.firstElementChild;
            if (newElm !== null) {
              inPageRearrange = true;
              related.parentNode.insertBefore000(newElm, related);
              inPageRearrange = false;
            }
            rightTabs = newElm;
            rightTabs.querySelector('[tyt-tab-content="#tab-comments"]').classList.add("tab-btn-hidden");
            const secondaryWrapper = document.createElement("secondary-wrapper");
            const secondaryInner = document.querySelector(
              "#secondary-inner.style-scope.ytd-watch-flexy"
            );
            inPageRearrange = true;
            secondaryWrapper.replaceChildren000(...secondaryInner.childNodes);
            secondaryInner.insertBefore000(
              secondaryWrapper,
              secondaryInner.firstChild
            );
            inPageRearrange = false;
            rightTabs.querySelector("#material-tabs").addEventListener("click", eventMap["tabs-btn-click"], true);
            inPageRearrange = true;
            if (!rightTabs.closest("secondary-wrapper"))
              secondaryWrapper.appendChild000(rightTabs);
            inPageRearrange = false;
          }
          if (rightTabs) {
            isRightTabsInserted = true;
            const ioTabBtns = new IntersectionObserver(
              (entries) => {
                for (const entry of entries) {
                  const rect = entry.boundingClientRect;
                  entry.target.classList.toggle(
                    "tab-btn-visible",
                    rect.width && rect.height
                  );
                }
              },
              { rootMargin: "0px" }
            );
            for (const btn of document.querySelectorAll(
              ".tab-btn[tyt-tab-content]"
            )) {
              ioTabBtns.observe(btn);
            }
            if (!related.closest("#right-tabs")) {
              document.querySelector("#tab-videos").assignChildern111(null, related, null);
            }
            const infoExpander = elements.infoExpander;
            if (infoExpander && !infoExpander.closest("#right-tabs")) {
              document.querySelector("#tab-info").assignChildern111(null, infoExpander, null);
            }
            const commentsArea = elements.comments;
            if (commentsArea && !commentsArea.closest("#right-tabs")) {
              document.querySelector("#tab-comments").assignChildern111(null, commentsArea, null);
            }
            rightTabsProvidedPromise.resolve();
            roRightTabs.disconnect();
            roRightTabs.observe(rightTabs);
            const ytdFlexyElm = elements.flexy;
            const aoFlexy = new MutationObserver(eventMap["aoFlexyFn"]);
            aoFlexy.observe(ytdFlexyElm, { attributes: true });
            Promise.resolve(lockSet["fixInitialTabStateLock"]).then(eventMap["fixInitialTabStateFn"]).catch(console.warn);
            ytdFlexyElm.incAttribute111("attr-7qlsy");
          }
        },
        aoFlexyFn: () => {
          Promise.resolve(lockSet["checkCommentsShouldBeHiddenLock"]).then(eventMap["checkCommentsShouldBeHidden"]).catch(console.warn);
          Promise.resolve(lockSet["refreshSecondaryInnerLock"]).then(eventMap["refreshSecondaryInner"]).catch(console.warn);
          Promise.resolve(lockSet["tabsStatusCorrectionLock"]).then(eventMap["tabsStatusCorrection"]).catch(console.warn);
          const videoId = getCurrentVideoId();
          if (videoId !== tmpLastVideoId) {
            tmpLastVideoId = videoId;
            Promise.resolve(lockSet["updateOnVideoIdChangedLock"]).then(eventMap["updateOnVideoIdChanged"]).catch(console.warn);
          }
        },
        twoColumnChanged10: (lockId) => {
          if (lockId !== lockGet["twoColumnChanged10Lock"])
            return;
          for (const continuation of document.querySelectorAll(
            "#tab-videos ytd-watch-next-secondary-results-renderer ytd-continuation-item-renderer"
          )) {
            if (continuation.closest("[hidden]"))
              continue;
            const cnt = insp(continuation);
            if (typeof cnt.showButton === "boolean") {
              if (cnt.showButton === false)
                continue;
              cnt.showButton = false;
              const behavior = cnt.ytRendererBehavior || cnt;
              if (typeof behavior.invalidate === "function") {
                behavior.invalidate(false);
              }
            }
          }
        },
        tabsStatusCorrection: (lockId) => {
          if (lockId !== lockGet["tabsStatusCorrectionLock"])
            return;
          const ytdFlexyElm = elements.flexy;
          if (!ytdFlexyElm)
            return;
          const p = tabAStatus;
          const q = calculationFn(p, 1 | 2 | 4 | 8 | 16 | 32 | 64 | 128);
          let resetForPanelDisappeared = false;
          if (p !== q) {
            let actioned = false;
            if ((p & 128) === 0 && (q & 128) === 128) {
              lastPanel = "playlist";
            } else if ((p & 8) === 0 && (q & 8) === 8) {
              lastPanel = "chat";
            } else if (((p & 4) == 4 && (q & (4 | 8)) == (0 | 0) || (p & 8) == 8 && (q & (4 | 8)) === (0 | 0)) && lastPanel === "chat") {
              lastPanel = lastTab || "";
              resetForPanelDisappeared = true;
            } else if ((p & (4 | 8)) === 8 && (q & (4 | 8)) === 4 && lastPanel === "chat") {
              lastPanel = lastTab || "";
              resetForPanelDisappeared = true;
            } else if ((p & 128) === 128 && (q & 128) === 0 && lastPanel === "playlist") {
              lastPanel = lastTab || "";
              resetForPanelDisappeared = true;
            }
            tabAStatus = q;
            let bFixForResizedTab = false;
            if ((q ^ 2) === 2 && bFixForResizedTabLater) {
              bFixForResizedTab = true;
            }
            if ((p & 16) === 16 & (q & 16) === 0) {
              Promise.resolve(lockSet["twoColumnChanged10Lock"]).then(eventMap["twoColumnChanged10"]).catch(console.warn);
            }
            if ((p & 2) === 2 ^ (q & 2) === 2 && (q & 2) === 2) {
              bFixForResizedTab = true;
            }
            if ((p & 2) === 0 && (q & 2) === 2 && (p & 128) === 128 && (q & 128) === 128) {
              lastPanel = lastTab || "";
              ytBtnClosePlaylist();
              actioned = true;
            }
            if ((p & (8 | 128)) === (0 | 128) && (q & (8 | 128)) === (8 | 128) && lastPanel === "chat") {
              lastPanel = lastTab || "";
              ytBtnClosePlaylist();
              actioned = true;
            }
            if ((p & (2 | 128)) === (2 | 0) && (q & (2 | 128)) === (2 | 128) && lastPanel === "playlist") {
              switchToTab(null);
              actioned = true;
            }
            if ((p & (8 | 128)) === (8 | 0) && (q & (8 | 128)) === (8 | 128) && lastPanel === "playlist") {
              lastPanel = lastTab || "";
              ytBtnCollapseChat();
              actioned = true;
            }
            if ((p & (1 | 16 | 128)) == (1 | 16) && (q & (1 | 16 | 128)) == (1 | 16 | 128)) {
              ytBtnCancelTheater();
              actioned = true;
            }
            if ((p & (1 | 16 | 128)) == (16 | 128) && (q & (1 | 16 | 128)) == (1 | 16 | 128)) {
              lastPanel = lastTab || "";
              ytBtnClosePlaylist();
              actioned = true;
            }
            if ((q & 64) === 64) {
              actioned = false;
            } else if ((p & 64) == 64 && (q & 64) === 0) {
              if ((q & 32) === 32) {
                ytBtnCloseEngagementPanels();
              }
              if ((q & (2 | 8)) === (2 | 8)) {
                if (lastPanel === "chat") {
                  switchToTab(null);
                  actioned = true;
                } else if (lastPanel) {
                  ytBtnCollapseChat();
                  actioned = true;
                }
              }
            } else if ((p & (1 | 2 | 8 | 16 | 32)) === (1 | 0 | 0 | 16 | 0) && (q & (1 | 2 | 8 | 16 | 32)) === (1 | 0 | 8 | 16 | 0)) {
              ytBtnCancelTheater();
              actioned = true;
            } else if ((p & (1 | 16 | 32)) === (0 | 16 | 0) && (q & (1 | 16 | 32)) === (0 | 16 | 32) && (q & (2 | 8)) > 0) {
              if (q & 2) {
                switchToTab(null);
                actioned = true;
              }
              if (q & 8) {
                ytBtnCollapseChat();
                actioned = true;
              }
            } else if ((p & (1 | 16 | 8 | 2)) === (16 | 8) && (q & (1 | 16 | 8 | 2)) === 16 && (q & 128) === 0) {
              if (lastTab) {
                switchToTab(lastTab);
                actioned = true;
              }
            } else if ((p & 1) === 0 && (q & 1) === 1) {
              if ((q & 32) === 32) {
                ytBtnCloseEngagementPanels();
              }
              if ((p & 9) === 8 && (q & 9) === 9) {
                ytBtnCollapseChat();
              }
              switchToTab(null);
              actioned = true;
            } else if ((p & 3) === 1 && (q & 3) === 3) {
              ytBtnCancelTheater();
              actioned = true;
            } else if ((p & 10) === 2 && (q & 10) === 10) {
              switchToTab(null);
              actioned = true;
            } else if ((p & (8 | 32)) === (0 | 32) && (q & (8 | 32)) === (8 | 32)) {
              ytBtnCloseEngagementPanels();
              actioned = true;
            } else if ((p & (2 | 32)) === (0 | 32) && (q & (2 | 32)) === (2 | 32)) {
              ytBtnCloseEngagementPanels();
              actioned = true;
            } else if ((p & (2 | 8)) === (0 | 8) && (q & (2 | 8)) === (2 | 8)) {
              ytBtnCollapseChat();
              actioned = true;
            } else if ((p & 1) === 1 && (q & (1 | 32)) === (0 | 0)) {
              if (lastPanel === "chat") {
                ytBtnExpandChat();
                actioned = true;
              } else if (lastPanel === lastTab && lastTab) {
                switchToTab(lastTab);
                actioned = true;
              }
            }
            if (!actioned && (q & 128) === 128) {
              lastPanel = "playlist";
              if ((q & 2) === 2) {
                switchToTab(null);
                actioned = true;
              }
            }
            if ((p & 2) === 2 && (q & (2 | 128)) === (0 | 128)) {
            } else if ((p & 8) === 8 && (q & (8 | 128)) === (0 | 128)) {
            } else if (!actioned && (p & (1 | 16)) === 16 && (q & (1 | 16 | 8 | 2 | 32 | 64)) === (16 | 0 | 0)) {
              if (lastPanel === "chat") {
                ytBtnExpandChat();
                actioned = true;
              } else if (lastPanel === "playlist") {
                ytBtnOpenPlaylist();
                actioned = true;
              } else if (lastTab) {
                switchToTab(lastTab);
                actioned = true;
              } else if (resetForPanelDisappeared) {
                Promise.resolve(lockSet["fixInitialTabStateLock"]).then(eventMap["fixInitialTabStateFn"]).catch(console.warn);
                actioned = true;
              }
            }
            if (bFixForResizedTab) {
              bFixForResizedTabLater = false;
              Promise.resolve(0).then(eventMap["fixForTabDisplay"]).catch(console.warn);
            }
            if ((p & 16) === 16 ^ (q & 16) === 16) {
              Promise.resolve(lockSet["infoFixLock"]).then(infoFix).catch(console.warn);
              Promise.resolve(lockSet["removeKeepCommentsScrollerLock"]).then(removeKeepCommentsScroller).catch(console.warn);
              Promise.resolve(lockSet["layoutFixLock"]).then(layoutFix).catch(console.warn);
            }
          }
        },
        updateOnVideoIdChanged: (lockId) => {
          if (lockId !== lockGet["updateOnVideoIdChangedLock"])
            return;
          const videoId = tmpLastVideoId;
          if (!videoId)
            return;
          const bodyRenderer = elements.infoExpanderRendererBack;
          const bodyRendererNew = elements.infoExpanderRendererFront;
          if (bodyRendererNew && bodyRenderer) {
            insp(bodyRendererNew).data = insp(bodyRenderer).data;
          }
          Promise.resolve(lockSet["infoFixLock"]).then(infoFix).catch(console.warn);
        },
        fixInitialTabStateFn: async (lockId) => {
          if (lockGet["fixInitialTabStateLock"] !== lockId)
            return;
          const delayTime = fixInitialTabStateK > 0 ? 200 : 1;
          await delayPn(delayTime);
          if (lockGet["fixInitialTabStateLock"] !== lockId)
            return;
          const kTab = document.querySelector("[tyt-tab]");
          const qTab = !kTab || kTab.getAttribute("tyt-tab") === "" ? checkElementExist("ytd-watch-flexy[is-two-columns_]", "[hidden]") : null;
          if (checkElementExist(
            "ytd-playlist-panel-renderer#playlist",
            "[hidden], [collapsed]"
          )) {
            switchToTab(null);
          } else if (checkElementExist("ytd-live-chat-frame#chat", "[hidden], [collapsed]")) {
            switchToTab(null);
            if (checkElementExist("ytd-watch-flexy[theater]", "[hidden]")) {
              ytBtnCollapseChat();
            }
          } else if (qTab) {
            const hasTheater = qTab.hasAttribute("theater");
            if (!hasTheater) {
              const btn0 = document.querySelector(".tab-btn-visible");
              if (btn0) {
                switchToTab(btn0);
              } else {
                switchToTab(null);
              }
            } else {
              switchToTab(null);
            }
          } else {
          }
          fixInitialTabStateK++;
        },
        "tabs-btn-click": (evt) => {
          const target = evt.target;
          if (target instanceof HTMLElement_ && target.classList.contains("tab-btn") && target.hasAttribute000("tyt-tab-content")) {
            evt.preventDefault();
            evt.stopPropagation();
            evt.stopImmediatePropagation();
            const activeLink = target;
            switchToTab(activeLink);
          }
        }
      };
      Promise.all([videosElementProvidedPromise, navigateFinishedPromise]).then(eventMap["onceInsertRightTabs"]).catch(console.warn);
      Promise.all([navigateFinishedPromise, infoExpanderElementProvidedPromise]).then(eventMap["onceInfoExpanderElementProvidedPromised"]).catch(console.warn);
      const isCustomElementsProvided = typeof customElements !== "undefined" && typeof (customElements || 0).whenDefined === "function";
      const promiseForCustomYtElementsReady = isCustomElementsProvided ? Promise.resolve(0) : new Promise((callback) => {
        const EVENT_KEY_ON_REGISTRY_READY = "ytI-ce-registry-created";
        if (typeof customElements === "undefined") {
          if (!("__CE_registry" in document)) {
            Object.defineProperty(document, "__CE_registry", {
              get() {
              },
              set(nv) {
                if (typeof nv == "object") {
                  delete this.__CE_registry;
                  this.__CE_registry = nv;
                  this.dispatchEvent(
                    new CustomEvent(EVENT_KEY_ON_REGISTRY_READY)
                  );
                }
                return true;
              },
              enumerable: false,
              configurable: true
            });
          }
          let eventHandler = (evt) => {
            document.removeEventListener(
              EVENT_KEY_ON_REGISTRY_READY,
              eventHandler,
              false
            );
            const f = callback;
            callback = null;
            eventHandler = null;
            f();
          };
          document.addEventListener(
            EVENT_KEY_ON_REGISTRY_READY,
            eventHandler,
            false
          );
        } else {
          callback();
        }
      });
      const _retrieveCE = async (nodeName) => {
        try {
          isCustomElementsProvided || await promiseForCustomYtElementsReady;
          await customElements.whenDefined(nodeName);
        } catch (e) {
        }
      };
      const retrieveCE = async (nodeName) => {
        try {
          isCustomElementsProvided || await promiseForCustomYtElementsReady;
          await customElements.whenDefined(nodeName);
          const dummy = document.querySelector(nodeName) || document.createElement(nodeName);
          const cProto = insp(dummy).constructor.prototype;
          return cProto;
        } catch (e) {
        }
      };
      const moOverallRes = {
        _yt_playerProvided: () => (window || 0)._yt_player || 0 || 0
      };
      let promiseWaitNext = null;
      const moOverall = new MutationObserver(() => {
        if (promiseWaitNext) {
          promiseWaitNext.resolve();
          promiseWaitNext = null;
        }
        if (typeof moOverallRes._yt_playerProvided === "function") {
          const r = moOverallRes._yt_playerProvided();
          if (r) {
            moOverallRes._yt_playerProvided = r;
            eventMap._yt_playerProvided();
          }
        }
      });
      moOverall.observe(document, { subtree: true, childList: true });
      const moEgmPanelReady = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          const target = mutation.target;
          if (!target.hasAttribute000("tyt-egm-panel-jclmd"))
            continue;
          if (target.hasAttribute000("target-id") && target.hasAttribute000("visibility")) {
            target.removeAttribute000("tyt-egm-panel-jclmd");
            moEgmPanelReadyClearFn();
            Promise.resolve(target).then(
              eventMap["ytd-engagement-panel-section-list-renderer::bindTarget"]
            ).catch(console.warn);
          }
        }
      });
      const moEgmPanelReadyClearFn = () => {
        if (document.querySelector("[tyt-egm-panel-jclmd]") === null) {
          moEgmPanelReady.takeRecords();
          moEgmPanelReady.disconnect();
        }
      };
      document.addEventListener(
        "yt-navigate-finish",
        eventMap["yt-navigate-finish"],
        false
      );
      document.addEventListener(
        "animationstart",
        (evt) => {
          const f = eventMap[evt.animationName];
          if (typeof f === "function")
            f(evt.target);
        },
        capturePassive
      );
      mLoaded.flag |= 1;
      document.documentElement.setAttribute111(
        "tabview-loaded",
        mLoaded.makeString()
      );
      promiseForCustomYtElementsReady.then(eventMap["ceHack"]).catch(console.warn);
      executionFinished = 1;
    } catch (e) {
    }
  };

  const StorageUtil = {
    keys: {
      youtube: {
        videoPlaySpeed: "yt/videoPlaySpeed",
        functionState: {
          commentTable: "yt/commentTable",
          themeProgressBar: "yt/themeProgressBar",
          screenShot: "yt/screenShot",
          speedControl: "yt/speedControl",
          markOrRemoveAd: "yt/markOrRemoveAd"
        },
        theme: "yt/theme"
      }
    },
    getValue: function(key, defaultValue) {
      return GM_getValue(key, defaultValue);
    },
    setValue: function(key, value) {
      GM_setValue(key, value);
    }
  };

  const Theme = {
    setTheme: function(theme = "light", isReload = true) {
      if (theme === "light") {
        this.setLight(isReload);
      } else if (theme === "dark") {
        this.setDark(isReload);
      } else {
        this.setLight(isReload);
      }
    },
    setDark: function(isReload) {
      this.isDarkTheme(true, isReload);
    },
    setLight: function(isReload) {
      this.isDarkTheme(false, isReload);
    },
    reloadYouTube: function() {
      location.reload();
    },
    isDarkTheme: function(enabled, isReload) {
      const cookies = document.cookie.split("; ");
      let prefCookie = cookies.find((cookie) => cookie.startsWith("PREF="));
      let prefValue = prefCookie ? prefCookie.split("=")[1] : "f6=400";
      prefValue = prefValue.replace(/&f6=\d+/, "").replace(/f6=\d+/, "");
      const prefix = prefValue ? "&" : "";
      if (enabled) {
        prefValue += prefix + "f6=400";
      } else {
        prefValue += prefix + "f6=80000";
      }
      document.cookie = `PREF=${prefValue}; path=/; domain=.youtube.com; secure`;
      if (isReload) {
        this.reloadYouTube();
      }
    },
    init: function() {
      const theme = StorageUtil.getValue(StorageUtil.keys.youtube.theme, "light");
      this.setTheme(theme, false);
      GM_registerMenuCommand("Switch theme, Light or Dark ?", () => {
        let currentTheme = StorageUtil.getValue(StorageUtil.keys.youtube.theme, "light");
        if (currentTheme == "light") {
          currentTheme = "dark";
        } else {
          currentTheme = "light";
        }
        StorageUtil.setValue(StorageUtil.keys.youtube.theme, currentTheme);
        this.setTheme(currentTheme, true);
      });
    }
  };

  const commonUtil = {
    onPageLoad: function(callback) {
      if (document.readyState === "complete") {
        callback();
      } else {
        window.addEventListener("DOMContentLoaded", callback, { once: true });
        window.addEventListener("load", callback, { once: true });
      }
    },
    addStyle: function(style) {
      GM_addStyle(style);
    },
    openInTab: function(url, options = { "active": true, "insert": true, "setParent": true }) {
      if (typeof GM_openInTab === "function") {
        GM_openInTab(url, options);
      } else {
        GM.openInTab(url, options);
      }
    },
    waitForElementByInterval: function(selector, target = document.body, allowEmpty = true, delay = 10, maxDelay = 10 * 1e3) {
      return new Promise((resolve, reject) => {
        let totalDelay = 0;
        let element = target.querySelector(selector);
        let result = allowEmpty ? !!element : !!element && !!element.innerHTML;
        if (result) {
          resolve(element);
        }
        const elementInterval = setInterval(() => {
          if (totalDelay >= maxDelay) {
            clearInterval(elementInterval);
            resolve(null);
          }
          element = target.querySelector(selector);
          result = allowEmpty ? !!element : !!element && !!element.innerHTML;
          if (result) {
            clearInterval(elementInterval);
            resolve(element);
          } else {
            totalDelay += delay;
          }
        }, delay);
      });
    }
  };

  const DownloadYT = {
    download: async function() {
      const downloadUl = await this.getDownloadUrl(window.location.href.replace("music.youtube.com", "www.youtube.com"));
      commonUtil.openInTab(downloadUl);
    },
    getDownloadUrl: function(videoUrl, audioOnly = false) {
      return new Promise((resolve, reject) => {
        resolve("https://www.yt1s.com/youtube-to-mp4?q=" + encodeURIComponent(videoUrl));
      });
    },
    start: function() {
      GM_registerMenuCommand("Download the currently playing video or audio.", () => {
        this.download();
      });
    }
  };

  var css_248z = ".html5-play-progress,.ytp-play-progress{background:#ff0000!important}.html5-load-progress,.ytp-load-progress{background:#666666!important}.html5-scrubber-button,.ytp-scrubber-button{background:#ffffff!important;border:2px solid #ff0000!important;border-radius:50%!important;height:16px!important;width:16px!important;margin-left:-8px!important;margin-top:-2px!important}.html5-progress-bar-container,.ytp-progress-bar-container{height:4px!important}.html5-progress-bar,.ytp-progress-bar{margin-top:0!important;height:4px!important}.html5-progress-list,.video-ads .html5-progress-list.html5-ad-progress-list,.video-ads .ytp-progress-list.ytp-ad-progress-list,.ytp-progress-list{height:4px!important}.ytp-volume-slider-track{background:#666666!important}";

  const ThemeProgressbar = {
    start: function() {
      GM_addStyle(css_248z);
    }
  };

  const Screenshot = {
    run: function() {
      return new Promise((resolve) => {
        const screenShot = StorageUtil.getValue(StorageUtil.keys.youtube.functionState.screenShot, true);
        if (!screenShot) {
          resolve();
          return;
        }
        commonUtil.onPageLoad(async () => {
          await this.genrate();
        });
      });
    },
    genrate: async function() {
      const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      svg.appendChild(path);
      svg.setAttribute("viewbox", "0 0 22 18");
      svg.setAttribute("width", "22px");
      svg.setAttribute("height", "18px");
      svg.setAttribute("fill", "#fff");
      path.setAttribute("d", "M 22 4.9 Q 22 3.8 21.2 3.05 20.4 2.25 19.3 2.25 L 16.4 2.25 16 1.3 Q 15.65 0.5 14.9 0.2 14.55 0.05 14.25 0 L 7.75 0 Q 7.45 0.05 7.1 0.2 6.35 0.5 6 1.3 L 5.6 2.25 2.7 2.25 Q 1.6 2.25 0.85 3.05 0.05 3.8 0 4.9 L 0 15.3 Q 0.05 16.4 0.85 17.15 1.6 17.95 2.7 18 L 19.3 18 Q 20.4 17.95 21.2 17.15 22 16.4 22 15.3 L 22 4.9 M 11 4.9 Q 13.15 4.9 14.7 6.4 16.2 7.95 16.2 10.1 16.2 12.3 14.7 13.8 13.15 15.3 11 15.3 8.85 15.3 7.35 13.8 5.8 12.3 5.8 10.1 5.8 7.95 7.35 6.4 8.85 4.9 11 4.9 M 13.4 7.75 Q 12.4 6.75 11 6.75 9.6 6.75 8.6 7.75 7.65 8.7 7.65 10.1 7.65 11.5 8.6 12.5 9.6 13.5 11 13.5 12.4 13.5 13.4 12.5 14.35 11.5 14.35 10.1 14.35 8.7 13.4 7.75 Z");
      const div1 = document.createElement("div");
      div1.className = "ytp-button ScreenShot_Codehemu";
      div1.setAttribute("style", `position: relative;display: inline-block;width: 48px;height: 100%;`);
      const div2 = document.createElement("div");
      div2.setAttribute("style", `position: absolute;width: 100%;height: 100%;	`);
      const YT_ScreenShotButton_Codehemu = document.createElement("button");
      YT_ScreenShotButton_Codehemu.setAttribute("style", `background-color: transparent;width: 100%;height: 100%;outline: none;flex: 1 1 0%;display: flex;-webkit-box-align: center;align-items: center;-webkit-box-pack: center;justify-content: center;border: none;padding: 0px;cursor: pointer;`);
      div1.onclick = this.screenshot;
      div1.appendChild(div2);
      div2.appendChild(YT_ScreenShotButton_Codehemu);
      YT_ScreenShotButton_Codehemu.appendChild(svg);
      const YT_ScreenShort_Codehemu = await commonUtil.waitForElementByInterval(".ytp-right-controls");
      const ScreenShot_Codehemu = document.querySelector(".ScreenShot_Codehemu");
      if (YT_ScreenShort_Codehemu && !ScreenShot_Codehemu) {
        YT_ScreenShort_Codehemu.prepend(div1);
      }
    },
    screenshot: function() {
      var SF_Codhemeu = "png";
      var extension = "png";
      var appendixTitle = "screenshot." + extension;
      var title;
      var headerEls = document.querySelectorAll(
        "h1.title.ytd-video-primary-info-renderer"
      );
      function SetTitle() {
        if (headerEls.length > 0) {
          title = headerEls[0].innerText.trim();
          return true;
        } else {
          return false;
        }
      }
      if (SetTitle() == false) {
        headerEls = document.querySelectorAll("h1.watch-title-container");
        if (SetTitle() == false)
          title = "";
      }
      var player = document.getElementsByClassName("video-stream")[0];
      var time = player.currentTime;
      title += " ";
      let minutes = Math.floor(time / 60);
      time = Math.floor(time - minutes * 60);
      if (minutes > 60) {
        let hours = Math.floor(minutes / 60);
        minutes -= hours * 60;
        title += hours + "-";
      }
      title += minutes + "-" + time;
      title += " " + appendixTitle;
      var canvas = document.createElement("canvas");
      canvas.width = player.videoWidth;
      canvas.height = player.videoHeight;
      canvas.getContext("2d").drawImage(player, 0, 0, canvas.width, canvas.height);
      var downloadLink = document.createElement("a");
      downloadLink.download = title;
      function DownloadBlob(blob) {
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.click();
      }
      {
        canvas.toBlob(async function(blob) {
          DownloadBlob(blob);
        }, "image/" + SF_Codhemeu);
      }
    }
  };

  const SpeedControl = {
    currentSpeed: 1,
    activeAnimationId: null,
    run: function() {
      return new Promise((resolve) => {
        const speedControl = StorageUtil.getValue(StorageUtil.keys.youtube.functionState.speedControl, true);
        if (!speedControl) {
          resolve();
          return;
        }
        const storageSpeed = StorageUtil.getValue(StorageUtil.keys.youtube.videoPlaySpeed, 1);
        this.currentSpeed = parseFloat(storageSpeed);
        this.insertStyle();
        commonUtil.onPageLoad(async () => {
          await this.genrate();
          this.setVideoRate(storageSpeed);
          this.videoObserver();
          resolve();
        });
      });
    },
    insertStyle: function() {
      const speedBtnStyle = `
			.SpeedControl_Extension_Btn_X{
				width: 4em !important; 
				float: left; 
				text-align: center !important;
				border-radius: 0.5em;
				font-size:13px;
			}
			.SpeedControl_Extension_Btn_X:hover{
				color:red;
				font-weight: bold;
			}
		`;
      const speedShowStyle = `
			#youtube-extension-text-box {
				position: absolute!important;
				margin: auto!important;
				top: 0px!important;
				right: 0px!important;
				bottom: 0px!important;
				left: 0px!important;
				border-radius: 20px!important;
				font-size: 30px!important;
				background-color: #000!important;
				color: #f3f3f3!important;
				z-index: 99999999999999999!important;
				opacity: 0.8!important;
				width: 80px!important;
				height: 80px!important;
				line-height: 80px!important;
				text-align: center!important;
				padding: 0px!important;
			}
		`;
      const speedOptionsStyle = `
			.SpeedControl_Extension_Speed-Options {
				position: absolute!important;
				background: black!important;
				color: white!important;
				border-radius: 5px!important;
				display: none;
				bottom: calc(100% + 10px)!important;
				width:48px!important;
			}
			.SpeedControl_Extension_Speed-Options >.SpeedControl_Extension_Speed-Option-Item {
				cursor: pointer!important;
				height: 25px!important;
				line-height: 25px!important;
				font-size:12px!important;
				text-align: center!important;
			}
			.SpeedControl_Extension_Speed-Options >.SpeedControl_Extension_Speed-Option-Item-Active,
			.SpeedControl_Extension_Speed-Options >.SpeedControl_Extension_Speed-Option-Item:hover {
				color: red!important;
			}
		`;
      commonUtil.addStyle(speedBtnStyle + speedShowStyle + speedOptionsStyle);
    },
    genrate: async function() {
      const speedControlBtn = document.createElement("div");
      speedControlBtn.className = "ytp-button SpeedControl_Extension_Btn_X";
      const speedText = document.createElement("span");
      speedText.textContent = "" + this.currentSpeed + "×";
      speedControlBtn.appendChild(speedText);
      const YT_ScreenShort_Codehemu = await commonUtil.waitForElementByInterval(".ytp-right-controls");
      const ScreenShot_Codehemu_Btn = document.querySelector(".SpeedControl_Extension_Btn_X");
      if (YT_ScreenShort_Codehemu && !ScreenShot_Codehemu_Btn) {
        YT_ScreenShort_Codehemu.prepend(speedControlBtn);
        this.genrateOptions(speedControlBtn);
      }
    },
    genrateOptions: function(speedControl) {
      const speedOptions = document.createElement("div");
      speedOptions.classList.add("SpeedControl_Extension_Speed-Options");
      speedControl.appendChild(speedOptions);
      const speeds = ["0.5", "0.75", "1.0", "1.5", "2.0", "3.0"];
      speeds.forEach((speed) => {
        const option = document.createElement("div");
        option.className = "SpeedControl_Extension_Speed-Option-Item";
        option.textContent = `${speed}x`;
        option.dataset.speed = speed;
        if (parseFloat(speed) === this.currentSpeed) {
          option.classList.add("SpeedControl_Extension_Speed-Option-Item-Active");
        }
        speedOptions.appendChild(option);
      });
      let isHovering = false;
      speedControl.addEventListener("mouseenter", () => {
        isHovering = true;
        speedOptions.style.display = "block";
      });
      speedControl.addEventListener("mouseleave", () => {
        isHovering = false;
        setTimeout(() => {
          if (!isHovering) {
            speedOptions.style.display = "none";
          }
        }, 150);
      });
      speedOptions.addEventListener("mouseenter", () => {
        isHovering = true;
      });
      speedOptions.addEventListener("mouseleave", () => {
        isHovering = false;
        speedOptions.style.display = "none";
      });
      speedOptions.addEventListener("click", (event) => {
        speedOptions.style.display = "none";
        const speedValue = parseFloat(event.target.dataset.speed);
        this.speedDisplayText("" + speedValue + "×");
        this.setVideoRate(speedValue);
        this.currentSpeed = speedValue;
        this.updateVideoPlaySpeedStorage(speedValue);
        speedControl.querySelector("span").textContent = "" + speedValue + "×";
        speedOptions.querySelectorAll(".SpeedControl_Extension_Speed-Option-Item").forEach((option) => {
          option.classList.remove("SpeedControl_Extension_Speed-Option-Item-Active");
        });
        event.target.classList.add("SpeedControl_Extension_Speed-Option-Item-Active");
      });
    },
    updateVideoPlaySpeedStorage: function(speedValue) {
      StorageUtil.setValue(StorageUtil.keys.youtube.videoPlaySpeed, speedValue);
    },
    speedDisplayText: function(speedText) {
      let elementId = "youtube-extension-text-box";
      let element = document.getElementById(elementId);
      if (!element) {
        let mediaElement = document.getElementById("movie_player");
        mediaElement.insertAdjacentHTML("afterbegin", `<div id="${elementId}">${speedText}</div>`);
        element = document.getElementById(elementId);
      } else {
        element.textContent = speedText;
      }
      element.style.display = "block";
      element.style.opacity = 0.8;
      element.style.filter = `alpha(opacity=${0.8 * 100})`;
      this.startFadeoutAnimation(element);
    },
    startFadeoutAnimation: function(element, startOpacity = 0.9, duration = 1500) {
      let opacity = startOpacity;
      const startTime = performance.now();
      if (this.activeAnimationId) {
        cancelAnimationFrame(this.activeAnimationId);
      }
      const fadeStep = (timestamp) => {
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        opacity = startOpacity * (1 - progress);
        element.style.opacity = opacity;
        element.style.filter = `alpha(opacity=${opacity * 100})`;
        if (progress < 1) {
          this.activeAnimationId = requestAnimationFrame(fadeStep);
        } else {
          element.style.display = "none";
          this.activeAnimationId = null;
        }
      };
      this.activeAnimationId = requestAnimationFrame(fadeStep);
    },
    setVideoRate: function(speed) {
      const videoElement = document.querySelector("video");
      if (!videoElement)
        return;
      videoElement.playbackRate = speed;
    },
    videoObserver: function() {
      const checkVideoInterval = setInterval(() => {
        const videoElement = document.querySelector("video");
        if (videoElement) {
          clearInterval(checkVideoInterval);
          const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
              if (mutation.type === "attributes" && mutation.attributeName === "src") {
                videoElement.playbackRate = this.currentSpeed;
              }
            }
          });
          observer.observe(videoElement, {
            attributes: true
          });
        }
      }, 1500);
    }
  };

  const MarkOrRemoveAd = {
    generateRemoveAdElementId: "removeADHTMLElement_" + Math.ceil(Math.random() * 1e8),
    markADHTMLElement: function() {
      if (document.querySelector(this.generateRemoveAdElementId)) {
        return;
      }
      let cssMarkSelectorArr = [
        `#masthead-ad`,
        `ytd-rich-item-renderer.style-scope.ytd-rich-grid-row #content:has(.ytd-display-ad-renderer)`,
        `.video-ads.ytp-ad-module`,
        `tp-yt-paper-dialog:has(yt-mealbar-promo-renderer)`,
        `ytd-engagement-panel-section-list-renderer[target-id="engagement-panel-ads"]`,
        `#related #player-ads`,
        `#related ytd-ad-slot-renderer`,
        `ytd-ad-slot-renderer`,
        `yt-mealbar-promo-renderer`,
        `ytd-popup-container:has(a[href="/premium"])`,
        `ad-slot-renderer`,
        `ytm-companion-ad-renderer`
      ];
      cssMarkSelectorArr.forEach((selector, index) => {
        cssMarkSelectorArr[index] = `${selector} *{text-decoration:line-through!important;text-decoration-thickness:2px!important;}`;
      });
      const cssText = cssMarkSelectorArr.join(" ");
      const style = document.createElement(`style`);
      style.id = this.generateRemoveAdElementId;
      (document.head || document.body).appendChild(style);
      style.appendChild(document.createTextNode(cssText));
    },
    run: function() {
      commonUtil.onPageLoad(() => {
        this.markADHTMLElement();
      });
    }
  };

  /*!
   * credit to Benjamin Philipp
   * MIT
   * original source: https://greasyfork.org/en/scripts/433051-trusted-types-helper
   */
  const overwrite_default = false;
  const passThroughFunc = function(string, sink) {
    return string;
  };
  var TTPName = "passthrough";
  var TTP_default, TTP = { createHTML: passThroughFunc, createScript: passThroughFunc, createScriptURL: passThroughFunc };
  var needsTrustedHTML = false;
  !window.TTP && (() => {
    try {
      if (typeof window.isSecureContext !== "undefined" && window.isSecureContext) {
        if (window.trustedTypes && window.trustedTypes.createPolicy) {
          needsTrustedHTML = true;
          if (trustedTypes.defaultPolicy) {
            if (overwrite_default) ; else {
              TTP = window.trustedTypes.createPolicy(TTPName, TTP);
            }
            TTP_default = trustedTypes.defaultPolicy;
          } else {
            TTP_default = TTP = window.trustedTypes.createPolicy(
              "default",
              TTP
            );
          }
        }
      }
    } catch (e) {
    } finally {
      window.TTP = TTP;
    }
  })();
  const createHTML = (s) => {
    if (typeof TTP !== "undefined" && typeof TTP.createHTML === "function")
      return TTP.createHTML(s);
    return s;
  };
  (async () => {
    const communicationKey = `ck-${Date.now()}-${Math.floor(Math.random() * 314159265359 + 314159265359).toString(36)}`;
    const Promise = (async () => {
    })().constructor;
    if (!document.documentElement) {
      await Promise.resolve(0);
      while (!document.documentElement) {
        await new Promise((resolve) => nextBrowserTick(resolve)).then().catch(console.warn);
      }
    }
    const sourceURL = "debug://tabview-youtube/tabview.execution.js";
    const textContent = `(${executionScript})("${communicationKey}");${"\n\n"}//# sourceURL=${sourceURL}${"\n"}`;
    let button = document.createElement("button");
    button.setAttribute("onclick", createHTML(textContent));
    button.click();
    button = null;
    let style = document.createElement("style");
    const sourceURLMainCSS = "debug://tabview-youtube/tabview.main.css";
    style.textContent = `${styles["main"].trim()}${"\n\n"}/*# sourceURL=${sourceURLMainCSS} */${"\n"}`;
    document.documentElement.appendChild(style);
  })();
  {
    DownloadYT.start();
  }
  {
    ThemeProgressbar.start();
  }
  {
    Theme.init();
  }
  {
    MarkOrRemoveAd.run();
  }
  (async () => {
    {
      Screenshot.run();
    }
    {
      SpeedControl.run();
    }
  })();

}());

