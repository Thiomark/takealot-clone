import React, { useEffect, useState } from 'react'

const CarousalComponent = () => {
    const [image, setImage] = useState(null);
    const [count, setCount] = useState(0);
    const images = ['banner-image-1.webp', 'banner-image-2.webp', 'banner-image-3.webp'];

    useEffect(() => {
        const next = (current + 1) % slides.length;
        const id = setTimeout(() => setCurrent(next), time);
        return () => clearTimeout(id);
    }, [current]);

    // useEffect(() => {
    //     setImage(`placeholder-images/${images[0]}`);
    // }, [])
    
    return (
        <div className="w-full h-full relative">
            <div className=' absolute bottom-3 right-3 flex items-center space-x-2'>
                {[...Array(3)].map((button, index) => <button onClick={() => setImage(`placeholder-images/${images[index]}`)} className='h-3 cursor-pointer w-3 rounded-full border-2 bg-slate-100 shadow' key={index}></button>)}
            </div>
            <img className="h-full w-full object-cover" src={image} alt="" srcSet="" />
        </div>
    )
}

export default CarousalComponent