import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    const handleRegister = async (e) => {
        e.preventDefault()
        let newUser = await axios.post('/register', {
            name, email, password
        })
        if (newUser?.data.EC === 0) {
            toast.success(`Hello, ${newUser.data.DT.name}`)
        } else if (newUser?.data.EC === -1) {
            toast.warning(newUser.data.EM)
        } else if (newUser?.data.EC === -2) {
            toast.warning(newUser.data.EM)
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className='mb-48 w-[300px] sm:w-[400px] md:w-[500px] border max-w-lg mx-auto p-3 rounded-lg shadow-2xl flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold'>Register</h1>
                <form onSubmit={handleRegister} action="" className='flex items-center flex-col w-full'>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='Email' className='tw-input w-full' />
                    <input value={name} onChange={e => setName(e.target.value)} type="text" placeholder='Name' className='tw-input w-full' />
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" placeholder='Password' className='tw-input w-full' />
                    <button className='w-full tw-btn-primary my-3'>Register</button>
                    <div className="my-3">
                        <span>Already have an account? <Link to='/login' className=' font-semibold text-primary'>Login</Link></span>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Register
