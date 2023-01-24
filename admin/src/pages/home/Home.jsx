import './home.scss'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Widget from '../../components/widgets/Widgets'
import Featured from '../../components/featured/Featurd'
import Chart from '../../components/chart/Chart'
import Table from '../../components/table/Table'
import axios from 'axios';
import { useEffect, useMemo, useState, useContext } from 'react';
import { UserContext } from '../../context/userContext/UserContext';
import { getUsers } from '../../context/userContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { getMovies } from '../../context/movieContext/apiCalls';
import { getLists } from '../../context/listContext/apiCalls';
import { ListContext } from '../../context/listContext/ListContext'

const Home = () => {
  const [userStat, setUserStat] = useState([]);
  const { users, dispatch } = useContext(UserContext);
  const { movies, dispatch:movieDispatch } = useContext(MovieContext);
  const { lists, dispatch:listDispatch } = useContext(ListContext);
    const [showChart, setShowChart] = useState(false)

  const months = useMemo(()=>
  [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ],[])
  
  useEffect(() => {
    const getStat = async() => {
      try {
        const res = await axios.get('users/stats',{headers:{token:'Bearer '+JSON.parse(localStorage.getItem('user')).accessToken}})
        res.data.map(item=>setUserStat(prev=>[...prev,{name:months[item._id-1],'Total':item.total}]))
        setShowChart(true)
      } catch (err) {
        console.log(err)
      }
      getUsers(dispatch)
      getMovies(movieDispatch)
      getLists(listDispatch)
    }
    getStat();
  },[])

  return (
    <div className='home'>
        <Sidebar />
        <div className="homeContainer">
          <Navbar/>
          <div className="widgets">
            <Widget type='users' size={users.length}/>
            <Widget type='movies' size={movies.length}/>
            <Widget type='lists' size={lists.length}/>
          </div>
          {showChart && <div className="charts">
            <Featured size={users.length} datas={userStat}/>
            <Chart aspect={2/1} title='Last 3 months (New users)' datas={userStat}/>
          </div>}
        </div>
    </div>
  )
}

export default Home