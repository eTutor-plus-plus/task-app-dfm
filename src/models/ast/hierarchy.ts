import { Level } from './level';
import { AbstractElement } from './abstractElement';
import { ElementType } from '../enums/elementType';

export class Hierarchy extends AbstractElement {
  head: Level = null;

  constructor(name: string) {
    super(name, ElementType.HIERARCHY);
  }

  public equals(other: AbstractElement): boolean {
    if (!(other instanceof Hierarchy)) {
      return false;
    }
    const otherHierarchy = other as Hierarchy;
    if (!this.head && !otherHierarchy.head) {
      return true;
    }
    if (
      (!this.head && otherHierarchy.head) ||
      (this.head && !otherHierarchy.head)
    ) {
      return false;
    }
    return this.head.equals(otherHierarchy.head);
  }

  public containsAllLevels(other: Hierarchy): boolean {
    let currentLevel = this.head;
    let otherCurrentLevel = other.head;
    while (currentLevel && otherCurrentLevel) {
      if (!currentLevel.equals(otherCurrentLevel)) {
        return false;
      }
      currentLevel = currentLevel.nextLevel;
      otherCurrentLevel = otherCurrentLevel.nextLevel;
    }
    return !currentLevel && !otherCurrentLevel;
  }
}
