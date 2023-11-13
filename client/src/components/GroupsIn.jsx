import { useState,useContext } from "react";
import {DataContext} from "../Context"

export default function GroupsIn(){
const {groups} = useContext(DataContext)

  const [joinGroups, setjoinGroups] = useState({});
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


  const joinGroup = (index) => {
    setjoinGroups((prevState) => ({
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
              <button onClick={() => joinGroup(index)}className="btn btn-ghost btn-xs">Join Group</button>
            </th>
          </tr>
            ))}
        </tbody>
      
        
      </table>
    </div>
    )

}
