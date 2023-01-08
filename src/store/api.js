import axios from "axios";

const BASE_API = "4f5295db-0a1b-476c-8919-286c410e4187";
const BASE_URL = "https://forkify-api.herokuapp.com/api/v2/recipes";

export const getRecipe = async (name) => {
  const data = await axios.get(`${BASE_URL}?search=${name}&key=${BASE_API}`);

  return data.data.data;
};

export const getSingleRecipe = async (id) => {
  const data = await axios.get(`${BASE_URL}/${id}?key=${BASE_API}`);

  return data.data.data;
};
