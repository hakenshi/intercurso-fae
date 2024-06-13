export function setStatus (num){
    const statusMap = {
        '0': "Pendente",
        '1': "Ativo",
        '2': "Rejeitado"
    }
    return statusMap[num.toString()] || "Status inválido"
}

