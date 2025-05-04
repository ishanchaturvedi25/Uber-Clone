import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = ({
    children
}) => {

    const navigate = useNavigate()
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            setChecking(false);
        }
    }, [navigate]);

    if (checking) {
        return <p></p>;
    }

    return <>{children}</>;
}

export default UserProtectWrapper
