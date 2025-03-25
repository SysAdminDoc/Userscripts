// ==UserScript==
// @name         Google Form Auto-Prompt
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Prompt to fill text inputs in order on Google Forms
// @author       MattParker
// @match        https://docs.google.com/forms/d/e/*
// @grant        none
// ==/UserScript==


(function () {
  'use strict';

  function waitForInputs() {
    const inputs = Array.from(document.querySelectorAll('input[type="text"], textarea'));

    if (inputs.length === 0) {
      setTimeout(waitForInputs, 1000);
      return;
    }

    (async function fillInputsSequentially() {
      for (const input of inputs) {
        let questionText = 'Enter your answer:';

        // Move up to find the list item containing the input and its question
        const container = input.closest('div[role="listitem"]');
        if (container) {
          // Look for a div with role="heading" (Google Forms usually uses this for the question label)
          const questionEl = container.querySelector('div[role="heading"]');

          if (questionEl && questionEl.textContent.trim().length > 0) {
            questionText = questionEl.textContent.trim();
          } else {
            // Fallback: grab the first text block that isn't "Your answer"
            const possibleTexts = Array.from(container.querySelectorAll('div, span'))
              .map(el => el.textContent.trim())
              .filter(text =>
                text.length > 0 &&
                text.toLowerCase() !== 'your answer' &&
                text.toLowerCase() !== 'required'
              );

            if (possibleTexts.length > 0) {
              questionText = possibleTexts[0];
            }
          }
        }

        // Highlight and scroll into view
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
        input.style.outline = '2px solid #00ff00';

        await new Promise(resolve => setTimeout(resolve, 500));

        const userInput = prompt(questionText);
        if (userInput === null) break;

        input.value = userInput;
        input.dispatchEvent(new Event('input', { bubbles: true }));
      }
    })();
  }

  window.addEventListener('load', () => {
    setTimeout(waitForInputs, 2000);
  });
})();
