import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {assets} from "../assets/Assets.js"
import Input from "../components/Input.jsx";
import { validateEmail } from "../util/Validation.js";
import axiosConfig from "../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../util/ApiEndpoints.js";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";

const Signup =()=>{

    const[fullName,setFullName] = useState("");
    const[email,setEmail] = useState("");
    const[password,setPassword] = useState("");
    const[error,setError] = useState(null);
    const[isLoading,setIsLoading] = useState(false);

    const navigate = useNavigate();

    const  handleSubmit=async(e)=>{
        e.preventDefault();
        setIsLoading(true);

        if(!fullName.trim()){
            setError("Please enter your fullName");
            setIsLoading(false);
            return;
        }
        if(!password.trim()){
            setError("Please enter your password");
            setIsLoading(false);
            return;
        }
        if(!validateEmail(email)){
            setError("Please enter valid email Address");
            setIsLoading(false);
            return;
        }

        setError("")

        //signup api call
        try {
            const response =await axiosConfig.post(API_ENDPOINTS.REGISTER,{
                fullName,
                password,
                email
            })

            if(response.status === 201){
                toast.success("User created successfully");
                navigate('/login');
            }
        } catch (error) {
            console.error("Something went wrong",error)
            setError(error.message);
        } finally{
            setIsLoading(false);
        }
    }

    return(
        <div className="h-screen w-full relative flex items-center justify-center overflow-hidden">
            {/* background image */}
            <img src={assets.login_bg} alt="background image" className="absolute inset-0 w-full h-full object-cover filter blur-sm" />
            <div className="relative z-10 w-full max-w-lg px-6">
                <div className="bg-white bg-opacity-95 backdrop-blur-sm rounded-lg shadow-2xl p-8 max-h-[90vh] overflow-y-auto">
                    <h3 className="text-2xl font-semibold text-black text-center mb-2">
                        Create An Account
                    </h3>
                    <p className="text-sm text-slate-700 text-center mb-8">
                        Start tracking your spendings by joining with us
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-center mb-6">
                            {/* profile image */}
                        </div>
                        <div className="mb-2">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4 mb-2 md:mb-4">
                                <Input
                                value={fullName}
                                label="Full Name"
                                placeholder="John Doe"
                                type="text"
                                onChange={(e)=>setFullName(e.target.value)}
                            />
                            
                            <Input
                                value={email}
                                label="Email Address"
                                placeholder="name@example.com"
                                type="text"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            </div>
                            <div >
                                <Input
                                value={password}
                                label="Password"
                                placeholder="***********"
                                type="password"
                                onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        {error &&(
                            <p className="text-red-800 text-sm text-center bg-red-50 p-2 rounded">
                                {error}
                            </p>
                        )}

                        <button disabled={isLoading} className={`bg-yellow-500 w-full py-3 text-lg font-medium rounded-sm hover:bg-yellow-600 cursor-pointer flex items-center justify-center gap-2 ${isLoading ? 'opacity-60 cursor-not-allowed':''}`} type="submit">
                            {isLoading?(
                                <>
                                    <LoaderCircle className="animate-spin w-5 h-5"/>
                                    Signing Up...
                                </>
                            ):(
                                "SIGN UP"
                            )}
                        </button>
                        <p className="text-sm text-slate-800 text-center mt-4 md:mt-6">
                            Already have an account? 
                            <Link to="/login" className="font-medium text-yellow-500 underline hover:text-yellow-600 transition-colors">Log In</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;