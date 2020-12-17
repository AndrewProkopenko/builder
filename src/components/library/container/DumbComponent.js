import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

import ModeContext from '../../../modeContext/ModeContext'


import HeadingCreator from '../heading/ElementCreator'
import ParagraphCreator from '../paragraph/ElementCreator'
import ParagraphImageCreator from '../paragraphImage/ElementCreator'

function DumbComponent(props) {
 
    const {modeDev} = React.useContext(ModeContext)
  
    const useStyles = makeStyles((theme) => ({
        myClassName: props.classes ,  
      }));
    const classes = useStyles(); 
  
 
    return (
        <React.Fragment>
            <Container  
                maxWidth={props.settings.maxWidth} 
                fixed={props.settings.fixed} 
                disableGutters={props.settings.disableGutters} 
                className={classes.myClassName}
            > 
                {  
                    props.settings.innerContainer && 
                    <Container
                        maxWidth={'lg'}
                        fixed={props.settings.fixed} 
                        disableGutters={props.settings.disableGutters} 
                    >
                        { 
                            modeDev && 
                            props.data.children.map((item) => {   
                                switch(item.type) { 
                                    case 'heading' :  
                                        return ( 
                                            <HeadingCreator 
                                                key={item.id} 
                                                item={item}
                                                reSaveChildren={props.reSaveChildren}
                                                removeItem={props.removeItem}
                                            />
                                        ) 
                                    case 'paragraph' :  
                                        return (
                                            <ParagraphCreator
                                                key={item.id} 
                                                item={item}
                                                reSaveChildren={props.reSaveChildren}
                                                removeItem={props.removeItem}
                                            />
                                        ) 
                                    case 'paragraphImage' :  
                                        return (
                                            <ParagraphImageCreator
                                                key={item.id} 
                                                item={item}
                                                reSaveChildren={props.reSaveChildren}
                                                removeItem={props.removeItem}
                                            />
                                        ) 
                                    default: break;
                                }  
                                return null
                            })
                        }
                        {   !modeDev &&
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
                                    default: break;
                                }  
                                return null
                            })
                        }
                    </Container>
                }
                {  
                    !props.settings.innerContainer && 
                    <React.Fragment>
                        { 
                            modeDev && 
                            props.data.children.map((item) => {   
                                switch(item.type) { 
                                    case 'heading' :  
                                        return ( 
                                            <HeadingCreator 
                                                key={item.id} 
                                                item={item}
                                                reSaveChildren={props.reSaveChildren}
                                                removeItem={props.removeItem}
                                            />
                                        ) 
                                    case 'paragraph' :  
                                        return (
                                            <ParagraphCreator
                                                key={item.id} 
                                                item={item}
                                                reSaveChildren={props.reSaveChildren}
                                                removeItem={props.removeItem}
                                            />
                                        ) 
                                    case 'paragraphImage' :  
                                        return (
                                            <ParagraphImageCreator
                                                key={item.id} 
                                                item={item}
                                                reSaveChildren={props.reSaveChildren}
                                                removeItem={props.removeItem}
                                            />
                                        ) 
                                    default: break;
                                }  
                                return null
                            })
                        }
                        {   !modeDev &&
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
                                    default: break;
                                }  
                                return null
                            })
                        }
                    </React.Fragment>
                }
                
            </Container> 
        </React.Fragment>
    )
}

export default DumbComponent
