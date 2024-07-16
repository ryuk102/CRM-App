import {  useState } from "react";
import { useDispatch } from "react-redux";

import { updateticket } from "../Redux/Slices/TicketSlice";

function TicketDetailsModal({tickets}){


    const [currentticket,setcurrentticket] = useState(tickets);
    const dispatch = useDispatch();

    function handleTicketChange(e){
        const {name,value} = e.target;
        setcurrentticket({
            ...currentticket,
            [name]:value
        });
    }
    async function handleSubmit(){
        await dispatch(updateticket(currentticket));
        const modal = document.getElementById("tickets_modal");
        modal.close();
    }

    return (
        <dialog id="tickets_modal" className="modal">
            <div className="modal-box">
                <h3 className="font-bold text-lg">{tickets.title}</h3>
                {/* <p className="py-4">Press ESC key or click the button below to close</p> */}
                <textarea 
                className=" bg-white text-black resize-none w-full p-2 rounded-md" 
                name = "description"
                rows="7" 
                cols="50"
                value = {currentticket.description}
                onChange={handleTicketChange}
                >
                </textarea>

                <h1 className="text-lg text-white ">
                    Priority:
                    <select name = "ticketPriority" className="mx-2 p-1 my-2" onChange={handleTicketChange}>
                        <option value="1" selected = {currentticket.ticketPriority==1}>1</option>
                        <option value="2" selected = {currentticket.ticketPriority==2}>2</option>
                        <option value="3" selected = {currentticket.ticketPriority==3}>3</option>
                        <option value="4" selected = {currentticket.ticketPriority>=4}>4</option>
                    </select>
                </h1>

                <h1 className="text-lg text-white my-4">
                    Status:
                    <select name="status" className="mx-2 p-1" onChange={handleTicketChange}>
                        <option value="open" selected = {currentticket.status=="open"}>open</option>
                        <option value="inProgress" selected = {currentticket.status=="inProgress"}>inProgress</option>
                        <option value="onHold" selected = {currentticket.status=="onHold"}>onHold</option>
                        <option value="resolved" selected = {currentticket.status=="resolved"}>resolved</option>
                        <option value="cancelled" selected = {currentticket.status=="cancelled"}>cancelled</option>
                    </select>
                </h1>


                <div className="modal-action">
                    <button onClick={handleSubmit} className="btn-success px-4 py-2 bg-green-700 rounded-md text-lg font-semi hover:bg-green-400 transition-all ease-in-out duration-300">Update ticket</button>
                </div>
            </div>
            <form method="dialog" className="modal-backdrop">
                        <button>close</button>
            </form>
        </dialog>
    );
}

export default TicketDetailsModal;