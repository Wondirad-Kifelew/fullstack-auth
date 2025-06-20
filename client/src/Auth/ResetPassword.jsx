import axios from './axiosInstance'
import  { useState } from 'react'
import { useContext } from 'react'
import {useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { AppContext } from './AppContextHelper'
import { useEffect } from 'react'

const ResetPassword = () => {
  const {setLoggedUser} = useContext(AppContext)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token'); 

  const [newPass, setNewPass] = useState('')
  const [confirmNewPass, setConfirmNewPass] = useState('')

  const handleResetPass = async (e) => {
    e.preventDefault()
   
    const validPass = (newPass === confirmNewPass &&
                       newPass.length >=8 )
      
      if(validPass){
      try {
        const response = await axios.post('/api/reset-password',{newPassword: newPass, token: token})
        console.log("resetPass success response: ", response)
        setNewPass('')
        setConfirmNewPass('')
        toast.success("Password reset successful!")//log the user automatically//logged user should be a in context file  
        navigate('/')
      
        if(response){
                      setLoggedUser(response.data.username)
                      // window.localStorage.setItem("isLoggedIn", true)
                      toast.success(`${response.data.username} successfully logged in!`)
                  }
      } catch (error) {
      console.log("pass reset sending failed: ", error.response)
      if(error.response.data.error === "jwt expired")
       toast.error("Token expired. Please resend email!")
      }  
      }else{
        if(newPass !== confirmNewPass){
          toast.error("The passwords don't match!")
        }else if (newPass.length <=8){
          toast.error("password must be atleast 8 characters long!")
        }
      }                    
  }
  useEffect(() => {
      const fetchUser = async ()=>{
          try {
          const response = await axios.post('/api/me')
          if(response.data.username){
              setLoggedUser(response.data.username)
          }    
          } catch (error) {
              console.log("error: ", error.response.data)
              setLoggedUser(null)
          }
      }
      fetchUser()
    }, [])
  return (
    
   <div className='fixed inset-0 z-50 flex items-center justify-center
                bg-gray-500'>
     <div className='p-4 rounded bg-white text-gray-700 relative max-w-100 mx-5 w-full'>
      <h1  className='text-2xl font-semibold mb-4 border-b py-5'>
        Reset Password 
      </h1>
      <form onSubmit={(e)=>handleResetPass(e)} className='flex flex-col gap-1'>
      <div className='flex gap-2  items-center '>
        <p className='align-left'>New Password: </p>
        <input value={newPass} onChange={(e)=>setNewPass(e.target.value)} type="text" placeholder='New pass'
        className='bg-gray-300 px-1 py-2 flex-1' required/>
      </div>
      <div className='flex gap-2 items-center'>
        <p className='align-left'>Confirm Password:</p>
        <input value={confirmNewPass} onChange={(e)=>setConfirmNewPass(e.target.value)} type="text" placeholder='Confirm pass' 
        className='bg-gray-300 px-1 py-2 flex-1' required/>
      </div>
      <div className='my-3 flex justify-end gap-3 mr-3'>
      <button type='submit' 
      className='bg-blue-600 text-white rounded px-3 py-2 hover:bg-blue-600/90 cursor-pointer'>
        Submit</button>
      <button onClick={(e) => {e.preventDefault() ,navigate('/')}} 
      className='border border-blue-600 bg-white text-blue-600 rounded px-3 py-2 cursor-pointer'>
        Cancel</button>
    
      </div>
      </form>
      <div></div>
     </div>
    </div>
  )
}

export default ResetPassword
