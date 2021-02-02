import React from 'react';

import SendFormContext from './SendFormContext'

import firebase from '../../firebase/firebase'

export default class SendFormProvider extends React.Component { 

    state = {   
        requests: [], 
        modalSettings: {}, 
        isAlertSeverity: null,
        alertText: '',
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
    closeAlertFromTimeout(time) {
        setTimeout(() => {
            this.setState({ 
                isAlertSeverity: null,
                alertText: ''
            })
        }, time);
    }

    async sendRequests(req) { 
        

        const newList = this.state.requests.slice()
        const newReq = Object.assign({
            time: this.getCurrentDate()
        }, req)
        newList.push(newReq)
 
        this.setState({  
            isAlertSeverity: 'info',
            alertText: "Your request is being processed"
        })
        
        await firebase.db.collection("site1category").doc('requests').update({
            list: newList, 
        }).then(() => { 
            this.setState({ 
                requests: newList, 
                isAlertSeverity: 'success', 
                alertText: 'Your request was accepted successfully'
            })
            this.closeAlertFromTimeout(7000)

          }).catch( () => {
            this.setState({ 
                isAlertSeverity: 'error', 
                alertText: "An error has occurred :("
            })
            this.closeAlertFromTimeout(700)
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

    setCustomAlert(severity, text, duration) {
        this.setState({  
            isAlertSeverity: severity, 
            alertText: text
        })
        this.closeAlertFromTimeout(duration)
    }

    render() {
        return(
            <SendFormContext.Provider
                value={{
                    requests: this.state.requests, 
                    isShowAlert: this.state.isAlertSeverity, 
                    modalSettings: this.state.modalSettings, 
                    alertText: this.state.alertText, 
                    
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
                            isAlertSeverity: null, 
                            alertText: ''
                        }) 
                    }, 
                    setCustomAlert: (severity, text, duration) => {
                        this.setCustomAlert(severity, text, duration)
                    }
                }}
            >
                {this.props.children}
            </SendFormContext.Provider>
        )
    }
}