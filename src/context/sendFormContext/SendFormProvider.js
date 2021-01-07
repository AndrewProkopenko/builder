import React from 'react';

import SendFormContext from './SendFormContext'

import firebase from '../../firebase/firebase'

export default class SendFormProvider extends React.Component { 

    state = {   
        requests: [], 
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

    async sendRequests(req) { 
        const newList = this.state.requests.slice()
        const newReq = Object.assign({
            time: this.getCurrentDate()
        }, req)
        newList.push(newReq)
 
 
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

    closeAlertFromTimeout() {
        setTimeout(() => {
            this.setState({ 
                isShowAlert: null
            })
        }, 5000);
    }

    async updateRequests(req) {
        await firebase.db.collection("site1category").doc('requests').update({
            list: req, 
        }) 
    }

    render() {
        return(
            <SendFormContext.Provider
                value={{
                    requests: this.state.requests, 
                    isShowAlert: this.state.isShowAlert, 
                    updateRequests: (req) => {
                        this.updateRequests(req)
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