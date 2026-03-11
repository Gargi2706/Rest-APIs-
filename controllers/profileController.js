const Profile = require("../models/Profile");
const { apiResponse } = require("../utils/util");

exports.createProfile = async (req, res) => {
  try {
    const profile = new Profile(req.body);

    await profile.save();

    res.json({
      success: true,
      message: "Profile created successfully",
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    }).populate("userId", "name email"); // Populate user details
    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }
    //   return apiResponse(res, 200, true, "Profile updated successfully", profile);
    // } catch (err) { return apiResponse(res, 400, false, err.message); }  }

    res.json({
      success: true,
      message: "Profile updated successfully",
      data: profile,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

exports.getProfileById = async (req, res) => {
  try {
    const profile = await Profile.findById(req.params.id).populate(
      "userId",
      "name email",
    );

    res.json({
      success: true,
      message: "Profile found",
      data: profile,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllProfiles = async (req, res) => {
  try {
    const profiles = await Profile.find().populate("userId", "name email"); // Populate user details

    res.json({
      success: true,
      message: "Profiles found",
      data: profiles,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      data: profile,
      message: "Profile deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAvgAge = async (req, res) => {
  try {
    const avgAge = await Profile.aggregate([
      {
        $group: {
          _id: null,
          averageAge: { $avg: { $toInt: "$age" } },
        },
      },
    ]);
    res.json(avgAge);
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
