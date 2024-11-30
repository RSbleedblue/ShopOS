import { AiFillAliwangwang } from "react-icons/ai";
const Navbar = () => {
    return (
      <>
        <div className="flex justify-between items-center text-white px-4">
          <div className=" p-1">
            <AiFillAliwangwang className="text-orange text-[40px]"/>
          </div>
          <div className=" text-gray-200">Projects</div>
          <div className="rounded-full bg-orange p-4 w-6 h-6 flex items-center justify-center">P</div>
        </div>
      </>
    );
  };
  
  export default Navbar;