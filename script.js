const Peer = window.Peer;
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
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var database = firebase.database();
var roomId=null;
var localStream;

function geoFindMe(){
    alert("asdf");
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        database.ref('/peers').once('value').then((snapshot) => {
            snapshot=snapshot.val();
            if(snapshot){
            Object.keys(snapshot).forEach(key => {
                const squareDistance = (snapshot[key].x-longitude)**2+(snapshot[key].y-latitude)**2;
                if(squareDistance<=100.00000001)roomId=snapshot[key].roomId;
            });
            }
        }).then(() => {
                if(!roomId){
                    roomId=window.peer.id;
                    database.ref("peers/"+window.peer.id).set({
                        y: latitude,
                        x: longitude,
                        roomId: roomId
                    });
                } else {
                    database.ref("peers/"+window.peer.id).set({
                        y: latitude,
                        x: longitude,
                        roomId: roomId
                    });
                }
                const room = peer.joinRoom(roomId, {
                  mode: 'sfu',
                  stream: localStream,
                });
            });
        alert(window.peer.id);
        alert(latitude+" "+longitude);
      }
    function error(error){
        alert(error.message);
    }
    if(!navigator.geolocation){
        alert("can't use");
    }else{
        navigator.geolocation.getCurrentPosition(success,error);
    }
}

(async function main() {
  localStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
      video: false,
    })
    .catch(console.error);
  const peer = (window.peer = new Peer({
    key: window.__SKYWAY_KEY__,
    debug: 3,
  }));

  peer.on('open',() =>{
    geoFindMe();
  });
  peer.on('error', console.error);
})();
