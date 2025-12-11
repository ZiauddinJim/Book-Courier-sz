import React from 'react';
import { TbShoppingCartCancel } from 'react-icons/tb';
import { Link } from 'react-router';

const PaymentCancel = () => {
    return (
        <div className=' py-20 m-10  rounded-3xl flex flex-col justify-center items-center mb-10'>
            <TbShoppingCartCancel size={180} className='text-gray-700 dark:text-gray-300' />
            <p className='text-xl font-semibold my-5 text-gray-700 dark:text-gray-300'> Payment is Cancel please try again.</p>
            <div className='flex gap-5 justify-center'>
                <Link to={"/dashboard/orders"} className="btn btn-primary font-bold ">Try Again</Link>
            </div>
        </div>
    );
};

export default PaymentCancel;