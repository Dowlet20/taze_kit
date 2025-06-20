"use client"
import React, { useState, useRef, useEffect } from "react";
import { ReactReader } from 'react-reader'

export const Book = ({url}) => {
  const [page, setPage] = useState('');
  const tocRef = useRef(null);
  const fileName = url.split("/").pop();
  const [size, setSize] = useState(100);
  const [location, setLocation] = useState(0)
  const [book, setBook] = useState(null);
  const [firstRenderDone, setFirstRenderDone] = useState(false);
  const renditionRef = useRef(null);
  const [selections, setSelections] = useState([]);


  if (!book) {
    setBook(url);
  }

  const changeSize = newSize => {
    setSize(newSize);
  }

  useEffect(() => {
    if (renditionRef.current) {
      function setRenderSelection(cfiRange, contents) {
        setSelections(
          selections.concat({
            text: renditionRef.current.getRange(cfiRange).toString(),
            cfiRange
          })
        )

        localStorage.setItem("highlights"+fileName, JSON.stringify(selections.concat({
          text: renditionRef.current.getRange(cfiRange).toString(),
          cfiRange
        })))

        renditionRef.current.annotations.add(
          'highlight',
          cfiRange,
          {},
          null,
          'h1',
          {fill: 'red', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply'}
        )
        contents.window.getSelection().removeAllRanges()
      }
      renditionRef.current.on('selected', setRenderSelection)
      return () => {
        renditionRef.current.off('selected', setRenderSelection)
      }
    }
  }, [setSelections, selections])

  useEffect(() => {
    if (renditionRef.current) {
        renditionRef.current.themes.fontSize(`${size}%`);
    }
  }, [size])

  const handleError = (error) => {
    console.error("Error opening book:", error);
  };
  const locationChanged = epubcifi => {
    if (renditionRef.current && tocRef.current) {
      const {displayed, href } = renditionRef.current.location.start;
      const chapter = tocRef.current.find(item => item.href === href);
      setPage(
        `Bölümiň sahypasy: ${displayed.page} of ${displayed.total}`
      )
    }
    if (!firstRenderDone) {
      const gettingItem = localStorage.getItem(fileName);
      if (!gettingItem) {
        setLocation("epubcfi(/6/2!/4/1:0)");
        setFirstRenderDone(true);
        return
      }
      setLocation(gettingItem);
      setFirstRenderDone(true);
      return
    }

    localStorage.setItem(fileName, epubcifi)

    setLocation(epubcifi);
    return
  }

  const handleRemove = () => {
    if (JSON.parse(localStorage.getItem("highlights"+fileName))) {
      localStorage.removeItem("highlights"+fileName);
      window.location.reload();
    }
  }

  return (
    <div className="w-[98vw] lg:w-[99vw] self-center">
      {book ? 
      (
        <>
        <div className="flex justify-center">
          <button onClick={handleRemove} className="absolute left-2 bottom-2 z-50  mb-[10px] border-[1px] w-[110px] flex items-center rounded-md bg-white justify-center text-slate-600 text-[14px]  sm:text-[16px]  font-semibold self-start">
            Bellikleri aýyr
          </button>
          <div className="absolute  sm:text-[18px]  top-[75px] z-50 text-center mb-[10px] border-[1px] w-[120px] sm:w-[140px] flex items-center rounded-md bg-white justify-center">
            <button className="w-1/4" onClick={()=>changeSize(Math.max(80, size-10))}><i className="fas text-gray-600 fa-minus  icon"></i></button>
              <span className="px-2 w-1/2 border-l-[1px] border-r-[1px] font-bold text-gray-600">{size}%</span>
            <button className="w-1/4" onClick={()=>changeSize(Math.min(330, size+10))}> <i className="fas text-gray-600 fa-plus icon"></i></button>
          </div>
        </div>
        <div className="h-[90vh]">
          <ReactReader
            url={url}
            // swipeable={true}
            epubInitOptions={{
              openAs: 'epub'
            }}
            location={location}
            getRendition={rendition => {
              renditionRef.current = rendition
              renditionRef.current.themes.default({
                '::selection': {
                  background: 'orange'
                }
              })

              const highlights = JSON.parse(localStorage.getItem("highlights"+fileName)) ?? [];
              highlights.forEach(highlight => {
                renditionRef.current.annotations.add(
                  'highlight',
                  highlight.cfiRange,
                  {},
                  null,
                  'h1',
                  {fill: 'red', 'fill-opacity': '0.5', 'mix-blend-mode': 'multiply'}
                )
              });
              setSelections(highlights);
            }}
            onError={handleError} 
            locationChanged={locationChanged}
            tocChanged={toc => (tocRef.current = toc)}
            epubOptions={{
              manager: "continuous",
              flow: "scrolled",
              allowScriptedContent: true,
          }}
          />
        </div>
        <div className="absolute sm:bottom-2 top-[75px] right-[20px] sm:right-[20px] md:right-[50px] text-center z-10">
          <div className="flex items-center md:text-[16px] text-[14px] font-semibold">
            <p>{page}</p>
          </div>
        </div>
        </>
      ) : (
        <div className="flex items-center justify-center w-full h-[100vh]">
        <button 
          onClick={() => setBook(url)}
          className=" font-bold bg-gray-800 text-white p-3 rounded-md"
        >
          Kitaby Oka
        </button>
        </div>
      )}
    </div>
  )
}
export default Book