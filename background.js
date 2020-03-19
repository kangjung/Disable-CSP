var disabledCheck = false;

var onHeadersReceived = function(details) {
	if(!disabledCheck){
		return;
	}
	for (var i = 0; i < details.responseHeaders.length; i++) {
		if(details.responseHeaders[i].name.toUpperCase() === "CONTENT-SECURITY-POLICY") {
			details.responseHeaders[i].value = "";
		}
	}
	return {
		responseHeaders: details.responseHeaders
	};
};

var filter = {urls: ["*://*/*"], types: ["main_frame", "sub_frame"]};


var imageChange = function() {
	var image = disabledCheck ? "image/icon.png" : "image/iconX.png"
	var title = disabledCheck ? "disabled" : "enabled";

	chrome.browserAction.setIcon({ path: image });
	chrome.browserAction.setTitle({ title: 'CSP ' + title });
};


chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, filter, ["blocking", "responseHeaders"]);

chrome.browserAction.onClicked.addListener(function() {
	disabledCheck = !disabledCheck;
	if(disabledCheck){
		chrome.browsingData.remove({}, {"serviceWorkers": true}, function () {});
	}
	imageChange()
});