import { tetroSize, tetroTypes } from "..";

export class Mino {
  private mino: number[][] = [];
  private type: number;

  constructor(type: number) {
    this.type = type;
    this.mino = tetroTypes[this.type];
  }

  public get _mino() {
    return this.mino;
  }

  public get _type() {
    return this.type;
  }

  public getInfo() {
    return { mino: this.mino, type: this.type };
  }

  public changeMino(minoType: number) {
    this.type = minoType;
    this.mino = tetroTypes[minoType];

    return this.mino;
  }

  public cloneMino() {
    const newMino = new Mino(this.type);

    newMino.mino = this.mino.map((y) => y.map((x) => x));

    return newMino;
  }

  public setRotation(rotations: number) {
    if (rotations < 0) {
      rotations = 4 - (rotations % 4);
    }
    for (let i = 0; i < rotations % 4; i++) {
      this.rotateMino(1);
    }
  }

  /**
   *
   * @description ミノを回転させる
   * @param rotateType -1 | 1
   * -1なら反時計回り、1なら時計回りに回転させる
   *
   * @returns
   */
  public rotateMino(rotateType: number): number[][] {
    const rotatedMino: number[][] = [];
    for (let y = 0; y < tetroSize; y++) {
      rotatedMino[y] = [];
      for (let x = 0; x < tetroSize; x++) {
        let nx;
        let ny;
        // 回転方向によって、入れ替える向きを変える
        if (rotateType == 1) {
          nx = tetroSize - x - 1;
          ny = y;
        } else {
          nx = x;
          ny = tetroSize - y - 1;
        }

        rotatedMino[y][x] = this.mino[nx][ny];
      }
    }

    this.mino = rotatedMino;

    return rotatedMino;
  }
}
