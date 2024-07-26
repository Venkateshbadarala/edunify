import mysql from 'mysql2/promise';

const connectionConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'school_db',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let connection: mysql.Connection | null = null;

export async function connectToDatabase() {
  if (!connection) {
    connection = await mysql.createConnection(connectionConfig);
    console.log('Connected to the database.');
  }
  return connection;
}
