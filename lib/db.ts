import mysql from 'mysql2/promise';

const connectionConfig = {
  host: 'localhost',
  user: 'root',
  password: 'Bvenkatesh@206',
  database: 'school_db',
  port: 3306,
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
