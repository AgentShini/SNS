import { useState,useContext } from "react";
import {DataContext} from "../Context"
export default function EventsIn(){
  const {events} = useContext(DataContext)

 
  function formatDate(dateString) {
    const rawDate = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short',
    };
    return rawDate.toLocaleDateString('en-US', options);
  }
  const [leaveEvents, setleaveEvents] = useState({});


  const leaveEvent = (index) => {
    setleaveEvents((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    console.log(index)
  };
    return(
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto xl:h-screen lg:py-0">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Event Name</th>
            <th>Date Created</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Members</th>

            <th></th>
          </tr>
        </thead>
        <tbody>
         { events.map((events,index)=>(
          <tr>
            <td>
              <div className="flex items-center space-x-3">
            
                <div>
                  <div className="font-bold">{events.name}</div>
                </div>
              </div>
            </td>
            <td>
              {events.creation_date}
              <br/>
            </td>
            <th>
            <div className="font-bold">{formatDate(events.start_date)}</div>
            </th>

            <th>
            <div className="font-bold">{formatDate(events.end_date)}</div>
            </th>

            <th>
            <div className="font-bold">{events.access_code}</div>
            </th>
            <th>
              <button onClick={() => leaveEvent(index)}className="btn btn-ghost btn-xs">Join Event </button>
            </th>
          </tr>
            ))}
        </tbody>
      
        
      </table>
    </div>
    )

}
