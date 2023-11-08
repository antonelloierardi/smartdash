export const Patterns = {
  email: new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/),
  mobile: new RegExp(/^[1-9][0-9]{9}$/),
  password:new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
}


/*
RegExp

Minimo otto caratteri, almeno una lettera e un numero:
"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"

Minimo otto caratteri, almeno una lettera, un numero e un carattere speciale:
"^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"

Minimo otto caratteri, almeno una lettera maiuscola, una lettera minuscola e un numero:
"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$"

Minimo otto caratteri, almeno una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale:
"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"

Minimo otto e massimo 10 caratteri, almeno una lettera maiuscola, una lettera minuscola, un numero e un carattere speciale:
"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$"

 */
