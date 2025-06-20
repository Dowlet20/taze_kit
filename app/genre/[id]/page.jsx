"use client"
import Link from "next/link"
//import Image from "next/image"
import { useEffect, useState } from "react"
import { useAppContext } from "../../../context"
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axiosInstance from "../../../utils/axiosInstance"

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
const Genre = ({params}) => {
    const {
        setCountLiked,
        token
    } = useAppContext();
    const [genre, setGenre] = useState({});
    const [error, setError] = useState(null);
    const [books, setBooks] = useState([]);
    const [count, setCount] = useState(0)
    const [id, setId] = useState(false)
    const [genreName, setGenreName] = useState("genre ady")
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(11);

    const arr = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,29,30,32,33,34,35,38,39,40,41,42,43,45];


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
                `/api/books/?genre=${params["id"]}&page=${currentPage}`,
                {
                    headers: headers
                  }
            );
            setGenre(response.data);
            setCount(response.data.count)
            setBooks(response.data.results)
            setGenreName(response.data.results[0]["genre"]["name"])
            
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
                            className="object-fit object-center rounded-md w-full h-auto"
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
            <div 
                className="flex flex-col items-center flex-1 m-2 pb-[40px] mt-[55px]"
            >
                <div className="flex mx-[7px] flex-col ">  
                    <div className="flex flex-col mt-[5px] md:justify-center items-center">
                        <div className='flex flex-col mt-[20px] items-center self-center'>
                            <div className="h-[185px] w-[145px] flex overflow-hidden rounded-md">
                                <img
                                    alt="check surat kitap"
                                    src={arr.includes(parseInt(params["id"], 10)) ? `/genre/${params["id"]}.png` : "/genre/default.png"}
                                    height={185}
                                    width={145}
                                    className="object-cover object-center w-full h-auto"
                                />
                            </div>
                            <div className="ml-[7px] mt-[10px] flex-1 px-[16px] h-[205px] ">
                                <p className=" font-custom-sans font-semibold text-[24px]">
                                    {genreName ? genreName : "Genre Name"}
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 xl:grid-cols-6 2xl:grid-cols-6 gap-y-[35px] gap-x-[40px] lg:gap-x-[60px]  mt-[40px]'
                    >
                        {allBooks}
                    </div> 
                    <Stack spacing={3} className="mt-[40px] self-center">
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

export default Genre
