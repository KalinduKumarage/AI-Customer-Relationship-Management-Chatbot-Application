import { useState,useEffect } from "react";
import axios from 'axios';


const useFetch = (url) => {

    // axios cancel token
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();


    const [data, setData] = useState(null);
    const [isPending, setIspending] = useState(true);
    const [isError, setIserror] = useState(false);

    useEffect(() => {
        console.log('use effect ran');
        
        const fetchData = async () => {
                
            try {
                const res = await axios({
                    method: 'GET',
                    url,
                    cancelToken:source.token
                });
                    

                if (res.status === 200) {
                    setIserror(false);
                    setData(res.data);
                } else {
                    setIserror(true);
                        
                }
                setIspending(false);


            } catch (error) {
                console.log(error.message);
                if (error.message==='cancel request') {
                    console.log('fetch aborted');
                } else {
                    
                    setIserror(true);
                    setIspending(false);
                }
            }
                
              
        }
            
        setTimeout(() => {
            
            fetchData();
        }, 1500);

        return () => {
            // cancel axios request
            source.cancel('cancel request');
        }
     
    }, [url]);// eslint-disable-line react-hooks/exhaustive-deps

    return {data,isPending,isError}
};

export default useFetch;