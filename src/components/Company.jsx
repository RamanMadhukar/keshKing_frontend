import React from 'react';
import { useNavigate } from 'react-router-dom';
import company_image from '../images/dj/company.jpg';


const Company = () => {
    const navigate = useNavigate();
    return (
        <div className=' w-full min-h-screen bg-[#34b0a9] text-white '>
            {/* [#2e9afe] */}
            <div className="options text-center  text-recharge-bg flex justify-between  bg-[#34b0a9] text-md  font-normal mb-2 py-3 items-center px-2">
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
                <div className=" font-bold text-sm text-white">Records</div>
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
                        We are India’s leading bitcoin company and we enable Indians to buy, sell, store, use & accept bitcoin.Our unwavering focus is on emerging as a top global player in the cryptoassets arena and contribute to the Indian as well as global economy. Unocoin has transformed into one of the trusted Bitcoin and Ethereum platform in recent times. In order to provide better services, many other components were added to our ecosystem. We believe that continuously supporting good and best quality service is the best way to develop this industry. We will continue to improve our services, as we are committed to render the best. However, for Unocoin, this is far from enough.
                        <br /><br />
                        Our business model, and our Service, consists of facilitating the buying, selling, sending and receiving of Crypto Assets and their use to purchase goods in an unregulated yet responsible, international open payment system. The Service we provide is currently unregulated within India.
                    </div>

                </div>




            </div>


        </div>
    )
}

export default Company