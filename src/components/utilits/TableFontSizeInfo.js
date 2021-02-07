import React from 'react'

import {makeStyles } from '@material-ui/core/styles'
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import TabletMacIcon from '@material-ui/icons/TabletMac';
import DesktopMacRoundedIcon from '@material-ui/icons/DesktopMacRounded';

function TableFontSizeInfo({activeRow}) {
  
    const useStyles = makeStyles( theme => ({
        defaultSizeInfo: {
            padding: 8, 
            border: `1px solid ${theme.palette.info.main}`, 
            backgroundColor: theme.palette.background.paper
        }, 
        activeRowColor: {   
            backgroundColor: theme.palette.info.dark, 
            '& th, & td': {
                paddingTop: 8, 
                paddingBottom: 8, 
                fontSize: "1.2em",  
                color: theme.palette.getContrastText(theme.palette.info.dark),
            }
        }, 
        iconCell: {
            display: 'inline-flex', 
            alignitems: 'center', 
            '& svg' : { 
                fill: theme.palette.info.main , 
                marginLeft: 3
            }
        }
    }))
    const { defaultSizeInfo, activeRowColor, iconCell } = useStyles()

    return (
        <Box className={defaultSizeInfo}> 
            <Box mb={1}>  
                <Typography variant='caption'>
                    1rem = 14px
                </Typography> 
            </Box>
            <Box mb={1}>  
                <Typography variant='caption'>
                    *  - h3 default variant for many blocks (table, accordion, about, banner, slider, blocks, ext.)
                </Typography> 
            </Box>
            <Box mb={1}>  
            <Table size={'small'} >
                <TableHead>
                    <TableRow>
                        <TableCell>Variant</TableCell>
                        <TableCell align="right" >
                            <Box className={iconCell}>
                                {"<600px"} <PhoneIphoneIcon/>
                            </Box>
                        </TableCell>
                        <TableCell align="right" >
                            <Box className={iconCell}>
                                {'<960px'} <TabletMacIcon/>
                            </Box>
                        </TableCell>
                        <TableCell align="right" >
                            <Box className={iconCell}>
                                {'>960px'} <DesktopMacRoundedIcon/> 
                            </Box>
                        </TableCell> 
                    </TableRow>
                </TableHead>
                <TableBody> 
                    <TableRow className={activeRow === 'h1' ? activeRowColor : ''}  >
                        <TableCell component="th" scope="row">h1</TableCell>
                        <TableCell align="right">3.5rem</TableCell>
                        <TableCell align="right">4.7rem</TableCell>
                        <TableCell align="right">5.35rem</TableCell> 
                    </TableRow>
                    <TableRow className={activeRow === 'h2' ? activeRowColor : ''}>
                        <TableCell component="th" scope="row">h2</TableCell>
                        <TableCell align="right">2.375rem</TableCell>
                        <TableCell align="right">2.9rem</TableCell>
                        <TableCell align="right">3.3rem</TableCell> 
                    </TableRow>
                    <TableRow className={activeRow === 'h3' ? activeRowColor : ''}>
                        <TableCell component="th" scope="row">h3*</TableCell>
                        <TableCell align="right">2rem</TableCell>
                        <TableCell align="right">2.57rem</TableCell>
                        <TableCell align="right">2.8rem</TableCell> 
                    </TableRow>
                    <TableRow className={activeRow === 'h4' ? activeRowColor : ''}>
                        <TableCell component="th" scope="row">h4</TableCell>
                        <TableCell align="right">1.5625rem</TableCell>
                        <TableCell align="right">1.8rem</TableCell>
                        <TableCell align="right">2rem</TableCell> 
                    </TableRow>
                    <TableRow className={activeRow === 'h5' ? activeRowColor : ''}>
                        <TableCell component="th" scope="row">h5</TableCell>
                        <TableCell align="right">1.25rem</TableCell>
                        <TableCell align="right">1.32rem</TableCell>
                        <TableCell align="right">1.5rem</TableCell> 
                    </TableRow>
                    <TableRow className={activeRow === 'h6' ? activeRowColor : ''}>
                        <TableCell component="th" scope="row">h6</TableCell>
                        <TableCell align="right">1.125rem</TableCell>
                        <TableCell align="right">1.25rem</TableCell>
                        <TableCell align="right">1.25rem</TableCell> 
                    </TableRow> 
                </TableBody>
            </Table> 
            </Box>
        </Box>
    )
}

export default TableFontSizeInfo
