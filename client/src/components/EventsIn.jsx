import { useState } from "react";
export default function EventsIn(){
  const events= 
  [
    {
      "name": "Food Event",
      "date_joined": "JAN-06-2022",
      "members": "45",
      "start_time": "JAN-18-2023",
      "end_time": "JAN-19-2024"
    },
    {
      "name": "Food Event",
      "date_joined": "FEB-15-2022",
      "members": "53",
      "start_time": "FEB-21-2023",
      "end_time": "FEB-22-2024"
    },
    {
      "name": "Food Event",
      "date_joined": "MAR-22-2022",
      "members": "62",
      "start_time": "MAR-12-2023",
      "end_time": "MAR-13-2024"
    },
    {
      "name": "Food Event",
      "date_joined": "APR-10-2022",
      "members": "70",
      "start_time": "APR-25-2023",
      "end_time": "APR-26-2024"
    },
    {
      "name": "Food Event",
      "date_joined": "MAY-29-2022",
      "members": "78",
      "start_time": "MAY-03-2023",
      "end_time": "MAY-04-2024"
    },
    {
      "name": "Food Event",
      "date_joined": "JUN-14-2022",
      "members": "87",
      "start_time": "JUN-10-2023",
      "end_time": "JUN-11-2024"
    },
    {
      "name": "Food Event",
      "date_joined": "JUL-27-2022",
      "members": "95",
      "start_time": "JUL-15-2023",
      "end_time": "JUL-16-2024"
    },
    {
      "name": "Food Event",
      "date_joined": "AUG-04-2022",
      "members": "102",
      "start_time": "AUG-05-2023",
      "end_time": "AUG-06-2024"
    },
    {
      "name": "Food Event",
      "date_joined": "SEP-19-2022",
      "members": "110",
      "start_time": "SEP-18-2023",
      "end_time": "SEP-19-2024"
    },
    {
      "name": "Food Event",
      "date_joined": "OCT-08-2022",
      "members": "118",
      "start_time": "OCT-25-2023",
      "end_time": "OCT-26-2024"
    }
  ]
  
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
            <th>Date Joined</th>
            <th>Members</th>
            <th>Start Date</th>
            <th>End Date</th>

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
              {events.date_joined}
              <br/>
            </td>
            <th>
            <div className="font-bold">{events.members}</div>
            </th>

            <th>
            <div className="font-bold">{events.start_time}</div>
            </th>

            <th>
            <div className="font-bold">{events.end_time}</div>
            </th>
            <th>
              <button onClick={() => leaveEvent(index)}className="btn btn-ghost btn-xs">Leave EVent</button>
            </th>
          </tr>
            ))}
        </tbody>
      
        
      </table>
    </div>
    )

}
