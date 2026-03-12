const User = require("../models/User");
const { apiResponse } = require("../utils/util");

exports.createUser = async (req, res) => {
  try {

    const user = new User(req.body);

    await user.save();

    return apiResponse(res, 200, "User created successfully", user);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
      
    }
    console.log(user);
        return apiResponse(res, 200, "User updated successfully", user);

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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;

    const { searchKey, searchValue } = req.query;
console.log(searchKey, searchValue);searchkey
    let query = {};

    if (searchKey && searchValue) {
      query[searchKey] = searchValue;
    }


    const users = await User.find(query).skip(skip).limit(limit);
    const totalUsers = await User.countDocuments(query);

    res.json({
      success: true,
      total: totalUsers,
      page: page,
      limit: limit,
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
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
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

exports.getTotalUsers = async (req, res) => {
  try {
    const totalusers = await User.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
        },
      },
    ]);
    res.json(totalusers);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
