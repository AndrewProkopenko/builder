import React, { useEffect, useState, useContext, useRef } from 'react'
  
import { NavLink } from "react-router-dom";

import { makeStyles, Typography, Container, Box, fade } from '@material-ui/core'  

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
 
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';  
import '../../../assets/style/headingCenter.scss'

import {getColorByPalette} from '../../functions/colorChanger/ColorCalculation'

import ModalContext from '../../../context/modalContext/ModalContext'

SwiperCore.use([Navigation]);
  
function DumbComponent(props) { 
    
    const { handleOpen } = useContext(ModalContext) 

    const [isSwiper, setIsSwiper] = useState(true) 
    
    const variant = props.data.variantHeading
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
 
    const [slideHeight, setSlideHeight] = useState(0)  

    const slideRef = useRef(null);
    

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
            activeSlide: {
                cursor: 'pointer', 
                '&:hover': {
                    '& $slideImg': {
                        transform: "scale(1.03)"
                    },
                    '& $slideTitle': { 
                        backgroundColor: theme.palette.background.default
                    },
                }
            }, 
            slide: {
                position: 'relative',  
                height: slideHeight,   
                overflow: 'hidden', 
                '& a': {
                    color: 'inherit'
                }
            },
            slideBox: {
                position: 'relative',  
                width: "100%",
                height: "100%",
            }, 
            slideImg: {
                width: "100%",
                height: "100%",
                backgroundPosition: 'center', 
                backgroundRepeat: 'no-repeat', 
                backgroundSize: 'cover',
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`
            },
            slideTitle: {
                position: 'absolute',
                zIndex: 5, 
                bottom: 20,  
                right: 0,
                maxWidth: "75%", 
                fontSize: 22, 
                lineHeight: 1.1, 
                backgroundColor: fade(theme.palette.background.default, 0.7), 
                padding: theme.spacing(1, 2), 
                borderBottom: `2px solid ${color}`,
                transition: `${theme.transitions.duration.shortest}ms ${theme.transitions.easing.easeInOut}`, 
                [theme.breakpoints.down('sm')]: {
                    fontSize: 14
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
                    maxWidth: 300, 
                    marginLeft: spaceBetween,
                    marginRigth: spaceBetween,
                    marginBottom: spaceBetween, 
                    
                },
                '& $slideImg': {
                    maxWidth: '100%',  
                },
                [theme.breakpoints.down('sm')]: {
                    '& $slide': {
                        marginLeft: 0, 
                        marginRight: 0, 
                        maxWidth: '100%',   
                    }
                }
            }
        })
    });  
    const classes  = useStyles(); 
     
  
    useEffect(() => {   

        const getWidthViewport = () => {  
            
            let actualWidth = window.innerWidth

            console.log('swiper resize', actualWidth)  

             

            try {
                setTimeout(() => {
                    let slideHeightCalc = slideRef.current.clientWidth
                    setSlideHeight(slideHeightCalc) 
                }, 200)
            }
            catch (error) {
                console.log(error)
            }

            if(actualWidth <= 600) {
                if(items.length > slidesForViewMobile) {
                    setIsSwiper(true)
                    return
                }
                else setIsSwiper(false)
            }
            if(actualWidth > 600 && actualWidth <= 960) {
                if(items.length > slidesForViewTablet) {
                    setIsSwiper(true)
                    return
                }
                else setIsSwiper(false)
            }
            if(actualWidth > 960) {
                if(items.length > slidesForViewDesktop) {
                    setIsSwiper(true)
                    return
                }
                else setIsSwiper(false)
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
        if(slide.isButton) {
            handleOpen(slide.targetButton)
        } 
    }

    const renderSlide = (slide, key) => (
        <SwiperSlide 
            key={key} 
            ref={slideRef} 
            className={`${classes.slide} ${(slide.isButton || slide.isUrl) ? classes.activeSlide : '' } `}
            onClick={() => { handleSlideClick(slide) }}
        >
            {
                slide.isUrl ? 
                <NavLink to={slide.activePage.slug}>
                    <Box className={classes.slideBox}>
                        <Box 
                            style={{backgroundImage: `url(${slide.imageUrl})`}}
                            className={classes.slideImg}
                        />
                        {
                            slide.title.length > 0 &&
                            <Typography
                                component='h6'
                                className={classes.slideTitle}
                            >
                                {slide.title}
                            </Typography>
                        }
                        
                    </Box>
                </NavLink>
                :
                <Box className={classes.slideBox}>
                    <Box 
                        style={{backgroundImage: `url(${slide.imageUrl})`}}
                        className={classes.slideImg}
                    />
                    {
                        slide.title.length > 0 &&
                        <Typography
                            component='h6'
                            className={classes.slideTitle}
                        >
                            {slide.title}
                        </Typography>
                    }
                    
                </Box>
            }
            
        </SwiperSlide>
    )
 
    return ( 
        <Container className={`${classes.swiper} ${classes.styleClass}`} maxWidth={maxWidthContainer} >
            {
                heading.length > 0 &&
                <Typography variant={variant} className={`heading heading-center`}>
                    { heading }
                </Typography> 
            }
            
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
                        items.map( (slide, key) => {
                            return renderSlide(slide, key)
                        } )
                    }
                </Swiper> 
                :
                <Box className={classes.gallery}>
                    {
                        items.map( (slide, key) => {
                            return renderSlide(slide, key)
                        } )
                    }
                </Box>   
                
            }
            
        </Container>
       
    )
}

export default DumbComponent
