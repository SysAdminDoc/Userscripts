// ==UserScript==
// @name         Gmail Auto-Click "Show Images" Button
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Automatically clicks Gmail's "Show images" button to display images without prompting you every time.
// @author       You
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    function clickShowImages() {
        // Newer Gmail UI "Show images" button
        const showImageButtons = document.querySelectorAll('button.bzq.bzr.ylehId');

        showImageButtons.forEach(btn => {
            if (btn.offsetParent !== null && btn.innerText.toLowerCase().includes('show images')) {
                btn.click();
            }
        });
    }

    // Run once on page load
    window.addEventListener('load', () => {
        setTimeout(clickShowImages, 2000);
    });

    // Watch for new messages being opened
    const observer = new MutationObserver(() => {
        clickShowImages();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
