import React , {useState} from 'react';
import { withStyles, makeStyles, darken } from '@material-ui/core/styles';
import {
    Table,
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    Button, 
    Container,
    Box
} from '@material-ui/core'; 

import ModalContext from '../../../context/modalContext/ModalContext'
 
export default function CustomizedTables(props) {
    let mainColor = props.data.color
    const buttonText = props.data.buttonText
    const heading = props.data.heading
    const rows = props.data.rows
    const tableRow = props.data.tableRow
    const visibleRows = props.data.visibleRows
    const visibleBottonText = props.data.visibleBottonText
    const visibleBottonTextClick = props.data.visibleBottonTextClick
     
    const isBotton = rows.length - visibleRows > 0 ? true : false  
    const [isBottonClick, setIsBottonClick] = useState(false)
      
    const StyledTableRow = withStyles((theme) => ({
        root: {
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`
        },
    }))(TableRow);
        
    const useStyles = makeStyles(theme => {
        if(mainColor === 'primary')  mainColor = theme.palette.primary.main
        if(mainColor === 'secondary') mainColor = theme.palette.secondary.main  
        return ({
            table: {
                minWidth: 200,
            },
            
            tableCell: {
                paddingTop: theme.spacing(2), 
                paddingBottom: theme.spacing(2),  
                [theme.breakpoints.down('md')]: { 
                    paddingTop: theme.spacing(1), 
                    paddingBottom: theme.spacing(1), 
                },
            },
            tableButtonCell: { 
                maxWidth: 300,
                width: 300,
                [theme.breakpoints.down('md')]: {
                    width: 'auto', 
                },
            },
            tableButton: { 
                padding: theme.spacing(1, 3), 
                textTransform: 'inherit', 
                backgroundColor: mainColor, 
                color: theme.palette.getContrastText(mainColor),
                fontSize: 14, 
                lineHeight: 1.2, 
                [theme.breakpoints.down('sm')] : {
                    padding: theme.spacing(1), 
                },
                "&:hover": { 
                    backgroundColor: darken(mainColor, 0.3), 
                }
            },
            tableContainer: {
                marginTop: 50, 
                marginBottom: 50, 
                [theme.breakpoints.down('sm')] : {
                    marginTop: 30, 
                    marginBottom: 30, 

                }
            }, 
            tableHeader: {
                backgroundColor: mainColor,
                color: theme.palette.getContrastText(mainColor), 
            }
        })
    });

    const classes = useStyles();

    const { handleOpen  } = React.useContext(ModalContext)
  
    const handleOpenModal = (target) => {
        handleOpen(target)
    }
    const handleVisible = () => {
        setIsBottonClick(!isBottonClick)
    }

    const renderRows = () => {  
        if(!isBottonClick)
        return (
            rows.map((row, index) => {
                if(index < visibleRows)
                return (
                    OnceRow(row, index)
                )
                return false
            })
        )
        if(isBottonClick)
        return (
            rows.map((row, index) => { 
                return (
                    OnceRow(row, index)
                )
            })
        )
    }
    const OnceRow = (row, index) => (
        <StyledTableRow key={index} hover={true}  >
            <TableCell component="th" scope="row" className={classes.tableCell}>
                {row.name}
            </TableCell>
            <TableCell align="center" className={classes.tableCell}>
                {row.price}
            </TableCell> 
            <TableCell align="right" className={`${classes.tableButtonCell} ${classes.tableCell}`}> 
                <Button 
                    variant='contained'   
                    className={classes.tableButton}
                    onClick={() => { handleOpenModal(row.name) }}
                >
                    { buttonText }
                </Button>
            </TableCell>
        </StyledTableRow>
    )
    const renderBotton = () => {
        return (  
            <Box mt={2} display='flex' justifyContent='center'>
                <Button
                    onClick={handleVisible}
                >
                    { isBottonClick ? visibleBottonTextClick  : visibleBottonText }
                </Button> 
            </Box>
        )
    }
    return (
        <Container maxWidth='lg' className={`${classes.tableContainer} heading`} >
            <h3>{heading}</h3>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            {tableRow.map((item, index) => ( 
                                <TableCell 
                                    key={index} 
                                    align={index === 0 ? 'left' : 'center'}
                                    className={`${classes.tableHeader} ${classes.tableCell}` }
                                >
                                    {item}
                                </TableCell>
                            ))} 
                            <TableCell align="right" className={`${classes.tableHeader} ${classes.tableCell}` } ></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            renderRows()
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            {
                isBotton &&
                renderBotton()
            }
        </Container>
    );
}