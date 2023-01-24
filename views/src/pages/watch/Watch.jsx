import './watch.scss';
import { ArrowBack } from '@material-ui/icons'
import { useLocation, Link } from 'react-router-dom';
const Watch = () => {
  const location = useLocation();
  const movie = location.state;
  console.log(movie)
  return (
    <div className="watch">
      <Link to='/'>
        <div className="back">
          <ArrowBack />
          Home
        </div>
      </Link>
      <video controls autoPlay className='video'>
        <source src={movie.video} />
      </video>

    </div>
  )
}

export default Watch