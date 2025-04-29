const themeSelector = document.querySelector('#theme'); // Select the dropdown element

function changeTheme() {
    // Check the current value of the select element
    if (themeSelector.value === 'dark') {
        document.body.classList.add('dark'); // Add the dark class to the body
        document.querySelector('.logo').src = 'byui-logo_white.png'; // Change logo to white
    } else {
        document.body.classList.remove('dark'); // Remove the dark class
        document.querySelector('.logo').src = 'logo.webp'; // Change logo to blue
    }
}

// Add an event listener to the themeSelector element
themeSelector.addEventListener('change', changeTheme);