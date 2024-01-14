import React, { useState, useEffect } from 'react'
import { MdOutlineCloudUpload, MdOutlinePets } from "react-icons/md";
import { CiWifiOn } from "react-icons/ci";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaCar, FaDoorOpen } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";
import axios from 'axios'
import { toast } from 'react-toastify'
const CreatePlace = () => {
    const defaultInputDetail = {
        title: '',
        description: '',
        address: '',
        addedPhotos: [],
        photoLink: '',
        perks: [],
        extraInfo: '',
        checkIn: '',
        checkOut: '',
        maxGuests: 1
    }
    const [inputDetail, setInputDetail] = useState(defaultInputDetail)
    const handleOnChangeInput = async (value, id) => {
        let copyInputDetail = { ...inputDetail }
        copyInputDetail[id] = value
        setInputDetail(copyInputDetail)
    }
    const handleCreatePlace = async (e) => {
        e.preventDefault()
    }

    const uploadPhotoLink = async (e) => {
        e.preventDefault()
        let server = await axios.post('/upload-by-link', {
            link: inputDetail.photoLink
        })
        console.log(server)
        if (server.data.EC === 0) {
            setInputDetail({ ...inputDetail, addedPhotos: [...inputDetail.addedPhotos, server.data.DT], photoLink: '' })
        } else if (server.data.EC === -2) {
            toast.error(server.data.EM)
        }
        else {
            toast.error('Something went wrong when uploading photo')
        }
    }

    const uploadPhoto = async (e) => {
        e.preventDefault()
        const files = e.target.files
        const data = new FormData()
        for (let i = 0; i < files.length; i++) {
            data.append('photos', files[i])
        }
        let uploadPhoto = await axios.post('/upload', data, {
            headers: { 'Content-type': 'multipart/form-data' }
        })
        if (uploadPhoto.data.EC === 0) {
            setInputDetail({ ...inputDetail, addedPhotos: [...inputDetail.addedPhotos, ...uploadPhoto.data.DT], photoLink: '' })
        } else {
            toast.error('Something went wrong when uploading photo')

        }
    }

    return (
        <div className="w-full mb-52">
            <form action="" onSubmit={handleCreatePlace}>
                <label className="text-xl mt-4">Title</label>
                <p className='text-gray-500'>Title for your place, should be short and catchy as advertisement</p>
                <input value={inputDetail.title} onChange={e => handleOnChangeInput(e.target.value, 'title')} className='tw-input w-full' type="text" placeholder='title Eg.My Lovely apt' />
                <label className="text-xl mt-4">Address</label>
                <p className='text-gray-500'>Address for your place</p>
                <input value={inputDetail.address} onChange={e => handleOnChangeInput(e.target.value, 'address')} className='tw-input w-full' type="text" placeholder='address Eg. 122 DG House' />
                <label className="text-xl mt-4">Photo</label>
                <p className='text-gray-500'>More = better</p>
                <div className="flex gap-2">
                    <input value={inputDetail.photoLink} onChange={e => handleOnChangeInput(e.target.value, 'photoLink')} type="text" className='grow tw-input' placeholder='Add using a link ...jpg' />
                    <button onClick={uploadPhotoLink} className='rounded-xl hover:duration-200 hover:bg-gray-400 bg-gray-300 p-3'>Add photo</button>
                </div>
                <div className="grid gap-3 overflow-y-auto grid-cols-3 md:grid-cols-4 lg:grid-cols-5 my-4">
                    {inputDetail.addedPhotos?.length > 0 && inputDetail.addedPhotos.map((item) => (
                        <div key={item} className='w-full '>
                            <div style={{ backgroundImage: `url('http://localhost:4000/uploads/${item}')` }} className="bg-no-repeat bg-cover bg-center rounded-md w-full h-[80px] sm:h-[100px] md:h-[120px] lg:h-[150px]"></div>
                        </div>
                    ))}
                    <label htmlFor='upload' className='border-2 p-8 text-2xl gap-3 hover:duration-200 hover:bg-gray-200 rounded-2xl bg-transparent flex items-center justify-center'>
                        <MdOutlineCloudUpload size={20} /> <span className='hidden sm:block'>Upload</span>
                    </label>
                    <input type="file" multiple id='upload' className='hidden' onChange={uploadPhoto} />
                </div>
                <label className="text-xl mt-4">Description</label>
                <p className='text-gray-500'>Description of the place</p>
                <textarea value={inputDetail.description} onChange={e => handleOnChangeInput(e.target.value, 'description')} className='w-full' name="" id="" cols="30" rows="10"></textarea>
                <label className="text-xl mt-4">Perks</label>
                <p className='text-gray-500'>Select all the perks of the place</p>
                <div className="grid grid-cols-3 mx-auto sm:grid-cols-4 md:grid-cols-6">
                    <div className=" flex gap-1 items-center  bg-white rounded-xl p-2 m-1 border">
                        <input value={inputDetail} onChange={e => handleOnChangeInput(e.target.value, 'wifi')} type="checkbox" className='tw-checkbox' id='wifi' />
                        <label className='flex items-center gap-1' htmlFor="wifi"><CiWifiOn size={25} />Wifi</label>
                    </div>
                    <div className="flex gap-1 items-center  bg-white rounded-xl p-2 m-1 border">
                        <input value={inputDetail} onChange={e => handleOnChangeInput(e.target.value, 'free-parking-lot')} type="checkbox" className='tw-checkbox' id='free-parking-spot' />
                        <label className='flex items-center gap-1' htmlFor="free-parking-spot"><FaCar size={25} />Free parking spot</label>
                    </div>
                    <div className="flex gap-1 items-center  bg-white rounded-xl p-2 m-1 border">
                        <input value={inputDetail} onChange={e => handleOnChangeInput(e.target.value, 'tv')} type="checkbox" className='tw-checkbox' id='tv' />
                        <label className='flex items-center gap-1' htmlFor="tv"><PiTelevisionSimpleBold size={25} />TV</label>
                    </div>
                    <div className="flex gap-1 items-center  bg-white rounded-xl p-2 m-1 border">
                        <input value={inputDetail} onChange={e => handleOnChangeInput(e.target.value, 'pets')} type="checkbox" className='tw-checkbox' id='pets' />
                        <label className='flex items-center gap-1' htmlFor="pets"> <MdOutlinePets size={25} />Pets</label>
                    </div>
                    <div className="flex gap-1 items-center  bg-white rounded-xl p-2 m-1 border">
                        <input value={inputDetail} onChange={e => handleOnChangeInput(e.target.value, 'radio')} type="checkbox" className='tw-checkbox' id='radio' />
                        <label className='flex items-center gap-1' htmlFor="radio"> <FaRadio size={20} />Radio</label>
                    </div>
                    <div className="flex gap-1 items-center  bg-white rounded-xl p-2 m-1 border">
                        <input value={inputDetail} onChange={e => handleOnChangeInput(e.target.value, 'private-entrance')} type="checkbox" className='tw-checkbox' id='private Entrance' />
                        <label className='flex items-center gap-1' htmlFor="private Entrance"><FaDoorOpen size={25} />Private Entrance</label>
                    </div>
                </div>
                <label className="text-xl mt-4">Extra Info</label>
                <p className='text-gray-500'>House rules, etc.</p>
                <textarea value={inputDetail.extraInfo} onChange={e => handleOnChangeInput(e.target.value, 'extraInfo')} className='w-full' name="" id="" cols="30" rows="10"></textarea>
                <label className="text-xl mt-4">Check In&Out times</label>
                <h2 className='text-gray-500'>Add check in and out times, remember to have some windows for clearing windows between guests.</h2>
                <div className="grid sm:grid-cols-3 gap-3">
                    <div className="flex flex-col ">
                        <h3 className='text-xl'>Check in time</h3>
                        <input value={inputDetail.checkIn} onChange={e => handleOnChangeInput(e.target.value, 'checkIn')} type="text" className='tw-input' placeholder='14:00' />
                    </div>
                    <div className="flex flex-col ">
                        <h3 className='text-xl'>Check out time</h3>
                        <input value={inputDetail.checkOut} onChange={e => handleOnChangeInput(e.target.value, 'checkOut')} type="text" className='tw-input' placeholder='21:00' />
                    </div>
                    <div className="flex flex-col ">
                        <h3 className='text-xl'>Max number of guests</h3>
                        <input value={inputDetail.maxGuests} onChange={e => handleOnChangeInput(e.target.value, 'maxGuests')} type="text" className='tw-input' placeholder='6' />
                    </div>
                </div>
                <div className="md:max-w-[200px] mx-auto my-4">
                    <button className='tw-btn-primary w-full '>Save</button>
                </div>
            </form>
        </div>
    )
}

export default CreatePlace
