import React, {useState} from "react";
import { Button, Input } from "../compConfig";
import authConfig from "../../appwrite/authConfig";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import {useForm} from "react-hook-form"
import { useNavigate, Link } from "react-router-dom";


const LoginForm = () => {

    const {register, handleSubmit, getValues} = useForm(); 
    const dispatch = useDispatch(); 
    // const navigate = useNavigate(); 



    const loginUser = async(userData) => {
        console.log(userData)
        try { 
            const session = await authConfig.loginUser(userData);    //returns us a session,
            if(session){
                const currentUser = await authConfig.getCurrentUser();   //now if the session is created, then get the user details
                if (currentUser){
                    dispatch(login(currentUser))         //will save the userDetails in login details 
                    // navigate("/")
                }
            }
        } catch (error) {
            console.log(error); 
        }
    }



    return (
        <div>
            {/*  handle sumbit is a method of react-form */}
            <form onSubmit={handleSubmit(loginUser)}>   
               <Input 
                    label={"Email"} 
                    placeholder={"Enter Your Email"} 
                    type={"email"}
                    onChange={(event) => console.log(event.target.value)}
                    {...register("email", {
                       required : true, 
                       
                    })}
                    />


               <Input 
                    label="Password : "  
                    placeholder="Password"
                    type= "password"
                    {...register("password", {
                        required:true
                    })}
                    />
                    
               <Button
                label="Login"
                type= "submit"
                /> 
            </form>
            
        </div>
    ); 
}

export default LoginForm; 