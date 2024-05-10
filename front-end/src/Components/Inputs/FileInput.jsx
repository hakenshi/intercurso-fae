import ReactInputMask from "react-input-mask"

export const FileInput = ({handleFileChange, className}) => {
  return (
    <div className="flex flex-col justify-center p-2">
            <input className={className} type="file" accept=".jpg, .jpeg, .png" onChange={handleFileChange}/>
        </div>
  )
}
