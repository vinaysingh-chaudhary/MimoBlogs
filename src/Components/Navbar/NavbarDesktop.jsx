import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "../compConfig";
import { useSelector } from "react-redux";
import { logout } from "../../Helper/HelperFunction";
import {BsFillPencilFill} from 'react-icons/bs'

const nav_data = [
  { label: "Home", nav: "/" },
  { label: "About", nav: "/about" },
  { label: "Socials", nav: "/social" },
];

const NavbarDesktop = () => {

  const authStatus = useSelector((store) => store.authentication.authStatus);
  const userData = useSelector((store) => store.authentication.userData);
  const profileIcon = userData?.currentUser?.name;
  const [activeProfile, setActiveProfile] = useState(false)
  const navigate = useNavigate()

  const handleProfileTab = () => {
    setActiveProfile(!activeProfile);

    setTimeout(() => {
      setActiveProfile(false);
    }, 6000);
  };



  return (
    <div className="w-full h-full flex justify-between items-center bg-[#0e0e0e] px-3">

      <div className="w-[33%]">
          <p className="text-4xl text-white cursor-pointer" onClick={() => { navigate("/") }}> mimoblogs</p>
       </div>

      <div className="w-[30%] h-[70%] border-[0.5px] hidden rounded-[50px] md:flex justify-center items-center border-[#1c1c1c] gap-8">
        {nav_data.map((tab, label) => { return <NavLink to={tab.nav}  key={label} ><button className="text-white hover:text-purple-500 ">{tab.label}</button> </NavLink> })}
      </div>

      <div className="w-[33%] flex justify-end items-center pt-2">
        
        <button className="hidden md:flex px-15 py-2.5 mb-2 px-20 mr-2 text-sm font-medium text-puple-500 bg-gray-200 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-500" onClick={() => navigate("/create")}>Write</button>
        <button className=" md:hidden px-10 py-2.5 mr-2 mb-2 text-xl font-medium text-puple-500 bg-gray-200 focus:outline-none rounded-full border border-gray-200 hover:bg-gray-100 hover:text-purple-500" onClick={() => navigate("/create")}><BsFillPencilFill/></button>
        
        {authStatus === false
          ? (<Button label={"Login"} onClick={() => navigate("/login")} />)
          : (<div className="relative rounded-full">
            <button onClick={() => handleProfileTab()} className=" w-10 h-10 pb-1 border-2 rounded-full text-2xl flex justify-center items-center text-white">
              {profileIcon?.slice(0, 1)}
            </button>

            {activeProfile && (
              <div className=" w-44 h-40 absolute -bottom-44 -left-36 -pr-8 border-2 bg-[#3d3d3d] rounded-lg border-black flex items-center justify-center z-[10000]">
                <Button label="Logout" onClick={() => logout()} />
              </div>
            )}
          </div>
          )}
      </div>
    </div>
  );
};

export default NavbarDesktop;
