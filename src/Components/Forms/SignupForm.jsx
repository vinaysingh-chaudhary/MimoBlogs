import { Input, Button } from "../compConfig";
import {useForm} from "react-hook-form"
import authConfig from "../../appwrite/authConfig";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const SignUpForm = ( ) => {

    const {register, handleSubmit} = useForm(); 
    const dispatch = useDispatch();
    const navigate = useNavigate(); 

    const SignUpUser = async(signupData) => {
        console.log(signupData)

        try {
            const session = await authConfig.createAccount(signupData); 
            if(session){
                const currentUser = await authConfig.getCurrentUser(); 
                if(currentUser){
                    dispatch(login(currentUser)); 
                    }
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <p>Already have an account ? <span className="text-blue-300">Login</span></p>

            <form onSubmit={handleSubmit(SignUpUser)}>

            <Input  
                label = "Your Name : "
                type = "text"
                placeholder = "Enter your name"
                {...register("name", {
                    required:true
                })}
            />


            <Input  
                label = "Email : "
                type = "text"
                placeholder = "Enter a valid email"
                {...register("email", {
                    required:true
                })}
            />

                <p>password should be 8 char</p>
            <Input  
                label = "Password : "
                type = "password"
                placeholder = "Enter password"
                {...register("password", {
                    required:true
                })}
            />

            <Button
                type="submit"
                label="SignUp"
                />

            </form>

        </div>
    )
}

export default SignUpForm;