// resolvers.js

const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken');

const resolvers = {
  Mutation: {
    signUp: async (root, { signUpData }, ctx) => {
      try {
        const userSchema = mercury.db.User;
        const existingUser = await userSchema.mongoModel.findOne({
          email: signUpData.email,
        });

        if (existingUser) throw new GraphQLError("User Already Exists");

        const newUser = await userSchema.mongoModel.create({
          userName: signUpData.userName,
          email: signUpData.email,
          password: signUpData.password,
          role: signUpData.role,
        });

        sendVerificationEmail(signUpData.email);

        return {
          id: newUser.id,
          msg: "User Registered Successfully",
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    signin: async (root, { email, password }) => {
      try {
        const UserSchema = mercury.db.User;
        const user = await UserSchema.mongoModel.findOne({ email });

        if (!user) {
          throw new Error("Invalid username and/or email");
        }

        const isPasswordValid = await user.verifyPassword(password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        const token = jwt.sign(
          { id: user.id, email: user.email, role: user.role },
          process.env.SECRET_TOKEN_KEY,
          { expiresIn: '30d' }
        );

        return {
          msg: "User successfully logged in",
          user: user.userName,
          token: token,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    forgetPassword: async (root, { email }) => {
      try {
        const UserSchema = mercury.db.User;
        const user = await UserSchema.mongoModel.findOne({ email });

        if (!user) {
          throw new Error("User with this email does not exist");
        }

        const otp = generateVerificationCode();
        sendVerificationEmail(email, otp);

        return {
          msg: "OTP sent to your email",
          otp: otp,
          email: email,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    verifyOtp: async (root, { email, otp }) => {
      try {
        const UserSchema = mercury.db.User;
        const user = await UserSchema.mongoModel.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        if (user.otp !== otp) {
          throw new Error("Invalid OTP");
        }

        return {
          msg: "OTP verified successfully",
          id: user.id,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    resetPassword: async (root, { email, newPassword }) => {
      try {
        const UserSchema = mercury.db.User;
        const user = await UserSchema.mongoModel.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        user.password = newPassword;
        await user.save();

        return {
          msg: "Password reset successfully",
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    setNewPassword: async (root, { email, password, previousPassword }) => {
      try {
        const UserSchema = mercury.db.User;
        const user = await UserSchema.mongoModel.findOne({ email });

        if (!user) {
          throw new Error("User not found");
        }

        const isPreviousPasswordValid = await user.verifyPassword(previousPassword);
        if (!isPreviousPasswordValid) {
          throw new Error("Previous password is incorrect");
        }

        user.password = password;
        await user.save();

        return {
          id: user.id,
          msg: "Password updated successfully",
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};

module.exports = resolvers;