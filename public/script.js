// Form Validation
// Register
document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const firstName = document.getElementById('first_name').value.trim();
    const lastName = document.getElementById('last_name').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm_password').value;
    const errorDiv = document.getElementById('registerError');

    // Clear previous errors
    errorDiv.textContent = '';

    // Validate First Name and Last Name
    if (!firstName || !lastName) {
        errorDiv.textContent = 'First and Last Name are required.';
        return;
    }

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorDiv.textContent = 'Enter a valid email address.';
        return;
    }

    // Validate Password Length
    if (password.length < 6) {
        errorDiv.textContent = 'Password must be at least 6 characters long.';
        return;
    }

    // Confirm Password Match
    if (password !== confirmPassword) {
        errorDiv.textContent = 'Passwords do not match.';
        return;
    }

    // If all validations pass
    alert('Registration Successful!');
    this.submit();
});

// Login
document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const email = document.getElementById('login_email').value.trim();
    const password = document.getElementById('login_password').value;
    const errorDiv = document.getElementById('loginError');

    // Clear previous errors
    errorDiv.textContent = '';

    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorDiv.textContent = 'Enter a valid email address.';
        return;
    }

    // Validate Password
    if (!password) {
        errorDiv.textContent = 'Password is required.';
        return;
    }

    // If all validations pass
    alert('Login Successful!');
    this.submit();
});

document.getElementById('register-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    alert(await response.text());
});

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    alert(await response.text());
});

