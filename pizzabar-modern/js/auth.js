// Authentication Manager
class AuthManager {
    constructor() {
        this.signInBtn = document.getElementById('signInBtn');
        this.userMenuContainer = document.getElementById('userMenuContainer');
        this.userAvatarBtn = document.getElementById('userAvatarBtn');
        this.userDropdown = document.getElementById('userDropdown');
        this.signInModal = document.getElementById('signInModal');
        this.logoutBtn = document.getElementById('logoutBtn');

        this.init();
    }

    init() {
        // Check authentication status
        this.updateUI();

        // Event listeners
        if (this.signInBtn) {
            this.signInBtn.addEventListener('click', () => this.showSignInModal());
        }

        if (this.logoutBtn) {
            this.logoutBtn.addEventListener('click', () => this.logout());
        }

        if (this.userAvatarBtn) {
            this.userAvatarBtn.addEventListener('click', () => this.toggleUserDropdown());
        }

        // Modal close
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.hideSignInModal());
        }

        // Close modal on overlay click
        const modalOverlay = document.querySelector('.modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', () => this.hideSignInModal());
        }

        // Auth form handlers
        this.setupAuthForms();

        // Check for OAuth redirect
        this.handleOAuthRedirect();
    }

    updateUI() {
        const isLoggedIn = isAuthenticated();
        const user = getUserData();

        if (isLoggedIn && user) {
            // Show user menu, hide sign in button
            if (this.signInBtn) this.signInBtn.style.display = 'none';
            if (this.userMenuContainer) this.userMenuContainer.style.display = 'block';

            // Update user info
            const userName = document.getElementById('userNameDisplay');
            const userEmail = document.getElementById('userEmailDisplay');
            if (userName) userName.textContent = user.name;
            if (userEmail) userEmail.textContent = user.email;

            // Show orders link
            const ordersNav = document.getElementById('ordersNav');
            if (ordersNav) ordersNav.style.display = 'block';
        } else {
            // Show sign in button, hide user menu
            if (this.signInBtn) this.signInBtn.style.display = 'flex';
            if (this.userMenuContainer) this.userMenuContainer.style.display = 'none';

            // Hide orders link
            const ordersNav = document.getElementById('ordersNav');
            if (ordersNav) ordersNav.style.display = 'none';
        }
    }

    showSignInModal() {
        if (this.signInModal) {
            this.signInModal.classList.add('show');
        }
    }

    hideSignInModal() {
        if (this.signInModal) {
            this.signInModal.classList.remove('show');
        }
    }

    toggleUserDropdown() {
        if (this.userDropdown) {
            this.userDropdown.classList.toggle('show');
        }
    }

    setupAuthForms() {
        // Tab switching
        const authTabs = document.querySelectorAll('.auth-tab');
        authTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const tabName = tab.dataset.tab;
                this.switchTab(tabName);
            });
        });

        // Sign In form
        const signInForm = document.getElementById('signInForm');
        if (signInForm) {
            signInForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignIn();
            });
        }

        // Sign Up form
        const signUpForm = document.getElementById('signUpForm');
        if (signUpForm) {
            signUpForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleSignUp();
            });
        }

        // Social auth buttons
        const googleSignIn = document.getElementById('googleSignIn');
        const googleSignUp = document.getElementById('googleSignUp');
        if (googleSignIn) googleSignIn.addEventListener('click', () => this.handleGoogleAuth());
        if (googleSignUp) googleSignUp.addEventListener('click', () => this.handleGoogleAuth());

        const facebookSignIn = document.getElementById('facebookSignIn');
        const facebookSignUp = document.getElementById('facebookSignUp');
        if (facebookSignIn) facebookSignIn.addEventListener('click', () => this.handleFacebookAuth());
        if (facebookSignUp) facebookSignUp.addEventListener('click', () => this.handleFacebookAuth());
    }

    switchTab(tabName) {
        const authTabs = document.querySelectorAll('.auth-tab');
        authTabs.forEach(tab => {
            if (tab.dataset.tab === tabName) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        const signInForm = document.getElementById('signInForm');
        const signUpForm = document.getElementById('signUpForm');
        const modalTitle = document.querySelector('.modal-title');
        const modalSubtitle = document.querySelector('.modal-subtitle');

        if (tabName === 'signin') {
            if (signInForm) signInForm.style.display = 'block';
            if (signUpForm) signUpForm.style.display = 'none';
            if (modalTitle) modalTitle.textContent = 'Welcome Back';
            if (modalSubtitle) modalSubtitle.textContent = 'Sign in to your account to continue';
        } else {
            if (signInForm) signInForm.style.display = 'none';
            if (signUpForm) signUpForm.style.display = 'block';
            if (modalTitle) modalTitle.textContent = 'Create Account';
            if (modalSubtitle) modalSubtitle.textContent = 'Join us and start ordering delicious pizzas';
        }
    }

    async handleSignIn() {
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;

        if (!email || !password) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        try {
            const data = await apiRequest(API_ENDPOINTS.LOGIN, {
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            setAuthData(data.token, data);
            this.showMessage('Sign in successful!', 'success');
            setTimeout(() => {
                this.hideSignInModal();
                this.updateUI();
                location.reload();
            }, 1000);
        } catch (error) {
            this.showMessage(error.message || 'Sign in failed', 'error');
        }
    }

    async handleSignUp() {
        const name = document.getElementById('signUpName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;
        const confirmPassword = document.getElementById('signUpConfirmPassword').value;

        if (!name || !email || !password || !confirmPassword) {
            this.showMessage('Please fill in all fields', 'error');
            return;
        }

        if (password !== confirmPassword) {
            this.showMessage('Passwords do not match', 'error');
            return;
        }

        if (password.length < 6) {
            this.showMessage('Password must be at least 6 characters', 'error');
            return;
        }

        try {
            const data = await apiRequest(API_ENDPOINTS.REGISTER, {
                method: 'POST',
                body: JSON.stringify({ name, email, password })
            });

            setAuthData(data.token, data);
            this.showMessage('Account created successfully!', 'success');
            setTimeout(() => {
                this.hideSignInModal();
                this.updateUI();
                location.reload();
            }, 1000);
        } catch (error) {
            this.showMessage(error.message || 'Sign up failed', 'error');
        }
    }

    handleGoogleAuth() {
        window.location.href = API_ENDPOINTS.GOOGLE_AUTH;
    }

    handleFacebookAuth() {
        window.location.href = API_ENDPOINTS.FACEBOOK_AUTH;
    }

    handleOAuthRedirect() {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const userId = urlParams.get('userId');

        if (token && userId) {
            // Fetch user data
            fetch(API_ENDPOINTS.PROFILE, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(res => res.json())
            .then(user => {
                setAuthData(token, user);
                this.updateUI();
                // Clean URL
                window.history.replaceState({}, document.title, window.location.pathname);
            })
            .catch(error => {
                console.error('OAuth error:', error);
            });
        }
    }

    logout() {
        clearAuthData();
        this.updateUI();
        location.href = 'index.html';
    }

    showMessage(message, type) {
        const authMessage = document.getElementById('authMessage');
        if (authMessage) {
            authMessage.textContent = message;
            authMessage.className = `auth-message ${type}`;
            setTimeout(() => {
                authMessage.textContent = '';
                authMessage.className = 'auth-message';
            }, 5000);
        }
    }
}

// Initialize auth manager
let authManager;
document.addEventListener('DOMContentLoaded', () => {
    authManager = new AuthManager();
});
