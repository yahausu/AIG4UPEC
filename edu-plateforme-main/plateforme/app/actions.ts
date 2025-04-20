"use server";
import { neon } from "@neondatabase/serverless";

export async function authenticateUser(email: string, password: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not defined");
  }

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Query the user by email
    const [user] = await sql`
      SELECT email, password, role 
      FROM users 
      WHERE email = ${email}
    `;

    if (!user) {
      throw new Error("Invalid email or password");
    }

    // Verify the hashed password
    const bcrypt = await import("bcrypt");
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid email or password");
    }

    return { role: user.role }; // Return the user role or other necessary data
  } catch (error) {
    throw new Error(error.message || "Authentication failed");
  }
}
