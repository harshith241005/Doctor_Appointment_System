/**
 * MediBook - Doctor Appointment System Backend
 * @author Harsh
 * @description Main server configuration and API setup
 */

import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import morgan from "morgan"

// Initialize Express App
const app = express()
const port = process.env.PORT || 4000

// ASCII Art Banner
const banner = `
╔══════════════════════════════════════════════════════════╗
║                                                          ║
║   ███╗   ███╗███████╗██████╗ ██╗██████╗  ██████╗  ██████╗██╗  ██╗   ║
║   ████╗ ████║██╔════╝██╔══██╗██║██╔══██╗██╔═══██╗██╔═══██╗██║ ██╔╝   ║
║   ██╔████╔██║█████╗  ██║  ██║██║██████╔╝██║   ██║██║   ██║█████╔╝    ║
║   ██║╚██╔╝██║██╔══╝  ██║  ██║██║██╔══██╗██║   ██║██║   ██║██╔═██╗    ║
║   ██║ ╚═╝ ██║███████╗██████╔╝██║██████╔╝╚██████╔╝╚██████╔╝██║  ██╗   ║
║   ╚═╝     ╚═╝╚══════╝╚═════╝ ╚═╝╚═════╝  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝   ║
║                                                          ║
║          Doctor Appointment Booking System               ║
║               Developed by Harsh                         ║
║                                                          ║
╚══════════════════════════════════════════════════════════╝
`

// Connect to Database and Cloud Services
connectDB()
connectCloudinary()

// Middlewares
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())

// API Routes
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)

// Health Check Endpoint
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "MediBook API is running",
    version: "1.0.0",
    author: "Harsh",
    endpoints: {
      users: "/api/user",
      doctors: "/api/doctor",
      admin: "/api/admin"
    }
  })
})

// API Info Endpoint
app.get("/api", (req, res) => {
  res.json({
    name: "MediBook API",
    version: "1.0.0",
    description: "Doctor Appointment Booking System API",
    author: "Harsh",
    documentation: "/api/docs"
  })
})

// Start Server
app.listen(port, () => {
  console.log(banner)
  console.log(`🚀 Server running on http://localhost:${port}`)
  console.log(`📋 API Docs: http://localhost:${port}/api`)
  console.log('─'.repeat(60))
})