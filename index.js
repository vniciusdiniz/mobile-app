import  { initializeApp }   from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import  { getDatabase, ref, push, onValue, remove }  from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

// import { add } from "./function.js";
const appSettings = {
    databaseURL: "https://realtime-database-d540c-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app       = initializeApp(appSettings)
const database  = getDatabase(app)
const itemsInDB = ref(database, "items")

const inputEl   = document.querySelector("#input-field")
const buttonEl  = document.querySelector("#add-button")
const listEl    = document.querySelector("#shopping-list")


onValue(itemsInDB, function(snapshot){
    clearlistEl();
    if(snapshot.exists()){
        let itemsArray = Object.entries(snapshot.val());
    
        
        for (let item of itemsArray){
            let currentItemID = item[0] 
            let currentItemValue = item[1]
    
            appendItemToShoppingListEl(item)
        }
    }
});

inputEl.addEventListener("keydown", (e) => {
    if ( e.key === "Enter"){
        let inputValue = inputEl.value;
        push(itemsInDB, inputValue);
        clearInputFieldEl()
    }
})

buttonEl.addEventListener("click", () => {
    let inputValue = inputEl.value;
    push(itemsInDB, inputValue);
    clearInputFieldEl()
})

let clearlistEl = () => {
    listEl.innerHTML = ""
}

let clearInputFieldEl = () => {
    inputEl.value = ""
}

function appendItemToShoppingListEl(item) {
    // listEl.innerHTML += `<li>${itemValue}</li>`
    let newEl = document.createElement("li")
    newEl.textContent = item[1]
    newEl.addEventListener("dblclick", () => {
        let itemDBlocation = ref ( database, `items/${item[0]}`)
        remove(itemDBlocation)

    })
    listEl.append(newEl)
}