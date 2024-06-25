import { JwtPayload } from "jwt-decode";

export interface CustomJwtPayload extends JwtPayload {
  nameid: string;
  role:string
}
