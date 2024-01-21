import React, { useLayoutEffect, useState } from 'react';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import ReactModal from 'react-modal';
import { useContext } from 'react';
import { AmountContext } from '../App.js';
import axios from 'axios';
import BASE_URL from '../api_url';
import home from '../images/dj/normal_home.png';
import company from '../images/dj/company.png';
import me from '../images/dj/company.png';
import project_page_image from '../images/dj/product_page_image.png';
import p1 from '../images/dj/i1.jpg';
import p2 from '../images/dj/i2.jpg';
import p3 from '../images/dj/i3.jpg';
import p4 from '../images/dj/i4.jpg';


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const customStyles2 = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        position: 'relative',
        border: 'none',
        padding: 0,
        width: '97%',
        borderRadius: '16px'
    },
};

const ShortPlans = () => {

    const navigate = useNavigate();
    const [modalIsOpen, setIsOpen] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);
    const [currPlan, setCurrPlan] = React.useState(null);
    const [currentVisible, setCurrentVisible] = React.useState('short');
    const [userDetails, setUserDetails] = React.useState(null);
    const amountDetails = useContext(AmountContext);
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');
    const [originalwpwd, setOriginalwpwd] = useState(null);
    const [originalpwd, setOriginalpwd] = useState(null);
    const [planPurchaseShow, setPlanPurchaseShow] = useState(false);
    const [balanceIndicator, setBalanceIndicator] = useState(false);

    const toaster = (text, arg = '') => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            //navigate('/mine');
            if (arg !== '') {
                navigate('/project');
            }
        }, 2000);
    }

    const openModal = () => {
        setIsOpen(true);
    }

    const getUserDetails = async () => {
        await axios.post(`${BASE_URL}/get_user`, { user_id: localStorage.getItem('uid') }).then(({ data }) => {
            if (data) {
                setUserDetails(data);
                setOriginalwpwd(data.wpwd);
                setOriginalpwd(data.pwd);
            } else {
                //console.log('Data not found');
            }
        }).catch(error => console.log('Some error occured', error));
    }

    useLayoutEffect(() => {
        document.body.style.backgroundColor = "#b2e7e4";
        getUserDetails();
    }, []);

    const closeModal = async (action) => {
        if (action === 'cancel') {
            setIsOpen(false);
        } else if (quantity <= 0) {
            toaster('Please a positive value!');
        } else {
            if ((Number(quantity) * Number(currPlan.plan_amount)) > Number(userDetails.recharge_amount)) {
                //toaster("The available balance is insufficient, please recharge");
                setBalanceIndicator(true);
                setTimeout(() => {
                    setBalanceIndicator(false);
                }, 3000);
            }
            else if (userDetails.plans_purchased.filter(e => e.plan_name === 'Inoxwind 0').length > 0 && currPlan.plan_name === 'Inoxwind 0') {
                setIsOpen(false);
                toaster('You can only purchase this plan once');
                return;
            }
            else {
                await axios.post(`${BASE_URL}/purchase`, {
                    recharge_amount: Number(userDetails.recharge_amount) - Number(Number(quantity) * Number(currPlan.plan_amount)),
                    boughtLong: (currPlan.product_type === 'long' ? 1 : 0),
                    boughtShort: (currPlan.product_type === 'short' ? 1 : 0),
                    user_id: localStorage.getItem('uid'),
                    parent_id: userDetails.parent_id,
                    grand_parent_id: userDetails.grand_parent_id,
                    great_grand_parent_id: userDetails.great_grand_parent_id,
                    plan_price: currPlan.plan_amount,
                    plans_purchased: {
                        ...currPlan,
                        quantity: quantity,
                        date_purchased: new Date().toDateString(),
                        date_till_rewarded: new Date().toDateString(),
                        time: new Date().toDateString(),
                        ddmmyy: new Date().getMilliseconds()
                    }
                }).then(() => {
                    console.log('Product successfully purchased');
                    toaster('Plan purchased!', '/project');
                    setPlanPurchaseShow(true);
                }).catch((error) => {
                    console.log('Some error occured', error);
                    toaster('Some error occured, try again after some time');
                })
            }
            setIsOpen(false);
        }
    }


    const isBetween = () => {
        var startTime = '9:00:00';
        var endTime = '22:00:00';

        var currentDate = new Date()

        var startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);

        var endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);


        var valid = startDate < currentDate && endDate > currentDate;
        //console.log(valid);
        return valid;
    }

    const handleClick = (product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle) => {
        setCurrPlan({ product_type, plan_name, plan_type, plan_amount, plan_daily_earning, plan_cycle });
        openModal();
    }

    return (
        <div className='relative bg-[#0373bd] min-h-screen  text-white'>
            {toasterShow ? <div className='w-[50%] absolute z-5 top-[450px] left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 bg-black opacity-80 text-center justify-center text-white px-2 py-1 rounded-md'>
                    <div>{toasterText}</div>
                </div>
            </div> : null}

            {planPurchaseShow ?
                <div className='absolute w-[80%]  top-[450px] rounded-lg shadow-xl  z-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                    <div className='flex flex-col justify-center gap-3 h-[130px] shadow-2xl border border-gray-300 items-center bg-white w-full text-cyan-400 rounded-xl'>
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 fill-cyan-400">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className='text-2xl text-center font-extrabold'>Successful Purchase</div>
                    </div>
                </div>
                :
                null}

            <div >
                <ReactModal
                    isOpen={balanceIndicator}
                    style={customStyles2}
                    contentLabel="Not enough balance"
                    ariaHideApp={false}
                >
                    <div className='relative bg-black text-center text-white opacity-90 p-2 w-full rounded-md '>
                        The available balance is insufficient, please recharge
                    </div>
                </ReactModal>
            </div>

            <div className='bg-[#0373bd] py-3 shadow-lg px-3 m-3 mt-0 rounded-md flex justify-center items-center'>
                <div className='text-white text-sm'>Inoxwind-Products</div>
            </div>

            <div>
                <ReactModal
                    isOpen={modalIsOpen}
                    style={customStyles}
                    contentLabel="Enter Project Quantity"
                    ariaHideApp={false}

                >
                    <h1 className='text-gray-600 mb-3 text-xl'>Are you Sure?</h1>
                    <div>
                        <button onClick={() => closeModal('ok')} className='bg-red-500 text-white px-2 py-1 rounded-lg shadow-md w-[64px]'>Yes</button>
                        <button onClick={() => closeModal('cancel')} className='bg-red-500 text-white px-2 py-1 rounded-lg shadow-md w-[64px] ml-2'>cancel</button>
                    </div>
                </ReactModal>
            </div>


            {/*Plans Cards*/}
            <div className="card_grid grid grid-cols-1 sm:w-3/5 lg:w-3/5 w-[90%] mx-auto mt-2 pb-20">

                <div className={`card_grid grid grid-cols-1 sm:w-3/5 lg:w-3/5 w-[100%] mx-auto mt-2 ${currentVisible === 'big' || true ? 'mb-2' : ''}`}>

                    {currentVisible === 'big' || true && (
                        <div className='grid grid-cols- '>
                            {userDetails && amountDetails?.plan_state && (
                                <div className='grid grid-cols-2 gap-1'>

                                    {userDetails && (amountDetails.plan_state[0] === 0) ? (
                                        <span className='pointer-events-none'>
                                            <Card pre_sale={amountDetails.plan_state[0] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p4} handleClick={handleClick} plan_name={"Inoxwind 0"} plan_cycle={90} plan_daily_earning={20} plan_amount={0} plan_type={'Big Plan'} />
                                        </span>
                                    ) : (
                                        <span>
                                            <Card pre_sale={amountDetails.plan_state[0] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p4} handleClick={handleClick} plan_name={"Inoxwind 0"} plan_cycle={90} plan_daily_earning={20} plan_amount={0} plan_type={'Big Plan'} />
                                        </span>
                                    )}

                                    {userDetails && (amountDetails.plan_state[0] === 0) ? (
                                        <span className='pointer-events-none'>
                                            <Card pre_sale={amountDetails.plan_state[0] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p1} handleClick={handleClick} plan_name={"Inoxwind 1"} plan_cycle={90} plan_daily_earning={180} plan_amount={600} plan_type={'Big Plan'} />
                                        </span>
                                    ) : (
                                        <span>
                                            <Card pre_sale={amountDetails.plan_state[0] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p1} handleClick={handleClick} plan_name={"Inoxwind 1"} plan_cycle={90} plan_daily_earning={180} plan_amount={600} plan_type={'Big Plan'} />
                                        </span>
                                    )}

                                    {userDetails && (amountDetails.plan_state[1] === 0) ? (
                                        <span className='pointer-events-none'>
                                            <Card pre_sale={amountDetails.plan_state[1] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p2} handleClick={handleClick} plan_name={"Inoxwind 2"} plan_cycle={90} plan_daily_earning={410} plan_amount={1400} plan_type={'Big Plan'} />
                                        </span>
                                    ) : (
                                        <span>
                                            <Card pre_sale={amountDetails.plan_state[1] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p2} handleClick={handleClick} plan_name={"Inoxwind 2"} plan_cycle={90} plan_daily_earning={410} plan_amount={1400} plan_type={'Big Plan'} />
                                        </span>
                                    )}

                                    {userDetails && (amountDetails.plan_state[2] === 0) ? (
                                        <span className='pointer-events-none'>
                                            <Card pre_sale={amountDetails.plan_state[2] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p3} handleClick={handleClick} plan_name={"Inoxwind 3"} plan_cycle={90} plan_daily_earning={1260} plan_amount={3500} plan_type={'Big Plan'} />
                                        </span>
                                    ) : (
                                        <span>
                                            <Card pre_sale={amountDetails.plan_state[2] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p3} handleClick={handleClick} plan_name={"Inoxwind 3"} plan_cycle={90} plan_daily_earning={1260} plan_amount={3500} plan_type={'Big Plan'} />
                                        </span>
                                    )}

                                    {userDetails && (amountDetails.plan_state[3] === 0) ? (
                                        <span className='pointer-events-none'>
                                            <Card pre_sale={amountDetails.plan_state[3] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p4} handleClick={handleClick} plan_name={"Inoxwind 4"} plan_cycle={90} plan_daily_earning={2840} plan_amount={7200} plan_type={'Big Plan'} />
                                        </span>
                                    ) : (
                                        <span>
                                            <Card pre_sale={amountDetails.plan_state[3] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p4} handleClick={handleClick} plan_name={"Inoxwind 4"} plan_cycle={90} plan_daily_earning={2840} plan_amount={7200} plan_type={'Big Plan'} />
                                        </span>
                                    )}

                                    {userDetails && (amountDetails.plan_state[4] === 0) ? (
                                        <span className='pointer-events-none'>
                                            <Card pre_sale={amountDetails.plan_state[4] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p1} handleClick={handleClick} plan_name={"Inoxwind 5"} plan_cycle={90} plan_daily_earning={6100} plan_amount={14000} plan_type={'Big Plan'} />
                                        </span>
                                    ) : (
                                        <span>
                                            <Card pre_sale={amountDetails.plan_state[4] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p1} handleClick={handleClick} plan_name={"Inoxwind 5"} plan_cycle={90} plan_daily_earning={6100} plan_amount={14000} plan_type={'Big Plan'} />
                                        </span>
                                    )}

                                    {userDetails && (amountDetails.plan_state[5] === 0) ? (
                                        <span className='pointer-events-none'>
                                            <Card pre_sale={amountDetails.plan_state[5] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p1} handleClick={handleClick} plan_name={"Inoxwind 6"} plan_cycle={90} plan_daily_earning={13000} plan_amount={35000} plan_type={'Big Plan'} />
                                        </span>
                                    ) : (
                                        <span>
                                            <Card pre_sale={amountDetails.plan_state[5] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"long"} product_image={p1} handleClick={handleClick} plan_name={"Inoxwind 6"} plan_cycle={90} plan_daily_earning={13000} plan_amount={35000} plan_type={'Big Plan'} />
                                        </span>
                                    )}
                                </div>)}
                        </div>)}

                </div>


                {currentVisible === 'short' && amountDetails?.plan_state && userDetails && (
                    <div className={`grid grid-cols-2 gap-1`}>
                        {(amountDetails.plan_state[5] === 0) ?
                            (
                                <span className='pointer-events-none'>
                                    {/* <span>hi</span> */}
                                    <Card pre_sale={amountDetails.plan_state[6] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p2} handleClick={handleClick} plan_name={"Inoxwind 7"} plan_cycle={3} plan_daily_earning={430} plan_amount={800} plan_type={'Short Plan'} />
                                </span>
                            ) :
                            <span>
                                <Card pre_sale={amountDetails.plan_state[6] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p2} handleClick={handleClick} plan_name={"Inoxwind 7"} plan_cycle={3} plan_daily_earning={430} plan_amount={800} plan_type={'Short Plan'} />
                            </span>
                        }

                        {(amountDetails.plan_state[6] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card pre_sale={amountDetails.plan_state[7] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p3} handleClick={handleClick} plan_name={"Inoxwind 8"} plan_cycle={3} plan_daily_earning={910} plan_amount={2100} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card pre_sale={amountDetails.plan_state[7] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p3} handleClick={handleClick} plan_name={"Inoxwind 8"} plan_cycle={3} plan_daily_earning={910} plan_amount={2100} plan_type={'Short Plan'} />
                            </span>
                            )}

                        {(amountDetails.plan_state[7] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card pre_sale={amountDetails.plan_state[8] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p4} handleClick={handleClick} plan_name={"Inoxwind 9"} plan_cycle={3} plan_daily_earning={2100} plan_amount={4800} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card pre_sale={amountDetails.plan_state[8] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p4} handleClick={handleClick} plan_name={"Inoxwind 9"} plan_cycle={3} plan_daily_earning={2100} plan_amount={4800} plan_type={'Short Plan'} />
                            </span>
                            )}

                        {(amountDetails.plan_state[8] === 0) ?
                            (<span className='pointer-events-none'>
                                <Card pre_sale={amountDetails.plan_state[9] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p1} handleClick={handleClick} plan_name={"Inoxwind 10"} plan_cycle={4} plan_daily_earning={3000} plan_amount={9000} plan_type={'Short Plan'} />
                            </span>) :
                            (<span className=''>
                                <Card pre_sale={amountDetails.plan_state[9] === 0} long_plan_state={userDetails.boughtLong < 1} product_type={"short"} product_image={p1} handleClick={handleClick} plan_name={"Inoxwind 10"} plan_cycle={4} plan_daily_earning={3000} plan_amount={9000} plan_type={'Short Plan'} />
                            </span>
                            )}
                    </div>)}
            </div>



            {/*Navigation Bar 2*/}
            <div className="fixed bottom-0 z-10 bg-gray-50 rounded-none text-gray-700  flex overflow-x-hidden  mx-auto mt-2 border-2 border-gray-100 w-full overflow-y-hidden">
                <div className="flex flex-row justify-around font-normal text-xs items-center w-full py-1">
                    <div className=' cursor-pointer mx-2 flex flex-col justify-center items-center' onClick={() => navigate('/home')}>
                        <img src={home} alt="online" className='w-6' />
                        <div>Home</div>
                    </div>

                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'
                        onClick={() => navigate('/financial')}>
                        <img src={project_page_image} alt="recharge" className='w-6' />
                        <div>Products</div>
                    </div>
                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center '
                        onClick={() => navigate('/company')}>
                        <img src={company} alt="app_dwd" className='w-6' />
                        <div>Company</div>
                    </div>


                    <div className='cursor-pointer mx-2 flex flex-col justify-center items-center'
                        onClick={() => navigate('/mine')}>
                        <img src={me} alt="invite" className='w-6' />
                        <div>me</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShortPlans;