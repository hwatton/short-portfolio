import LineFuncBasis from "../../../../helpers/lineFuncBasis"

function flowerData(x, y, pointNum, jank) {
  const cx = x / 2;
  const cy = y / 2;

  const jF = jank / 200;

  let r;

  if (cx > cy) {
    r = cx;
  } else {
    r = cy;
  }

  let rOne = r * 0.2;
  let rTwo = r * 0.8;
  const howFar = 0.2;
  let drift = Math.random() * (howFar * 2) - howFar;

  rOne = rOne + rOne * drift;

  drift = Math.random() * 0.2 - 0.1;

  rTwo = rTwo + rTwo * drift;

  let inOut = 0.3;
  let cFR = 0.8;

  let bump = [];
  for (let i = 0; i < pointNum; i++) {
    //how many petals
    /* editing **********

    let nx = cx + rOne * Math.cos((2 * Math.PI * i) / pointNum);
    let ny = cy + rOne * Math.sin((2 * Math.PI * i) / pointNum);

    bump.push({ x: nx, y: ny });

    let nx2 =
      cx + rTwo * Math.cos(2 * Math.PI * (i / pointNum + 1 / pointNum / 2));
    let ny2 =
      cy + rTwo * Math.sin(2 * Math.PI * (i / pointNum + 1 / pointNum / 2));

    bump.push({ x: nx2, y: ny2 });

    let tx = cx + rOne * Math.cos((2 * Math.PI * (i + 1)) / pointNum);
    let ty = cy + rOne * Math.sin((2 * Math.PI * (i + 1)) / pointNum);

    bump.push({ x: tx, y: ty });
    bump.push({ x: tx, y: ty });
editing **********       */

    // let newPath = LineFunc(bump);
    ///pathData.push(newPath);

    let nx = cx + rOne * Math.cos((2 * Math.PI * i) / pointNum);
    let ny = cy + rOne * Math.sin((2 * Math.PI * i) / pointNum);

    bump.push({ x: nx, y: ny });

    let tipStep = upOrDown(0.5, jF);

    let nx2 =
      cx +
      rTwo * cFR * Math.cos((2 * Math.PI * (i + (tipStep - inOut))) / pointNum);
    let ny2 =
      cy +
      rTwo * cFR * Math.sin((2 * Math.PI * (i + (tipStep - inOut))) / pointNum);

    bump.push({ x: nx2, y: ny2 });

    tipStep = upOrDown(0.5, jF);

    nx2 = cx + rTwo * 1 * Math.cos((2 * Math.PI * (i + tipStep)) / pointNum);
    ny2 = cy + rTwo * 1 * Math.sin((2 * Math.PI * (i + tipStep)) / pointNum);
    bump.push({ x: nx2, y: ny2 });

    tipStep = upOrDown(0.5, jF);

    nx2 =
      cx +
      rTwo * cFR * Math.cos((2 * Math.PI * (i + (tipStep + inOut))) / pointNum);
    ny2 =
      cy +
      rTwo * cFR * Math.sin((2 * Math.PI * (i + (tipStep + inOut))) / pointNum);
    bump.push({ x: nx2, y: ny2 });

    let tx = cx + rOne * Math.cos((2 * Math.PI * (i + 1)) / pointNum);
    let ty = cy + rOne * Math.sin((2 * Math.PI * (i + 1)) / pointNum);

    bump.push({ x: tx, y: ty });
    bump.push({ x: tx, y: ty });
  }
  /*
  let str = "";
  pathData.forEach((el) => {
    str = str + el;
  });

  return str;*/

  let nP = LineFuncBasis(bump);
  return nP;
}

function upOrDown(num, step) {
  let rS = Math.random() * step * 2 - step;
  let newNum = num + rS;

  return newNum;
}

export default flowerData;
