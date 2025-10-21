export function getBaseURL() {
  // Running on the client
  if (typeof window !== 'undefined') {
    return ''
  }
  // Running on the server
  return process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000'
}
