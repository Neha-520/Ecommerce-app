const mongoose = require("mongoose")
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const crypto = require("crypto") //inbuilt module

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxlength: [30, "Name cannot exceed 30 characters"],
        minlength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please Enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minlength: [8, "Password should be greater than 8 characters"],
        select: false //when we search for users we wont get their passwords
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
}, { timestamps: true })

userSchema.pre("save", async function (next) {

    //to prevent hashing of password twice i.e if user doesnt change password while updating
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10)
})

//JWT TOKEN
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })  //user id
}

//Compare password
userSchema.methods.comparePassword = async function (eneteredPassword) {
    return await bcrypt.compare(eneteredPassword, this.password)
}

//Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {

    //genrate token
    const resetToken = crypto.randomBytes(20).toString("hex"); //converted buffer value in hexadecimal string

    //Hashing and adding to userSchema
    this.resetPasswordToken = crypto.createHash("sha256")
        .update(resetToken)
        .digest("hex");

    this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    return resetToken;
}

module.exports = mongoose.model("User", userSchema);