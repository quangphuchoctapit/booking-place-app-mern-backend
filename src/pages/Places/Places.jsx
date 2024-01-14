import React, { useState, useEffect } from 'react'
import { FaPlus } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom';

import CreatePlace from './CreatePlace';
const Places = () => {
    const params = useParams()
    const action = params?.action
    useEffect(() => {
        if (action === 'new') {
            // console.log('new');
        }
    }, [params])
    return (
        <>
            {action !== 'new' &&
                <div className="max-w-lg mx-auto text-2xl p-3 my-5 flex flex-col items-center justify-center">
                    <Link to='/account/places/new' className='px-6 py-2 gap-2 rounded-full bg-primary inline-flex items-center justify-center text-white text-lg hover:duration-200 hover:bg-white hover:text-primary border-primary border'>
                        <FaPlus />
                        Add new place
                    </Link>
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
