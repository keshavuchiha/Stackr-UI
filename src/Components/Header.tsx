
import React, { useState } from 'react'
import RegisterOrLogin from './Modals/RegisterOrLogin'
import { Modal } from '@mui/material';
// import Algomastery from "../../public/Algomastery.png"
function Header() {
    const [type,setType]=useState<"Register"|"Login">("Register");
    const [modalOpen,setModalOpen]=useState(false);
    const handleClose=()=>setModalOpen(false);
    return (
        <div className='sticky h-16 flex flex-row justify-between align-middle px-4 space-x-3'>
            <img src="Algomastery.png" alt="Main Logo" className=' h-12 my-auto' />
            <div className='flex flex-row space-x-4 w-1/5 text-center'>

                <div className='flex-grow h-full flex flex-col border-b-2 border-transparent hover:border-green-400 hover:bg-gray-200 hover:rounded-t-lg'>
                    <div className='my-auto align-middle text-green-600 '>
                        Problems
                    </div>
                </div>

                <div className='flex-grow h-full flex flex-col border-b-2 border-transparent hover:border-green-400'>
                    <div className='my-auto align-middle text-green-600 '>
                        Contest
                    </div>
                </div>
            </div>
            <div className="flex-grow my-auto">Search</div>
            <div className=' h-full flex text-center flex-row space-x-4'>
                <div className="align-middle my-auto flex flex-row space-x-2">
                    <div className=' cursor-pointer' onClick={()=>{
                        setModalOpen(true);
                        setType("Register");
                    }}>
                        Register
                    </div>
                    <div>
                    or
                    </div>
                    
                    <div className=' cursor-pointer' onClick={()=>{
                        setModalOpen(true);
                        setType("Login");
                    }}>
                        Login
                    </div>
                </div>
                <button className="my-auto bg-green-200  text-green-800 rounded-md shadow-md px-2 py-1">
                    Premium
                </button>
                
            </div>
            <Modal open={modalOpen} className=' absolute' onClose={handleClose}>
                    <div className="z-10 w-1/3 border-none outline-none ring-0 relative top-1/4 left-1/3  bg-white rounded-md">
                        <RegisterOrLogin type={type} setType={setType}/>
                    </div>  
            </Modal>
        </div>
    )
}

export default Header