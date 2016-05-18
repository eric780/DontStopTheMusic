// Copyright (c) 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
var changeinfo = {audible:true}
chrome.tabs.onUpdated.addListener(function(tabId, changeinfo, tab) {
    if (tab.audible) {
        console.log("tab " + tab.title + " is audible");
        sendNotification(tab.id);
    }
    else if (!tab.audible || tab.active) {
        console.log("tab " + tab.title + " no longer audible");
        removeNotification(tab.id);
    }
});
*/


var audibleFalse = {audible:false}
chrome.tabs.onUpdated.addListener(function(tabId, audibleFalse, tab) {
    if (!tab.audible) {
        console.log("removing because no longer audible");
        removeNotification(tabId); 
    }
});


chrome.tabs.onActivated.addListener(function(activeInfo){
    // send notification to all audible tabs
    chrome.tabs.query({title:'*'}, function(tabs) {
        for (let tab of tabs) {
            if (tab.audible) {
                sendNotification(tab.id);
            }
        }
    });

    // remove notification from tab we switch to
    chrome.tabs.get(activeInfo.tabId, function(tab) { removeNotification(tab.id); });
    
});


function sendNotification(tabid) {
    chrome.tabs.sendMessage(tabid, {audible:true}, function(response) {});
}
function removeNotification(tabid) {
    chrome.tabs.sendMessage(tabid, {audible:false}, function(response) {});
}


/*
// DEPRECATED 
var mediaTypes = ['application/octet-stream', 'audio/webm', 'application/x-shockwave-flash', 'audio/mp4', 'audio/mpeg'];

chrome.webRequest.onHeadersReceived.addListener(function(details){
    //alert('webrequest headers received');
    //console.log('http headers: ', details.responseHeaders);

    var headers = [];
    details.responseHeaders.forEach(function(header){
        if(arrayContains(mediaTypes, header.value)){
            // media http header detected
            console.log('media type detected! ' + header.value + ' in tabID:' + details.tabId);

            // send message to tab
            chrome.tabs.sendMessage(details.tabId, "media", function(response){

            });
        }
        else if(header.name == 'Content-Type'){ console.log(header.value); }

    });
}, {urls: ['<all_urls>']}, ['responseHeaders'])



function arrayContains(arr, element)
{
    for(var i=0; i<arr.length; i++)
    {
        if(arr[i] == element)
            return true;
    }
    return false;
}

*/
