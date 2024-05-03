class Level {
  name: string;
  connection: ConnectionType = null;
  nextLevel: Level = null;

  constructor(name: string, connection: ConnectionType) {
    this.name = name;
    this.connection = connection;
  }
}
