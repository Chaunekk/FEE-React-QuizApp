const authButtons = document.getElementById("authButtons");
const userMenu = document.getElementById("userMenu");
const logoutBtn = document.getElementById("logoutBtn");

let isAuthenticated = false;

function renderAuthState() {
  if (isAuthenticated) {
    authButtons.classList.add("d-none");
    userMenu.classList.remove("d-none");
  } else {
    authButtons.classList.remove("d-none");
    userMenu.classList.add("d-none");
  }
}

logoutBtn.addEventListener("click", () => {
  isAuthenticated = false;
  renderAuthState();
});

// Demo: tự động login sau 2 giây
setTimeout(() => {
  isAuthenticated = true;
  renderAuthState();
}, 2000);

renderAuthState();