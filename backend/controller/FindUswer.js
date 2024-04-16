const User = require('../models/User');

exports.findUser = async (req, res) => {
    try {
        const { name } = req.body; // Destructure the name from req.body
        const response = await User.find({ name });
        console.log(response);
        res.status(200).json({ data: response }); // Send the response data
    } catch (err) {
        console.error("Error Occurring While Fetching the data:", err);
        res.status(500).json({ error: "Error while fetching data" }); // Send an error response
    }
};
