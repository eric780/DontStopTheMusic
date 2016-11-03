/*
 * We only do anything if browser extension clicked.
 */
chrome.browserAction.onClicked.addListener(function(tab) {
  // add if tab is currently audible
  if (tab.audible) {
    sendNotification(tab.id);
  }

  // listen for tab becoming audible, then add
  chrome.tabs.onUpdated.addListener(function(tabid, changeInfo) {
    if (tabid == tab.id && changeInfo.audible) {
      sendNotification(tabid);
    }
  });

  // remove if tab becomes inaudible
  chrome.tabs.onUpdated.addListener(function(tabid, changeInfo, tab) {
      if (tabid == tab.id && !changeInfo.audible) {
        removeNotification(tabid);
      }
  });
});


function sendNotification(tabid) {
  chrome.tabs.executeScript(tabid, {"file" : "notification.js"});
}

function removeNotification(tabid) {
  chrome.tabs.executeScript(tabid, {"file" : "removeNotification.js"});
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
