import './list.scss';
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import DataTable from '../../components/listDataTable/DataTable'
import { useContext, useEffect } from 'react';
import { getLists } from '../../context/listContext/apiCalls';
import { ListContext } from '../../context/listContext/ListContext'

const List = () => {

  const { lists, dispatch } = useContext(ListContext);

  useEffect(() => {
    getLists(dispatch)
  },[dispatch])


  return (
    <>
      <div className='list'>
        <Sidebar />
        <div className='listContainer'>
          <Navbar />
          <DataTable title='lists' datas={lists}/>
        </div>
      </div>

    </>
  )
}

export default List