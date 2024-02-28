import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {getDatabase, set , ref, get} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getStorage, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZJ2jyPDkLdlrzJ-QAsoYH4XEdEA9FSck",
  authDomain: "abcuyuid.firebaseapp.com",
  projectId: "abcuyuid",
  storageBucket: "abcuyuid.appspot.com",
  messagingSenderId: "943549872927",
  appId: "1:943549872927:web:813cd6acbf83822f618e2a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// store database
const db = getDatabase(app);
//store authentication
const auth = getAuth(app);
console.log(db);

//function to write data
function writeUserData(userId,name,email){
set(ref(db,'users/' + userId),{
  name : name,
  email:email
})
};


writeUserData(1,"Mili","Mili@shandilya.com");

//function to read data

function readData(){
  const userRef = ref(db,'users');
  get(userRef).then((snapshot)=>{
    snapshot.forEach((childrensnapshot)=>{
      console.log(childrensnapshot.val())
    })
  })
}

//readData();

// content selector 
const loginCont = document.querySelector('.login');
const DashBoard = document.getElementById('dashboard');
const BalanceSheet = document.getElementById('BalanceSheet');
// function to signUp user

function signupUser(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  createUserWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
    console.log(userCredentials.user.uid);
    loginCont.style.display = "none";
    DashBoard.style.display = "flex";
    BalanceSheet.style.display = "flex";
  })

}

const SignupBtn = document.getElementById('signup');
SignupBtn.addEventListener("click",signupUser);

//function to logIn

function signInUser(){
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  signInWithEmailAndPassword(auth,email,password).then((userCredentials)=>{
    console.log(userCredentials.user.uid);
    
  })
}

const SignInBtn = document.getElementById('signin');
SignInBtn.addEventListener("click",signInUser);

// Show details while logged in

onAuthStateChanged(auth,(user)=>{
  if(user){
   
   
   loginCont.style.display = "none";
   DashBoard.style.display = "flex";
   BalanceSheet.style.display = "flex";
  }
  else{
    // alert('unable to login');
    console.log('error while logging in');
  }
})

//function to logOut
const sigNOut = document.getElementById('logout');
function signOutUser(){
signOut(auth).then(()=>{
  alert('logged out');
  loginCont.style.display = "flex";
  DashBoard.style.display = "none";
  BalanceSheet.style.display = "none";
})
}

sigNOut.addEventListener("click",signOutUser);

const LockBtn = document.querySelector('.ri-lock-line');
function changeVisibility(){
  const password = document.getElementById('password');
    const passwordInput = document.getElementById('password').value;
    
   
   if (password.type === "password") {
    LockBtn.style.color = "black";
    password.type = "text"; // Show password
} else {
  LockBtn.style.color = "orange";
    password.type = "password"; // Hide password
}
  
}
LockBtn.addEventListener("click",changeVisibility);


