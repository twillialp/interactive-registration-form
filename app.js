document.addEventListener('DOMContentLoaded', () => {
    // 1. Select all necessary DOM elements
    const form = document.getElementById('registrationForm');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    const usernameError = document.getElementById('usernameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');

    // 2. Load saved username from localStorage
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
        usernameInput.value = savedUsername;
    }

    // 3. Real-time validation with input event listeners
    usernameInput.addEventListener('input', () => {
        if (usernameInput.validity.valid) {
            usernameError.textContent = '';
        } else {
            showUsernameError();
        }
    });

    emailInput.addEventListener('input', () => {
        if (emailInput.validity.valid) {
            emailError.textContent = '';
        } else {
            showEmailError();
        }
    });

    passwordInput.addEventListener('input', () => {
        validatePassword();
        // Also validate confirm password field if it has a value
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
    });

    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    // 4. Form submission handling
    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent form from submitting

        // Final validation check on all fields
        const isUsernameValid = validateUsername();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();

        if (isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid) {
            // If all fields are valid
            alert('Registration successful!');
            localStorage.setItem('savedUsername', usernameInput.value);
            form.reset();
        } else {
            // Focus on the first invalid field
            const firstInvalidField = form.querySelector('input:invalid, input.invalid');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    });

    // --- Validation and Error-displaying Functions ---

    function validateUsername() {
        if (usernameInput.validity.valid) {
            usernameError.textContent = '';
            return true;
        }
        showUsernameError();
        return false;
    }

    function showUsernameError() {
        if (usernameInput.validity.valueMissing) {
            usernameError.textContent = 'Username is required.';
        }
    }

    function validateEmail() {
        if (emailInput.validity.valid) {
            emailError.textContent = '';
            return true;
        }
        showEmailError();
        return false;
    }

    function showEmailError() {
        if (emailInput.validity.valueMissing) {
            emailError.textContent = 'Email is required.';
        } else if (emailInput.validity.patternMismatch) {
            emailError.textContent = 'Please enter a valid email address.';
        }
    }

    function validatePassword() {
        const password = passwordInput.value;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
        if (passwordRegex.test(password)) {
            passwordError.textContent = '';
            return true;
        }
        passwordError.textContent = 'Password must be at least 8 characters, with an uppercase letter, a lowercase letter, and a number.';
        return false;
    }

    function validateConfirmPassword() {
        if (confirmPasswordInput.value === passwordInput.value) {
            confirmPasswordError.textContent = '';
            return true;
        }
        confirmPasswordError.textContent = 'Passwords do not match.';
        return false;
    }
});