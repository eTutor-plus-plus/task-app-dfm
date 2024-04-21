class DimensionElement extends AbstractElement {
  public hierarchies: Hierarchy[] = [];

  constructor(name: string, hierarchies: Hierarchy[]) {
    super(name, ElementType.DIMENSION);
    this.hierarchies = hierarchies;
  }
}
