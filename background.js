var disabledCheck = false;

function imageChange() {
    var image = disabledCheck ? "image/icon.png" : "image/iconX.png";
    var title = disabledCheck ? "disabled" : "enabled";

    chrome.browserAction.setIcon({ path: image });
    chrome.browserAction.setTitle({ title: 'CSP ' + title });
}


var opt_extraInfoSpec = ["blocking", "responseHeaders"];
var filter = {urls: ["*://*/*"], types: ["main_frame", "sub_frame"]};
var callback = function(details) {
    if(!disabledCheck){
        return;
    }
    for (var i = 0; i < details.responseHeaders.length; i++) {
        if(details.responseHeaders[i].name.toUpperCase() === "CONTENT-SECURITY-POLICY") {
            details.responseHeaders[i].value = "";
        }
    }

    imageChange();
    return {
        responseHeaders: details.responseHeaders
    };
};


chrome.webRequest.onHeadersReceived.addListener(callback, filter, opt_extraInfoSpec);

chrome.browserAction.onClicked.addListener(function() {
	disabledCheck = !disabledCheck;
	if(disabledCheck){
		chrome.browsingData.remove({}, {"serviceWorkers": true}, function () {});
	}
	imageChange();
});