import jwt from 'jsonwebtoken';

export default function generateJwtToken(user) {
  const payload = { userId: user.id, role: user.role };
  const secretKey = process.env.JWT_SECRETE_KEY;

  const accessToken = jwt.sign(payload, secretKey, {
    expiresIn: process.env.JWT_ACCESS_LIFETIME ?? '1d',
  });

  return accessToken;
}
