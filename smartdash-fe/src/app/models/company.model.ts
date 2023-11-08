export interface Company {
  _id: string,
  logo: string,
  nameCompany: string,
  legalSite: LegalSite,
  operatingOffices: OpOffice[],
  vatNumber: number,
  taxCode: string,
  rea: string,
  webSite: string,
  pec: string,
  iban:string,
  createdAt: string,
  details: Details
}

export interface LegalSite {
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
  totalEployees: number,
  usersAccount: number,
  adminAccount: number,
  numClients: number,
  companyTurnover: number
}
