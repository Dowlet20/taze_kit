"use client"

import { useState } from "react";
import PdfViewer from "../../../main_components/PdfViewer";


// const base_URL= 'http://kitap.edu:4000';
const base_URL= 'http://kitap.edu:4000';

const Page = ({params}) => {
  return (
      <div className="h-[90vh] w-screen">
        <PdfViewer url={`${base_URL}/${params["id"].join("/")}`} />
      </div>
  );
};
export default Page;







