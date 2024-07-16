/* eslint-disable no-mixed-spaces-and-tabs */


import { useState } from 'react';
import DataTable from 'react-data-table-component';
import { useSelector } from 'react-redux';

import TicketDetailsModal from '../components/TicketDetailsModal';
import useTickets from "../Hooks/UseTickets";
import HomeLayout from "../Layout/HomeLayout";

const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;


function Dashboard() {

    const [ticketState] = useTickets();
    const [ticketsdisplay,setticketsdisplay] = useState({});

    const columns = [
        {
            name: 'Ticket Id',
            selector: row => row._id,
            reorder: true,
            width: '120px', // adjusted column width
        },
        {
            name: 'Title',
            selector: row => row.title,
            reorder: true,
            width: '200px', // adjusted column width
        },
        {
            name: 'Description',
            selector: row => row.description,
            reorder: true,
            width: '300px', // adjusted column width
        },
        {
            name: 'Reporter',
            selector: row => row.assignedTo,
            reorder: true,
            width: '150px', // adjusted column width
        },
        {
            name: 'Priority',
            selector: row => row.ticketPriority,
            reorder: true,
            sortable: true,
            width: '120px', // adjusted column width
        },
        {
            name: 'Assignee',
            selector: row => row.assignee,
            reorder: true,
            width: '150px', // adjusted column width
        },
        {
            name: 'Status',
            selector: row => row.status,
            reorder: true,
            sortable: true,
            width: '120px', // adjusted column width
        }
    ];

    const customStyles = {
        rows: {
            style: {
                minHeight: '48px', // decreased the row height
                fontSize: '14px', // adjusted font size
            },
        },
        headCells: {
            style: {
                paddingLeft: '6px', // decreased the cell padding for head cells
                paddingRight: '6px',
                fontSize: '14px', // adjusted font size
            },
        },
        cells: {
            style: {
                paddingLeft: '6px', // decreased the cell padding for data cells
                paddingRight: '6px',
                fontSize: '14px', // adjusted font size
            },
        },
    };



      

    const authstate = useSelector((state)=>state.auth);


    return (
        <HomeLayout>
            <div className="min-h-[90vh] flex flex-col items-center justify-center gap-2 px-4">

                <div className="bg-yellow-500 w-full justify-center mt-4 text-black text-center text-3xl py-4 font-bold hover:bg-yellow-400 transition-all ease-in-out duration-300">
                Tickets Records 
                </div>

                {/* Table */}
                <div >
                    {ticketState  && 
                        <DataTable
                        onRowClicked={(row) => { 
                            document.getElementById("tickets_modal").showModal();
                            setticketsdisplay(row);
                        }}
                        columns={columns}
                        data={ticketState.ticketlist}
                        expandableRows
                        expandableRowsComponent={ExpandedComponent}
                        customStyles={customStyles}
		        />}
                {!(authstate.role=="customer") && <TicketDetailsModal tickets = {ticketsdisplay} key={ticketsdisplay.status}/>}
                </div>
            </div>  
        </HomeLayout>
    );
}

export default Dashboard;