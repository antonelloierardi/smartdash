export interface User {
  _id: string;
  companyID: string,
  company: string,
  photo: string;
  name: string;
  surname: string;
  position: string;
  site: string;
  address: string;
  cap: string;
  city: string;
  province: string;
  email: string;
  tel: string;
  mobile: string;
  createdAt: string;
  role: string;
  status: string;
  isAdmin?: boolean;
  password:string;
  repeatPassword: string;
}
