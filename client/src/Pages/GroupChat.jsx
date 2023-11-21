import SideNav from "../components/SideNav"
import UserAvatar from "../components/UserAvatar"
import GroupMessages from "../components/GroupMessages"
export default function GroupChat(){
    return(
        <div style={{ height: '100vh' }} className="grid grid-rows-3 grid-flow-col gap-3">
            <div className="row-span-3 ">
                            <SideNav/>

            </div>
            <UserAvatar/>
            <GroupMessages/>
            
        </div>
    )
}