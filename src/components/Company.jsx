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
                        Goldwind <br /><br />
                        Goldwind is a trusted global strategic partner in clean energy. As a company, we are committed to promoting energy transformation to ensure access to affordable, reliable, and sustainable energy for all – further Driving a Renewable Future. Specializing in energy development, energy devices, energy services, and energy use, Goldwind leverages its global network of scientific research innovation and best business practices to take renewable energy utilization and efficiency to new heights. As an SZSE and HKEX listed company, Goldwind has repeatedly been recognized as: “Corporate Climate Leader”, “Mos Respected Company in Asia”, and “Best Investor Relations Company”, and awarded “Top 50 Most Innovative Companies in the World”, “Carbon Clean200”, “Top 500 Global New Energy Companies”, “New Fortune Best Listed Companies”, “Fortune Top 500 Chinese Companies, and other accolades.
                        <br /><br />

                        Since we started our business, we have witnessed and experienced the growth and prosperity of China’s renewable energy industry and established our presence in the global market with comprehensive and in-depth internationalization capabilities. Goldwind’s business network covers 38 countries across six continents, with eight R&D centers worldwide that constitute the key drivers of our success and leading position in cutting-edge technology and development. We have about 10,000 employees worldwide, including over 3,000 research and development (R&D) and technical personnel. With eight overseas regional centers in North America, South America, Europe, Africa, Australia, Asia, Middle East and North Africa, and the Russian-speaking part of Central Asia, we have fully realized the internationalization of capital, market, technology, talents and management.
                        <br /><br />
                        So far, we have delivered over 49,000 wind turbines all over the world with a global cumulative installed capacity exceeding 111GW and an operations and maintenance (O&M) service capacity exceeding 64GW. To promote global energy transformation, Goldwind has thoroughly integrated renewable energy and digital technology. We are actively building zero-carbon solutions for new power system, and optimizing and reconstructing source-grid-storage-load to create an innovative energy asset management model, so we can fully contribute to "carbon neutrality” through a smarter Internet of Energy. In the field of water treatment and environmental protection, Goldwind focuses on the investment and development, construction and operation, and technological innovation of water assets. Our scope of business covers municipal water supply, municipal/industrial sewage treatment, reclaimed water reuse, etc. In addition, we play a role in solid waste disposal and sludge treatment among other fields. As of the end of 2022, our subsidiary Goldwind EP has invested and run 65 water projects in total, with a water treatment capacity exceeding 2.83 million tons per day.
                    </div>

                </div>




            </div>


        </div>
    )
}

export default Company