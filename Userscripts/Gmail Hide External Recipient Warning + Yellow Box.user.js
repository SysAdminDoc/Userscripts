// ==UserScript==
// @name         Gmail Hide External Recipient Warning + Yellow Box
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Hides Gmail's external recipient warning and its yellow container box entirely for a cleaner interface.
// @author       You
// @match        https://mail.google.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function hideExternalWarningBox() {
        // Find all warning blocks
        const warningContainers = document.querySelectorAll('div.ac4');

        warningContainers.forEach(container => {
            // Optional: double-check it's the right warning by checking text
            if (container.innerText.includes("outside your organization") ||
                container.innerText.includes("Be cautious about sharing sensitive information")) {
                container.style.display = 'none';
            }
        });
    }

    // Initial run
    window.addEventListener('load', () => {
        setTimeout(hideExternalWarningBox, 2000); // Let Gmail render the editor UI
    });

    // Keep watching for new ones
    const observer = new MutationObserver(() => {
        hideExternalWarningBox();
    });

    observer.observe(document.body, { childList: true, subtree: true });
})();
