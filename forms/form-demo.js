// form-demo.js
function validateForm(event) {
  // get a reference to the form
  const theForm = event.target;
  const errors = [];
  let isValid = true;

  // Validate required shipping information
  const fullName = theForm.fullName.value.trim();
  const email = theForm.email.value.trim();
  const address = theForm.address.value.trim();

  if (!fullName) {
    errors.push("Full name is required");
    isValid = false;
  }

    if (!email) {
        errors.push("Email is required");
        isValid = false;
    }

  if (!address) {
    errors.push("Shipping address is required");
    isValid = false;
  }

  // Validate payment information
  const paymentMethod = theForm.paymentMethod.value;
  if (!paymentMethod) {
    errors.push("Please select a payment method");
    isValid = false;
  } else {
    // Check credit card validation
    if (paymentMethod === "creditCard") {
      const cardNumber = theForm.cardNumber.value.trim();
      if (!cardNumber) {
        errors.push("Credit card number is required");
        isValid = false;
      } else if (!cardNumber.match(/^[0-9]{16}$/)) {
        errors.push("Credit card number must be exactly 16 digits");
        isValid = false;
        }
    }
    // Check PayPal validation
    else if (paymentMethod === "PayPal") {
      const paypalUsername = theForm.PayPalUsername.value.trim();
      if (!paypalUsername) {
        errors.push("PayPal username is required");
        isValid = false;
      }
    }
  }

  // if we ran into any problems above valid will be false.
  if (!isValid) {
    //stop the form from being submitted
    event.preventDefault();
    // show the errors
    showErrors(errors);
    // return false to let the browser know the form was not submitted.
    return false;
  }
}

function togglePaymentDetails(e) {
  // get a reference to the form. We can access all the named form inputs through the form element.
  const theForm = e.target.form;
  // we will also need the creditCardContainer and paypalUsernameContainer
  const creditCardInput = document.getElementById('cardNumber');
  const creditCardLabel = document.querySelector('label[for="cardNumber"]');
  const paypalInput = document.getElementById('PayPalUsername');
  const paypalLabel = document.querySelector('label[for="PayPalUsername"]');

  // Hide payment containers by adding the '.hide' class to each of them
  creditCardInput.classList.add('hide');
  creditCardLabel.classList.add('hide');
  paypalInput.classList.add('hide');
  paypalLabel.classList.add('hide');

  // Disable required for payment fields...if we hide a required field the browser will throw an error when we try to submit!
  creditCardInput.required = false;
  paypalInput.required = false;

  // Show the container based on the selected payment method, and add the required attribute back.
  const selectedMethod = e.target.value;
  if (selectedMethod === 'creditCard') {
    creditCardInput.classList.remove('hide');
    creditCardLabel.classList.remove('hide');
    creditCardInput.required = true;
  } else if (selectedMethod === 'PayPal') {
    paypalInput.classList.remove('hide');
    paypalLabel.classList.remove('hide');
    paypalInput.required = true;
  }
}

// helper function to display our errors.
function showErrors(errors) {
  const errorEl = document.querySelector(".errors");
  const html = errors.map((error) => `<p>${error}</p>`);
  errorEl.innerHTML = html.join("");
}
// attach a change event handler to the paymentMethod input
document.getElementById('paymentMethod').addEventListener('change', togglePaymentDetails);

// attach a submit event handler to the form
document.getElementById('checkoutForm').addEventListener('submit', validateForm);