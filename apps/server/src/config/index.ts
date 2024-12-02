import * as dotenv from 'dotenv';
dotenv.config();
const config = {
  port: process.env.PORT || '5001',
};
export { config };