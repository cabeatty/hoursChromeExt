// Inform the background page that 
// this tab should have a page-action
chrome.runtime.sendMessage({
  from:    'content',
  subject: 'showPageAction'
});


// Listen for messages from popup
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if( request.from === 'popup' && request.subject === 'DOMInfo' ) {
			// window.alert("here");
			
			// Grab page elements
			// var tbody = document.getElementById("divActivities").children[0].children[0];
			// var trow1 = tbody.children[0].innerHTML;
			// var trow2 = tbody.children[1].innerHTML;
			// var trow3 = tbody.children[2].innerHTML;
			
			// Extract times
			// var startTime = trow1.substring(trow1.indexOf(':')-2, trow1.indexOf(':')+3);
			// var lunchStart = trow2.substring(trow2.indexOf(':')-2, trow2.indexOf(':')+3);
			// var lunchEnd = trow3.substring(trow3.indexOf(':')-2, trow3.indexOf(':')+3);
			
			// Convert times to minutes
			// startTime = convertToMins(startTime);
			// lunchStart = convertToMins(lunchStart);
			// lunchEnd = convertToMins(lunchEnd);
			
			// Calculate end time for 8 hour day
			// var endTime = startTime + (8 * 60) + (lunchEnd - lunchStart);

			// Convert back to hours
			// endTime = convertToHours(endTime);
			
			// Convert result to JSON
			var val = document.getElementsByTagName("title")[0].innerHTML;
			var bool = false;
			var results = {
				// endTime: endTime
				endTime: val,
				luncher: bool
			};
			
			// Return results to extension	
			sendResponse(results);
		    // chrome.runtime.sendMessage({"endTime": endTime});
			// window.alert("To achieve an 8 hour work day, you need to clock-out at " + endTime);

		}
});


// Input: "hh:mm", string
// Output: minutes, int
function convertToMins(time) {
	var hours = parseInt(time.slice(0, time.indexOf(":")));
	var minutes = parseInt(time.slice(time.indexOf(":") + 1));
	return (60 * hours + minutes);
}

// Input: minutes, int
// Output: "hh:mm", string
function convertToHours(time) {
	var hour = (Math.floor(time / 60)).toString();
	var min = (time % 60).toString();
	min = ("0" + min).slice(-2);
	return (hour + ":" + min.toString());
}