var testCourses = [
	{
		"courseid" : "ENG101",
		"coursename" : "Intro to English"
	},
	{

		"courseid" : "ENV890",
		"coursename" : "Environmental studies"
	},
	{

		"courseid" : "PT110",
		"coursename" : "Intro to physical training"
	}
]

function getAllCourses() {
	return getAllCoursesViaApi();
}

function getCourseDetails(courseId) {
	return getCourseDetailsViaApi(courseId);
}

function createNewCourse() {
	var newCourseId = document.getElementById("newCourseIdField").value;
	var newCourseName = document.getElementById("newCourseNameField").value;
	createCourseViaApi(newCourseId, newCourseName)
	registerForNewCourseViaApiCall(getCurrUserId(), newCourseId);
}

function populateExistingCoursesInRegistrationModal() {
	var courses = getAllCoursesViaApi();
	var innerHTMLForCourseSelector = "";
	for(var i = 0 ; i < courses.length; i++) {
		if(i == 0) {
			innerHTMLForCourseSelector = innerHTMLForCourseSelector + `<option value="${courses[i].courseid}" selected>${courses[i].courseid} - ${courses[i].coursename}</option>`
		} else {
			innerHTMLForCourseSelector = innerHTMLForCourseSelector + `<option value="${courses[i].courseid}">${courses[i].courseid} -  ${courses[i].coursename}</option>`
		}
	}
	document.getElementById("courseDescriptionFieldInRegistrationModal").innerHTML = innerHTMLForCourseSelector;
}


// API call

function getAllCoursesViaApi() {
	// return testCourses;
	return dohttpRequest("GET", "user/all", null);
}

function getCourseDetailsViaApi(courseId) {
	// return testCourses.filter(course => course.courseid == courseId)[0];
	return dohttpRequest("GET", `course/${courseId}`, null)
}

function createCourseViaApi(courseId, courseName) {
	// testCourses.push({
	// 	"courseid" : courseId,
	// 	"coursename" : courseName
	// })
	return dohttpRequest("POST", `course/`, {"courseid" : courseId, "coursename" : courseName})
}
