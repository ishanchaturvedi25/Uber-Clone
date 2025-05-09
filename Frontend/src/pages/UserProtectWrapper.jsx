import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserProtectWrapper = ({
    children
}) => {

    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const { user, setUser } = useContext(UserDataContext)

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (!token) {
            navigate('/login')
        }

        axios.get(`${import.meta.env.VITE_BASE_URL}/api/users/profile`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.status == 200) {
                setUser(response.data.captain)
                setIsLoading(false)
            } else {
                localStorage.removeItem('token')
                navigate('/login')
            }
        }).catch((error) => {
            localStorage.removeItem('token')
            navigate('/login')
        })
    }, [navigate, setUser])

    if (isLoading) {
        return <div>Loading...</div>
    }

    return <>{children}</>
}

export default UserProtectWrapper
