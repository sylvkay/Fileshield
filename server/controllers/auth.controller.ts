// middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
// import bcrypt from 'bcrypt';
import { User } from "../models/User";
import UserService from "../services/UserService";
import { defaultConfig } from "../config/config";

const saltRounds = 10;
const secretKey = defaultConfig.SECRET_KEY;

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, email, password } = req.body;
    // const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser: User = {
      id: 1, // Generate unique ID
      username,
      email,
      password: password,
    };
    await UserService.createUser(newUser);
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const user = await UserService.getUserByEmail(email);
    const username = user?.username;
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    const isPasswordValid = password === user.password;
    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    const token = jwt.sign({ userId: user.id }, secretKey);

    res.json({ username, token, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const userId = Number(req.user_id);

    const user = await UserService.getUserById(userId);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    // const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const hashedPassword = newPassword;

    const isPasswordValid = oldPassword === user?.password;

    if (!isPasswordValid) {
      return res.status(400).send({ message: "Incorrect old password" });
    }

    if (newPassword === user.password) {
      return res
        .status(400)
        .send({ message: "Old password cannot be the same as new password" });
    }

    await UserService.changeUserPassword(user.email, hashedPassword);
    return res.status(201).json({ message: "Password changed successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "An error occured" });
  }
};

// Middleware for authenticating JWT token
// export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
export function authenticateToken(
  req: any,
  res: Response,
  next: NextFunction
): void {
  // Extract the token from the Authorization header
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided" });
    return;
  }

  // Verify and decode the token
  jwt.verify(token, secretKey, (err: any, decoded: any) => {
    if (err) {
      res.status(403).json({ message: "Invalid token" });
      return;
    }

    // Add the decoded user information to the request object
    req.user = decoded;
    next();
  });
}
