/*
  =============================================
  FILE: script.js
  =============================================
  This file is ONLY used by contact.html.
  It runs when the user submits the form.

  HOW IT CONNECTS TO HTML:
  → The <form> has:  onsubmit="return validateForm()"
  → When Submit is clicked, the browser calls validateForm()
  → If validateForm() returns FALSE → form does NOT submit (stays on page)
  → If validateForm() returns TRUE  → form submits normally

  WHAT THIS FILE DOES:
  1. Reads the values the user typed in name and email fields
  2. If either is empty → show an error message below that field
  3. If both are filled → hide errors, show success message
*/


function validateForm() {

  /* -------------------------------------------
     STEP 1: GET THE VALUES THE USER TYPED
     -------------------------------------------
     document.getElementById("name") → finds the <input id="name"> element
     .value                          → gets the text inside it
     .trim()                         → removes spaces from start and end
                                       (so "   " counts as empty too)
  */
  let name  = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();


  /* -------------------------------------------
     STEP 2: GET THE ERROR MESSAGE ELEMENTS
     -------------------------------------------
     These are the <span class="error-msg"> tags.
     We'll show or hide them below.
  */
  let nameError  = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");


  /* -------------------------------------------
     STEP 3: RESET — HIDE ALL ERRORS FIRST
     -------------------------------------------
     Before checking, we hide any previously shown errors.
     This handles the case where the user tries again after fixing.
  */
  nameError.style.display  = "none";
  emailError.style.display = "none";


  /* -------------------------------------------
     STEP 4: TRACK IF THERE ARE ANY ERRORS
     -------------------------------------------
     We use a variable to track if everything is OK.
     We start assuming it's valid (true), then set to false if we find an error.
  */
  let isValid = true;


  /* -------------------------------------------
     STEP 5: CHECK IF NAME IS EMPTY
     -------------------------------------------
     name === "" → true if the field is empty (after trim)
     If empty:
       → show the error span by setting display to "block"
       → mark isValid as false
  */
  if (name === "") {
    nameError.style.display = "block"; // shows the error message
    isValid = false;
  }


  /* -------------------------------------------
     STEP 6: CHECK IF EMAIL IS EMPTY
     -------------------------------------------
     Same logic as name check above.
     (The browser also validates email FORMAT because of type="email",
      so we just need to check if it's empty here.)
  */
  if (email === "") {
    emailError.style.display = "block";
    isValid = false;
  }


  /* -------------------------------------------
     STEP 7: IF VALIDATION FAILS — STOP THE FORM
     -------------------------------------------
     return false → tells the browser "don't submit this form"
     The user stays on the page and sees the error messages.
  */
  if (isValid === false) {
    return false;
  }


  /* -------------------------------------------
     STEP 8: IF EVERYTHING IS OK — SHOW SUCCESS
     -------------------------------------------
     We show the green success message.
     We clear the form fields (set value to empty string "").
     Then return false so the page doesn't actually navigate away.
     (In a real project, you'd return true to send data to a server.)
  */
  let successMsg = document.getElementById("successMsg");
  successMsg.style.display = "block";

  // Clear the form fields after successful "submission"
  document.getElementById("name").value    = "";
  document.getElementById("email").value   = "";
  document.getElementById("message").value = "";

  // return false keeps user on the page (we have no server yet)
  return false;

}


/*
  =============================================
  QUICK SUMMARY - What You Learned Here:
  =============================================
  document.getElementById("id")   → finds an HTML element by its id
  element.value                   → reads what's typed in an input
  .trim()                         → removes whitespace
  element.style.display = "block" → makes a hidden element visible
  element.style.display = "none"  → hides an element
  return false                    → stops form from submitting
  return true                     → allows form to submit
*/
