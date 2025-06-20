"use client"

import Authors from "../../components/components2/Authors";
import Genres from "../../components/components2/Genres";
import FavouriteBooks from "../../components/components2/FavouriteBooks";
import SearchForm from "../../components/components2/search-form";
import { useAppContext } from "../../context"
import Image from "next/image";
import Link from "next/link";



const LeftSideBar = () => {
  const {
    toggleLeft,
    setToggleLeft,
    toggleSideBar,
    setToggleSideBar,
  } = useAppContext();

  const lists = [{id:"2", name:"programmirleme"}, {id:"13", name:"Çeper eser"}, {id:"18", name:"Hukuk"}, {id:"19", name:"Taryh"}, {id:"20", name:"Kiberhowpsuzlyk"}, {id:"22", name:"Iňlis dili"}, {id:"23", name:"Rus dili"}, {id:"24", name:"Arap dili"}, {id:"25", name:"Pars dili"}, {id:"26", name:"Nemes dili"}, {id:"27", name:"Fransuz dili"}, {id:"29", name:"Hytaý dili"}, {id:"30", name:"Matematika"}, {id:"5", name:"Fizika"}]

  const allPart = lists.map(book=> {
    return (
      <div key={book["id"]}>
        <div className="flex items-center">
          <div className="flex  w-[60px] h-[60px] p-1  overflow-hidden rounded-full">
            <Image 
              alt="group image"
              height={60}
              width={60}
              src={`/genre/${book["id"]}.png`}
              className="rounded-full object-cover object-center w-full h-auto"
              priority 
            />
          </div>
          <div className="flex flex-col ml-[7px]">
            <Link 
              className="font-custom-sans font-semibold md:text-[16px]"
              href={`/genre/${book["id"]}`}
              >
              {book.name}
            </Link>
          </div>
        </div>
        <div className="my-3">
          <hr className="border-t border-black" />
        </div>
      </div>
    )
  })

  return (
    <div className={toggleLeft ? `fixed z-20 "w-[300px]"  border-r-[1px] border-slate-300 pl-2 h-screen left-0 flex-col bg-white shadow-custom-2 
    "mt-[33px]"` : "hidden"}>  
            <ul className="flex h-[30px] bg-white  pr-2 mb-[14px] mt-[58px]">
              <li className="w-[70px] flex text-center"> 
                <Link 
                  className="
                    w-full
                    border-r-[1px]
                    border-white
                    bg-gray-800
                    hover:bg-gray-700
                    text-white
                    text-[14px]
                    font-semibold
                    py-[5px] px-2
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-300
                    ease-in-out
                    transform
                    hover:z-40
                    focus:z-40
                    hover:border-none 
                    hover:-translate-y-1
                    hover:scale-110
                    focus:outline-none
                    focus:ring-2
                    focus:bg-gray-800
                    focus:ring-offset-2
                  "
                  onClick={() => setToggleSideBar(1)}
                  href={"/author"}
                >
                  Awtor
                </Link>
              </li>
              <li className="w-[70px] flex text-center">
                <Link 
                  href="/genre"
                  className="
                    w-full
                    border-r-[1px]
                    hover:z-40
                    focus:z-40
                    hover:border-none
                    border-white
                    bg-gray-800
                    hover:bg-gray-700
                    text-white
                    text-[14px]
                    font-semibold
                    py-[5px] px-2
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-300
                    ease-in-out
                    transform
                    hover:-translate-y-1
                    hover:scale-110
                    focus:outline-none
                    focus:ring-2
                    focus:bg-gray-800
                    focus:ring-offset-2
                  "
                  onClick={() => setToggleSideBar(3)}
                >
                  Žanr
                </Link>
              </li>
              <li className="w-[70px] flex text-center">
                <Link
                  href="/" 
                  className="
                    w-full
                    border-r-[1px]
                    border-white
                    bg-gray-800
                    hover:bg-gray-700
                    hover:z-40
                    focus:z-40
                    hover:border-none
                    text-white
                    text-[14px]
                    font-semibold
                    py-[5px] px-2
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-300
                    ease-in-out
                    transform
                    hover:-translate-y-1
                    hover:scale-110
                    focus:outline-none
                    focus:ring-2
                    focus:bg-gray-800
                    focus:ring-offset-2
                  "
                  onClick={() => setToggleSideBar(4)}
                >
                    Gözleg
                </Link>
              </li>
              <li className="w-[70px] flex text-center">
                <Link 
                  href={"/genre"}
                  className="
                    w-full
                    bg-gray-800
                    hover:bg-gray-700
                    text-white
                    text-[14px]
                    font-semibold
                    py-[5px] px-2
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-300
                    ease-in-out
                    transform
                    hover:-translate-y-1
                    hover:scale-110
                    focus:outline-none
                    focus:ring-2
                    focus:bg-gray-800
                    focus:ring-offset-2
                    
                  "
                  onClick={() => setToggleSideBar(5)}
                >
                    Bölüm
                </Link>
              </li>
            </ul>
            { toggleSideBar == 1 && (
              <Authors />
            )}
            { toggleSideBar == 2 && (
              <div>
                <div className = "flex gap-1 p-2 h-[40px] bg-white items-center">
                  <p>poisk</p>
                  <input className="px-2 w-full shadow-inner border-slate-300 border-[2px] rounded-md h-[30px]" />
                  <button className="mx-[5px]"><i className="fas fa-search"></i></button>
                </div>
                <div className="h-[82vh] shadow-inner p-2 border-[1px] border-slate-600 bg-white mr-[8px] mt-[10px] overflow-y-scroll">
                  <Link 
                    href={"/series"}
                    className='font-semibold'
                    onClick={()=> setToggleLeft(false)}
                  >
                    serii
                  </Link>
                  <p>
                    serii
                  </p>
                  <p>
                    serii
                  </p>
                </div>
              </div>
            )}
            { toggleSideBar == 3 && (
              <Genres />
            )}
            { toggleSideBar == 4 && (
              <div className="pl-[8px] pr-[10px] mt-[7px]">
                <SearchForm />
              </div>
            )}
            { toggleSideBar == 5 && (
              <div>
                <div className="h-[85vh] shadow-inner p-2 bg-white mr-[8px] mt-[10px] overflow-y-scroll pt-[12px]">
                  {allPart}
                </div>
             </div>
            )}
            { toggleSideBar == 6 && (
              <FavouriteBooks />
            )}
          </div>
  )
}

export default LeftSideBar
