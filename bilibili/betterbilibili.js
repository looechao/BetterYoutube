// ==UserScript==
// @name         better-bilibili
// @namespace    http://tampermonkey.net/
// @version      5.2
// @description  Hide recommendations and reorganize layout
// @author       looechao
// @match        https://www.bilibili.com/video/*
// @icon         https://www.bilibili.com/favicon.ico
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const TAG = '[Layout]';

    const style = document.createElement('style');
    style.textContent = `
        /* 隐藏广告 */
        .slide-ad-exp,
        .activity-m-v1,
        .video-card-ad-small,
        .ad-report,
        .ad-floor-exp,
        .vcd {
            display: none !important;
        }

        /* 隐藏推荐但保留 video-pod */
        .rcmd-tab > :not(.video-pod) {
            display: none !important;
        }

        .rcmd-tab:empty {
            display: none !important;
        }

        /* 简介永远展开 */
        .basic-desc-info {
            height: auto !important;
            max-height: none !important;
        }

        .video-desc-container .toggle-btn {
            display: none !important;
        }

        /* 标签页容器 */
        #bili-custom-tabs {
            margin-top: 16px;
            margin-left: 0;
            background: #fff;
            border-radius: 8px;
            overflow: visible !important;
            position: relative;
            z-index: 9999 !important;
        }

        .bili-tab-header {
            display: flex;
            border-bottom: 1px solid #e3e5e7;
            position: relative;
            z-index: 10000 !important;
            background: #fff;
        }

        .bili-tab-btn {
            flex: 1;
            padding: 12px;
            text-align: center;
            cursor: pointer !important;
            background: #fff;
            border: none;
            font-size: 14px;
            transition: 0.2s;
            position: relative;
            z-index: 10001 !important;
            pointer-events: auto !important;
            user-select: none;
        }

        .bili-tab-btn:hover {
            background: #f4f4f4 !important;
        }

        .bili-tab-btn.active {
            background: #F4F4F4 !important;
            color: #000000 !important;
        }

        #bili-tab-content {
            position: relative;
            min-height: 350px;
            padding: 16px;
            padding-bottom: 8px;
            z-index: 1;
        }

        /* 内容显示控制 */
        .video-desc-container,
        .video-tag-container,
        #commentapp {
            display: none;
        }

        .video-desc-container.tab-visible,
        .video-tag-container.tab-visible,
        #commentapp.tab-visible {
            display: block !important;
        }

        .video-tag-container.tab-visible {
            margin-top: 16px !important;
        }

        /* video-pod 包装器 */
        .video-pod-wrapper {
            display: none;
            margin-left: -16px;
            margin-bottom: 16px;
        }

        .video-pod-wrapper.tab-visible {
            display: block !important;
        }

        .video-pod-wrapper .video-pod {
            width: 100% !important;
            max-width: none !important;
        }

        /* danmaku-box 包装器 */
        .danmaku-box-wrapper {
            display: none;
        }

        .danmaku-box-wrapper.tab-visible {
            display: block !important;
        }

        .right-container-inner {
            padding-bottom: clamp(16px, 2vh, 28px) !important;
            margin-bottom: 0 !important;
        }

        /* 修复图片懒加载 */
        #bili-custom-tabs img[data-src] {
            content: attr(data-src);
        }
    `;
    document.head.appendChild(style);

    // 修复懒加载图片
    function fixLazyImages(container) {
        const images = container.querySelectorAll('img[data-src], img.lazy-img');
        images.forEach(img => {
            if (img.dataset.src && (!img.src || img.src === 'about:blank')) {
                img.src = img.dataset.src;
            }
            img.classList.remove('lazy-img');
        });
    }

    function init() {
        const rightContainer = document.querySelector('.right-container');
        const upPanel = document.querySelector('.up-panel-container');
        if (!rightContainer || !upPanel || document.querySelector('#bili-custom-tabs')) {
            return false;
        }

        console.log(TAG, 'initializing');

        // 提前抓取元素
        const videoPod = document.querySelector('.rcmd-tab .video-pod');
        const danmakuBox = document.querySelector('.danmaku-box');

        // 创建标签页
        const tabContainer = document.createElement('div');
        tabContainer.id = 'bili-custom-tabs';

        const header = document.createElement('div');
        header.className = 'bili-tab-header';

        const btn1 = document.createElement('button');
        btn1.className = 'bili-tab-btn active';
        btn1.textContent = '简介';
        btn1.type = 'button';

        const btn2 = document.createElement('button');
        btn2.className = 'bili-tab-btn';
        btn2.textContent = '评论';
        btn2.type = 'button';

        const btn3 = document.createElement('button');
        btn3.className = 'bili-tab-btn';
        btn3.textContent = '弹幕';
        btn3.type = 'button';

        header.appendChild(btn1);
        header.appendChild(btn2);
        header.appendChild(btn3);

        const content = document.createElement('div');
        content.id = 'bili-tab-content';

        tabContainer.appendChild(header);
        tabContainer.appendChild(content);
        upPanel.after(tabContainer);

        // 插入内容:video-pod
        if (videoPod) {
            const podWrapper = document.createElement('div');
            podWrapper.className = 'video-pod-wrapper tab-visible';
            podWrapper.appendChild(videoPod);
            content.appendChild(podWrapper);

            // 立即修复图片
            fixLazyImages(videoPod);
            console.log(TAG, 'video-pod moved');
        }

        // 插入内容:简介和标签
        const descContainer = document.querySelector('.video-desc-container');
        const tagContainer = document.querySelector('.video-tag-container');
        if (descContainer) {
            descContainer.classList.add('tab-visible');
            content.appendChild(descContainer);
        }
        if (tagContainer) content.appendChild(tagContainer);

        // 插入内容:评论
        const commentApp = document.querySelector('#commentapp');
        if (commentApp) content.appendChild(commentApp);

        // 插入内容:弹幕
        if (danmakuBox) {
            const danmakuWrapper = document.createElement('div');
            danmakuWrapper.className = 'danmaku-box-wrapper';
            danmakuWrapper.appendChild(danmakuBox);
            content.appendChild(danmakuWrapper);
            console.log(TAG, 'danmaku-box moved');
        }

        // 标签切换
        function switchTab(target) {
            btn1.classList.toggle('active', target === 'desc');
            btn2.classList.toggle('active', target === 'comments');
            btn3.classList.toggle('active', target === 'danmaku');

            const podWrapper = content.querySelector('.video-pod-wrapper');
            if (podWrapper) podWrapper.classList.toggle('tab-visible', target === 'desc');

            if (descContainer) descContainer.classList.toggle('tab-visible', target === 'desc');
            if (tagContainer) tagContainer.classList.toggle('tab-visible', target === 'desc');
            if (commentApp) {
                commentApp.classList.toggle('tab-visible', target === 'comments');
                // 切换到评论时修复图片
                if (target === 'comments') {
                    setTimeout(() => fixLazyImages(commentApp), 100);
                }
            }

            // 弹幕显示控制
            const danmakuWrapper = content.querySelector('.danmaku-box-wrapper');
            if (danmakuWrapper) danmakuWrapper.classList.toggle('tab-visible', target === 'danmaku');

            console.log(TAG, 'tab:', target);
        }

        btn1.onclick = () => switchTab('desc');
        btn2.onclick = () => switchTab('comments');
        btn3.onclick = () => {
            switchTab('danmaku');

            // 延迟执行,确保 DOM 已更新
            setTimeout(() => {
                const collapseWrap = document.querySelector('.danmaku-box-wrapper .bui-collapse-wrap');
                if (collapseWrap?.classList.contains('bui-collapse-wrap-folded')) {
                    const header = collapseWrap.querySelector('.bui-collapse-header');
                    header?.click();
                    console.log(TAG, 'danmaku expanded');
                }
            }, 150);
        };

        switchTab('desc');

        console.log(TAG, 'done');

        setupLateVideoPodDetection(content);
        setupLateDanmakuDetection(content);

        // 初始化完成后修复所有图片
        setTimeout(() => {
            fixLazyImages(document.querySelector('#bili-custom-tabs'));
        }, 500);

        return true;
    }

    function setupLateVideoPodDetection(content) {
        const observer = new MutationObserver(() => {
            const videoPod = document.querySelector('.rcmd-tab .video-pod');
            const existingPod = content?.querySelector('.video-pod-wrapper');
            if (videoPod && content && !existingPod) {
                const podWrapper = document.createElement('div');
                podWrapper.className = 'video-pod-wrapper tab-visible';
                podWrapper.appendChild(videoPod);
                content.insertBefore(podWrapper, content.firstChild);

                // 修复图片
                fixLazyImages(videoPod);
                console.log(TAG, 'late video-pod detected');
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => observer.disconnect(), 15000);
    }

    function setupLateDanmakuDetection(content) {
        const observer = new MutationObserver(() => {
            const danmakuBox = document.querySelector('.danmaku-box');
            const existingDanmaku = content?.querySelector('.danmaku-box-wrapper');
            if (danmakuBox && content && !existingDanmaku) {
                const danmakuWrapper = document.createElement('div');
                danmakuWrapper.className = 'danmaku-box-wrapper';
                danmakuWrapper.appendChild(danmakuBox);
                content.appendChild(danmakuWrapper);
                console.log(TAG, 'late danmaku-box detected');
            }
        });

        observer.observe(document.body, { childList: true, subtree: true });
        setTimeout(() => observer.disconnect(), 15000);
    }

    // 页面导航监听（处理单页应用）
    let lastUrl = location.href;
    setInterval(() => {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            console.log(TAG, 'page changed, reinitializing');

            // 移除旧的标签页
            const oldTabs = document.querySelector('#bili-custom-tabs');
            if (oldTabs) oldTabs.remove();

            // 重新初始化
            setTimeout(() => {
                let count = 0;
                const interval = setInterval(() => {
                    if (init() || count++ > 30) clearInterval(interval);
                }, 500);
            }, 1000);
        }
    }, 1000);

    window.addEventListener('load', () => {
        setTimeout(() => {
            let count = 0;
            const interval = setInterval(() => {
                if (init() || count++ > 30) clearInterval(interval);
            }, 500);
        }, 1000);
    });
})();