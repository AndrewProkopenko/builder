import React from 'react'

import { Container, Grid, makeStyles } from '@material-ui/core'

import '../../../assets/main-banner.scss'


function DumbComponent(props) {

    const titleMain = props.data.heading
    const titleSubText = props.data.headingIcon.title
    // const titleSubIcon = props.data.headingIcon.icon
    const paragraph = props.data.paragraph
    const inputLabel = props.data.form.inputLabel
    const buttonLabel = props.data.form.buttonLabel
    const policy = props.data.form.policy
    const imageUrl = props.data.image

    const useStyles = makeStyles( (theme) => ({
        subHeading: { 
            color: theme.palette.primary.main,
            '&>svg' : {
                fill: theme.palette.primary.main
            }
        },
        input: { 
            border: `2px solid ${theme.palette.primary.main}`,
            backgroundColor: theme.palette.background.default, 
            color: theme.palette.text.primary
        },
        button: {
            border: `2px solid ${theme.palette.primary.main} !important`, 
            backgroundColor: theme.palette.primary.main, 
            transition: `${theme.transitions.easing.easeInOut} ${theme.transitions.duration.shorter}ms`, 
            '&:hover' : {
                background: 'none',
                color: theme.palette.primary.light
            }
        }
    }))
    const classes = useStyles()
    return (
        <div className="mac-main-banner">
            <Container maxWidth='lg'>
                <Grid container spacing={2}>
                    <Grid item md={7} className="col-12 col-lg-7">
                        <div className="mac-main-banner_content">
                            <h1>
                                {
                                    titleMain
                                }
                            </h1>
                            <h5 className={classes.subHeading}>
                                <svg viewBox="0 0 511.987 511.987" > 
                                    <g><path d="m207.993 123.993c-13.233 0-24-10.767-24-24s10.767-24 24-24 24 10.767 24 24-10.766 24-24 24z"/><path d="m511.477 439.169-39-259.997c-3.4-22.702-22.532-39.18-45.493-39.18h-148.555c13.072-24.73 12.843-53.822-.828-78.611-13.822-25.065-38.887-40.523-67.054-41.352-1.686-.049-3.418-.049-5.115 0-28.161.828-53.226 16.287-67.048 41.352-13.665 24.779-13.899 53.858-.826 78.611h-52.555c-22.961 0-42.093 16.478-45.493 39.176l-39 260.001c-1.987 13.256 1.89 26.684 10.637 36.84 8.748 10.157 21.452 15.982 34.856 15.982h419.98c13.404 0 26.108-5.825 34.856-15.982 8.748-10.154 12.625-23.582 10.638-36.84zm-345.07-362.334c8.423-15.273 22.99-24.319 39.962-24.818.536-.016 1.08-.023 1.625-.023s1.089.008 1.619.023c16.978.499 31.545 9.545 39.968 24.818 8.798 15.954 8.554 34.79-.651 50.392l-40.936 68.92-40.924-68.9c-9.217-15.606-9.465-34.452-.663-50.412zm310.186 378.294c-1.564 1.816-5.023 4.864-10.609 4.864h-289.876c.747-7.5 4.218-18.771 17.343-25.973 7.747-4.251 10.581-13.977 6.33-21.724s-13.979-10.581-21.725-6.33c-16.945 9.298-28.116 23.897-32.305 42.216-.979 4.279-1.452 8.29-1.643 11.811h-98.105c-5.586 0-9.045-3.048-10.609-4.864-1.564-1.817-4.065-5.689-3.237-11.212l39-260.003c1.035-6.907 6.858-11.92 13.847-11.92h71.425l31.046 52.271c4.348 7.343 12.018 11.727 20.519 11.727s16.171-4.384 20.506-11.707l31.059-52.291h167.426c6.988 0 12.812 5.013 13.847 11.923l39 259.999c.826 5.523-1.674 9.396-3.239 11.213z"/><path d="m277.053 220.814c-8.385-2.797-17.444 1.737-20.238 10.119-2.795 8.383 1.736 17.444 10.119 20.238.164.055 16.56 5.917 21.881 21.881 2.234 6.705 8.478 10.945 15.177 10.945 1.677 0 3.384-.266 5.062-.826 8.383-2.794 12.914-11.855 10.119-20.238-10.411-31.23-40.83-41.689-42.12-42.119z"/><path d="m290.621 321.587c-8.334-2.941-17.473 1.43-20.413 9.763-9.03 25.585-39.982 36.575-40.632 36.801-8.349 2.815-12.854 11.855-10.064 20.22 2.234 6.705 8.478 10.945 15.177 10.945 1.677 0 3.384-.266 5.062-.826 1.883-.627 46.287-15.841 60.634-56.49 2.94-8.333-1.431-17.472-9.764-20.413z"/></g>
                                </svg> 
                                <span>
                                    { titleSubText }
                                </span>
                            </h5>
                            <p>
                                { paragraph }
                            </p>
                            <div className="mac-main-banner_content-form">
                                <form onSubmit={(e) => { e.preventDefault() }}>
                                    <div className="mac-main-banner_content-form__group">
                                        <span>
                                            <input 
                                                type="tel" 
                                                name="phone" 
                                                required 
                                                placeholder={`${inputLabel}`} 
                                                className={classes.input}
                                            />
                                        </span>
                                        <div className="btn-form">
                                            <button 
                                                className={classes.button}
                                                type="submit"
                                            >
                                                { buttonLabel }
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <span>
                                    { policy }
                                </span>
                            </div>
                        </div>
                    </Grid>
                    <Grid md={5} className="col-lg-5"> 
                        <div className="mac-main-banner-image d-none d-lg-block">
                        <div className="image" style={{ backgroundImage: `url(${imageUrl})` }} />
                        </div>
                    </Grid>
                </Grid> 
            </Container>
        </div>
    )
}

export default DumbComponent