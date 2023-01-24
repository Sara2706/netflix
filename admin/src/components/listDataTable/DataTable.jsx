import './dataTable.scss';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { ListContext } from '../../context/listContext/ListContext';
import { deleteList } from '../../context/listContext/apiCalls';

const ListColumns = [
  { field: '_id', headerName: 'ID', width: 270 },
  { field: 'title', headerName: 'Title', width: 230 },
  { field: 'type', headerName: 'Type', width: 150 },
  { field: 'genre', headerName: 'Genre', width: 150 },
];


const DataTable = ({ datas }) => {
  const { dispatch } = useContext(ListContext);

  const handleDelete = (id) => {
    deleteList(id,dispatch)
  }

  const actionColumn = [{
    field: 'action', headerName: 'Action', width: 200, renderCell: (params) => {
      const data = params.row;
      return (
        <div className='cellAction'>
          <Link to={`/lists/${params.row._id}`} state={data} style={{ textDecoration: 'none' }}>
            <div className="viewButton">View</div>
          </Link>
          <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>Delete</div>
        </div>
      )
    }
  }]
  return (
    <div className='datatable'>
      <h3 className='dataTableTitle' style={{ textAlign: 'center' }}>All lists</h3>
      <div className='dataTableTitle'>
        Add new lists
        <Link to={`/lists/new`} className='link'>
          Add new
        </Link>
      </div>

      <DataGrid className='datagrid'
        rows={datas}
        columns={ListColumns.concat(actionColumn)}
        pageSize={8}
        rowsPerPageOptions={[8]}
        checkboxSelection
        getRowId={(r) => r._id}
      />
    </div>
  )
}

export default DataTable