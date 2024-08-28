const form = document.querySelector("#form");
form.addEventListener('submit', e => {
    e.preventDefault();

    const password = document.querySelector("#senha").value;
    const confirmPassword = document.querySelector("#confirm-senha").value;
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    if (password === "" || password === null || confirmPassword === "" || confirmPassword === null) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        document.querySelector("#senha").value = "";
        document.querySelector("#confirm-senha").value = "";
        return;
    }

    fetch("/reset-password", {
        method: "POST", headers: {
            "Content-Type": "application/json", "X-CSRF-TOKEN": csrfToken
        }, body: JSON.stringify({
            senha: password,
            confirm_senha: confirmPassword,
            'password-reset-token': document.querySelector("#reset-token").value,
        })
    })
        .then(response => {
            if (response.status === 204) {
                alert("Senha alterada com sucesso!\nVocê será redirecionado(a) para a página de login.")
                window.location.replace('https://intercurso-fae-frontend.vercel.app/login')
            }
        })
        .catch(e => {
            console.log(e);
        })
});