import { AbstractElement } from './abstractElement';
import { Hierarchy } from './hierarchy';
import { ElementType } from './enums/elementType';

export class DimensionElement extends AbstractElement {
  hierarchies: Hierarchy[] = [];

  constructor(name: string, hierarchies: Hierarchy[]) {
    super(name, ElementType.DIMENSION);
    this.hierarchies = hierarchies;
  }
}
