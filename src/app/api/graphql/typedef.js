// schema.js

const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello(name: String): String,
  }
  type Mutation {
    login(userName: String, password: String): LoginResponse
    forgetPassword(email: String): ForgetPasswordResponse
    verifyOtp(email: String, otp: String): VerifyResponse
    resetPassword(email: String, newPassword: String): ResetPasswordResponse
    setNewPassword(email: String, password: String, previousPassword: String): NewPasswordResponse
  }
  type LoginResponse {
    msg: String
    token: String
    role: String
    user: String
  }
  type ForgetPasswordResponse {
    msg: String
    otp: String
    email: String
  }
  type ResetPasswordResponse {
    msg: String
  }
  type VerifyResponse {
    msg: String
    id: String
  }
  type NewPasswordResponse {
    id: String
    msg: String
  }
`;

module.exports = typeDefs;