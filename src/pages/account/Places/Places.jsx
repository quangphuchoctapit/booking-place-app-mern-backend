import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';
import CreatePlace from './CreatePlace';
import axios from 'axios'
import { toast } from 'react-toastify';
const Places = () => {
    const params = useParams()
    const action = params?.action
    const [places, setPlaces] = useState({})

    useEffect(() => {
        const fetchAllPlaces = async () => {
            let server = await axios.get('/places')
            if (server?.data.EC === 0) {
                setPlaces(server.data.DT)
            } else {
                toast.error('Something went wrong')
            }
        }
        fetchAllPlaces()
    }, [])
    // console.log(places)

    return (
        <>
            {action !== 'new' &&
                <div className=" mx-auto text-2xl p-3 my-5 flex flex-col items-center justify-center">
                    <Link to='/account/places/new' className='px-6 py-2 gap-2 rounded-full bg-primary inline-flex items-center justify-center text-white text-lg hover:duration-200 hover:bg-white hover:text-primary border-primary border'>
                        <FaPlus />
                        Add new place
                    </Link>
                    {places?.length > 0 && places.map((item) => (
                        <Link to={`/account/places/${item._id}`} key={item._id} className='p-3 bg-gray-200 rounded-xl hover:duration-200 hover:scale-105 hover:bg-gray-300 flex my-5 gap-3 items-center overflow-auto'>
                            <div className=" w-32 h-32 grow shrink-0">
                                <div style={{ backgroundImage: `url('http://localhost:4000/uploads/${item.photos[0]}')` }} className="bg-center bg-no-repeat bg-cover w-full h-full"></div>
                            </div>
                            <div className="flex flex-col gap-2 grow-0 shrink-0 max-w-2xl">
                                <h1 className='font-semibold'>{item.title}</h1>
                                <div className='line-clamp-3'>
                                    <p className='whitespace-pre-line'>{item.description}</p>
                                </div>
                            </div>
                        </Link>

                    ))}
                </div>
            }
            {action === 'new' &&
                <>
                    <CreatePlace />
                </>
            }
        </>
    )
}

export default Places
