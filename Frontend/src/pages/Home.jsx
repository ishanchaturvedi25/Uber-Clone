import React, { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'

const Home = () => {

    const [pickup, setPickup] = useState('')
    const [destination, setDestination] = useState('')
    const [panelOpen, setPanelOpen] = useState(false)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [vehiclePanel, setVehiclePanel] = useState(false)
    const vehiclePanelRef = useRef(null)
    const [confirmRidePanel, setConfirmRidePanel] = useState(false)
    const confirmRidePanelRef = useRef(null)

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

    useGSAP(function() {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [confirmRidePanel])

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
                    <LocationSearchPanel setPanelOpen={setPanelOpen} setVehiclePanel={setVehiclePanel} />
                </div>
            </div>

            <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-14 bg-white'>
                <VehiclePanel setConfirmRidePanel={setConfirmRidePanel} setVehiclePanel={setVehiclePanel} />
            </div>

            <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full px-3 py-10 pt-14 bg-white'>
                <ConfirmRide setConfirmRidePanel={setConfirmRidePanel} />
            </div>
        </div>
    )
}

export default Home
