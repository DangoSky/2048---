
import data from './data';
export default {
  // 初始化数组和生成两个随机数
  init() {
    data.arr = Array.from(Array(data.size)).map(() => Array(data.size).fill(0));
    data.add = Array.from(Array(data.size)).map(() => Array(data.size).fill(0));
    this.generateNumber();
    this.generateNumber();
  },
  // 给一个随机格子生成一个随机数
  generateNumber() {
    if(this.hasSpace()) {
      let ran = (Math.random() < 0.5) ? 2 : 4;
      while(true) {
        let ranX = Math.floor(Math.random() * data.size);
        let ranY = Math.floor(Math.random() * data.size);
        if (data.arr[ranX][ranY] === 0) {
          data.arr[ranX][ranY] = ran;
          break;
        }
      }
    }
  },
  // 判断是否还有空格
  hasSpace() {
    for (let i = 0; i < data.size; i++) {
      for (let j = 0; j < data.size; j++) {
        if (data.arr[i][j] === 0) {
          return true;
        }
      }
    }
    return false;
  },
  // 将每个格子的数字都重置为还没有合并
  initadd() {
    for (let i = 0; i < data.size; i++) {
      for (let j = 0; j < data.size; j++) {
        data.add[i][j] = 0;
      }
    }
  },
  // 判断水平方向上两个格子之间有没有障碍物
  noBlockHorizontal(row, fromCol, toCol) {
    for (let i=fromCol+1; i<toCol; i++) {
      if (data.arr[row][i] !== 0) return false;
    }
    return true;
  },
  // 判断竖直方向上两个格子之间有没有障碍物
  noBlockVertical(col, fromRow, toRow) {
    for(let i=fromRow+1; i<toRow; i++) {
      if(data.arr[i][col] !== 0)  return false;
    }
    return true;
  },
  // 向左移动
  moveLeft() {
    if (!this.canMoveLeft()) return false;
    this.initadd(); // 将判断是否要合并的data.add数组重置为0
    console.log("left start");
    for (let i = 0; i < data.size; i++) {
      for (let j = 1; j < data.size; j++) {
        if (data.arr[i][j] != 0) {
          for (let t = 0; t < j; t++) {
            if (data.arr[i][t] == 0 && this.noBlockHorizontal(i, t, j)) { //到达位置为空而且中间没有障碍物
              //  showMoveWithAnimation(i, i, j, t); //第i行到第i行，第j列到第t列
              data.arr[i][t] = data.arr[i][j];
              data.arr[i][j] = 0;
              break;
            } else if (data.arr[i][t] == data.arr[i][j] && this.noBlockHorizontal(i, t, j)) {
              if (data.add[i][t] == 0) { //可以和到达位置的方格合并
                // showMoveWithAnimation(i, i, j, t);
                data.arr[i][t] += data.arr[i][j];
                // score+= data.arr[i][t];
                data.arr[i][j] = 0;
                data.add[i][t] = 1;
              } else { //到达位置的方格已经被合并过，退而占据右边的方格
                // showMoveWithAnimation(i, i, j, t+1);
                data.arr[i][t + 1] = data.arr[i][j];
                data.arr[i][j] = 0;
              }
              break;
            }
          }
        }
      }
    }
    console.log("left end");
    console.log(data.arr);
  },
  // 向右移动
  moveRight() {
    if (!this.canMoveRight()) return false;
    this.initadd();
    for (let i = 0; i < data.size; i++) {
      for (let j = 2; j >= 0; j--) {
        if (data.arr[i][j] != 0) {
          for (let t = 3; t > j; t--) {
            if (data.arr[i][t] == 0 && this.noBlockHorizontal(i, j, t)) {
              // showMoveWithAnimation(i, i, j, t);                
              data.arr[i][t] = data.arr[i][j];
              data.arr[i][j] = 0;
              break;
            } else if (data.arr[i][t] == data.arr[i][j] && this.noBlockHorizontal(i, j, t)) {
              if (data.add[i][t] == 0) {
                // showMoveWithAnimation(i, i, j, t);
                data.arr[i][t] += data.arr[i][j];
                // score+= data.arr[i][t];
                data.arr[i][j] = 0;
                data.add[i][t] = 1;
              } else {
                // showMoveWithAnimation(i, i, j, t - 1);
                data.arr[i][t - 1] = data.arr[i][j];
                data.arr[i][j] = 0;
              }
              break;
            }
          }
        }
      }
    }
  },
  // //向上移动
  moveUp() {
    if (!this.canMoveUp()) return false;
    this.initadd();
    for (let j = 0; j < data.size; j++) {
      for (let i = 1; i < data.size; i++) {
        if (data.arr[i][j] != 0) {
          for (let t = 0; t < i; t++) {
            if (data.arr[t][j] == 0 && this.noBlockVertical(j, t, i)) {
              // showMoveWithAnimation(i, t, j, j);
              data.arr[t][j] = data.arr[i][j];
              data.arr[i][j] = 0;
              break;
            } else if (data.arr[t][j] == data.arr[i][j] && this.noBlockVertical(j, t, i)) {
              if (data.add[t][j] == 0) {
                // showMoveWithAnimation(i, t, j, j);
                data.arr[t][j] += data.arr[i][j];
                // score += data.arr[t][j];
                data.arr[i][j] = 0;
                data.add[t][j] = 1;
              } else {
                // showMoveWithAnimation(i, i, j, t + 1);
                data.arr[t + 1][j] = data.arr[i][j];
                data.arr[i][j] = 0;
              }
              break;
            }
          }
        }
      }
    }
  },
  // //向下移动
  moveDown() {
    if (!this.canMoveDown()) return false;
    this.initadd();
    for (let j = 0; j < data.size; j++) {
      for (let i = 2; i >= 0; i--) {
        if (data.arr[i][j] != 0) {
          for (let t = 3; t > i; t--) {
            if (data.arr[t][j] == 0 && this.noBlockVertical(j, i, t)) {
              // showMoveWithAnimation(i, t, j, j);
              data.arr[t][j] = data.arr[i][j];
              data.arr[i][j] = 0;
              break;
            } else if (data.arr[t][j] == data.arr[i][j] && this.noBlockVertical(j, i, t)) {
              if (data.add[t][j] == 0) {
                // showMoveWithAnimation(i, t, j, j);
                data.arr[t][j] += data.arr[i][j];
                // score += data.arr[t][j];
                data.arr[i][j] = 0;
                data.add[t][j] = 1;
              } else {
                // showMoveWithAnimation(i, i, j, t - 1);
                data.arr[t - 1][j] = data.arr[i][j];
                data.arr[i][j] = 0;
              }
              break;
            }
          }
        }
      }
    }
  },
  // 判断是往哪个方向的移动
  judgeDirection(angle) {
    if (angle >= data.size && angle <= 135) {
      return 1;
    } else if (angle < data.size && angle >= -data.size) {
      return 2;
    } else if (angle < -data.size && angle >= -135) {
      return 3;
    } else if ((angle < -135 && angle >= -180) || (angle > 135 && angle <= 180)) {
      return data.size;
    } else {
      return 0;
    }
  },
  //判断格子是否可以向左移动
  canMoveLeft() {
    for (let i = 0; i < data.size; i++) {
      for (let j = 1; j < data.size; j++) {
        if (data.arr[i][j] !== 0) {
          if (data.arr[i][j - 1] === 0 || data.arr[i][j - 1] === data.arr[i][j]) return true;
        }
      }
    }
    return false;
  },
  //判断格子是否可以向右移动
  canMoveRight() {
    for (let i = 0; i < data.size; i++) {
      for (let j = 2; j >= 0; j--) {
        if (data.arr[i][j] != 0) {
          if (data.arr[i][j + 1] === 0 || data.arr[i][j + 1] === data.arr[i][j]) return true;
        }
      }
    }
    return false;
  },
  //判断格子是否可以向上移动
  canMoveUp() {
    for (let i = 1; i < data.size; i++) {
      for (let j = 0; j < data.size; j++) {
        if (data.arr[i][j] != 0) {
          if (data.arr[i - 1][j] === 0 || data.arr[i - 1][j] === data.arr[i][j]) return true;
        }
      }
    }
    return false;
  },
  //判断格子是否可以向下移动
  canMoveDown() {
    for (let i = 2; i >= 0; i--) {
      for (let j = 0; j < data.size; j++) {
        if (data.arr[i][j] != 0) {
          if (data.arr[i + 1][j] === 0 || data.arr[i + 1][j] === data.arr[i][j]) return true;
        }
      }
    }
    return false;
  }
};
