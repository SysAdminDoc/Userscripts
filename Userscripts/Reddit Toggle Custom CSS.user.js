// inspired by: http://userscripts-mirror.org/scripts/show/109818
// ==UserScript==
// @name         Reddit - Always Disable Subreddit CSS
// @namespace    https://github.com/SysAdminDoc
// @version      1.0
// @description  Automatically disables subreddit custom CSS themes on old.reddit.com without toggling or user input.
// @author       SysAdminDoc
// @match        https://old.reddit.com/r/*
// @match        http://old.reddit.com/r/*
// @grant        none
// @run-at       document-start
// ==/UserScript==

(function () {
  'use strict';

  const observer = new MutationObserver(() => {
    document.querySelectorAll('link[title^="applied_subreddit_"]').forEach(link => {
      link.remove();
    });
  });

  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
