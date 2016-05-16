console.log('notification script injected to page'); 
var audible = true;
window.onbeforeunload = function(){ 

    if (audible){
        return "Are you sure you want to close your music?";
    }
    return;
    //return; // return with no alert
}
