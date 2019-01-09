export interface JwtResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}