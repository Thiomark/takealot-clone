import Layout from '../../components/Layout';
import ProductHeaderComponent from '../../components/single-product/ProductHeaderComponent';
import Link from 'next/link';
import React from 'react';

const PersonalDetails = () => {

    const user = [
        {
            field: 'Your Name',
            value: 'John Doe' 
        },
        {
            field: 'Email Address',
            value: 'ohndoe@gmail.com' 
        },
        {
            field: 'Password',
            value: '**********' 
        },
        {
            field: 'Mobile',
            value: '+2771 123 1234' 
        }
    ]

    return (
        <Layout>
            <div className='md:sides w-full pb-20'>
                <ProductHeaderComponent style={'hidden md:block'} showShare={false} links={['My Account', 'Personal Details']} />
                <h1 className='md:px-0 p-4 md:pt-0 md:font-semibold md:text-lg'>Personal Details</h1>
                <div className='divide-y-[1px] md:space-y-2 md:divide-y-0'>
                {user.map((item, index) => {
                    return (
                        <div key={index} className='flex items-center justify-between bg-white p-4 md:shadow'>
                            <div className='space-y-1 md:space-y-0'>
                                <h1 className='text-sm md:text-lg font-semibold'>{item.field}</h1>
                                <p className='text-xs md:text-sm text-gray-600'>{item.value}</p>
                            </div>
                            <Link
                                href={'#'}
                                className='text-sm md:text-white md:bg-blue-450 md:px-14 md:py-2 font-bold text-blue-450'>Edit</Link>
                        </div>
                    );
                })}
                </div>
            </div>
        </Layout>
    );
}

export default PersonalDetails