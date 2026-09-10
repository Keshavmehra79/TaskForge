import { useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const UserDashBoard = () => {
  const username = localStorage.getItem("username");
  const nav=useNavigate()
  useEffect(()=>{
        if(!username){
          nav("/")
        }
  },[])
        
  //Logout
  const LogOut=()=>{
      localStorage.clear("useremail","userid","username")

    nav("/")
  }
  return (
    <>
      <div className="min-h-screen flex bg-gray-100">

        {/* Sidebar */}
        <div className="w-64 bg-gray-300 shadow-lg p-5 hidden md:block">
          <h2 className="text-xl font-bold text-blue-600 mb-6">
            User Panel
          </h2>

          <nav className="flex flex-col gap-3">
            <NavLink
              to=""
              end
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`
              }
            >
              Dashboard
            </NavLink>

            <NavLink
              to="yourtask"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-blue-100"
                }`
              }
            >
              Your Tasks
            </NavLink>
          </nav>
        </div>

        {/* Main Section */}
        <div className="flex-1 flex flex-col">

          {/* Header */}
          <div className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
            <h1 className="text-xl font-bold">User Dashboard</h1>
             <button onClick={LogOut}  className=" ml-150 hover:cursor-pointer bg-red-600 px-2 border-1px rounded-2xl">Logout</button>
            <span className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm font-semibold">
              {username}
            </span>

          </div>

          {/* Welcome */}
          <div className="bg-white m-4 p-4 rounded-xl shadow">
            <h2 className="text-lg font-semibold">
              👋 Welcome back, {username}
            </h2>
            <p className="text-gray-500 text-sm">
              Stay productive! Manage your daily tasks efficiently.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4">

            <div className="bg-blue-500 text-white p-5 rounded-xl shadow">
              <h3 className="text-lg font-semibold">Days</h3>
              <p className="text-3xl font-bold mt-2">10</p>
            </div>

            <div className="bg-green-500 text-white p-5 rounded-xl shadow">
              <h3 className="text-lg font-semibold">Action</h3>
               <button
                    onClick={() => {nav("/userdashboard/yourtask")}}
                    className="bg-orange-600 text-white px-3 py-1 rounded-lg hover:cursor-pointer mt-3"
                  >
                    Send Report
                  </button>
            </div>

           

          </div>


          {/* Content */}
          <div className="p-4">
            <div className="bg-white rounded-2xl shadow-md p-6 min-h-[400px]">
              <Outlet />
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white text-center py-3 text-sm">
        www.taskmanagement.com all rights reserved © 2026
      </div>
    </>
  );
};

export default UserDashBoard;