const nameInput = document.querySelector('input[type="text"]')
nameInput.focus();
const emailInput = document.getElementById('email');
const jobRoleSelect = document.getElementById('title'); 
const otherJobRole = document.getElementById('other-job-role' );
const shirtThemeSelection = document.getElementById('design');
const shirtColorSelection = document.getElementById('color');
const activities = document.querySelector('.activities');
const totalCostLabel = document.getElementById('activities-cost');
var totalCost = 0;
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
const checkboxList = document.querySelector('#activities');
const payment = document.querySelector('#payment');
const creditCard = document.querySelector('#credit-card');
const cardNumber = document.getElementById('cc-num');
const zipCode = document.getElementById('zip');
const cvvNumber= document.getElementById('cvv');
const paypal = document.querySelector('#paypal');
const bitcoin = document.querySelector('#bitcoin');
const form = document.querySelector("form");



/*
            --JOB ROLE SECTION--
  Hide the "Other Job Role" text field unless "Other"
  is selected from the "Job Role" drop down menu.
*/

otherJobRole.style.display = 'none'; 

jobRoleSelect.addEventListener('change', (e) => {
    if (e.target.value === 'other') {
        otherJobRole.style.display = 'initial';
    } else {
        otherJobRole.style.display = 'none';
    }
});
/*
                 --T-SHIRT INFO SECTION--
    Hide the "Color" drop down menu until a T-Shirt design is selected.
    Only dispay the shirt color options that match the selected design.
*/
shirtColorSelection.disabled = true; 

shirtThemeSelection.addEventListener('change', (e) => {
    var options = document.querySelectorAll('#color option')
    var first = true;

    //If the user selects "Theme - JS Puns" then the "Color" menu will only display "Cornflower Blue," "Dark Slate Grey," and "Gold."
    if (e.target.value === 'js puns') {
        for (var i = 0; i < options.length; i++) {
            if (options[i].innerHTML.includes('Puns shirt')) {
                options[i].style.display = 'initial';
                shirtColorSelection.disabled = false;
    /* Update both the "Color" field and drop down menu when the user selects a new theme. 
       Neither should be empty or display unavailable colors.
    */
            if (first) {
                options[i].selected = true;
                first = false; 
            }
        } else {
              options[i].style.display = 'none';

            }
        }
    // show the drop down menu
    shirtColorSelection.style.display = 'initial';
    //If the user selects "Theme - JS Puns" then the "Color" menu will only display "Tomato," "Steel Blue," and "Dim Grey."
    } else if (e.target.value === 'heart js') {
         for (var j = 0; j < options.length; j++) {
            if (options[j].innerHTML.includes('JS shirt')) {
                options[j].style.display = 'initial';
                shirtColorSelection.disabled = false;
     /* Update both the "Color" field and drop down menu when the user selects a new theme. 
       Neither should be empty or display unavailable colors.
    */
           if (first) {
               options[j].selected = true;
               first = false;
           }
        } else {
               options[j].style.display = 'none';
           }
            
        }
     // show the drop down menu.
    shirtColorSelection.style.display = 'initial';
     /*if the user doesn't select either t-shirt design
     hide the color choices.
    */
    } else {
        shirtColorSelection.style.display = 'none';
    }

});


/**
    --REGISTER FOR ACTIVITIES SECTION--
**/
//The Event listens for the checkbox selection and adds/subtracts the price to the total as they're selected/deselcted.
activities.addEventListener('change', (e) => {
    const cost = parseInt(e.target.getAttribute('data-cost'));
    const activityTime = e.target.getAttribute('data-day-and-time');

    if (e.target.checked === true) {
        totalCost += cost; 
        totalCostLabel.innerHTML = `Total Cost: $${totalCost}`;
    } else {
        totalCost -= cost;
        totalCostLabel.innerHTML = `Total Cost: $${totalCost}`;
    }
// Prevents the user from selecting two activities that are on the same day and time.
    for (let i = 0; i < checkboxes.length; i++) {
        const dateAndTime = checkboxes[i].getAttribute("data-day-and-time");
        if (dateAndTime === activityTime && e.target !== checkboxes[i]) {
          e.target.checked
            ? (checkboxes[i].disabled = true)
            : (checkboxes[i].disabled = false);
        }
      }
    });
    [...checkboxes].forEach((cb) => {
      cb.addEventListener("focus", (e) => cb.parentElement.classList.add("focus"));
      cb.addEventListener("blur", (e) => {
        const active = document.querySelector(".focus");
        if (active) active.classList.remove("focus");
      });
    });

