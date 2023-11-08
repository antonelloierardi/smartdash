export interface Client {
  _id?: string,
  photo: string,
  type: string,
  status: string;
  name: string,
  surname: string,
  address: string,
  cap: string,
  city: string,
  province: string
  tel: string,
  email: string,
  mobile: string,
  nameCompany: string,
  legalSite: LegalSite,
  operatingOffices: OpOffice[],
  details: Details
  vatNumber: string,
  taxCode: string,
  webSite: string,
  rea: string,
  pec: string,
  createdAt: string
}

export interface Client1 {
  _id?: string,
  type: string,
  status: string;
  img: string,
  personal: Personal,
  company: Company,
  iban:string,
  webSite: string,
  createdAt: string
}
export interface Personal {
  name: string,
  surname: string,
  address: string,
  cap: string,
  city: string,
  province: string
  tel: string,
  email: string,
  mobile: string,
  pec: string,
  taxCode: string,
}

export interface Company {
  nameCompany: string,
  accountable: string,
  vatNumber: string,
  rea: string,
  address: string,
  cap: string,
  city: string,
  province: string,
  tel: number,
  email: string,
  mobile: number,
  pec: string,
  eployees: number,
  operatingOffices: OpOffice[],
  details: Details
}

export interface LegalSite {
  nameCompany: string,
  accountable: string,
  address: string,
  cap: string,
  city: string,
  province: string,
  tel: number,
  email: string,
  mobile: number,
  lsEployees: number,
}
export interface OpOffice {
  opAccountable: string,
  opAddress: string,
  opCap: string,
  opCity: string,
  opProvince: string,
  opTel: number,
  opEmail: string,
  opMobile: number,
  opEployees: number,
}

export interface Details {
  totalEployees: string
  usersAccount: string
  adminAccount: string
  numClients: string
  companyTurnover: string
}

export interface ClientRequest {
  _id: string,
  img: string,
  data: string;
  createdAt?: string
}

export const CLIENT = {
  type: '',
  status: '',
  photo: '',
  name: '',
  surname: '',
  address: '',
  cap: '',
  city: '',
  province: '',
  tel: '',
  email: '',
  mobile: '',
  taxCode: '',
  pec: '',
  nameCompany: '',
  vatNumber: '',
  rea: '',
  legalSite: {
    accountable: '',
    address: '',
    cap: '',
    city: '',
    province: '',
    tel: '',
    mobile: '',
    email: '',
    lsEployees: '',
  },
  operatingOffices: [],
  details: {
    totalEployees: '',
    usersAccount: '',
    adminAccount: '',
    numClients: '',
    companyTurnover: '',
  },
  iban: '',
  webSite: ''
}
