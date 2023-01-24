import './new.scss'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useContext, useState } from 'react';
import storage from '../../firebase';
import { createMovie } from '../../context/movieContext/apiCalls';
import { MovieContext } from '../../context/movieContext/MovieContext';


const MovieNew = ({ title }) => {

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
    console.log(movie)
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
    uploadMovie([
      { file: img, label: 'img' },
      { file: video, label: 'video' },
      { file: trailer, label: 'trailer' },
      { file: imgSm, label: 'imgSm' },
      { file: imgTitle, label: 'imgTitle' },
    ])
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    createMovie(movie, dispatch)
  }

  return (
    <div className='new'>
      <Sidebar />
      <div className='newCont'>
        <Navbar />
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <h1 style={{ color: 'green', display: 'block' }}>{movieUpload}</h1>
          <div className="right">
            <img src={img ? URL.createObjectURL(img) : 'https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg'} alt="" />
            <form>
              <div className="formInput">
                <label htmlFor='bigImg'>Image<DriveFolderUploadIcon className='icon' /></label>
                <input type="file" id='bigImg' onChange={e => setImg(e.target.files[0])} style={{ display: 'none' }} name='img' />
              </div>
              <div className="formInput">
                <label htmlFor='video'>Video<DriveFolderUploadIcon className='icon' /></label>
                <input type="file" id='video' style={{ display: 'none' }} name='video' onChange={e => setVideo(e.target.files[0])} />
              </div>
              <div className="formInput">
                <label htmlFor='trailer'>Trailer<DriveFolderUploadIcon className='icon' /></label>
                <input type="file" id='trailer' style={{ display: 'none' }} name='trailer' onChange={e => setTrailer(e.target.files[0])} />
              </div>
              <div className="formInput">
                <label htmlFor='imgSm'>Thumbnail img<DriveFolderUploadIcon className='icon' /></label>
                <input type="file" id='imgSm' style={{ display: 'none' }} name='imgSm' onChange={e => setImgSm(e.target.files[0])} />
              </div>
              <div className="formInput">
                <label htmlFor='titleIng'>Title img<DriveFolderUploadIcon className='icon' /></label>
                <input type="file" id='titleIng' style={{ display: 'none' }} name='imgTitle' onChange={e => setImgTitle(e.target.files[0])} />
              </div>
              <div className="formInput">
                <label>Title</label>
                <input type='text' placeholder='Movie' name='title' onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Year</label>
                <input type='text' placeholder='1900' name='year' onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Genre</label>
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
                <label>Type</label>
                <select name='isSeries' onChange={handleChange}>
                  <option>Type</option>
                  <option value="false">Movie</option>
                  <option value="true">Series</option>
                </select>
              </div>
              <div className="formInput">
                <label>Limit</label>
                <input type='text' placeholder='16+' name='limit' onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Duration</label>
                <input type='text' placeholder='1hr 45min' name='duration' onChange={handleChange} />
              </div>
              <div className="formInput">
                <label>Description</label>
                <input type='text' placeholder='Description' name='desc' onChange={handleChange} />
              </div>
              <div className="formInput access">
                <label>Access for delete</label>
                <select name='deleteAccess' onChange={handleChange}>
                  <option value="no">Not allowed</option>
                  <option value="yes">Allow</option>
                </select>
              </div>
              {uploaded === 5 ? (<button onClick={handleSubmit}>Upload Movies</button>) : (<button onClick={handleUpload}>Upload files</button>)}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieNew