// ==UserScript==
// @name         FoxNews Anti-Adblock Bypass
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Remove the banner that detects adblock
// @author       You
// @match        https://www.foxnews.com/*
// @icon         https://www.foxnews.com/favicon.ico
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    console.log("HB: Setting up mutation observer...");
    const mutationObserver = new MutationObserver(bypassAntiAdblock);
    mutationObserver.observe(document.body, {childList: true});
    console.log("HB: Setting up mutation observer... done.");
})();

function bypassAntiAdblock() {
    const aabNodes = Array.from(document.getElementsByClassName("fc-ab-root"));

    aabNodes.forEach((node) => {
        console.log("HB: Removing Anti-Adblock...");
        node.remove();
        document.body.style.overflow = "scroll";
        console.log("HB: Removing Anti-Adblock... done.");
    });
}