import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import { defaultConfig } from "../config/config";
import { getFileOwnerId } from '../services/FileService';


declare module 'express' {
  interface Request {
    user_id?: string; 
  }
}


// Middleware for extracting user ID from JWT token
export const authMiddleware = (req: Request, res: Response, next: Function) => {
  // Get the JWT token from the request headers
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  // Verify and decode the JWT token
  jwt.verify(token, defaultConfig.SECRET_KEY, (err:any, decoded:any) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    // Add the decoded user information to the request object
    req.user_id = decoded.userId; // Assuming userId is stored in the JWT payload
    next();
  });
};

// middleware/checkFileOwnership.js
async function checkFileOwnership(req: Request, res: Response, next: Function) {
  try {
    const fileId = parseInt(req.params.fileId); // Assuming fileId is passed in the request parameters
    const userId = req.user_id; // Assuming you have the authenticated user's ID stored in req.user.id

    const fileOwnerId = await getFileOwnerId(fileId);

    if (Number(fileOwnerId) !== Number(userId)) {
      return res.status(403).json({ message: 'You do not have permission to access this file' });
    }

    next();
  } catch (error) {
    console.error('Error checking file ownership:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export { checkFileOwnership };


