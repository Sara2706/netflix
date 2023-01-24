import './dataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { deleteUser } from '../../context/userContext/apiCalls';
import { UserContext } from '../../context/userContext/UserContext';
import { PopUpContext } from '../../context/popUpContext/PopUpContext';

const userColumns = [
  { field: '_id', headerName: 'ID', width: 200 },
  { field: 'username', headerName: 'Username', width: 150 },
  {field: 'email', headerName: 'Email', width: 230},
  { field: 'isAdmin', headerName: 'Is admin', width: 100 },
  { field: 'createdAt', headerName: 'Joined At', width: 170 },
];


const DataTable = ( {datas} ) => {

  const { dispatch } = useContext(UserContext);
  const { dispatch:popUpDispatch } = useContext(PopUpContext);

  const handleDelete = (id) => {
    deleteUser(id, dispatch)
  }

  const actionColumn = [{
    field: 'action', headerName: 'Action', width: 200, renderCell: (params) => {
      const data = params.row;
      return (
        <div className='cellAction'>
          <Link to={`/users/${params.row._id}`} state={data} style={{ textDecoration: 'none' }}>
            <div className="viewButton">View</div>
          </Link>
          {data.isAdmin ? <div className="deleteButton" onClick={() => popUpDispatch({type:'USER_SHOW'})}>Delete</div> : <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div> }
        </div>
      )
    }
  }]
  return (
    <div className='datatable'>
      <h3 className='dataTableTitle' style={{ textAlign: 'center' }}>All users</h3>
      <div className='dataTableTitle'>
        Add new users
        <Link to={`/users/new`} className='link'>
          Add new
        </Link>
      </div>
      <DataGrid className='datagrid'
        rows={datas}
        columns={userColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  )
}

export default DataTable