import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { filterTickets, getAllCreatedticketsforTheUser, getAllticketsforTheUser ,resetTicketlist } from "../Redux/Slices/TicketSlice";


function Usetickets(){

    const authstate = useSelector((state)=> state.auth);
    const ticketState = useSelector((state) => state.tickets);
    const dispatch=useDispatch();

    const [searchParams] = useSearchParams();



    async function loadAllTickets(){
        if(ticketState.downloadedTickets.length==0){
            if(authstate.role=="customer"){
                await dispatch(getAllCreatedticketsforTheUser());
            }else{
                await dispatch(getAllticketsforTheUser());
            }
        }

        if(searchParams.get("status")){
            dispatch(filterTickets({status : searchParams.get("status")}));
        }else{
            dispatch(resetTicketlist());
        }
    }

    useEffect(()=>{
        loadAllTickets();
    },[authstate.token,searchParams.get("status")]);
    return [ticketState];
}


export default Usetickets;