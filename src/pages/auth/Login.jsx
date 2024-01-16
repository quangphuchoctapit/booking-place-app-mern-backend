import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { setUserInfo } from '../../redux/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async (e) => {
        e.preventDefault()
        let user = await axios.post('/login', {
            email,
            password
        })
        switch (user?.data?.EC) {
            case 0:
                toast.success(`Hello, ${user.data.DT.userData.name}`)
                let { name, email } = user.data.DT.userData
                let { token } = user.data.DT
                dispatch(setUserInfo({ name, email, token }));
                navigate('/')
                break
            case -1:
                toast.warning(user.data.EM)
                break
            case -2:
                toast.warning(user.data.EM)
                break
            case -3:
                toast.warning(user.data.EM)
                break
            default:
                break
        }
    }

    return (
        <div className="h-screen flex items-center justify-center">
            <div className='mb-48 w-[300px] sm:w-[400px] md:w-[500px] border max-w-lg mx-auto p-3 rounded-lg shadow-2xl flex flex-col justify-center items-center'>
                <h1 className='text-3xl font-bold'>Login</h1>
                <form onSubmit={handleLogin} action="" className='flex items-center flex-col w-full'>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder='Email' className='tw-input w-full' />
                    <input onChange={e => setPassword(e.target.value)} value={password} type="password" placeholder='Password' className='tw-input w-full' />
                    <button className='w-full tw-btn-primary my-3'>Login</button>
                    <div className="my-3">
                        <span>Don't have an account? <Link to='/register' className=' font-semibold text-primary'>Register</Link></span>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default Login
