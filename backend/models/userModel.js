import mongoose from "mongoose";




// this is the schema of a user in the database
// userName: the name of the user
// email: the email of the user, it is unique and required
// password: the password of the user, it is required
// phoneNumber: the phone number of the user, it is required
// location: the location of the user, it is required
// memberSince: the date when the user created his account, it is set to the current date by default
// orderList: an array of objects that contains the orders of the user, each order has an id, date, total and status
// label: an object that contains the label of the user, it has a name and a color, it is just an extra to the account
// profilePicLink: a link to the profile picture of the user, it has a default value if the user didnt upload a profile picture
const userSchema = mongoose.Schema({
  userName: { type: String, required: true, trim: true },
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  location: { type: String, required: true },
  memberSince: { type: Date, default: Date.now },
  orderList: [
    {
      id: Number,
      date: Date,
      total: String,
      status: String,
    },
  ],
  label: {
    name: String,
    color: String,
  },
  profilePicLink: {
    type: String,
    default:
      "https://ik.imagekit.io/frogimages/profilePicPlaceholder.jpg?updatedAt=1774045356613",
  },
});

// creating the user model
const UserModel = mongoose.model("User", userSchema);


export default UserModel;
