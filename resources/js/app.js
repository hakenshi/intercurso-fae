import './bootstrap';

const form = document.querySelector("#form")
form.addEventListener('submit', e => {
    e.preventDefault()

    const password = document.querySelector("#senha").value
    const confirmPassword = document.querySelector("#confirm-senha").value

    if (password === "" || password === null || confirmPassword === "" || confirmPassword == null){
        alert("Por favor, preencha todos os campos.")
    }

    if (password !== confirmPassword && password !== "" && password !== null && confirmPassword !== "" && confirmPassword !== null){
        alert("as senhas não coincidem.")
        document.querySelector("#senha").value = ""
        document.querySelector("#confirm-senha").value = ""
    }

    axios.post("/reset-password", {
        'password-reset-token': document.querySelector("#reset-token").value,
        senha: password,
        confirm_senha: confirmPassword,
    })
        .then(response => {
            if (response.status === 204){
                alert("Senha alterada com sucesso!")
                window.location.replace(`${import.meta.env.VITE_FRONT_END_URL}/login`)

            }
        })

        .catch(e => {
            if (e){
                const error = e.response.data
                alert(error.msg)
                return
            }
        })
})