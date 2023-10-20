import config from "../config/config";
import { Client, Databases, Query} from "appwrite";


export class DBServices{
    client = new Client();
    databases; 

    constructor(){
        this.client
                .setEndpoint(config.appwriteURL)
                .setProject(config.projectId)
            
        this.databases = new Databases(this.client);
    }

    async createPost({title, slug, content, articleimage,status, userId }){
        console.log(title)
        try {
            return await this.databases.createDocument(
                config.databaseId, 
                config.articleCollectionId, 
                slug, 
                {
                    title,
                    content,
                    articleimage,
                    userId,
                    status,
                })
        } catch (error) {
            throw(error);
        }
    }

    async updatePost(slug, {title, content, articleimage, status}){
      //we didn't used userId here because we will only provide this update feature to the user who is already logged in
        try {
            return await this.databases.updateDocument(
                config.databaseId, 
                config.articleCollectionId, 
                slug,
                {
                    title,      //if any thing from these will get upate then updated value will be passed, otherwise old value will get passed
                    content,
                    articleimage,
                    status,
                })
        } catch (error) {
            throw(error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                config.databaseId,
                config.articleCollectionId,
                slug
            )

            return true;   //return true so that we can handle it in forntend that if deleted then update the ui or something 
        } catch (error) {
            throw(error)
        }
    }

    async getDocument(docId){
        try {
            return await this.databases.getDocument(
                config.databaseId,
                config.articleCollectionId,
                docId
            )
        } catch (error) {
            throw(error);
        }
    }

    async getPosts(queries=[Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                config.databaseId,
                config.articleCollectionId,
                queries,
            )
        } catch (error) {
            throw(error);
        }
    }
}


const databaseConfig = new DBServices(); 

export default databaseConfig; 
