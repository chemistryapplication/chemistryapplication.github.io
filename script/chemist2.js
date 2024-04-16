"use strict";
const z = 26;
const innerLayer = ["s", "p", "d", "f"];
max = []
const cal = function name(params) {
  let n;
  if (params < 2) {
    n = 1;
  } else if (params < 8) {
    n = 2;
  } else if (params < 18) {
    n = 3;
  } else if (params < 32) {
    n = 4;
  }
  let currE = params;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < i; j++) {
      if (currE === 0) {
        break;
      }
      switch (j) {
        case 0:
          if (currE >= (2 * j + 1) * 2) {
            console.log(`${i}${innerLayer[j]}2 `);
            currE -= 2;
            console.log(currE);
          } else {
            console.log(`${i} ${innerLayer[j]} ${currE}`);
            currE -= currE;
            console.log(currE);
          }
          break;

        case 1:
          if (currE >= (2 * j + 1) * 2) {
            console.log(`${i}${innerLayer[j]}6 `);
            currE -= 6;
            console.log(currE);
          } else {
            console.log(`${i} ${innerLayer[j]} ${currE}`);
            currE -= currE;
            console.log(currE);
          }
          break;

        case 2:
          if (currE >= (2 * j + 1) * 2) {
            console.log(`${i}${innerLayer[j]}10 `);
            currE -= 10;
            console.log(currE);
          } else {
            console.log(`${i} ${innerLayer[j]} ${currE}`);
            currE -= currE;
          }
          break;

        case 3:
          if (currE >= (2 * j + 1) * 2) {
            console.log(`${i}${innerLayer[j]}18 `);
            currE -= 18;
          } else {
            console.log(`${i} ${innerLayer[j]} ${currE}`);
            currE -= currE;
            console.log(currE);
          }
          break;
        default:
          break;
      }
    }
  }
};

cal(z);
