import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import LoadingProgress from '../components/placeholders/LoadingProgress'
import Header from '../components/header/Header'
import AdminHeader from '../components/header/AdminHeader'

import Home from '../components/Home'
import Login from '../components/Login'
import Error from '../components/Error'
import SinglePage from '../components/pages/SinglePage' 

import CategoryContext from '../context/categoryContext/CategoryContext'
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
                    
                    <AdminHeader/>
                    <Header/>

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
                                                return <Home/>
                                            }
                                            //if === concacts => return contacts .... 
                                            return <SinglePage {...props} slugForUpdate={category.slug} />
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
                                            (props) => <SinglePage {...props} slugForUpdate={page.slug} />
                                        }
                                    />
                                )
                            ))
                        }
         
                        <Route path='/login' render={ () => <Login/> } />

                        <Route path='*' render={ () => <Error/> } />
                         
                    </Switch> 
                </React.Fragment>
            } 
        </Router>
    )
}

export default RouterComponent
