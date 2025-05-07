import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'

const Home = () => {

    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const vehiclePanelRef = useRef(null)

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [panelOpen])

    useGSAP(function() {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [vehiclePanel])

    return (
        <div className='h-screen relative overflow-hidden'>
            <img className='w-16 absolute left-5 top-5' src="https://logospng.org/download/uber/logo-uber-4096.png" alt="" />

            <div className='h-screen w-screen'>
                <img className='h-full w-full object-cover' src="https://images.squarespace-cdn.com/content/v1/5bcfc8c07a1fbd730b2ba933/1577815451671-WBHTAL83DXI7WPSIFK65/IMG_1579.png" alt="" />
            </div>

            <div className='h-screen flex flex-col justify-end absolute top-0 w-full'>
                <div className='h-[30%] bg-white p-6 relative'>
                    <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className='absolute opacity-0 right-6 top-6 text-2xl font-bold'>
                        <i className="ri-arrow-down-wide-line"></i>
                    </h5>
                    <h4 className='text-3xl font-semibold'>Find a trip</h4>
                    <form onSubmit={e => submitHandler(e)}>
                        <div className='line absolute h-16 w-1 top-[50%] left-10 bg-gray-700 rounded-full'></div>
                        <input
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-5'
                            type="text"
                            placeholder='Add a pick-up location'
                            value={destination}
                            onChange={e => setDestination(e.target.value)}
                            onClick={() => setPanelOpen(true)}
                        />
                        <input
                            className='bg-[#eee] px-12 py-2 text-lg rounded-lg w-full mt-3'
                            type="text"
                            placeholder='Enter your destination'
                            value={pickup}
                            onChange={e => setPickup(e.target.value)}
                            onClick={() => setPanelOpen(true)}
                        />
                    </form>
                </div>
                <div ref={panelRef} className='bg-white h-0'>
                    <LocationSearchPanel vehiclePanel={vehiclePanel} setVehiclePanel={setVehiclePanel} />
                </div>
            </div>

            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-6 bg-white'>
                <h3 className='font-semibold mb-5 text-2xl'>Choose a Vehicle</h3>

                <div className='flex p-3 w-full mb-2 border-2 active:border-black rounded-xl items-center justify-between'>
                    <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                    <div className='w-1/2'>
                        <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                        <h5 className='font-medium text-sm'>2 mins away</h5>
                        <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹193.20</h2>
                </div>

                <div className='flex p-3 w-full mb-2 border-2 active:border-black rounded-xl items-center justify-between'>
                    <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                    <div className='w-1/2'>
                        <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                        <h5 className='font-medium text-sm'>2 mins away</h5>
                        <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹65.17</h2>
                </div>

                <div className='flex p-3 w-full mb-2 border-2 active:border-black rounded-xl items-center justify-between'>
                    <img className='h-12' src="https://tse4.mm.bing.net/th/id/OIP.gERohywpalGF3NjolmHt5wHaE7?cb=iwp1&rs=1&pid=ImgDetMain" alt="" />
                    <div className='w-1/2'>
                        <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                        <h5 className='font-medium text-sm'>2 mins away</h5>
                        <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
                    </div>
                    <h2 className='text-lg font-semibold'>₹118.21</h2>
                </div>
            </div>
        </div>
    )
}

export default Home
