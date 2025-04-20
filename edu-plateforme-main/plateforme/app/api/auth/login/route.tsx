import { NextRequest, NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcrypt";

// Set up a connection pool using environment variables
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432", 10), // Default to 5432 if DB_PORT is not specified
});

// POST handler
export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Fetch the user from the database
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Compare the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: "Invalid email or password" }, { status: 401 });
    }

    // Return the user's role or other details if needed
    return NextResponse.json({ role: user.role }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// OPTIONS handler (if needed)
export async function OPTIONS() {
  return NextResponse.json(null, {
    headers: {
      Allow: "POST, OPTIONS",
    },
  });
}
 