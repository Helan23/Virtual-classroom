var testCurrQuestions = [
	{
		"questionid" : 1,
		"questiontext" : "What is the past participle of a go?",
		"courseid" : "ENG101",
		"is_answered" : false,
		"answer" : null
	},
	{
		"questionid" : 2,
		"questiontext" : "What is the past tense of run?",
		"courseid" : "ENG101",
		"is_answered" : false,
		"answer" : null
	},
	{
		"questionid" : 3,
		"questiontext" : "What is the plural of cat?",
		"courseid" : "ENG101",
		"is_answered" : true,
		"answer" : "Cats"
	},
	{
		"questionid" : 4,
		"questiontext" : "What is the plural of car?",
		"courseid" : "ENG101",
		"is_answered" : true,
		"answer" : "Cars"
	},
	{
		"questionid" : 5,
		"questiontext" : "What is 1+1",
		"courseid" : "MA101",
		"is_answered" : true,
		"answer" : "2"
	},
]
var globalQnCounter = 5;



function refreshCurrentQuestionsList() {
	var currSelectedCourseId =  getCurrentSelectedCourseId();
	var questionsOfCourse = getQuestionOfCourseViaApi(currSelectedCourseId);
	var answeredQuestions = questionsOfCourse.filter(question => question.is_answered)
	var unansweredQuestions = questionsOfCourse.filter(question => !question.is_answered)
	var innerHTMLForUnansweredQuestionContainer = "";
	if(unansweredQuestions.length == 0) {
		innerHTMLForUnansweredQuestionContainer = `
			<div class="d-flex text-muted pt-3 fw-light">
        		No unanswered questions exists for this course
      		</div>
		`;
	}
	for (var i = 0; i < unansweredQuestions.length; i++) {
		innerHTMLForUnansweredQuestionContainer = innerHTMLForUnansweredQuestionContainer  + `
			<div class="d-flex text-muted pt-3">
		        <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#007bff"/><text x="50%" y="50%" fill="#007bff" dy=".3em">32x32</text></svg>

		        <div class="pb-3 mb-0 small lh-sm w-100">
		          <div class="d-flex justify-content-between">
		            <p class="pb-3 mt-2 mb-0 medium lh-sm">
		              ${unansweredQuestions[i].questiontext}
		            </p>
		            <button name="replyButton" type="button" class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#answerQuestion" onClick="populateAnswerQuestionModal(${unansweredQuestions[i].questionid});"><i class="fa fa-reply" aria-hidden="true"></i></button>
		          </div>
		        </div>
		      </div>
		`
	}
	document.getElementById("unansweredQuestionsCountBadge").innerHTML = unansweredQuestions.length;
	document.getElementById("unansweredQuestionsContainer").innerHTML = innerHTMLForUnansweredQuestionContainer;
   
    var innerHTMLForAnsweredQuestionContainer = ""
	if(answeredQuestions.length == 0) {
		innerHTMLForAnsweredQuestionContainer = `
			<div class="d-flex text-muted pt-3 fw-light">
        		No answered questions exists for this course
      		</div>
		`;
	}
	for (var i = 0; i < answeredQuestions.length; i++) {
		innerHTMLForAnsweredQuestionContainer = innerHTMLForAnsweredQuestionContainer  + `
			<div class="d-flex text-muted pt-3">
		        <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: 32x32" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#e83e8c"/><text x="50%" y="50%" fill="#e83e8c" dy=".3em">32x32</text></svg>

		        <div class="pb-3 mb-0 small lh-sm w-100">
		          <div class="d-flex justify-content-between">
		            <p class="pb-3 mb-0 medium lh-sm">
		              <strong class="d-block text-gray-dark">${answeredQuestions[i].questiontext}</strong>
		              ${answeredQuestions[i].answer}
		            </p>
		          </div>
		        </div>
	       </div>
		`
	}
	document.getElementById("answeredQuestionsCountBadge").innerHTML = answeredQuestions.length;
	document.getElementById("answeredQuestionsContainer").innerHTML = innerHTMLForAnsweredQuestionContainer;
	refreshUserPermissions();
}

function addQuestion() {
	var newQuestion = document.getElementById("newQuestionText").value;
	addQuestionViaApi(getCurrentSelectedCourseId(), newQuestion)
	refreshCurrentQuestionsList();
	document.getElementById("newQuestionText").value = "";
}

function populateAnswerQuestionModal(questionId) {
	var currSelectedCourseId =  getCurrentSelectedCourseId();
	var questionsOfCourse = getQuestionOfCourseViaApi(currSelectedCourseId);
	var question = questionsOfCourse.filter(question => question.questionid == questionId)[0];
	document.getElementById("answerQuestionModalQuestionId").innerHTML = question.questionid;
	document.getElementById("answerQuestionModalQuestionText").innerHTML = question.questiontext;
}

function submitAnswer() {
	var currSelectedCourseId =  getCurrentSelectedCourseId();
	var questionId = document.getElementById("answerQuestionModalQuestionId").innerHTML;
	var answer = document.getElementById("answerQuestionModalAnswer").value;
	submitAnswerViaApi(questionId, answer);
	document.getElementById("answerQuestionModalAnswer").value = "";
	refreshCurrentQuestionsList();
}

// API calls

function getQuestionOfCourseViaApi(courseId) {
	// return testCurrQuestions.filter(question => question.courseid == courseId);
	return dohttpRequest("GET", `course/${courseId}/question`, null)
}

function addQuestionViaApi(courseId, newQuestion) {
	// testCurrQuestions.push({
	// 	"questionid" : globalQnCounter,
	// 	"questiontext" : newQuestion,
	// 	"courseid" : courseId,
	// 	"is_answered" : false,
	// 	"answer" : null
	// });
	// globalQnCounter++;
	console.log(courseId,newQuestion)
	return dohttpRequest("POST", `question`, {"courseid" : courseId, "questiontext" : newQuestion})
}

function submitAnswerViaApi(questionId, answer) {
	// testCurrQuestions.filter(question => question.questionid == questionId)[0].is_answered = true;
	// testCurrQuestions.filter(question => question.questionid == questionId)[0].answer = answer;
	return dohttpRequest("POST", `question/${questionId}/answer`, {"answer" : answer})
}
