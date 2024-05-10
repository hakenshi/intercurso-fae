import { faCog, faHeart, faPencil, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import userLogo from "../../assets/blank-profile-picture-973460_640.png";
import logoBranca from "../../assets/logo-unifae-2021-branca.png";
import React, { useState } from 'react'
import { useStateContext } from '../../Contexts/ContextProvider';
import { Link, Navigate } from 'react-router-dom';
import { Container } from '../../Components/Container';
import { Modal } from '../../Components/Modal';
import ReactInputMask from 'react-input-mask';
import { Input } from '../../Components/Inputs/Input';
import { FileInput } from '../../Components/Inputs/FileInput';

export const Perfil = () => {

  const { user } = useStateContext()

  const [editModal, setEditModal] = useState(false)
  const [image, setImage] = useState("")
  const [imagePreview, setImagePreview] = useState("")


  return (
    <>
      <Modal isOpen={editModal} button={true} isForm={true} onClose={()=> setEditModal(e => e = false)} texto={"Editar perfil"}>
        <Input value={user.nome} label={"Nome"} className={"input-modal"}/>
        <Input value={user.email} label={"Email"} className={"input-modal"}/>
        <Input label={"Senha"} className={"input-modal"}/>
        <Input label={"Confirmar Senha"} className={"input-modal"}/>
        <Input value={user.telefone} label={"Telefone"} className={"input-modal"}/>
        <Input value={user.ra} label={"RA"} className={"input-modal"}/>
        <FileInput />
      </Modal>

      <Container>
        <div className="flex items-center p-5 bg-gradient-to-tr from-unifae-green-4 via-unifae-green-2 via-60% to-unifae-green-3 w-full h-1/3 rounded-t-lg">
          <div className="flex justify-between gap-10 w-full">
            <div className='flex justify-center items-center gap-10'>
              <img className='rounded-full lg:w-52 lg:h-52 md:h-24 md:w-24 ' src={userLogo} alt={user.nome} />
              <div className='text-unifae-white-1 font-medium text-2xl md:text-3xl'>
                <p>{user.nome}</p>
                <i className='text-lg'>{user.tipo_usuario == 1 ? "Admin" : user.tipo_usuario == 2 ? "Responsável" : "Usuário"}</i>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="flex flex-col justify-center items-center text-white font-medium"><img className='w-72' src={logoBranca} alt="unifae-logo" /> Intercurso</div>
              <a className='cursor-pointer' onClick={()=> setEditModal(e => e = true)}> <FontAwesomeIcon className='text-white text-xl' icon={faPencilAlt} /></a>
              <a><FontAwesomeIcon className='text-white text-xl' icon={faCog} /></a>
            </div>
          </div>
        </div>
        <div className='flex justify-between flex-col md:flex-row p-10 items-center'>
          <div className="md:w-1/2">
            <h3 className='p-2'>Informacoes do usuário</h3>
            <dl className="grid grid-cols-1 gap-4">
              <dd className="p-2">
                <p className="bg-unifae-green-1 text-white rounded py-1 px-2 flex justify-between items-center gap-5">
                  Email
                  <span className="bg-white p-2 text-unifae-black-1 w-44 rounded-sm">{user.email}</span>
                </p>
              </dd>
              <dd className="p-2">
                <p className="bg-unifae-green-1 text-white rounded py-1 px-2 flex justify-between items-center gap-5">
                  RA
                  <span className="bg-white p-2 text-unifae-black-1 w-44 rounded-sm">{user.ra}</span>
                </p>
              </dd>
              <dd className="p-2">
                <p className="bg-unifae-green-1 text-white rounded py-1 px-2 flex justify-between items-center gap-5">
                  Telefone
                  <span className="bg-white p-2 text-unifae-black-1 w-44 rounded-sm">{user.telefone}</span>
                </p>
              </dd>
            </dl>

          </div>
          <div className="md:w-1/2">Informações do intercurso</div>
          
        </div>
      </Container>
    </>
  )
}
