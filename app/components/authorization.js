import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import Object, {action} from '@ember/object';
import fetch from 'fetch';

class Role {
  @tracked name
  @tracked active
  @tracked group

  constructor( {name, active, group} ) {
    this.name = name;
    this.active = active;
    this.group = group;
  }
}

export default class AuthorizationComponent extends Component {
  @tracked
  open = false

  constructor() {
    super(...arguments);

    this.roles = [
      new Role({
        name: "Mister mole",
        active: false,
        group: JSON.stringify([ { name: "clean", variables: [] }])
      }),
      new Role({
        name: "John Doe",
        active: false,
        // "[{\"variables\":[],\"name\":\"public\"},{\"variables\":[\"http://www.openlinksw.com/virtrdf-data-formats#default-iid\"],\"name\":\"read_documents\"},{\"variables\":[\"http://www.openlinksw.com/virtrdf-data-formats#default-iid\"],\"name\":\"write_documents\"},{\"variables\":[],\"name\":\"clean\"}]"
        group: JSON.stringify([{ name: "read_documents", variables: ["human"] }, { name: "write_documents", variables: ["human"] }, { name: "read", variables: [] }, { name: "clean", variables: [] } ])
      }), // <!-- Can see like us -->
      new Role({
        name: "SuperMan",
        active: false,
        group: JSON.stringify([{ name: "read_documents", variables: ["human"] }, { name: "read_documents", variables: ["laser"] }, { name: "write_documents", variables: ["laser"] }, { name: "read", variables: [] }, { name: "clean", variables: [] }])
      }), // <!-- Can see like us + lazers! -->
      new Role({
        name: "Batman",
        active: false,
        group: JSON.stringify([{ name: "read_documents", variables: ["human"] }, { name: "read_documents", variables: ["radar"] }, { name: "write_documents", variables: ["radar"] }, { name: "read", variables: [] }, { name: "clean", variables: [] }])
      }) // <!-- Can see with radar -->
    ];

    this.setActiveRole(this.roles[1]);
  }

  get activeRole() {
    return this.roles.find( (role) => role.active );
  }

  @action
  async setActiveRole( role ) {
    this.roles.forEach( (scannedRole) => {
      scannedRole.active = scannedRole == role;
    } );

    await fetch( "/mockauth/", {
      method: "post",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({body: role.group})
    } );

    this.roles.forEach( (scannedRole) => {
      scannedRole.active = scannedRole == role;
    } );

    if( this.args.onAuthorize ) {
      console.log("Got callback for authorize");
      this.args.onAuthorize();
    } else {
      console.log("There is no callback for authorize");
    }

  }
}
