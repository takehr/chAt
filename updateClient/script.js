window.__SKYWAY_KEY__ = '72be30ae-eee3-402e-a9a5-ee2dfbf5754a';
var firebaseConfig = {
  apiKey: "AIzaSyBhS8D3igzOsis-HGp6qDdCDRrMXk9aJQI",
  authDomain: "chat-d093e.firebaseapp.com",
  projectId: "chat-d093e",
  storageBucket: "chat-d093e.appspot.com",
  messagingSenderId: "292349063184",
  appId: "1:292349063184:web:7a7dc662843b86a8045a95",
  measurementId: "G-3X04WQLG21"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();
var database = firebase.database();
const peer = (window.peer = new Peer({
  key: window.__SKYWAY_KEY__,
  debug: 3,
}));
var intervalId;
var activePeers;
peer.once('open',() =>{
    //listActivePeer -> listDatabase -> inactivepeer=null
    alert("opened");
    peer.listAllPeers((peers) => {
            activePeers = peers;
        });
    intervalId = window.setInterval( () => {
        peer.listAllPeers((peers) => {
                activePeers = peers;
            });
        database.ref('/peers').once('value').then((snapshot) => {
            snapshot=snapshot.val();
            const _snapshot = Object.assign({},snapshot);
            console.log(JSON.stringify(_snapshot));
            Object.keys(snapshot).forEach(key => {
                snapshot[key]=null;
//                console.log(key);
            });
//            console.log(activePeers);
            activePeers.forEach(activePeer => {
                snapshot[activePeer]=_snapshot[activePeer];
                });
//                    if(key!=activePeer){
//                        snapshot[key]=null;
//                        }
            
//            console.log(JSON.parse(JSON.stringify(snapshot)));
            database.ref('/peers').update(JSON.parse(JSON.stringify(snapshot)),error =>{
                console.log(error);
                });
//            database.ref('/peers').update({A3C9hpbQwHutacn6:null});
            });
        },10000);
});

//Uncaught (in promise) Error: Reference.update failed: First argument contains undefined in property 'peers.snapshot.5rzW2qDeTRBC1CWV'












