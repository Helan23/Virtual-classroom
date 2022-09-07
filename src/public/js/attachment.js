var testCurrentAttachments = [
  {
  	"attatchmentname" : "Tutorial One",
  	"attatchmenttype" : "document",
  	"link" : "https://www.google.com/search?attachment1",
  	"courseid" : "ENG101"
  },
  {
  	"attatchmentname" : "Tutorial Two",
  	"attatchmenttype" : "video",
  	"link" : "https://www.google.com/search?attachment2",
  	"courseid" : "ENG101"
  } 
]

function addAttachment() {
	// In this function we call backend to add the attachment and refresh the current attachment list

    // Get all necessary data
    var attachmentType = document.getElementById("attachmentTypeField").value;
    var attachmentName = document.getElementById("attachmentNameField").value;
    var attachmentLink = document.getElementById("attachmentLinkField").value;

    // Call backend and add it to database
    addAttachmentViaApi(attachmentType, attachmentName, attachmentLink);

    // Refresh the list of current attachments
    refreshCurrentAttachmentList();
}


function refreshCurrentAttachmentList() {
	var htmlToShowInUI = "";
	var currAttachments = getAttachmentsViaApi(getCurrentSelectedCourseId());
	if(currAttachments.length == 0) {
		htmlToShowInUI = `
			<div class="d-flex text-muted pt-3 fw-light">
        		No attachments has been uploaded to this course yet
      		</div>
		`;
	}

	for(var i = 0; i < currAttachments.length; i++) {

		htmlToShowInUI = htmlToShowInUI + `
	<div class="d-flex text-muted pt-3">
        <img src="resources/${currAttachments[i].attatchmenttype}-icon.png" style="max-width:35px; height:32px; margin-right: 10px" >
        <div class="pb-3 mb-0 small lh-sm ${ (i == currAttachments.length - 1) ? '' : 'border-bottom'} w-100">
          <div class="d-flex justify-content-between">
            <p class="mt-2 mb-0 medium lh-sm">${currAttachments[i].attatchmentname}</p>
            <button type="button" class="btn btn-outline-dark" onClick="window.open('${currAttachments[i].link}', '_blank').focus();"><i class="fa fa-cloud-download" aria-hidden="true"></i></button>
          </div>
        </div>
     </div>
     `;
	}
	document.getElementById("attachmentCountBadge").innerHTML = currAttachments.length;
	document.getElementById("currentAttachmentListContainer").innerHTML = htmlToShowInUI;
}

// API Calls

function addAttachmentViaApi(attachmentType, attachmentName, attachmentLink) {
/*
	testCurrentAttachments.push({
		"attatchmenttype" : attachmentType,
		"attatchmentname" : attachmentName,
		"link" : attachmentLink,
		"courseid" : getCurrentSelectedCourseId() 
	});
	*/
	return dohttpRequest("POST", `attatchmentlist/${getCurrentSelectedCourseId()}/attatchment`,{"attatchmentname":attachmentName,"attatchmenttype":attachmentType, "link":attachmentLink})
}

function getAttachmentsViaApi(courseId) {
	//return testCurrentAttachments.filter(attachment => attachment.courseid == courseId);
	return dohttpRequest("GET", `attatchmentlist/course/${courseId}/all`,null)



}
