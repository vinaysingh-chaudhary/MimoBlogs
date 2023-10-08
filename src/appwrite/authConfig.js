import config from "../config/config";
import { Client, Account, ID } from "appwrite";


export class Authentication{
    client = new Client(); 
    account; 

    constructor(){
        this.client
                .setEndpoint(config.appwriteURL)
                .setProject(config.projectId)

        this.account = new Account(this.client);
    }

    async createAccount ({email, password}){
        try {
           const createUserAccount = await this.account.create(ID.unique(), email, password);
           if (createUserAccount) {     //if account is created or there, then direclty login  (that is why we called loginAccount function becasue we already have email and password)
                this.loginUser(email, password)
           } else {
               return createUserAccount; 
           }   
        } catch (error) {
            console.log(error); 
        }
    }

    async loginUser({email,password}){
        try {
         return await account.createEmailSession(email, password); 
        } catch (error) {
            console.log(error);
        }
    }

    async logoutUser (){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(error); 
        }
    }

    async getCurrentUser(){
        //we getting current user so that, if user direclty open home screen, our app should know na if user is login or not :) 
        try {
            return await this.account.get();        //will return the value of user or something, will check on frontend hehe 
        } catch (error) {
            console.log(error); 
        }

        return null;    //because if this.account.get didn't return anything, then it by default return null instead of some error value
    }

}


const authConfig = new Authentication();

export default authConfig; 


