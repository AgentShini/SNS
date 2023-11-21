import SideNav from "../components/SideNav"
import MyEvents from "../components/MyEvents"

export default function MyEventPage(){
    return(
        <div style={{ height: '100vh' }} className="flex flex-row ">
            <SideNav/>
            <MyEvents/>
            </div>
    )

}