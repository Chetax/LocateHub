const User = require("../models/User");

exports.createUser = async (req, res) => {
  try {
    console.log("req body", req.body);
    const { name, description,imgUrl,instagram,facebook,address } = req.body;
    if (!name || !description  ) {
      console.log("not all fields...");
      return res.status(400).json({
        status: 400,
        message: "Please fill all fields",
      });
    }
    const user = await User.create({
      name,
      description,
      imgUrl,
      instagram,facebook,address 
    });
    return res.status(200).json({
      status: 201,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log("error", error);
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};
