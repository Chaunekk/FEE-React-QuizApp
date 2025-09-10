document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const quizCardsContainer = document.getElementById('quizCardsContainer');
    const managementLink = document.querySelector('a[href="user-management.html"]');
    const searchName = document.getElementById('searchName');
    const searchContent = document.getElementById('searchContent');
    const statusCheck = document.getElementById('statusCheck');
    const clearSearch = document.getElementById('clearSearch');
    const searchBtn = document.getElementById('searchBtn');
    const userTable = document.getElementById('userTable');
    const quizTable = document.getElementById('quizTable');
    const questionTable = document.getElementById('questionTable');
    const roleTable = document.getElementById('roleTable');
    const addUserForm = document.getElementById('addUserForm');
    const editUserForm = document.getElementById('editUserForm');
    const addQuizForm = document.getElementById('addQuizForm');
    const editQuizForm = document.getElementById('editQuizForm');
    const addQuestionForm = document.getElementById('addQuestionForm');
    const editQuestionForm = document.getElementById('editQuestionForm');
    const addRoleForm = document.getElementById('addRoleForm');
    const editRoleForm = document.getElementById('editRoleForm');
    const registerForm = document.getElementById('registerForm');

    // State Management
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let currentUser = localStorage.getItem('currentUser') || 'Lan Chau';

    // Update UI based on login state
    function updateAuthUI() {
        if (authButtons && userMenu && usernameDisplay && managementLink) {
            if (isLoggedIn) {
                authButtons.classList.add('d-none');
                userMenu.classList.remove('d-none');
                usernameDisplay.textContent = currentUser;
                managementLink.classList.remove('d-none');
            } else {
                authButtons.classList.remove('d-none');
                userMenu.classList.add('d-none');
                managementLink.classList.add('d-none');
            }
        }
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            try {
                const emailInput = document.getElementById('loginEmail');
                if (!emailInput) throw new Error('Login email input not found');
                const email = emailInput.value.trim();
                if (!email) throw new Error('Email is required');

                currentUser = email.split('@')[0] || 'User';
                isLoggedIn = true;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', currentUser);
                updateAuthUI();

                const loginModal = document.getElementById('loginModal');
                if (loginModal) {
                    const modal = bootstrap.Modal.getInstance(loginModal);
                    if (modal) modal.hide();
                }
            } catch (error) {
                console.error('Login error:', error.message);
                alert('Login failed: ' + error.message);
            }
        });
    }

    // Handle Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            try {
                isLoggedIn = false;
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');
                updateAuthUI();
                window.location.href = 'home.html';
            } catch (error) {
                console.error('Logout error:', error.message);
            }
        });
    }

    // Load Quizzes Dynamically (for quizzes.html)
    function loadQuizzes() {
        if (!quizCardsContainer) return;

        const quizzes = [
            { id: 1, title: 'Capitals of Country', description: 'Test your knowledge of country capitals', image: 'assets/images/img1.jpg', duration: '15m' },
            { id: 2, title: 'Science Challenge', description: 'A tough test on various science topics', image: 'assets/images/img2.jpg', duration: '20m' },
            { id: 3, title: 'History Facts', description: 'Explore key historical events', image: 'assets/images/img3.jpg', duration: '10m' },
            { id: 4, title: 'Math Genius', description: 'Solve complex math problems', image: 'assets/images/img4.jpg', duration: '25m' },
        ];

        quizCardsContainer.innerHTML = '';
        quizzes.forEach(quiz => {
            const quizCard = `
                <div class="col-md-4 mb-4">
                    <div class="card h-100">
                        <img src="${quiz.image}" class="card-img-top quiz-img" alt="${quiz.title}">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-center">
                                <h5 class="card-title mb-0">${quiz.title}</h5>
                                <small class="text-muted">${quiz.duration}</small>
                            </div>
                            <p class="card-text mt-2">${quiz.description}</p>
                            <a href="#" class="btn btn-primary w-100 mt-3">Start</a>
                        </div>
                    </div>
                </div>
            `;
            quizCardsContainer.insertAdjacentHTML('beforeend', quizCard);
        });
    }

    // User Management Interactions (for user-management.html)
    if (userTable) {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => {
                const row = button.closest('tr');
                const form = document.getElementById('editUserForm');
                if (form) {
                    form.querySelector('input[placeholder="Enter your first name"]').value = row.cells[0].textContent;
                    form.querySelector('input[placeholder="Enter your last name"]').value = row.cells[1].textContent;
                    form.querySelector('input[placeholder="Enter your email"]').value = row.cells[2].textContent;
                    form.querySelector('input[placeholder="Enter your username"]').value = row.cells[3].textContent;
                    form.querySelector('input[placeholder="Enter your phone number"]').value = row.cells[4].textContent;
                    form.querySelector('#editStatus').checked = row.cells[5].textContent === 'Yes';
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this user?')) {
                    button.closest('tr').remove();
                }
            });
        });
    }

    // Search Form Handling (for user-management.html, quiz-management.html, question-management.html)
    if (searchBtn && clearSearch) {
        searchBtn.addEventListener('click', () => {
            const name = searchName ? searchName.value : (searchContent ? searchContent.value : '');
            const status = statusCheck.checked;
            console.log('Search:', { name, status });
            // Add search logic here
        });
        clearSearch.addEventListener('click', () => {
            if (searchName) searchName.value = '';
            if (searchContent) searchContent.value = '';
            statusCheck.checked = true;
        });
    }

    // Add User Form Handling (for user-management.html)
    if (addUserForm) {
        addUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(addUserForm);
            console.log('Add User:', Object.fromEntries(formData));
            bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
        });
    }

    // Edit User Form Handling (for user-management.html)
    if (editUserForm) {
        editUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(editUserForm);
            console.log('Edit User:', Object.fromEntries(formData));
            bootstrap.Modal.getInstance(document.getElementById('editUserModal')).hide();
        });
    }

    // Quiz Management Interactions (for quiz-management.html)
    if (quizTable) {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => {
                const row = button.closest('tr');
                const form = document.getElementById('editQuizForm');
                if (form) {
                    form.querySelector('input[placeholder="Enter quiz title"]').value = row.cells[1].textContent;
                    form.querySelector('textarea[placeholder="Enter description"]').value = row.cells[1].textContent; // Placeholder data
                    form.querySelector('input[placeholder="Enter quiz duration"]').value = row.cells[2].textContent;
                    form.querySelector('input[placeholder="Enter thumbnail URL"]').value = row.cells[0].querySelector('img').src;
                    form.querySelector('#editQuizActive').checked = row.cells[4].textContent === 'Yes';
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this quiz?')) {
                    button.closest('tr').remove();
                }
            });
        });
    }

    // Add Quiz Form Handling (for quiz-management.html)
    if (addQuizForm) {
        addQuizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(addQuizForm);
            console.log('Add Quiz:', Object.fromEntries(formData));
            bootstrap.Modal.getInstance(document.getElementById('addQuizModal')).hide();
        });
    }

    // Edit Quiz Form Handling (for quiz-management.html)
    if (editQuizForm) {
        editQuizForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(editQuizForm);
            console.log('Edit Quiz:', Object.fromEntries(formData));
            bootstrap.Modal.getInstance(document.getElementById('editQuizModal')).hide();
        });
    }

    // Question Management Interactions (for question-management.html)
    if (questionTable) {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => {
                const row = button.closest('tr');
                const form = document.getElementById('editQuestionForm');
                if (form) {
                    form.querySelector('input[placeholder="Enter question content"]').value = row.cells[0].textContent;
                    form.querySelector('#editQuestionType').value = row.cells[1].textContent;
                    form.querySelector('input[placeholder="Enter number of answers"]').value = row.cells[2].textContent;
                    form.querySelector('input[placeholder="Enter order of question"]').value = row.cells[3].textContent;
                    form.querySelector('#editQuestionActive').checked = row.cells[4].textContent === 'Yes';
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this question?')) {
                    button.closest('tr').remove();
                }
            });
        });
    }

    // Add Question Form Handling (for question-management.html)
    if (addQuestionForm) {
        addQuestionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(addQuestionForm);
            console.log('Add Question:', Object.fromEntries(formData));
            bootstrap.Modal.getInstance(document.getElementById('addQuestionModal')).hide();
        });
    }

    // Edit Question Form Handling (for question-management.html)
    if (editQuestionForm) {
        editQuestionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(editQuestionForm);
            console.log('Edit Question:', Object.fromEntries(formData));
            bootstrap.Modal.getInstance(document.getElementById('editQuestionModal')).hide();
        });
    }

    // Role Management Interactions (for roleManagement.html)
    if (roleTable) {
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', () => {
                const row = button.closest('tr');
                const form = document.getElementById('editRoleForm');
                if (form) {
                    form.querySelector('input[placeholder="Enter role name"]').value = row.cells[0].textContent;
                    form.querySelector('textarea[placeholder="Enter role description"]').value = row.cells[1].textContent;
                    form.querySelector('#editRoleActive').checked = row.cells[2].textContent === 'Yes';
                }
            });
        });

        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', () => {
                if (confirm('Are you sure you want to delete this role?')) {
                    button.closest('tr').remove();
                }
            });
        });
    }

    // Add Role Form Handling (for roleManagement.html)
    if (addRoleForm) {
        addRoleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(addRoleForm);
            console.log('Add Role:', Object.fromEntries(formData));
            bootstrap.Modal.getInstance(document.getElementById('addRoleModal')).hide();
        });
    }

    // Edit Role Form Handling (for roleManagement.html)
    if (editRoleForm) {
        editRoleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = new FormData(editRoleForm);
            console.log('Edit Role:', Object.fromEntries(formData));
            bootstrap.Modal.getInstance(document.getElementById('editRoleModal')).hide();
        });
    }

    // Handle Register
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            try {
                const firstName = document.getElementById('registerFirstName').value.trim();
                const lastName = document.getElementById('registerLastName').value.trim();
                const email = document.getElementById('registerEmail').value.trim();
                const password = document.getElementById('registerPassword').value.trim();
                const confirmPassword = document.getElementById('registerConfirm').value.trim();
                const phone = document.getElementById('registerPhone').value.trim();
                const agreeTerms = document.getElementById('agreeTerms').checked;

                if (!firstName || !lastName || !email || !password || !confirmPassword || !phone || !agreeTerms) {
                    throw new Error('All fields and terms agreement are required');
                }
                if (password !== confirmPassword) {
                    throw new Error('Passwords do not match');
                }

                currentUser = `${firstName} ${lastName}`;
                isLoggedIn = true;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', currentUser);
                updateAuthUI();
                alert('Registration successful! Redirecting to home page.');
                window.location.href = 'home.html';
            } catch (error) {
                console.error('Registration error:', error.message);
                alert('Registration failed: ' + error.message);
            }
        });
    }

    // Demo: Display current date and time in footer
    const now = new Date();
    const currentDateElement = document.getElementById('currentDate');
    if (currentDateElement) {
        currentDateElement.textContent = now.toLocaleString('vi-VN', { dateStyle: 'long', timeStyle: 'short' });
    }

    // Demo: Simulate login state (replace with actual logic)
    if (isLoggedIn) {
        if (authButtons) authButtons.classList.add('d-none');
        if (userMenu) userMenu.classList.remove('d-none');
        if (usernameDisplay) usernameDisplay.textContent = currentUser;
    } else {
        if (authButtons) authButtons.classList.remove('d-none');
        if (userMenu) userMenu.classList.add('d-none');
    }

    // Initial UI update and quiz loading
    updateAuthUI();
    if (quizCardsContainer) loadQuizzes();
});