const logout = async () => {
    const response = await fetch('/api/user/logout', {
        method: "POST",
        header: { 'Content-Type': 'application/json'},
    });

    if(response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

document.querySelector("#logoutButton").addEventListener('click', logout);