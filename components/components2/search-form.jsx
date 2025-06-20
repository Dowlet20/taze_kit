"use client";
import * as z from 'zod';

import Link from "next/link";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../components/ui/select"




import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
// import { z } from "zod";

import { useState, useEffect, useFormStatus } from "react";
import { useAppContext } from "../../context";
import axiosInstance from "../../utils/axiosInstance";


const SearchSchema = z.object({
  author: z.string().min(0, {
      message: "Giriziň!"
  }),
  book: z.string().min(0, {
      message: "Giriziň!"
  }),
  genre: z.string().min(0, {
      message: "Giriziň!"
  }),
  lang: z.string().min(0, {
      message: "Giriziň!"
  }),
})

const SearchForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [books, setBooks] = useState([]);
  const [count, setCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [genres, setGenres] = useState([]);
  
  const {
    setToggleLeft,
  } = useAppContext();



  const form = useForm({
    resolver: zodResolver(SearchSchema),
    defaultValues: {
      author: "",
      book: "",
      genre: "",
      lang: "",
    },
  });

  const {reset} = form;

  const handleClear = () => {
    reset();
  };

  
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      setLoading(true);
      const headers = {
          'Content-Type': 'application/json'
        };
      const response = await axiosInstance.get(
        `/api/books/?${data.author && "author="+data.author}${data.author && data.book && "&"}${data.book && "search="+data.book}${((data.author || data.book) && data.genre) && "&"}${data.genre && "genre="+data.genre}${((data.author || data.book || data.genre) && data.lang) && "&"}${data.lang && "language="+data.lang}`,
          {
              headers: headers
            }
      );
      setBooks(response.data.results);
      setCount(response.data.count);
  } catch (err) {
      setError(err);
      console.log(err)
  } finally {
      setLoading(false);
      setToggle(true)
    }
  };

  setTimeout(() => {
    setIsSubmitting(false);
  }, 2000);

  useEffect(() => {
    async function fetchData() {
    try {
        const headers = {
            'Content-Type': 'application/json'
          };
        const response = await axiosInstance.get(
            `/api/genres/`,
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
 

  const  allBooks = books?.map(book => {
    return (
      <Link 
        key={book["id"]}
          href={`/book/${book["id"]}`} 
          className={`
            mb-[4px]
            flex
            border-b-[1px]
            border-white
            items-center
            rounded-md
            p-3
            text-[14px]
            bg-slate-800
            transition-colors
            duration-300
          `}
          onClick={()=> {setToggleLeft(false)}}
      >
          { (book.title?.length > 20) ? book.title.slice(0, 20) + '...' : book.title }
      </Link>
    )
  })  


  return (
    <div className="pb-[10px]">
    
    {(!toggle) ?  (<Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          {/* <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Awtor</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="username"
                    placeholder="Awtoryň adyny giriziň"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="book"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ady</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="username"
                    placeholder="Kitabyň adyny giriziň"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="genre"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Žanr</FormLabel>
                <Select 
                  onValueChange={(value) => {
                    field.onChange(value); 
                  }} 
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="bg-slate-300">
                      <SelectValue placeholder="Žanr saýlaň" value={field.value} /> 
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-300">
                    {genres?.map(genre => (
                      <SelectItem key={genre.id} value={genre.id.toString()}>
                        {genre.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lang"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dili</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="bg-slate-300">
                      <SelectValue placeholder="Dili saýlaň" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="bg-slate-300">
                    <SelectItem value="turkm">Türkmen</SelectItem>
                    <SelectItem value="eng">Iňlis</SelectItem>
                    <SelectItem value="rus">Rus</SelectItem>
                  </SelectContent>
                </Select> 
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="w-full bg-gray-300" disabled={isSubmitting}>
          {loading ? "Loading..." : "Gözle"}
        </Button>
      </form>
    </Form>) : (
      <>
        <Button  className="w-full bg-gray-300 font-bold mr-2" onClick={() => {
          setToggle(false)
          reset();
        }}>
          Täzeden synanş
        </Button>
        {(allBooks[0]) ? (
        <div className="flex flex-col  text-slate-200  font-bold h-[78vh] shadow-inner p-2  mr-[8px] mt-[10px] overflow-y-scroll" >
          {allBooks}
        </div>) : 
        (
        <div className="font-bold flex flex-col ">
          <div>Täzeden synanş</div>
        </div>
        )}
      </>
      )}
    </div>
    
  );
};

export default SearchForm;
