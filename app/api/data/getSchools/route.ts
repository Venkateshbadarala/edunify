import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function GET(req: NextRequest) {
  try {
    const connection = await connectToDatabase();

    // Fetch schools from the database
    const [rows] = await connection.execute<RowDataPacket[]>(
      'SELECT id, name, address, city, state, contactNumber, emailId, image FROM schools'
    );

    const schools = rows.map((row: RowDataPacket) => ({
      id: row.id,
      name: row.name,
      address: row.address,
      city: row.city,
      state: row.state,
      contactNumber: row.contactNumber,
      emailId: row.emailId,
      image: row.image,
    }));

    return NextResponse.json(schools);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
