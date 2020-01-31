// set first text field to focus state

function focusFirst() {
    document.getElementById('name').focus();
}

window.onload = focusFirst();

/************
JOB ROLE SECTION 
******************/
// create text field if "other" selected as job role
// 1. create the Div & hide it
var otherDiv = document.createElement('input');
        otherDiv.setAttribute("type", "text");
        otherDiv.setAttribute("placeholder", "Your Job Role");
        const fieldParent = document.getElementsByTagName('fieldset')[0];
        fieldParent.appendChild(otherDiv);
        otherDiv.style.display = "none";

// when other selected
var formSelect = document.getElementById('title');
formSelect.addEventListener('input', (e) => {
    if (formSelect.value == "other") {
        otherDiv.style.display = "block";
    }
// when it is not
    else {
        otherDiv.style.display = "none";
}
});

/***************
T-SHIRT SECTION
**************/

// have T shirt selection match what options are available
const tShirtDesignSelect = document.getElementById('design');
const tShirtColorSelect = document.getElementById('color');
const designList = tShirtDesignSelect.children; 
const colorList = tShirtColorSelect.children; 


// hide "select theme" from design drop-down
designList[0].style.display = "none";

// create placeholder text when drop down gone
var colorPlaceholder = document.createElement("div");
colorPlaceholder.innerHTML = "Please select a T-shirt theme";
var shirtDiv = document.getElementById('colors-js-puns');
shirtDiv.insertAdjacentElement("afterend", colorPlaceholder);



// add option item "select a T-shirt theme" to the color field
var selectOption = document.createElement("OPTION");
selectOption.innerHTML = "Select color";
selectOption.setAttribute('selected', "selected");
tShirtColorSelect.prepend(selectOption);
// hide new option so can't pick it in drop down
selectOption.style.display = "none";
// hide all colors before theme picked
tShirtColorSelect.style.display = "none";


tShirtDesignSelect.addEventListener('input', (e) => {
    if (tShirtDesignSelect.value == "js puns" || tShirtDesignSelect.value == "heart js" ) {
        // show colors list, hide placeholder div
        tShirtColorSelect.style.display = "block";
        colorPlaceholder.style.display = "none";
    }
    if (tShirtDesignSelect.value == "js puns") {
        colorList[1].style.display = "block";
        colorList[2].style.display = "block";
        colorList[3].style.display = "block";
        colorList[4].style.display = "none";
        colorList[5].style.display = "none";
        colorList[6].style.display = "none";
    }
    else if (tShirtDesignSelect.value == "heart js") {
        colorList[1].style.display = "none";
        colorList[2].style.display = "none";
        colorList[3].style.display = "none";
        colorList[4].style.display = "block";
        colorList[5].style.display = "block";
        colorList[6].style.display = "block";
    }
});

/**********************
ACTIVITY SECTION 
 *********************/
 // total up cost 
 // create new div for total
 // add variables
 var currentCost = 0;
 var totalCost = document.createElement('div');
 totalCost.innerHTML = `Total Cost: ${currentCost}`;
 var activities = document.getElementsByClassName('activities')[0];
 activities.appendChild(totalCost);
 var checkboxes = document.getElementsByTagName("input");

 activities.addEventListener("change", (e) => {
    var selectedTime = event.target.getAttribute("data-day-and-time");
    // if already selected and changes (unchecked), subtract cost
    if (event.target.classList.contains("selected")) {
        event.target.classList.remove('selected');
        let selectedCost = parseInt(event.target.getAttribute("data-cost"));
        currentCost -= selectedCost;    
        totalCost.innerHTML = `Total Cost: ${currentCost}`;

      // remove blocking on time conflicts if unchecked
      for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
            if (checkboxes[i].getAttribute('data-day-and-time') == selectedTime) {
               checkboxes[i].removeAttribute("disabled");
              // event.target.removeAttribute("disabled");
            }
        }
    }

 // if not & changes, add cost       
    } else {
        event.target.classList.add('selected'); 
        let selectedCost = parseInt(event.target.getAttribute("data-cost"))
        currentCost += selectedCost;
        totalCost.innerHTML = `Total Cost: ${currentCost}`;

        // add blocking on time conflicts

        for (var i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == "checkbox") {
                if (checkboxes[i].getAttribute('data-day-and-time') == selectedTime) {
                   checkboxes[i].setAttribute("disabled", true);
                   event.target.removeAttribute("disabled");
                }
            }
        }
    }
});
 

/***************** 
CREDIT CARD SECTION
*****************/

var paymentSelect = document.getElementById('payment');
var paypal = document.getElementById('paypal');
var bitcoin = document.getElementById('bitcoin');
var credit = document.getElementById("credit-card");

