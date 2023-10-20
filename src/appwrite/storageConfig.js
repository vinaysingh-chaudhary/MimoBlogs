import config from "../config/config";
import { Client, ID, Storage } from "appwrite";

export class storageService{
    client = new Client(); 
    storage; 

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.projectId)

        this.storage = new Storage(this.client);
    }


    async uploadFile(File){
        try {
            return await this.storage.createFile(    //this will return the id of the file which we will use createpost's arguments (ariticleimg)
                config.bucketId,
                ID.unique(),         //this unique id is for file
                File
            )
        } catch (error) {
            console.log(error);
            return false; 
        }
    }

    

    async deleteFile (fileId){
        try {
             await this.storage.deleteFile(
                config.bucketId,
                fileId
             )
             return true; 
        } catch (error) {
            console.log(error);
            return false;
        }
    }


    getFilePreview(fileId){
        return this.storage.getFilePreview(
            config.bucketId,
            fileId
        )
    }
}



const storageServices = new storageService(); 

export default storageServices; 