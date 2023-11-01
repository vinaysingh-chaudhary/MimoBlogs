import React, { useEffect, useId } from 'react'
import { useSelector } from 'react-redux'
import {useForm} from 'react-hook-form'
import {Input, Button, Select, TextEditor } from '../../Components/compConfig'
import databaseConfig from '../../appwrite/databaseConfig'
import storageConfig from '../../appwrite/storageConfig'
import { useNavigate } from 'react-router-dom'

const BlogForm = ({Blog}) => {


  const userData = useSelector(store => store.authentication.userData); 
  const userid = userData?.currentUser?.$id || userData?.$id

  const navigate = useNavigate();


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

         const File = data?.articleimage[0] ? await storageConfig.uploadFile(data?.articleimage[0]) : null      
            if(File){
               storageConfig.deleteFile(Blog?.articleimage)  
            }

            const UpdateBlog = await databaseConfig.updatePost(Blog?.$id, {
              ...data, 
            articleimage : File ? File.$id : undefined,  
          })

          if(UpdateBlog){
            navigate("/")
          }

      }else{    

      const file = await storageConfig.uploadFile(data?.articleimage[0]);
          if(file){
             data.articleimage = file?.$id;
           }

      const UploadBlog = await databaseConfig.createPost({
        ...data, 
        userId : userid
      })

      if(UploadBlog){
        navigate("/")
      }
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

          <Input 
               label = "Title : "
              placeholder="Enter your Blog Title"
                   {...register("content", {
                required : true
          })}
        />

            {/* <TextEditor 
                name = "content"
                control={control}
                defaultValue={getValues("content")}
            /> */}



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
