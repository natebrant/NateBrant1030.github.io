// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/alt-setup fixed mimi type error thing
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";


import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";


// with will set ther server to the server they are in no matter that page is
try {
    server = setserver(document.URL.split("?server=")[1])
} catch {
    var server = null;
}

var varurl = document.URL;

// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// TODO make it do key is hidden and anyone can change it
const firebaseConfig = {

    apiKey: "AIzaSyA271Df-tIENFDdLDMpIWe9Mf5xrMqNdQs",

    authDomain: "chatserver-f1e72.firebaseapp.com",

    databaseURL: "https://chatserver-f1e72-default-rtdb.firebaseio.com",

    projectId: "chatserver-f1e72",

    storageBucket: "chatserver-f1e72.appspot.com",

    messagingSenderId: "383480029882",

    appId: "1:383480029882:web:4b3ab17f74440aac8a9883",

    measurementId: "G-GRDQ5EJB9B"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

function makeServer(server) {
    // num go to servers postcount
    const db = getDatabase(app);
    const num = ref(db, "servers/" + server + "/");
    get((db, num)).then((snapshot) => {
        // gets value of post counts
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
            set(ref(db, "servers/" + server + "/postcount/"), {
                // add name and message to it
                nums: 1,
                server: server

            });
        }
        location.href = 'index.html'
        loadservers()
    })
}
// function to write a chat to a server
function writeUserData(name, message) {
    // num go to servers postcount
    const db = getDatabase(app);
    const num = ref(db, "servers/" + server + "/postcount/");
    get((db, num)).then((snapshot) => {
        // gets value of post counts
        console.log(snapshot.val());
        const nums = snapshot.val();
        set(num, {
            // sets it to itself +1
            nums: nums.nums += 1,
            server: server

        });
        // go to the server then the postcount file 
        set(ref(db, "servers/" + server + "/" + "message" + nums.nums + "/"), {
            // add name and message to it
            name: name,
            message: message,

        });

    })
}

function loadservers() {
    const db = getDatabase(app);
    const serv = ref(db, "servers/");

    get((db, serv)).then((snapshot) => {
        snapshot.forEach(snap => {
            // loops through all servers
            const servs = snap.val();
            // makes a div to add to the server list that gos to the server name in the file and sets it to it htlm
            var d = document.createElement('div');
            d.id = "server";
            d.className = "item";
            //  this make it so that when you click on it it will set you server to the name of that you clicked on
            d.addEventListener("click", function() {
                server = servs.postcount.server
                    // console.log(server)
                location.href = 'chat.html' + "?server=" + server
                    // loadchat(server)
            })

            d.innerHTML = servs.postcount.server;

            try {

                document.getElementById('main').appendChild(d);
            } catch (error) {

            }
        });


    })

}

function loadchat() {
    const db = getDatabase(app);
    const num = ref(db, "servers/" + server);
    console.log("server:", server);

    try {

        document.getElementById('toSend').innerHTML = " "
    } catch (error) {
        console.log(error);
    }

    get((db, num)).then((snapshot) => {

        snapshot.forEach(snap => {
            // loops through all servers
            // console.log(snap.val())
            const chat = snap.val();
            // makes a div to add to the cant list that gos to the chay name in the file and sets it to it htlm
            var user = document.createElement('div');
            user.id = "server";
            user.className = "chat";
            // d.addEventListener("click", function() {
            var userChat = document.createElement('div');

            user.innerHTML = chat.name;
            userChat.innerHTML = chat.message;
            user.appendChild(userChat);


            try {
                if (chat.name != null || chat.message != null) {

                    document.getElementById("toSend").appendChild(user);
                }
            } catch {
                console.log("error", chat.name + ": " + chat.message)

            }
        });



    })

}

function setserver(search) {
    var search = search
    if (search != undefined) {
        search = decodeURI(search)
            // console.log(search)
        return search

    }
}



// makeServer(server)
// loadservers()
// makeServer(prompt("server name"))
// function that waits for update to the firebase and updates file if there is one 
// loadchat()
const db = getDatabase(app);
const data = ref(db, "servers/" + server + "/");
onValue(data, (snapshot) => {
    const data = snapshot.val();
    if (server == null) {
        loadservers()
    } else {
        loadchat()

    }
});















// const firebase_node = ref(db, server + "/");
// firebase_node.once('value', function(snapshot) { alert('Count: ' + snapshot.numChildren()); });
// console.log("working");
try {
    // writeUserData(prompt("name"), prompt("message"));

    try {
        console.log("chat: ", document.getElementById("chat").innerHTML)
        var msg = document.getElementById("message").innerHTML
    } catch (error) {
        var msg = null;
    }
    document.getElementById("send").onclick = function() { writeUserData(prompt("name"), msg);
        location.href = 'chat.html' + "?server=" + server };
} catch (error) {

}

try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("test").onclick = function() { writeUserData(prompt("name"), prompt("message")) };
} catch (error) {

}
try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("create").onclick = function() { makeServer(prompt("name")) };
} catch (error) {

}