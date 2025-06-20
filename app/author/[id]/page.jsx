"use client"
import Link from "next/link"
//import Image from "next/image"
import { useEffect, useState } from "react"
import { useAppContext } from "../../../context"
import axiosInstance from "../../../utils/axiosInstance"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// const isMobileDevice = () => {
//     if (typeof navigator !== 'undefined') {
//       return /Mobi|Android/i.test(navigator.userAgent);
//     }
//     return false;
//   };
  
//   const base_URL = isMobileDevice()
//     ? 'http://kitap.edu:4000'  
//     : 'http://10.10.73.31:4000';  
    
const base_URL= 'http://kitap.edu:4000';  

const Author = ({params}) => {
    const {
        setCountLiked,
        token
    } = useAppContext();
    const [author, setAuthor] = useState({});
    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [count, setCount] = useState(0)
    const [id, setId] = useState(false)
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(11);
    const [toggleBiog, setToggleBiog] = useState(true);
    
    const handleChange = (event, value) => {
        setCurrentPage(value);
      };
    
      useEffect(()=> {
        if (count%12 !== 0) {
            setTotalPages(parseInt(count/12)+1);
        } else {
            setTotalPages(parseInt(count/12))
        }
    }, [count]
    )
    
    const handleLike = async (itemId) => {
        const headers = {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
        };
        try {
            const response = await axiosInstance.post(`/api/books/${itemId}/like/`,
            {}, 
            {
                headers: headers
            }
        );
        if (response.data.msg  === "This book has already been liked by the current user.") return;
        else
        setBooks(prevItems =>
            prevItems.map(item =>
                item.id === itemId ? { ...item, rating_count: (parseInt(item.rating_count, 10)+1).toString() } : item
            )
        );
        } catch (error) {
            console.error(error);
        }
    };

    const [isAndroidWebView, setIsAndroidWebView] = useState(false);

    useEffect(() => {
        if (typeof navigator !== 'undefined') {
            const userAgent = navigator.userAgent;
            const isWebView = /Android/i.test(userAgent) && /wv/.test(userAgent);
            setIsAndroidWebView(isWebView);
        }
    }, []);

    const downloadFileAtURL = async (url) => {
        try {
            if (isAndroidWebView) {
                window.location.href = url;
            } else {
                const response = await fetch(url);
                if (!response.ok) throw new Error('Network response was not ok');
                
                const fileName = url.split("/").pop();
                
                const blob = await response.blob();
                const url1 = window.URL.createObjectURL(blob);
                const aTag = document.createElement("a");
                aTag.href = url1
                aTag.download = fileName;
                // aTag.setAttribute("download", fileName);
                document.body.appendChild(aTag);
                aTag.click();
                aTag.remove();
                
        
            }

        } catch (error) {
            console.error('Download error:', error);
        }
    }

    useEffect(() => {
        async function fetchData() {
        try {
            const headers = {
                'Content-Type': 'application/json'
              };
            const response = await axiosInstance.get(
                `/api/books/?author=${params["id"]}&page=${currentPage}`,
                {
                    headers: headers
                  }
            );
            setAuthor(response.data);
            setCount(response.data.count)
            setBooks(response.data.results)
            
            
        } catch (err) {
            setError(err);
            console.log(error)
        }
        }
        fetchData();
    }, [currentPage]);

    useEffect(() => {
        async function fetchDataRemove() {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              };
        try {
            const response = await axiosInstance.post(
                `/api/books/favourites/remove`, {'book_id': id},
                {
                    headers: headers
                  }
            );
            setCountLiked(count => count-1);
        } catch (err) {
            setError(err);
            console.log(error)
            console.error('Error response:', err.response);
        }
    }
        async function fetchData() {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              };
        try {
            if (!token) return null;
            const response = await axiosInstance.post(
                `/api/books/favourites/add`, {'book_id': id},
                {
                    headers: headers
                  }
            );
            if (response.data.msg === "This book already exists in favourite table") {
                if (localStorage.getItem("favourite"+id.toString()) !== null) {
                    localStorage.removeItem("favourite"+id.toString())
                }
                fetchDataRemove();
                setCountLiked(count => count-1)
            }
            else {
                localStorage.setItem("favourite"+id.toString(),"favourite"+id.toString())
                setCountLiked(count => count+1)
            }
        } catch (err) {
            setError(err);
            console.log(error)
            console.error('Error response:', err.response);
        }
        }
        if (id) { 
            fetchData();
        }
    }, [id]);


    const allBooks = books.map(book => {
        return (
                <div className="flex flex-col relative gap-[7px] w-[140px]  rounded-md" key={book?.["id"]}>
                    <button className="top-2 right-0 absolute" onClick={() => {
                        setId(book?.["id"])
                        }}>
                        <i  className="fas fa-heart relative text-white  text-[24px]" >
                        <i  className={`fa-heart absolute top-[2px] left-[1px] right-[1px] bottom-[1px] ${!localStorage.getItem("favourite"+book?.["id"].toString()) ? "far text-gray-800  opacity-80" : "fas text-red-600"} text-[20px]`}></i>
                        </i>
                    </button>
                     <Link className="h-[220px] flex w-[150px] overflow-hidden mr-[5px] rounded-md" href={`/book/${book?.["id"]}`}>
                        <img
                            alt="check surat kitap"
                            src={book?.["get_image"] ? `${base_URL}${book?.["get_image"]}` : "/default-book.png"}
                            height={205}
                            width={108}
                            className="object-fit object-center rounded-sm w-full h-auto"
                        />
                    </Link>
                    <Link href={`/book/${book?.["id"]}`} className="font-custom-sans w-full whitespace-nowrap overflow-hidden leading-6 text-ellipsis font-semibold text-[14px] ml-[2px]">
                        {book?.["title"]}
                    </Link>
                    <Link 
                        className='mt-[-10px] font-sans w-full whitespace-nowrap overflow-hidden leading-6 text-ellipsis font-semibold text-[14px] ml-[2px] text-gray-600 hover:text-black hover:font-bold' 
                        href={`/author/${book?.["author"]?.["id"]}`}
                    >
                        {book?.["author"]?.["name"].split(" ").slice(0,2).join(" ")}
                    </Link>
                    <div className="flex items-center mt-[-6px]">
                        <button className="ml-[2px]" onClick={()=> {downloadFileAtURL(`${base_URL}${book?.["get_book"]}`)}}>
                        <i className="fas fa-download text-blue-400"></i>    
                        </button>
                        <div className="flex items-center w-full ml-[10px]">
                            <button className="w-1/4" onClick={() => handleLike(book?.["id"])}><i className="fas fa-thumbs-up text-green-600 text-[15px] border-r-[1px] px-[6px] icon"></i></button>
                            <p className="px-2 w-3/4  border-gray-300 font-semibold text-gray-600  text-[13px]">
                                {book?.["rating_count"]}
                            </p>
                        </div>
                    </div>
                </div>
            )
        })

   
    return (
        <>
            <div className="flex flex-col mb-[40px] flex-1 mt-[30px]">
                <div className="mx-[7px] flex flex-col items-center">  
                    <div className="flex flex-col mt-[25px] md:justify-center">
                        <div className='flex mt-[25px] items-center self-center '>
                            <div className="h-[208px] w-[177px] flex items-center overflow-hidden rounded-md">
                                <img 
                                    alt="check surat kitap"
                                    src={author?.["results"]?.[0]?.["author"]?.["get_image"] ? `${base_URL}${author?.["results"]?.[0]?.["author"]?.["get_image"] || ""}` : "/genre/default.png"}
                                    height={205}
                                    width={175}
                                    className="object-cover object-center rounded-lg w-full h-auto"
                                  
                                />
                            </div>
                            <div className="relative ml-[24px]  flex-1 px-[16px]  ">
                                <p className=" font-custom-sans text-slate-700 font-semibold text-[24px]">
                                    {books?.[0] ? books?.[0]?.["author"]?.["name"] : "Author"}
                                </p>
                                <div className="flex items-center justify-center    table-auto mt-3  p-[10px] font-custom-sans font-semibold
                                        rounded-lg   w-[300px] sm:w-[360px] md:w-[400px] lg:w-[480px] text-slate-600
                                        overflow-hidden leading-6 text-ellipsis
                                        ">
                                    
                                    {books?.[0] ? (toggleBiog ? ((books?.[0]?.["author"]?.["biography"]?.length > 210) ? books?.[0]?.["author"]?.["biography"]?.slice(0, 210) + '...' : books?.[0]?.["author"]?.["biography"] ) : books?.[0]?.["author"]?.["biography"]) : "Author"}
                                </div>
                                <button 
                                    onClick={() => setToggleBiog(toggle => !toggle)}
                                    className="absolute bottom-[6px] font-semibold  right-[26px]"
                                >
                                   {toggleBiog ? 
                                   <i className="fas fa-arrow-down text-green-600"></i> 
                                   : <i className="fas fa-arrow-up text-red-600"></i>} 
                                </button>
                            </div>
                        </div>
                    </div>
                
                    
                    <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-y-[25px] gap-x-[40px] lg:gap-x-[60px]  mt-[60px]'
                    >
                        {allBooks}
                    </div> 
                    <Stack spacing={3} className="mt-[40px]">
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
        </>
            
    )
    }

export default Author
