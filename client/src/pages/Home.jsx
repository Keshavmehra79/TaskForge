
import { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Home = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUserType] = useState("");

  const googleLogin=()=>{
       window.open(`${import.meta.env.VITE_API_URL}/auth/google`, "_self");
  }


  const navigate = useNavigate();

   const handleSubmit=async(e)=>{
    e.preventDefault();

   if (usertype=="admin"){      
     try {
       let api=`${import.meta.env.VITE_API_URL}/admin/adminlogin`;
     const response = await axios.post(api, {email, password});
     localStorage.setItem("admin", response.data.admin.email);
     toast.success("Login succefully")

        navigate("/admindashboard");
     
      
     console.log(response);
     } catch (error) {
      console.log(error.response)
         toast.error(error.response.data.msg)
     }

   }else 
   {
    try {
       let api=`${import.meta.env.VITE_API_URL}/user/userlogin`;
     const response = await axios.post(api, {email, password});
     console.log(response.data.msg);
     localStorage.setItem("username", response.data.user.name);
     localStorage.setItem("useremail", response.data.user.email);
     localStorage.setItem("userid", response.data.user._id);
     toast.success("Login succefully")
        navigate("/userdashboard");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
    

   }

    
   }


  return (
    <>
    <div className="min-h-screen flex flex-col justify-between bg-gray-100">

      {/* Header */}
      <div className="bg-blue-600 text-white text-center py-5 shadow-md">
        <h1 className="text-3xl font-bold">Task Management System</h1>
      </div>

      {/* Form Section */}
      <div className="flex justify-center items-center flex-grow">
        <div className="bg-white p-8 rounded-2xl shadow-lg w-80">
          <h2 className="text-2xl font-semibold text-center mb-6">Login Form</h2>

          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Email address</label>
              <input
                type="email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter email"
              />
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter password"
              />
            </div>

            {/* User Type */}
            <div className="mb-5">
              <label className="block mb-1 font-medium">Login As</label>
              <select
                name="usertype"
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select user type</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 hover:cursor-pointerz"
            >
              Login
            </button>


            <div className="flex items-center my-4">
  <hr className="flex-grow border-gray-300" />
  <span className="mx-2 text-gray-400 text-sm">OR</span>
  <hr className="flex-grow border-gray-300" />
</div>


<button onClick={googleLogin} className="flex items-center justify-center gap-3 w-full py-2.5 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-100 transition duration-200 hover:cursor-pointer">
  
  {/* Google Icon */}
  <img 
    src="https://www.svgrepo.com/show/475656/google-color.svg" 
    alt="Google" 
    className="w-5 h-5"
  />

  {/* Text */}
  <span className="text-gray-700 font-medium">
    Continue with Google
  </span>

</button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-800 text-white text-center py-3 text-sm">
        www.taskmanagement.com all rights reserved © 2026
      </div>

    </div>


    </>
  )
}

export default Home;


