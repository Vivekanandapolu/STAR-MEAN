import { hashPassword, passwordChecker } from "../middlewares/userValidator.js";
import userModel from "../models/users.model.js";
import { TokenController } from "../services/generateToken.js";
import bcrypt from "bcrypt";

const tokenController = new TokenController();
export class UsersController {
  //Create a User
  async createUser(req, res, next) {
    try {
      let user = await userModel.create(req.body);

      user = user.toObject();
      delete user.password;
      delete user.isDeleted;
      return res.status(201).json({
        success: true,
        message: "Signed Up Successfully",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }

  //Login user
  async loginUser(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next({
          status: 400,
          success: false,
          message: "Please enter login credentials",
        });
      }

      //Check the user exist in the database or not
      const user = await userModel.findOne(
        { email, isDeleted: false },
        { email: 1, password: 1, role: 1 }
      );

      if (!user) {
        return next({
          status: 404,
          success: false,
          message: "Email not Found",
        });
      }

      //Check the user password is same and request body password

      const isMatchPassword = await passwordChecker(password, user.password);
      if (!isMatchPassword) {
        return next({
          status: 401,
          success: false,
          message: "Invalid login credentials",
        });
      }

      //Check the token is generated or not and handle the issues
      const token = await tokenController.generateToken(user);

      if (!token) {
        return next({
          status: 500,
          success: false,
          message: "Token generation failed",
        });
      }

      //Remove the password while returning the user details
      const userObj = user.toObject();
      delete userObj.password;
      return res.status(200).json({
        token,
        userDetails: userObj,
        success: true,
        message: "User Logged In",
      });
    } catch (error) {
      next(error);
    }
  }

  //Change Password

  async changePassword(req, res, next) {
    try {
      const requestUser = req.user;

      const { current_password, new_password, confirm_password } = req.body;

      if (!current_password || !new_password || !confirm_password) {
        return next({
          status: 400,
          message: "Submit All Fields",
          success: false,
        });
      }

      let user = await userModel.findOne({ email: requestUser.email });
      user = user.toObject();
      if (!user) {
        return next({
          status: 404,
          message: "User not found",
          success: false,
        });
      }
      console.log(current_password, "/new_password", user.password);

      //Check the current password is matched with the user password
      const isMatch = await passwordChecker(current_password, user.password);

      if (!isMatch) {
        return next({
          status: 400,
          message: "Current password is not matched",
          success: false,
        });
      }

      if (new_password !== confirm_password) {
        return next({
          status: 400,
          message: "New and Confirm Password must be same.",
          success: false,
        });
      }

      if (current_password === new_password) {
        return next({
          status: 400,
          message: "New password must be different from Current password",
          success: false,
        });
      }

      user.password = await hashPassword(new_password);

      const updatedUser = await userModel.findByIdAndUpdate(req.user.id, user, {
        new: true,
        runValidators: true,
      });

      console.log(new_password, "===", user.password, "====", updatedUser);

      return res.status(200).json({
        success: true,
        message: "Password Updated Successfully",
        user: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  }
}
