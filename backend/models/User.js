const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instagram: {
        type: String,
        default: "https://www.instagram.com/",
    },
    facebook: {
        type: String,
        default: "https://www.facebook.com/",
    },
    address: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
    },
    latitude: {
        type: String,
        required: true,
    },
    longitude: {
        type: String,
        required: true,
    }
});

userSchema.pre('save', function(next) {
    if (!this.instagram) {
        this.instagram = "https://www.instagram.com/";
    }
    if (!this.facebook) {
        this.facebook = "https://www.facebook.com/";
    }
    next();
});

module.exports = mongoose.model("User", userSchema);
