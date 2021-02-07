import React from 'react'

import { Container, Accordion, AccordionSummary, makeStyles , Typography} from '@material-ui/core'

import ExpandMoreOutlinedIcon from '@material-ui/icons/ExpandMoreOutlined';

import '../../../assets/style/accordion.scss'
import '../../../assets/style/headingCenter.scss'

import {getColorByPalette} from '../../functions/colorChanger/ColorCalculation'

function DumbComponent(props) { 
    let color = props.data.color
    const variant = props.data.variantHeading
    const heading = props.data.heading
    const items = props.data.items 
    const marginTop = props.data.marginTop  
    const marginBottom = props.data.marginBottom  
    const maxWidthContainer = props.data.maxWidthContainer  

    const useStyles = makeStyles((theme) => { 
  
        color = getColorByPalette(theme, color) 

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
            },
            styleClass: {
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
                [theme.breakpoints.down('sm')]: { 
                    marginTop: marginTop > 50 ? marginTop*0.6 : 30,
                    marginBottom: marginBottom > 50 ? marginBottom*0.6 : 30,
                }
            }
            
        })
    });

    const classes  = useStyles();
    
    return ( 
        <div className={`${classes.styleClass} bulder-accordion`}>
            <Container maxWidth={maxWidthContainer} className={classes.disableMobileGutters}>

                {
                    heading.length > 0 &&
                    <Typography variant={variant} className={'heading heading-center'}>
                        { heading }
                    </Typography>
                }
                

                {
                    items.map( (item, index) => { 
                        const indexForDisplay = '0' + (index + 1) + '.'
                        return (
                            <Accordion key={index} classes={{root: classes.accordionReset}}>
                                <AccordionSummary expandIcon={ <ExpandMoreOutlinedIcon style={{color: color}} />}> 
                                    <div className="bulder-accordion_card-header_btn  ">
                                        <span>
                                            <b className={classes.colorNumber}>{indexForDisplay}</b> 
                                            { item.head }
                                        </span> 
                                    </div> 
                                </AccordionSummary>
                                <div className="bulder-accordion_card-body">
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
