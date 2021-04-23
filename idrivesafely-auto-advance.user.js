// ==UserScript==
// @name         IDriveSafelyScript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://app.idrivesafely.com/*
// @icon         https://www.google.com/s2/favicons?domain=idrivesafely.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const kDefaultWaitTime = 2000;
    const kDoneWaitTime = 0;

    function getTemplate() {
        const aceContent = document.getElementsByClassName("ace-content")[0];
        if (aceContent) {
            const dataTemplateType = aceContent.getAttribute('data-template-type');
            if (dataTemplateType) { return dataTemplateType; };
        }

        const aceModal = document.getElementsByClassName("ace-modal")[0];
        if (aceModal) { return "ace-modal"; }

        const dash = document.getElementsByClassName("dash")[0];
        if (dash) { return "dash"; }

        return null;
    }

    function clickNextButton() {
        console.log("advancing...");
        document.getElementById("icon-arrow-next").click();
    }

    function checkTime() {
        return document.getElementsByClassName('progress-bar__this')[0].offsetWidth;
    }

    function checkEducationalTime() {
        if (angular) {
            const educationalSeconds = angular.element(document.body).injector().get('CourseFlowService').getActiveNode().data.screenSeconds;
            if (Number(educationalSeconds) && educationalSeconds > 10) {
                return educationalSeconds * 1000;
            }
        }
    }

    function handleTextTemplate() {
        const time = checkTime();
        window.scrollTo(0,document.body.scrollHeight);
        console.log(time);
        if (time === 0) {
            clickNextButton();
            return kDoneWaitTime;
        }
        return kDefaultWaitTime;
    }

    function handleVideoTemplate() {
         // vjs-big-play-button
        const playControl = document.getElementsByClassName('vjs-big-play-button')[0];
        if (playControl) {
            console.log('play');
            playControl.click()
        };

        const muteControl = document.getElementsByClassName("vjs-mute-control")[0];
        if (muteControl.getAttribute('title') === 'Mute') {
            setTimeout(() => {
                console.log('mute');
                muteControl.click();
            }, 1000);
        }

        const timeString = document.getElementsByClassName('vjs-remaining-time-display')[0].textContent;
        const arr = timeString.split(":");
        const minutes = parseInt(arr[0]);
        const seconds = parseInt(arr[1]);

        const timeSeconds = minutes * 60 + seconds;
        console.log("time remain: " + timeSeconds);

        setTimeout(() => {
            console.log('speed videeo');
            document.getElementsByTagName("video")[0].playbackRate = 17;
        });

        if (timeSeconds === 0) {
            clickNextButton();
        }
    }

    function handleDashboard() {
        // gritLevelCard__resumeCourseButton
        console.log('resuming course...');
        document.getElementsByClassName('gritLevelCard__resumeCourseButton')[0].click();
        return kDefaultWaitTime;
    }

    function main() {
        var handler = () => {return kDefaultWaitTime;};

        const template = getTemplate();
        console.log(`got template ${template}`);
        if (template === "SCREEN_TEMPLATE_4") {
            handler = handleTextTemplate;
        } else if (template === "SCREEN_TEMPLATE_5") {
            handler = handleVideoTemplate;
        } else if (template === "ace-modal") {
            document.getElementById('go-to-dash').click();
        } else if (template === "dash") {
            handler = handleDashboard;
        }

        handler();

        setTimeout(main, kDefaultWaitTime);
    }

    console.log("starting main...");
    setTimeout(main, kDefaultWaitTime);
})();