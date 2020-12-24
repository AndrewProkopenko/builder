import React from 'react'
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Header from '../components/header/Header'

import Home from '../components/Home'
import Error from '../components/Error'
import SinglePage from '../components/pages/SinglePage' 

import CategoryContext from '../context/categoryContext/CategoryContext'

function RouterComponent() {

    const {categories} = React.useContext(CategoryContext)
    
    return (
        <Router>

            <Header/>

            <Switch>
                {
                    categories.length > 0 &&
                    categories.map( category => { 
                        return <Route 
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
                    })
                }
                {
                    categories.length > 0 &&
                    categories.map( category => (
                        category.pages.length > 0 &&
                        category.pages.map( page => {
                             
                            return <Route 
                                key={page.id}
                                exact
                                path={`/${category.slug}/${page.slug}`}
                                render = {
                                    (props) => <SinglePage {...props} slugForUpdate={page.slug} />
                                }
                            />
                        })
                     ) )
                }
 

                {
                    categories.length > 0 &&
                    <Route path='*' render={ () => <Error/> } />
                }
            </Switch> 
        </Router>
    )
}

export default RouterComponent
