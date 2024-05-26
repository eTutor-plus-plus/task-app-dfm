import { AbstractElement } from './abstractElement';
import { ElementType } from '../enums/elementType';
import { DimensionElement } from './dimensionElement';

export class FactElement extends AbstractElement {
  descriptives: string[] = [];
  measures: string[] = [];
  dimensions: DimensionElement[] = [];

  constructor(name: string) {
    super(name, ElementType.FACT);
  }
}
