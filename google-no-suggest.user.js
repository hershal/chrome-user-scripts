// ==UserScript==
// @name         Google No Suggest
// @namespace    http://tampermonkey.net/
// @version      0.0.2
// @description  Don't allow Google to suggest alternate pages while navigating back to the search results page from visiting a link
// @author       You
// @match        https://www.google.com/search*
// @icon         https://www.google.com/s2/favicons?domain=google.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("HB: Setting up mutation observer...");
    const mutationObserver = new MutationObserver(removeSuggestions);
    mutationObserver.observe(document.body, {childList: true, subtree: true});
    console.log("HB: Setting up mutation observer... done.");
})();

function removeSuggestions() {
    const nodes = Array.from(document.getElementsByClassName("AUiS2"));
    if (nodes.length > 0) {
        console.log("HB: Removing suggestions...");
        nodes.forEach((node) => node.remove());
        console.log("HB: Removing suggestions... done.");
        console.log(`HB: Removed ${nodes.length} suggestions.`);
    }
}
