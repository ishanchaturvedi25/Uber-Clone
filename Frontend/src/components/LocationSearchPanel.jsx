import React from 'react'

const LocationSearchPanel = (props) => {

    const locations = [
        'Cannaught place, New Delhi',
        'Shalimar Garden, New Delhi',
        'Hauj khas, New Delhi',
        'Shahadara, New Delhi'
    ]

    return (
        <div>
            {
                locations.map(location => {
                    return <div onClick={() => props.setVehiclePanel(true)} className='flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center justify-start my-2'>
                        <h2 className='bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full'><i className="ri-map-pin-fill"></i></h2>
                        <h4 className='font-medium'>{location}</h4>
                    </div>
                })
            }
        </div>
    )
}

export default LocationSearchPanel
