import React from 'react';
// import hp_cpy_image from '../images/hp_cpy_image.jpg';
import { useNavigate } from 'react-router-dom';
import waltonbd_logo from '../images/waltonbd_logo.jpg'
import tuborg_company from '../images/tuborg_company.jpg';
import asset43 from '../images/assets4/asset 0.jpeg'
import lenskart_logo from '../images/lenskart_logo.png';
import jio from '../images/asml/jio.png'
import company from '../images/asml/company.jpg'
import company2 from '../images/asml/company2.jpg'
import company3 from '../images/asml/company3.jpg'
import company4 from '../images/asml/company4.jpg'

import ceat_company1 from '../images/asml/ceat_company1.jpg';
import ceat_company2 from '../images/asml/ceat_company2.jpg';
import ceat_company3 from '../images/asml/ceat_company3.jpg';
import company_image from '../images/dj/company.jpg';


const Company = () => {
    const navigate = useNavigate();
    return (
        <div className=' w-full min-h-screen bg-[rgb(29,70,30)] text-white '>
            {/* [#2e9afe] */}
            <div className="options text-center  text-recharge-bg flex justify-between  bg-[rgb(29,70,30)] text-md  font-normal mb-2 py-3 items-center px-2">
                <div className="flex items-center font-bold">
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" onClick={() => navigate('/home')}
                            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="w-4 h-4   storke-white  cursor-pointer stroke-white">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                    <span className='text-sm'>back</span>
                </div>
                <div className='flex-grow text-md font-semibold'>Company Profile</div>
                <div className=" font-bold text-sm text-confirm">Records</div>
            </div>



            <div className='flex flex-col w-[88%] mx-auto justify-between items-center p-2'>
                <div className="flex items-center justify-between px-2 shadow-sm shadow-gray-400 py-3 mt-4 rounded-md w-full mx-auto">
                    <div className='text-sm'>Company Profile</div>
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg"
                            fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"
                            className="w-4 h-4 stroke-gray-400 rotate-180  cursor-pointer ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </div>
                </div>

                <div className="hp_company mt-4">
                    <div className='font-semibold'>(about us)</div>
                    <img src={company_image} alt="hp" className='sm:w-3/6 md:w-2/6 mx-auto' width={320} />
                </div>

                <div className="flex flex-col gap-2 px-2  py-2 mt-1 rounded-md w-full mx-auto">
                    {/* <div className='font-semibold'>CEAT</div> */}
                    <div className='text-[16px] font-semibold'>
                        Kesh King Ayurvedic Oil is a potent hair health recipe designed for
                        optimal hair fall control, hair growth and solving other hair problems.
                        It is an ayurvedic proprietary medicinal preparation without any side effects.
                        It has been made from 21 Ayurvedic herbs as per text prescribed in Ayurveda and Tel Pak Vidhi.
                        It is also certified by eminent international hair institutes. It effectively delivers
                        nutrients into the deepest layer of scalp & hair with the help of the revolutionary Deep Root Comb.
                    </div>

                </div>




            </div>


        </div>
    )
}

export default Company