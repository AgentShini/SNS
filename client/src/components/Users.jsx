
import React, { useState,useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {DataContext} from "../Context"
export default function Users(){
  const {
    activeDropdowns,
   SearchData, SearchResult, FetchUsers, toggleDropdown
   } = useContext(DataContext)
   const [addFriend, setAddFriend] = useState({});

   const navigate = useNavigate();


   const AddFriend = (index, id) => {
    setAddFriend((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
    console.log(id); 
      navigate(`/Chat`)
  };



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
  
    
 


   
    return(
        <div className="mx-auto max-w-7xl px-1 sm:px-6 lg:px-0" style={{width:"100vw",height:"100vh",overflow:"scroll"}}>
            <section className="bg-gray-50 dark:bg-gray-700 p-3 sm:p-5">
            <h1 className="text-3xl font-bold tracking-tight text-gray-500 px-4 py-3">Current Users</h1>
    <div className="mx-auto max-w-screen-xl px-4 lg:px-12" >
        <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-1/2">
                    <form className="flex items-center">
                        <label htmlFor="simple-search" className="sr-only">Search</label>
                        <div className="relative w-full">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                             value = {SearchData} onChange={FetchUsers} placeholder="Search"/>
                        </div>
                    </form>
                </div>
              
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                   
                        <tr>
                            <th scope="col" className="px-4 py-3">EMAIL</th>
                            <th scope="col" className="px-4 py-3">USERNAME</th>
                            <th scope="col" className="px-4 py-3">DATE JOINED</th>
                            <th scope="col" className="px-4 py-3">
                                <span className="sr-only">Actions</span>
                            </th>
                            </tr>
                    </thead>
                    <tbody>
                    {SearchResult.map((user, index) => (
          <tr key={index} className="border-b dark:border-gray-700">
            <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              {user.email}
            </th>
            <td className="px-4 py-3">{user.username}</td>
            <td className="px-4 py-3">{formatDate(user.date_joined)}</td>
            <td className="px-4 py-3 flex items-center justify-end">
              <button
                onClick={() => toggleDropdown(index)}
                className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                type="button"
              >
                <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
              </button>
              <div
                className={`z-10 w-22 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 ${
                  activeDropdowns[index] ? '' : 'hidden'
                }`}
              >
                 <button onClick={()=>AddFriend(index,user._id)} id = {user._id} className=" text-md text-gray-700 dark:text-gray-200 block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                     Message
                    </button>
            
              </div>
            </td>
          </tr>
        ))}
                    </tbody>
                </table>
            </div>
           
        </div>
    </div>
    </section>
        </div>
    )
}