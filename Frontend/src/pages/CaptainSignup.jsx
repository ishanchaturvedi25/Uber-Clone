import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const CaptainSignup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')

    const [vehicleColor, setVehicleColor] = useState('')
    const [vehicleNumber, setVehicleNumber] = useState('')
    const [vehicleCapacity, setVehicleCapacity] = useState('')
    const [vehicleType, setVehicleType] = useState('')

    const { captain, setCaptain } = useContext(CaptainDataContext)

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()
        if (firstName.length < 3) {
            toast.error("Password must be atleast 3 characters long")
            return
        }
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
        if (!regex.test(email)) {
            toast.error("Please enter a valid email address")
            return
        }
        if (password.length < 6) {
            toast.error("Password must be atleast 6 characters long")
            return
        }
        if (vehicleColor.length < 3) {
            toast.error("Vehicle color must be atleast 3 characters long")
            return
        }
        if (vehicleNumber.length < 3) {
            toast.error("Vehicle number must be atleast 3 characters long")
            return
        }
        if (vehicleCapacity < 3) {
            toast.error("Vehicle capacity must be atleast 1")
            return
        }
        const newCaptain = {
            fullName: {
                firstName: firstName,
                lastName: lastName
            },
            email: email,
            password: password,
            vehicle: {
                color: vehicleColor,
                type: vehicleType,
                capacity: vehicleCapacity,
                number: vehicleNumber
            }
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/captains/register`, newCaptain, {
                withCredentials: true
            })
            if (response.status == 201) {
                setCaptain(response.data.captain)
                localStorage.setItem('token', response.data.token)
                navigate('/captain-home')
            } else {
                toast.error(response.data.message || 'Error while registering captain')
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong, please try again.")
        }

        setFirstName('')
        setLastName('')
        setEmail('')
        setPassword('')
        setVehicleColor('')
        setVehicleNumber('')
        setVehicleCapacity('')
        setVehicleType('')
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

                    <h3 className='text-lg font-medium mb-2'>Enter vehicle information</h3>
                    <div className='flex gap-4 mb-7'>

                        <div>
                            <input 
                                required 
                                type="text" 
                                placeholder='Vehicle Color' 
                                value={vehicleColor}
                                onChange={e => setVehicleColor(e.target.value)}
                                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-6' 
                            />
                            
                            <input 
                                required 
                                type="text" 
                                placeholder='Vehicle Number' 
                                value={vehicleNumber}
                                onChange={e => setVehicleNumber(e.target.value)}
                                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-6' 
                            />
                        </div>

                        <div>
                            <input 
                                required 
                                type="number" 
                                placeholder='Vehicle Capacity' 
                                value={vehicleCapacity}
                                onChange={e => setVehicleCapacity(Number(e.target.value))}
                                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-6' 
                            />
                            
                            <select 
                                required 
                                name="vehicleType" 
                                className='bg-[#eeeeee] rounded px-4 py-2 border w-full text-lg placeholder:text-base mb-6' 
                                value={vehicleType} 
                                onChange={e => setVehicleType(e.target.value)}
                            >
                                <option value="0">Select vehicle type</option>
                                <option value="car">Car</option>
                                <option value="motorcycle">Moto</option>
                                <option value="auto">Auto</option>
                            </select>
                        </div>
                    </div>

                    <button className='bg-[#111] text-white font-semibold rounded px-4 py-2 w-full text-lg placeholder:text-base mb-3'>Signup</button>
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
