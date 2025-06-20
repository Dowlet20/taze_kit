"use client"
import Link from "next/link"
import Image from "next/image"
import { useEffect, useState } from "react"
import axiosInstance from "../../utils/axiosInstance"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// const isMobileDevice = () => {
//     if (typeof navigator !== 'undefined') {
//       return /Mobi|Android/i.test(navigator.userAgent);
//     }
//     return false;
//   };
  
//   const base_URL = isMobileDevice()
//     ? 'http://192.168.0.11:4000'  
//     : 'http://10.10.73.31:4000'; 

const base_URL= 'http://192.168.0.11:4000';

const Author = () => {
    const [authors, setAuthors] = useState([]);
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(11);
    const [text, setText] = useState("");

    const onChange = evt => setText(evt.target.value);

    useEffect(() => {
        async function fetchData() {
        try {
            const headers = {
                'Content-Type': 'application/json'
              };
            const response = await axiosInstance.get(
                `/api/authors/?search=${text}`,
                {
                    headers: headers
                  }
            );
            setAuthors(response.data.results);
            setCount(response.data.count);
        } catch (err) {
            setError(err);
            console.log(error)
        }
        }
        fetchData();
    }, [text]);

    const handleChange = (event, value) => {
        setCurrentPage(value);
      };
    
      useEffect(()=> {
        if (count%12 !== 0) {
            setTotalPages(parseInt(count/12)+1);
        } else {
            setTotalPages(parseInt(count/12))
        }
    }, [count]);

   
    useEffect(() => {
        async function fetchData() {
        try {
            const headers = {
                'Content-Type': 'application/json'
              };
            const response = await axiosInstance.get(
                `/api/authors/?page=${currentPage}`,
                {
                    headers: headers
                  }
            );
            setAuthors(response.data.results);
            setCount(response.data.count)
            
        } catch (err) {
            setError(err);
            console.log(error)
        }
        }
        fetchData();
    }, [currentPage]);

    



    const allAuthors = authors.map(author => {
        return (
            <Link key = {author["id"]} 
            href={`/author/${author["id"]}`} className='flex flex-col items-center bg-white shadow-custom-2 hover:shadow-custom hover:scale-105 transition-transform duration-200 w-[170px] py-[2px] rounded-md'>
                <div className="h-[190px] w-[165px] flex overflow-hidden  rounded-md">
                    <Image
                        priority 
                        alt="check surat kitap"
                        src={author["get_image"] ? `${base_URL}${author["get_image"]}` : "/default-author.png"}
                        height={190}
                        width={165}
                        className="object-fit object-center w-full h-auto"
                    />
                </div>
                <div 
                    href={`/author/${author["id"]}`}
                    className="pt-3 pl-[2px] pb-1 font-custom-sans font-semibold  text-[16px] leading-6  overflow-hidden text-ellipsis whitespace-normal"
                >
                     {author["name"].split(" ").slice(0,2).join(" ")}
                </div>
            </Link>
        )
    })
    return (
        <div className="flex flex-col h-[97vh] w-full">
            <div className="flex sm:w-[calc(90%)] lg:w-[calc(85%)]  xl:w-[calc(50%+320px)] 2xl:w-[calc(62%+20px)] 2xl:ml-[10px] self-center rounded-full  shadow-custom items-center mt-[75px]">
                <i className="fas fa-search text-gray-600 bg-white p-[13px] mr-[-1px] outline-none rounded-full text-[16px]"></i>
                <input
                type="text"
                name="text"
                placeholder="Awtor gözle..."
                value={text}
                onChange={onChange}
                className="bg-white font-semibold w-5/6 outline-none"
                />
            </div>
            <div className="mt-[20px]">
                <div className="mx-[7px] flex flex-col items-center">  
                    <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3  lg:grid-cols-5 xl:grid-cols-6  gap-8 mt-[30px]'>
                        {allAuthors}
                    </div>
                    <Stack spacing={3} className="mt-[60px] mb-[20px]">
                        <Pagination 
                            count={totalPages} 
                            variant="outlined" 
                            shape="rounded" 
                            size = "large"
                            onChange = {handleChange}
                        />
                    </Stack> 
                </div>
            </div>
        </div>
    )
    }

export default Author
