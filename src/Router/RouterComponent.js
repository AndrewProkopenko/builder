import React from 'react'

import { useTheme } from '@material-ui/core/styles';

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import ScrollToTop from '../components/ScrollToTop'

import StylesChangers from '../styles/changers'
    
import LoadingProgress from '../components/placeholders/LoadingProgress'
import Header from '../components/header/Header' 
import Footer from '../components/footer/Footer' 
 
import Login from '../components/Login'
import Error from '../components/Error'
import SinglePage from '../components/pages/SinglePage' 

import CategoryContext from '../context/headerContext/CategoryContext'
import LoadingContext from '../context/loadingContext/LoadingContext'   

function RouterComponent() {

    const {categories} = React.useContext(CategoryContext) 
    const {isLoading} = React.useContext(LoadingContext)  

    // const theme = useTheme();

    // const cls = StylesChangers(theme)

    // console.log(cls(theme))


    return (   
        <Router basename="builder"> 
        
            <ScrollToTop/>
            
            { isLoading && <LoadingProgress/> }
            
            {
                categories.length > 0 &&
                <React.Fragment>
                     
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
                                                    //if === concacts => return contacts .... 
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
