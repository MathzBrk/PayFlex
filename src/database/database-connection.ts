
import prisma from './prisma-client';

export async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('Connection to the database successfully established!');
  } catch (error) {
    console.error('Error connecting to database', error);
    process.exit(1);
  }
}

export default prisma;