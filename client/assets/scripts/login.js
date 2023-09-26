window.onload = function () {

    document.getElementById('submit').onclick = async function () {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            body: JSON.stringify({
                username: document.getElementById('username').value,
                password: document.getElementById('password').value
            }),
            headers: {
                'Content-type': 'application/json'
            }
        });
        const data = await response.json();

        if (data.error) {
            document.getElementById('err').innerHTML = data.error;
        } else {
            sessionStorage.setItem('accessToken', JSON.stringify(data));
            location.href = '../../index.html'
        }

    }

}