document.addEventListener('DOMContentLoaded', function() {
    var checkPageButton = document.getElementById('Send');
    checkPageButton.addEventListener('click', function() {
        var popups = chrome.extension.getViews({type: "popup"});
        var field1 = popups[0].document.getElementById('messageNumber');
        var field2 = popups[0].document.getElementById('actualMessage');
        chrome.tabs.executeScript(null, {file: "content_script.js"});

        chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
            if (message === 'message') sendResponse(field1.value);
            if (message === 'bob') sendResponse(field2.value);
        });


    }, false);
}, false);



