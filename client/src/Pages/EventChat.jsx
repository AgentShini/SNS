import SideNav from "../components/SideNav"
import UserAvatar from "../components/UserAvatar"
import EventMessages from "../components/EventMessages"
export default function EventChat(){
    return(
        <div style={{ height: '100vh' }} className="grid grid-rows-3 grid-flow-col gap-3">
            <div className="row-span-3 ">
                            <SideNav/>

            </div>
            <UserAvatar/>
            <EventMessages/>
            
        </div>
    )
}