import ReactInputMask from 'react-input-mask'

const inputClass = {
    inputModal: "input-modal",
    inputCadastro: "input-cadastro",
    inputLogin: "input-login",
}

export const Input = ({ ref, mask, name, label, className, value }) => {

    return (
        <div className="flex flex-col justify-center p-2">
            <label htmlFor={name}>{label}</label>
            <ReactInputMask mask={mask} ref={ref} type="text" className={`${className}`} name={name} value={value} />
        </div>
    )
}
