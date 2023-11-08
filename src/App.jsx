import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import authConfig from "./appwrite/authConfig";
import { login, logout } from "./store/slices/authSlice";
import { LoadingScreen, NavbarDesktop } from "./Components/compConfig";
import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const userData = useSelector((store) => store.authentication);
  console.log(userData);

  useEffect(() => {
    const getCurrentUserFunc = async () => {
      try {
        const currentUser = await authConfig.getCurrentUser();
        if (currentUser) {
          dispatch(login({ currentUser }));
        } else {
          dispatch(logout());
        }
      } catch (error) {
        console.log(error);
      }
    };

    getCurrentUserFunc();
    setLoading(false);
  }, []);

  return !loading ? (
    <div className="h-[100vh] bg-[#000000] relative no-scrollbar">

      <div className="h-[8vh] w-full ">
        <NavbarDesktop />
      </div>

      <div className=" w-full h-[90vh]">
        <Outlet />
      </div>
    </div>
  ) : (
    <LoadingScreen />
  );
}

export default App;
