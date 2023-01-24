import './list.scss';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/dataTable/DataTable'
import { useContext, useEffect } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { getMovies } from '../../context/movieContext/apiCalls';
import { PopUpContext } from '../../context/popUpContext/PopUpContext';

const MovieList = () => {

  const { movies, dispatch } = useContext(MovieContext);
  const { show, content,dispatch:popUpDispatch } = useContext(PopUpContext);
  console.log(content)

  useEffect(() => {
    getMovies(dispatch)
  }, [dispatch])


  return (
    <>
      <div className='list'>
        <Sidebar />
        <div className='listContainer'>
          <Navbar />
          <DataTable title='movies' datas={movies} />
        </div>
      </div>
      {show &&
        <div className="popUp">
          <div className="popUpBackk"></div>
          <div className="popUpContent">
            <h1>{content}</h1>
            <button onClick={()=>popUpDispatch({type:'DONT_SHOW'})}>Ok</button>
          </div>
        </div>
      }
    </>
  )
}

export default MovieList