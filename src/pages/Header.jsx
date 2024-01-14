import React from 'react'
import { Link } from 'react-router-dom';
import { PiPaperPlane } from "react-icons/pi";
import { IoSearch } from "react-icons/io5";
import { AiOutlineGlobal } from "react-icons/ai";
import { IoMdMenu } from "react-icons/io";
import { FaUserAlt } from "react-icons/fa";
import { useSelector } from 'react-redux';
const Header = () => {
    const { name, email } = useSelector((state) => state.user);
    return (
        <div className=" w-full border-b-2 ">
            <header className=' mx-auto max-w-screen-lg p-3 flex justify-between items-center'>
                <Link to='/' className="flex gap-3 text-primary font-bold items-center">
                    <PiPaperPlane size={40} />
                    <span className='hidden sm:block text-xl'>airbnc</span>
                </Link>
                <div className="flex items-center gap-4 px-3">
                    <div className="shadow-xl shadow-gray-300 px-6 py-3 rounded-full gap-3 flex items-center border ">
                        <div className="after:border-l after:mx-4 after:border-black hidden md:block">Anywhere</div>
                        <div className="after:border-l after:mx-4 after:border-black hidden md:block">Any week</div>
                        <input className="hidden p-2 rounded-full outline-none" />
                        <div className="flex items-center gap-5 ml-3">
                            <div className="hidden md:block">Add guests</div>
                            <div className="p-2 bg-primary text-white rounded-full"><IoSearch size={20} /></div>
                        </div>
                    </div>
                    <div className=" items-center gap-3 hidden md:flex">
                        <p>Airbnb your home</p>
                        <AiOutlineGlobal size={30} />
                    </div>
                    <div className="flex items-center shadow-xl border gap-3 rounded-full px-3 py-3">
                        <div className="">
                            <IoMdMenu size={30} />
                        </div>
                        <Link to={name ? '/account/profile' : '/login'} className="rounded-full bg-gray-400 p-1 overflow-hidden">
                            <FaUserAlt size={20} />
                        </Link>
                        {name &&
                            <span className='hidden sm:block text-lg font-semibold'>{name}</span>
                        }
                    </div>
                </div>
            </header>
        </div>

    )
}

export default Header
