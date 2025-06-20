import { useState, useEffect } from "react"
import axiosInstance from "../../utils/axiosInstance"
import { useAppContext } from "../../context";
import Link from "next/link";




const Genres = () => {
  const {
    setToggleLeft,
    toggleUp,
    token
  } = useAppContext();
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchData() {
    try {
        const headers = {
            'Content-Type': 'application/json'
          };
        const response = await axiosInstance.get(
            '/api/genres/',
            {
                headers: headers
              }
        );
        setGenres(response.data);
       
    } catch (err) {
        setError(err);
        console.log(error)
    }
    }
    fetchData();
  }, []);



  const  allGenres = genres?.map(genre => {
    return (
      <Link 
          href={`/genre/${genre["id"]}`} 
          className='font-semibold'
          onClick={()=> setToggleLeft(false)}
          key={genre["id"]}
      >
      <li
          key={genre["id"]}
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
          {genre.name}
      </li>
      </Link>
    )
  })



  return (
      <div>
        <div className="flex flex-col h-[84vh] shadow-md p-[1px] pr-[3px] border-[1px] border-slate-300 bg-white mr-[8px] mt-[10px] overflow-y-scroll" >
          <ul
                  className={`
                  text-white
                  pl-[1px]
                  pt-[1px]
                  `}
              >
              {allGenres}
          </ul>
        </div>
    </div>
  )
}

export default Genres