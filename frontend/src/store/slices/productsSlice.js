import {createSlice} from "@reduxjs/toolkit";
import {fetchProducts} from "../../fetchingServices/fetchProducts.js";




// creating a sclice for the products,
const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [], // the physical products
    itemsCount: 0,
    pageNumber: 1, // the number of the page  (for pagination)
    activeCategory: "All", // filtering purposes
    searchTerm: "", // filtering purposes
    isAllLoaded: false, // to stop loading more products.
  },
  reducers: {

    // this reducer takes an array of new products and adds them to the array of the existing products in the state.
    addProducts: (state, action) => {
      console.log(
        "addProducts reducer triggered with payload:",
        action.payload,
      );
      state.items = [...state.items, ...action.payload];
      state.itemsCount = state.items.length;
    },

    // this increments the number of the page, its used for pagination
    increasePageNumber: (state) => {
      state.pageNumber += 1;
    },

    // a setter fr the active category filter
    setActiveCategory: (state, action) => {
      state.activeCategory = action.payload;
    },

    // a setter for the search term filter
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },

    //a setter for the isAllLoaded flag 
    setIsAllLoaded: (state, action) => {
      state.isAllLoaded = action.payload;
    },

    // this resets all the products but the activeCategory and the searchTerm.
    resetProducts: (state) => {
      state.items = [];
      state.itemsCount = 0;
      state.pageNumber = 1;
      state.isAllLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      if (!action.payload) {
        return;
      }
      state.items = [...state.items, ...action.payload];
      state.itemsCount = state.items.length;
    });
  },
});

export const {addProducts , increasePageNumber,  resetProducts, setActiveCategory, setIsAllLoaded, setSearchTerm} = productsSlice.actions;
export default productsSlice.reducer;