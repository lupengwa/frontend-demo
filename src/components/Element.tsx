'use client'
import {useEffect, useState} from "react";

interface MovieRequest  {
    name: string
}

interface Movie  {
    id: number,
    original_title: string,

    release_date: string
}

interface Resp {
    page: number,
    results: Movie[]
}
export const Element = () => {

    const [text, setText] = useState('');
    const [movies, setMovies] = useState<Resp>(null);
    const handleClick = async () => {
        try {
            const movieRequest:MovieRequest = {name:text};
          const res = await fetch('http://localhost:3060/api/movie',{
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify(movieRequest)
          });
          const data = await res.json();

          if(!res.ok) {
              console.log("result not ok")
              return;
          }
            const updatedMovies = data as Resp
          console.log(data)
            setMovies(updatedMovies);

        } catch(error) {
            console.log(error)
        }

    }

    return (
        <div className="flex flex-col">
            <div className="flex">
                <input className="input" onChange={(e)=>{setText(e.target.value)}}></input>
                <button className="btn" onClick={()=>{handleClick()}}>search</button>
            </div>
            {movies?.results.map((item, index) => {
                return (
                    <div key={item.id} className="flex">
                        <span>{item.id}</span>
                        <span>{item.original_title}</span>
                        <span>{item.release_date}</span>
                    </div>
                )
            })}
        </div>
    );
}
