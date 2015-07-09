console.log('notification script injected to page'); 
window.onbeforeunload = function(){ 
	return 'Are you sure you want to close your music?';
}