/**
    --PAYMENT INFO SECTION--
      Show and hide the payment options depending on the users selection. 
      Display Credit Card as the default option.

**/

function SetDefaultValue() {
    var populateField = document.getElementById("payment").value="credit-card";
}

window.onload = function(){
    SetDefaultValue();
};

paypal.style.display = 'none'; 
bitcoin.style.display = 'none'; 

payment.addEventListener('change', (e) => {
    if (e.target.value === 'credit-card') {
        creditCard.style.display = 'block';
        paypal.style.display = 'none';
        bitcoin.style.display = 'none';
    } 
     if (e.target.value === 'paypal') {
        paypal.style.display = 'block';
        creditCard.style.display = 'none';
        bitcoin.style.display = 'none';
    }
    if (e.target.value === 'bitcoin') {
        bitcoin.style.display = 'block';
        creditCard.style.display = 'none';
        paypal.style.display = 'none';
    }
});

/**
    --FORM VALIDATION SECTION--
 
**/

/*
   VALIDATION FUNCTIONS
*/

function nameValidator() {
    const nameField = nameInput.value;
    const nameValidate = /^[A-Za-z]+ ?[A-Za-z]+ ?[A-Za-z]+$/i.test(nameField);

    return nameValidate;
}

function emailValidator() {
    const emailField = emailInput.value;
    const emailValidate = /^[^@]+@[^@.]+\.[A-Z]+$/i.test(emailField);

    return emailValidate;
}

function creditCardNumberValidator() {
    const ccNumber = cardNumber.value;
    const creditCardValidate = /^[\d]{13,16}$/.test(ccNumber);
  
    return creditCardValidate;
}

function creditCardZipCodeValidator() {
    const zipNumber = zipCode.value;
    const zipCodeValidate = /^[\d]{5}$/.test(zipNumber);
  
    return zipCodeValidate;
}

function cvvCodeValidator() {
    const cvv = cvvNumber.value;
    const cvvValidate = /^[\d]{3}$/.test(cvv);

    return cvvValidate;
}

function failedValidationUpdate (childElement) {
    const parent = childElement.parentElement;
        parent.classList.add('not-valid');
        parent.classList.remove('valid');
        parent.lastElementChild.hidden = false;
}

function passedValidationUpdate (childElement) {
    const parent = childElement.parentElement;
        parent.classList.add('valid');
        parent.classList.remove('not-valid');
        parent.lastElementChild.hidden = true;
}

/*
   VALIDATION EVENT LISTENER
*/


form.addEventListener('submit', (e) => {
    const nameField = nameInput.value;
    const nameValidate = /^[A-Za-z]+ ?[A-Za-z]+ ?[A-Za-z]+$/i.test(nameField);

    if(!nameValidate) {
        failedValidationUpdate(nameInput);
        
    } else {
        passedValidationUpdate(nameInput);
    }

    const emailField = emailInput.value;
    const emailValidate = /^[^@]+@[^@.]+\.[A-Z]+$/i.test(emailField);

    if(!emailValidate) {
        failedValidationUpdate(emailInput);
        e.preventDefault();
    }   else {
        passedValidationUpdate(emailInput);
    }
    
    if(payment.value === 'credit-card') {
        const creditCardNumberCheck = creditCardNumberValidator();
        const cvvCheck = cvvCodeValidator();
        const zipCodeCheck = creditCardZipCodeValidator()

        if(!creditCardNumberCheck) {
            failedValidationUpdate(cardNumber);
            e.preventDefault();
        }   else {
            passedValidationUpdate(cardNumber);
        }

        if(!zipCodeCheck) {
            failedValidationUpdate(zipCode);
            e.preventDefault();
        }   else {
            passedValidationUpdate(zipCode);
        }

        if(!cvvCheck) {
            failedValidationUpdate(cvvNumber);
            e.preventDefault();
        }   else {
            passedValidationUpdate(cvvNumber);
        }
    }

    if(totalCost < 100) {
        e.preventDefault();
        checkboxList.classList.remove('valid')
        checkboxList.classList.add('not-valid');
        checkboxList.lastElementChild = 'block'; 
    } else {
        checkboxList.classList.add('valid');
        checkboxList.classList.remove('not-valid');
        checkboxList.lastElementChild = 'none';
    }
});