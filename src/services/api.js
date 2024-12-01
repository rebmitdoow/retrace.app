// src/services/api.js
import axios from "axios";

const MD_API_URL = "http://localhost:5000/api";
const mongodb = axios.create({
  baseURL: MD_API_URL,
});

export const fetchAllRessources = async () => {
  try {
    const response = await mongodb.get("/items");
    return response;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const fetchAllBat = async () => {
  try {
    const response = await mongodb.get("/batiments");
    return response;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const fetchAllTypes = async () => {
  try {
    const response = await mongodb.get("/types");
    return response;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const getUnitType = async (id) => {
  try {
    const response = await mongodb.get(`/typeunit/${id}`);
    return response.data.unite_type;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const fetchRessFromBat = async (batiment_id) => {
  try {
    const response = await mongodb.get(`/itemsFromBat/${batiment_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const getBatimentById = async (batiment_id) => {
  try {
    const response = await mongodb.get(`/batiment/${batiment_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const getRessourceById = async (ressource_id) => {
  try {
    const response = await mongodb.get(`/ressource/${ressource_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const updateBatiment = async (id, bat_data) => {
  try {
    const response = await mongodb.put(`/batiment/${id}`, bat_data);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};

export const updateRessource = async (id, ress_data) => {
  try {
    const response = await mongodb.put(`/ressource/${id}`, ress_data);
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
};
