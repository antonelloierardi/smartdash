export interface ServiceMenu {
  name: string,
  aRouter: string,
  control:string
}

export interface MegaMenu {
  nameTitle: string,
  items: Item[]

}

export interface Item {
  nameItem: string,
  routeItem: string
}
