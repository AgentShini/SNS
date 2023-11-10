import SideNav from "../components/SideNav"
import Inactive from "../components/Inactive";
import { } from 'flowbite-react';
export default function InactiveChat(){
    return(
        <div style={{ height: '100vh' }} className="flex flex-row ">
        <SideNav/>
        <Inactive/>
        </div>
       

    )
}