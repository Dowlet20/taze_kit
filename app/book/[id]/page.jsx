"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import axiosInstance from "../../../utils/axiosInstance";
import { useRouter } from "next/navigation";
import {
    Table,
    TableBody,
    TableCell,
    TableRow
  } from "../../../components/ui/table"


 

// const base_URL= 'http://192.168.55.140:4000';
const base_URL= 'http://192.168.55.140:4000';

const Page = ({params}) => {
    const [book, setBook] = useState({});
    const [error, setError] = useState(null)

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
                `/api/books/${params["id"]}/`,
                {
                    headers: headers
                  }
            );
            setBook(response.data);
        } catch (err) {
            setError(err);
            console.log(error)
        }
        }
        fetchData();
    }, []);


    return (
    <div className="flex justify-center md:mx-[10px] w-full pt-[35px]">
        <div className="flex flex-col  items-center lg:w-[calc(50%+385px)]  xl:w-[calc(50%+320px)] 2xl:w-[calc(62%+20px)] 2xl:ml-[10px] w-full mt-[60px]">
            <div className="flex flex-col md:flex-row w-full md:items-start  md:justify-around">
                <div className="flex flex-col items-center">
                    <div className="overflow-hidden flex h-[380px] w-[250px] rounded-md">
                        <Image 
                            alt="Umumy kitap surat"
                            height={380}
                            width={250}
                            src={book?.["get_image"] ? `${base_URL}${book?.["get_image"]}` : "/default-book.png"}
                            className="object-fit filter object-center rounded-md w-full h-auto"

                            priority 
                        />
                    </div>
                    <div className="flex justify-around w-[300px] md:mt-[35px] mt-[40px] items-center">
                        <button className="flex flex-col items-center" onClick={()=> {downloadFileAtURL(`${base_URL}${book?.["get_book"]}`)}}>
                            <i className="fas fa-download text-blue-500 text-[20px] mb-[2px]"></i>
                            <span className="font-bold text-[14px] text-blue-500">
                            Ýükle
                            </span>
                        </button>
                        <Link 
                            className="flex flex-col items-center" 
                            href={{ 
                                pathname : book?.["get_book_ext"] === ".pdf" ? `bookReaderPDF${book?.["get_book"]}` :  `bookReaderEPUB${book?.["get_book"]}`
                        
                        }}
                        >
                            <i className="fas fa-book text-blue-500 text-[20px] mb-[2px]"></i>
                            <span className="font-bold text-[14px] text-blue-500">
                            Kitaby oka
                            </span>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col   md:ml-[20px]">
                    <div className='flex items-center'>
                        <div className="flex flex-col mx-[30px] md:ml-[5px]  flex-1    justify-center  sm:ml-[25px] ">
                            <p className=" md:mt-[0px] mt-[35px]  whitespace-normal font-sans font-bold text-[20px] lg:text-[24px] self-center md:self-start  md:mb-[10px] min-w-[380px]">
                                {book?.["title"]}
                            </p>
                           
                            <div className="flex justify-center md:mt-[20px] mt-[14px] w-full">
                                <Table className="table-auto  mt-[15px]  ">
                                    <TableBody>
                                        { /\d/.test(book?.["published_at"]) &&
                                            (<TableRow>    
                                                <TableCell className='custom-table-td-main-book-1'>
                                                    Çap edilen ýyly:
                                                </TableCell>
                                                <TableCell className='custom-table-td-main-book-1'>
                                                {book?.["published_at"]}
                                                </TableCell>
                                            </TableRow>)
                                        }
                                        <TableRow>
                                            <TableCell className='custom-table-td-main-book-1'>
                                                Dili:
                                            </TableCell>
                                            <TableCell className='custom-table-td-main-book-1'>
                                            {book?.["language"]}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='custom-table-td-main-book-1'>
                                                Awtor:
                                            </TableCell>
                                            <TableCell className='custom-table-td-main-book-1'>
                                                <Link href={book?.["author"] ? `/author/${book?.["author"]?.["id"]}` : "#" } className="text-blue-500">
                                                    {book?.["author"] && (<span>{book?.["author"]["name"]}</span>)}
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell className='custom-table-td-main-book-1'>
                                                Žanr:
                                            </TableCell>
                                            <TableCell className='custom-table-td-main-book-1'>
                                                <Link href={book?.["genre"] ? `/genre/${book?.["genre"]?.["id"]}` : "#" } className="text-blue-500">
                                                        {book?.["genre"] && (<span>{book?.["genre"]["name"]}</span>)}
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                        { /\d/.test(book?.["pages"]) && 
                                         (
                                            <TableRow>
                                                <TableCell className='custom-table-td-main-book-1'>
                                                    Sahypa:
                                                </TableCell>
                                                <TableCell className='custom-table-td-main-book-1'>
                                                {book?.["pages"]}
                                                </TableCell>
                                            </TableRow>
                                         )
                                        }
                                        <TableRow>
                                            <TableCell className='custom-table-td-main-book-1'>
                                                Göwrümi:
                                            </TableCell>
                                            <TableCell className='custom-table-td-main-book-1'>
                                                {book?.["get_book_size"]}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </div>
                            <div className="flex flex-col mt-[30px] p-4 rounded-md font-sans font-semibold md:hidden  overflow-hidden">
                                <p className="text-center font-bold text-[18px] mb-[14px]">
                                    Düşündiriş
                                </p>
                                <p className="mb-[15px]">
                                    {book?.["description"]}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-slate-600 p-4 mt-[35px]
                rounded-md font-custom-sans font-semibold 
                md:block hidden flex-1 w-full">
                <p className="text-center font-bold text-[18px] mb-[14px]">
                    Düşündiriş
                </p>
                <p className="mb-[15px]">
                    {book?.["description"]}
                </p>
            </div>
        </div>
    </div>
    );
};
export default Page;







