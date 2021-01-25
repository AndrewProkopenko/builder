import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core';

import ModeContext from '../../../context/modeContext/ModeContext'


import HeadingCreator from '../heading/ElementCreator'
import ListCreator from '../list/ElementCreator'
import ParagraphCreator from '../paragraph/ElementCreator'
import ParagraphImageCreator from '../paragraphImage/ElementCreator'

function DumbComponent(props) {
 
    const {modeDev} = React.useContext(ModeContext)
 
    console.log('dumb container work')
  
    const useStyles = makeStyles((theme) => ({
        myClassName: props.classes ,   
        styleClass: { 
            [`@media (max-width: 960px)`]: { 
                marginTop: props.classes.marginTop*0.8,
                marginBottom: props.classes.marginBottom*0.8, 
            },
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: { 
                marginTop: props.classes.marginTop*0.5,
                marginBottom: props.classes.marginBottom*0.5,  
            },
        },
        noPadding : { 
            paddingTop: 0,  
            paddingBottom: 0,
            [`@media (max-width: 960px)`]: {  
                paddingTop: 0,
                paddingBottom: 0,
            },
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {  
                paddingTop: 0,
                paddingBottom: 0,
            },
        },
        yesPadding : { 
            paddingTop: props.classes.paddingTop,  
            paddingBottom: props.classes.paddingBottom,
            [`@media (max-width: 960px)`]: {  
                paddingTop: props.classes.paddingTop*0.8,
                paddingBottom: props.classes.paddingBottom*0.8,
            },
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: {  
                paddingTop: props.classes.paddingTop*0.5,
                paddingBottom: props.classes.paddingBottom*0.5,
            },
        },
        noPaper: {

        }
      }));
    const classes = useStyles(); 

    const isPaperClassForContainer = props.settings.isPaper ? classes.noPadding : classes.yesPadding
    const isPaperClassForPaper = props.settings.isPaper ? classes.yesPadding : classes.noPadding
   
 
      

    const renderItems = () => { 
        return (
            modeDev ?
            props.data.children.map((item) => {   
                // eslint-disable-next-line
                let orderFirst = props.data.children.indexOf(item) == 0 ? true : false
                // eslint-disable-next-line
                let orderLast = props.data.children.indexOf(item) == props.data.children.length - 1 ? true : false

                switch(item.type) { 
                    case 'heading' :  
                        return ( 
                            <HeadingCreator 
                                key={item.id} 
                                item={item}
                                reSaveChildren={props.reSaveChildren}
                                removeItem={props.removeItem}
                                swapChildrens={props.swapChildrens} 
                                isFirst={orderFirst}
                                isLast={orderLast}
                            />
                        ) 
                    case 'paragraph' :  
                        return (
                            <ParagraphCreator
                                key={item.id} 
                                item={item}
                                reSaveChildren={props.reSaveChildren}
                                removeItem={props.removeItem}
                                swapChildrens={props.swapChildrens}
                                isFirst={orderFirst}
                                isLast={orderLast}
                            />
                        ) 
                    case 'paragraphImage' :  
                        return (
                            <ParagraphImageCreator
                                key={item.id} 
                                item={item}
                                reSaveChildren={props.reSaveChildren}
                                removeItem={props.removeItem}
                                swapChildrens={props.swapChildrens}
                                isFirst={orderFirst}
                                isLast={orderLast}
                            />
                        )
                    case 'list' :  
                        return (
                            <ListCreator
                                key={item.id} 
                                item={item}
                                reSaveChildren={props.reSaveChildren}
                                removeItem={props.removeItem}
                                swapChildrens={props.swapChildrens}
                                isFirst={orderFirst}
                                isLast={orderLast}
                            />
                        )  
                    default: break;
                }  
                return null
            })
            :
            props.data.children.map((item) => {  
                switch(item.type) { 
                    case 'heading' :  
                        return ( 
                            <HeadingCreator 
                                key={item.id} 
                                item={item} 
                            />
                        ) 
                    case 'paragraph' :  
                        return (
                            <ParagraphCreator
                                key={item.id} 
                                item={item} 
                            />
                        ) 
                    case 'paragraphImage' :  
                        return (
                            <ParagraphImageCreator
                                key={item.id} 
                                item={item} 
                            />
                        ) 
                    case 'list' :  
                        return (
                            <ListCreator
                                key={item.id} 
                                item={item} 
                            />
                        ) 
                    default: break;
                }  
                return null
            }) 
        )
    }
    return (
        <React.Fragment>
            {
                props.settings.isPaper && 
                <Container  
                    maxWidth={props.settings.maxWidth} 
                    fixed={props.settings.fixed} 
                    disableGutters={props.settings.disableGutters} 
                    className={`${classes.myClassName} ${classes.styleClass} ${isPaperClassForContainer}`}
                > 
                    <Paper style={{paddingLeft: 15, paddingRight: 15}} className={isPaperClassForPaper}>
                        {  
                            props.settings.innerContainer && 
                            <Container
                                maxWidth={'lg'}
                                fixed={props.settings.fixed} 
                                disableGutters={props.settings.disableGutters} 
                            >
                                { renderItems() }
                            </Container>
                        }
                        {  
                            !props.settings.innerContainer && 
                            <React.Fragment>
                                 { renderItems() }
                            </React.Fragment>
                        }
                        
                    </Paper>
                </Container> 
            }
            {
                !props.settings.isPaper &&  
                <Container  
                        maxWidth={props.settings.maxWidth} 
                        fixed={props.settings.fixed} 
                        disableGutters={props.settings.disableGutters} 
                        className={`${classes.myClassName} ${classes.styleClass} ${isPaperClassForContainer}`}
                    > 
                        {  
                            props.settings.innerContainer && 
                            <Container
                                maxWidth={'lg'}
                                fixed={props.settings.fixed} 
                                disableGutters={props.settings.disableGutters} 
                            >
                                 { renderItems() }
                            </Container>
                        }
                        {  
                            !props.settings.innerContainer && 
                            <React.Fragment>
                                 { renderItems() }
                            </React.Fragment>
                        }
                        
                    </Container> 
                 
            }
            
        </React.Fragment>
    )
}

export default DumbComponent
