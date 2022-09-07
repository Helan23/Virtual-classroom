var testUsers = [
	{
		"userid" : 1,
		"username" : "abel",
		"typeofuser" : "student",
		"listofcourseid" : "ENG101,ENV890"
	},
	{
		"userid" : 2,
		"username" : "helan",
		"typeofuser" : "teacher",
		"listofcourseid" : "ENG101,PT110"
	}
]

function getCurrUserId() {
	console.log('Hai')
	return new URL(window.location.href).searchParams.get("userId");
}

function refreshCurrentUserDetails() {
	var currUserId = getCurrUserId();
	var currUserDetails = getCurrentDetailsViaApi(currUserId);
	var listOfCourses = currUserDetails.listofcourseid.split(",").filter(courseId => courseId != "null")
	var innerHTMLForCourseSelector = "";
	for(var i = 0; i < listOfCourses.length; i++) {
		var courseDetails = getCourseDetails(listOfCourses[i]);
		if(i == 0) {
			innerHTMLForCourseSelector = innerHTMLForCourseSelector + `<option value="${courseDetails.courseid}" selected>${courseDetails.courseid + " - " + courseDetails.coursename}</option>`
		} else {
			innerHTMLForCourseSelector = innerHTMLForCourseSelector + `<option value="${courseDetails.courseid}">${courseDetails.courseid + " - " + courseDetails.coursename}</option>`
		}
	}
	document.getElementById('usernameField').innerHTML = 'Hi, @' + currUserDetails.username;
	document.getElementById('selectedCourseField').innerHTML = innerHTMLForCourseSelector;

}

function refreshUserPermissions() {
	var currUserId = getCurrUserId();
	var currUserDetails = getCurrentDetailsViaApi(currUserId);
	if(currUserDetails.typeofuser == "student") {
		document.getElementById('createCourseButton').setAttribute("hidden", true);
		document.getElementById('addAttachmentButton').setAttribute("hidden", true);
		for(var i = 0; i < document.getElementsByName('replyButton').length; i++) {
			document.getElementsByName('replyButton')[i].setAttribute("hidden", true);
		}
	} else {
		document.getElementById('registerForCourseButton').setAttribute("hidden", true);
		document.getElementById('addQuestionButton').setAttribute("hidden", true);
	}
}

function registerForNewCourse() {
	var courseSelectElement = document.getElementById('courseDescriptionFieldInRegistrationModal');
	var currSelectedCourseId =  courseSelectElement.options[courseSelectElement.selectedIndex].value;

	registerForNewCourseViaApiCall(getCurrUserId(), currSelectedCourseId);
	refreshCurrentUserDetails();
}


// API calls

function getCurrentDetailsViaApi(userId) {
	// return testUsers.filter(user => user.userid == userId)[0];
	return dohttpRequest("GET", `user/${userId}`, null)
}

function registerForNewCourseViaApiCall(userId, courseId) {
	// var currListOfCourseIds = testUsers.filter(user => user.userid == userId)[0].listofcourseid;
	// testUsers.filter(user => user.userid == userId)[0].listofcourseid = currListOfCourseIds + "," + courseId;
	return dohttpRequest("POST", `user/${userId}/course/${courseId}`, null)
}