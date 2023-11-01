import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Button } from "../compConfig";
import { useSelector } from "react-redux";
import { logout } from "../../Helper/HelperFunction";

const nav_data = [
  { label: "Home", nav: "/" },
  { label: "About", nav: "/about" },
];


const NavbarDesktop = () => {

  const [activeTab, setActiveTab] = useState(nav_data[0].nav);
  const navigate = useNavigate()
  const authStatus = useSelector((store) => store.authentication.authStatus); 
  const userData = useSelector((store) => store.authentication.userData); 
  const profileIcon = userData?.currentUser?.name; 


  const [activeProfile, setActiveProfile] = useState(false); 
  console.log(authStatus);


  const handleProfileTab = () => {
    if(activeProfile === true){
      setActiveProfile(false);
    }else{
      setActiveProfile(true); 
    }; 

    setTimeout(() => {
      setActiveProfile(false)
    }, 6000);
  }



  return (
    <div className=" w-full h-full flex justify-between items-center px-3 bg-black ">

      <div>
        <p className="text-4xl text-white" onClick={() =>{ navigate("/"), setActiveTab("/")}}>mimoblogs</p>
      </div>

      <div className="w-42 h-12 bg-[#a1a1a164] flex justify-center items-center py-2 px-1 rounded-[50px] ">
        {nav_data.map((tab) => {
          return (
            <button key={tab.nav} onClick={() => {navigate(tab.nav), setActiveTab(tab.nav)}} className="relative w-20 h-10 flex justify-center items-center">
              {tab.nav === activeTab && (
                <motion.div layoutId="active-pill" className="absolute inset-0 rounded-[50px] bg-[#282828]" transition={{ duration: 0.3 }} />
              )}

              {<span className={`relative ${activeTab === tab.nav ? "text-white" : "text-gray-300"}`}>{tab.label}</span>}
            </button>
          );
        })}
      </div>



        {
          authStatus === false 
          ? <Button label={"Login"} onClick={() => navigate("/login")} /> 
          : (
            <div className="relative border-2 border-white rounded-full">
            <button onClick={() => handleProfileTab()} className=" w-10 h-10 rounded-full text-2xl flex justify-center items-center text-white">{profileIcon?.slice(0,1)}</button>
                 {
                     activeProfile&&<div className=" w-44 h-40 absolute -bottom-44 -left-36 -pr-8 border-2 bg-white rounded-lg border-black flex items-center justify-center">
                                                   {authStatus ? <Button label="Logout"  onClick={() => logout()}/> :  <Button label="Login"  onClick={() => navigate("/login")}/>}
                                              </div>
                  }
         </div>
          )
        }

        





    </div>
  );
};

export default NavbarDesktop;

