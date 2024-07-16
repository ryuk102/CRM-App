import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useState } from "react";

import Usetickets from "./UseTickets";


ChartJS.register(ArcElement, Legend, Title, Tooltip, CategoryScale, LinearScale,PointElement,LineElement,BarElement);

function UseCharts(){
    const [ticketState]= Usetickets();

    const [lineticketsdata,setlineticketsdata] = useState({
        opentickets:[],
        inProgresstickets:[],
        resolvedtickets:[]
    });

    const [barticketsdata,setbarticketsdata] = useState({
        opentickets:[],
        inProgresstickets:[],
        resolvedtickets:[]
    });

    const pieChartData = {
        labels : Object.keys(ticketState.ticketDistribution),
        fontColor: "white",
        datasets : [
            {
                label: "Status",
                data : Object.values(ticketState.ticketDistribution),
                backgroundColor: ["yellow","orange","purple","gray","white"],
                borderColor:["yellow","orange","purple","gray","white"]
            }
        ]
     };


     const lineChartData = {
        labels : Object.keys(lineticketsdata.inProgresstickets),
        fontColor: "white",
        datasets : [
            {
                label: "Open Tickets Data",
                data : Object.values(lineticketsdata.opentickets),
                borderColor: 'rgb(255, 99, 132)',
            },
            {
                label: "In Progress Tickets Data",
                data : Object.values(lineticketsdata.inProgresstickets),
                borderColor: 'rgb(53, 162, 235)',
            },
            {
                label: "Resolved Tickets Data",
                data : Object.values(lineticketsdata.resolvedtickets),
                borderColor: 'rgb(245, 205, 95)',
            }
        ]
     };


     const barChartData = {
        labels : ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"],
        datasets : [
            {
                label: "Open Tickets Data",
                data : Object.values(barticketsdata.opentickets),
                backgroundColor: 'rgb(255, 99, 132)',
            },
            {
                label: "In Progress Tickets Data",
                data : Object.values(barticketsdata.inProgresstickets),
                backgroundColor: 'rgb(53, 162, 235)',
            },
            {
                label: "Resolved Tickets Data",
                data : Object.values(barticketsdata.resolvedtickets),
                backgroundColor: 'rgb(245, 205, 95)',
            },

        ]
     };

     function processTickets(){
        const currentdate = new Date();
        const tenthDateFromToday = new Date();
        tenthDateFromToday.setDate(currentdate.getDate()-10);
        if(ticketState.ticketlist.length>0){
            let openticketdata = {};
            let inprogressticketdata = {};
            let resolvedtickedata = {};

            let openticketsByMonth = { "January": 0, "February": 0, "March": 0, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 0 };
            let inProgressticketsByMonth = { "January": 0, "February": 0, "March": 0, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 0 };
            let resolvedticketsByMonth = { "January": 0, "February": 0, "March": 0, "April": 0, "May": 0, "June": 0, "July": 0, "August": 0, "September": 0, "October": 0, "November": 0, "December": 0 };

            for(let i=10;i>=0;i--){
                const dateobject = new Date();
                dateobject.setDate(dateobject.getDate()-i);
                openticketdata[dateobject.toLocaleDateString().split("/").reverse().join("-")] = 0;
                inprogressticketdata[dateobject.toLocaleDateString().split("/").reverse().join("-")] = 0;
                resolvedtickedata[dateobject.toLocaleDateString().split("/").reverse().join("-")] = 0;
            }
            ticketState.ticketlist.forEach(ticket => {
                const date = new Date(ticket.createdAt).toLocaleDateString().split("/").reverse().join("-");
                const ticketDate = new Date(ticket.createdAt);
                let dateformonth = ticketDate.toLocaleString('default', { month: 'long' });
                if(ticket.status == "open" && ticketDate>=tenthDateFromToday){
                    openticketdata[date] =  openticketdata[date]+1;
                    
                }
                if(ticket.status == "inProgress" && ticketDate>=tenthDateFromToday){
                    inprogressticketdata[date] = inprogressticketdata[date]+1;
                }
                if(ticket.status == "resolved" && ticketDate>=tenthDateFromToday){
                    resolvedtickedata[date] = resolvedtickedata[date]+1;
                }

                if(ticket.status=="open"){
                    openticketsByMonth[dateformonth] = openticketsByMonth[dateformonth]+1;
                }
                if(ticket.status=="inProgress"){
                    inProgressticketsByMonth[dateformonth] = inProgressticketsByMonth[dateformonth]+1;
                }
                if(ticket.status=="resolved"){
                    resolvedticketsByMonth[dateformonth] = resolvedticketsByMonth[dateformonth]+1;
                }
            });
           setlineticketsdata({
             opentickets:openticketdata,
             inProgresstickets:inprogressticketdata,
             resolvedtickets:resolvedtickedata,

           });

        //    console.log(openticketsByMonth);

           setbarticketsdata({
            opentickets:openticketsByMonth,
            inProgresstickets:inProgressticketsByMonth,
            resolvedtickets:resolvedticketsByMonth
           });
           //console.log(barticketsdata);
        }
     }

     useEffect(() => {
        processTickets();
     },[ticketState.ticketlist]);

     return [lineChartData,pieChartData,barChartData];
}

export default UseCharts;