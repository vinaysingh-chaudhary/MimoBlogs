import { Client, ID, Storage } from "appwrite";

export class storageService{
    client = new Client(); 
    storage; 

    constructor(){
        this.client
            .setEndpoint(import.meta.env.VITE_APPWRITE_URL)
            .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID)

        this.storage = new Storage(this.client);
    }


    async uploadFile(File){
        try {
            return await this.storage.createFile(    //this will return the id of the file which we will use createpost's arguments (ariticleimg)
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
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
                import.meta.env.VITE_APPWRITE_BUCKET_ID,
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
            import.meta.env.VITE_APPWRITE_BUCKET_ID,
            fileId
        )
    }
}



const storageServices = new storageService(); 

export default storageServices; 