import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import axios from 'axios'
import { UserDataContext } from '../context/userContext'

const UserSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const navigate = useNavigate()

    const { user, setUser } = React.useContext(UserDataContext)

    const submitHandler = async (e) => {
        e.preventDefault()
        if (firstName.length < 3) {
            toast('First name must be atleast 3 characters long')
            return
        }
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!regex.test(email)) {
            toast('Please enter a valid email address')
            return
        }
        if (password.length < 6) {
            toast('Password must be atleast 6 characters long')
            return
        }
        const newUser = {
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/users/register`, newUser, { withCredentials: true })
            if (response.status === 201) {
                setUser(response.data.user)
                localStorage.setItem('token', response.data.token)
                navigate('/home')
            } else {
                toast(response.data.message || 'Error while registering the user.')
            }
        } catch (error) {
            toast(error.response?.data?.message || 'Something went wrong, please try again.')
        }
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className='p-7 h-screen flex flex-col justify-between'>
            <div>
                <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
                <form onSubmit={e => submitHandler(e)}>
                    <h3 className='text-lg font-medium mb-2'>What's your name</h3>
                    <div className='flex gap-4 mb-6'>
                        <input 
                            required 
                            type="text" 
                            placeholder='First Name' 
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' 
                        />
                        <input  
                            type="text" 
                            placeholder='Last Name' 
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                            className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-lg placeholder:text-base' 
                        />
                    </div>

                    <h3 className='text-lg font-medium mb-2'>What's your email</h3>
                    <input 
                        required 
                        type="email" 
                        placeholder='email@example.com' 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-6' 
                    />

                    <h3 className='text-lg font-medium mb-2'>Enter password</h3>
                    <input 
                        required 
                        type="password" 
                        placeholder='password' 
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-6' 
                    />
                    <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3'>Signup</button>
                </form>

                <p className='text-center'>Already have an account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
            </div>
            <div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.</p>
            </div>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                theme="dark"
            />
        </div>
    )
}

export default UserSignup
