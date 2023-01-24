import './single.scss'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import Navbar from '../../components/navbar/Navbar'
import { useContext, useState } from 'react'
import { MovieContext } from '../../context/movieContext/MovieContext';
import storage from '../../firebase';
import { updateMovie } from '../../context/movieContext/apiCalls';


const MovieSingle = () => {
  const [edit, setEdit] = useState(false)
  const location = useLocation();
  let item = location.state;
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);
  const [movieUpload, setMovieUpload] = useState(null);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value })
  }


  const uploadMovie = (items) => {
    items.forEach(item => {
      const fileName = new Date().getTime() + item.label + item.file.name;
      const uploadTask = storage.ref(`/items/${fileName}`).put(item.file);
      uploadTask.on("state_changed", snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setMovieUpload('Upload is ' + progress + '% done')
      }, (err) => { console.log(err) },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            setMovie((prev) => {
              return { ...prev, [item.label]: url }
            })
            setUploaded((prev) => prev + 1);
          })
        })
    })
  }

  const handleUpload = (e) => {
    e.preventDefault();

    if (img) {
      uploadMovie([
        { file: img, label: 'img' },
      ])
    }
    if (video) {
      uploadMovie([
        { file: video, label: 'video' },
      ])
    }
    if (trailer) {
      uploadMovie([
        { file: trailer, label: 'trailer' },
      ])
    }
    if (imgSm) {
      uploadMovie([
        { file: imgSm, label: 'imgSm' },
      ])
    }
    if (imgTitle) {
      uploadMovie([
        { file: imgTitle, label: 'imgTitle' },
      ])
    }
  }

  const handleSubmit = (e) => {
    const id = item._id;
    e.preventDefault();
    updateMovie(id, movie, dispatch)
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
              <img src={item.img} alt="" className="itemImg" />
              <div className="details">
                <h1 className="itemTitle">{item.title}</h1>
                <p className="itemTitle">{item.desc}</p>
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
                  <span className="itemKey">Year:</span>
                  <span className="itemValue">{item.year}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Limit:</span>
                  <span className="itemValue">{item.limit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {edit &&
          (
            <div className="bottom">
              <h1 className="title">Edit datas</h1>
              <h4 style={{ textAlign: 'center', color: 'green' }}>{movieUpload}</h4>
              <form className="upWrapper">
                <div className="updateItem">
                  <label>Title:</label>
                  <input type="text" className="upInput" name='title' placeholder={item.title} onChange={handleChange} />
                </div>
                <div className="updateItem">
                  <label>Year:</label>
                  <input type="text" className="upInput" name='year' placeholder={item.year} onChange={handleChange} />
                </div>
                <div className="updateItem">
                  <label>Limit:</label>
                  <input type="text" className="upInput" name='limit' placeholder={item.limit} onChange={handleChange} />
                </div>
                <div className="updateItem">
                  <label>Type:</label>
                  <select name='isSeries' onChange={handleChange}>
                    <option>{item.isSeries ? 'Series' : 'Movie'}</option>
                    <option value="false">Movie</option>
                    <option value="true">Series</option>
                  </select>
                </div>
                <div className="updateItem">
                  <label>Genre:</label>
                  <select name="genre" id="genre" placeholder={item.genre} onChange={handleChange}>
                    <option>{item.genre}</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Comedy">Comedy</option>
                    <option value="Crime">Crime</option>
                    <option value="Action">Action</option>
                    <option value="Horror">Horror</option>
                  </select>
                </div>
                <div className="updateItem">
                  <label>Duration:</label>
                  <input type="text" className="upInput" name='duration' placeholder={item.duration} onChange={handleChange} />
                </div>
                <div className="updateItem">
                  <label htmlFor='bigImg'>Image:<DriveFolderUploadIcon className='icon' /></label>
                  <input type="file" id='bigImg' onChange={e => setImg(e.target.files[0])} name='img' />
                </div>
                <div className="updateItem">
                  <label htmlFor='video'>Video:<DriveFolderUploadIcon className='icon' /></label>
                  <input type="file" id='video' name='video' onChange={e => setVideo(e.target.files[0])} />
                </div>
                <div className="updateItem">
                  <label htmlFor='trailer'>Trailer:<DriveFolderUploadIcon className='icon' /></label>
                  <input type="file" id='trailer' name='trailer' onChange={e => setTrailer(e.target.files[0])} />
                </div>
                <div className="updateItem">
                  <label htmlFor='imgSm'>Thumbnail img:<DriveFolderUploadIcon className='icon' /></label>
                  <input type="file" id='imgSm' name='imgSm' onChange={e => setImgSm(e.target.files[0])} />
                </div>
                <div className="updateItem">
                  <label htmlFor='titleIng'>Title img:<DriveFolderUploadIcon className='icon' /></label>
                  <input type="file" id='titleIng' name='imgTitle' onChange={e => setImgTitle(e.target.files[0])} />
                </div>
                <div className="updateItem">
                  <label>Access for delete</label>
                  <select name='deleteAccess' onChange={handleChange}>
                    <option value="no">Not allowed</option>
                    <option value="yes">Allow</option>
                  </select>
                </div>

                <div className="updateItemDesc">
                  <label>Description:</label>
                  <input type="text" className="upInput" name='desc' placeholder={item.desc} onChange={handleChange} />
                </div>
                <button onClick={handleSubmit}>Upload Movies</button>
                <button onClick={handleUpload}>Upload files to firbase</button>
              </form>
            </div>
          )}
      </div>
    </div>
  )
}

export default MovieSingle