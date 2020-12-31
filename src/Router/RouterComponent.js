import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
    
import LoadingProgress from '../components/placeholders/LoadingProgress'
import Header from '../components/header/Header' 
import Footer from '../components/footer/Footer' 

// import Home from '../components/Home'
import Login from '../components/Login'
import Error from '../components/Error'
import SinglePage from '../components/pages/SinglePage' 

import CategoryContext from '../context/headerContext/CategoryContext'
import LoadingContext from '../context/loadingContext/LoadingContext'   

function RouterComponent() {

    const {categories} = React.useContext(CategoryContext) 
    const {isLoading} = React.useContext(LoadingContext)  

  
    return (   
        <Router basename="builder"> 
            {
                isLoading && 
                <LoadingProgress/>
            }
            {
                categories.length > 0 &&
                <React.Fragment>
                     
                    <Header/>

                    <main>
                    <Switch>
                        { 
                            categories.map( category => 
                                <Route 
                                    key={category.id}
                                    exact
                                    path={`/${category.slug}`}
                                    render={
                                        (props) => {
                                            if(category.slug === '/') { 
                                                return <SinglePage {...props} slugForUpdate={'home'} metaTitle={category.title} />
                                            }
                                            //if === concacts => return contacts .... 
                                            return <SinglePage {...props} slugForUpdate={category.slug} metaTitle={category.title} />
                                        }
                                    }
                                />   
                                
                            )
                        }
                        { 
                            categories.map( category => (
                                category.pages.length > 0 &&
                                category.pages.map( page => 
                                    <Route 
                                        key={page.id}
                                        exact
                                        path={`/${category.slug}/${page.slug}`}
                                        render = {
                                            (props) => <SinglePage {...props} slugForUpdate={page.slug} metaTitle={page.title} />
                                        }
                                    />
                                )
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
