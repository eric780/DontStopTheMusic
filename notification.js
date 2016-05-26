console.log('notification script injected to page'); 




sessionStorage.setItem('audible', true);
window.onbeforeunload = function(){ 
    if (sessionStorage.getItem('audible')) {
        return "Are you sure you want to close your music?"
    }

    return;
    //return; // return with no alert
}
