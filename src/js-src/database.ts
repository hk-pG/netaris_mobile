"use strict";

// **************************************************************** 4. database.js ****************************************************************
console.log("remove judge var number ");

// @ts-expect-error TS(2304): Cannot find name 'firebase'.
const db = firebase.firestore();

const scores = db.collection("scores");
const userName = document.getElementById("userName");
const form = document.querySelector("form");

// @ts-expect-error TS(2531): Object is possibly 'null'.
form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (score > 0) {
    //スコアが０点の情報はfirebaseにつなぐ前に弾く

    scores
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      .doc(userName.value)
      .set({
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        name: userName.value,
        score: score,
      })
      .then(() => {
        console.log("successfully");
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        console.log(`userName is ${userName.value}`);
        console.log(`score is ${score}`);
        setTimeout(() => {
          document.location.reload();
        }, 2500);
      })
      // @ts-expect-error TS(7006): Parameter 'err' implicitly has an 'any' type.
      .catch((err) => {
        console.log(err);
      });
  } else {
    document.location.reload();
    //スコアが０点の場合は単純にリロードのみをする
  }
});

export {};
