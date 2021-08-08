import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    console.log("2");
    axios
      .get("http://localhost:5003/api/movies")
      .then((res) => {
        const data=[]
        for(const k in res.data){
            data.push({
              id:k,
              ...res.data[k]
            })
        }
        setMovies(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const remove = async (id) => {
    await axios.delete(`http://localhost:5003/api/movies/${id}`).then((res) => {
      if (res.status === 200) {
        const result = movies.filter((e) => {
          return e._id !== id;
        });
        setMovies(result);
      } else {
        alert("failure");
      }
    }).catch((err)=>{
        console.log(err)
    })
  };
const update=async(id)=>{
    const result=prompt("enter movie name")
    const data={
        name:result
    }
await axios.put(`http://localhost:5003/api/movies/${id}`,data).then((res)=>{
    if(res.status===200){
        alert("updated movie")
    }else{
        alert("failure")
    }
}).catch((err)=>{
    console.log("failed to update",err)
})
}
  const addMovie = async (e) => {
    e.preventDefault();
    console.log(movie, genre, year);
    const data = {
      name: movie,
      genre: genre,
      year: year,
    };

    await axios
      .post("http://localhost:5003/api/movies", data)
      .then((res) => {
        if (res.status === 200) {
           setMovies(movies);
        } else {
          alert("failure");
        }
      });
  };
  return (
    <div className="container">
      <table class="table table-dark">
        <thead>
          <tr id="tables">
            <th scope="col">Sno</th>
            <th scope="col">Movie</th>
            <th scope="col">Genre</th>
            <th scope="col">Year</th>
            <th scope="col">Remove</th>
            <th scope="col">Modify</th>

          </tr>
        </thead>
        <tbody>
          {movies.map((ele, i) => {
            return (
              <>
                <tr key={ele._id}>
                  <th scope="row" key={i}>
                    {i + 1}
                  </th>
                  <td key={ele.name}>{ele.name}</td>
                  <td key={ele.genre}>{ele.genre}</td>
                  <td key={ele.year}>{ele.year}</td>
                  <td>
                    <button id="actions"
                      onClick={() => {
                        remove(ele._id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                  <td>
                    <button id="actions2"
                      onClick={() => {
                        update(ele._id);
                      }}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>

      <div className="add-movie">
        <h3>Add Movies</h3>
        <form onSubmit={addMovie}>
          <label>Movie:</label>
          <br />
          <input
            type="text"
            value={movie}
            onChange={(e) => {
              setMovie(e.target.value);
            }}
          />
          <br />
          <label>Genre :</label>
          <br />
          <input
            type="text"
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
            }}
          />
          <br />
          <label>Year :</label>
          <br />
          <input
            type="text"
            value={year}
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
          <br />
          <input type="submit" value="Add Movie" id="add"/>
        </form>
      </div>
    </div>
  );
}
