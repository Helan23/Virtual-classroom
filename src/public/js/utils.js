function getCurrentSelectedCourseId() {
	var courseSelectElement = document.getElementById('selectedCourseField');
	var currSelectedCourseId =  courseSelectElement.options[courseSelectElement.selectedIndex].value;
	return currSelectedCourseId;
}

function dohttpRequest(method, url, body) {
	var baseUrl = "http://localhost:3000/"
	var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( method, baseUrl + url, false ); // false for synchronous request
  try {
	  if(body == null) {
	  	xmlHttp.send();
	  } else {
		xmlHttp.setRequestHeader("Content-Type","application/json");
	  	xmlHttp.send(JSON.stringify(body));
	  }
	} catch(err) {
		alert("Http request cannot be fulfilled. Error Message :" + err.message)
  	throw 'Http request error';
	}

  if(xmlHttp.status != 200) {
  	alert("Http request cannot be fulfilled. Server return http code " + xmlHttp.status)
  	throw 'Http request error';
  }
  console.log(xmlHttp.responseText);
  return JSON.parse(xmlHttp.responseText);

}

document.getElementById('selectedCourseField').addEventListener('change', function() {
  refreshCurrentQuestionsList();
  refreshCurrentAttachmentList();
  refreshUserPermissions();
});

const intervalId = setInterval(() => {
  document.getElementById('refreshQuestionsButton').click();
  document.getElementById('refreshAttachmentButton').click();
}, 5000);
