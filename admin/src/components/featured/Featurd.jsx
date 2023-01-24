import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { CircularProgressbar } from 'react-circular-progressbar';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import 'react-circular-progressbar/dist/styles.css'

const Featurd = ({size, datas}) => {
  return (
    <div className='featured'>
      <div className="top">
        <h1 className="title">Total  Users</h1>
        <MoreVertIcon fontSize='small'/>
      </div>
      <div className="bottom">
        <div className="featredChart">
            <CircularProgressbar value={70} text={'70%'} strokeWidth={5}/>
        </div>
        <p className="title">Total Users</p>
        <p className="amount">{size}</p>
        <p className="desc">Total Users for last three months</p>
        <div className="summary">
          <div className="item">
            <div className="itemTitle">Target</div>
            <div className="itemResult positive">
              <KeyboardArrowUpIcon fontSize='small'/>
              <div className="resultAmount">1k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last month</div>
            <div className={datas[1].Total < datas[2].Total ? "itemResult negative" : "itemResult positive"}>
              <KeyboardArrowDownIcon fontSize='small'/>
              <div className="resultAmount">{datas[1].Total}</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">This Month</div>
            <div className={datas[1].Total < datas[2].Total ? "itemResult positive" : "itemResult negative"}>
              <KeyboardArrowUpIcon fontSize='small'/>
              <div className="resultAmount">{datas[2].Total}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Featurd