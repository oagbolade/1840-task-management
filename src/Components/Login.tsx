'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginCredentials } from '@/mocks/login';
import { CompanyLogo } from './Images';

export const Login = () => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (!username || !password) {
            setError('Username and password are required');
            return;
        }
        
        if (username === loginCredentials.username && password === loginCredentials.password) {
            router.push('/');
        } else {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8">
            <div className="space-y-6">
                <div className='flex justify-center items-center flex-col'>
                    <h5 className="text-xl font-medium text-gray-900 mb-3">Sign in to our platform</h5> <CompanyLogo />
                </div>
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div>
                        <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                        <input type="text" name="username" id="username" value={username} onChange={(e) => setUsername(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="john123" />
                    </div>
                    <div className='mt-5'>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Your password</label>
                        <input type="password" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
                    </div>
                    <button type="submit" className="mt-10 w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login to your account</button>
                </form>
            </div>
        </div>
    );
};
