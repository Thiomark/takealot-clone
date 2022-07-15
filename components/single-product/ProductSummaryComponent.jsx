import { ProductContext } from "providers/ProductProvider";
import { useContext } from "react";
import AddToCartButtonsComponent from "./AddToCartButtonsComponent";
import RatingComponent from "./RatingComponent"

const ProductSummaryComponent = ({style}) => {
    const {product} = useContext(ProductContext);
    const items = [
        {
            title: 'Eligible for next-day delivery or collection.',
            p: 'M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z'
        }, 
        {
            title: 'Eligible for Cash on Delivery.',
            ps: () => <>
                <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
            </>
        },
        {
            title: 'Free Delivery Available.',
            p: 'M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z'
        },
        {
            title: 'Hassle-Free Exchanges & Returns for 30 Days.',
            ps: () => <><path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/></>
        },
        {
            title: '12-Month Limited Warranty.',
            p: 'M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z'
        }
    ]
    const paths = ['']

    return (
        <div className={style}>
            <h1 className='font-semkbold hidden xl:block mt-4 lg:mt-0 text-2xl'>{product.name}</h1>
            <RatingComponent reviews={product.reviews} rating={product.rating} extraStyle='hidden xl:flex xl:py-5' />
            <div className="lg:border-y border-gray-200 py-2">
                <div className=''>
                    <h1 className='font-bold items-center'>In stock <span className='text-xs p-1 font-normal mx-2 rounded bg-gray-200'>JHB</span>
                    <span className='font-normal text-sm text-blue-450 cursor-pointer hover:underline'>When do I get it?</span></h1>
                </div>
            </div>
            <AddToCartButtonsComponent extraStyle={'mb-3 xl:hidden'}/>
            <ul className='list-none text-xs divide-y xl:divide-none divide-dashed divide-gray-300'>
                {items.map((item, index) => (<li className="py-2.5 flex items-center justify-between xl:justify-start" key={index}>
                    <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi w-4 text-gray-700 h-4 bi-info-circle-fill" viewBox="0 0 16 16">
                            {item.p && (<path d={item.p}/>)}
                            {item.ps && item.ps()}
                        </svg>
                        <span className="ml-3">{item.title}</span>
                    </div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi xl:ml-2 w-3 text-green-450 h-3 bi-info-circle-fill" viewBox="0 0 16 16">
                        <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                    </svg>
                </li>))}
            </ul>
        </div>
    )
}

export default ProductSummaryComponent