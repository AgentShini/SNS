import { useState,useContext } from "react";
import {DataContext} from "../Context"

export default function GroupsIn(){
const {groups} = useContext(DataContext)

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
      const response = await fetch('http://127.0.0.1:5000/chat/joinGroup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_code:updatedAccessCode  }),
        credentials: 'include',
      });

      if (response.status === 200) {
        alert("SUCCESS")
    } else {
      
        const errorData = await response.json();
        alert(errorData.message)
        console.error('Group Joining Error:', errorData.message);
      }
    } catch (error) {
      console.error('Group Joining Error:', error.message);
    }
  };


    return(
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto xl:h-screen lg:py-0" style={{overflow:"scroll"}}>
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>Group Name</th>
            <th>Date Created</th>
            <th>Access Code</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
         { groups.map((groups,index)=>(
          <tr>
            <td>
              <div className="flex items-center space-x-3">
            
                <div>
                  <div className="font-bold">{groups.name}</div>
                </div>
              </div>
            </td>
            <td>
              {formatDate(groups.creation_date)}
              <br/>
            </td>
            <th>
            <div className="font-bold">{groups.access_code}</div>
            </th>
            <th>
              <button onClick={handleSubmit} value = {groups.access_code} className="btn btn-ghost btn-xs">Join Group</button>
            </th>
          </tr>
            ))}
        </tbody>
      
        
      </table>
    </div>
    )

}
