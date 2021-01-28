import React from 'react'

import { makeStyles, Typography, Container, Box, fade } from '@material-ui/core'  

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
 
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';  

import {getColorByPalette} from '../../functions/colorChanger/ColorCalculation'

SwiperCore.use([Navigation]);
  
function DumbComponent(props) {
    
    const heading = props.data.heading  
    let color = props.data.color

    const slidesForView = props.data.slidesPerView 
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
                // [theme.breakpoints.down('xs')]: {
                //     '& .swiper-button-prev': {
                //         display: 'none !important'
                //     },
                //     '& .swiper-button-next': {
                //         display: 'none'
                //     }
                // }, 
            },
            slide: {
                position: 'relative',  
                height: slideHeight,   
                overflow: 'hidden',   
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
                backgroundSize: 'cover'
            },
            slideTitle: {
                position: 'absolute',
                zIndex: 5, 
                bottom: 20,  
                right: 0,
                maxWidth: "75%", 
                fontSize: 14, 
                lineHeight: 1.1, 
                backgroundColor: fade(theme.palette.background.default, 0.7), 
                padding: theme.spacing(1, 2), 
                borderBottom: `2px solid ${color}`
            },
            styleClass: {
                marginTop: `${marginTop}px`,
                marginBottom: `${marginBottom}px`,
                [theme.breakpoints.down('sm')]: { 
                    marginTop: marginTop > 50 ? marginTop*0.6 : 30,
                    marginBottom: marginBottom > 50 ? marginBottom*0.6 : 30,
                }
            },  
        })
    });
 

    const classes  = useStyles();

    
    let actualWidth = window.innerWidth
 
    React.useEffect(() => {  
        const getWidthViewport = () => {  
            console.log('swiper resize') 

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
    }, [actualWidth]);
 
    

    const renderSlide = (slide) => (
        <SwiperSlide key={slide.imageUrl} ref={slideRef} className={`${classes.slide}`}>
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
        </SwiperSlide>
    )
 
    return ( 
        <Container className={`${classes.swiper} ${classes.styleClass} heading`} maxWidth={maxWidthContainer} >
            <Typography variant={'h3'} className={classes.heading}>
                { heading }
            </Typography> 
            
                
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
                          slidesPerView: slidesForView,
                        },
                    }}
    
                    navigation  
    
                    onSlideChange={() => console.log('slide change')} 
                >
                    {
                        items.map( slide => {
                            return renderSlide(slide)
                        } )
                    }
                </Swiper> 
            
        </Container>
       
    )
}

export default DumbComponent
