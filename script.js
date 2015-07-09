console.log("context script running");
var injected = false;

chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse){
		console.log(sender);
		console.log(request);
		if(request == 'media' && !injected){
			attachNotification();
			injected = true;
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
