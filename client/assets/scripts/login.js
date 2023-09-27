window.onload = function () {
    document.getElementById('form').onsubmit = async function (ev) {
        ev.preventDefault();

        document.getElementById('err').textContent = "";

        const response = await fetch('http://localhost:3000', {
            method: 'POST',
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });

        if (response.status === 200) {
            sessionStorage.setItem('user', JSON.stringify(await response.json()));
            window.location.href = './index.html'
        } else {
            document.getElementById('err').textContent = (await response.json()).message;
        }
    }
}