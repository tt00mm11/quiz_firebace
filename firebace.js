//日付けいい感じ
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

/////////////////////データ処理の下準備///////////////////

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

const firebaseConfig = { 
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);//接続情報をdbに保存 dbに対してデータの追加や取得ができる

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