import firebase from 'firebase'

// import dataJson from '../data/db.json'
 
const firebaseConfig = {
    apiKey: "AIzaSyBmMnCcIyz_t3G5Ia3zaiiMTLtQyrUt1Eg",
    authDomain: "sitebuilder-74d57.firebaseapp.com",
    projectId: "sitebuilder-74d57",
    storageBucket: "sitebuilder-74d57.appspot.com",
    messagingSenderId: "590275119909",
    appId: "1:590275119909:web:5d50bcbd54a317647428cc"
}; 

const dataJson = {
    "title": "Page 1 Title",
    "children": [
      {
        "id": "27ff711-b10-c22e-e00b-2d107ba81883",
        "type": "heading",
        "variant": "h1",
        "responseFont": true,
        "classes": {
          "display": "block",
          "paddingTop": 0,
          "paddingBottom": 0,
          "paddingLeft": 0,
          "paddingRight": 0,
          "marginTop": 0,
          "marginBottom": 15,
          "marginLeft": 0,
          "marginRight": 0,
          "color": "#161616",
          "backgroundColor": "#ffffff",
          "textAlign": "center",
          "fontSize": 25,
          "fontWeight": 300,
          "lineHeight": 1.43
        },
        "text": "Main Title of <b>Page</b>",
        "prop": {}
      },
      {
        "id": "6742bff-a65b-eecf-ae85-8eb7fc035eca",
        "type": "paragraph",
        "variant": "p",
        "classes": {
          "display": "block",
          "paddingTop": 0,
          "paddingBottom": 0,
          "paddingLeft": 0,
          "paddingRight": 0,
          "marginTop": 0,
          "marginBottom": 16,
          "marginLeft": 0,
          "marginRight": 0,
          "color": "#141414",
          "backgroundColor": "transparent",
          "textAlign": "left",
          "fontSize": 14,
          "fontWeight": 400,
          "lineHeight": 1.4,
          "borderColor": "transperent",
          "borderStyle": "solid",
          "borderRadius": "0px",
          "borderWidth": "0px"
        },
        "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste veritatis in optio incidunt, nobis beatae molestiae, ea soluta facilis maxime quis officia at quaerat, ipsam architecto excepturi! Voluptas inventore explicabo quidem non blanditiis repellat laboriosam magni. Ullam deserunt dolorem labore eum corrupti quae impedit cumque?",
        "prop": {}
      },
      {
        "id": "1fb643-5b8a-4e3b-307a-30afae3144",
        "type": "heading",
        "variant": "h3",
        "classes": {
          "display": "block",
          "paddingTop": 0,
          "paddingBottom": 0,
          "paddingLeft": 0,
          "paddingRight": 0,
          "marginTop": 0,
          "marginBottom": 5,
          "marginLeft": 0,
          "marginRight": 0,
          "color": "inherit",
          "backgroundColor": "transparent",
          "textAlign": "left",
          "fontSize": 14,
          "fontWeight": 700,
          "lineHeight": 1.43
        },
        "text": "Second heading with <i> italic </i>",
        "prop": {},
        "responseFont": false
      },
      {
        "id": "4e070d3-bfee-da-28cc-652a6ab50cff",
        "type": "paragraph",
        "variant": "p",
        "classes": {
          "display": "block",
          "paddingTop": 12,
          "paddingBottom": 12,
          "paddingLeft": 12,
          "paddingRight": 12,
          "marginTop": 0,
          "marginBottom": 8,
          "marginLeft": 0,
          "marginRight": 0,
          "color": "#11d801",
          "backgroundColor": "#fcfff4",
          "textAlign": "left",
          "fontSize": 14,
          "fontWeight": 700,
          "lineHeight": 1.4,
          "borderColor": "#cdff91",
          "borderStyle": "solid",
          "borderRadius": 8,
          "borderWidth": 3
        },
        "text": "Paragraph Block with text and green colors and border ",
        "prop": {}
      },
      {
        "id": "c7c14e3-801b-e011-67b5-58f84381a6f5",
        "type": "paragraphImage",
        "variant": "p",
        "image": {
          "url": "https://panor.ru/img/default/category.png",
          "classes": {
            "marginTop": 0,
            "marginRight": 8,
            "width": 40,
            "height": 40,
            "borderWidth": "0px",
            "borderRadius": 100,
            "borderColor": "inherit",
            "borderStyle": "none",
            "float": "none"
          },
          "title": "title",
          "placement": "top"
        },
        "classes": {
          "display": "flex",
          "paddingTop": 0,
          "paddingBottom": 0,
          "paddingLeft": 0,
          "paddingRight": 0,
          "marginTop": 0,
          "marginBottom": 30,
          "marginLeft": 0,
          "marginRight": 0,
          "color": "inherit",
          "backgroundColor": "transparent",
          "textAlign": "left",
          "fontSize": 14,
          "fontWeight": 400,
          "lineHeight": 1.4,
          "borderColor": "inherit",
          "borderStyle": "none",
          "borderRadius": "0px",
          "borderWidth": "0px"
        },
        "text": "Paragraph  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste veritatis in optio incidunt, nobis beatae molestiae, ea soluta facilis maxime quis officia at quaerat, ipsam architecto excepturi! Voluptas inventore explicabo quidem non blanditiis repellat laboriosam magni. Ullam deserunt dolorem labore eum corrupti quae impedit cumque? Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste veritatis in optio incidunt, nobis beatae molestiae, ea soluta facilis maxime quis officia at quaerat, ipsam architecto excepturi! Voluptas inventore explicabo quidem non blanditiis repellat laboriosam magni. Ullam deserunt dolorem labore eum corrupti quae impedit cumque?",
        "prop": {}
      }, 
      {
        "id": "344e26a-b5ef-ba6c-7035-24faee7a28",
        "type": "paragraphImage",
        "variant": "p",
        "image": {
          "url": "https://panor.ru/img/default/category.png",
          "title": "5",
          "placement": "top",
          "classes": {
            "width": 100,
            "height": 100,
            "borderWitdh": 0,
            "borderRadius": 0,
            "borderColor": "inherit",
            "borderStyle": "none",
            "float": "none"
          }
        },
        "classes": {
          "display": "flex",
          "paddingTop": 0,
          "paddingBottom": 0,
          "paddingLeft": 0,
          "paddingRight": 0,
          "marginTop": 0,
          "marginBottom": 8,
          "marginLeft": 0,
          "marginRight": 0,
          "color": "inherit",
          "backgroundColor": "transparent",
          "textAlign": "left",
          "fontSize": 14,
          "fontWeight": 400,
          "lineHeight": 1.4,
          "borderColor": "inherit",
          "borderStyle": "none",
          "borderRadius": "0px",
          "borderWidth": "0px"
        },
        "text": "Paragraph with Image",
        "prop": {}
      },
      {
        "id": "c80bac-4fad-ccb-f10b-d7210b5caa",
        "type": "paragraph",
        "variant": "p",
        "classes": {
          "display": "block",
          "paddingTop": 0,
          "paddingBottom": 0,
          "paddingLeft": 0,
          "paddingRight": 0,
          "marginTop": 0,
          "marginBottom": 8,
          "marginLeft": 0,
          "marginRight": 0,
          "color": "inherit",
          "backgroundColor": "transparent",
          "textAlign": "left",
          "fontSize": 14,
          "fontWeight": 400,
          "lineHeight": 1.4,
          "borderColor": "inherit",
          "borderStyle": "none",
          "borderRadius": "0px",
          "borderWidth": "0px"
        },
        "text": "Paragraph <strong>With Strong Text</strong>",
        "prop": {}
      }
    ]
  }

class Firebase { 
    constructor() {
        const firebaseApp =  firebase.initializeApp(firebaseConfig)
        this.db = firebaseApp.firestore()
        console.log("constructor")
    } 
    
    async test() {
        return this.db.collection('site1').doc('page1').set(dataJson)
    } 
    // async getTest() { 
    //     const citiesRef = this.db.collection("test");
    //     const snapshot = await citiesRef.get();

    //     if (snapshot.empty) {
    //         console.log('No matching documents.');
    //         return;
    //       }  
    //     snapshot.forEach(doc => {
    //         console.log(doc.id, '=>', doc.data());
    //     });
        
    // } 
     
}

// .collection('test') - имя сайта (site1, site2)
// .doc() - имя документа для обозначения страницы (можно использовать дефолтные, но тогда нужно передавать какую именно страницу обновляем )


// firebase.initializeApp(firebaseConfig)

// const db = firebase.firestore()

// export default db 


export default new Firebase()