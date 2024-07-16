import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import {login} from '../../Redux/Slices/AuthSlice';
function Login(){


    const dispatch=useDispatch();
    const navigate = useNavigate();

    const [logindetails,setlogindetails] = useState({
        email:"",
        password:""
    });


    function resetlogindetails(){
        setlogindetails({
            email:"",
            password:""
        });
    }
    
    async function onSubmit(){
        if(!logindetails.email || !logindetails.password)return;
        console.log(logindetails);
        const response = await dispatch(login(logindetails));
        if(response.payload) navigate("/");
        else {
            resetlogindetails();
        }
    }


    function handleInputChange(e){
        const{name,value}=e.target;
        setlogindetails({...logindetails,
            [name]:value
        });
    }




    return(
        <div className="flex justify-center items-center h-[90vh]">
            <div className="card bg-primary text-primary-content w-96">
                <div className="card-body flex flex-col items-center">
                    <div className="w-full flex justify-center">
                        <h2 className="card-title text-4xl text-white">Login</h2>
                    </div>
                    <div className="w-full">
                        <input 
                        onChange={handleInputChange}
                        name="email"
                        autoComplete="one-time-code" 
                        type="text" placeholder="User-id..." 
                        value={logindetails.email}
                        className="input text-white input-bordered input-primary w-full max-w-xs" />
                    </div>
                    <div className="w-full">
                        <input 
                        onChange={handleInputChange}
                        name="password"
                        autoComplete="one-time-code" 
                        type="password" 
                        placeholder="Password" 
                        value={logindetails.password}
                        className="input text-white input-bordered input-primary w-full max-w-xs" />
                    </div>
                    <div className="w-full mt-4">
                        <div className="card-actions justify-end">
                        <button onClick={onSubmit} className="btn btn-warning w-full font-bold text-xl">SUBMIT</button>
                    </div>
                    </div>
                    <p className="text-l text-white">
                        Already have an account ? <Link className="text-yellow-200 font-semibold hover:text-white" to="/signup">Signup Instead</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}


export default Login;