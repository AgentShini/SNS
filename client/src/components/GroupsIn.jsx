import { useState } from "react";
export default function GroupsIn(){
  const groups= [
    {
      "name":"Food Group",
      "date_joined":"JAN-06-2022",
      "members":"45"
    }, {
      "name": "Food Group",
      "date_joined": "JAN-06-2022",
      "members": "45"
    },
    {
      "name": "Food Group",
      "date_joined": "FEB-15-2022",
      "members": "53"
    },
    {
      "name": "Food Group",
      "date_joined": "MAR-22-2022",
      "members": "62"
    },
    {
      "name": "Food Group",
      "date_joined": "APR-10-2022",
      "members": "70"
    },
    {
      "name": "Food Group",
      "date_joined": "MAY-29-2022",
      "members": "78"
    },
    {
      "name": "Food Group",
      "date_joined": "JUN-14-2022",
      "members": "87"
    },
    {
      "name": "Food Group",
      "date_joined": "JUL-27-2022",
      "members": "95"
    },
    {
      "name": "Food Group",
      "date_joined": "AUG-04-2022",
      "members": "102"
    },
    {
      "name": "Food Group",
      "date_joined": "SEP-19-2022",
      "members": "110"
    },
    {
      "name": "Food Group",
      "date_joined": "OCT-08-2022",
      "members": "118"
    }
  ]
  const [leaveGroups, setleaveGroups] = useState({});


  const leaveGroup = (index) => {
    setleaveGroups((prevState) => ({
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
            <th>Date Joined</th>
            <th>Members</th>
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
              {groups.date_joined}
              <br/>
            </td>
            <th>
            <div className="font-bold">{groups.members}</div>
            </th>
            <th>
              <button onClick={() => leaveGroup(index)}className="btn btn-ghost btn-xs">Leave Group</button>
            </th>
          </tr>
            ))}
        </tbody>
      
        
      </table>
    </div>
    )

}
