import './table.scss';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const Tables = () => {
    const rows = [
        {
            id: 1141414,
            product: 'Acer',
            img: 'img',
            customer: 'Saravanan',
            date: '1 March',
            amount: 25,
            method: 'cash',
            status: 'Pending'
        },
        {
            id: 1141416,
            product: 'Acer',
            img: 'img',
            customer: 'Saravanan',
            date: '1 March',
            amount: 22,
            method: 'cash',
            status: 'Approved'
        },
        {
            id: 1141417,
            product: 'Acer',
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6u7y0pD09ez7fMayR-GkikWX9XxyvdyKIsebUC5z6gz3U_ISNqhvalR-1OtY0aklfl6U&usqp=CAU',
            customer: 'Saravanan',
            date: '1 March',
            amount: 25,
            method: 'cash',
            status: 'Approved'
        },
    ];
    return (
        <TableContainer component={Paper} className='table'>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className='tableCell'>Tracking Id</TableCell>
                        <TableCell className='tableCell'>Product</TableCell>
                        <TableCell className='tableCell'>Customer</TableCell>
                        <TableCell className='tableCell'>Date</TableCell>
                        <TableCell className='tableCell'>Amount</TableCell>
                        <TableCell className='tableCell'>Payment Method</TableCell>
                        <TableCell className='tableCell'>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                        >
                            <TableCell className='tableCell'>{row.id}</TableCell>
                            <TableCell className='tableCell'>
                                <div className='cellWrapper'>
                                    <img src={row.img} alt="" className="image" />
                                    {row.product}
                                </div>
                            </TableCell>
                            <TableCell className='tableCell'>{row.customer}</TableCell>
                            <TableCell className='tableCell'>{row.date}</TableCell>
                            <TableCell className='tableCell'>{row.amount}</TableCell>
                            <TableCell className='tableCell'>{row.method}</TableCell>
                            <TableCell className='tableCell'><span className={`status ${row.status}`}>{row.status}</span></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Tables