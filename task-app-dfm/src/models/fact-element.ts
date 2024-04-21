class FactElement extends AbstractElement {
  private descriptives: string[] = [];
  private measures: string[] = [];

  constructor(name: string, descriptives: string[], measures: string[]) {
    super(name, ElementType.FACT);
    this.descriptives = descriptives;
    this.measures = measures;
  }
}
