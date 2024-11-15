// src/services/api.js

import axios from "axios";

const API_URL = "https://app.retrace.fr/api/v2";
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "xc-token": "XPrCTgJ_kQRK5nkvoHwnSCSnVpXfoHQWl6vQ3T2W",
    "Content-Type": "application/json",
  },
});

export const fetchAllRessources = async () => {
  try {
    const response = await axiosInstance.get("/tables/mh9nebymjhwmoex/records?limit=25&shuffle=0&offset=0");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }}

  export const getBatimentById = async (batiment_id) => {
    try {
      const response = await axiosInstance.get(`/tables/mjxxt0i2sssjxj7/records/${batiment_id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
  }