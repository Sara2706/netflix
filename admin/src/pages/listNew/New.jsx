import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useContext, useEffect, useState } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { ListContext } from '../../context/listContext/ListContext';
import { getMovies } from '../../context/movieContext/apiCalls';
import { createList } from '../../context/listContext/apiCalls';



const ListNew = () => {

  const [list, setList] = useState(null);


  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatchMovie)
  }, [dispatchMovie])

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value })
  }

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value })
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createList(list, dispatch)
  }


  return (
    <div className='new'>
      <Sidebar />
      <div className='newList'>
        <Navbar />
        <div className="top">
          <h1>Add new list</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formLeft">
                <div className="formInput">
                  <label>Title:</label>
                  <input type='text' placeholder='List name' name='title' onChange={handleChange} />
                </div>
                <div className="formInput">
                  <label>Genre:</label>
                  <select name="genre" id="genre" onChange={handleChange}>
                    <option>Genre</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Crime">Crime</option>
                    <option value="Action">Action</option>
                    <option value="Horror">Horror</option>
                  </select>
                </div>
                <div className="formInput">
                  <label>Type:</label>
                  <select name='type' onChange={handleChange}>
                    <option>Type</option>
                    <option value="movies">Movie</option>
                    <option value="series">Series</option>
                  </select>
                </div>
              </div>
              <div className="formRight">
                <div className="formInput">
                  <label>Content:</label>
                  <select multiple name='content' onChange={handleSelect} style={{ height: '200px' }}>
                    {movies.map((movie) => (
                      <option key={movie._id} value={movie._id}>{movie.title}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
              <button onClick={handleSubmit}>Upload List</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListNew