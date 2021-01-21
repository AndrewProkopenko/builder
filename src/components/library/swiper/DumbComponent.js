import React from 'react'

import { makeStyles, Typography, Container, Box, fade } from '@material-ui/core'  

import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// import '../../../assets/style/swiperCustom.scss';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
// import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation]);

// import ModalContext from '../../../context/modalContext/ModalContext'

function DumbComponent(props) {

    // const { handleOpen } = React.useContext(ModalContext) 

    const heading = "props.data.heading "

    // const heading = props.data.heading 
     
    // let colorMain = props.data.colorMain || '#f00' 
    // const openModal = () => {
    //     handleOpen(targetButton)
    // }
    const slideWidth = 300 
    const spaceBetween = 30

    const [slideForView, setSlideForView] = React.useState(1)
    // const [slideWidth, setSlideWidth] = React.useState(500)
    const [slideHeight, setSlideHeight] = React.useState(slideWidth)

    const slideRef = React.useRef(null);

    const useStyles = makeStyles((theme) => {   
        // if(colorMain === 'primary')  colorMain = theme.palette.primary.main
        // if(colorMain === 'secondary') colorMain = theme.palette.secondary.main   
        return ({ 
            heading: {  
                marginRight: theme.spacing(3),
                color: theme.palette.text.primary,
                textAlign: 'center',  
            },
            swiper: {
                marginTop: 50, 
                marginBottom: 50, 
                '& .swiper-button-prev': {
                    color: theme.palette.secondary.main, 
                    "&:after": { 
                        fontSize: `${25}px !important`
                    }
                },
                '& .swiper-button-next': {
                    color: theme.palette.secondary.main, 
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
                '& .swiper-pagination': { 

                },
                '& .swiper-pagination-bullet': {
                    // width: 12, 
                    // height: 12
                },
                '& .swiper-pagination-bullet-active': {
                    backgroundColor: theme.palette.secondary.main
                }, 
                [theme.breakpoints.down('sm')]: {
                    '& .swiper-button-prev': {
                        display: 'none !important'
                    },
                    '& .swiper-button-next': {
                        display: 'none'
                    }
                },
                [theme.breakpoints.down('sm')]: {
                     
                }
            },
            slide: {
                position: 'relative',  
                height: slideHeight,  
                width: slideWidth, 
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
                padding: theme.spacing(1, 2)
            }
             
        })
    });


    const classes  = useStyles();
 
    React.useEffect(() => {  
        const getWidthViewport = () => {  
            let actualWidth = window.innerWidth
            let quantity = Math.floor(actualWidth/slideWidth)
            if(quantity !== 0) setSlideForView(quantity)
            else setSlideForView(1)
 
            try {
                setTimeout(() => {
                    let slideHeightCalc = slideRef.current.clientWidth
                    setSlideHeight(slideHeightCalc)
                    // if(actualWidth > slideWidth ) {
                    //     setSlideHeight(slideHeightCalc)
                    // }
                    // else {
                    //     setSlideHeight(300)
                    //     setSlideWidth(300)
                    // } 
                }, 300)
            }
            catch (error) {
                console.log(error)
            }
        }; 
        getWidthViewport(); 
        window.removeEventListener('resize', getWidthViewport )
        window.addEventListener("resize", () => getWidthViewport())
        // eslint-disable-next-line
    }, []);
 
    const items = [1, 2, 3, 4 ,5 , 6, 7, 8, 9]

    const renderSlide = (slide) => (
        <SwiperSlide key={slide} ref={slideRef} className={`${classes.slide} js-slide-height-computed `}>
            <Box className={classes.slideBox}>
                <Box 
                    style={{backgroundImage: `url(https://c8.alamy.com/comp/2A27D1R/square-format-view-of-empty-ocean-and-sky-landscape-with-expressive-clouds-2A27D1R.jpg)`}}
                    className={classes.slideImg}
                />
                <Typography
                    component='h6'
                    className={classes.slideTitle}
                >
                    Slide Title "fade", "cube", "coverflow" or "flip" - {slide}  Slide Title "fade", "cube", "coverflow" or "flip"
                </Typography>
            </Box>
        </SwiperSlide>
    )
    return ( 
        <Container className={`${classes.swiper} heading`}>
            <Typography variant={'h3'} className={classes.heading}>
                { heading }
            </Typography> 
            
            <Swiper
                // loop={false} 
                // autoplay={}
                // freeMode={true} 
                // "fade", "cube", "coverflow" or "flip"

                height={slideHeight}
                spaceBetween={spaceBetween}
                speed={200}
                slidesPerView={slideForView}
 
                navigation 
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
 
                onSlideChange={() => console.log('slide change')}
                // onSwiper={(swiper) => console.log(swiper)}
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
