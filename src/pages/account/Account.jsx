import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch, } from 'react-redux'
import axios from 'axios'
import { logout } from '../../redux/features/userSlice'
import Places from './Places/Places'

import AccountNavigation from './AccountNavigation'

const Account = () => {
    const dispatch = useDispatch()
    const location = useLocation()

    const params = useParams()
    const { name, email } = useSelector((state => state.user))
    let [subpage, setSubpage] = useState(undefined)

    const handleLogout = async () => {
        let logoutServer = await axios.post('/logout')
        if (logoutServer.data.EC === 0) {
            dispatch(logout())
        }
    }

    useEffect(() => {
        if (!name) {
            navigate('/')
        }
    }, [name])
    useEffect(() => {
        console.log(location.pathname)

        if (!subpage) {
            params.subpage = 'profile'
        }
        setSubpage(params.subpage)
    }, [params])

    return (
        <div className='w-full bg-slate-100 '>
            <div className=' mx-auto border border-black max-w-screen-lg p-3 justify-between items-center flex flex-col'>
                <AccountNavigation />
                {subpage === 'profile' &&
                    (
                        <>
                            <div className="max-w-lg mx-auto text-2xl p-3 my-5 flex flex-col items-center justify-center">
                                <p>Logged in as <span className='font-semibold'>{name} ({email})</span></p>
                                <button onClick={handleLogout} className='my-4 tw-btn-primary w-full'>Log out</button>
                            </div>
                        </>
                    )
                }
                {subpage === 'places' &&
                    (
                        <Places />
                    )
                }
            </div>
        </div>
    )
}

export default Account
