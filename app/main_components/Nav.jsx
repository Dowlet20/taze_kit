"use client"

import Link from "next/link";
import { useAppContext } from "../../context"
//import Image from "next/image";
import { useRouter } from "next/navigation";
import HomeIcon from '@mui/icons-material/Home';
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"


const Nav = () => {
  const {
    setToggleLeft,
    token,
    setToken,
    countLiked,
    setCountLiked,
  } = useAppContext();

  const router = useRouter();
  const [backgroundColor, setBackgroundColor] = useState('bg-slate-500');

  useEffect(()=> {
    setBackgroundColor('bg-green-400');
    setTimeout(() => {
      setBackgroundColor('bg-slate-500');
    }, 2000);
}, [countLiked]
)

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
      setCountLiked(response.data.count);
      
  } catch (err) {
      console.log(err);
  }
  }
  if (token) {
    fetchData();
  }
}, [countLiked]);



  useEffect(()=> {
    setToken(localStorage.getItem('token'))
  }, [token])


  const logout = () => {
    localStorage.removeItem('token')
    setToken(false)
    router.push('/auth/login')
  }



  return (
    <>
      <div className="flex flex-col">
        <div className='flex bg-white z-50 md:justify-center items-center h-[60px] fixed top-0 right-0 left-0 shadow-custom border-b-[1px] border-slate-300'>
          <div className="flex items-center lg:w-[85%] 2xl:w-[calc(55%+20px)]   w-[95%] justify-between xl:mx-0">
          <div className='flex items-center'>
              <button className='font-semibold' onClick={()=> setToggleLeft(toggling => !toggling)}>
                    <i className="fas fa-bars text-gray-800 font-bold text-[18px] sm:text-[26px] m-2"></i>
              </button>
            </div>
              <div className={`flex items-center   ${!token ? "md:ml-[83px]" : "md:ml-[155px]"} md:self-center`}>
                   <img  
                        src="/Image/library_icon.png"
                        alt="liked things"
                        width={45}
                        height={45}
                        className="w-full h-auto sm:block hidden"
                      />
                <Link href="/" className="custom-font-sans font-extrabold text-[20px] md:text-[22px] text-slate-700" onClick={() => setToggleLeft(false)}>  
                  Kitaphana
                </Link>
              </div>
            <div className="flex items-center">
              <ul className = "flex p-2 items-center gap-4">
                
                <li>
                <Link
                      href="/"
                      className="flex items-center justify-center h-14 pr-[10px] text-slate-700 font-bold custom-font-sans bg-transparent"
                      onClick={() => setToggleLeft(false)}
                  >
                      <HomeIcon className="h-9 w-9"/> 
                  </Link>
                </li>

                <li className="sm:mr-[12px] mr-[12px] mb-[-1px]">
                  <Link href="/library" className="sm:w-[55px] sm:h-[55px] w-[45px] h-[45px]">
                    <img  
                        src="/Image/library.png"
                        alt="liked things"
                        width={55}
                        height={55}
                        className="object-fit h-auto hover:scale-105  transition-transform duration-200"
                      />
                  </Link>
                </li>
                {token && 
                (<li className="font-serif mr-[23px]">
                  <Link className="relative"
                    href={"/liked"}
                    >
                     <i  className="far fa-heart hover:scale-110  transition-transform duration-200 text-[16px] sm:text-[27px] text-gray-500 cursor-pointer"></i>
                    <div className={`flex justify-center absolute text-white top-[-5px] sm:top-[-14px] sm:left-[18px] left-[15px]  ${backgroundColor} rounded-full sm:w-[22px] sm:h-[22px] w-[16px] h-[16px] text-[11px] font-custom-sans sm:pt-[2px] font-semibold  items-center`}>
                      <p>
                        {countLiked}
                      </p>
                    </div>
                  </Link>
                </li>)
                }
              </ul>
              <div className="2xl:mr-[10px]">
                { !token ? 
                  (
                    <>
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <div 
                            className="font-semibold flex p-3 bg-slate-100 text-gray-800 text-[16px] sm:text-[24px] rounded-lg hover:text-green-600 shadow-lg transform hover:scale-105 transition-transform duration-200"
                            onClick={()=> logout()}
                            >
                            <i className="fas fa-sign-in-alt logout-icon" title="Agza Bol"></i>
                          </div>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="mt-[10px] p-[2px] bg-white">
                          <DropdownMenuLabel className="text-[15px] py-[10px] font-semibold border-b border-gray-300">
                            Agza bolmak
                          </DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="border-b border-gray-300 ">
                            <Link
                                href={"/auth/login"} 
                                className="font-bold text-gray-800 px-2 text-[16px] pb-[5px] rounded-md hover:text-gray-600 ">
                                Giriş
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem >
                            <Link 
                              href={"/auth/register"}
                              className="font-bold text-gray-800 px-2 rounded-md hover:text-gray-600 text-[16px] py-[5px]">
                              Agza bol
                            </Link>
                          </DropdownMenuItem>
                          
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </>
                  ) : 
                  (<div>
                    <Link 
                      href={"/auth/register"}
                      className="font-semibold flex p-2 2xl:mr-[-14px] bg-slate-200 text-gray-800 text-[16px] sm:text-[22px] rounded-lg hover:text-red-600 shadow-custom-2 transform hover:scale-105 transition-transform duration-200"
                      onClick={()=> logout()}
                      >
                      <i className="fas fa-sign-out-alt logout-icon" title="Çykyş"></i>
                    </Link>
                  </div>)
                  }
              </div>
            </div>
          </div>
        </div>
      </div>
  </>
    
  )
}

export default Nav
