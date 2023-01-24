import './dataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { deleteMovie } from '../../context/movieContext/apiCalls';
import { useContext } from 'react';
import { MovieContext } from '../../context/movieContext/MovieContext';
import { PopUpContext } from '../../context/popUpContext/PopUpContext';

const moviesColumns = [
  { field: '_id', headerName: 'ID', width: 150 },
  {
    field: 'title', headerName: 'Movie', width: 230, renderCell: (params) => {
      return (
        <div className='cellWithImg'>
          <img src={params.row.img} className='cellImg' alt='avatar' />
          {params.row.title}
        </div>)
    }
  },
  { field: 'genre', headerName: 'Genre', width: 100 },
  { field: 'isSeries', headerName: 'Is Series', width: 100 },
  { field: 'limit', headerName: 'Age  limit', width: 100 },
  {
    field: 'year',
    headerName: 'Year',
    width: 150,
  }
];

const DataTable = ( {datas} ) => {

  const { dispatch } = useContext(MovieContext);
  const { dispatch:popUpDispatch } = useContext(PopUpContext);


  const handleDelete = (id) => {
    deleteMovie(id, dispatch)
  }

  const actionColumn = [{
    field: 'action', headerName: 'Action', width: 200, renderCell: (params) => {
      const data = params.row;
      return (
        <div className='cellAction'>
          <Link to={`/movies/${params.row._id}`} state={data} style={{ textDecoration: 'none' }}>
            <div className="viewButton">View</div>
          </Link>
          {params.row.deleteAccess === 'yes' ? <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div> : <div className="deleteButton" onClick={()=>popUpDispatch({type:'MOVIE_SHOW'})}>Delete</div>}
        </div>
      )
    }
  }]
  return (
    <div className='datatable'>
      <h3 className='dataTableTitle' style={{ textAlign: 'center' }}>All movies</h3>
      <div className='dataTableTitle'>
        Add new Movies
        <Link to={`/movies/new`} className='link'>
          Add new
        </Link>
      </div>
      <DataGrid className='datagrid'
        rows={datas}
        columns={moviesColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  )
}

export default DataTable