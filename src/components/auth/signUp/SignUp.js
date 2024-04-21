import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/authContext';
import { doCreateUserWithEmailAndPassword } from '../../../firebase/auth';
import { toast } from "sonner";
import { set } from 'firebase/database';


const SignUp = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const { userLoggedIn } = useAuth();

    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match.');
            return;
        }
        if (password.length < 6) {
            setErrorMessage('Password should be at least 6 characters.');
            return;
        }
        setIsRegistering(true);
        try {
            await doCreateUserWithEmailAndPassword(email, password);

            toast.success("Account created successfully! You can now log in.");
            setEmail('')
            setConfirmPassword('')
            setPassword('')
        } catch (error) {
            console.error('Registration error:', error);
            setErrorMessage(error.message);
        } finally {
            setIsRegistering(false);
        }
    };



    return (
        <>

            <main className="w-full h-screen flex self-center place-content-center place-items-center">
                <div className="w-1/4 text-gray-600 space-y-5 p-4 shadow-xl border rounded-xl">
                    <div className="text-center mb-6">
                        <h3 className=" font-body text-sky-900 text-xl font-semibold sm:text-2xl">Create a New Account</h3>
                    </div>
                    <form onSubmit={onSubmit} className="space-y-4">
                        <div>
                            <label className="text-sm text-gray-600 font-bold font-body">Email</label>
                            <input
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="font-body w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        <div>
                            <label className="text-sm text-gray-600 font-bold font-body">Password</label>
                            <input
                                type="password"
                                autoComplete="new-password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className=" font-body w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        <div>
                            <label className=" font-body text-sm text-gray-600 font-bold">Confirm Password</label>
                            <input
                                type="password"
                                autoComplete="off"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className=" font-body w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg transition duration-300"
                            />
                        </div>
                        {errorMessage && <span className="text-red-600 font-bold">{errorMessage}</span>}
                        <button
                            type="submit"
                            disabled={isRegistering}
                            className={` font-body w-full px-4 py-2 text-white font-medium rounded-lg ${isRegistering ? 'bg-gray-300 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-xl transition duration-300'}`}
                            style={{ backgroundColor: "#6254B6" }}
                        >
                            {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        </button>
                        <div className="text-sm font-body text-center">
                            Already have an account? {' '}
                            <Link to={'/login'} className="hover:underline font-bold font-body">Login</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
};

export default SignUp;
