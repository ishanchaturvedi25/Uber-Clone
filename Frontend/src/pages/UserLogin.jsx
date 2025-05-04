import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'

const UserLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const { user, setUser } = useContext(UserDataContext)
    
    const submitHandler = async (e) => {
        e.preventDefault()
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!regex.test(email)) {
            toast('Please enter a valid email address')
            return
        }

        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/login`, {email, password}, { withCredentials: true })

        if (response.status == 200) {
            setUser(response.data.user)
            localStorage.setItem('token', response.data.token)
            navigate('/home')
        }
        setEmail('')
        setPassword('')
    }
    
    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <form onSubmit={e => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input 
                        required 
                        type="email" 
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        placeholder='email@example.com' 
                        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7' 
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter password</h3>
                    <input 
                        required 
                        type="password" 
                        placeholder='password' 
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value)
                        }}
                        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-7' 
                    />
                    <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3'>Login</button>
                </form>

                <p className='text-center'>New here? <Link to='/signup' className='text-blue-600'>Create new Account</Link></p>
            </div>
            <div>
                <Link to='/captain-login' className='bg-[#10b461] flex items-center justify-center text-white font-semibold rounded px-4 py-2 w-full text-lg placeholder:text-base mb-5'>Sign in as Captain</Link>
            </div>
            <ToastContainer />
        </div>
    )
}

export default UserLogin
