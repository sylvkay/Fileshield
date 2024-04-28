// services/UserService.ts
import { Pool } from "pg";
import { User } from "../models/User";
import pool from "../db/connect";

const createUser = async (user: User): Promise<void> => {
  const client = await pool.connect();

  try {
    const query =
      "INSERT INTO users (username, email, password) VALUES ($1, $2, $3)";
    const values = [user.username, user.email, user.password];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

const getUserByEmail = async (email: string): Promise<User | undefined> => {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM users WHERE email = $1";
    const { rows } = await client.query(query, [email]);
    return rows[0];
  } finally {
    client.release();
  }
};

const getUserById = async (id: number): Promise<User | undefined> => {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM users WHERE id = $1";
    const { rows } = await client.query(query, [id]);
    return rows[0];
  } finally {
    client.release();
  }
};

const changeUserPassword = async (
  email: string,
  newPassword: string
): Promise<void> => {
  const client = await pool.connect();

  try {
    const query = "UPDATE users SET password = $1 WHERE email = $2";
    const values = [newPassword, email];
    await client.query(query, values);
  } finally {
    client.release();
  }
};
const changeUsername = async (
  email: string,
  newUsername: string
): Promise<void> => {
  const client = await pool.connect();

  try {
    const query = "UPDATE users SET username = $1 WHERE email = $2";
    const values = [newUsername, email];
    await client.query(query, values);
  } finally {
    client.release();
  }
};

export default {
  createUser,
  getUserByEmail,
  changeUserPassword,
  changeUsername,
  getUserById,
};
