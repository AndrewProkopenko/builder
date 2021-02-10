import React, {useContext} from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';

import ModeContext from '../../../context/modeContext/ModeContext'
  
import HeadingCreator from '../heading/ElementCreator'
import ListCreator from '../list/ElementCreator'
import ParagraphCreator from '../paragraph/ElementCreator'
import ParagraphImageCreator from '../paragraphImage/ElementCreator'

import {getColorByPalette} from '../../functions/colorChanger/ColorCalculation'

function DumbComponent(props) { 

    const {modeDev} = useContext(ModeContext)
 
    console.log('dumb container work') 
  
    const useStyles = makeStyles((theme) => {
        let  color = getColorByPalette(theme, props.classes.color)
        let  backgroundColor = getColorByPalette(theme, props.classes.backgroundColor)
        let  borderColor = getColorByPalette(theme, props.classes.borderColor)

        function computedContrastColor() {
            if(color !== 'contrast') return color
            if(backgroundColor !== 'inherit') return theme.palette.getContrastText(backgroundColor)
            return color
        }
        return({
             myClassName: {...props.classes, ...{
                color: computedContrastColor(),  
                backgroundColor: backgroundColor, 
                borderColor: borderColor 
            }} ,   
            styleClass: { 
                // marginLeft: props.settings.innerContainer === props.settings.maxWidth ? '20px' : '0',
                // marginRight: props.settings.innerContainer === props.settings.maxWidth ? '20px' : '0',
                [`@media (max-width: 960px)`]: { 
                    marginTop: props.classes.marginTop*0.8,
                    marginBottom: props.classes.marginBottom*0.8, 
                    paddingTop: props.classes.paddingTop*0.8,
                    paddingBottom: props.classes.paddingBottom*0.8,
                },
                [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: { 
                    marginTop: props.classes.marginTop*0.5,
                    marginBottom: props.classes.marginBottom*0.5,  
                    paddingTop: props.classes.paddingTop*0.5,
                    paddingBottom: props.classes.paddingBottom*0.5,
                },
            }, 
            paddingContainer: {
                paddingLeft: 16,
                paddingRight: 16,
                [theme.breakpoints.up('sm')]: {
                    paddingLeft: 24,
                    paddingRight: 24,
                }
            }
        })
    });
    const classes = useStyles(); 
 
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
            props.settings.innerContainer ? 
            <Container  
                maxWidth={props.settings.maxWidth} 
                fixed={props.settings.fixed} 
                disableGutters={props.settings.disableGutters} 
                className={`${classes.myClassName} ${classes.styleClass}  `} 
            >  
                <Container
                    maxWidth={props.settings.innerContainer}
                    fixed={props.settings.fixed} 
                    disableGutters={props.settings.disableGutters}  
                    // className={`${classes.myClassName} ${classes.styleClass}  `} 
                >
                        { renderItems() }
                </Container>
             
            </Container> 
            :
            <Container  
                maxWidth={props.settings.maxWidth} 
                fixed={props.settings.fixed} 
                disableGutters={props.settings.disableGutters}  
            >  
                <Box className={`${classes.myClassName} ${classes.styleClass} ${classes.paddingContainer} `} >
                        { renderItems() }
                </Box> 
            </Container> 
          
    )
}

export default DumbComponent
