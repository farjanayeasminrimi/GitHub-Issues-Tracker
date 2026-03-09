const username = document.getElementById("username");
const password = document.getElementById("password");

document.getElementById("loginBtn").addEventListener("click", function () {
  if (username.value !== `admin` || password.value !== `admin123`) {
    return alert("Invalid Username or Password!!!!!!");
  } else {
    alert("LogIn Successful!");
    window.location.href = "./issues.html";
  }
});
