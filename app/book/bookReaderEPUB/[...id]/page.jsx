"use client"

import Book from "../../../main_components/epub"
// const isMobileDevice = () => {
//   if (typeof navigator !== 'undefined') {
//     return /Mobi|Android/i.test(navigator.userAgent);
//   }
//   return false;
// };

// const base_URL = isMobileDevice()
//   ? 'http://kitap.edu:4000'  
//   : 'http://10.10.73.31:4000'; 

// const base_URL= 'http://kitap.edu:4000';
const base_URL= 'http://kitap.edu:4000';
const Page = ({params}) => {
  
  return (
    <div className="h-[87vh] mt-[50px]" >
      {/* <Book 
          url={"/alice.epub"}
      /> */}
      <Book 
         url={`${base_URL}/${params["id"].join("/")}`}
      />
    </div>
   
  )
}

export default Page