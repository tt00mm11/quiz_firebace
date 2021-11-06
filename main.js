import {
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
} from './firebace.js'

//////////////////////データの取得処理//////////////////////////

// 時間の新しい順に並び替えてconst qに取得（代入）//　db,"firebace_quiz"はフォルダ
const q = query(collection(db, "firebace_quiz"), orderBy("time", "desc"));


//定義
let nigiyaka_point = 0;
let hutuu_point = 0;
let sizuka_point = 0;
////////////////////////JSクイズ動作/////////////////////////////


$("#question_number").text(`第 ${nigiyaka_point + 
  hutuu_point +sizuka_point +1} 問`)
  
  const quiz =[
    {//問題
      question: "今日は元気ですか？",//問題文
      answers: ["はい", "まあまあ","いいえ"],//選択肢
      correct: 1//あってる番号（左から順番）
    },
    {//問題
      question: "今日食べたものは？",//問題文
      answers: ["洋食", "中華", "和食"],//選択肢
      correct: 0,//あってる番号（左から順番）
    },
    {//問題
      question: "今日話した人数は？",//問題文
      answers: ["11〜50人", "6~10人", "0~5人"],//選択肢
      correct: 2,//あってる番号（左から順番）
    },
    {//問題
      question: "今日はどうでしたか？",//問題文
      answers: ["日記書いた！"],//選択肢
      correct: 2,//あってる番号（左から順番）
    },
  ];
  
  // 1.問題文表示
  $("#question").text(quiz[0].question);//questionをquestion idに代入
  
  
  //結果記録用の配列
  const answersArray = [];
  
  // quizの答え（配列）の数によって回答ボタンを増やす
  for(let i=0; i<quiz[0].answers.length; i++){//answerが増えるたびに枠も増
    answersArray.push(`<li><button id="answer0${i}" value="${i}">${quiz[0].answers[i]}</button></li>`); //liに入ってるbuttonを押すとanswerのが増える
  };
  
  $("#answers").html(answersArray);//結果をanswer枠に表示
  
  //何問目かの表示
  $("#question_number").text(`第 ${1} 問`)
  
  //条件分岐でクリックしたら正解不正解を出す
  $("body").on("click","button",function (e){//1.2.3.を使って
    //  quiz のanswerに入ってるものがcorrectとあっているかの判定//
    if (Number(e.target.value) === 0) {//はいを選んだとき（一番上を選んだとき）
      nigiyaka_point ++; 
    } else if(Number(e.target.value) === 1) {
      hutuu_point ++;//普通選んだとき　普通ポイントに＋
    } else {
      sizuka_point ++;
    }
    
   // 答えた数がクイズの問題より多いとき
    if(nigiyaka_point + hutuu_point +sizuka_point >= quiz.length){
      if(hutuu_point >= nigiyaka_point && hutuu_point >= sizuka_point){
        $("#result").text("普通おすすめ");
      }else if(sizuka_point >= nigiyaka_point && sizuka_point >= hutuu_point){
        $("#result").text("静かおすすめ");
      }else if(nigiyaka_point >= hutuu_point && nigiyaka_point >= sizuka_point){
        $("#result").text("賑やかおすすめ");
      };
    
    
      // $("#result").text( );//正解率・正答率
      $("#question_number").text("");//結果表示なし
      $("#question").text("");//結果表示なし
      $("#answers").text("");//結果表示なし
    }else {
      
      // 結果を記録した配列の長さ番目の問題文と選択肢を更新
      $("#result")
      $("#question").text(quiz[nigiyaka_point + hutuu_point +sizuka_point].question);//問題が出てくる
      answersArray.length = 0;//選択肢が出る
      for(let i=0; i<quiz[nigiyaka_point + hutuu_point +sizuka_point].answers.length; i++){//answerが増えるたびに問題が変わる
        answersArray.push(`<li><button id="answer0${i}" value="${i}">${quiz[nigiyaka_point + hutuu_point +sizuka_point].answers[i]}</button></li>`); //動的にボタンを作ってる。liに入ってるbuttonを押すとanswerのが増える
      };
      $("#answers").html(answersArray);
      }

      //3番目の問題の時に#text_areaを表示
      $("#question_number").text(`第 ${nigiyaka_point + 
      hutuu_point +sizuka_point +1} 問`)
      if(nigiyaka_point + 
        hutuu_point + sizuka_point === 3){
          $("#text_area").addClass("hyoji");
        }else{
          $("#text_area").removeClass("hyoji"); 
        }

      //データ取り出し// 
      // 最後の問題の時に//
      //最後のハウス種類をFirebece飛ばして
      //今までのメモとハウス種類のデータとりだしたい//
      //データ取得

      //getDoc関数で取得できた時then{データ達}を出す
       if(nigiyaka_point + hutuu_point + sizuka_point === 4){//４問答えた後にデータ処理〜出力まで
      $("#guest_house").addClass("spot_hyoji");
      getDoc(doc(db, "firebace_quiz", "test")).then((document)=>{
        const dataArray = [];
        const data = {
          id: document.id,
          data: document.data(),
          };
          dataArray.push(data);
          console.log(dataArray);
                
        const tagArray = [];
        dataArray.forEach(function (data) {
          tagArray.push(`
          <li id="${data.id}">
          <p>${convertFromFirestoreTimestampToDatetime(data.data.time.seconds)}</p>
          <p>${data.data.text}</p>
          </li>
          `);
        });
      //outputで表示
        $("#output").html(tagArray);
       });
       //４問答えた後非表示にする！
       }else{
       $("#guest_house").removeClass("spot_hyoji"); 
       }
       });
          
      ///////////////firebaceにmemoをsaveしたら送信する処理//////////////
      $("#save").on("click", function () {
        let point = '';
      if(hutuu_point > nigiyaka_point && hutuu_point > sizuka_point){
        point = "普通おすすめ";
      }else if(sizuka_point > nigiyaka_point && sizuka_point > hutuu_point){
        point = "静かおすすめ";
      }else if(nigiyaka_point > hutuu_point && nigiyaka_point > sizuka_point){
        point = "賑やかおすすめ";
      };
   
      const data = {
        text: $("#text").val(),
        time: serverTimestamp(),
        point: point,
      };
      setDoc(doc(db,"firebace_quiz", "test"),data);
      $("#text").val("");
      });

