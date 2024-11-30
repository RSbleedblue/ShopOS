import { FaFolder } from "react-icons/fa";
import { TfiReload } from "react-icons/tfi";
const SideBar = () => {
    return (
        <>
            <div className="h-screen border border-white border-opacity-10 flex flex-col items-center ">
                <div className="flex flex-col p-2 text-gray-300 items-center gap-2 m-2 hover:bg-gray-200 hover:bg-opacity-10 rounded-lg transition-all cursor-pointer ">
                    <FaFolder className="text-sm"/>
                    <p className="text-xs">Products</p>
                </div>
                <div className="flex flex-col p-2 text-gray-300 items-center gap-2 m-2 hover:bg-gray-200 hover:bg-opacity-10 rounded-lg transition-all cursor-pointer ">
                    <TfiReload className="text-sm"/>
                    <p className="text-xs">Generate</p>
                </div>
            </div>
        </>
    )
}

export default SideBar;