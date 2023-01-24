import './listitem.scss';
import { PlayArrow, Add, ThumbUp, ThumbDownAlt } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

const ListItem = ({ index, item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [movies, setMovie] = useState({});
  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get('/movies/find/' + item, {
          headers: {
            'Content-Type': 'application/json',
            token:
              "Baerer " + JSON.parse(localStorage.getItem('user')).accessToken
          }
        })
        setMovie(res.data)
      } catch (err) {
        console.log(err)
      }
    }
    getMovie();
  }, [item])

  return (
    <Link to="/watch" state={movies}>
      <div className='listitem'
        style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        <img src={movies.imgSm} alt="movie img" />

        {isHovered && (

          <>
            <video autoPlay loop>
              <source src={movies.trailer} />
            </video>
            <div className="iteminfo">
              <div className="icons">
                <PlayArrow className='icon' />
                <Add className='icon' />
                <ThumbUp className='icon' />
                <ThumbDownAlt className='icon' />
              </div>
              <div className="iteminfotop">
                <span>{movies.duration}</span>
                <span className='limit'>+{movies.limit}</span>
                <span>{movies.year}</span>
              </div>
              <div className="desc">
                {movies.desc}
              </div>
              <div className="genre">{movies.genre}</div>
            </div>
          </>
        )}
      </div>
    </Link>
  )
}

export default ListItem