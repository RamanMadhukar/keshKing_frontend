import React from 'react';
import { useNavigate } from 'react-router-dom';
import company_image from '../images/dj/company.jpg';


const Company = () => {
    const navigate = useNavigate();
    return (
        <div className=' w-full min-h-screen bg-[#253e90] text-white '>
            {/* [#2e9afe] */}
            <div className="options text-center  text-recharge-bg flex justify-between  bg-[#253e90] text-md  font-normal mb-2 py-3 items-center px-2">
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
                    INOX Wind Limited is an Indian wind energy service provider, 
                    headquartered in Noida, India, and a subsidiary of the INOX Group. 
                    INOX Wind Limited manufactures Wind Turbine Generators (WTGs) and provides services such as wind resource assessment, 
                    site acquisition, infrastructural development, erection and commissioning, a long term operations and maintenance of 
                    wind power projects. The company was ranked 167th in Business Today's 2015 list of the 500 most valuable companies in India.
                    
                    </div>

                </div>




            </div>


        </div>
    )
}

export default Company