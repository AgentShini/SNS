import SideNav from "../components/SideNav"
import MyGroups from "../components/MyGroups"

export default function MyGroupPage(){
    return(
        <div style={{ height: '100vh' }} className="flex flex-row ">
            <SideNav/>
            <MyGroups/>
            </div>
    )

}