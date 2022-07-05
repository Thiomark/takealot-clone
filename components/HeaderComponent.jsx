import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import SVGButtonComponent from './SVGButtonComponent';
import WelcomeComponent from './WelcomeComponent';

const HeaderComponent = () => {

    const router = useRouter();

    const divider = (sides) => `h-7 hidden md:inline-block w-[1px] bg-gray-200 ${sides ? sides : 'mx-4'}`;

    return (
        <>
            <header>
                <div className='sides flex py-4 items-center justify-between'>
                    <div className='md:hidden'>
                        <SVGButtonComponent iconStyle='h-6 w-6 text-gray-750'>
                            <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                        </SVGButtonComponent>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <h1 onClick={() => router.push('/')} className='flex cursor-pointer items-center font-bold text-2xl'>takealot <span className='bg-blue-450 ml-1 justify-center text-[.65rem] text-white h-8 w-8 flex items-center rounded-full'>com</span></h1>
                        <div className='md:flex text-sm items-center hidden'>
                            <Link href="#">Help</Link>
                            <div className={divider()  + ' hidden md:hidden lg:inline-block'} />
                            <a className='hidden lg:inline'>Sell on Takealot</a>
                        </div>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <div className='md:flex hidden text-sm items-center'>
                            <Link href="#">Login</Link>
                            <div className={divider()} />
                            <Link href="#">Register</Link>
                            <div className={divider()} />
                            <a className='hidden lg:inline'>Orders</a>
                            <div className={divider() + ' hidden md:hidden lg:inline-block'} />
                            <Link href="#">My Account</Link>
                        </div>
                        <div className='flex items-center'>
                            <SVGButtonComponent extraStyle='md:hidden' iconStyle='h-5 w-5 text-gray-750'>
                                <path d="M6.5 4.482c1.664-1.673 5.825 1.254 0 5.018-5.825-3.764-1.664-6.69 0-5.018Z"/>
                                <path d="M13 6.5a6.471 6.471 0 0 1-1.258 3.844c.04.03.078.062.115.098l3.85 3.85a1 1 0 0 1-1.414 1.415l-3.85-3.85a1.007 1.007 0 0 1-.1-.115h.002A6.5 6.5 0 1 1 13 6.5ZM6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11Z"/>
                            </SVGButtonComponent>
                            <SVGButtonComponent extraStyle='bg-red-450 hidden md:flex' iconStyle='h-4 w-4 text-white'>
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </SVGButtonComponent>
                            <div className={divider('mx-2')} />
                            <SVGButtonComponent after={2} spanStyle='ml-1 hidden text-xs text-white md:inline' iconStyle='h-5 w-5 text-gray-750 md:text-white' btnStyle="h-9 w-9 md:w-auto md:px-4 rounded-full p-2 flex items-center justify-center md:bg-green-450">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                            </SVGButtonComponent>
                        </div>
                    </div>
                </div>
            </header>
            <WelcomeComponent />
        </>
    )
}

export default HeaderComponent