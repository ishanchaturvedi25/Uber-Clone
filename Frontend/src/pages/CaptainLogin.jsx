import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import axios from "axios"
import { CaptainDataContext } from "../context/CaptainContext"

const CaptainLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate()

    const { setCaptain } = useContext(CaptainDataContext)
    
    const submitHandler = async (e) => {
        e.preventDefault()
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!regex.test(email)) {
            toast.error("Please enter a valid email address")
            return
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/api/captains/login`,
                { email, password },
                { withCredentials: true }
            )
    
            if (response.status == 200) {
                setCaptain(response.data.user)
                localStorage.setItem("token", response.data.token)
                navigate("/captain-home")
            } else {
                toast.error(response.data.message || 'Error while loging in captain')
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong, please try again.")
        }

        setEmail("")
        setPassword("")
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
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

                <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-600'>Register as a Captain</Link></p>
            </div>
            <div>
                <Link to='/login' className='bg-[#d5622d] flex items-center justify-center text-white font-semibold rounded px-4 py-2 w-full text-lg placeholder:text-base mb-5'>Sign in as User</Link>
            </div>
        </div>
    )
}

export default CaptainLogin
