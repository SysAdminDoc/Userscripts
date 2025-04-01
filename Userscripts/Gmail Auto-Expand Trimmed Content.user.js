// ==UserScript==
// @name         Gmail Auto-Expand Trimmed Content
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Automatically clicks Gmail's "Show trimmed content" button to expand emails fully
// @author       You
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Function to click all trimmed content buttons
    function expandTrimmedContent() {
        const buttons = document.querySelectorAll('img.ajT');
        buttons.forEach(btn => {
            if (btn.offsetParent !== null) { // check if visible
                btn.click();
            }
        });
    }

    // Run once on load
    window.addEventListener('load', () => {
        setTimeout(expandTrimmedContent, 2000); // Give Gmail time to render
    });

    // Watch for Gmail DOM changes and trigger again
    const observer = new MutationObserver(() => {
        expandTrimmedContent();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
