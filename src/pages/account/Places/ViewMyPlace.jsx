import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { MdOutlinePets } from "react-icons/md";
import { CiWifiOn } from "react-icons/ci";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { FaCar, FaDoorOpen } from "react-icons/fa";
import { FaRadio } from "react-icons/fa6";
import axios from 'axios'
import { toast } from 'react-toastify'
import PhotoUploader from '../../../PhotoUploader';
import { useDispatch, useSelector } from 'react-redux';
import AccountNavigation from '../AccountNavigation'
import { resetPhotos } from '../../../redux/features/photoSlice';

const ViewMyPlace = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const photosRedux = useSelector((state) => state.photo.photos)
    const token = useSelector((state) => state.user.token)

    const persistCookie = async () => {
        await axios.post('/persist-token', { token })
    }

    useEffect(() => {
        persistCookie()
    }, [])

    useEffect(() => {
        setInputDetail({ ...inputDetail, addedPhotos: photosRedux })
    }, [photosRedux])
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

    useEffect(() => {
        dispatch(resetPhotos())
    }, [location.pathname])


    const handleOnChangeInput = async (value, id) => {
        let copyInputDetail = { ...inputDetail }
        copyInputDetail[id] = value
        setInputDetail(copyInputDetail)
    }

    const handleOnChangePerks = (event, perk) => {
        let { checked } = event.target;

        // Use the previous state to update the array
        setInputDetail(prevInputDetail => {
            let selectedPerks = [...prevInputDetail.perks]; // Copy the previous array

            if (checked) {
                selectedPerks.push(perk);
                console.log(selectedPerks);
            } else {
                // Use filter to remove the unchecked perk
                selectedPerks = selectedPerks.filter(selectedPerk => selectedPerk !== perk);
                console.log(selectedPerks);
            }

            // Return the updated state
            return { ...prevInputDetail, perks: selectedPerks };
        });
    };

    const handleViewMyPlace = async (e) => {
        e.preventDefault()
        let { title, description, address, addedPhotos: photos, perks, extraInfo, checkIn, checkOut, maxGuests } = inputDetail

        let server = await axios.post('/places', { title, description, address, photos, perks, extraInfo, checkIn, checkOut, maxGuests })
        if (server.data.EC === 0) {
            toast.success('Create new place successfully!')
            navigate('/account/places')
        } else {
            toast.warning(server.data.EM)
        }
    }

    return (
        <>
            <AccountNavigation />
            <div className="lg:mx-auto mx-5 max-w-screen-xl  mb-52">
                <form action="" onSubmit={handleViewMyPlace}>
                    <label className="text-xl mt-4">Title</label>
                    <p className='text-gray-500'>Title for your place, should be short and catchy as advertisement</p>
                    <input value={inputDetail.title} onChange={e => handleOnChangeInput(e.target.value, 'title')} className='tw-input w-full' type="text" placeholder='title Eg.My Lovely apt' />
                    <label className="text-xl mt-4">Address</label>
                    <p className='text-gray-500'>Address for your place</p>
                    <input value={inputDetail.address} onChange={e => handleOnChangeInput(e.target.value, 'address')} className='tw-input w-full' type="text" placeholder='address Eg. 122 DG House' />
                    <PhotoUploader inputDetail={inputDetail} />
                    <label className="text-xl mt-4">Description</label>
                    <p className='text-gray-500'>Description of the place</p>
                    <textarea value={inputDetail.description} onChange={e => handleOnChangeInput(e.target.value, 'description')} className='w-full' name="" id="" cols="30" rows="10"></textarea>
                    <label className="text-xl mt-4">Perks</label>
                    <p className='text-gray-500'>Select all the perks of the place</p>
                    <div className="grid grid-cols-2 mx-auto sm:grid-cols-4 md:grid-cols-6">
                        <div className=" flex gap-1 items-center min-h-[100px] bg-white rounded-xl p-2 m-1 border">
                            <input onChange={(e) => handleOnChangePerks(e, 'wifi')} value={inputDetail} type="checkbox" className='tw-checkbox' id='wifi' />
                            <label className='flex items-center gap-1' htmlFor="wifi"><CiWifiOn size={25} />Wifi</label>
                        </div>
                        <div className="flex gap-1 items-center min-h-[100px] bg-white rounded-xl p-2 m-1 border">
                            <input onChange={(e) => handleOnChangePerks(e, 'parking-spot')} value={inputDetail} type="checkbox" className='tw-checkbox' id='free-parking-spot' />
                            <label className='flex items-center gap-1' htmlFor="free-parking-spot"><FaCar size={25} />Free parking spot</label>
                        </div>
                        <div className="flex gap-1 items-center min-h-[100px] bg-white rounded-xl p-2 m-1 border">
                            <input onChange={(e) => handleOnChangePerks(e, 'tv')} value={inputDetail} type="checkbox" className='tw-checkbox' id='tv' />
                            <label className='flex items-center gap-1' htmlFor="tv"><PiTelevisionSimpleBold size={25} />TV</label>
                        </div>
                        <div className="flex gap-1 items-center min-h-[100px] bg-white rounded-xl p-2 m-1 border">
                            <input onChange={(e) => handleOnChangePerks(e, 'pets')} value={inputDetail} type="checkbox" className='tw-checkbox' id='pets' />
                            <label className='flex items-center gap-1' htmlFor="pets"> <MdOutlinePets size={25} />Pets</label>
                        </div>
                        <div className="flex gap-1 items-center min-h-[100px] bg-white rounded-xl p-2 m-1 border">
                            <input onChange={(e) => handleOnChangePerks(e, 'radio')} value={inputDetail} type="checkbox" className='tw-checkbox' id='radio' />
                            <label className='flex items-center gap-1' htmlFor="radio"> <FaRadio size={20} />Radio</label>
                        </div>
                        <div className="flex gap-1 items-center min-h-[100px] bg-white rounded-xl p-2 m-1 border">
                            <input onChange={(e) => handleOnChangePerks(e, 'entrance')} value={inputDetail} type="checkbox" className='tw-checkbox' id='private Entrance' />
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
                            <input value={inputDetail.maxGuests} onChange={e => handleOnChangeInput(+e.target.value, 'maxGuests')} type="text" className='tw-input' placeholder='6' />
                        </div>
                    </div>
                    <div className="md:max-w-[200px] mx-auto my-4">
                        <button className='tw-btn-primary w-full '>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default ViewMyPlace
