import SideNav from "../components/SideNav"
import GroupInput from "../components/GroupInput"
export default function CreateGroup(){
    return(
        <div style={{ height: '100vh' }} className="flex flex-row ">
            <SideNav/>
            <GroupInput/>
        </div>
    )
}