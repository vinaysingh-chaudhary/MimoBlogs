import { useState, useEffect } from "react";
import databaseConfig from "../appwrite/databaseConfig";
import { Query } from "appwrite";

export const getblogs = (query) => {

    const [data, setData] = useState([]);
    const [offSetVal, setOffset] = useState(0);
    const [loading, setLoading] = useState(true)


    const limit = Query.limit(15); 
    const offSetQuery = Query.offset(offSetVal); 

    const modifiedQuery = Query.equal("status", `${query}`)
    const queries = query? [modifiedQuery ,limit, offSetQuery] : [limit, offSetQuery]


    const handleInitial = async () => {
      try {
        const data = await databaseConfig.getPosts(queries);
        setData((prevData) => [...prevData, ...data.documents]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
  
    const handleScroll = async () => {
      const scrolledByNow = window.innerHeight + document.documentElement.scrollTop;
      const totalHeight = document.documentElement.scrollHeight;

        if (scrolledByNow + 1 >= totalHeight) {
            setLoading(true);
          setOffset((prevOffset) => prevOffset + 15);
          setLoading(false)
        }
    };
  
    useEffect(() => {
      handleInitial();
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [offSetVal]);

    return {
        blogs : data,
        loading : loading
    }
}