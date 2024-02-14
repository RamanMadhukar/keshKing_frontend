import React from 'react';

//[#0096D5] [#00bcd4]


const Card = ({ pre_sale, long_plan_state, product_type, product_image, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle, handleClick }) => {


  return (
    <div className='bg-[#343436] shadow-ceatShadow3 px-3 py-5 rounded-md ' >

      <div className="flex">

        <img src={product_image} alt="" className='w-1/3' />

        <div className="flex-1 pl-3">

          <div className="flex items-center justify-between">

            <p>{plan_name}</p>

            {pre_sale === true ? (
              <div className="cursor-pointer btn text-black font-semibold text-center  py-2  px-8 mt-5 text-md mb-2 shadow-md rounded-md bg-pre_sale">
                Pre-Sale
              </div>
            ) : null}

            {
              pre_sale === false ? (
                product_type === 'long' ? (
                  <div className="cursor-pointer btn text-white font-semibold text-center  py-2  px-8 mt-5 text-sm mb-2 shadow-xs rounded-md bg-[#19244b] border-white border"
                    onClick={() => handleClick(product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle)}>
                    Get
                  </div>
                ) : (long_plan_state === true) ? (
                  <div className="cursor-pointer btn text-white font-semibold text-center  py-2  px-8 mt-5 text-sm mb-2 shadow-xs rounded-md bg-[#19244b] border-white border">
                    Get
                  </div>
                ) : (
                  <div className="cursor-pointer btn text-white font-semibold text-center  py-2  px-8 mt-5 text-sm mb-2 shadow-xs rounded-md bg-[#19244b] border-white border"
                    onClick={() => handleClick(product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle)}>
                    Get
                  </div>
                )
              ) : null
            }

          </div>

          <div className="flex items-center justify-between">
            <p>Price:</p>
            <p>{plan_amount}</p>
          </div>

          <div className="flex items-center justify-between">
            <p>Daily income:</p>
            <p>{plan_daily_earning}</p>
          </div>

          <div className="flex items-center justify-between">
            <p>Cycle:</p>
            <p>{plan_cycle}</p>
          </div>

        </div>

      </div>




    </div>
  )
}

export default Card