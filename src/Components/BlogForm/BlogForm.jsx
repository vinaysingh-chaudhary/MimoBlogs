import React, { useEffect } from 'react'
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
             data.articleimage = file.$id;
           }

      const UploadBlog = await databaseConfig.PostBlog({
        ...data, 
        userId : useData.$id 
      })

      if(UploadBlog){}
      }
  }

  const slugGenerator = (value) => {
    if(typeof(value) ==='string'){
      return value.trim().toLowerCase().replace(/\s/g, '-'); 
    }else{
      return ''
    }
  }

  useEffect(() => {
    const subscription = watch((value, {name}) => {
        if(name === 'title'){
          setValue('slug', slugGenerator(value.title, {shouldValidate : true}))
        }
    })

    return( () => {
      subscription.unsubscribe(); 
    })

  },[watch, setValue, slugGenerator])

  return (
    <div>
      <form onSubmit={handleSubmit(submitBlogForm)}>

        <Input 
          label = "Title : "
          placeholder="Enter your Blog Title"
          {...register("title", {
            required : true
          })}
        />

          <Input 
            label = "Slug : "
            placeholder = "Slug"
            {...register("slug", {
              required : true
            })}

            onInput = {(e) => {setValue("slug", 
            slugGenerator(e.currentTarget.value), 
              {shouldValidate : true})}
            }
          />

            <TextEditor 
                name = "content : "
                label = "content"
                control={control}
                defaultValue={getValues("content")}
            />

            <Input 
            type="file"
            label= "article image"
            accept = "image/png, image/jpg, image/jpeg, image/gif"
            {...register("articleimage")}
            />


            <div>
              {/* <img src={storageConfig.getFilePreview(Blog.articleimage)} alt={Blog.title} /> */}
            </div>

            <div>
              <Select 
                  options={["Active", "Inactive"]}
                  label = "Status"
                  {...register("status", {
                    required:true
                  })}
              />
            </div>

            <Button 
              type="submit"
              label={Blog? "Update" : "Submit"}
            />
      </form>
    </div>
  )
  }

export default BlogForm
