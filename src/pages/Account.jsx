import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { logout } from '../redux/features/userSlice'
import Places from '../pages/Places/Places'
import { CiUser } from "react-icons/ci";
import { BsHouse } from "react-icons/bs";
import { TfiMenuAlt } from "react-icons/tfi";

const Account = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { name, email } = useSelector((state => state.user))
    let [subpage, setSubpage] = useState(undefined)
    const params = useParams()

    useEffect(() => {
        if (!name) {
            navigate('/')
        }
    }, [name])
    useEffect(() => {
        if (!subpage) {
            params.subpage = 'profile'
        }
        setSubpage(params.subpage)
    }, [params])

    function linkClasses(type = null) {
        let classes = 'px-6 py-2 rounded-full inline-flex items-center justify-center gap-2'
        if (type === subpage) {
            classes += ' bg-primary text-white'
        }
        return classes
    }

    const handleLogout = async () => {
        let logoutServer = await axios.post('/logout')
        if (logoutServer.data.EC === 0) {
            dispatch(logout())
        }
    }

    return (
        <div className='w-full bg-slate-100 '>
            <div className=' mx-auto border border-black max-w-screen-lg p-3 justify-between items-center flex flex-col'>
                <nav className="flex mx-auto p-3 justify-center items-center gap-5">
                    <Link to='/account/profile' className={linkClasses('profile')}><CiUser size={25} /><span className='hidden sm:block'>My profile</span></Link>
                    <Link to='/account/bookings' className={linkClasses('bookings')}><TfiMenuAlt size={25} /><span className='hidden sm:block'>My bookings</span></Link>
                    <Link to='/account/places' className={linkClasses('places')}><BsHouse size={25} /><span className='hidden sm:block'>My accomodations</span></Link>
                </nav>
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
