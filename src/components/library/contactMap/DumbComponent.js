import React from 'react'

import SendFormContext from '../../../context/sendFormContext/SendFormContext'

import { Container, Grid, makeStyles, Button, Box } from '@material-ui/core'

import '../../../assets/contactMap.scss' 

function DumbComponent(props) {
    const { sendRequests } = React.useContext(SendFormContext)
    const [formPhone, setFormPhone] = React.useState('')
    const [formName, setFormName] = React.useState('')
    const [formComment, setFormComment] = React.useState('')
 
    const mapHtml = props.data.mapFrame
    const location = props.data.location 
    const phone = props.data.phone
    const paragraph = props.data.paragraph
    const inputName = props.data.inputName
    const inputPhone = props.data.inputPhone
    const inputComment = props.data.inputComment
    const buttonText = props.data.buttonText
    const policy = props.data.policy
     
    let colorMapOnload 

    const useStyles = makeStyles((theme) => {  
        colorMapOnload = theme.palette.primary.dark
        return ({
            svg: {
                fill: theme.palette.secondary.main
            }, 
            itemBackground: {  
                backgroundColor: theme.palette.background.paper, 
                position: 'relative', 
                zIndex: 10, 
                [`@media (max-width: 960px)`]: {
                    marginBottom: mapHtml !== null ? 380 : 0
                }, 
                [`@media (max-width: 600px)`]: {
                    marginBottom: mapHtml !== null ? 280 : 0
                }, 
            },
            input: {
                fontFamily: 'inherit', 
                border: `1px solid ${theme.palette.primary.main}`, 
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                boxShadow: 'none', 
                '&::-webkit-input-placeholder':  {  
                    color: theme.palette.text.primary,
                },
                '&::-moz-placeholder' : { 
                    color: theme.palette.text.primary,
                },
                '&:-ms-input-placeholder': {  
                    color: theme.palette.text.primary,
                },
                '&:-moz-placeholder': { 
                    color: theme.palette.text.primary,
                }, 
                '&:focus': {
                    borderColor: theme.palette.secondary.light
                }
            },
            button: {
                backgroundColor: theme.palette.primary.main ,
                border: `2px solid ${theme.palette.primary.main}`, 
                color: '#fff',
                '&:hover' : {
                    background: 'none',
                    '&>span': { 
                        color: theme.palette.primary.main
                    }
                }
            }, 
            link: { 
                '&:hover': { 
                    color: `${theme.palette.primary.main} !important`,
                }
            },
            boxForFlex: { 
                [`@media (min-width: ${theme.breakpoints.values.md}px)`]: { 
                    display: mapHtml !== null ? 'block' : 'flex', 
                    flexDirection: 'row-reverse', 
                    justifyContent: 'space-between'
                }, 
            }, 
            heightRegular: {
                height: mapHtml === null ? 'auto' : 430,
                [`@media (max-width: ${theme.breakpoints.values.md}px)`]: {
                    height: 'auto', 
                }
            }, 
            linksContainer : {
                width: '100%',
                display: mapHtml !== null ? 'block' : 'flex', 
                
                justifyContent: 'center',
                flexDirection: 'column', 
                alignItems: 'center'
            }
        })
    });

    const classes  = useStyles();

    const handleSubmit = (event) => {
        event.preventDefault()  

        const sendForm = {
            phone: formPhone,
            name: formName, 
            comment: formComment,
            place: 'contact',  
            isCheck: false
        }

        sendRequests(sendForm)
        
        setFormPhone('')
        setFormName('')
        setFormComment('')

    }
    return ( 
        <div style={{position: 'relative'}}> 
            <Container maxWidth='lg'>
                <div className="ln-contact"> 
                    <Grid container>  
                        <Grid item xs={12} md={ mapHtml !== null ? 6 : 12 } className={classes.itemBackground} >  
                            <div className={`ln-contact_item ${classes.heightRegular}`} >
                                <Box className={classes.boxForFlex}>
                                    <Box className={classes.linksContainer}>
                                        <div className="loc">
                                            <svg className={classes.svg} viewBox="0 0 511.999 511.999">
                                                <g>
                                                    <g>
                                                        <path d="M255.999,0C152.786,0,68.817,85.478,68.817,190.545c0,58.77,29.724,130.103,88.349,212.017
                                                            c42.902,59.948,85.178,102.702,86.957,104.494c3.27,3.292,7.572,4.943,11.879,4.943c4.182,0,8.367-1.558,11.611-4.683
                                                            c1.783-1.717,44.166-42.74,87.149-101.86c58.672-80.701,88.421-153.007,88.421-214.912C443.181,85.478,359.21,0,255.999,0z
                                                            M255.999,272.806c-50.46,0-91.511-41.052-91.511-91.511s41.052-91.511,91.511-91.511s91.511,41.052,91.511,91.511
                                                            S306.457,272.806,255.999,272.806z"/>
                                                    </g>
                                                </g>
                                            </svg>
                                            <span>
                                                {location}
                                            </span>
                                        </div>
                                        <div className="tel">
                                            <svg className={classes.svg} version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 513.64 513.64" style={{enableBackground: 'new 0 0 513.64 513.64'}} xmlSpace="preserve">
                                                <g><g>
                                                    <path d="M499.66,376.96l-71.68-71.68c-25.6-25.6-69.12-15.359-79.36,17.92c-7.68,23.041-33.28,35.841-56.32,30.72
                                                                                        c-51.2-12.8-120.32-79.36-133.12-133.12c-7.68-23.041,7.68-48.641,30.72-56.32c33.28-10.24,43.52-53.76,17.92-79.36l-71.68-71.68
                                                                                        c-20.48-17.92-51.2-17.92-69.12,0l-48.64,48.64c-48.64,51.2,5.12,186.88,125.44,307.2c120.32,120.32,256,176.641,307.2,125.44
                                                                                        l48.64-48.64C517.581,425.6,517.581,394.88,499.66,376.96z" />
                                                </g></g> 
                                            </svg>

                                            <a className={classes.link} href={`tel:${phone}`}> {phone} </a>
                                        </div>
                                    </Box>
                                    <form onSubmit={handleSubmit}>
                                        <p> 
                                            { paragraph }
                                        </p>
                                        <div className="kr-form">
                                            <div className="kr-form-inputs">
                                            <span>
                                                <input 
                                                    name="name" 
                                                    type="text" 
                                                    placeholder={inputName} 
                                                    required 
                                                    className={classes.input}
                                                    value={formName}
                                                    onChange={e => {setFormName(e.target.value)}}
                                                />
                                            </span>
                                            <span>
                                                <input 
                                                    name="phone" 
                                                    type="tel" 
                                                    placeholder={inputPhone}
                                                    required 
                                                    className={classes.input}
                                                    value={formPhone}
                                                    onChange={e => {setFormPhone(e.target.value)}}
                                                />
                                            </span>
                                            </div>
                                            <textarea   
                                                cols={30} 
                                                rows={10} 
                                                placeholder={inputComment}  
                                                className={classes.input}
                                                value={formComment}
                                                onChange={e => {setFormComment(e.target.value)}}
                                            />
                                        </div>
                                        <div className="ln-contact_item-btn">
                                            <div className="btn-custom">
                                                <Button type="submit" className={classes.button}>
                                                    <span> { buttonText } </span>
                                                </Button>
                                            </div>
                                            <span>
                                                { policy }
                                            </span>
                                        </div>
                                    </form>
                                </Box>
                            </div> 
                        </Grid>
                        {   
                            mapHtml  && 
                            <Grid item lg={6} className={`position-static`} > 
                                <div className="map" style={{ backgroundColor: colorMapOnload }} > 
                                    <div style={{height: '100%'}} dangerouslySetInnerHTML={{__html: mapHtml}}></div> 
                                </div>
                            </Grid>
                        } 
                    </Grid> 
                </div>
            </Container>
        </div> 
    )
}

export default DumbComponent
