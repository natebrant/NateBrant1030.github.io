// Import the functions you need from the SDKs you need
// https://firebase.google.com/docs/web/alt-setup fixed mimi type error thing
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";


import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-database.js";

localStorage.account;

// with will set ther server to the server they are in no matter that page is
try {
    server = setserver(document.URL.split("?server=")[1])
} catch {
    var server = null;
}
// if loged in then make sigh in button say that you are

try {
    document.getElementById("account").innerHTML = JSON.parse(localStorage.account).user;
} catch {
    try {
        document.getElementById("account").innerHTML = "Sign/Log in";
    } catch {

    }
}

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

function makeServer() {
    // num go to servers postcount
    const db = getDatabase(app);
    const num = ref(db, "servers/" + server + "/");
    try {
        // console.log(document.getElementById("img").value)
        var server = document.getElementById("serverName").value
    } catch {}
    try {
        if (document.getElementById("img").value == "") {
            var img = "https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1410400/rubber-duck-clipart-xl.png"

        }
    } catch { console.log("No data available2"); }
    get((db, num)).then((snapshot) => {
        console.log("makeing server2")
            // gets value of post counts
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
            set(ref(db, "servers/" + server + "/postcount/"), {
                // add name and message to it
                nums: 1,
                server: server,
                img: img

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
        console.log("name: ", name)
        console.log("message: ", message)
        set(ref(db, "servers/" + server + "/" + "message" + nums.nums + "/"), {
            // add name and message to it
            name: name,
            message: message,

        });
        location.href = 'chat.html' + "?server=" + server
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
            d.id = "servers";
            d.className = "item";
            var i = document.createElement('img');
            //  this make it so that when you click on it it will set you server to the name of that you clicked on
            i.src = servs.postcount.img
                // adds the server name to the div
            try{
            document.getElementById("serverName").appendChild(d);}
            catch{       }
            d.addEventListener("click", function() {
                server = servs.postcount.server
                    // console.log(server)
                location.href = 'chat.html' + "?server=" + server
                    // loadchat(server)
            })

            i.id = "server";
            i.className = "images";
            d.appendChild(i);
            var chat = document.createElement("div")
            chat.innerHTML = servs.postcount.server;
            d.appendChild(chat)

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
            // console.log("the chat",chat)
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

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function makeAccount() {
    // num go to servers postcount
    console.log("makeing accout")
    const db = getDatabase(app);

    const users = ref(db, "users/" + document.getElementById("sName").value + "/");
    console.log(document.getElementById("sName").value)
    try{
        if(document.getElementById("sName").value==""||document.getElementById("sUName").value==""||document.getElementById("sEmail").value==""||document.getElementById("sPassword").value==""||document.getElementById("sPassword2").value==""){
            alert("fill in all felds please.")
        }else{
        if (document.getElementById("sPassword").value == document.getElementById("sPassword").value) {
            var pass = document.getElementById("sPassword").value
    } else {
        // stop
    }
    get((db, users)).then((snapshot) => {
        // gets value of post counts
        const nums = snapshot.val();
        set(users, {
            // sets it to itself +1
            name: document.getElementById("sName").value,
            user: document.getElementById("sUName").value,
            email: document.getElementById("sEmail").value,
            password: pass
            
            
        });
        
    });
        }}
catch (err) {}
    // location.href = 'account.html'
}

function login() {
    // num go to servers postcount
    console.log("logging in...");
    
    try{
        const users = ref(db, "users/");
        const db = getDatabase(app);
        if(document.getElementById("lName").value==""||document.getElementById("lPass").value==""){
            alert("fill in all felds please.")
        }else{
    console.log(document.getElementById("sName").value)

    get((db, users)).then((snapshot) => {
        snapshot.forEach(snap => {
            // loops through all servers
            const user = snap.val();
            // makes a div to add to the server list that gos to the server name in the file and sets it to it htlm\
            console.log(user)
            if (user.user == document.getElementById("lName").value && user.password == document.getElementById("lPass").value || user.email == document.getElementById("lName").value && user.password == document.getElementById("lPass").value) {
                localStorage.account = JSON.stringify(user)

                location.href = "index.html"
            }
        });


    })}}
    catch (error) {}

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

    document.getElementById("send").onclick = function() {
        writeUserData(JSON.parse(localStorage.account).user, document.getElementById("chat").value)
    };
} catch (error) {

}

try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("test").onclick = function() { console.log(JSON.parse(localStorage.account).user) };
} catch (error) {

}

try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("createServer").onclick = function() { makeServer() };
} catch (error) {

}
try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("signUp").onclick = function() { makeAccount() };
} catch (error) {

}
try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("login").onclick = function() { login() };
} catch (error) {

}
try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("create").onclick = function() { openForm() };
} catch (error) {

}
try {
    // writeUserData(prompt("name"), prompt("message"));
    document.getElementById("close").onclick = function() { closeForm() };
} catch (error) {

}