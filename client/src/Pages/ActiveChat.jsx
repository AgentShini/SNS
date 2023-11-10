import SideNav from "../components/SideNav"
import Users from "../components/Users";
import { } from 'flowbite-react';
export default function ActiveChat(){
    return(
        <div style={{ height: '100vh',width:'100vw' }} className="flex flex-row ">
        <SideNav/>
        <Users/>
        </div>
       

    )
}