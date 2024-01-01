const loginFormHandler = async(event) => {
    event.preventDefault();

    const email = document.querySelector("#loginEmail").value.trim();
    const password = document.querySelector("#loginPassword").value.trim();

    if(email && password) {
        const response = await fetch('/api/user/login', {
            method: "POST",
            body: JSON.stringify({ email, password}),
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok) {
            document.location.replase('/profile');
        } else {
            alert(response.statusText);
        }
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#signUpUsername");
    const password = document.querySelector("#signUpPassword");
    const email = document.querySelector("#signUpEmail");

    if(email && password & username) {
        const response = await fetch('/api/user/login', {
            method: "POST",
            body: JSON.stringify({ email, password}),
            headers: { 'Content-Type': 'application/json'},
        });

        if(response.ok) {
            document.location.replase('/profile');
        } else {
            alert(response.statusText);
        }
    }
};
