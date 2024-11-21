// src/services/api.js
import axios from "axios";

const MD_API_URL = "http://localhost:5000/api";
const mongodb = axios.create({
  baseURL: MD_API_URL,
});

const NC_API_URL = "https://app.retrace.fr/api/v2";
const nocodb = axios.create({
  baseURL: NC_API_URL,
  headers: {
    "xc-token": "XPrCTgJ_kQRK5nkvoHwnSCSnVpXfoHQWl6vQ3T2W",
    "Content-Type": "application/json",
  },
});

export const fetchAllRessourcesMD = async () => {
  try {
    const response = await mongodb.get("/items");
    return response;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const fetchAllRessources = async () => {
  try {
    const response = await nocodb.get("/tables/mh9nebymjhwmoex/records");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const fetchAllBat = async () => {
  try {
    const response = await nocodb.get("/tables/mjxxt0i2sssjxj7/records");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const fetchRessFromBat = async (batiment_id) => {
  try {
    const response = await nocodb.get(`/tables/mjxxt0i2sssjxj7/links/ceqcjari6vzgp9a/records/${batiment_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const fetchRessFromBatMD = async (batiment_id) => {
  try {
    const response = await mongodb.get(`/itemsFromBat/${batiment_id}`);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const getBatimentById = async (batiment_id) => {
  try {
    const response = await nocodb.get(`/tables/mjxxt0i2sssjxj7/records/${batiment_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const updateBatiment = async (bat_data) => {
  try {
    const response = await nocodb.patch(`/tables/mjxxt0i2sssjxj7/records`, bat_data);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const getRessourceById = async (ressource_id) => {
  try {
    const response = await nocodb.get(`/tables/mh9nebymjhwmoex/records/${ressource_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
