"use client"

import axiosInstance from "../../utils/axiosInstance"
import { useState, useEffect } from 'react';
import { useAppContext } from "../../context";
import Link from "next/link";

const Authors = () => {
    const {
        setToggleLeft,
    } = useAppContext();
    const [authors, setAuthors] = useState([]);
    const [error, setError] = useState(null);
    const [text, setText] = useState("");

    const onSubmit = evt => {
      evt.preventDefault();
      if (text === "") {
        alert("Please enter something!");
      } else {
        alert(text);
        setText("");
      }
    };
  
    const onChange = evt => setText(evt.target.value);

    useEffect(() => {
        async function fetchData() {
        try {
            const headers = {
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              };
            const response = await axiosInstance.get(
                `/api/authors/?search=${text}`,
                {
                    headers: headers
                  }
            );
            setAuthors(response.data.results);
            
        } catch (err) {
            setError(err);
            console.log(error)
        }
        }
        fetchData();
    }, [text]);


    
    
    const  allAuthors = authors?.map(author => {
        return (
            <Link 
                href={`/author/${author["id"]}`} 
                className='font-semibold'
                onClick={()=> setToggleLeft(false)}
                key={author["id"]}
            >
            <li
          key={author["id"]}
          className={`
            flex
            border-b-[1px]
            border-gray-800
            items-center
            p-3
            text-[14px]
            font-extrabold
            bg-white
            hover:bg-slate-100
            transition-colors
            duration-300
            text-gray-800
          `}
        >
                {author.name}
            </li>
            </Link>
        )
    })
    
    
    return (
        <div className="mr-[1px]">
            <div className = "flex gap-1 p-1 h-[40px] bg-white items-center">
                
                <input 
                    type="text"
                    name="text"
                    placeholder="Awtor gözle..."
                    value={text}
                    onChange={onChange} 
                    className="px-2 w-full shadow-inner border-slate-300 border-[2px] rounded-md h-[30px]" 
                />
                <button className="mx-[7px]"><i className="fas fa-search"></i></button>
            </div>
            <div className="flex flex-col h-[77vh] shadow-inner p-[1px] pr-[4px] border-[1px] border-slate-300 bg-white mr-[8px] mt-[10px]" >
            <ul
                className={`
                text-white
                pl-[1px]
                pt-[1px]
                `}
            >
                {allAuthors}
                </ul>
            </div>
        </div>
    )
}

export default Authors
