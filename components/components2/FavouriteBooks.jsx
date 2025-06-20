"use client"

import { useAppContext } from "../../context";
import axiosInstance from "../../utils/axiosInstance";
import Link from "next/link";
import { useState, useEffect } from "react";



const FavouriteBooks = () => {
    const {
        setToggleLeft,
    } = useAppContext();

    const [error, setError] = useState(null)
    const [books, setBooks] = useState([])

    useEffect(() => {
        async function fetchData() {
        try {
            const headers = {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
                };
            const response = await axiosInstance.get(
                '/api/books/favourites',
                {
                    headers: headers
                    }
            );
            setBooks(response.data.results);
            setCount(response.data.count);
            //next bilen previous galdy
        } catch (err) {
            setError(err);
            console.log(error)
        }
        }
        fetchData();
    }, []);

    const allBooks = books.map(book => {
        return (
            <Link href={`/book/${book["book"]["id"]}`} className="font-custom-sans font-semibold text-[16px]"
                onClick={()=> setToggleLeft(false)}
                key={book["book"]["id"]}
            >
                {book["book"]["title"]}
            </Link>
        )
    })
    
    return (
    <div>
        <div className = "flex gap-1 p-2 h-[40px] bg-white items-center">
            <p>poisk</p>
            <input className="px-2 w-full shadow-inner border-slate-300 border-[2px] rounded-md h-[30px]" />
            <button className="mx-[5px]"><i className="fas fa-search"></i></button>
        </div>
        <div className="flex flex-col max-h-[800px] shadow-inner p-2 border-[1px] border-slate-600 bg-white mr-[8px] mt-[10px] overflow-y-scroll" >
            {allBooks}
        </div>
    </div>
    )
}

export default FavouriteBooks
