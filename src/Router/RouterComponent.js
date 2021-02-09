import React, { useState, useEffect } from 'react' 

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import ScrollToTop from '../components/functions/ScrollToTop'  
    
import LoadingProgress from '../components/utilits/LoadingProgress'
import PreloaderThumbnail from '../components/utilits/PreloaderThumbnail'

import Modal from '../components/modal/DumbComponent' 
import Header from '../components/header/Header' 
import Footer from '../components/footer/Footer' 
 
import Login from '../components/single/Login'
import Error from '../components/single/Error'
import SinglePage from '../components/page/SinglePage' 

import CategoryContext from '../context/headerContext/CategoryContext'
import LoadingContext from '../context/loadingContext/LoadingContext'   

function RouterComponent() {
 
    const {categories} = React.useContext(CategoryContext) 
    const {isLoading} = React.useContext(LoadingContext)  

    const [preloaderStatus, setPreloaderStatus] = useState('loading')

    useEffect(() => {
        if(categories.length > 0) {
            setPreloaderStatus('ready') 
            document.body.style.overflow = 'hidden'
            setTimeout(() => {
                setPreloaderStatus('delete') 
                document.body.style.overflow = 'visible'
            }, 2000);
            setTimeout(() => {
                setPreloaderStatus('hide') 
            }, 2500);
        } 
    }, [categories])

    return (   
        <Router basename="builder"> 
        
            <ScrollToTop/>
             
            
            { isLoading && <LoadingProgress/> }
            
            <PreloaderThumbnail status={preloaderStatus} />  

            {
                categories.length > 0 &&
                <React.Fragment>
                     
                    <Modal/>
                    <Header/>

                    <main>
                        <Switch>
                            { 
                                categories.map( category => {
                                    const breadcrumbs = [
                                        {
                                            title: category.title,
                                            slug: category.slug
                                        } 
                                    ]
                                    return (
                                        <Route 
                                            key={category.id}
                                            exact
                                            path={`/${category.slug}`}
                                            render={
                                                (props) => {
                                                    if(category.slug === '/') { 
                                                        return <SinglePage {...props} slugForUpdate={'home'} metaTitle={category.title} breadcrumbs={null} />
                                                    } 
                                                    return <SinglePage {...props} slugForUpdate={category.slug} metaTitle={category.title} breadcrumbs={breadcrumbs} />
                                                }
                                            }
                                        />  
                                    ) 
                                })
                            }
                            { 
                                categories.map( category => (
                                    category.pages.length > 0 &&
                                    category.pages.map( page => {
                                        const breadcrumbs = [
                                            {
                                                title: category.title,
                                                slug: category.slug
                                            }, 
                                            {
                                                title: page.title,
                                                slug: `${category.slug}/${page.slug}`
                                            }
                                        ]
                                        return(
                                            <Route 
                                                key={page.id}
                                                exact
                                                path={`/${category.slug}/${page.slug}`}
                                                render = {
                                                    (props) => <SinglePage {...props} slugForUpdate={page.slug} metaTitle={page.title} breadcrumbs={breadcrumbs} />
                                                }
                                            />
                                            )
                                    })
                                ))
                            }
            
                            <Route path='/login' render={ () => <Login/> } />

                            <Route path='*' render={ () => <Error/> } />
                            
                        </Switch> 
                    </main>

                    <Footer/>
                </React.Fragment>
            } 
        </Router>
        
    )
}

export default RouterComponent
