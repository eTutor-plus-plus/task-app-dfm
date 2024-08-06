import { AbstractElement } from './abstractElement';
import { Hierarchy } from './hierarchy';
import { ElementType } from '../enums/elementType';

export class DimensionElement extends AbstractElement {
  hierarchies: Hierarchy[] = [];

  constructor(name: string, hierarchies: Hierarchy[]) {
    super(name, ElementType.DIMENSION);
    this.hierarchies = hierarchies;
  }

  public equals(other: DimensionElement): boolean {
    if (!other) {
      return false;
    }

    if (this.hierarchies.length !== other.hierarchies.length) {
      return false;
    }

    const sorted_hierarchies = this.hierarchies.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const other_sorted_hierarchies = other.hierarchies.sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    for (let i = 0; i < sorted_hierarchies.length; i++) {
      if (!sorted_hierarchies[i].equals(other_sorted_hierarchies[i]))
        return false;
    }
    return true;
  }
}
