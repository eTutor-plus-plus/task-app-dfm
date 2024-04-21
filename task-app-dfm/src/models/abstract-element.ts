abstract class AbstractElement {
  private name: string;
  private elementType: ElementType;

  constructor(name: string, elementType: ElementType) {
    this.name = name;
    this.elementType = elementType;
  }
}
