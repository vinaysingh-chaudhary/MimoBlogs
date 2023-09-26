 const config = {

    appwriteURL : String(import.meta.env.VITE_APPWRITE_URL),
    projectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    databaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    bucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    articleCollectionId : String(import.meta.env.VITE_APPWRITE_ARTICLE_COLLECTION_ID),

}

export default config;