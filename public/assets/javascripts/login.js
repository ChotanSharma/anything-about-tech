document.addEventListener('click', handleLogin);

function handleLogin() {
    let user = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({})
    })
}