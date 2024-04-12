
const express = require('express');
const cors = require('cors');
const { swaggerUi, swaggerSpec } = require('./swaggerConfig'); 
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: ['http://localhost:3000', 'https://pwa-backend-mzhz.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://bonifacepaul500:aEIIV1hHMnyV7Z3U@cluster0.x1qhrqm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
 { useNewUrlParser: true, useUnifiedTopology: true })
 .then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to MongoDB', err));

const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your-generated-secret';

const UserSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    otp: String,
});

const User = mongoose.model('User', UserSchema);




const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'aulex500@gmail.com',
    pass: 'xwrdzhyqseygbcod'
  },
  port: 465,
  host: "smtp.gmail.com",
  secure: true,
});




app.get('/', (req, res) => {
  res.send('Welcome to the authentication API!');
});

/**
 * @swagger
 * /signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Signup successful
 *       400:
 *         description: Email is already registered
 *       500:
 *         description: Internal Server Error
 */
app.post('/signup', async (req, res) => {
    const { fullName, email, password } = req.body;
  
    try {
      // Check if the email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).send({ message: 'Email is already registered' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new user object
      const newUser = new User({
        fullName,
        email,
        password: hashedPassword
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Generate JWT token
      const token = jwt.sign({ email: newUser.email }, JWT_SECRET, { expiresIn: '1h' });
      
      // Send response
      res.send({ message: 'Signup successful!', token });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal Server Error
 */
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).send({ message: 'Invalid credentials' });
      }
      
      // Verify password using bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (passwordMatch) {
        const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
        return res.send({ message: 'Login successful!', token });
      } else {
        return res.status(401).send({ message: 'Invalid credentials' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

/**
 * @swagger
 * /forgot-password:
 *   post:
 *     summary: Send OTP for password reset
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OTP for password reset sent successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
app.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        console.log(`User with email ${email} not found`);
        return res.status(404).send({ message: 'User not found' });
      }
  
      // Generate 4-digit OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      user.otp = otp;
      await user.save();
  
      // Send OTP to user's email using Nodemailer
      const mailOptions = {
        from: 'aulex500@gmail.com',
        to: email,
        subject: 'OTP for Password Reset',
        text: `Your OTP for password reset is: ${otp}`
      };
  
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return res.status(500).send({ message: 'Error sending OTP for password reset' });
        }
        console.log('Email sent: ' + info.response);
        res.send({ message: 'OTP for password reset sent successfully!' });
      });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

/**
 * @swagger
 * /verify-otp:
 *   post:
 *     summary: Verify OTP and set new password
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               otp:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Invalid OTP
 *       500:
 *         description: Internal Server Error
 */
app.post('/verify-otp', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
      const user = await User.findOne({ email, otp });

      if (!user) {
        return res.status(400).send({ message: 'Invalid OTP' });
      }

      // Update user password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.send({ message: 'Password reset successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: A list of users
 *       500:
 *         description: Internal Server Error
 */
app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
