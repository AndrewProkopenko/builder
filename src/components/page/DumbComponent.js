import React, { useEffect, useState, useContext} from 'react'
import { useLocation } from 'react-router-dom';
import uuid from 'react-uuid' 
import MetaTags from 'react-meta-tags';

import firebase from '../../firebase/firebase'

import ContainerElement from '../library/container/ElementCreator'  
import MainBannerElement from '../library/mainBanner/ElementCreator'  
import AccordionElement from '../library/accordion/ElementCreator'  
import ContactMapElement from '../library/contactMap/ElementCreator'  
import AboutElement from '../library/about/ElementCreator'  
import ActionLineElement from '../library/actionLine/ElementCreator'  
import TableElement from '../library/table/ElementCreator'  
import FormLineElement from '../library/formLine/ElementCreator'  
import SwiperElement from '../library/swiper/ElementCreator'  
import BannerElement from '../library/banner/ElementCreator'  
import BlocksPagesElement from '../library/blocksPages/ElementCreator'   
import BlocksAdvElement from '../library/blocksAdv/ElementCreator'  

import LoadingContext from '../../context/loadingContext/LoadingContext'
import LibraryContext from '../../context/libraryContext/LibraryContext' 

import SkeletonPage from '../utilits/SkeletonPage'
import Breadcrumbs from '../utilits/Breadcrumbs'

const  DumbComponent = (props) => {
  
    const { setIsLoading } = useContext(LoadingContext)
    const { layouts } = useContext(LibraryContext)
    
    const location = useLocation() 
    const pageSlug = props.slugForUpdate

    // const [data, setData] = useState({})
    const [items, setItems] = useState([]) 
    const [metaTitle, setMetaTitle] = useState('initial')
    const [metaDescription, setMetaDescription] = useState('')

    const pageLayout = layouts.page

    useEffect( () => { 
        setIsLoading(true) 
        fetchData()
        if(metaTitle === 'initial') setMetaTitle(props.metaTitle) 
        // eslint-disable-next-line
    }, [location])
       
      
    const fetchData = async () => {  
        
        const pageRef = firebase.db.collection("site1").doc(pageSlug)
        const doc = await pageRef.get();
        
        if (!doc.exists) {
            console.log('No such page!'); 

            let newPage = Object.assign({}, pageLayout) 
            newPage.id = uuid()
            newPage.slug = pageSlug
            newPage.items = []

            await pageRef.set(newPage)

            // setData(newPage)  
            setItems(newPage.items || [])  
            setIsLoading(false)

        } else { 
            // setData(doc.data())  
            setItems(doc.data().items)  
            setMetaTitle(doc.data().title)
            setMetaDescription(doc.data().description || '')
            
            
            console.log(doc.data().title)

            setIsLoading(false)
        }
    
    }  
    function renderContainers () {   
        if(items.length > 0) {
          return Object.keys(items).map( (key) => {    
            if(items[key].type === 'container') {
              return ( 
                  <ContainerElement 
                    key={items[key].id} 
                    data={items[key]}  
                  /> 
              ) 
            }
            if(items[key].type === 'mainBanner') { 
              return(
                  <MainBannerElement
                    key={items[key].id} 
                    data={items[key]}  
                  />
              )
            } 
            if(items[key].type === 'accordion') { 
              return(
                  <AccordionElement
                    key={items[key].id} 
                    data={items[key]}  
                  />
              )
            } 
            if(items[key].type === 'contactMap') { 
              return(
                  <ContactMapElement
                    key={items[key].id} 
                    data={items[key]}  
                  />
              )
            } 
            if(items[key].type === 'about') { 
              return(
                  <AboutElement
                    key={items[key].id} 
                    data={items[key]}  
                  />
              )
            } 
            if(items[key].type === 'actionLine') { 
              return(
                  <ActionLineElement
                    key={items[key].id} 
                    data={items[key]}  
                  />
              )
            } 
            if(items[key].type === 'table') { 
              return(
                  <TableElement
                    key={items[key].id} 
                    data={items[key]}  
                  />
              )
            } 
            if(items[key].type === 'formLine') { 
              return(
                  <FormLineElement
                    key={items[key].id} 
                    data={items[key]}  
                  />
              )
            } 
            if(items[key].type === 'swiper') { 
              return(
                  <SwiperElement
                    key={items[key].id} 
                    data={items[key]}  
                  />
              )
            } 
            if(items[key].type === 'banner') { 
              return(
                  <BannerElement
                    key={items[key].id} 
                    data={items[key]}  
                  />
              )
            } 
            if(items[key].type === 'blocksPages') { 
              return(
                  <BlocksPagesElement
                    key={items[key].id} 
                    data={items[key]}  
                  />
              )
            } 
            if(items[key].type === 'blocksAdv') { 
              return(
                  <BlocksAdvElement
                    key={items[key].id} 
                    data={items[key]}  
                  />
              )
            } 
            return false
          })
        }
        else {
          return ( 
            <SkeletonPage/> 
          ) 
        }
        
      }


    return (
        <div> 
            <MetaTags>
                <title>{ metaTitle }</title>
                <meta name="description" content={metaDescription} /> 
            </MetaTags>

            { 
                props.breadcrumbs &&
                <Breadcrumbs 
                    breadcrumbs={props.breadcrumbs} 
                />
            } 
            { 
                renderContainers()  
            } 
        </div>
    )
}

export default DumbComponent
