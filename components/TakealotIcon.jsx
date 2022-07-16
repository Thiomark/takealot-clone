import React from 'react';
import { useRouter } from 'next/router';

const TakealotIcon = () => {
    const router = useRouter();

    return (
        <h1 onClick={() => router.push('/')} className='flex cursor-pointer items-center font-bold text-2xl'>takealot <span className='bg-blue-450 ml-1 justify-center text-[.65rem] text-white h-8 w-8 flex items-center rounded-full'>com</span></h1>
    )
}

export default TakealotIcon