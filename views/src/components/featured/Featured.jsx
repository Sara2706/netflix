import { InfoOutlined, PlayArrow } from '@material-ui/icons'
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import './featured.scss'

const Featured = ({ type, setGenre, genre }) => {

    const [content, setContent] = useState({});
    let ranType = type;
    if (!ranType) ranType = null;
    useEffect(() => {
        const getRandomContent = async () => {
            try {
                const res = await axios.get(`/movies/random?${ranType ? 'type=' + ranType : ''}${genre ? '&genre=' + genre : ''}`, {
                    headers: {
                        token:
                            "Baerer " + JSON.parse(localStorage.getItem('user')).accessToken
                    }
                }
                );
                setContent(res.data[0])
            } catch (error) {
                console.log(error)
            }
        }
        getRandomContent();
    }, [type, genre]);

    return (
        <div className='featured'>
            {type && (
                <div className="category">
                    <span>{type === 'movies' ? 'Movies' : 'Series'}</span>
                    <select name="genre" id="genre" onChange={(e) => setGenre(e.target.value)}>
                        <option>Genre</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Comedy">Comedy</option>
                        <option value="Crime">Crime</option>
                        <option value="Action">Action</option>
                        <option value="Horror">Horror</option>
                    </select>
                </div>
            )}
            <img src={content.img} alt="Movie" />
            <div className="info">
                <img src={content.imgTitle} alt="Movie" />
                <span className='desc'>
                    {content.desc}
                </span>
                <div className="buttons">
                    <button className='play'>
                        <PlayArrow />
                        <span>Play</span>
                    </button>
                    <button className='more'>
                        <InfoOutlined />
                        <span>Info</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Featured