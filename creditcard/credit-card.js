
// Grab the input fields
const cardNumberInput = document.getElementById('card-number');
const cardHolderInput = document.getElementById('card-holder');
const cardMonthInput = document.getElementById('card-month');
const cardYearInput = document.getElementById('card-year');
const cardCvcInput = document.getElementById('card-cvc');

// Grab the preview elements
const previewNumber = document.querySelector('.preview-number');
const previewName = document.querySelector('.preview-name');
const previewExpiry = document.querySelector('.preview-expiry');

// Update card number live
cardNumberInput.addEventListener('input', () => {
  let value = cardNumberInput.value.replace(/\D/g, ''); // remove non-digits
  // Format as XXXX XXXX XXXX XXXX
  value = value.match(/.{1,4}/g)?.join(' ') || '';
  previewNumber.textContent = value || '**** **** **** ****';
});

// Update cardholder live
cardHolderInput.addEventListener('input', () => {
  previewName.textContent = cardHolderInput.value.toUpperCase() || 'FULL NAME';
});

// Update expiry live
function updateExpiry() {
  const month = cardMonthInput.value.padStart(2, '0');
  const year = cardYearInput.value.slice(-2); // last 2 digits
  if (month || year) {
    previewExpiry.textContent = `${month || 'MM'}/${year || 'YY'}`;
  } else {
    previewExpiry.textContent = 'MM/YY';
  }
}

cardMonthInput.addEventListener('input', updateExpiry);
cardYearInput.addEventListener('input', updateExpiry);
const cardLogo = document.querySelector('.card-logo');

cardNumberInput.addEventListener('input', () => {
  const number = cardNumberInput.value.replace(/\s/g, '');
  
  if (number.startsWith('4')) {
    cardLogo.textContent = 'VISA';
  } else if (/^5[1-5]/.test(number) || /^2(2[2-9]|[3-7][0-9])/.test(number)) {
    cardLogo.textContent = 'MASTERCARD';
  } else if (/^3[47]/.test(number)) {
    cardLogo.textContent = 'AMEX';
  } else {
    cardLogo.textContent = ''; // unknown or blank
  }
});