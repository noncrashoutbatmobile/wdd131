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
const cardLogo = document.querySelector('.card-logo');

// Update card number live (with AMEX detection)
cardNumberInput.addEventListener('input', () => {
  let value = cardNumberInput.value.replace(/\D/g, ''); // remove non-digits
  let formatted = '';

  // Detect card type
  let type = '';
  if (value.startsWith('4')) {
    type = 'VISA';
  } else if (/^5[1-5]/.test(value) || /^2(2[2-9]|[3-7][0-9])/.test(value)) {
    type = 'MASTERCARD';
  } else if (/^3[47]/.test(value)) {
    type = 'AMEX';
  }

  // Apply formatting based on type
  if (type === 'AMEX') {
    formatted = value
      .replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (m, g1, g2, g3) =>
        [g1, g2, g3].filter(Boolean).join(' ')
      );
  } else {
    formatted = value
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  }

  cardLogo.textContent = type;
  previewNumber.textContent = formatted || '**** **** **** ****';
  cardNumberInput.value = formatted; // keep it formatted in input
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
