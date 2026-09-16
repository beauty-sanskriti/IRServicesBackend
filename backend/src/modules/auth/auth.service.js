// Auth Service — business logic
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import dotenv from 'dotenv';
import * as authRepo from './auth.repository.js';
dotenv.config();

const JWT_SECRET  = process.env.JWT_SECRET  || 'irrecruiting_secret';
const JWT_EXPIRES = process.env.JWT_EXPIRES_IN || '7d';

export const loginUser = async ({ email, password }) => {
  const user = await authRepo.findUserByEmail(email);
  if (!user) throw { status: 401, message: 'Invalid email or password.' };

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) throw { status: 401, message: 'Invalid email or password.' };

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );

  return {
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  };
};

export const registerUser = async ({ name, email, password, role = 'recruiter' }) => {
  const existing = await authRepo.findUserByEmail(email);
  if (existing) throw { status: 409, message: 'Email already registered.' };

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);
  const id = `usr_${uuidv4().replace(/-/g, '').slice(0, 12)}`;

  const user = await authRepo.createUser({ id, name, email, passwordHash, role });
  return user;
};

export const getMe = async (userId) => {
  const user = await authRepo.findUserById(userId);
  if (!user) throw { status: 404, message: 'User not found.' };
  return user;
};
