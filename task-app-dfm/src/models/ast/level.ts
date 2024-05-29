import { ConnectionType } from '../enums/connectionType';
import { LevelType } from '../enums/levelType';

export class Level {
  name: string;
  optional: boolean = false;
  connectionType: ConnectionType = null;
  connection_optional: boolean = false;
  nextLevel: Level = null;
  levelType: LevelType = LevelType.LEVEL;

  constructor(name: string, connection: ConnectionType) {
    this.name = name;
    this.connectionType = connection;
  }
}
