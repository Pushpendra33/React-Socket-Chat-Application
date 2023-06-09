import React, { Fragment, useState } from "react";
import axios from "axios";

const RecoveryPhrase = ({ socket, ...props }) => {
  const [recoveryPhrase, setRecoveryPhrase] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const generateRecoveryPhrase = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL_TESTING}${process.env.REACT_APP_API_VERSION}generate_recovery_phrase`
      )
      .then((response) => {
        setRecoveryPhrase(response?.data?.data?.recovery_phrase);
        // console.log(response.message);
      });
  };

  const generatePublicKey = () => {
    axios
      .get(
        `${process.env.REACT_APP_BASE_URL_TESTING}${process.env.REACT_APP_API_VERSION}get_public_key`
      )
      .then((response) => {
        setPublicKey(response?.data?.data?.secret_key);
        // console.log(response.message);
      });
  };

  return (
    <Fragment>
      <div className={"card my-3 mx-5 p-3"}>
        <h1>Recovery Phrase Generator</h1>
        <div className={"col-6"}>
          <button
            className={"btn btn-info mt-4"}
            onClick={generateRecoveryPhrase}
          >
            Generate Recovery Phrase
          </button>
        </div>

        <div className="mt-2">
          <p>Recovery Phrase: {recoveryPhrase}</p>
        </div>
      </div>
      <div className={"card my-3 mx-5 p-3"}>
        <h1>Public Key Generator</h1>
        <div className={"col-6"}>
          <button className={"btn btn-info mt-4"} onClick={generatePublicKey}>
            Generate Public Key
          </button>
        </div>

        <div className="mt-2">
          <p>Public Key: {publicKey}</p>
        </div>
      </div>
    </Fragment>
  );
};

export default RecoveryPhrase;
