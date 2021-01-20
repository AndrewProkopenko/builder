import React from 'react'

import { Container, Accordion, AccordionSummary, makeStyles } from '@material-ui/core'

import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

import '../../../assets/style/accordion.scss'

function DumbComponent(props) { 
    let color = props.data.color
    const heading = props.data.heading
    const items = props.data.items 

    const useStyles = makeStyles((theme) => { 

        if(color === 'primary')  color = theme.palette.primary.main
        if(color === 'secondary') color = theme.palette.secondary.main 

        return ({
             
            accordionReset: { 
                boxShadow: 'none', 
                marginBottom: 10,
                [`@media (max-width: 576px)`]: {
                    marginBottom: 0,
                    borderBottom: `1px solid ${theme.palette.divider}`
                }, 
                '&:before' : {
                    display: 'none'
                }
            }, 
            disableMobileGutters: { 
                [`@media (max-width: 576px)`]: { 
                    padding: 0
                }
            },
            colorNumber: {
                color: color
            }
            
        })
    });

    const classes  = useStyles();
    
    return ( 
        <div className="mac-accordion heading">
            <Container maxWidth={'lg'} className={classes.disableMobileGutters}>

                {
                    heading.length > 0 &&
                    <h3> { heading } </h3> 
                }
                

                {
                    items.map( (item, index) => { 
                        const indexForDisplay = '0' + (index + 1) + '.'
                        return (
                            <Accordion key={index} classes={{root: classes.accordionReset}}>
                                <AccordionSummary expandIcon={ <ExpandMoreOutlinedIcon style={{color: color}} />}> 
                                    <div className="mac-accordion_card-header_btn  ">
                                        <span>
                                            <b className={classes.colorNumber}>{indexForDisplay}</b> 
                                            { item.head }
                                        </span> 
                                    </div> 
                                </AccordionSummary>
                                <div className="mac-accordion_card-body">
                                    { item.body }
                                </div>
                            </Accordion>  
                        )
                    })
                }
            
            </Container>
        </div> 



    )
}

export default DumbComponent
