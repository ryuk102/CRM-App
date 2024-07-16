import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

function AuthRoutes({allowedListedRoles}){

    const {role} = useSelector((state)=>state.auth);
    return(
        <>
    {allowedListedRoles.find((givenrole) => givenrole==role) ? <Outlet/> : <div>Access Denied</div>}
    </>
    );
}

export default AuthRoutes;