import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useContext } from 'react';
import { AmountContext } from '../App';
import { RotatingLines } from 'react-loader-spinner';
import BASE_URL from '../api_url.js';
import axios from 'axios';
import register_logo from '../images/dj/register_logo.png';
import mobile from '../images/phone.png';
import password from '../images/lock.png';
import info from '../images/invite.png';
import otpimg from '../images/otp.png';
import logo from '../images/logo.svg'

const Register2 = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const [otp, setOtp] = useState('');
    const [otpfield, setOTPfield] = useState('');
    const [mobno, setMobno] = useState('');
    const [pwd, setpwd] = useState('');
    const [cpwd, setCpwd] = useState('');
    const [wpwd, setwpwd] = useState('');
    const [invt, setInvt] = useState('');
    const amountDetails = useContext(AmountContext);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Loading');
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const toaster = (text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
            //navigate('/mine');
        }, 5000);
    }

    useEffect(() => {
        document.body.style.backgroundColor = "#b2e7e4";
    }, []);

    const validatePassword = password => /[a-zA-Z]/.test(password) && /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);

    const handleRegister = async () => {

        if (otp !== otpfield) {
            toaster('Wrong otp');
            return;
        }

        if (mobno.length !== 10) {
            toaster('Invalid Mobile Number');
            return;
        }

        else if (pwd.length < 6) {
            toaster('Password must contain at least 6 characters!');
            return;
        }

        else if (wpwd.length < 6) {
            toaster('Password must contain at least 6 characters!');
            return;
        }

        else if (validatePassword(pwd) === false) {
            toaster('Password must contain letters and numbers or special symbols');
            return;
        }

        setLoading(true);
        await axios.post(`${BASE_URL}/register`, { mobno, pwd, wpwd, invt })
            .then(({ data }) => {
                if (data.message === 'Mobile Number already registered!') {
                    setText('Mobile Number already registered!');
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                } else if (data.message === 'invalid invite code') {
                    setText('invalid invite code!');
                    setTimeout(() => {
                        setLoading(false);
                    }, 2000);
                } else {
                    setText('registration success');
                    localStorage.setItem('uid', data.user_id);
                    setMobno('');
                    setpwd('');
                    setCpwd('');
                    setwpwd('');
                    setInvt('');
                    setTimeout(() => {
                        navigate('/login');
                        setLoading(false);
                    }, 2000);
                }
            })
            .catch((error) => {
                toaster('Something went wrong');
                console.error(error);
            });
    }

    const handleMessage = () => {
        if (mobno.length !== 10) {
            toaster('Invalid Mobile No, please enter a valid number');
            return;
        }
        fetch(`https://www.fast2sms.com/dev/bulkV2?authorization=nei0bPwRvpzKaX362T718yGVN5ICgskMEmfdUxOBYWLhrZH9cSyZHdTi1PEt7cl0LwroKYCS89x6kApQ&variables_values=${otpfield}&route=otp&numbers=${mobno}`)
            .then((response) => {
                console.log(response);
                setSeconds(59)
                toaster('OTP sent successfully');
            })
            .catch(error => toaster('Something went wrong'));
        console.log(otpfield, "otpfield");
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }

            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    return (

        <>

            {toasterShow ? <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                <div className='flex gap-2 items-center justify-center bg-black py-[10px] px-4  rounded-[4px] opacity-80 text-white '>
                    <div>{toasterText}</div>
                </div>
            </div> : null}
            {loading ? <div className='flex gap-2 items-center mt-[5px] justify-center bg-black text-white py-[10px] px-4  rounded-[4px] opacity-70 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
                {text === 'Loading' ? <div>
                    <RotatingLines strokeColor='white' width='16' />
                </div> : null}
                <div className='text-[16px]'>{text}</div>
            </div> : null}



            <div className="px-3 py-10 text-white h-screen signup">

                <img src={logo} alt="" className='mx-auto mb-5' />

                <div className="flex items-center justify-start space-x-2 h-11">
                    <img src={mobile} alt="" className='w-5 h-5' /> <p className='text-[rgb(104,104,104)]'>Phone +91</p>
                </div>

                <div className="border-0 border-b-[1px] border-[rgb(104,104,104)] px-2 mb-3">
                    <input value={mobno} onChange={e => { setMobno(e.target.value); setOTPfield(String(Math.floor(100000 + Math.random() * 900000))) }} type="text" name="" id="" className='bg-transparent placeholder:text-[rgb(104,104,104)] w-full h-11 outline-none' placeholder='Please enter 10-digit phone number' />
                </div>

                <div className="flex items-center justify-start space-x-2 h-11">
                    <img src={password} alt="" className='w-5 h-5' /> <p className='text-[rgb(104,104,104)]'>Password</p>
                </div>

                <div className="border-0 border-b-[1px] border-[rgb(104,104,104)] px-2 mb-3">
                    <input value={pwd} onChange={e => setpwd(e.target.value)} type='password' name="" id="" className='bg-transparent placeholder:text-[rgb(104,104,104)] w-full h-11 outline-none' placeholder='Please enter password' />
                </div>

                <div className="flex items-center justify-start space-x-2 h-11">
                    <img src={password} alt="" className='w-5 h-5' /> <p className='text-[rgb(104,104,104)]'>Withdrawal Password</p>
                </div>

                <div className="border-0 border-b-[1px] border-[rgb(104,104,104)] px-2 mb-3">
                    <input value={wpwd} onChange={e => setwpwd(e.target.value)} type='password' name="" id="" className='bg-transparent placeholder:text-[rgb(104,104,104)] w-full h-11 outline-none' placeholder='Please enter the Withdrawal password' />
                </div>

                <div className="flex items-center justify-start space-x-2 h-11">
                    <img src={otpimg} alt="" className='w-5 h-5' /> <p className='text-[rgb(104,104,104)]'>OTP</p>
                </div>

                <div className="border-0 border-b-[1px] border-[rgb(104,104,104)] px-2 mb-3 flex">
                    <input onChange={(e) => setOtp(e.target.value)} type="text" name="" id="" className='bg-transparent placeholder:text-[rgb(104,104,104)] flex-1 h-11 outline-none' placeholder='Plese enter the OTP' />
                    <button disabled={seconds > 0 || minutes > 0} onClick={handleMessage} className='bg-[#ffcb00] text-white w-1/3 rounded-md font-bold h-10'>
                        {seconds > 0 || minutes > 0 ?
                            <>
                                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </>
                            :
                            'send'
                        }
                    </button>
                </div>

                <div className="flex items-center justify-start space-x-2 h-11">
                    <img src={info} alt="" className='w-5 h-5' /> <p className='text-[rgb(104,104,104)]'>Please enter the invitation code</p>
                </div>

                <div className="border-0 border-b-[1px] border-[rgb(104,104,104)] px-2 mb-3">
                    <input value={invt} onChange={e => setInvt(e.target.value)} type="text" name="" id="" className='bg-transparent placeholder:text-[rgb(104,104,104)] w-full h-11 outline-none' placeholder='Please enter the invitation code' />
                </div>

                <button onClick={handleRegister} className='h-10 mb-6 mt-10 text-black font-bold rounded-lg bg-[linear-gradient(90deg,#dca936,#f8d070)] w-full'>Register</button>

                <div className="flex justify-center">
                    <Link to={'/login'} className=''>Login</Link>
                </div>

            </div>

        </>

    )
}

export default Register2