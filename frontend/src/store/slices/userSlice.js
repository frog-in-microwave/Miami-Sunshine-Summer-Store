import {createSlice} from "@reduxjs/toolkit";



// creating a slice for the user, which will handle the user information and authentication status, 
// the initial state is hardcoded, but it can be updated via the changeInfo reducer, which will be triggered when the user updates their information or logs in, 
// the changeInfo reducer takes the new user information as payload and updates the state accordingly, it also sets isAuthenticated to true when the user information is updated, indicating that the user is now authenticated
const userSlice = createSlice({

  name: "user", // the name of the slice, used to identify the slice in the store


  initialState: {
    userName: "Alexi Rivera",
    email: "alex.surf@miami.com",
    memberSince: "Jan 2026",
    label: { name: "Pro Surfer", color: "var(--sky-blue)" },
    profilePicLink:
      "https://ik.imagekit.io/frogimages/profilePicPlaceholder.jpg?updatedAt=1774045356613",
    phoneNumber: "555-123-4567",
    location: "Miami, FL",
    orderList: [
      { id: 1, date: "Mar 12, 2026", total: "$145.00", status: "SHIPPED" },
      { id: 2, date: "Feb 28, 2026", total: "$89.00", status: "DELIVERED" },
    ],
    isAuthenticated: false, // this is initially false to prevent someone from going to checkout or account page before signing up or logging in. it becomes true once the changeInfo reducer function runs, which it does on signup or login
  },


  // the reducers are the functions that will handle the actions and update the state accordingly, 
  // in this case, we have only one reducer, changeInfo, which will update the user information and set isAuthenticated to true, 
  // this reducer will be triggered when the user updates their information or logs in, and it will take the new user information as payload and update the state accordingly
  reducers: {
    changeInfo: (state, action) => {
      console.log("changeInfo reducer triggered with payload:", action.payload);
      console.log("Current state before change:", state);

      // only having state = action.payload wouldent change the state, because redux toolkit using Immer under the hood, which allows us to mutate the state directly, 
      // but Immer only watches over the properties of the state, not the state object itself, so we need to update each property individually to trigger the state change,
      // we can also return the state object with the updated properties, that way also works for Immer
      const {
        userName,
        email,
        memberSince,
        label,
        profilePicLink,
        phoneNumber,
        location,
      } = action.payload;
      state.userName = userName;
      state.email = email;
      state.memberSince = memberSince;
      state.label = label;
      state.profilePicLink = profilePicLink;
      state.phoneNumber = phoneNumber;
      state.location = location;
      state.isAuthenticated = true;
      console.log("State after change:", state);
    },
  },
});




// the userSlice.actions is an object created by the createSlice function that contains the action creators for each reducer we defined, 
// in this case, it will only have a changeInfo action creator that we can dispatch to trigger the changeInfo reducer and update the user information in the state,
// we destructure it so we can dispatch changeInfo directly without having to access it through userSlice.actions.changeInfo
export const {changeInfo} = userSlice.actions; 

export default userSlice.reducer;



// eg of the userSlice : 

// const actions = {
//   changeInfo: function (payload) {
//     return {
//       type: "user/changeInfo",
//       payload: payload,
//     };
//   },
// };