import { ConnectionType } from './enums/connectionType';

export class Level {
  name: string;
  optional: boolean = false;
  connection: ConnectionType = null;
  nextLevel: Level = null;

  constructor(name: string, connection: ConnectionType) {
    this.name = name;
    this.connection = connection;
  }
}
