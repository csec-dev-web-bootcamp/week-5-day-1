import jwt from 'jsonwebtoken';
import { HttpException } from '../../common/http-exception';

export default function validateJwtToken(accessToken) {
  const secretKey = process.env.JWT_SECRETE_KEY;
  try {
    const decoded = jwt.verify(accessToken, secretKey);
    return decoded;
  } catch (error) {
    throw new HttpException('Unauthorized', 403);
  }
}
