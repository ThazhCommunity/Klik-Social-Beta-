const users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
const posts = JSON.parse(localStorage.getItem("posts")) || [];

function login(username, password) {
  if (users[username] && users[username] === password) {
    currentUser = username;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    showMain();
  } else {
    alert("Tên đăng nhập hoặc mật khẩu không đúng!");
  }
}

function register(username, password) {
  if (users[username]) {
    alert("Tên đăng nhập đã tồn tại!");
  } else {
    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Đăng ký thành công!");
    showLoginForm();
  }
}

function logout() {
  currentUser = null;
  localStorage.removeItem("currentUser");
  showAuth();
}

function addPost(content) {
  if (!content) {
    alert("Nội dung không được để trống!");
    return;
  }
  posts.push({ username: currentUser, content, time: new Date().toLocaleString() });
  localStorage.setItem("posts", JSON.stringify(posts));
  renderPosts();
}

function showAuth() {
  document.getElementById("auth").style.display = "block";
  document.getElementById("main").style.display = "none";
  document.getElementById("logout-btn").style.display = "none";
}

function showMain() {
  document.getElementById("auth").style.display = "none";
  document.getElementById("main").style.display = "block";
  document.getElementById("logout-btn").style.display = "block";
  renderPosts();
}

function showLoginForm() {
  document.getElementById("login-form").style.display = "block";
  document.getElementById("register-form").style.display = "none";
}

function showRegisterForm() {
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
}

function renderPosts() {
  const postContainer = document.getElementById("posts");
  postContainer.innerHTML = posts
    .map(
      (post) => `
      <div class="post">
        <p><strong>${post.username}</strong> - <span class="post-time">${post.time}</span></p>
        <p>${post.content}</p>
      </div>`
    )
    .join("");
}

document.getElementById("login-btn").addEventListener("click", () => {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  login(username, password);
});

document.getElementById("register-btn").addEventListener("click", () => {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  register(username, password);
});

document.getElementById("logout-btn").addEventListener("click", logout);

document.getElementById("post-btn").addEventListener("click", () => {
  const content = document.getElementById("post-content").value;
  addPost(content);
  document.getElementById("post-content").value = "";
});

document.getElementById("show-register").addEventListener("click", showRegisterForm);
document.getElementById("show-login").addEventListener("click", showLoginForm);

if (currentUser) {
  showMain();
} else {
  showAuth();
}