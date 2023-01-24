import './single.scss'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import { useContext, useState, useEffect } from 'react'
import { ListContext } from '../../context/listContext/ListContext';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { updateList } from '../../context/listContext/apiCalls';
import { getMovies } from '../../context/movieContext/apiCalls';

const ListSingle = () => {
  const [edit, setEdit] = useState(false);
  const [list, setList] = useState(null);
  const location = useLocation();
  let item = location.state;

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
    const id = item._id;
    e.preventDefault();
    updateList(id, list, dispatch)
  }

  return (
    <div className='single'>
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton" onClick={() => setEdit(true)}>Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <div className="details">
                <h1 className="itemTitle">{item.title}</h1>
                <div className="detailItem">
                  <span className="itemKey">Id:</span>
                  <span className="itemValue">{item._id}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Type:</span>
                  <span className="itemValue">{item.isSeries === true ? 'Series' : 'Movies'}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Genre:</span>
                  <span className="itemValue">{item.genre}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Content:</span>
                  {item.content.map((movie) => (
                    <span key={movie} style={{ margin: '2px 5px' }}><span>{movie}</span><br /></span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {edit &&
          (
            <div className="bottom">
              <h1 className="title">Edit datas</h1>
              <form className="upWrapper">
                <div className="formLeft">
                  <div className="updateItem">
                    <label>Title:</label>
                    <input type="text" className="upInput" name='title' placeholder={item.title} onChange={handleChange} />
                  </div>
                  <div className="updateItem">
                    <label>Genre:</label>
                    <select name="genre" id="genre" onChange={handleChange}>
                      <option>{item.genre}</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Comedy">Comedy</option>
                      <option value="Crime">Crime</option>
                      <option value="Action">Action</option>
                      <option value="Horror">Horror</option>
                    </select>
                  </div>
                  <div className="updateItem">
                    <label>Type:</label>
                    <select name='type' onChange={handleChange} placeholder={item.type}>
                      <option>{item.type}</option>
                      <option value="movies">Movies</option>
                      <option value="series">Series</option>
                    </select>
                  </div>
                </div>
                <div className="formRight">
                  <div className="updateItem">
                    <label>Content:</label>
                    <select multiple name='content' onChange={handleSelect} style={{ height: '150px' }}>
                      {movies.map((movie) => (
                        <option key={movie._id} value={movie._id}>{movie.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button onClick={handleSubmit}>Update list</button>
              </form>
            </div>
          )}
      </div>
    </div>
  )
}

export default ListSingle