// signout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SignOut = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Clear authentication data (e.g., remove token)
        localStorage.removeItem("authToken"); // Adjust this if using a different storage key
        navigate("/login"); // Redirect to login page
    }, [navigate]);

    return (
        <div>
            <p>Signing out...</p>
        </div>
    );
};

export default SignOut;
