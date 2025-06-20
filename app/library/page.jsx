"use client"



import { useState, useEffect } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
    import * as React from 'react';
    import Box from '@mui/material/Box';
    import InputLabel from '@mui/material/InputLabel';
    import MenuItem from '@mui/material/MenuItem';
    import FormControl from '@mui/material/FormControl';
    import Select, { SelectChangeEvent } from '@mui/material/Select';
    import axiosInstance from '../../utils/axiosInstance';
    import Pagination from '@mui/material/Pagination';
    import Stack from '@mui/material/Stack';
   
   

    const base_URL= 'http://192.168.0.11:4000';

const Library = () => {
    
  
    const [text, setText] = useState("");
    const [awtor, setAwtor] = useState(0);
    const [genre, setGenre] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageAuthor, setCurrentPageAuthor] = useState(1);
    const [currentPageGenre, setCurrentPageGenre] = useState(1);
    const [totalPages, setTotalPages] = useState(11);
    const [error, setError] = useState(null);
    const [pagesToShow, setPageToShow] = useState(5);
    const [count, setCount] = useState(0);
    const [books, setBooks] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [authorsCount, setAuthorsCount] = useState(0); 
    const [genres, setGenres] = useState([]);
    const [genresCount, setGenresCount] = useState(0);
    const [status, setStatus] = useState(null);


    const handleChange1 = (event) => {
      setAwtor(event.target.value);
    };


    const handleChange2 = (event) => {
      setGenre(event.target.value);
    };

  const onChange = evt => setText(evt.target.value);
  
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  useEffect(()=> {
    if (count%20 !== 0) {
        setTotalPages(parseInt(count/20)+1);
    } else {
        setTotalPages(parseInt(count/20))
    }
}, [count]
)

  useEffect(() => {
    async function fetchData() {
    try {
        const headers = {
            'Content-Type': 'application/json'
          };
        
        if (!genre && awtor) {
          const response = await axiosInstance.get(
            `/api/local/books/?page=${currentPage}&author=${awtor}`,
            {
                headers: headers
              }
        );
        setBooks(response.data.results);
        setCount(response.data.count);     
        } else if (genre && awtor) {
          const response = await axiosInstance.get(
            `/api/local/books/?page=${currentPage}&author=${awtor}&genre=${genre}`,
            {
                headers: headers
              }
        );
        setBooks(response.data.results);
        setCount(response.data.count);    
        } else if (genre && !awtor) {
          const response = await axiosInstance.get(
            `/api/local/books/?page=${currentPage}&genre=${genre}`,
            {
                headers: headers
              }
        );
        setBooks(response.data.results);
        setCount(response.data.count);    
        } else {
          const response = await axiosInstance.get(
              `/api/local/books/?page=${currentPage}`,
              {
                  headers: headers
                }
          );
          setBooks(response.data.results);
          setCount(response.data.count);
        }
    } catch (err) {
        setError(err);
        console.log(error)
    }
    }
    fetchData();
  }, [currentPage, genre, awtor]);

  useEffect(() => {
    async function fetchData() {
    try {
        const headers = {
            'Content-Type': 'application/json'
          };
        const response = await axiosInstance.get(
            `/api/local/authors/?page=${currentPageAuthor}`,
            {
                headers: headers
              }
        );
        setAuthors(response.data.results);
        setAuthorsCount(response.data.count);
    } catch (err) {
        setError(err);
        console.log(error)
    }
    }
    fetchData();
  }, [currentPageAuthor]);

  useEffect(() => {
    async function fetchData() {
    try {
        const headers = {
            'Content-Type': 'application/json'
          };
        const response = await axiosInstance.get(
            `/api/local/books/?page=${currentPage}&status=${status}`,
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
  }, [currentPage, status]);



  useEffect(() => {
    async function fetchData() {
    try {
        const headers = {
            'Content-Type': 'application/json'
          };
        const response = await axiosInstance.get(
            `/api/local/genres/?page=${currentPageGenre}`,
            {
                headers: headers
              }
        );
        setGenres(response.data.results);
        setGenresCount(response.data.count);
    } catch (err) {
        setError(err);
        console.log(error)
    }
    }
    fetchData();
  }, [currentPageGenre]);

  useEffect(() => {
    async function fetchData() {
      try {
          const headers = {
              'Content-Type': 'application/json'
            };
          const response = await axiosInstance.get(
              `/api/local/books/?search=${text}`,
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
    }, [text]);

  return (
    <div className='flex flex-col relative w-full mx-[30px] lg:mx-[62px] xl:mx-[97px] 2xl:mx-[300px] mt-[50px]'>
        <div className="font-bold absolute bottom-[-30px] right-[-10px] text-[16px] md:text-[18px] border-gray-300 text-gray-700 border-[1px] px-3 py-2 self-center rounded-lg">
            Kitaplaryň sany: {count} 
        </div>
        <div className="mt-[40px] md:mt-[50px] w-full flex gap-4 items-center">
          <div className="flex self-center rounded-full w-2/3 shadow-custom-2 items-center">
              <i className="fas fa-search text-gray-600 bg-white px-[13px] mr-[-1px] outline-none rounded-l-2xl text-[16px]"></i>
              <input
              type="text"
              name="text"
              placeholder="Kitap gözle..."
              value={text}
              onChange={onChange}
              className="bg-white px-[9px] py-[7px] font-semibold w-full outline-none rounded-full"
              />
          </div>
          <button onClick={() => setStatus(true)}
            className="flex gap-2 lg:gap-3 px-2 lg:px-3 py-[6px] items-center lg:mx-[15px] rounded-full shadow-custom-2 w-1/6
            ">
              <i className="fas fa-check font-extrabold border-[2px] text-green-500 p-[3px] border-green-500 rounded-md"></i>
              <p className='font-custom-sans font-semibold text-gray-600'>  
                <span className='md:block hidden'>
                  Elýeterli
                </span>
                <span className='md:hidden block'>Bar</span>
              </p>
          </button>
          <button onClick={() => setStatus(false)} className="flex items-center  gap-2 lg:gap-3 px-2 lg:px-3 py-[6px] lg:mx-[15px] w-1/6 shadow-custom-2 rounded-full
          ">
            <i className="fas fa-times font-extrabold border-[2px] text-red-500 p-[3px] border-red-500 rounded-md"></i>
            <p className='font-custom-sans font-semibold text-gray-600'>  
              <span className='md:block hidden'>
                Ulanyşda
              </span>
              <span className='md:hidden block'>
                Ýok
              </span>
            </p>
          </button>
        </div>
        <div className='flex items-center mt-[30px] gap-4'>
          {/* <Box sx={{ minWidth: 120 }} className="flex-1 lg:mx-[15px]">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontWeight: 'bold' }}>Awtor</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={awtor}
                label="Awtor"
                onChange={handleChange1}
              >
                <MenuItem key={0} value={0}>
                  ------
                </MenuItem>
                {authors.map((author) => {
                  
                    return (
                      <MenuItem key={author?.["id"]} value={author?.["id"]}>
                        { (author?.["name"]?.length > 16) ? author?.["name"].slice(0, 16).toLowerCase().charAt(0).toUpperCase() + author?.["name"].slice(0, 16).toLowerCase().slice(1) + '...' : author?.["name"] }
                      </MenuItem>
                    )
                  }
                )}
              </Select>
            </FormControl>
          </Box>
          <Box sx={{ minWidth: 120 }} className="flex-1 lg:mx-[15px]">
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontWeight: 'bold' }}>Žanr</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={genre}
                label="genre"
                onChange={handleChange2}
              >
                <MenuItem key={0} value={0}>
                          ------
                        </MenuItem>
                {genres.map((genre) => {
                 
                  return (
                    <MenuItem key={genre?.["id"]} value={genre?.["id"]}>
                      { (genre?.["name"]?.length > 16) ? genre?.["name"].slice(0, 16).toLowerCase().charAt(0).toUpperCase() + genre?.["name"].slice(0, 16).toLowerCase().slice(1) + '...' : genre?.["name"] }
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Box>  */}
          {/* <button onClick={() => setStatus(true)}
            className="flex gap-3 px-3 items-center lg:mx-[15px] 
            border-[1px] py-[11px] rounded-md border-slate-400 
            ">
              <i className="fas fa-check font-extrabold border-[2px] text-green-500 p-[6px] border-green-500 rounded-md"></i>
              <p className='font-custom-sans font-semibold text-gray-600'>  Elýeterli</p>
          </button>
          <button onClick={() => setStatus(false)} className="flex items-center  gap-3 px-3 lg:mx-[15px]
          border-[1px] py-[11px] rounded-md border-slate-400
          ">
            <i className="fas fa-times font-extrabold border-[2px] text-red-500 p-[6px] border-red-500 rounded-md"></i>
            <p className='font-custom-sans font-semibold text-gray-600'>  Ulanyşda</p>
          </button> */}
        </div>
        <div className="mt-[30px]  sticky top-[64px] z-10">
          <Table>
            <TableHeader className="bg-slate-100  flex w-full items-center pt-[20px] h-[70px] border-[1px] text-[16px]  rounded-md">
                <TableRow className="flex w-full items-center">
                    {/* <TableHead className="w-1/4 text-left font-bold">Žanry</TableHead>
                    <TableHead className="w-1/4 text-left  font-bold">Awtory</TableHead> */}
                    <TableHead className="flex-1 font-semibold">Kitabyň ady</TableHead>
                    <TableHead className="w-1/6 text-left font-semibold">Sahypa</TableHead>
                    <TableHead className="w-1/6 text-left font-semibold">
                      <span className='lg:block hidden'>
                        Çap edilen ýyly
                      </span>
                      <span className='lg:hidden block'>
                        Ýyly
                      </span>
                    </TableHead>
                    <TableHead className="w-[60px] text-left mr-[10px] font-bold">Status</TableHead>
                </TableRow>
            </TableHeader>
          </Table>
        </div>
        <Table className="rounded-md">
            <TableBody>
                {books.map((book) => (
                <TableRow key={book?.["id"]} className="hover:bg-slate-200 font-semibold">
                    {/* <TableCell className="font-medium whitespace-normal text-left  w-1/4">
                      { (book?.["genre"]?.["name"]?.length > 16) ? book?.["genre"]?.["name"].slice(0, 16).toLowerCase().charAt(0).toUpperCase() + book?.["genre"]?.["name"].slice(0, 16).toLowerCase().slice(1) + '...' : book?.["genre"]?.["name"] }
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal text-left  w-1/4">
                      <span className='md:hidden block'>
                        { (book?.["author"]?.["name"]?.length > 16) ? book?.["author"]?.["name"].slice(0, 16).toLowerCase().charAt(0).toUpperCase() + book?.["author"]?.["name"].slice(0, 16).toLowerCase().slice(1) + '...' : book?.["author"]?.["name"] }
                      </span>
                      <span className='md:block hidden'>
                      { (book?.["author"]?.["name"]?.length > 24) ? book?.["author"]?.["name"].slice(0, 24).toLowerCase().charAt(0).toUpperCase() + book?.["author"]?.["name"].slice(0, 24).toLowerCase().slice(1) + '...' : book?.["author"]?.["name"] }
                      </span>
                    </TableCell> */}
                    <TableCell className="font-custom-sans whitespace-nowrap overflow-hidden leading-6 text-ellipsis font-semibold text-[14px] ml-[2px] flex-1">
                      <span className='sm:hidden block'>
                       { (book?.["name"]?.length > 26) ? book?.["name"].slice(0, 26).toLowerCase().charAt(0).toUpperCase() + book?.["name"].slice(0, 26).toLowerCase().slice(1) + '...' : book?.["name"] }
                      </span>
                      <span className='hidden sm:block md:hidden'>
                       { (book?.["name"]?.length > 39) ? book?.["name"].slice(0, 39).toLowerCase().charAt(0).toUpperCase() + book?.["name"].slice(0, 39).toLowerCase().slice(1) + '...' : book?.["name"] }
                      </span>
                      <span className='hidden md:block lg:hidden'>
                       { (book?.["name"]?.length > 52) ? book?.["name"].slice(0, 52).toLowerCase().charAt(0).toUpperCase() + book?.["name"].slice(0, 52).toLowerCase().slice(1) + '...' : book?.["name"] }
                      </span>
                      <span className='hidden md:hidden lg:block xl:hidden'>
                       { (book?.["name"]?.length > 64) ? book?.["name"].slice(0, 64).toLowerCase().charAt(0).toUpperCase() + book?.["name"].slice(0, 64).toLowerCase().slice(1) + '...' : book?.["name"] }
                      </span>
                      <span className='hidden lg:hidden xl:block 2xl:hidden'>
                       { (book?.["name"]?.length > 82) ? book?.["name"].slice(0, 82).toLowerCase().charAt(0).toUpperCase() + book?.["name"].slice(0, 82).toLowerCase().slice(1) + '...' : book?.["name"] }
                      </span>
                      <span className='hidden 2xl:block'>
                       { (book?.["name"]?.length > 86) ? book?.["name"].slice(0, 86).toLowerCase().charAt(0).toUpperCase() + book?.["name"].slice(0, 86).toLowerCase().slice(1) + '...' : book?.["name"] }
                      </span>
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal text-left w-1/6 mr-[2px]">
                      { book?.["pages"] }
                    </TableCell>
                    <TableCell className="font-medium whitespace-normal text-left w-1/6">
                        { book?.["published_year"]}
                    </TableCell>
                    <TableCell className="text-right whitespace-normal w-[60px]">{book?.["status"] ? 
                      (
                          <i className="fas fa-check font-extrabold border-[2px] text-green-500 p-[6px] border-green-500 rounded-md"></i>
                      ) : 
                      (
                        <i className="fas fa-times font-extrabold border-[2px] text-red-500 p-[6px] border-red-500 rounded-md"></i>
                      ) }
                    </TableCell>
                 </TableRow>
                ))}
            </TableBody>
      </Table>
      <Stack spacing={3} className="mt-[40px] self-center">
            <Pagination 
                count={totalPages} 
                variant="outlined" 
                shape="rounded" 
                size = "large"
                onChange = {handleChange}
            />
        </Stack>
      {/* <div className = "flex p-2 h-[23px] mt-[15px]  items-center self-center mb-[50px]">
          <div className="flex justify-center mt-[60px]">
              <button
              className={`bg-gray-200 text-gray-700 px-4 py-2 mx-1 ${
                  currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              >
              Öňki
              </button>
              {renderPageButtons()}
              <button
              className={`bg-gray-200 text-gray-700 px-4 py-2 mx-1 ${
                  currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              >
              Indiki
              </button>
          </div>
      </div> */}
    </div>
  )
}

export default Library
