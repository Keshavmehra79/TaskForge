import axios from "axios";
import React from "react";
import { useState,useEffect } from "react";

import { Link, Outlet, useNavigate } from "react-router-dom";
const Admindashboard = () => {
  const navigate=useNavigate()
  const [stats,setStats]=useState({
       totalUsers: 0,
  totalTasks: 0,
 completedTasks:0
  })

  //Logout
    const LogOut=()=>{
      localStorage.clear("admin")
      navigate("/")
  }

const fetchStats = async () => {
  try {
       let api=`${import.meta.env.VITE_API_URL}/admin/getdashboard`;

    const res = await axios.get(api);
    setStats(res.data);
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  fetchStats();
  let admin = localStorage.getItem("admin");
  if(!admin){
    navigate("/")
  }

}, []);

console.log(stats.completedTasks)
console.log(stats)
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">

      {/* Header */}
      <div className="flex justify-end bg-purple-600 text-white py-4 px-6 shadow-md">
        <h1 className="text-2xl font-bold mr-120">Welcome To Admin Dashboard</h1>
        {/* Logout button */}
        <button onClick={LogOut} className="mr-7 hover:cursor-pointer bg-red-600 px-2 border-1px rounded-2xl">Logout</button>
      </div>
        

      {/* Main Layout */}
      <div className="flex flex-grow">

        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Menu</h2>

          <nav className="flex flex-col gap-3">
            <Link
              to="createuser"
              className="px-4 py-2 rounded-lg hover:bg-purple-100 text-gray-700 font-medium transition"
            >
              Create User
            </Link>

            <Link
              to="assigntask"
              className="px-4 py-2 rounded-lg hover:bg-purple-100 text-gray-700 font-medium transition"
            >
              Assign Task
            </Link>

            <Link
              to="seereport"
              className="px-4 py-2 rounded-lg hover:bg-purple-100 text-gray-700 font-medium transition"
            >
              See Reports
            </Link>

          
          </nav>
        </div>

      <div className="flex-grow p-6">

  {/* 🔥 Stats Cards */}
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

    <div className="bg-white p-5 rounded-2xl shadow-md text-center">
      <h3 className="text-gray-500">Total Users</h3>
      <p className="text-2xl font-bold text-purple-600">{stats.totalUsers}</p>
    </div>

    <div className="bg-white p-5 rounded-2xl shadow-md text-center">
      <h3 className="text-gray-500">Total Tasks</h3>
      <p className="text-2xl font-bold text-blue-600">{stats.totalTasks}</p>
    </div>

    <div className="bg-white p-5 rounded-2xl shadow-md text-center">
      <h3 className="text-gray-500">Completed</h3>
      <p className="text-2xl font-bold text-green-600">{stats.completedTasks}</p>
    </div>

    

  </div>

  {/* Existing Content */}
  <div className="bg-blue-200 rounded-2xl shadow-md p-6 min-h-[400px]">
    <div>
      <h2 className="font-bold text-blue-900 text-center text-2xl">
        Welcome in this web
      </h2>
      <p className="text-gray-500 text-center">
        This side for admin and you can manipulate users data, add new user, assign task and more
      </p>
    </div>

    <Outlet />
  </div>

</div>

      </div>
       <div className="bg-gray-800 text-white text-center py-3 text-sm">
        www.taskmanagement.com all rights reserved © 2026
      </div>
    </div>
  );
};

export default Admindashboard;