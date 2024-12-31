let currentUser = ""
let isThereUser = false

users.forEach(user => {
    if (user.loggedIn) {
        currentUser = user
    }
    console.log(currentUser)
})

if (currentUser === ""){
    isThereUser = false
}
else {
    isThereUser = true
}

console.log(isThereUser)

const signInBtn = document.getElementById("signin-btn")
const signInBtnText = document.getElementById("signinbtn-text")

if (isThereUser) {
    signInBtn.setAttribute("href", "User.html")
    signInBtnText.innerText = `${currentUser.userName}`
    console.log(signInBtn.href)
}
else {
    signInBtn.setAttribute("href", "signin.html")
    signInBtnText.innerText = "Sign In"
}