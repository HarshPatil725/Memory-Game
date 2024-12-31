const header = document.querySelector(".user-header")
const logOutBtn = document.getElementById("logOut-btn")
const deleteBtn = document.getElementById("delete-btn")
const content = document.getElementById("Static-con")

content.innerHTML = ""

// let h2 = document.createElement("h2")
// h2.className = "user-header"

content.innerHTML = `
    <h2 class="user-header">${currentUser.userName}</h2>
    <p>Email : ${currentUser.email} </p>
    <p>Coins : ${currentUser.coins} </p>
    <p>High Score : 0</p>
`

logOutBtn.addEventListener("click", logOut = () => {
    alert(`${currentUser.userName} is logging out`)
    currentUser.loggedIn = false
    saveToLocalStorage()
    window.location = "index.html"
})

deleteBtn.addEventListener("click", deleteUser = () => {
    const confirm = window.confirm('Are you sure you want to delete this account ?')

    if (!confirm) return;

    users = users.filter((user) => user.userName.toLowerCase() !== currentUser.userName.toLowerCase());
    saveToLocalStorage();
    alert(`User ${name} account deleted.`);
    window.location = "index.html"
})