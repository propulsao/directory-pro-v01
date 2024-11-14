import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export async function POST(request: Request) {
  try {
    console.log("Processing login request");
    await connectDB();

    const { email, password } = await request.json();
    console.log("Login attempt for email:", email);

    // Find user and include password for comparison
    const user = await User.findOne({ email }).select('+password');
    console.log("User found:", user ? "Yes" : "No");

    if (!user || !(await user.matchPassword(password))) {
      console.log("Invalid credentials");
      return NextResponse.json(
        { message: 'Email ou senha inválidos' },
        { status: 401 }
      );
    }

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

    console.log("Login successful, creating response");
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
    console.error('Login error:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}