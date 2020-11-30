import axios from 'axios' 

const instance = axios.create()

instance.interceptors.response.use( (response) => {
    if (response.data) return response.data
    return response
}, (error) => { 
    return Promise.reject(error.response.data)
})
 

export default instance
 