"use client"
import Link from "next/link";
//import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useAppContext } from "../context";
import axiosInstance from "../utils/axiosInstance";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';

//const base_URL= 'http://10.10.73.49:8000';
const base_URL= 'http://kitap.edu:4000';
 

const Home = () => {
    
    const {
        setCountLiked,
        token
    } = useAppContext();
    const [books, setBooks] = useState([]);
    const [count, setCount] = useState(0);
    const [error, setError] = useState(null);
    const [id, setId] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(11);
    const [text, setText] = useState("");
    const [age, setAge] = useState('');
    const [lang, setLang] = useState('');
    const [rating, setRating] = useState('');
    const [date, setDate] = useState('');
    const [value, setValue] = useState('');
    const [newLoading, setNewLoading] = useState(false);
    
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

 
    const handleChange1 = (event) => {
        setAge(event.target.value);
    };


    const handleChange2 = (event) => {
        setLang(event.target.value);
    };
  
    const handleChange3 = (event) => {
        setValue(event.target.value);
    };
    
    // const handleDownload = async (url) => {
    //     try {
    //         const response = await fetch(url);
    //         if (!response.ok) throw new Error('Network response was not ok');
            
    //         const fileName = url.split("/").pop();
            
    //         const blob = await response.blob();
    //         const url1 = window.URL.createObjectURL(blob);
    //         const aTag = document.createElement("a");
    //         aTag.href = url1
    //         aTag.download = fileName;
    //         document.body.appendChild(aTag);
    //         aTag.click();
    //         aTag.remove();
            

    //     } catch (error) {
    //         console.error('Download error:', error);
    //     }
    // }

    const handleChange = (event, value) => {
    setCurrentPage(value);
    };

  
    const onChange = evt => setText(evt.target.value);

    

    useEffect(()=> {
        if (count%12 !== 0) {
            setTotalPages(parseInt(count/12)+1);
        } else {
            setTotalPages(parseInt(count/12))
        }
    }, [count]
    );
    
    useEffect(() => {
        async function fetchData() {
        try {
            const headers = {
                'Content-Type': 'application/json'
              };
            let url = `/api/books/?page=${currentPage}`;
            
            if (lang && text && !rating && !date) url = `/api/books/?search=${text}&language=${lang}&page=${currentPage}`;
            else if (!lang && text && !rating && !date) url = `/api/books/?page=${currentPage}&search=${text}`;
            else if (lang && !text && !rating && !date) url = `/api/books/?language=${lang}&page=${currentPage}`;
            else if (lang && text && rating && date) url = `/api/books/?date=${date}&language=${lang}&page=${currentPage}&rating=${rating}&search=${text}`;
            else if (lang && text && rating && !date) url = `/api/books/?language=${lang}&page=${currentPage}&rating=${rating}&search=${text}`;
            else if (lang && text && !rating && date) url = `/api/books/?date=${date}&language=${lang}&page=${currentPage}&search=${text}`;
            else if (lang && !text && rating && date) url = `/api/books/?date=${date}&language=${lang}&page=${currentPage}&rating=${rating}`;
            else if (!lang && text && rating && date) url = `/api/books/?date=${date}&page=${currentPage}&rating=${rating}&search=${text}`;
            else if (!lang && !text && rating && !date) url = `/api/books/?page=${currentPage}&rating=${rating}`;
            else if (!lang && !text && !rating && date) url = `/api/books/?date=${date}&page=${currentPage}`;
            else if (!lang && !text && rating && date) url = `/api/books/?date=${date}&page=${currentPage}&rating=${rating}`;
            else if (!lang && text && rating && !date) url = `/api/books/?page=${currentPage}&rating=${rating}&search=${text}`;
            else if (!lang && text && !rating && date) url = `/api/books/?date=${date}&page=${currentPage}&search=${text}`;
            else if (lang && !text && rating && !date) url = `/api/books/?&language=${lang}&page=${currentPage}&rating=${rating}`;
            else if (lang && !text && !rating && date) url = `/api/books/?date=${date}&language=${lang}&page=${currentPage}`;
            else  url = `/api/books/?page=${currentPage}`;

            const response = await axiosInstance.get(
                url,
                {
                  headers: headers
                }
            );
            setBooks(response.data.results);
            setCount(response.data.count);
        } catch (err) {
            setError(err);
            console.log(error)
        }
        }
        fetchData();
    }, [text, currentPage, lang, date, rating]);

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

    const handleImageLoad = (index) => {
        if (index === books.length - 1) {
            console.log(index);
          setTimeout(() => {
              setNewLoading((prev) => {
              console.log('Previous loading state:', prev);
              return false; 
              });}, 100);
        }
      };

    
    const allBooks = books.map(({ id, get_image, title, author, rating_count, get_book }, index) => {
        const isFavorite = localStorage.getItem(`favourite${id}`) !== null;
        const imageUrl = get_image ? `${base_URL}${get_image}` : "/default-book.png";
        const handleLikeAction = () => {
          handleLike(id); 
      };

        return (
            <div className="flex flex-col relative gap-[7px] w-[140px] rounded-md" key={id}>
                <button className="top-2 right-0 absolute" onClick={() => {
                    setId(id);  
                }}>
                    <i className="fas fa-heart relative text-white text-[24px]">
                        <i className={`fa-heart absolute top-[2px] left-[1px] right-[1px] bottom-[1px] ${isFavorite ? "fas text-red-600" : "far text-gray-800 opacity-80"} text-[20px]`}></i>
                    </i>
                </button>
                <Link className="h-[220px] flex w-[150px] overflow-hidden mr-[5px] rounded-md" href={`/book/${id}`}>
                    <img
                        alt={title}
                        src={imageUrl}
                        height={205}
                        width={108}
                        className="object-fit object-center rounded-md w-full h-auto"
                        onLoad={() => handleImageLoad(index)}
                    />
                </Link>
                <Link
                    href={`/book/${id}`}
                    className="font-custom-sans w-full whitespace-nowrap overflow-hidden leading-6 text-ellipsis font-semibold text-[14px] ml-[2px]"
                >
                    {title}
                </Link>
                <Link
                    className='mt-[-10px] font-sans w-full whitespace-nowrap overflow-hidden leading-6 text-ellipsis text-[14px] ml-[2px] text-gray-500 hover:text-gray-700 hover:font-semibold'
                    href={`/author/${author?.id}`}
                >
                    {author?.name?.split(" ").slice(0, 2).join(" ") || 'Unknown Author'}
                </Link>
                <div className="flex items-center mt-[-6px]">
                    <button className="ml-[2px]" onClick={()=> {downloadFileAtURL(`${base_URL}${get_book}`)}} >
                        <i className="fas fa-download text-blue-400"></i>
                    </button>
                    <div className="flex items-center w-full ml-[10px]">
                        <button className="w-1/4" onClick={handleLikeAction}>
                            <i className="fas fa-thumbs-up text-green-600 text-[15px] border-r-[1px] px-[6px] icon"></i>
                        </button>
                        <p className="px-2 w-3/4 border-gray-300 font-semibold text-gray-600 text-[13px]">
                            {rating_count || 0}
                        </p>
                    </div>
                </div>
            </div>
        );
    });
    //onClick={() => handleDownload(`${base_URL}${get_book}`)}
    return (
        <div className="flex flex-col items-center w-full ">
            <div className="flex flex-col justify-center w-full lg:w-[86%] 2xl:w-[calc(56%+20px)] pt-[70px]">
                <div className="flex items-center w-full md:px-8 lg:px-0 justify-center gap-4">
                    <div className="flex self-center rounded-md ml-[13px]  flex-1 shadow-custom-2 items-center">
                        <i className="fas fa-search text-gray-600 bg-white px-[13px] outline-none rounded-l-2xl text-[16px]"></i>
                        <input
                            type="text"
                            name="text"
                            placeholder="Kitap gözle..."
                            value={text}
                            onChange={onChange}
                            className="bg-white  py-[7px] font-semibold w-full outline-none rounded-md "
                        />
                    </div>
                    <FormControl className="sm:block hidden rounded-sm shadow-custom-2 border-none">
                        <InputLabel  id="demo-simple-select-label" className="text-[16px] mt-[-10px] md:mt-[-7px] rounded-sm font-semibold">Dili saýlaň</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={lang}
                            label="Dili saýlaň  s"
                            onChange={handleChange2}
                            className="md:h-[40px] rounded-sm w-[135px] text-[14px]  lg:w-[160px] h-[36px]" 
                        >
                            <MenuItem value={""}>
                                <div className="flex items-center">
                                    <button 
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setLang("");
                                            setCurrentPage(1);
                                            setText("");
                                        }}
                                    >
                                    hemmesi
                                    </button>
                                </div>
                            </MenuItem>
                            <MenuItem value={"turkm"}>
                                <div className="flex items-center">
                                    <button 
                                        className = "font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setLang("turkm");
                                            setCurrentPage(1);
                                        }}    
                                    >
                                        Türkmen
                                    </button>
                                </div>
                            </MenuItem>
                            <MenuItem value={"rus"}>
                                <div className="flex items-center">
                                    <button  
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setLang("rus");
                                            setCurrentPage(1);
                                        }}
                                    >
                                    Русский
                                    </button>
                                
                                </div>
                            </MenuItem>
                            <MenuItem value={"eng"}>
                                <div className="flex items-center">
                                    <button 
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setLang("eng");
                                            setCurrentPage(1);
                                        }}
                                    >
                                    English
                                </button>
                                </div>
                            </MenuItem>
                            <MenuItem value={"fran"}>
                                <div className="flex items-center">
                                    <button 
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setLang("fran");
                                            setCurrentPage(1);
                                        }}
                                    >
                                    Fransuz
                                </button>
                                </div>
                            </MenuItem>
                            <MenuItem value={"nemes"}>
                                <div className="flex items-center">
                                    <button 
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setLang("nemes");
                                            setCurrentPage(1);
                                        }}
                                    >
                                    Nemes
                                </button>
                                </div>
                            </MenuItem>
                            <MenuItem value={"arap"}>
                                <div className="flex items-center">
                                    <button 
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setLang("arap");
                                            setCurrentPage(1);
                                        }}
                                    >
                                    Arap
                                </button>
                                </div>
                            </MenuItem>
                            <MenuItem value={"pars"}>
                                <div className="flex items-center">
                                    <button 
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setLang("pars");
                                            setCurrentPage(1);
                                        }}
                                    >
                                    Pars
                                </button>
                                </div>
                            </MenuItem>
                            <MenuItem value={"hyta"}>
                                <div className="flex items-center">
                                    <button 
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setLang("hyta");
                                            setCurrentPage(1);
                                        }}
                                    >
                                    Hytaý
                                    </button>
                                </div>
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className=" sm:block hidden rounded-sm shadow-custom-2 border-none">
                        <InputLabel  id="demo-simple-select-label" className="text-[16px] mt-[-10px] rounded-sm font-semibold md:mt-[-7px]">Filter</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={value}
                            label="Filter r"
                            onChange={handleChange3}
                            className="md:h-[40px] rounded-sm w-[135px] text-[14px]  lg:w-[160px] h-[36px]" 
                        >
                            <MenuItem value={""}>
                                <div className="flex items-center">
                                    <button 
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setRating('');
                                            setDate('desc');
                                            setCurrentPage(1);
                                        }}
                                    >
                                    hemmesi
                                    </button>
                                </div>
                            </MenuItem>
                            <MenuItem value={"new"}>
                                <div className="flex items-center">
                                    <button 
                                        className = "font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setRating('');
                                            setDate('desc');
                                            setCurrentPage(1);
                                        }}    
                                    >
                                        Täzeden könä
                                    </button>
                                </div>
                            </MenuItem>
                            <MenuItem value={"old"}>
                                <div className="flex items-center">
                                    <button  
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setRating('');
                                            setDate('asc');
                                            setCurrentPage(1);
                                        }}
                                    >
                                    köneden täzä
                                    </button>
                                
                                </div>
                            </MenuItem>
                            <MenuItem value={"top"}>
                                <div className="flex items-center">
                                    <button 
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setRating('desc');
                                            setDate('');
                                            setCurrentPage(1);
                                        }}
                                    >
                                    Ýokary bahaly
                                </button>
                                </div>
                            </MenuItem>
                            <MenuItem value={"low"}>
                                <div className="flex items-center">
                                    <button 
                                        className="font-semibold text-[14px] md:text-[16px]"
                                        onClick={()=> {
                                            setRating('asc');
                                            setDate('');
                                            setCurrentPage(1);
                                        }}
                                    >
                                    Pes bahaly
                                </button>
                                </div>
                            </MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div className="flex flex-col flex-1 items-center mt-[35px]">
                    <div className='grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-6 gap-y-[25px] gap-x-[45px] '>  
                        {...allBooks}
                    </div>
                    <Stack spacing={3} className="mt-[39px]">
                        <Pagination 
                            count={totalPages}
                            page={currentPage}
                            variant="outlined" 
                            shape="rounded" 
                            size = "large"
                            onChange = {handleChange}
                            
                        />
                    </Stack>
                </div> 
                <div className="flex 2xl:flex-col justify-between 2xl:bottom-5 2xl:right-1 items-center 2xl:absolute gap-3 mt-[35px] mx-[30px]">
                    <div className="flex items-center">
                        <FormControl>
                            <InputLabel  id="demo-simple-select-label" className="text-[16px] mt-[-7px] font-semibold">Readers</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Readerss"
                                onChange={handleChange1}
                                className="md:h-[40px] w-[175px] text-[14px]  md:w-[220px] h-[36px]" 
                            >
                            <MenuItem value={10}>
                                <div className="flex items-center">
                                    <button 
                                        className = "mr-3 ml-1"
                                        onClick={()=> {downloadFileAtURL("/windows_10_reader.msix")}}    
                                    >
                                        <i className="fas fa-download 
                                        text-[16px]  text-blue-500"></i>
                                    </button>
                                    <p className="font-semibold text-[14px] md:text-[16px]">Win 10 fb2, epub...</p>
                                </div>
                            </MenuItem>
                            <MenuItem value={20}>
                                <div className="flex items-center">
                                    <button 
                                        className="mr-3 ml-1" 
                                        onClick={()=> {downloadFileAtURL("/android_reader.apk")}}
                                    >
                                        <i className="fas fa-download 
                                        text-[16px]  text-blue-500"></i>
                                    </button>
                                    <p className="font-semibold text-[14px] md:text-[16px]">Android fb2, epub...</p>
                                </div>
                            </MenuItem>
                            <MenuItem value={30}>
                                <div className="flex items-center">
                                    <button 
                                        className="mr-3 ml-1"
                                        onClick={()=> {downloadFileAtURL("/android_djvu_reader.apk")}}
                                    >
                                        <i className="fas fa-download 
                                        text-[16px]  text-blue-500"></i>
                                    </button>
                                    <p className="font-semibold text-[14px] md:text-[16px]">Android djvu</p>
                                </div>
                            </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className="font-bold md:text-[16px] text-[14px] md:w-[220px] text-slate-700  p-[9px] rounded-md border-[1px] border-slate-300">
                        Kitaplaryň sany: {count} 
                    </div>
                </div>      
            </div>
        </div>
    )
    }

export default Home
