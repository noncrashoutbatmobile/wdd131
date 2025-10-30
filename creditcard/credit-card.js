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

// Helper: determine card type from digits-only number
function detectCardType(digits) {
  if (!digits) return '';
  if (digits.startsWith('4')) return 'VISA';
  if (/^5[1-5]/.test(digits) || /^2(2[2-9]|[3-7][0-9])/.test(digits)) return 'MASTERCARD';
  if (/^3[47]/.test(digits)) return 'AMEX';
  return ''; // unknown / others
}

// Helper: set CVC length/placeholder according to card type
function applyCvcLimitsForType(type) {
  if (type === 'AMEX') {
    cardCvcInput.maxLength = 4;
    cardCvcInput.placeholder = '4 digits';
  } else {
    cardCvcInput.maxLength = 3;
    cardCvcInput.placeholder = '3 digits';
  }

  // If current value is longer than new maxLength, trim it
  if (cardCvcInput.value.length > cardCvcInput.maxLength) {
    cardCvcInput.value = cardCvcInput.value.slice(0, cardCvcInput.maxLength);
  }
}

// Update card number live (with AMEX detection)
cardNumberInput.addEventListener('input', () => {
  let raw = cardNumberInput.value.replace(/\D/g, ''); // digits only
  let formatted = '';

  // Detect card type
  let type = detectCardType(raw);

  // Apply formatting based on type
  if (type === 'AMEX') {
    // AMEX formatting 4-6-5
    formatted = raw
      .replace(/^(\d{0,4})(\d{0,6})(\d{0,5}).*/, (m, g1, g2, g3) =>
        [g1, g2, g3].filter(Boolean).join(' ')
      );
  } else {
    // Default formatting 4-4-4-4...
    formatted = raw
      .replace(/(\d{4})(?=\d)/g, '$1 ')
      .trim();
  }

  cardLogo.textContent = type || ''; // blank if unknown
  previewNumber.textContent = formatted || '**** **** **** ****';
  cardNumberInput.value = formatted; // keep it formatted in input

  // Update CVC rules based on detected type
  applyCvcLimitsForType(type);
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

// --- CVC/CVV sanitisation and enforcement ---
// Allow digits only in CVC input and enforce maxlength (3 or 4 based on card type)
cardCvcInput.addEventListener('input', () => {
  // remove non-digits immediately
  let digitsOnly = cardCvcInput.value.replace(/\D/g, '');

  // enforce maxlength if necessary (maxLength is set by applyCvcLimitsForType)
  const max = cardCvcInput.maxLength ? parseInt(cardCvcInput.maxLength, 10) : 3;
  if (digitsOnly.length > max) {
    digitsOnly = digitsOnly.slice(0, max);
  }

  cardCvcInput.value = digitsOnly;
});

// Optional: on page load, initial CVC limit (in case card input is empty)
document.addEventListener('DOMContentLoaded', () => {
  const initialType = detectCardType(cardNumberInput.value.replace(/\D/g, ''));
  applyCvcLimitsForType(initialType);
});
