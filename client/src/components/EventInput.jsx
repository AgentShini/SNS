import { Datepicker } from 'flowbite-react';
import { useState, useContext } from "react";
import {useNavigate} from "react-router-dom"
import { DataContext } from '../Context';



  
export default function EventInput(){

    const {FetchEvents,FetchMyEvents} = useContext(DataContext)
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    const handleDatePickerChange = (selectedDate) => {
      const unformattedDate = selectedDate;
      const formattedDate = formatDateToISOString(unformattedDate);
  
  
    };


    const navigate = useNavigate()

    function formatDateToISOString(inputDate) {
      // Assuming inputDate is a string representation of the date
      const dateObject = new Date(inputDate);
    
      // Add one day to the date
      dateObject.setDate(dateObject.getDate() + 1);
    
      // Convert to ISO string format
      const isoString = dateObject.toISOString();
    
      return isoString;
    }
    



    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const end_date = document.getElementById('end_date').value;
          const start_date = document.getElementById('start_date').value;
          const response = await fetch(`${import.meta.env.VITE_SERVER}chat/createEvent`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({name , description, start_date, end_date }),
            credentials: 'include',
          });
    
          if (response.status === 200) {
            FetchEvents()
            FetchMyEvents()
            alert("SUCCESS")
            navigate(`/Events`)
        } else {
          
            const errorData = await response.json();
            alert(errorData.message)
            console.error('Event Creation Error:', errorData.message);
          }
        } catch (error) {
          console.error('Group Creation Error:', error.message);
        }
      };
return(
<section style={{width:"100vw"}}>
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto xl:h-screen lg:py-0">

      <div className=" bg-gray-900 w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create Event
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              <Datepicker 
              title="Start Date"
              id = "start_date"
              placeholder='Start Date'
              onSelectedDateChanged={handleDatePickerChange}
              />
              </div>


                <div className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              <Datepicker 
              title="End Date"
              id = "end_date"
              placeholder='End Date'
              onSelectedDateChanged={handleDatePickerChange}
              />
              </div>

                  <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                      <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Food Group" required=""/>
                  </div>
                  <div>
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <input type="description" value={description} onChange={(e) => setDescription(e.target.value)}name="description" id="description" placeholder="•Short discussion about food " className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>      
            
                  <button type="submit" className="w-full text-gray-500 bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create Event</button>
                
              </form>
          </div>
      </div>
  </div>
</section>
)
}
