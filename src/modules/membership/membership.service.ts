import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import * as membershipRepository from './membership.repository';
import { RegisterDto, LoginDto, UpdateProfileDto } from './membership.schema';

export const register = async (dto: RegisterDto) => {
  const existing = await membershipRepository.findUserByEmail(dto.email);
  if (existing) {
    throw { statusCode: 400, appStatus: 102, message: 'Email sudah terdaftar' };
  }

  const hashedPassword = await bcrypt.hash(dto.password, 10);
  await membershipRepository.createUser(dto.email, dto.first_name, dto.last_name, hashedPassword);
};

export const login = async (dto: LoginDto) => {
  const user = await membershipRepository.findUserByEmail(dto.email);
  if (!user) {
    throw { statusCode: 401, appStatus: 103, message: 'Username atau password salah' };
  }

  const isPasswordValid = await bcrypt.compare(dto.password, user.password);
  if (!isPasswordValid) {
    throw { statusCode: 401, appStatus: 103, message: 'Username atau password salah' };
  }

  const secret = process.env.JWT_SECRET as string;
  const expiresIn = (process.env.JWT_EXPIRES_IN ?? '12h') as `${number}${'s' | 'm' | 'h' | 'd'}`;

  const token = jwt.sign({ email: user.email }, secret, { expiresIn });

  return { token };
};

export const getProfile = async (email: string) => {
  const user = await membershipRepository.findUserByEmailSafe(email);
  if (!user) {
    throw { statusCode: 401, appStatus: 108, message: 'Token tidak tidak valid atau kadaluwarsa' };
  }
  return user;
};

export const updateProfile = async (email: string, dto: UpdateProfileDto) => {
  const user = await membershipRepository.updateUserProfile(email, dto.first_name, dto.last_name);
  return user;
};

export const updateProfileImage = async (email: string, file: Express.Multer.File) => {
  const allowedMimes = ['image/jpeg', 'image/png'];
  if (!allowedMimes.includes(file.mimetype)) {
    throw { statusCode: 400, appStatus: 102, message: 'Format Image tidak sesuai' };
  }

  const imageUrl = `${process.env.BASE_URL || 'http://localhost:3000'}/uploads/${file.filename}`;
  const user = await membershipRepository.updateUserProfileImage(email, imageUrl);
  return user;
};
