import User from "../Models/userModel.js";

export const searchUsers = async (req, res) => {
  try {
    const query = req.query.query;

    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

    const users = await User.find({
      $or: [
        { name: { $regex: escapedQuery, $options: "i" } },
        { username: { $regex: escapedQuery, $options: "i" } },
      ],
    })
      .select("-password")
      .limit(10);

    res.status(200).json(users);   // must return array
  } catch (error) {
    console.log("Search error:", error);
    res.status(500).json({ message: error.message });
  }
};