import HeaderComponent from '@/components/HeaderComponent';
import Image from 'next/image';
import Link from 'next/link'
import React from 'react'

const Register = () => {
    const label = 'text-sm text-gray-800 after:content-["*"] after:mx-1';
    const input = 'p-1.5 sm:p-0.5 md:max-w-xs col-span-2 md:mb-0 border w-full mb-5';
    const checkboxs = 'General Newsletter  Daily Deals  Electronics  Garden, Pool & Patio  Books  Movies & TV  Gaming  Music  Afrikaans  Baby & Toddler  Toys  Sport  Camping & Outdoor  Pets  Luggage & Travel  Home & Kitchen  Office & Stationery  Fashion  Liquor  Auto & DIY  Health & Personal Care  Beauty'.split('  ').map((item, index) => ({name: item, checked: index < 2 ? true : false}));

    return (
        <div>
            <HeaderComponent />
            <form className='p-8 flex gap-5 max-w-5xl mx-auto mb-10'>
                <div className='max-w-[220px] hidden md:block w-full space-y-3'>
                    <div className='flex bg-yellow-150 items-center flex-col space-y-2 p-2'>
                        <Image src='/truck.webp' alt='truck icon' width={48} height={34}/>
                        <p className='font-bold text-sm text-center'>Enjoy <span className='text-blue-450'>Free Delivery</span> worth R65 on your first order <Link href='#'><a className='font-normal block text-blue-450 underline'>T&Cs apply</a></Link></p>
                    </div>
                    <div className='space-y-6 text-xs p-6 bg-gray-100'>
                        <h1 className='font-bold'>Safe Shopping at Takealot</h1>
                        <p>Rest assured your transaction is safe.</p>
                        <p>This technology safeguards your personal information and guarantees privacy.</p>
                    </div>
                </div>
                <div className='md:grid w-full grid-cols-3 gap-3'>
                    <h1 className='font-bold col-span-3 md:font-normal md:pt-0 text-2xl mb-4 text-gray-800 py-3 border-b'>Register</h1>
                    <label className={label} htmlFor='first_name'>First Name</label>
                    <input type='text' className={input} />
                    <label className={label} htmlFor='last_name'>Last Name</label>
                    <input type='text' className={input} />
                    <label className={label} htmlFor='email'>Email</label>
                    <input type='text' className={input} />
                    <label className={label} htmlFor='email'>Retype Email</label>
                    <input type='text' className={input} />
                    <label className={label} htmlFor='password'>Password</label>
                    <input type='password' className={input} />
                    <div className='col-span-3 md:grid grid-cols-3 mb-4 md:mb-0'>
                        <div className='bg-orange-100 md:max-w-xs w-[18em] mx-auto md:mx-0 col-span-2 md:w-full col-start-2'>
                            <p className='text-[.7rem] p-2 py-4 border-l-2 border-orange-400'>At least 8 characters and 1 special character or number</p>
                        </div>
                    </div>
                    <label className={label} htmlFor='retype_password'>Retype Password</label>
                    <input type='password' className={input} />
                    <label className={label} htmlFor='number'>Mobile Number</label>
                    <input type='text' className={input} />
                    <div className='col-span-3'>
                        <p className='text-sm font-bold'>Sign up to our Newsletters to be the first to know about our great deals!</p>
                        <div className='grid grid-cols-2 mt-4 gap-2'>
                            {checkboxs.map((item, index) => (
                                <div key={index} className='text-sm items-center'>
                                    <input type='checkbox' checked={item.checked} />
                                    <span className='ml-2'>{item.name}</span>
                                </div>
                            ))}
                        </div>
                        <p className='text-sm py-4 md:py-0 md:mt-2 max-w-sm sm:max-w-full'>You will receive newsletters based on your interests, recent orders and browsing behaviour.</p>
                    </div>
                    <button type='submit' className='p-3 md:p-2 md:w-auto w-full text-sm bg-blue-450 text-white'>Register Now</button>
                    <p className='text-sm col-span-3 mt-5 md:mt-0 md:text-xs max-w-sm sm:max-w-full'>By clicking on 'Register Now', you agree to our <Link href="#"><a className='text-blue-450 hover:underline'>Terms and Conditions</a></Link> and confirm that you are over 18 years of age</p>
                </div>
            </form>
        </div>
    )
}

export default Register