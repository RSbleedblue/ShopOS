import { Outlet } from "react-router-dom";
import SideBar from "./projects/common/sidebar";
import AssetEditor from "./features/components/AssetEditor";
import Navbar from "./projects/common/navbar";
import GeneratedImage from "./features/components/GeneratedImage";

const Layout = () => {
    return (
        <>
            {/* fixed will be NAVBAR and SIDE BAR */}
            {/* SHUBHAMS NAVBAR */}
            <Navbar/>
            <div className="flex">
                <SideBar/>
                <Outlet/>
                <AssetEditor/>
                <GeneratedImage/>
            </div>
        </>
    )
}
export default Layout;