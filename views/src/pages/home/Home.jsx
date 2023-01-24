
import './home.scss'
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import { useEffect, useState } from 'react';
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState('');

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await axios.get(
          `lists/${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
          headers: {
            token:
              "Baerer " + JSON.parse(localStorage.getItem('user')).accessToken
          }
        }
        );
        setLists(res.data);
      } catch (error) {
        console.log(error)
      }
    }
    getRandomLists();
  }, [type, genre])
  return (
    <div className='home'>
      <Navbar />
      <Featured type={type} setGenre={setGenre} genre={genre} />
      {lists.map((list) => (
        <List list={list} key={list._id} />
      ))}

    </div>
  )
}

export default Home