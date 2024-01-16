import React, { useState } from 'react'
import { MdOutlineCloudUpload, MdOutlinePets } from "react-icons/md";
import axios from 'axios'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { resetPhotos, setPhotos } from './redux/features/photoSlice';

const PhotoUploader = () => {
    const dispatch = useDispatch()
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
            dispatch(setPhotos([...uploadPhoto.data.DT]))
            setInputDetail({ ...inputDetail, addedPhotos: [...inputDetail.addedPhotos, ...uploadPhoto.data.DT], photoLink: '' })
        } else {
            toast.error('Something went wrong when uploading photo')
        }
    }

    const uploadPhotoLink = async (e) => {
        e.preventDefault()
        let server = await axios.post('/upload-by-link', {
            link: inputDetail.photoLink
        })
        if (server.data.EC === 0) {
            dispatch(setPhotos(server.data.DT))
            setInputDetail({ ...inputDetail, addedPhotos: [...inputDetail.addedPhotos, server.data.DT], photoLink: '' })
        } else if (server.data.EC === -2) {
            toast.error(server.data.EM)
        }
        else {
            toast.error('Something went wrong when uploading photo')
        }
    }

    const handleOnChangeInput = async (value, id) => {
        let copyInputDetail = { ...inputDetail }
        copyInputDetail[id] = value
        setInputDetail(copyInputDetail)
    }

    // console.log(inputDetail.addedPhotos)
    return (
        <>
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
        </>
    )
}

export default PhotoUploader
