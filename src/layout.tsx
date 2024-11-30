import SideBar from "./projects/common/sidebar";

const Layout = () => {
    return (
        <>
            {/* fixed will be NAVBAR and SIDE BAR */}
            <div className="flex">
                <SideBar/>
            </div>
        </>
    )
}
export default Layout;