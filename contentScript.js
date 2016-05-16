console.log("context script running");
var injected = false;


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		console.log(sender);
		console.log(request);
		if(request.audible && !injected){
            attachNotification();
            injected = true;
		}
        else { // tab no longer audible
            removeNotification();
            injected = false;
        }
});



function attachNotification(){
	var script = document.createElement('script');
	script.src = chrome.extension.getURL('notification.js');
	(document.head || document.documentElement).appendChild(script);
	script.onload = function(){
		script.parentNode.removeChild(this);
	}
}

function removeNotification(){
    var script = document.createElement('script');
    script.src = chrome.extension.getURL('removeNotification.js');
    (document.head || document.documentElement).appendChild(script);
    script.onload = function(){
        script.parentNode.removeChild(this);
    }
}
