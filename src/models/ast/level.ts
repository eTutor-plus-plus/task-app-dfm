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

  public equals(other: Level): boolean {
    if (!other) {
      return false;
    }

    if (
      (!this.nextLevel && other.nextLevel) ||
      (this.nextLevel && !other.nextLevel)
    ) {
      return false;
    }

    let nextLevelEquals = false;
    if (!this.nextLevel && !other.nextLevel) {
      nextLevelEquals = true;
    } else {
      nextLevelEquals = this.nextLevel.equals(other.nextLevel);
    }

    return (
      this.name === other.name &&
      this.optional === other.optional &&
      this.connectionType === other.connectionType &&
      this.connection_optional === other.connection_optional &&
      this.levelType === other.levelType &&
      nextLevelEquals
    );
  }
}
