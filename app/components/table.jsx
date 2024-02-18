import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import { fetchUsers } from './api'; 

export default function BasicTable() {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const users = await fetchUsers(); // Llama a la función fetchUsers para obtener los datos
            setRows(users);
        };

        fetchData();
    }, []);

    return (
        <div style={{ margin: '50px auto', maxWidth: '60%' }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Avatar</strong></TableCell>
                            <TableCell><strong>Nombre</strong></TableCell>
                            <TableCell align="left"><strong>Apellido</strong></TableCell>
                            <TableCell align="left"><strong>Email</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row, index) => (
                            <TableRow key={index}>
                                <TableCell component="th" scope="row">
                                    <Avatar alt="Avatar" src={row.avatar} style={{ width: 50, height: 50, borderRadius: '50%' }} />
                                </TableCell>
                                <TableCell>{row.first_name}</TableCell>
                                <TableCell>{row.last_name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
