import { createAsyncThunk } from "@reduxjs/toolkit";


console.log("api url : ", import.meta.env);
// this function is used to fetch the products from the backend
// it takes an object as a parameter that contains the page number, the limit of products per page, the search query and the category filter, 
// it makes a GET request to the backend with the specified parameters and returns the products data if the request is successful, otherwise it returns an error message
// it cn also return null if there are no more products to load (if the backend sends back false for the products)
export const fetchProducts = createAsyncThunk(
    "products/fetchProducts",
    async ({page, limit, search = "", category = ""}) => {
    try{
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/get-products?page=${page}&limit=${limit}&search=${search}&category=${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (!response.ok) {
        console.log("error with fetchProducts function");
        return thunkAPI.rejectWithValue("Failed to fetch products");
      }
      const data = await response.json();
      if(!data.products){
        return null;
      }
      return data.products;
    }catch(err){
      console.log("error in the fetchProducts function : " , err);
      return thunkAPI.rejectWithValue("An error occurred while fetching products");
    }
    
  }
) 