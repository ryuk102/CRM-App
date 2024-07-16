import { useEffect } from 'react';
import {BsMenuButtonWide} from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout } from '../Redux/Slices/AuthSlice';
import { loadTickets } from '../Redux/Slices/TicketSlice';
function HomeLayout({children}){
    const authState = useSelector((state) => state.auth);
    const dispatch =useDispatch();
    const navigate = useNavigate();
    function onLogout(){
        dispatch(logout());
        dispatch(loadTickets());
        navigate("/login");
    }

    useEffect(() => {
        if(!authState.isLoggedIn)navigate("/login");
    },[]);

    return (
        <div className="min-h-[90vh]">
            <div className="drawer absolute left-0 right-0 cursor-pointer mt-4 ml-4">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer">
                        <BsMenuButtonWide
                          size={'32px'}
                          className="cursor-pointer"
                        />
                    </label>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <li><Link to = "/">Home</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>

                    {authState.role=="admin" && <li><Link to="/users">All users</Link></li>}

                    {authState.isLoggedIn && <li><Link to="/ticket/create">Create ticket</Link></li>}

                    <li className="absolute bottom-8 w-3/4">
                        <div className="w-full flex justify-center items-center gap-16">
                            {
                            (!authState.isLoggedIn) ? 
                            (<>
                            <Link to = "/login"><button className='bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 w-full'>Login</button></Link>
                            <Link to  = "/signup"><button className='bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-700 w-full '>Signup</button></Link>
                            </>): 
                            (<>
                            <button onClick={onLogout} className='bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-700 w-full'>Logout</button>
                            <Link to = "/profile"><button className='bg-gray-500 text-white py-1 px-2 rounded hover:bg-gray-700 w-full '>Profile</button></Link>
                            </>)
                        }
                        </div>
                    </li>
                    </ul>
                </div>
            </div>
            
            <div className="flex justify-center items-start">
                <div className="w-8/12">
                    {children}
                </div>
            </div>
       </div>
    );
}

export default HomeLayout;