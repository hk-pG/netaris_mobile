export class Position2d {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public getPos() {
    return { x: this.x, y: this.y };
  }

  public setPos(pos: Partial<Position2d>) {
    this.x = pos.x ?? this.x;
    this.y = pos.y ?? this.y;
  }

  public moveLeft(moves: number = 1) {
    this.x -= moves;
  }

  public moveRight(moves: number = 1) {
    this.x += moves;
  }

  public drop(drops: number = 1) {
    this.y += drops;
  }
}
