import { tetroSize, tetroTypes } from "..";

export class Mino {
  public mino: number[][] = [];
  public type: number;

  constructor(type: number) {
    this.type = type;
    this.mino = tetroTypes[this.type];
  }

  public getMino() {
    return this.mino;
  }

  public changeMino(minoType: number) {
    this.type = minoType;
    this.mino = tetroTypes[minoType];

    return this.mino;
  }

  /**
   *
   * @description ミノを回転させる
   * @param rotateType 0 | 1
   * 0なら反時計回り、1なら時計回りに回転させる
   *
   * @returns
   */
  public rotateMino(rotateType: number): number[][] {
    let newTet: number[][] = [];
    for (let y = 0; y < tetroSize; y++) {
      newTet[y] = [];
      for (let x = 0; x < tetroSize; x++) {
        let nx;
        let ny;
        if (!rotateType) {
          nx = tetroSize - x - 1;
          ny = y;
        } else {
          nx = x;
          ny = tetroSize - y - 1;
        }
        newTet[y][x] = this.mino[nx][ny];
      }
    }
    return newTet;
  }
}
