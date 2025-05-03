import Nurse from "../models/nurse.model.js"
import bcrypt from "bcrypt"
import User from "../models/user.model.js";

export const signupNurse = async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill all the fields" });
    }

    try {
        const existingNurse = await Nurse.findOne({ email });
        if (existingNurse) {
            return res.status(409).json({ message: "Email is already registered as a nurse" });
        }

        const hashedPassword = await bcrypt.hash(password, 15);

        const newNurse = new Nurse({
            name,
            email,
            password: hashedPassword,
            role: "nurse"
        });

        await newNurse.save();

        res.status(201).json({ success: true, data: newNurse });
    } catch (error) {
        console.error("Error in nurse signup:", error.message);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const getUserDetails = async (req, res) => {
    const { userId } = req.params;

    try {
        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            name: user.name,
            email: user.email,
            heartRate: user.heartRate,
            sugarLevel: user.sugarLevel,
            bloodPressure: user.bloodPressure,
            bloodType: user.bloodType,
            description: user.description,
            nurse: user.nurse,
        });
    } catch (error) {
        console.error("Error fetching user details:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateUserDetails = async (req, res) => {
    const { userId } = req.params;
    const { heartRate, sugarLevel, bloodPressure, bloodType, description } = req.body;

    try {
        const user = await User.findOne({ id: userId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.heartRate = heartRate ?? user.heartRate;
        user.sugarLevel = sugarLevel ?? user.sugarLevel;
        user.bloodPressure = bloodPressure ?? user.bloodPressure;
        user.bloodType = bloodType ?? user.bloodType;
        user.description = description ?? user.description;

        await user.save();

        res.status(200).json({ message: "User details updated", data: user });
    } catch (error) {
        console.error("Error updating user details:", error.message);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProfile = async (req, res) => {
    const { name, email, yearsOfExperience, username, phoneNo } = req.body;
    const nurseId = req.user.id;
  
    try {
      const updatedNurse = await Nurse.findByIdAndUpdate(
        nurseId,
        { name, email, yearsOfExperience, username, phoneNo },
        { new: true }
      );
  
      if (!updatedNurse) {
        return res.status(404).json({ message: "Nurse not found" });
      }
  
      res.status(200).json({ message: "Profile updated", data: updatedNurse });
    } catch (error) {
      console.error("Update failed:", error.message);
      res.status(500).json({ message: "Server error" });
    }
  };


export const getProfile = async (req, res) => {
  const nurseId = req.user.id;

  try {
    const nurse = await Nurse.findById(nurseId).select("-password");
    if (!nurse) {
      return res.status(404).json({ message: "Nurse not found" });
    }

    res.status(200).json({ message: "Nurse profile fetched", data: nurse });
  } catch (error) {
    console.error("Failed to get nurse profile:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
