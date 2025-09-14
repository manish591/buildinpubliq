export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";
export const TWITTER_CHANNEL_AUTORIZATION_URL = ``;

// linkedin
export const LINKEDIN_AUTHORIZATION_BASE_URL = "https://www.linkedin.com/oauth/v2/authorization";
export const LINKEDIN_AUTHORIZATION_QUERY_PARAMS = {
  "response_type": "code",
  "client_id": process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID,
  "redirect_uri": process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI,
  "scope": process.env.NEXT_PUBLIC_LINKEDIN_SCOPE
}

// twitter
export const TWITTER_AUTHORIZATION_BASE_URL = "https://x.com/i/oauth2/authorize";
export const TWITTER_AUTHORIZATION_QUERY_PARAMS = {
  "response_type": "code",
  "code_challenge": "challenge",
  "code_challenge_method": "plain",
  "client_id": process.env.NEXT_PUBLIC_TWITTER_CLIENT_ID,
  "redirect_uri": process.env.NEXT_PUBLIC_TWITTER_REDIRECT_URI,
  "scope": process.env.NEXT_PUBLIC_TWITTER_SCOPE
}
