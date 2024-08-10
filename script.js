const form = document.getElementById('form');
const yourname = document.getElementById('yourname');
const email = document.getElementById('email');
const email_confirm = document.getElementById('email_confirm');
const colorInput = document.getElementById('colorInput');

// const colorPreview = document.getElementById('colorPreview');

//     colorInput.addEventListener('input',  
//  () => {
//       colorPreview.style.backgroundColor = colorInput.value;
//     });

// const yourNameInput = document.getElementById('yourname');
const nameError = document.getElementById('nameError');

function error(input, message) {
    input.className = 'form-control is-invalid';
    const div = input.nextElementSibling;
    div.innerText = message;
    div.className = 'invalid-feedback';
}

function success(input) {
    input.className = 'form-control is-valid';
}

function checkName(input) {
    const re = /^[a-zA-Z\s-]+$/;
    if (re.test(input.value)) {
        success(input);
    } else {
        error(input, 'Name can only contain letters, spaces, and hyphens.');
    }
}

function checkEmail(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   
    if(re.test(input.value)) {
        success(input);
    } else {
        error(input, 'Invalid email address');
    }
}

function checkRequired(inputs) {
    inputs.forEach(function(input) {
        if(input.value === '') {
            error(input, `${input.id} is required.`);
        } else {
            success(input);
        }
    });  
}

function checkEmailConfirm(email, email_confirm) {
    if (email.value !== email_confirm.value) {
        error(email_confirm, 'Emails do not match.');
    } else {
        success(email_confirm);
    }
}

// function checkLength(input, min, max) {
//     if (input.value.length < min) {
//         error(input, `${input.id} must be at least ${min} characters`);
//     }else if (input.value.length > max) {
//         error(input, `${input.id} must be a maximum of ${max} characters`);
//     }else {
//         success(input);
//     }
     
// }

function checkAge(input) {
    var exp = 100;   
    if(input.value > exp) 
        error(input, "Age must be less than 100.");
}

function displayThankYou() {
    const thankYouMessage = document.createElement('div');
    thankYouMessage.className = 'alert alert-success mt-3';
    thankYouMessage.innerText = 'Thank you for registering!';
    form.parentElement.appendChild(thankYouMessage);
    
    setTimeout(() => {
        thankYouMessage.remove();
    }, 5000);
}

function clearForm() {
    form.reset();
    document.querySelectorAll('.form-control').forEach(function(input) {
        input.className = 'form-control';
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();

    checkRequired([yourname,email,age,email_confirm]);
    checkName(yourname);
    checkEmail(email);
    // checkLength(yourname,5,15);
    checkAge(age);
    checkEmailConfirm(email, email_confirm);

    const formIsValid = document.querySelectorAll('.is-invalid').length === 0;

    if (formIsValid) {
        displayThankYou();
        clearForm();
    }
});