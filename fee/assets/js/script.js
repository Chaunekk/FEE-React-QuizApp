document.addEventListener("DOMContentLoaded", () => {
  const authButtons = document.getElementById("authButtons");
  const userMenu = document.getElementById("userMenu");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginForm = document.getElementById("loginForm");

  let isAuthenticated = false;

  // Hàm render lại UI theo trạng thái login
  function renderAuthState() {
    if (isAuthenticated) {
      authButtons.classList.add("d-none");
      userMenu.classList.remove("d-none");
    } else {
      authButtons.classList.remove("d-none");
      userMenu.classList.add("d-none");
    }
  }

  // Khi submit form login
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const email = document.getElementById("loginEmail").value.trim();
      const password = document.getElementById("loginPassword").value.trim();

      if (email && password) {
        isAuthenticated = true;
        renderAuthState();

        // Đóng modal login
        const modal = bootstrap.Modal.getInstance(document.getElementById("loginModal"));
        modal.hide();

        // Reset form
        loginForm.reset();
      } else {
        alert("Vui lòng nhập Email và Mật khẩu!");
      }
    });
  }

  // Khi logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      isAuthenticated = false;
      renderAuthState();
    });
  }

  // Khởi tạo UI ban đầu
  renderAuthState();
});