import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function CaptainLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captainData, setCaptainData] = useState({})
    
    const submitHandler = (e) => {
        e.preventDefault()
        setCaptainData({email: email, password: password});
        setEmail('')
        setPassword('')
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
