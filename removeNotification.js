console.log("no longer audible");
audible = false;

var flag = document.getElementById("audibleGlobal780123");
if (flag) {
    flag.parentNode.removeChild(flag);
}
console.log('removed')
