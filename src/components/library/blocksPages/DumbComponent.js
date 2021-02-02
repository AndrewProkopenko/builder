import React, {useState} from 'react'
  
import { useHistory } from "react-router-dom";

import { makeStyles, Typography, Container, Box, darken } from '@material-ui/core'  

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
 
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';  

import {getColorByPalette} from '../../functions/colorChanger/ColorCalculation'
 

SwiperCore.use([Navigation]);
  
function DumbComponent(props) {

    let history = useHistory(); 

    const [isSwiper, setIsSwiper] = useState(true) 
    
    const heading = props.data.heading  
    let color = props.data.color

    const slidesForViewDesktop = props.data.slidesPerView 
    const slidesForViewTablet = props.data.slidesPerViewTablet 
    const slidesForViewMobile = props.data.slidesPerViewMobile 
    const spaceBetween = props.data.spaceBetween
    const speed = props.data.speed
    const loop = props.data.loop
    const freeMode = props.data.freeMode 
    const items = props.data.slides
    const marginTop = props.data.marginTop  
    const marginBottom = props.data.marginBottom  
    const maxWidthContainer = props.data.maxWidthContainer  
 
    const [slideHeight, setSlideHeight] = React.useState(0)  

    const slideRef = React.useRef(null);
    

    const useStyles = makeStyles((theme) => {   
        
        color = getColorByPalette(theme, color) 
         
        return ({  
            swiper: {                 
                '& .swiper-button-prev': {
                    color: color, 
                    "&:after": { 
                        fontSize: `${25}px !important`
                    }
                },
                '& .swiper-button-next': {
                    color: color, 
                    "&:after": { 
                        fontSize: `${25}px !important`
                    }
                },
                '& .swiper-container': {
                    paddingLeft: 50,
                    paddingRight: 50,
                    [theme.breakpoints.down('sm')]: { 
                        paddingLeft: 0,
                        paddingRight: 0,
                    }
                },  
            },
            
            slide: { 
                boxSizing: 'border-box !important', 
                position: 'relative',   
                height: slideHeight > 300 ? 300 : (slideHeight - 30) ,  
                overflow: 'hidden',  
                cursor: 'pointer',   
                backgroundColor: theme.palette.background.paper,
            },
            slideBox: {
                overflow: 'hidden', 
                display: 'inline-flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center',
                position: 'relative',  
                width: "100%",
                maxWidth: '100%', 
                height: "100%",
                padding: 15,
                boxShadow: theme.shadows['10'], 
                borderRadius: theme.shape.borderRadius, 
                transition: `${theme.transitions.duration.standard}ms ${theme.transitions.easing.easeInOut}`,
                '&:hover': { 
                    // backgroundColor: color, 
                    boxShadow: theme.shadows["2"], 
                    '& $slideImg': {
                        // width: 500, 
                        // height: 500, 
                        
                        // backgroundColor: theme.palette.getContrastText(color), 
                        "& svg": { 
                            // fill: color
                        }, 
                        "&::after": {
                            transform: 'scale(10)'
                        },
                    },
                    '& $slideTitle': {
                        color: theme.palette.getContrastText(color)
                    } 
                }

            }, 
            slideImg: { 
                display: 'flex', 
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative', 
                width: 70, 
                height: 70, 
                borderRadius: '50%',  
                marginTop: 10, 
                marginBottom: 10, 
                // backgroundColor: color, 
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
                "&::after": { 
                    position: 'absolute',
                    zIndex: 3, 
                    top: -10, 
                    left: -10,  
                    content: "''", 
                    width: 90, 
                    height: 90, 
                    borderRadius: '50%',  
                    backgroundColor: color, 
                    transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`,
                },
                '& span': { 
                    display: 'flex', 
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                "& svg": {
                    position: 'relative', 
                    zIndex: 10,  
                    width: 60,
                    height: 60,
                    fill: theme.palette.getContrastText(color)
                },
                [theme.breakpoints.down('sm')]: {
                    width: 40, 
                    height: 40,
                    "&::after": {   
                        width: 60, 
                        height: 60,  
                    },
                    "& svg": {  
                        width: 30,
                        height: 30, 
                    },
                }
                 
            },
            slideTitle: { 
                position: 'relative', 
                zIndex: 15, 
                fontSize: 18, 
                lineHeight: 1.1,  
                textAlign: 'center', 
                padding: theme.spacing(1, 2),  
                marginTop: 8, 
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`, 
                width: "100%", 
                [theme.breakpoints.down('sm')]: {
                    fontSize: 16
                }
            },
            slideBtn: {
                backgroundColor: color, 
                color: theme.palette.getContrastText(color), 
                '&:hover': {
                    backgroundColor: darken(color, 0.3), 
                }
            },
            styleClass: {
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
                [theme.breakpoints.down('sm')]: { 
                    marginTop: marginTop > 50 ? marginTop*0.6 : 30,
                    marginBottom: marginBottom > 50 ? marginBottom*0.6 : 30,
                }
            },  
            gallery: {
                display: "flex",
                justifyContent: 'center',
                flexWrap: 'wrap', 
                '& $slide': {
                    maxWidth: 200, 
                    marginLeft: spaceBetween,
                    marginRight: spaceBetween,
                    marginBottom: spaceBetween*2, 
                    
                },
                '& $slideImg': {
                    maxWidth: '100%',  
                },
                [theme.breakpoints.down('sm')]: {
                    '& $slide': {
                        marginLeft: 10, 
                        marginRight: 10, 
                        marginBottom: 20, 
                        // maxWidth: '100%',   
                    }
                }
            }
        })
    });  
    const classes  = useStyles(); 
    
     
    React.useEffect(() => {  

        const getWidthViewport = () => {  
            
            let actualWidth = window.innerWidth

            console.log('blocks resize', actualWidth)  

            if(actualWidth <= 600) {
                if(items.length > slidesForViewMobile) setIsSwiper(true)
                else setIsSwiper(false)
            }
            if(actualWidth > 600 && actualWidth <= 960) {
                if(items.length > slidesForViewTablet) setIsSwiper(true)
                else setIsSwiper(false)
            }
            if(actualWidth > 960) {
                if(items.length > slidesForViewDesktop) setIsSwiper(true)
                else setIsSwiper(false)
            }

            try {
                setTimeout(() => {
                    let slideHeightCalc = slideRef.current.clientWidth
                    setSlideHeight(slideHeightCalc) 
                }, 200)
            }
            catch (error) {
                console.log(error)
            }
        }; 
        getWidthViewport(); 

        window.addEventListener("resize", getWidthViewport)

        return function cleanupListener() { 
            window.removeEventListener('resize', getWidthViewport)
        }
        // eslint-disable-next-line
    }, []);
 
    const handleSlideClick = (slide) => { 
        history.push(`/${slide.url}`)  
        // console.log(slide)
    }

    const renderSlide = (slide) => (
        <SwiperSlide 
            key={slide.id} 
            ref={slideRef} 
            className={`${classes.slide}`}
            onClick={() => { handleSlideClick(slide) }}
        >
            <Box className={classes.slideBox}> 
                <Box className={classes.slideImg}>
                    <span dangerouslySetInnerHTML={{__html: slide.svg}}></span>
                </Box> 
                <Typography
                    component='h6'
                    className={classes.slideTitle}
                >
                    {slide.title} 
                </Typography> 
            </Box>
        </SwiperSlide>
    )
 
    return ( 
        <Container className={`${classes.swiper} ${classes.styleClass} heading`} maxWidth={maxWidthContainer} >
            <Typography variant={'h3'} className={classes.heading}>
                { heading }
            </Typography> 
            
            {
                isSwiper ?     
                <Swiper
                    loop={loop}  
                    freeMode={freeMode}  

                    height={slideHeight}
                    spaceBetween={spaceBetween}
                    speed={speed} 
                    slidesPerView={slidesForViewMobile}
                    breakpoints={{
                        // when window width is >= 600px
                        600: { 
                          slidesPerView: slidesForViewTablet,
                        },
                        // when window width is >= 960px
                        960: { 
                          slidesPerView: slidesForViewDesktop,
                        },
                    }} 
                    navigation   
                >
                    {
                        items.map( slide => {
                            return renderSlide(slide)
                        } )
                    }
                </Swiper> 
                :
                <Box className={classes.gallery}>
                    {
                        items.map( slide => {
                            return renderSlide(slide)
                        } )
                    }
                </Box>   
                
            }
            
        </Container>
       
    )
}

export default DumbComponent
