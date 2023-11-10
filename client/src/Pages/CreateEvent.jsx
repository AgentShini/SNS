import SideNav from "../components/SideNav"
import EventInput from "../components/EventInput"
export default function CreateEvent(){
    return(
        <div style={{ height: '100vh' }} className="flex flex-row ">
            <SideNav/>
            <EventInput/>
        </div>
    )
}