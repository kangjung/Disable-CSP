var disabledCheck = false;

var onHeadersReceived = function(headers) {
	if(!disabledCheck){
		return;
	}
	for (var i = 0; i < headers.responseHeaders.length; i++) {
		if(details.responseHeaders[i].name.toUpperCase() === "CONTENT-SECURITY-POLICY") {
			headers.responseHeaders[i].value = "";
		}
	}
	return {
		responseHeaders: headers.responseHeaders
	};
});

var filter = {urls: ["*://*/*"], types: ["main_frame", "sub_frame"]};

chrome.webRequest.onHeadersReceived.addListener(onHeadersReceived, filter, ["blocking", "responseHeaders"]);
  
chrome.browserAction.onClicked.addListener(
	disabledCheck = !disabledCheck;
	if(disabledCheck){
	
	}
});