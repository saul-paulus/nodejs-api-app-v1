export default class User {
  constructor({ id, username, id_personal, codeuker, id_role, password } = {}) {
    this.id = id;
    this.username = username;
    this.id_personal = id_personal;
    this.codeuker = codeuker;
    this.id_role = id_role;
    this.password = password;
  }

  toJSON() {
    return {
      id: this.id,
      username: this.username,
      id_personal: this.id_personal,
      codeuker: this.codeuker,
      id_role: this.id_role,
    };
  }
}
