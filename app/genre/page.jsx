"use client"
import Link from "next/link"
//import Image from "next/image"
import { useEffect, useState } from "react"
import { useAppContext } from "../../context"
import axiosInstance from "../../utils/axiosInstance"

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

const Genre = () => {

    

    const [genres, setGenres] = useState([]);
    const [error, setError] = useState(null)
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const arr = [1,2,3,4,5,6,7,8,9,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,29,30,32,33,34,35,38,39,40,41,42,43,45];

  

  

    useEffect(() => {
        async function fetchData() {
        try {
            const headers = {
                'Content-Type': 'application/json'
              };
            const response = await axiosInstance.get(
                `/api/genres/?page=${currentPage}`,
                {
                    headers: headers
                  }
            );
            setGenres(response.data);
            setCount(response.data.count)
        } catch (err) {
            setError(err);
            console.log(error)
        }
        }
        fetchData();
    }, [currentPage]);

    



    const allGenres = genres.map(genre => {
        return (
            <Link  key={genre["id"]} href={`/genre/${genre["id"]}`} className='flex flex-col items-center bg-white shadow-custom-2 hover:shadow-custom hover:scale-105 transition-transform duration-200 w-[170px] p-1 rounded-md'>
                <div className="h-[180px] w-[155px] flex overflow-hidden rounded-md">
                    <img
                        alt="check surat kitap"
                        src={arr.includes(genre["id"]) ? `/genre/${genre["id"]}.png` : "/genre/default.png"}
                        height={180}
                        width={155}
                        className="object-cover object-center w-full h-auto"
                    />
                </div>
                <div 
                    href={`/genre/${genre["id"]}`}
                    className="mt-[15px] mb-[8px] font-custom-sans font-semibold text-[16px] leading-6 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                    { (genre["name"]?.length > 17) ? genre["name"].slice(0, 17) + '...' : genre["name"] }
                </div>
                {/* <p className="text-blue-500">
                    kitap sany
                </p> */}
            </Link>
        )
    })
    return (
        <>
            <div className="flex-1 mt-[30px]">
                <div className="mx-[7px]  flex flex-col items-center pb-[40px]">  
                    <div className='grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3  lg:grid-cols-5 xl:grid-cols-6  gap-8 mt-[40px]'>
                        {allGenres}
                    </div>
                </div>
            </div>
            
        </>
            
    )
    }

export default Genre
