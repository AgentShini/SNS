import SideNav from "../components/SideNav"
import EventsIn from "../components/EventsIn"

export default function AllEvents(){
    return(
        <div style={{ height: '100vh' }} className="flex flex-row ">
            <SideNav/>
            <EventsIn/>
            </div>
    )

}