import { useSelector } from "react-redux";

import HomeLayout from "../../Layout/HomeLayout";

function Profile() {
    const authstate = useSelector((state) => state.auth);

    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex justify-center items-center">
                <div className="card text-primary-content w-1/2">
                    <div className="card-body">
                        <h2 className="card-title text-3xl bg-slate-400 rounded-md m-2 p-3">Profile</h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-xl text-white">
                                <span className="font-bold">Name:</span>
                            </div>
                            <div className="text-xl text-[#2aa198]">
                                {authstate.data.name}
                            </div>
                            <div className="text-xl text-white">
                                <span className="font-bold">Email:</span>
                            </div>
                            <div className="text-xl text-[#2aa198]">
                                {authstate.data.email}
                            </div>
                            <div className="text-xl text-white">
                                <span className="font-bold">Role:</span>
                            </div>
                            <div className="text-xl text-[#2aa198]">
                                {authstate.role}
                            </div>
                            <div className="text-xl text-white">
                                <span className="font-bold">Client Name:</span>
                            </div>
                            <div className="text-xl text-[#2aa198]">
                                {authstate.data.clientName}
                            </div>
                            <div className="text-xl text-white">
                                <span className="font-bold">Status:</span>
                            </div>
                            <div className="text-xl text-[#2aa198]">
                                {authstate.data.userStatus}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </HomeLayout>
    );
}

export default Profile;
