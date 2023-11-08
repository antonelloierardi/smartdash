import { Injectable } from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/it';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  setRoute(route: string) {
    sessionStorage.setItem('route', route);
  }

  firstUpperCase(str: string) {
    return str?.charAt(0).toUpperCase() + str?.slice(1);
  }

  sort(array: any[], par: string, type: boolean) {
    if (type) {
      return array.sort((a: any, b: any) => {
        const A = a[`${par}`];
        const B = b[`${par}`];
        if (A < B) {
          return -1;
        }
        if (A > B) {
          return 1;
        }
        return 0;
      }
      );
    } else {
      return array.sort((a: any, b: any) => {
        const A = a[`${par}`];
        const B = b[`${par}`];
        if (A > B) {
          return -1;
        }
        if (A < B) {
          return 1;
        }
        return 0;
      }
      );
    }
  }

  showPassword() {
    const icon: any = document.getElementById('togglePassword')
    const input: any = document.getElementById("password");
    if (input.type === "password") {
      input.type = "text";
      icon.setAttribute('class', 'ri-eye-off-line me-2');
      document.getElementById('text-psw')!.innerHTML = 'Nascondi Password';
    } else {
      input.type = "password";
      icon.setAttribute('class', 'ri-eye-line me-2');
      document.getElementById('text-psw')!.innerHTML = 'Mostra Password';
    }
  }

  setMomentDate(date: any) {
    let dt = new Date(date)
    return moment(date).format('L - LTS')
  }

  csvFileToJSON(id: string) {
    const input: any = document.getElementById(id);
    try {
      let reader = new FileReader();
      reader.readAsBinaryString(input.files[0]);
      reader.onload = function (e: any) {
        let jsonData = [];
        let headers = [];
        let rows: any = e.target.result.split("\r\n");
        for (let i = 0; i < rows.length; i++) {
          let cells = rows[i].split(",");
          let rowData: any = {};
          for (let j = 0; j < cells.length; j++) {
            if (i == 0) {
              let headerName = cells[j].trim();
              headers.push(headerName);
            } else {
              let key = headers[j];
              if (key) {
                rowData[key] = cells[j].trim();
              }
            }
          }
          if (i != 0) {
            jsonData.push(rowData);
          }
        }
        console.log('CSV to JSON: ', JSON.stringify(jsonData))
      }
    } catch (e) {
      console.error(e);
    }
  }

  toBack() {
    window.history.back();
  }


  setLog(typeOrgn?: string, name?: string, route?: string, method?: string, res?: any) {
    let user = res && res.user ? this.setConsoleUser(res.user) : ''
    let t = typeOrgn ? `Type: ${typeOrgn}` : 'Type: ' + null;
    let n = name ? `${name}` : null;
    let r = route ? `Route: ${route}` : 'Route: ' + null;
    let m = method ? `Method: ${method}` : 'Method: ' + null;
    let response = res && !res.user ? res : null;
    console.log(`
    -------------- LOG - ${n} -----------
    ${t}
    ${m} -- ${r}
    `, { response },
      `${user}`)
  }

  setConsoleUser(res: any) {
    let user = `
    USER
    _id: ${res._id} -- roles: ${res.roles[0]}
    name: ${res.name} -- surName:  ${res.surName}
    address: ${res.address}
    cap:  ${res.cap} -- city: ${res.city}
    email:  ${res.email} -- mobileNumber:  ${res.mobileNumber}

    `;
    return user;
  }

  consoleActions(title: string, action: string, obj?: any) {
    console.log(`
    Title: ${title} --  Action: ${action}
    OBJ: ${obj}
    `)
  }
}
