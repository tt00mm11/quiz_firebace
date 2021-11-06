//日付けいい感じにするコード
function convertFromFirestoreTimestampToDatetime(timestamp) {
  const _d = timestamp ? new Date(timestamp * 1000) : new Date();
  const Y = _d.getFullYear();
  const m = (_d.getMonth() + 1).toString().padStart(2, '0');
  const d = _d.getDate().toString().padStart(2, '0');
  const H = _d.getHours().toString().padStart(2, '0');
  const i = _d.getMinutes().toString().padStart(2, '0');
  const s = _d.getSeconds().toString().padStart(2, '0');
  return `${Y}/${m}/${d} ${H}:${i}:${s}`;
}

/////////////////////データ処理の下準備 ※自分か使いたい機能を召喚（BYgoogle先生）///////////////////

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.2.0/firebase-app.js";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/9.2.0/firebase-firestore.js";

///////firebeseにあげるときは必ず消す！！！※悪用される可能性あり///////
const firebaseConfig = { 
  apiKey: "AIzaSyBkX6l18l5dgKX38Kx-AGZGkTr4Mi4NNpg",
  authDomain: "firebace-20211104-08.firebaseapp.com",
  projectId: "firebace-20211104-08",
  storageBucket: "firebace-20211104-08.appspot.com",
  messagingSenderId: "403383914429",
  appId: "1:403383914429:web:bd6a7090464d83554f4cd4"
};
////////////////////////////////////////////////////


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);//接続情報をdb(data bese)に保存 dbに対してやりとりができる

export {
  convertFromFirestoreTimestampToDatetime,
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  db,
} 