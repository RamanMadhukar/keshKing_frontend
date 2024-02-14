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

const Login2 = () => {

    const navigate = useNavigate();
    const auth = getAuth();
    const [mobno, setmobno] = useState('');
    const [pwd, setpwd] = useState('');
    const [bloackedUsers, setBlockedUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('Loading');
    const [toasterShow, setToasterShow] = useState(false);
    const [toasterText, setToasterText] = useState('');

    const toaster = (text) => {
        setToasterText(text);
        setToasterShow(true);
        setTimeout(() => {
            setToasterShow(false);
        }, 5000);
    }


    useEffect(() => {
        document.body.style.backgroundColor = "#b2e7e4";
        getBlockedUsers();
    }, []);

    const getBlockedUsers = async () => {
        const dataRes = await axios.get(`${BASE_URL}/get_blocked_users`).then(res => res.data);
        var temp = [];
        dataRes.forEach((doc) => {
            //console.log(doc.data());
            temp.push(doc.user_id);
            setBlockedUsers(temp);
        });
    }

    const handleSignIn = async () => {
        if (bloackedUsers.includes(String(mobno))) {
            toaster('You are blocked by the administrator!');
            return;
        }
        setLoading(true);
        setText('Loading')

        await axios.post(`${BASE_URL}/login`, { mobno, pwd })
            .then(({ data }) => {
                if (data.user_details === null) {
                    throw "Could not login/something went wrong";
                }
                //console.log(data);
                localStorage.setItem('uid', data.user_details._id);
                setText('Login Successful!');
                setTimeout(() => {
                    navigate('/home');
                    setLoading(false);
                }, 1000);
            })
            .catch(error => {
                //console.log(error);
                setText('Something went wrong!');
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            });
    }


    return (
        <>

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
                        <input value={mobno} onChange={e => setmobno(e.target.value)} type="text" name="" id="" className='bg-transparent placeholder:text-[rgb(104,104,104)] w-full h-11 outline-none' placeholder='Please enter 10-digit phone number' />
                    </div>

                    <div className="flex items-center justify-start space-x-2 h-11">
                        <img src={password} alt="" className='w-5 h-5' /> <p className='text-[rgb(104,104,104)]'>Password</p>
                    </div>

                    <div className="border-0 border-b-[1px] border-[rgb(104,104,104)] px-2 mb-3">
                        <input value={pwd} onChange={e => setpwd(e.target.value)} type='password' name="" id="" className='bg-transparent placeholder:text-[rgb(104,104,104)] w-full h-11 outline-none' placeholder='Please enter password' />
                    </div>

                    <button onClick={handleSignIn} className='h-10 mb-6 mt-10 text-black font-bold rounded-lg bg-[linear-gradient(90deg,#dca936,#f8d070)] w-full'>Login</button>

                    <div className="flex justify-center">
                        <Link to={'/register'} className=''>Register</Link>
                    </div>

                </div>

            </>

        </>
    )
}

export default Login2