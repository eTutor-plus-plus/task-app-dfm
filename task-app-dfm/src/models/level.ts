class Level {
  public name: string;
  public connection: ConnectionType = null;
  public nextLevel: Level = null;

  constructor(name: string, connection: ConnectionType) {
    this.name = name;
    this.connection = connection;
  }
}
