const cores = ['verde', 'azul', 'amarelo', 'roxo', 'rosa']

const sortear = (array) => {
    const num = Math.floor(Math.random() * array.length)
    return array[num]
}

for(let i = 0; i <= cores.length; i++){
    console.log(sortear(cores))
}
