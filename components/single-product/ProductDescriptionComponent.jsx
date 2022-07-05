import React from 'react'

const ProductDescriptionComponent = ({style}) => {
    return (
        <div className={style}>
            <h1 className='font-bold mb-2 text-xl'>Description</h1>
            <div className='space-y-3'>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim ipsum minus? Quaerat animi, rem blanditiis laboriosam architecto commodi unde, eveniet eius modi repellendus est ab cumque dolorem quasi corporis deleniti eum ipsam distinctio! Aperiam commodi architecto non necessitatibus nemo quidem excepturi magni doloremque, et, vel quaerat placeat sit amet consectetur adipisicing elit. Nisi enim ipsum minus? Quaerat animi, rem blanditiis laboriosam architecto commodi unde, eveniet eius modi repellendus est ab cumque dolorem quasi corporis deleniti eum ipsam distinctio! Aperiam commodi architecto non necessitatibus nemo quidem excepturi magni doloremque, et, vel quaerat placeat optio saepe?</p>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim ipsum minus? Quaerat animi, rem blanditiis laboriosam architecto commodi unde, eveniet eius modi repellendus est ab cumque dolorem quasi corporis deleniti eum ipsam distinctio! Aperiam commodi architecto non necessitatibus nemo quidem excepturi magni doloremque, et, vel quaerat placeat optio saepe?</p>
                <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi enim ipsum minus? Quaerat animi, rem blanditiis laboriosam architecto commodi unde, eveniet eius modi repellendus est ab cumque dolorem quasi corporis deleniti eum ipsam distinctio! Aperiam commodi architecto non necessitatibus nemo quidem excepturi magni doloremque, et, vel quaerat placeat optio saepe?</p>
            </div>
            <h2 className='mt-2'>What's in the box</h2>
            <ul>
                {[...Array(3)].map((item, index) => <li key={index} className='text-xs text-gray-600'>1x Deep Cleansing Powder 30g</li>)}
            </ul>
        </div>
    )
}

export default ProductDescriptionComponent;