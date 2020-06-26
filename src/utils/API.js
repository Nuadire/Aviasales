import axios from "axios";
import axiosRetry from 'axios-retry';

const API = axios.create({
  baseURL: "https://front-test.beta.aviasales.ru/",
  responseType: "json"
});

axiosRetry( API, {
  retries: 5,
  retryDelay: axiosRetry.exponentialDelay
});

export {API};