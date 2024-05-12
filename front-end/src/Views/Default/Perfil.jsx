import { faCamera, faCog, faHeart, faPencil, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import userLogo from "../../assets/blank-profile-picture-973460_640.png";
import logoBranca from "../../assets/logo-unifae-2021-branca.png";
import React, { useRef, useState } from 'react'
import { useStateContext } from '../../Contexts/ContextProvider';
import { Link, Navigate } from 'react-router-dom';
import { Container } from '../../Components/Container';
import { Modal } from '../../Components/Modal';
import ReactInputMask from 'react-input-mask';
import { Input } from '../../Components/Inputs/Input';
import { FileInput } from '../../Components/Inputs/FileInput';
import cursos from "../../../public/cursos.json"
import { TextArea } from '../../Components/Inputs/TextArea';

export const Perfil = () => {

  const { user } = useStateContext()
  
  const [editModal, setEditModal] = useState(false)
  const [profileImage, setProfileImage] = useState(null)
  const fileRef = useRef(null)
  const nomeRef = useRef(null)
  const emailRef = useRef(null)
  const senhaRef = useRef(null)
  const bioRef = useRef(null)
  const telefoneRef = useRef(null)
  const raRef = useRef(null)
  const dataNascimentoRef = useRef(null)


  const handleImageChange = (e) => {

    const file = e.target.files[0]

    setProfileImage(file ? URL.createObjectURL(file) : undefined)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()

    formData.append('nome', nomeRef.current.value)
    formData.append('email', emailRef.current.value)
    formData.append('senha', senhaRef.current.value)
    formData.append('bio', bioRef.current.value)
    formData.append('telefone', telefoneRef.current.value)
    formData.append('ra', raRef.current.value)
    formData.append('data_de_nascimento', dataNascimentoRef.current.value)
    formData.append('foto_perfil', fileRef.current.files[0])

    console.log(formData)

  }

  return (
    <>
      <Modal isOpen={editModal} button={true} isForm={true} onClose={() => setEditModal(e => e = false)} onSubmit={handleSubmit}>
        {/* <div className="grid grid-cols- lg:grid-cols-2 gap-4"> */}
        <div className="flex justify-center items-center p-5 bg-gradient-to-tr from-unifae-green-1 via-unifae-green-2 to-unifae-green-3 h-1/3 md:rounded-t-lg">
        <div className='flex justify-center items-center flex-col gap-5'>
              <div className="relative z-0">
                <img className='rounded-full lg:w-56 lg:h-56 w-28 h-28 border-collapse border-4 border-unifae-green-4 shadow-xl object-cover' src={profileImage ? profileImage : userLogo} alt={user.nome}/> 
                <FontAwesomeIcon icon={faCamera} className='cursor-pointer absolute bottom-0 right-0 md:bottom-2 md:right-6 bg-unifae-green-4 p-2 rounded-full text-white xl:text-2xl' onClick={()=> fileRef.current.click()}/>
                  <input type="file" accept='.jpg, jpeg, png' hidden ref={fileRef} onChange={handleImageChange}/>
              </div>
              <div className='text-unifae-white-1 font-medium text-2xl md:text-3xl'>
                <p>{user.nome}
                </p>
              </div>
            </div>
        </div>
          <div>
            <Input ref={nomeRef}  value={user.nome} label={"Nome"} className={"input-modal"} placholder={"Insira seu nome"}/>
            <TextArea ref={bioRef} label={"Bio"} className={"input-modal resize-none"} name={"bio"} >
            {user.bio}
            </TextArea>
            {/* <Input value={user.email} label={"Email"} className={"input-modal"} /> */}
            {/* <Input label={"Senha"} className={"input-modal"} /> */}
            <Input ref={telefoneRef} mask={"(99) 99999-9999"} value={user.telefone} label={"Telefone"} className={"input-modal"} placholder={"Insira seu telefone"}/>
            <Input ref={dataNascimentoRef} value={user.data_de_nascimento} label={"Data de nascimento"} className={"input-modal"} placholder={"Insira uma data de nascimento"} mask={"99/99/9999"}/>
            {/* <Input value={user.ra} label={"RA"} className={"input-modal"} /> */}
            {/* <Input label={"Confirmar Senha"} className={"input-modal"} /> */}

          </div>
        {/* </div> */}
      </Modal>

      <Container>
        <div className="flex items-center p-5 bg-gradient-to-tr from-unifae-green-1 via-unifae-green-2 to-unifae-green-3 lg:w-[80vw] h-1/3 rounded-t-lg">
          <div className="flex justify-between gap-10 h-full w-full">
            <div className='flex justify-center items-center gap-10'>
              <div className="relative z-0">
                <img className='rounded-full lg:w-56 lg:h-56 w-28 h-28 border-collapse border-4 border-unifae-green-4 shadow-xl' src={userLogo} alt={user.nome}/> 
                
              </div>
              <div className='text-unifae-white-1 font-medium text-2xl md:text-3xl'>
                <p>{user.nome}</p>
                <i className='text-lg'>{user.tipo_usuario == 1 ? "Admin" : user.tipo_usuario == 2 ? "Responsável" : "Usuário"}</i>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="lg:flex flex-col justify-center items-center text-white font-medium hidden"><img className='w-72' src={logoBranca} alt="unifae-logo" /> Intercurso</div>
              <div className="flex gap-5 justify-start items-start">
                <button className='cursor-pointer' onClick={() => setEditModal(e => e = true)}> <FontAwesomeIcon className='text-white text-xl' icon={faPencilAlt} /></button>
                <button className='cursor-pointer'><FontAwesomeIcon className='text-white text-xl' icon={faCog} /></button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-between flex-col md:flex-row p-10 items-center'>
          {/* <dl className="grid grid-cols-1 gap-4">
          <h3 className='pl-2'>Meus dados</h3>
            <dd className="p-2">
              <p className="bg-unifae-green-1 text-white rounded pl-2 flex justify-between items-center gap-5">
                Email
                <span className="bg-white rounded-r p-2 text-unifae-black-1 w-48 inline-block">{user.email}</span>
              </p>
            </dd>
            <dd className="p-2">
              <p className="bg-unifae-green-1 text-white rounded pl-2 flex justify-between items-center gap-5">
                RA
                <span className="bg-white rounded-r p-2 text-unifae-black-1 w-48 inline-block">{user.ra}</span>
              </p>
            </dd>
            <dd className="p-2">
              <p className="bg-unifae-green-1 text-white rounded pl-2 flex justify-between items-center gap-5">
                Curso
                <span className="bg-white rounded-r p-2 text-unifae-black-1 w-48 inline-block">{curso}</span>
              </p>
            </dd>
            <dd className="p-2">
              <p className="bg-unifae-green-1 text-white rounded pl-2 flex justify-between items-center gap-5">
                Telefone
                <span className="bg-white rounded-r p-2 text-unifae-black-1 w-48 inline-block">{user.telefone ? user.telefone : "Sem telefone"}</span>
              </p>
            </dd>
          </dl> */}




          {/* <div className="md:w-1/2">Informações do intercurso</div> */}

        </div>
      </Container>
    </>
  )
}
