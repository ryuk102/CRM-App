import { Bar, Line, Pie } from "react-chartjs-2";
import { BsFillPencilFill } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { MdOutlineDoneAll } from "react-icons/md";
import { MdPending } from "react-icons/md";
import { TbProgress } from "react-icons/tb";

import Card from "../../components/Card";
import UseCharts from "../../Hooks/UseCharts";
import Usetickets from "../../Hooks/UseTickets";
import HomeLayout from "../../Layout/HomeLayout";




function Home(){



      const [ticketState ] = Usetickets();

      const [lineChartData,pieChartData,barChartData] = UseCharts();
      
       return(
       <HomeLayout>
        {ticketState && (<div className="mt-10 flex  flex-row justify-center gap-6 items-center flex-wrap">
            <Card 
                status={(ticketState.ticketDistribution.open/ticketState.downloadedTickets.length)}
                quantity={ticketState.ticketDistribution.open}
                titleText="Open" 
                background='bg-yellow-300' 
                borderColor='border-green-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <BsFillPencilFill className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.inProgress/ticketState.downloadedTickets.length)}
                quantity={ticketState.ticketDistribution.inProgress}
                titleText="In Progress" 
                background='bg-orange-300' 
                borderColor='border-red-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <TbProgress className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.resolved/ticketState.downloadedTickets.length)}
                quantity={ticketState.ticketDistribution.resolved}
                titleText="Resolved" 
                background='bg-purple-300' 
                borderColor='border-blue-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <MdOutlineDoneAll className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.cancelled/ticketState.downloadedTickets.length)}
                quantity={ticketState.ticketDistribution.cancelled} 
                titleText="Cancelled" 
                background='bg-blue-300' 
                borderColor='border-violet-300' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <MdCancel className='inline mr-2' />
            </Card> 
            <Card 
                status={(ticketState.ticketDistribution.onHold/ticketState.downloadedTickets.length)}
                quantity={ticketState.ticketDistribution.onHold} 
                titleText="On Hold" 
                background='bg-gray-300' 
                borderColor='border-gray-800' 
                fontColor='text-black' 
                dividerColor='bg-black'>
                <MdPending className='inline mr-2' />
            </Card> 
            </div>)}
            <div className="justify-center flex items-center m-10 gap-10">
            <div className="h-80 w-80">
                <Pie data = {pieChartData}/>
            </div>
            </div>
            <div className="justify-center flex items-center mt-10 gap-10">
            <div className="w-[50rem] bg-[wheat]">
                <Line data = {lineChartData}/>
            </div>
            </div>
            <div className="justify-center flex items-center mt-10 gap-10 mb-10">
            <div className="w-[50rem] bg-[wheat]">
                <Bar data = {barChartData}/>
            </div>
            </div>
            
        </HomeLayout>
    );
}

export default Home;