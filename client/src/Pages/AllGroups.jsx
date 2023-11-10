import SideNav from "../components/SideNav"
import GroupsIn from "../components/GroupsIn"

export default function AllGroups(){
    return(
        <div style={{ height: '100vh' }} className="flex flex-row ">
            <SideNav/>
            <GroupsIn/>
            </div>
    )

}