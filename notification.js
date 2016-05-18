console.log('notification script injected to page'); 


// insert flag
var flag = document.getElementById("audibleGlobal780123");
if (!flag) {
    var temp = document.createElement('div');
    temp.id = 'audibleGlobal780123';
    document.body.appendChild(temp);
    console.log('appended')
}


var audible = true;
window.onbeforeunload = function(){ 

    var flag = document.getElementById("audibleGlobal780123");
    if (flag) {
        return "Are you sure you want to close your music?"
    }

    return;
    //return; // return with no alert
}
