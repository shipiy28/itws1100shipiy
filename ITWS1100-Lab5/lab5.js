/* Lab 5 JavaScript File 
   Place variables and functions in this file */



function validate(formObj) {
   // put your validation code here
   // it will be a series of if statements

   if (formObj.firstName.value == "") {
      alert("You must enter a first name");
      formObj.firstName.focus();
      return false;
   }
      if (formObj.lastName.value == "") {
      alert("You must enter a last name");
      formObj.lastName.focus();
      return false;
   }
      if (formObj.title.value == "") {
      alert("You must enter a title");
      formObj.title.focus();
      return false;
   }
      if (formObj.org.value == "") {
      alert("You must enter an organization");
      formObj.org.focus();
      return false;
   }
      if (formObj.pseudonym.value == "") {
      alert("You must enter a nickname");
      formObj.pseudonym.focus();
      return false;
   }
      if (formObj.comments.value == "") {
      alert("You must enter comments");
      formObj.comments.focus();
      return false;
   }
   alert("Submitted successfully")
   return true;
}


function clearValue() {
   let activeElement = document.activeElement;
   activeElement.innerText= activeElement.innerText.replace("Please enter your comments", "");
   return 1;
}

function defaultText() {
   if (document.activeElement.id != "comments" && document.addForm.comments.innerText == "") {
      document.addForm.comments.innerText = "Please enter your comments";
   }
   return 1;
}

function nickTest(formObj) {
   alert(formObj.firstName.value + " " + formObj.lastName.value + " is " + formObj.pseudonym.value);
}