export class Yogi {
    name: string;
    login: string;
    birthday: string;
    email: string;
    password: string;
    ConnectionPerWeek: number;

    constructor(name: string, login: string, birthday: string, email: string, password: string, ConnectionPerWeek: number) {
       this.name = name;
       this.login = login;
       this.birthday = birthday;
       this.email = email;
       this.password = password;
       this.ConnectionPerWeek = ConnectionPerWeek;
    }
  }
