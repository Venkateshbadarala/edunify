/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['res.cloudinary.com', 'placehold.co'],
    },
    env: {
      MYSQL_HOST: process.env.MYSQL_HOST,
      MYSQL_USER: process.env.MYSQL_USER,
      MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
      MYSQL_DATABASE: process.env.MYSQL_DATABASE,
    },
  };
  
  export default nextConfig;
  