import config from "../config/config";
import { Client, Account, ID} from "appwrite";



export class Authentication{
    client = new Client(); 
    account; 

    constructor(){
        this.client
                .setEndpoint(config.appwriteURL)
                .setProject(config.projectId)

        this.account = new Account(this.client);
    }


    async createAccount ({email, password, name}){
        try {
           const userAccount = await this.account.create(ID.unique(), email, password, name);
           if (userAccount) {
            return this.loginUser({email, password});
        } else {
           return  userAccount;
        }
        } catch (error) {
            throw("Appwrite serive :: createAccount :: error", error);
        }
    }


    async loginUser({email,password, name}){
        try {
         return await this.account.createEmailSession(email, password, name); 

        } catch (error) {
            throw("Appwrite serive :: loginUser :: error", error);
        }
    }

    async logoutUser (){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            throw("Appwrite serive :: logoutUser :: error", error);
        }
    }

    async getCurrentUser(){
        try {
            return await this.account.get();        
        } catch (error) {
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;   
    }


    async getUserDetails(userId){
        try {
            const user = await this.users.get(userId); 
            return user; 
        } catch (error) {
            throw("Appwrite serive :: getUserDetails :: error", error);
        }

    }


}


const authConfig = new Authentication();

export default authConfig; 


