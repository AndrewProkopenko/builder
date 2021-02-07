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
    Box,    
    Typography
} from '@material-ui/core'; 

import ModalContext from '../../../context/modalContext/ModalContext'

import {getColorByPalette} from '../../functions/colorChanger/ColorCalculation'

import '../../../assets/style/headingCenter.scss'
 
export default function CustomizedTables(props) {
    let mainColor = props.data.color
    const tableMinWidth = props.data.tableMinWidth
    const isButton = props.data.isButton
    const buttonText = props.data.buttonText
    const heading = props.data.heading
    const variant = props.data.variantHeading
    const rows = props.data.rows
    const tableRow = props.data.tableRow
    const visibleRows = props.data.visibleRows
    const visibleBottonText = props.data.visibleBottonText
    const visibleBottonTextClick = props.data.visibleBottonTextClick
     
    const isButtonShowMore = rows.length - visibleRows > 0 ? true : false  
    const [isButtonClick, setIsButtonClick] = useState(false)

    const marginTop = props.data.marginTop  
    const marginBottom = props.data.marginBottom  
    const maxWidthContainer = props.data.maxWidthContainer 
      
    const StyledTableRow = withStyles((theme) => ({
        root: {
            transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`
        },
    }))(TableRow);
        
    const useStyles = makeStyles(theme => {
        
        mainColor = getColorByPalette(theme, mainColor)
 
        return ({
            table: { 
                minWidth: tableMinWidth,
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
                marginTop: marginTop, 
                marginBottom: marginBottom, 
                [theme.breakpoints.down('sm')]: { 
                    marginTop: marginTop === 0 ? 0 : (marginTop > 50 ? marginTop*0.6 : 30), 
                    marginBottom: marginBottom === 0 ? 0 : (marginBottom > 50 ? marginBottom*0.6 : 30),
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
        setIsButtonClick(!isButtonClick)
    }

    const renderRows = () => {  
        if(isButtonClick)
            return (
                rows.map((row, index) => { 
                    return (
                        OnceRow(row, index)
                    )
                })
            )
        else
            return (
                rows.map((row, index) => {
                    if(index < visibleRows)
                    return (
                        OnceRow(row, index)
                    )
                    return false
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
            {
                isButton && 
                <TableCell align="right" className={`${classes.tableButtonCell} ${classes.tableCell}`}> 
                    <Button 
                        variant='contained'   
                        className={classes.tableButton}
                        onClick={() => { handleOpenModal(row.name) }}
                    >
                        { buttonText }
                    </Button>
                </TableCell>
            }
        </StyledTableRow> 
    )
    const renderButton = () => {
        return (  
            <Box mt={2} display='flex' justifyContent='center'>
                <Button
                    onClick={handleVisible}
                >
                    { isButtonClick ? visibleBottonTextClick  : visibleBottonText }
                </Button> 
            </Box>
        )
    }
    return (
        <Container maxWidth={maxWidthContainer} className={`${classes.tableContainer}`} >
            {
                heading.length > 0 &&
                <Typography variant={variant} className={`heading heading-center`}>
                    { heading }
                </Typography> 
            }
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
                            {
                                isButton &&
                                <TableCell align="right" className={`${classes.tableHeader} ${classes.tableCell}` } ></TableCell>
                            }
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
                isButtonShowMore &&
                renderButton()
            }
        </Container>
    );
}