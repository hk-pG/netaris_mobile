import { System } from "./System";
import { collection, addDoc } from "firebase/firestore";
import { db, doc } from "./firebase";

export const setSubmitScore = () => {
  const userName = document.getElementById("userName") as HTMLInputElement;
  const form = document.querySelector("form") as HTMLFormElement;

  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    if (System.score > 0) {
      //スコアが０点の情報はfirebaseにつなぐ前に弾く

      const scores = collection(db, "scores");

      addDoc(scores, {
        name: userName,
        score: System.score,
      })
        .then(() => {
          console.log("successfully");
          console.log(`userName is ${userName.value}`);
          // console.log(`score is ${score}`);
          setTimeout(() => {
            document.location.reload();
          }, 2500);
        })
        .catch((err: any) => {
          console.error(err);
        });

      /*
    scores
      .doc(userName.value)
      .set({
        name: userName.value,
        // score: score,
      })
      .then(() => {
        console.log("successfully");
        console.log(`userName is ${userName.value}`);
        // console.log(`score is ${score}`);
        setTimeout(() => {
          document.location.reload();
        }, 2500);
      });
      */
    } else {
      document.location.reload();
      //スコアが０点の場合は単純にリロードのみをする
    }
  });
};

export {};
