import Layout from '@/components/Layout'
import Link from 'next/link';
import React from 'react'

const Account = () => {

    const sections = [
        {
            name: 'Orders',
            svg: () => (
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            ),
            order: '1',
            links: [
                { name: 'Orders', url: '#' },
                { name: 'Invoices', url: '#', HideOnMobile: true  },
                { name: 'Returns', url: '#' },
                { name: 'Product Reviews', url: '#', HideOnMobile: true }
            ]
        },
        {
            name: 'General',
            svg: () => (
                <>
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </>
            ),
            order: '3',
            secondName: 'Customer Information',
            links: [
                { name: 'Personal Details', url: '#' },
                { name: 'Address Book', url: '#' },
                { name: 'Product Reviews', url: '#', hideOnLargeScreens: true },
                { name: 'Buy Gift Vouchers', url: '#', hideOnLargeScreens: true },
                { name: 'Newsletter Subscriptions', url: '#' }
            ]
        },
        {
            name: 'Credit',
            svg: () => (
                <>
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z"/>
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z"/>
                </>
            ),
            order: '2',
            secondName: 'Payments & Credit',
            links: [
                { name: 'Credit & Refunds', url: '#' },
                { name: 'Redeem Gift Voucher', url: '#' }
            ]
        },
        {
            name: 'My Lists',
            svg: () => (
                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
            ),
            order: '4',
            HideOnMobile: true,
            links: [
                { name: 'My Lists', url: '#' },
                { name: 'Create a List', url: '#' }
            ]
        },
        {
            name: 'Support',
            order: '5',
            svg: () => (
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
            ),
            links: [
                { name: 'Help', url: '/help' },
                { name: 'Log Out', url: '#', hideOnLargeScreens: true }
            ]
        }
    ]

    return (
        <Layout>
            <div className='md:p-4 md:sides xl:px-20 w-full'>
                <h1 className='hidden md:block pb-4 font-bold text-lg'>My Account</h1>
                <div className='pb-10 md:grid grid-cols-2 lg:grid-cols-3 gap-6 grid-rows-3'>
                    {sections.map((section, index) => (
                        <div key={index} className={`md:bg-white md:shadow md:py-4 ${section.HideOnMobile && 'hidden md:block'}`} style={{order: section.order}}>
                            <header className='md:pb-2 py-4 md:py-0 font-semibold text-gray-900 px-5 md:px-4 md:flex items-center justify-between'>
                                <h1 className=''>
                                    <span className={`${section.secondName && 'md:hidden'}`}>{section.name}</span>
                                    <span className={`${section.secondName && 'hidden md:block'}`}>{section.secondName}</span>
                                </h1>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi h-5 hidden md:block w-5 bi-cart-fill" viewBox="0 0 16 16">
                                    {section.svg()}
                                </svg>
                            </header>
                            <div className='divide-y-[1px] md:space-y-2 text-gray-500 md:text-blue-450 md:divide-none bg-white text-sm md:border-none border-y-[1px]'>{
                                section.links.map((link, i) => (
                                    <Link key={i} href={link.url}>
                                        <a className={`px-4 items-center justify-between md:py-0 py-3 ${link.hideOnLargeScreens && 'md:hidden'} ${link.HideOnMobile ? 'hidden md:block' : 'flex'}`}>
                                            <span>{link.name}</span>
                                            <span className='md:hidden'>&rarr;</span>
                                        </a>
                                    </Link>
                                ))
                            }</div>
                        </div>
                    ))
                }</div>
            </div>
        </Layout>
    )
}

export default Account;