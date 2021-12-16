import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const AccessTable = (props) => {
    const classes = useStyles();

    function createData(url, date, navigator, deviceType) {
        return { url, date, navigator, deviceType };
    }

    const rows = [];
    props.access.forEach(element => {
        rows.push(createData(element.url, element.date, element.navigator, element.deviceType));
    });

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} size="small" aria-label="a dense table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>URL</b></TableCell>
                        <TableCell align="right"><b>Data</b></TableCell>
                        <TableCell align="right"><b>Navegador</b></TableCell>
                        <TableCell align="right"><b>Tipo de dispositivo</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name}>
                            <TableCell component="th" scope="row">
                                {row.url}
                            </TableCell>
                            <TableCell align="right">{row.date}</TableCell>
                            <TableCell align="right">{row.navigator}</TableCell>
                            <TableCell align="right">{row.deviceType}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default AccessTable;
