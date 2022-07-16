import Layout from '@/components/Layout'
import TakealotIcon from '@/components/TakealotIcon'
import Link from 'next/link'
import React, { useState } from 'react'

const Help = () => {
    const options = 'Delivery. Collection. Returns. Refunds. Order Issues. Payments. Promos & Gift Vouchers. Product & Stock. Date & Privacy'
    
    return (
        <div bg='bg-white'>
            <header className='mx-auto max-w-3xl flex items-center w-full px-8 py-4'>
                <TakealotIcon />
                <Link href='/help'><a className='ml-6 text-sm hidden md:block'>Help</a></Link>
            </header>
            <div className='bg-blue-450'>
                <div className='text-white mx-auto max-w-3xl space-y-6 sm:space-x-6 sm:space-y-0 p-8 sm:flex items-center'>
                    <div className='text-center sm:text-left'>
                        <h1 className='text-2xl font-semibold mb-4'>When will I get my order?</h1>
                        <p className='text-sm'>Find tracking information and order details in <span className='font-bold'>My Account</span>, under <span className='font-bold'>Orders</span></p>
                    </div>
                    <Link href='/orders'><a className='text-blue-450 text-center font-semibold bg-white w-full text-sm flex-shrink-0 sm:w-fit block p-3 text-semibold'>View Orders &rarr;</a></Link>
                </div>
            </div>
            <div className='bg-gray-100 mx-auto max-w-3xl flex-1 p-6 mt-14 md:p-12'>
                <h1 className='text-center mb-6 font-bold'>What can we help you with?</h1>
                <div className='flex border px-4 items-center bg-white'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-4 h-4 bi-search" viewBox="0 0 16 16">
                        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                    <input className='py-4 placeholder:text-center w-full mx-4 text-sm focus:outline-none' placeholder='Delivery, refunds, returns, payments'/>
                </div>
                <div className='mt-2 divide-y-[1px] hover:cursor-pointer'>
                    {options.split('.').map(item => <Card item={item} key={item}/>)}
                </div>
            </div>
        </div>
    )
}

const Card = ({item}) => {
    const [isCardOpen, setIsCardOpen] = useState(false);

    return (
        <div>
            <div onClick={() => setIsCardOpen(prev => !prev)} className='flex items-center justify-between px-4 py-5 bg-white'>
                <span className='text-sm font-semibold'>{item}</span>
                {isCardOpen ? (
                    <span className='text-lg text-gray-400'>&#x2715;</span>
                ) : (
                    <span className='text-2xl text-gray-400'>&#8964;</span>
                )}
            </div>
            {isCardOpen && <div>
                <p className='text-center p-6 font-bold'>and more specifically...</p>
            </div>}
        </div>
    )
}

export default Help