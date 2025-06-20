
//import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "./main_components/Nav.jsx"
import { AppWrapper } from "../context";
import LeftSideBar from "./main_components/LeftSideBar.jsx";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";


//const inter = Inter({ subsets: ["latin"] });



export const metadata = {
  title: "Kitaphana",
  description: "Kitaplar ýygyndysy",
};

export default function RootLayout({ children }) {
  
  return (
    <html lang="en">
      <body>
        <Suspense fallback={<Loading />}>
          <AppWrapper>
            <div className='mt-2'>
              <Nav />
              <div className="pb-2 flex gap-2 p-2">
              <Suspense fallback={<Loading />}>
                  <LeftSideBar />
                </Suspense>
                <Suspense fallback={<Loading />}>
                  {children} 
                </Suspense>
              </div>
            </div>
          </AppWrapper>
        </Suspense>
      </body>
    </html>
  );
}
