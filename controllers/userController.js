const User = require("../models/User");
const { apiResponse } = require("../utils/util");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);

    await user.save();

    res.json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    // if (!user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User not found",
    //   });
    // }
    // return apiResponse(res, 200, true, "User updated successfully", user);

    res.json({
      success: true,
      data: user,
      message: "user updated successfully",
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};


// exports.getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }
//     return apiResponse(res, 200, true, "User found", user);
//   } catch (err) {
//     return res.status(400).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json({
      success: true,
      data: user,
      message: "User found",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.getAllUsers = async (req, res) => {
  try {
    const{searchKey , searchValue} = req.query ;

    let query = {};

    if(searchKey && searchValue){
      query[searchKey] = searchValue ;
    } 
    const users = await User.find(query);

    res.json({
      success: true,
      data: users,
      message: "Users found",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      data: user,
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
