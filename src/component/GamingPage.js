import React, { Fragment, useState, useEffect } from "react";

import { getRandomNumber, generateRandomNumber } from "../actions/gameaction";

const GamingPage = () => {
  useEffect(() => {
    generateRandomNumber(100);
    handleNumber();
  }, []);

  const [userData, setUserNumber] = useState({
    usernumbers: [],
  });

  const [chancesRecord, setNumberOfChances] = useState({
    numberOfChances: [],
  });

  const [levels, setLevels] = useState({
    numberOfLevels: 1,
  });

  const [alertInfo, setAlertInfo] = useState({
    alertText: [],
    alertColor: [],
  });

  let { usernumbers } = userData;

  let { numberOfChances } = chancesRecord;

  let { numberOfLevels } = levels;

  let { alertText, alertColor } = alertInfo;

  const onChange = (e, index) => {
    usernumbers[index] = e.target.value;
    setUserNumber({ ...userData, usernumbers });
  };

  const onSubmit = (e, index) => {
    e.preventDefault();

    var num = getRandomNumber();

    usernumbers[index] = parseInt(usernumbers[index]);
    // console.log(usernumbers[index]);
    // console.log(num);

    numberOfChances[index] = numberOfChances[index] + 1;
    setNumberOfChances({ ...chancesRecord, numberOfChances });

    if (num === usernumbers[index]) {
      // console.log("Correct");
      alertText[index] = "Correct";
      alertColor[index] = "#93c47d";

      setUserNumber({ ...userData, usernumbers: usernumbers[index] });
      setAlertInfo({ ...alertInfo, alertText, alertColor });
      setLevels({ ...levels, numberOfLevels: numberOfLevels + 1 });
      handleNumber();
      // console.log(index);

      document.getElementById("game-input-" + index).disabled = true;
      document.getElementById("btn-" + index).disabled = true;

      generateRandomNumber(100 * (index + 1));
    } else if (
      Math.abs(num - usernumbers[index]) >= 1 &&
      Math.abs(num - usernumbers[index]) <= 4
    ) {
      // console.log("Hot");
      usernumbers[index] = "";
      setUserNumber({ ...userData, usernumbers });
      alertText[index] = "Hot";
      alertColor[index] = "#ff0000";
      setAlertInfo({ ...alertInfo, alertText, alertColor });
    } else if (
      Math.abs(num - usernumbers[index]) >= 5 &&
      Math.abs(num - usernumbers[index]) <= 15
    ) {
      // console.log("Warm");
      usernumbers[index] = "";
      setUserNumber({ ...userData, usernumbers });
      alertText[index] = "Warm";
      alertColor[index] = "#ffd966";
      setAlertInfo({ ...alertInfo, alertText, alertColor });
    } else {
      // console.log("Cold");
      usernumbers[index] = "";
      setUserNumber({ ...userData, usernumbers });
      alertText[index] = "Cold";
      alertColor[index] = "#9fc5e8";
      setAlertInfo({ ...alertInfo, alertText, alertColor });
    }
  };

  const handleNumber = () => {
    setUserNumber({ ...userData, usernumbers: [...usernumbers, ""] });
    setNumberOfChances({
      ...chancesRecord,
      numberOfChances: [...numberOfChances, 0],
    });
    setAlertInfo({
      ...alertInfo,
      alertText: [...alertText, ""],
      alertColor: [...alertColor, ""],
    });
  };

  return (
    <Fragment>
      <h1 className="game-title">Number Guessing Game</h1>
      {usernumbers.map((usernumber, index) => {
        return (
          <div className="gamearea" key={index}>
            <h1 className="game-level-heading">Level #{index + 1}</h1>
            <p className="game-instruction">
              <b>Instructions:</b> Welcome to Level {index + 1}. In this level
              you have to choose a number in the range between 1-
              {index + 1}00 for which unlimited guesses are allowed.
              <ul>
                <li>Correct - Difference 0</li>
                <li>Hot - Difference 1-4</li>
                <li>Warm - Difference 5-15</li>
                <li>Cold - Difference beyond 15</li>
              </ul>
            </p>

            <div className="bar-response">
              <span className="range-number">0</span>
              <span className="correct-bar">Correct</span>
              <span className="range-number">1</span>
              <span className="hot-bar">Hot</span>
              <span className="range-number">4</span>
              <span className="warm-bar">Warm</span>
              <span className="range-number">15</span>
              <span className="cold-bar">Cold</span>
            </div>

            <form className="game-form" onSubmit={(e) => onSubmit(e, index)}>
              <input
                type="number"
                id={"game-input-" + index}
                className="game-input"
                value={usernumber}
                onChange={(e) => onChange(e, index)}
              />
              <button type="submit" id={"btn-" + index}>
                Submit
              </button>
            </form>
            <div
              className="alert-box"
              style={{
                backgroundColor: alertColor[index],
              }}
            >
              {alertText[index]}
            </div>
            <div className="no-of-chances">
              <p>Number of Chances: {numberOfChances[index]}</p>
            </div>
            {alertText[index] === "Correct" ? (
              <div className="game-greetings">
                <span className="winning-emoji" role="img" aria-label="trophy">
                  🏆
                </span>
                <span className="winning-greeting">
                  Congratulations Upgraded to level {index + 2}
                </span>
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </Fragment>
  );
};

export default GamingPage;
