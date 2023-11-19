import { useState,useContext } from "react";
import {DataContext} from "../Context"
export default function EventsIn(){
  const {events} = useContext(DataContext)

  const [access_code, setAccessCode] = useState('');


 
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





  const handleSubmit = async (e) => {
    const updatedAccessCode = e.target.value;

    setAccessCode(updatedAccessCode);

    try {
      const response = await fetch('http://localhost:5000/chat/joinEvent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_code:updatedAccessCode }),
        credentials: 'include',
      });

      if (response.status === 200) {
        alert("SUCCESS")
    } else {
      
        const errorData = await response.json();
        alert(errorData.message)
        console.error('Event Joining Error:', errorData.message);
      }
    } catch (error) {
      console.error('Event Joining Error:', error.message);
    }
  };

    return(
      <div style={{overflow:"scroll"}}>
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
          <tr key={index}>
          <td>
              <div className="flex items-center space-x-3">
            
                <div>
                  <div className="font-bold">{events.name}</div>
                </div>
              </div>
            </td>
            <td>
              {formatDate(events.creation_date)}
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
              <button onClick={handleSubmit} value = {events.access_code} className="btn btn-ghost btn-xs">Join Event </button>
            </th>
          </tr>
            ))}
        </tbody>
      
        
      </table>
    </div>
    )

}
