require("dotenv").config()

const PORT: number = parseInt(process.env.PORT ? process.env.PORT : "")
// const MONGODB_URI = process.env.NODE_ENV === "test"
//   ? process.env.TEST_MONGODB_URI
//   : process.env.MONGODB_URI

const config = {
  PORT
}

export default config;
