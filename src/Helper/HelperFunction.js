import authConfig from "../appwrite/authConfig"
import { useState, useEffect } from "react";
import databaseConfig from "../appwrite/databaseConfig";


export const logout = async() => {
    await authConfig.logoutUser().then((status) => console.log(status)); 
}

