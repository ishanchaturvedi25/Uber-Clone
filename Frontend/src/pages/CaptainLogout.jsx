import React, { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CaptainLogout = () => {
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/captains/logout`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status === 200) {
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        }).catch((error) => {
            navigate('/captain-login')
        })
    }, [])

    return <div>Logging out...</div>
}

export default CaptainLogout
