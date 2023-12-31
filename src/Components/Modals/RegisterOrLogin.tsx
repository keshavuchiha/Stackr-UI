
import { TextField } from '@mui/material'
import React ,{FormEvent, useState}from 'react'
interface Props {
    type :"Register"|"Login"
    setType:React.Dispatch<React.SetStateAction<"Register" | "Login">>
}
function RegisterOrLogin({type,setType}:Props) {
  const [username,setUserName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [confirmPassword,setConfirmPassword]=useState("");
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    console.log("form sumbitted");
  }
  return (
    <form className='py-3' onSubmit={event=>handleSubmit(event)}>
        <div className=" text-center text-xl text-orange-400 ">{type}</div>
        <div className=" px-6 flex flex-col space-y-4 my-2" >
            <TextField value={username} onChange={e=>setUserName(e.target.value)} label={type==="Login"?"Username/Email":"Username"} color="success" required variant='filled' className='flex-grow'/>
            {type==="Register" && <TextField label="Email" color="success" required variant='filled' type="email" value={email} onChange={e=>setEmail(e.target.value)}/>}
            <TextField label="Password" color="success" required variant='filled' className="flex-grow" type="password" value={password} onChange={e=>setPassword(e.target.value)}/>
            {type==="Register" && <TextField variant="filled" label="Confirm Password" type="password" required color='success' value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />}
            {type==="Login" && <div>
                <div className=' text-green-400'>Forgot your <button className=' text-blue-400 inline'>username</button> or <button className='inline text-blue-400'>password</button></div>
                <div className='text-green-400'>New to AlgoMastery? <button className=' text-blue-400' onClick={()=>setType("Register")}>Register</button></div>
            </div>}
            {type==="Register" && <div>
                <div className=' inline text-green-400'>Already a AlgoMaster?</div> <button className=' text-blue-400' onClick={()=>setType("Login")}>Login</button>
            </div>}
            <button type="submit" className=' bg-green-400 rounded-md shadow-md py-1 text-white text-xl disabled:bg-green-200'>{type}</button>
        </div>
    </form>
  )
}

export default RegisterOrLogin