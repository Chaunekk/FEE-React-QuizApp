document.addEventListener('DOMContentLoaded', () => {
    const authButtons = document.getElementById('authButtons');
    const userMenu = document.getElementById('userMenu');
    const usernameDisplay = document.getElementById('usernameDisplay');
    const loginForm = document.getElementById('loginForm');
    const logoutBtn = document.getElementById('logoutBtn');
    const quizCardsContainer = document.getElementById('quizCardsContainer');
    const managementLink = document.getElementById('managementLink');

    // Simulate user login state (can be replaced with actual localStorage or session storage)
    let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    let currentUser = localStorage.getItem('currentUser') || 'Lan Chau'; // Default user

    function updateAuthUI() {
        if (isLoggedIn) {
            authButtons.classList.add('d-none');
            userMenu.classList.remove('d-none');
            usernameDisplay.textContent = currentUser;
            managementLink.classList.remove('d-none'); // Show Management link
        } else {
            authButtons.classList.remove('d-none');
            userMenu.classList.add('d-none');
            managementLink.classList.add('d-none'); // Hide Management link
        }
    }

    // Handle Login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real app, you would send credentials to a server
            // For this demo, we just simulate success
            const email = document.getElementById('loginEmail').value;
            // You can extract username from email or have a separate field
            currentUser = email.split('@')[0]; // Simple extraction
            
            isLoggedIn = true;
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', currentUser);
            updateAuthUI();

            // Close the modal
            const loginModal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
            if (loginModal) {
                loginModal.hide();
            }
        });
    }

    // Handle Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            isLoggedIn = false;
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('currentUser');
            updateAuthUI();
        });
    }

    // Load Quizzes dynamically (simulated data)
    function loadQuizzes() {
        const quizzes = [
            { id: 1, title: 'Capitals of Country', description: 'Test your knowledge of country capitals', image: 'assets/images/img1.jpg', duration: '15m' },
            { id: 2, title: 'Science Challenge', description: 'A tough test on various science topics', image: 'assets/images/img2.jpg', duration: '20m' },
            { id: 3, title: 'History Facts', description: 'Explore key historical events', image: 'assets/images/img3.jpg', duration: '10m' },
            { id: 4, title: 'Math Genius', description: 'Solve complex math problems', image: 'assets/images/img4.jpg', duration: '25m' }, // Assuming img4.jpg exists
        ];

        if (quizCardsContainer) {
            quizCardsContainer.innerHTML = ''; // Clear existing content
            quizzes.forEach(quiz => {
                const quizCard = `
                    <div class="col-md-4">
                        <div class="card h-100">
                            <img src="${quiz.image}" class="card-img-top quiz-img" alt="${quiz.title}">
                            <div class="card-body">
                                <h5 class="card-title">${quiz.title}</h5>
                                <p class="card-text">${quiz.description}</p>
                                <div class="d-flex justify-content-between align-items-center mb-3">
                                    <small class="text-muted">${quiz.duration}</small>
                                </div>
                                <a href="#" class="btn btn-primary w-100">Start</a>
                            </div>
                        </div>
                    </div>
                `;
                quizCardsContainer.insertAdjacentHTML('beforeend', quizCard);
            });
        }
    }

    // Initial UI update and quiz loading
    updateAuthUI();
    loadQuizzes();
});