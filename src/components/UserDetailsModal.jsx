import { useState } from "react";
import toast from "react-hot-toast";

import axiosInstance from "../config/axiosInstance";

function UserDetailsModal({users ,resetTable}){


    const [userdisplay,setuserdisplay] = useState(users);


    async function onUserChange(e){
        try {
            const ul = e.target.parentNode.parentNode;
            const name = ul.getAttribute("name");
            console.log(name);
            const dropdown = document.getElementById(`${name}Dropdown`);
            const userId = users.userid; 
            dropdown.open=!dropdown.open;
            toast("Updating the user....");
        const response =await axiosInstance.patch("/user/updateUser",{
            userId : userId,
            updates : {
                ...userdisplay,
                [name]:e.target.textContent
            },
        },{
            headers : {
                'x-access-token' : localStorage.getItem('token')
            }
        });
        if(response?.data?.result){
            toast.success("Succesfully updated the user");
            const user = response?.data?.result;
            setuserdisplay ({
                name : user.name,
                email : user.email,
                userStatus: user.userStatus,
                clientName:user.clientName,
                userType:user.userType,
                id : userId
            });
            resetTable();
        }
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
  return (
    <dialog id="user_details_modal" className="modal">
                    <div className="modal-box text-bold">
                        <h3 className="font-bold text-lg">User details</h3>
                        <p className="py-4">Name :  <span className="text-yellow-400">{userdisplay.name}</span></p>
                        <p className="py-4">Email : <span className="text-yellow-400">{userdisplay.email}</span></p>
                        <p className="py-4">User Status : 
                            <span className="text-yellow-400">
                            <details className="dropdown ml-2" id="userStatusDropdown">
                            <summary className="btn m-1"  >{userdisplay.userStatus}</summary>
                            <ul name="userStatus" onClick = {onUserChange} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>approved</a></li>
                                <li><a>suspended</a></li>
                                <li><a>rejected</a></li>
                            </ul>
                            </details>
                            </span>
                        </p>
                        <p className="py-4">User Type : 
                            <span className="text-yellow-400">
                            <details className="dropdown ml-2" id="userTypeDropdown">
                            <summary className="btn m-1"  >{userdisplay.userType}</summary>
                            <ul name="userType" onClick = {onUserChange} className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                <li><a>engineer</a></li>
                                <li><a>admin</a></li>
                                <li><a>customer</a></li>
                            </ul>
                            </details>
                            </span>
                        </p>
                        <p className="py-4">Client Name : <span className="text-yellow-400">{userdisplay.clientName}</span></p>
                        
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
  );
}

export default UserDetailsModal;