async function login() {
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
        // const data = await response;
        if (response.status !==200) {
            console.log( (await response.json()).message)
            document.getElementById('err').innerText = (await response.json()).message;
        } else {
            sessionStorage.setItem('user', JSON.stringify( await response.json()));
            window.location.href= 'index.html'
        }

    }