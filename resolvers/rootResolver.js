const User = require("../models/User");
const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");

exports.resolvers = {
  Query: {
    user: async (_, args) => {
      const { id } = args;
      try {
        const user = await User.findById(id);
        return user;
      } catch (err) {
        console.log("failed fetching user...");
      }
    },
    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (err) {
        console.log("failed fetching users...");
      }
    },
    login: async (_, args) => {
      const response = {
        ok: false,
        errors: [],
        user: null,
      };
      const { username, password } = args;
      try {
        // Check if input is empty
        if (username.trim() === "")
          response.errors.push({ message: "Username is required." });
        if (password.trim() === "")
          response.errors.push({ message: "Password is required." });
        if (response.errors.length > 0) return response;

        // Check if User exists
        const user = await User.findOne({ username });
        if (!user) response.errors.push({ message: "User doesn't exist." });
        if (response.errors.length > 0) return response;

        // Check if password matches
        const samePassword = await bcrypt.compare(password, user.password);
        if (!samePassword)
          response.errors.push({ message: "Password doesn't match." });
        if (response.errors.length > 0) return response;

        // Give token and return
        const token = JWT.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: 60 * 60,
        });
        user.token = token;
        response.ok = true;
        response.user = user;
        return response;
      } catch (err) {
        console.log(err);
        return response;
      }
    },
  },

  Mutation: {
    register: async (_, args) => {
      const { username, email, password, confirmPassword } = args;
      const response = {
        ok: false,
        errors: [],
        user: null,
      };
      try {
        // Check input is Empty or not
        if (username.trim() === "")
          response.errors.push({ message: "Username is required." });
        if (email.trim() === "")
          response.errors.push({ message: "Email is required." });
        if (password.trim() === "")
          response.errors.push({ message: "Password is required." });
        if (confirmPassword.trim() === "")
          response.errors.push({ message: "ConfirmPassword is required." });
        if (password.trim() !== confirmPassword.trim())
          response.errors.push({ message: "Passwords don't match" });
        if (response.errors.length > 0) return response;

        // hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
        });
        await newUser.save();
        response.ok = true;
        response.user = newUser;
        return response;
      } catch (err) {
        // For DB existing field
        if (err.code === 11000) {
          response.errors.push({
            message: `${Object.keys(err.keyValue)[0]} exists.`,
          });
        }
        return response;
      }
    },
  },
};
