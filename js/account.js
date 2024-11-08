document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary elements
    const loginBtn = document.querySelector('[data-form="login"]');
    const registerBtn = document.querySelector('[data-form="register"]');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Form Switch Function
    function switchForm(showForm, hideForm, activeBtn, inactiveBtn) {
        showForm.classList.add('active');
        hideForm.classList.remove('active');
        activeBtn.classList.add('active');
        inactiveBtn.classList.remove('active');
    }

    // Login Button Click
    loginBtn.addEventListener('click', function() {
        switchForm(loginForm, registerForm, loginBtn, registerBtn);
    });

    // Register Button Click
    registerBtn.addEventListener('click', function() {
        switchForm(registerForm, loginForm, registerBtn, loginBtn);
    });

    // Password Toggle Functionality
    const toggleBtns = document.querySelectorAll('.toggle-password');
    toggleBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.previousElementSibling.previousElementSibling;
            const type = input.type === 'password' ? 'text' : 'password';
            input.type = type;
            
            // Toggle icon
            this.classList.toggle('fa-eye');
            this.classList.toggle('fa-eye-slash');
        });
    });

    // Form Validation
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your login logic here
        console.log('Login submitted');
    });

    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Add your registration logic here
        console.log('Registration submitted');
    });
});
