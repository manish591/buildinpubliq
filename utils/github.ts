import jwt from 'jsonwebtoken';

const GITHUB_APP_ID = process.env.GITHUB_APP_ID;
let GITHUB_APP_PRIVATE_KEY = process.env.GITHUB_APP_PRIVATE_KEY?.replace(/\\n/g, '\n');

if(!GITHUB_APP_PRIVATE_KEY) {
  GITHUB_APP_PRIVATE_KEY = "";
}

export const generateJWT = () => {
  const payload = {
    iat: Math.floor(Date.now() / 1000),
    exp: Math.floor(Date.now() / 1000) + (10 * 60),
    iss: GITHUB_APP_ID,
  };

  return jwt.sign(payload, GITHUB_APP_PRIVATE_KEY, { algorithm: 'RS256' });
};