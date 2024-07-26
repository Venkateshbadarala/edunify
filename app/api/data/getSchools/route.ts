import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest) {
  try {
    const connection = await connectToDatabase();

    // Fetch schools from the database
    const [schools] = await connection.execute<RowDataPacket[]>(
      'SELECT id, name, address, city, state, contactNumber, emailId, image FROM schools'
    );

    return NextResponse.json(schools);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
