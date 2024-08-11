import { AbstractElement } from './abstractElement';
import { ConnectionType } from '../enums/connectionType';
import { ElementType } from '../enums/elementType';

export class FactDimensionElement extends AbstractElement {
  relationFromName: string;
  relationToName: string;
  relationType: ConnectionType = ConnectionType.SIMPLE;

  constructor(relationFromName: string, relationToName: string) {
    super(relationFromName, ElementType.FACT_DIMENSION_CONNECTION);
    this.relationFromName = relationFromName;
    this.relationToName = relationToName;
  }

  public equals(other: AbstractElement): boolean {
    if (!(other instanceof FactDimensionElement)) {
      return false;
    }
    const otherFactDimension = other as FactDimensionElement;

    return (
      this.relationFromName === otherFactDimension.relationToName &&
      this.relationToName === otherFactDimension.relationToName &&
      this.relationType === otherFactDimension.relationType
    );
  }
}
