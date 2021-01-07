import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import { Container, Paper } from '@material-ui/core';

import ModeContext from '../../../context/modeContext/ModeContext'


import HeadingCreator from '../heading/ElementCreator'
import ParagraphCreator from '../paragraph/ElementCreator'
import ParagraphImageCreator from '../paragraphImage/ElementCreator'

function DumbComponent(props) {
 
    const {modeDev} = React.useContext(ModeContext)
  
    const useStyles = makeStyles((theme) => ({
        myClassName: props.classes ,  
        resposiveFontSize: { 
            [`@media (max-width: 960px)`]: { 
                marginTop: props.classes.marginTop*0.8,
                marginBottom: props.classes.marginBottom*0.8
            },
            [`@media (max-width: ${theme.breakpoints.values.sm}px)`]: { 
                marginTop: props.classes.marginTop*0.45,
                marginBottom: props.classes.marginBottom*0.45
            },
        }
      }));
    const classes = useStyles(); 
  
    const classForResp = classes.resposiveFontSize 
 
    return (
        <React.Fragment>
            {
                props.settings.isPaper && 
                <Container  
                    maxWidth={props.settings.maxWidth} 
                    fixed={props.settings.fixed} 
                    disableGutters={props.settings.disableGutters} 
                    className={`${classes.myClassName} ${classForResp}`}
                > 
                    <Paper style={{padding: '0 15px'}}>
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
                        
                    </Paper>
                </Container> 
            }
            {
                !props.settings.isPaper &&  
                <Container  
                        maxWidth={props.settings.maxWidth} 
                        fixed={props.settings.fixed} 
                        disableGutters={props.settings.disableGutters} 
                        className={`${classes.myClassName} ${classForResp}`}
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
                 
            }
            
        </React.Fragment>
    )
}

export default DumbComponent
