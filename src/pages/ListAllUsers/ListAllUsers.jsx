import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

import UserDetailsModal from "../../components/UserDetailsModal";
import axiosInstance from "../../config/axiosInstance";
import HomeLayout from "../../Layout/HomeLayout";

function ListALLUsers(){

        const [allusers,setallusers] = useState([]);

        const [userdisplay,setuserdisplay] = useState({
            name : "",
            email: "",
            userType : "",
            userStatus : "",
            clientName : "",
            userid : ""
        });

        const columns = [
            {
                name: 'User Id',
                selector: row => row._id,
                reorder: true,
            },
            {
                name: 'Email',
                selector: row => row.email,
                reorder: true,
            },
            {
                name: 'Name',
                selector: row => row.name,
                reorder: true,
            },
            {
                name: 'Status',
                selector: row => row.userStatus,
                reorder: true,
            },
            {
                name: 'Type',
                selector: row => row.userType,
                reorder: true,
                sortable: true,
            }
        ];
    async function loadAllUsers(){
        const response = await axiosInstance.get("/users",{
            headers:{
                'x-access-token' : localStorage.getItem('token')
            }
        });
        setallusers(response?.data?.result);
    }


    useEffect(()=>{
        loadAllUsers();
    },[]);
    
    return (
        <HomeLayout>
            <div className="flex flex-col min-h-[90vh] justify-center items-center" >
                <h1 className="font-bold text-5xl text-yellow-600 texr-center mb-10">
                    Users List
                </h1>
                        {allusers && <DataTable
                        onRowClicked ={(row) => {
                            setuserdisplay({
                                name : row.name,
                                email :row.email,
                                userType :row.userType,
                                userStatus : row.userStatus,
                                clientName : row.clientName,
                                userid:row._id
                            });
                            document.getElementById('user_details_modal').showModal();}
                        }
                        columns={columns}
                        data={allusers}
                        ></DataTable>
                    }
          </div>
          <UserDetailsModal key = {userdisplay.email} users={userdisplay} resetTable = {loadAllUsers}/>
        </HomeLayout>
    );
}

export default ListALLUsers;