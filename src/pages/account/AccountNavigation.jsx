import React, { useEffect, useState } from 'react'
import { CiUser } from "react-icons/ci";
import { BsHouse } from "react-icons/bs";
import { TfiMenuAlt } from "react-icons/tfi";
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


const AccountNavigation = () => {
    const navigate = useNavigate()
    const location = useLocation()

    let [subpage, setSubpage] = useState(undefined)
    const params = useParams()

    const { name, email } = useSelector((state => state.user))


    useEffect(() => {
        if (!name) {
            navigate('/')
        }
    }, [name])
    useEffect(() => {
        // console.log(location.pathname)
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

    return (
        <nav className="flex mx-auto p-3 justify-center items-center gap-5">
            <Link to='/account/profile' className={linkClasses('profile')}><CiUser size={25} /><span className='hidden sm:block'>My profile</span></Link>
            <Link to='/account/bookings' className={linkClasses('bookings')}><TfiMenuAlt size={25} /><span className='hidden sm:block'>My bookings</span></Link>
            <Link to='/account/places' className={linkClasses('places')}><BsHouse size={25} /><span className='hidden sm:block'>My accomodations</span></Link>
        </nav>
    )
}

export default AccountNavigation
