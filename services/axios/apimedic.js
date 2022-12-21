const axios = require("axios");
const CryptoJS = require("crypto-js");
const { handleParams } = require("../../utils/global");

const apiKey = process.env.APIMEDIC_API_KEY;
const uri = process.env.APIMEDIC_AUTHSERVICE_URL;
const healthserviceUri = process.env.APIMEDIC_HEALTHSERVICE_URL;
const secret_key = process.env.APIMEDIC_SECRET_KEY;

async function loadToken() {
  // 1. generate hash using secret key
  const computedHash = CryptoJS.HmacMD5(uri, secret_key);
  const computedHashString = computedHash.toString(CryptoJS.enc.Base64);
  let tokenObject;
  // 2. send hash as header
  try {
    await axios({
      url: uri,
      headers: {
        Authorization: `Bearer ${apiKey}:${computedHashString}`,
        "Content-Type": "application/json",
      },
      data: "",
      method: "POST",
    })
      .then((response) => {
        tokenObject = response.data;
        // 3. collect token
        return tokenObject;
      })
      .catch((err) => console.log("err in function:", err));
  } catch (err) {
    console.log("Error:", err);
    const errorobject = {
      status: err.response.status,
      statusText: err.response.statusText,
    };
    return errorobject;
  }
  return tokenObject;
}

async function axiosRequest(params, token) {
  console.log("params in axios:", params);
  let healthData = {};
  await axios({
    url: `${healthserviceUri}/${params}token=${token}&format=json&language=en-gb`,
    method: "GET",
  })
    .then((response) => {
      healthData = response;
    })
    .catch((err) => {
      healthData = err.response;
      console.log("healthData in error:", healthData);
    });
  return healthData;
}

async function loadData(params, token) {
  const allParams = handleParams(params);
  try {
    return await axiosRequest(allParams, token);
  } catch (err) {
    const errorobject = {
      status: err.response.status,
      statusText: err.response.statusText,
    };
    return errorobject;
  }
}

module.exports = { loadToken, loadData };