// default to credit card, hide other divs
paymentSelect.children[1].setAttribute("selected", true);
paymentSelect.children[0].style.display = "none";
paypal.style.display = "none";
bitcoin.style.display = "none";

// fix html- no "if you selected"
paypal.innerHTML = "<p>We'll take you to Paypal's site to set up your billing information, when you click “Register” below.</p>";
bitcoin.innerHTML = "<p>We'll take you to the Coinbase site to set up your billing information. Due to the nature of exchanging Bitcoin, all Bitcoin transactions will be final.</p>";

// show paypal detail if selected
paymentSelect.addEventListener("input", (e) => {
    if (paymentSelect.value == "paypal") {
        paypal.style.display = "block";
        credit.style.display = "none";
        bitcoin.style.display = "none";
// show bitcoin
    } else if (paymentSelect.value == "bitcoin") {
        bitcoin.style.display = "block";
        credit.style.display = "none";
        paypal.style.display = "none";
// show credit
    } else {
        credit.style.display = "block";
        bitcoin.style.display = "none";
        paypal.style.display = "none";
    }
})

/*********************
 FORM VALIDATION
 *********************/
var nameInput = document.getElementById('name');
var emailInput = document.getElementById('mail');
var submit = document.getElementsByTagName('button')[0];
var emailTest = false;
var nameTest = false;
var activity = false;


// create error structures
var submitError = document.createElement('div');
submitError.style.color = "purple";
submit.insertAdjacentElement("beforebegin", submitError);

var nameError = document.createElement('div');
nameError.style.color = "purple";
nameInput.insertAdjacentElement("beforebegin", nameError);

var emailError = document.createElement('div');
emailError.style.color = "purple";
emailInput.insertAdjacentElement("beforebegin", emailError);

var checkboxError = document.createElement('div');
checkboxError.style.color = "purple";
activities.insertAdjacentElement("afterbegin", checkboxError);


 // validate name
 function checkName() {
    const nameRegex = /^[a-z]+$/i;
    name = nameInput.value;
    nameTest = nameRegex.test(name); 
    console.log(nameTest);
    // error response & undo
    if (nameTest == false) {
        nameInput.style.border = "2px solid red";
        nameError.innerHTML = "You gotta name or what?";
    }
    if (nameTest == true) {
        nameInput.style.border = "2px solid rgb(111, 157, 220)";
        nameError.innerHTML = "";
    }
}
 


// validate email
function checkEmail() {
    const emailRegex = /^[a-z0-9]+@[a-z0-9]+\.[a-z]+$/i;
    email = emailInput.value;
    emailTest = emailRegex.test(email); 
    if (emailTest == false) {
        emailInput.style.border = "2px solid red";
        emailError.innerHTML = "You thought I'd believe that's a real email?";
    }
    if (emailTest == true) {
        emailInput.style.border = "2px solid rgb(111, 157, 220)";
        emailError.innerHTML = "";
    }
}

// validate if 1+ activity selected
function checkActivity() {
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].type == "checkbox") {
            if (checkboxes[i].checked) {
                activity = true;
                checkboxError.innerHTML = "";
                activities.style.border = "none";
            }
            else {
                checkboxError.innerHTML = "Planning to do anything here?";
                activities.style.borderBottom = "2px solid red";
            }
}
    }
}

 //check functions line by line as form completed or when edited
// nameInput.addEventListener("focusout", (e) => {
   // checkName();
// });

nameInput.addEventListener("oninput", (e) => {
    checkName();
});

// emailInput.addEventListener("focusout", (e) => {
   // checkEmail();
// });

emailInput.addEventListener("oninput", (e) => {
    checkEmail();
    alert('hey');
});

 // validation function overall - to be added on submit button (event listener)
submit.addEventListener("click", (e) => {
    checkName();
    checkEmail();
    checkActivity();
    if (nameTest && activity && emailTest) {
       submit.disabled = false;
       submitError.innerHTML = "";
    } else {
        submit.disabled = true;
        submitError.innerHTML = "Not even close.  See the errors in your ways above. ";
    }
} 
);


 /* to do

 add checkbox event listener

Can't submit if - If "Credit Card" is the selected payment option, the three fields 
accept only numbers: a 13 to 16-digit credit card number, a 5-digit zip code, and 
3-number CVV value.

Error for field- Credit Card number, Zip code, and CVV, only if the credit card 
payment method is selected.

Make error disappear right away when fixed

Form provides at least one error message that changes depending on the error. 
For example, the email field displays a different error message when the email
 field is empty than it does when the email address is formatted incorrectly. 
 *This is accomplished without the use of HTML5's built-in field validation.

 When JavaScript is disabled, all form fields and payment information is 
 displayed, including the "Other" field under the "Job Role" section. */
 