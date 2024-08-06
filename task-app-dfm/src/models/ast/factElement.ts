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

  public equalsWithoutDimensions(other: FactElement): boolean {
    if (!other) {
      return false;
    }

    if (
      this.descriptives.length !== other.descriptives.length ||
      this.measures.length !== other.measures.length
    ) {
      return false;
    }

    const sorted_descriptives = [...this.descriptives].sort();
    const other_sorted_descriptives = [...other.descriptives].sort();
    const sorted_measures = [...this.measures].sort();
    const other_sorted_measures = [...other_sorted_descriptives].sort();

    for (let i = 0; i < sorted_descriptives.length; i++) {
      if (sorted_descriptives[i] !== other_sorted_descriptives[i]) {
        return false;
      }
    }

    for (let i = 0; i < sorted_measures.length; i++) {
      if (sorted_measures[i] !== other_sorted_measures[i]) {
        return false;
      }
    }
    return true;
  }

  public equals(other: FactElement): boolean {
    if (!other) {
      return false;
    }

    if (!this.equalsWithoutDimensions(other)) {
      return false;
    }

    if (this.dimensions.length !== other.dimensions.length) {
      return false;
    }

    const sorted_dimensions = this.dimensions.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const other_sorted_dimensions = other.dimensions.sort((a, b) =>
      a.name.localeCompare(b.name),
    );

    for (let i = 0; i < sorted_dimensions.length; i++) {
      if (!sorted_dimensions[i].equals(other_sorted_dimensions[i])) {
        return false;
      }
    }
    return true;
  }
}
