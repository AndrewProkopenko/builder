import React from 'react';

import SendFormContext from './SendFormContext'

import firebase from '../../firebase/firebase'

export default class SendFormProvider extends React.Component { 

    state = {   
        requests: [], 
        modalSettings: {}, 
        isShowAlert: null,
    }

    async componentDidMount() {
        const requestsRef = firebase.db.collection("site1category").doc('requests')
        const doc = await requestsRef.get(); 

        if (!doc.exists) {
            console.log('No such requests!'); 
        } 
        else { 
            this.setState({
                requests: doc.data().list, 
                modalSettings: doc.data().modalSettings, 
            }) 
        } 
    }
    getCurrentDate() { 
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let hour = newDate.getHours();
        let minute = newDate.getMinutes();
        let second = newDate.getSeconds();
        
        return `${year}/${month<10?`0${month}`:`${month}`}/${date}; ${hour}:${minute}:${second}`
    }
    closeAlertFromTimeout() {
        setTimeout(() => {
            this.setState({ 
                isShowAlert: null
            })
        }, 7000);
    }

    async sendRequests(req) { 
        

        const newList = this.state.requests.slice()
        const newReq = Object.assign({
            time: this.getCurrentDate()
        }, req)
        newList.push(newReq)
 
        this.setState({  
            isShowAlert: 'info'
        })
        
        await firebase.db.collection("site1category").doc('requests').update({
            list: newList, 
        }).then(() => { 
            this.setState({ 
                requests: newList, 
                isShowAlert: 'success'
            })
            this.closeAlertFromTimeout()

          }).catch( () => {
            this.setState({ 
                isShowAlert: 'error'
            })
            this.closeAlertFromTimeout()
          })
    }
 
    async updateRequests(req) {
        await firebase.db.collection("site1category").doc('requests').update({
            list: req, 
        }) 
    }
    
    async updateModalSettings(settings) {
        this.setState({
            modalSettings: settings
        })
        await firebase.db.collection("site1category").doc('requests').update({
            modalSettings: settings, 
        }) 
    }

    render() {
        return(
            <SendFormContext.Provider
                value={{
                    requests: this.state.requests, 
                    isShowAlert: this.state.isShowAlert, 
                    modalSettings: this.state.modalSettings, 
                    
                    updateRequests: (req) => {
                        this.updateRequests(req)
                    },
                    updateModalSettings: (settings) => {
                        this.updateModalSettings(settings)
                    },
                    sendRequests: (req) => {
                        this.sendRequests(req)
                    },
                    closeAlert: () => {
                        this.setState({
                            isShowAlert: null
                        })

                    }
                }}
            >
                {this.props.children}
            </SendFormContext.Provider>
        )
    }
}