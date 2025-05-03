import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CaptainSignup() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [captainData, setCaptainData] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()
        setCaptainData({
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password
        })
        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
    }

    return (
        <div className='py-5 px-5 h-screen flex flex-col justify-between'>
            <div>
            <img className='w-20 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
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
                            required 
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
                    <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3'>Login</button>
                </form>

                <p className='text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
            </div>
            <div>
                <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy</span> and <span className='underline'>Terms of Service</span> apply.</p>
            </div>
        </div>
    )
}

export default CaptainSignup
