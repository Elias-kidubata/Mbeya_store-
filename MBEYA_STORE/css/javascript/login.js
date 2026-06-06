// Kama user tayari amelogin
if(localStorage.getItem("loggedIn") === "true"){
    window.location.href = "dashboard.html";
}

// Form ya login
const loginForm = document.getElementById("loginForm");
const openLoginButton = document.getElementById("openLoginButton");
const loginFormWrapper = document.querySelector(".login-form-wrapper");

openLoginButton.addEventListener("click", function(){
    loginFormWrapper.classList.remove("hidden");
    document.getElementById("username").focus();
});

const openSignupButton = document.getElementById("openSignupButton");
const signupOptionsWrapper = document.getElementById("signupOptionsWrapper");
const googleSignupButton = document.getElementById("googleSignupButton");

openSignupButton.addEventListener("click", function(){
    signupOptionsWrapper.classList.toggle("hidden");
    loginFormWrapper.classList.add("hidden");
});

googleSignupButton.addEventListener("click", function(){
    // OAuth flow kwa Google
    const redirectUri = encodeURIComponent(window.location.origin + "/dashboard.html");
    const clientId = "YOUR_GOOGLE_CLIENT_ID_HERE"; // Badilisha na client ID yako ya kweli
    const scope = encodeURIComponent("openid email profile");
    const responseType = "code";
    const accessType = "offline";
    
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&access_type=${accessType}`;
    
    window.location.href = googleAuthUrl;
});

loginForm.addEventListener("submit", function(e){

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Credentials za mwanzo
    const validUsername = "admin";
    const validPassword = "1234";

    if(username === validUsername && password === validPassword){

        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("currentUser", username);

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    }else{

        alert("Invalid Username or Password");

    }

});