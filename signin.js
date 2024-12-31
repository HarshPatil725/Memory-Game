let users = JSON.parse(localStorage.getItem("users")) || []

// Function to save users data to localStorage
function saveToLocalStorage() {
    localStorage.setItem("users", JSON.stringify(users));
}

// Assigning names
const signinform = document.getElementById("signin-form")
const signupform = document.getElementById("signup-form")

// Sign in logic
signinform.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("signin-email").value
    const password = document.getElementById("signin-password").value
    const signinbtn = document.getElementById("signin-btn")

    if (!email || !password) {
        alert("Enter all Credentials !!!")
    }
    else {
        const user = users.find(user => user.email === email && user.password === password)

        if (user) {
            alert(`Welcome back ${user.userName}`)
            const signinbtntext = document.querySelector(".signin-text")
            signinbtntext.innerText = user.name

            user.loggedIn = true;
            saveToLocalStorage()
        }
        else {
            alert("Invalid credentials !!!")
        }
        signinform.reset()

        window.location = "index.html"
    }
})

// Sign up Logic
signupform.addEventListener("submit", function (e) {
    e.preventDefault()

    const email = document.getElementById("signup-email").value
    const password = document.getElementById("signup-password").value
    const userName = document.getElementById("signup-name").value
    const signupbtn = document.getElementById("signup-btn")

    if (!userName || !email || !password) {
        alert("Enter all Credentials !!!")
    }
    else {
        const userExist = users.some(user => user.email === email)

        if (userExist) {
            alert("Email is already registered. Please sign in.");
            signupform.reset();
            const signUpModal = bootstrap.Modal.getInstance(document.getElementById("signup-modal"))
            signUpModal.hide();
            return;
        }

        const newUser = {
            id: users.length ? users[users.length - 1].id + 1 : 1,
            userName,
            email,
            password ,
            loggedIn : false ,
            coins : 100 ,
            highScore : 0 ,
            bestTime : 0
        };
        users.push(newUser)
        saveToLocalStorage();
        alert("Sign-Up successful !!!");
        signupform.reset();
        const signUpModal = bootstrap.Modal.getInstance(document.getElementById("signup-modal"))
        signUpModal.hide();
    }
})

