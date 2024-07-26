import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export async function POST(req: NextRequest) {
  const {
    name,
    address,
    city,
    state,
    contactNumber,
    image,
    emailId,
    description 
  } = await req.json();

  console.log('Received Image URL:', image); // Log the received image URL

  const values = [
    name || null,
    address || null,
    city || null,
    state || null,
    contactNumber || null,
    image || null,
    emailId || null,
    description || null,
  ];

  try {
    const connection = await connectToDatabase();

    // Check if school already exists
    const [existingSchool] = await connection.execute<RowDataPacket[]>(
      'SELECT * FROM schools WHERE name = ? OR contactNumber = ? OR emailId = ?',
      [name, contactNumber, emailId]
    );

    if (existingSchool.length > 0) {
      return NextResponse.json({ message: 'School already exists' }, { status: 409 });
    }

    // Insert new school
    await connection.execute(
      'INSERT INTO schools (name, address, city, state, contactNumber, image, emailId, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      values
    );

    console.log('Data inserted successfully.');

    return NextResponse.json({ message: 'School data added successfully!' });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
