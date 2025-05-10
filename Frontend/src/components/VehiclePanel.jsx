import React from 'react'

const VehiclePanel = (props) => {
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => props.setVehiclePanel(false)}>
                <i className="text-xl text-gray-500 ri-arrow-down-wide-line"></i>
            </h5>
            <h3 className='font-semibold mb-5 text-2xl'>Choose a Vehicle</h3>

            <div onClick={() => props.setConfirmRidePanel(true)} className='flex p-3 w-full mb-2 border-2 active:border-black rounded-xl items-center justify-between'>
                <img className='h-12' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base'>UberGo <span><i className="ri-user-3-fill"></i>4</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹193.20</h2>
            </div>

            <div onClick={() => props.setConfirmRidePanel(true)} className='flex p-3 w-full mb-2 border-2 active:border-black rounded-xl items-center justify-between'>
                <img className='h-12' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_637/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png" alt="" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base'>Moto <span><i className="ri-user-3-fill"></i>1</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹65.17</h2>
            </div>

            <div onClick={() => props.setConfirmRidePanel(true)} className='flex p-3 w-full mb-2 border-2 active:border-black rounded-xl items-center justify-between'>
                <img className='h-12' src="https://tse4.mm.bing.net/th/id/OIP.gERohywpalGF3NjolmHt5wHaE7?cb=iwp1&rs=1&pid=ImgDetMain" alt="" />
                <div className='w-1/2'>
                    <h4 className='font-medium text-base'>UberAuto <span><i className="ri-user-3-fill"></i>3</span></h4>
                    <h5 className='font-medium text-sm'>2 mins away</h5>
                    <p className='font-medium text-xs text-gray-600'>Affordable, compact rides</p>
                </div>
                <h2 className='text-lg font-semibold'>₹118.21</h2>
            </div>
        </div>
    )
}

export default VehiclePanel
