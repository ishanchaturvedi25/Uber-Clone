import React, { useContext, useEffect, useState } from 'react'
import { CaptainDataContext } from '../context/CaptainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const CaptainProtectWrapper = ({
    children
}) => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const { captain, setCaptain } = useContext(CaptainDataContext)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/captain-login')
        }
        axios.get(`${import.meta.env.VITE_BASE_URL}/api/captains/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status == 200) {
                setCaptain(response.data.captain)
                setIsLoading(false)
            } else {
                localStorage.removeItem('token')
                navigate('/captain-login')
            }
        }).catch((error) => {
            localStorage.removeItem('token')
            navigate('/captain-login')
        })
    }, [navigate, setCaptain])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}

export default CaptainProtectWrapper
