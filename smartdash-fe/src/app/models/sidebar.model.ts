export interface Sidebar {
  isAdmin: boolean
  order:number
  liClass: string
  title: string
  link?: Link
  subLink?: SubLink
}

export interface Link {
  dataBsTarget?: string
  dataBsToggle?: string
  aClass?: string
  iconName?: string
  nameClass?: string
  aRouter?: string
  name?: string
  badgeClass?: string
  badgeName?: string
}

export interface SubLink {
  ulId?: string
  ulClass?: string
  dataBsParent?: string
  links?: Links[]
}

export interface Links {
  liClass?: string
  aClass?: string
  name?: string
  aRouter?: string
  dataBsTarget?: string
  dataBsToggle?: string
  badgeClass?: string
  badgeName?: string
  subLinks?: SubLinks
}

export interface SubLinks {
  ulId?: string
  ulClass?: string
  dataBsParent?: string
  links?: Links[]
}

export interface SidebarMenu {
  companyID: string,
  sidebar: Sidebar[]
}
