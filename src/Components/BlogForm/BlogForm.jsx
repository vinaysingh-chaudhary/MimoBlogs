import React from 'react'
import { useSelector } from 'react-redux'
import {useForm} from 'react-hook-form'
import {Input, Button, Select, TextEditor } from '../../Components/compConfig'
import databaseConfig from '../../appwrite/databaseConfig'
import storageConfig from '../../appwrite/storageConfig'

const BlogForm = ({Blog}) => {

  const useData = useSelector(store => store.authentication.useData); 


  const {register, handleSubmit, watch, setValue, getValues,  control} = useForm({
      defaultValues: {
        title : Blog?.title || '',
        slug : Blog?.slug || '',
        content : Blog?.content || '',
        status : Blog?.status || 'active' 
       }
  }); 

 const submitBlogForm = async(data) => { 
     if(Blog){      
         const file = data.articleimage[0] ? storageConfig.uploadFile(data.articleimage[0]) : null      
            if(file){
               storageConfig.deleteFile(Blog.articleimage)  
            }

            const UpdateBlog = await databaseConfig.updatePost(Blog.$id, {
              ...data, 
            articleimage : file ? file.$id : undefined,  
          })

          if(UpdateBlog){}

       }else{    
       
      const file = await storageConfig.uploadFile(data.articleimage[0]);
          if(file){
             data.articleimage = file !== null ? file.$id : undefined
           }

      const UploadBlog = await databaseConfig.PostBlog({
        ...data, 
        userId : useData.$id 
      })

      if(UploadBlog){}
       }
  }

  return (
    <div>
      
    </div>
  )
  }

export default BlogForm
