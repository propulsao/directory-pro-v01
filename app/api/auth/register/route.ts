import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    console.log("Processing registration request");
    await connectDB();

    const userData = await request.json();
    console.log("Registration data received:", { ...userData, password: '[REDACTED]' });

    // Check if user already exists
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log("User already exists with email:", userData.email);
      return NextResponse.json(
        { message: 'Email já cadastrado' },
        { status: 400 }
      );
    }

    // Create new user
    const user = await User.create(userData);
    console.log("New user created with ID:", user._id);

    // Create token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: '30d',
    });

    // Remove password from response
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      company: user.company,
      plan: user.plan,
    };

    console.log("Registration successful, creating response");
    const response = NextResponse.json({
      user: userResponse,
      token,
    });

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'auth-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });

    return response;
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}