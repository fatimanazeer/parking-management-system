import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authContext';
import { doSignOut } from '../../firebase/auth';
import { Button } from 'antd';
const Header = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const handleLogin = () => {
        navigate('/login');
    };
    const handleRegister = () => {
        navigate('/register');
    };
    return (
        <nav className='flex flex-row justify-between items-center w-full z-20 fixed top-0 left-0 h-16 border-b bg-white px-4'>
            <span className='font-body'>Parking Lot Management System</span>
            <div className="flex gap-x-2">
                {userLoggedIn ? (
                    <Button
                        onClick={() => doSignOut().then(() => navigate('/login'))}
                        style={{ backgroundColor: "#6254B6" }}
                        className='font-body text-white'
                        type="primary"
                    >
                        Logout
                    </Button>
                ) : (
                    <>
                        <Button
                            style={{ backgroundColor: "#6254B6" }}
                            className='font-body text-white'
                            type="primary"
                            onClick={handleLogin}
                        >
                            Login
                        </Button>
                        <Button
                            style={{ backgroundColor: "#6254B6" }}
                            className='text-white font-body'
                            type="primary"
                            onClick={handleRegister}
                        >
                            Sign Up
                        </Button>
                    </>
                )}
            </div>
        </nav>
    );
};
export default Header;