class Calc {
  constructor() {}

  static add(summand, ...rest) {
    return [...rest].reduce((acc, item) => acc + item, summand);
  }

  static subtract(minuend, ...rest) {
    return [...rest].reduce((minuend, subtrahend) => minuend - subtrahend, minuend);
  }
  static multiply(x, ...rest) {
    return [...rest].reduce((prod, item) => prod * item, x);
  }

  static divide(divident, ...rest) {
    return [...rest].reduce((divident, divisor) => divident / divisor, divident);
  }

  static compute(arr) {
    const strExpression = arr.map(x => (/[-+*\/\.\d]/g.test(x) ? x.match(/[-+*\/\.\d]/g).join('') : x));
    const numExpression = strExpression.map(x => (parseFloat(x) ? parseFloat(x) : x));
    for (let i = 1; i < numExpression.length; i += 2) {
      if (numExpression[i] === '*') {
        const temp = Calc.multiply(numExpression[i - 1], numExpression[i + 1]);
        numExpression.splice(i - 1, 3, temp);
        i -= 2;
      } else if (numExpression[i] === '/') {
        const temp = Calc.divide(numExpression[i - 1], numExpression[i + 1]);
        numExpression.splice(i - 1, 3, temp);
        i -= 2;
      }
    }

    for (let i = 1; i < numExpression.length; i += 2) {
      if (numExpression[i] === '+') {
        const temp = Calc.add(numExpression[i - 1], numExpression[i + 1]);
        numExpression.splice(i - 1, 3, temp);
        i -= 2;
      } else if (numExpression[i] === '-') {
        const temp = Calc.subtract(numExpression[i - 1], numExpression[i + 1]);
        numExpression.splice(i - 1, 3, temp);
        i -= 2;
      }
    }
    refs.expression.length = 0;
    refs.operand = numExpression.join('');
    refs.canCompute = false;
    return refs.operand;
  }

  static allClear(clearCount) {
    if (clearCount) {
      refs.operand = '';
      refs.expression.length = 0;
      refs.clearCount = 0;
    } else {
      refs.operand = '';
      refs.clearCount = 1;
    }
  }
}

const refs = {
  container: document.querySelector('.calc-container'),
  form: document.querySelector('.calc'),
  button: document.querySelector('.calc').elements,
  display: document.querySelector('.calc').elements.display,
  canDot: true,
  canMath: false,
  canCompute: false,
  operand: '',
  expression: [],
  clearCount: 0,
};

refs.form.addEventListener('click', e => {
  const dataID = e.target.dataset.id;
  if (dataID === 'display') {
    return;
  }

  if (dataID === 'compute') {
    return;
  }
  const last = refs.expression.length - 1;
  const symbol = e.target.value ? e.target.value : e.target.textContent;

  if (dataID === 'clear') {
    if (refs.display.value) {
      Calc.allClear(refs.clearCount);
      refs.canDot = true;
    }
  }

  if (dataID === 'point') {
    if (!refs.operand.length) {
      refs.operand = '0.';
      refs.canDot = false;
    } else if (refs.canDot && refs.operand.startsWith('(-')) {
      refs.operand = refs.operand.slice(2, -1);
      refs.operand += '.';
      refs.operand = `(-${refs.operand})`;
      refs.canDot = false;
    } else if (refs.canDot) {
      refs.operand += '.';
      refs.canDot = false;
    }
  }

  if (dataID === 'maths' && refs.canMath) {
    if (refs.operand.endsWith('.')) {
      refs.operand = refs.operand.slice(0, -1);
      refs.expression.push(refs.operand);
      refs.expression.push(` ${symbol} `);
      refs.operand = '';
      refs.canDot = true;
    } else if (refs.operand.endsWith('.)')) {
      refs.operand = refs.operand.slice(0, -2);
      refs.operand = `${refs.operand})`;
      refs.expression.push(refs.operand);
      refs.expression.push(` ${symbol} `);
      refs.operand = '';
      refs.canDot = true;
    } else if (!refs.operand && refs.expression[last] && refs.expression[last].endsWith(' ')) {
      refs.expression.pop();
      refs.expression.push(` ${symbol} `);
      refs.canDot = true;
    } else {
      refs.expression.push(refs.operand);
      refs.expression.push(` ${symbol} `);
      refs.operand = '';
      refs.canDot = true;
      refs.canMath = true;
    }
  }

  if (dataID === 'digit') {
    if (refs.operand.startsWith('(-')) {
      refs.operand = refs.operand.slice(2, -1);
      refs.operand += symbol;
      refs.operand = `(-${refs.operand})`;
      refs.canMath = true;
      refs.clearCount = 0;
    } else {
      refs.operand += symbol;
      refs.canMath = true;
      refs.clearCount = 0;
    }
  }

  if (dataID === 'negative') {
    if (refs.operand.startsWith('(-')) {
      refs.operand = refs.operand.slice(2, -1);
    } else if (refs.expression.length && refs.expression[last].includes('-')) {
      refs.expression.pop();
      refs.expression.push(' + ');
    } else if (refs.expression.length && refs.expression[last].includes('+')) {
      refs.expression.pop();
      refs.expression.push(' - ');
    } else {
      refs.operand = `(-${refs.operand})`;
    }
  }
  refs.display.value = refs.expression.join('') + refs.operand;
  refs.canCompute = true;
});

refs.form.addEventListener('click', e => {
  if (e.target.dataset.id === 'sqrt') {
    const last = refs.expression.length - 1;
    if (Calc.compute(refs.expression) < 0) {
      refs.display.value = 'Err';
      setTimeout(() => {
        Calc.allClear(1);
      }, 3000);
    }

    if (!refs.expression.length && !refs.operand) {
      refs.display.value = Math.sqrt(Calc.compute(refs.expression));
    } else if (!refs.expression.length && refs.operand) {
      refs.expression.push(refs.operand);
      refs.display.value = Math.sqrt(Calc.compute(refs.expression));
    } else if (refs.expression[last].endsWith(' ')) {
      if (refs.operand) {
        refs.expression.push(refs.operand);
      } else if (!refs.operand) {
        refs.expression.pop();
      }
      refs.display.value = Math.sqrt(Calc.compute(refs.expression));
    } else {
      refs.expression.push(refs.operand);
      refs.display.value = Math.sqrt(Calc.compute(refs.expression));
    }
    refs.canCompute = false;
  }
});

refs.form.addEventListener('click', e => {
  if (e.target.dataset.id === 'compute') {
    const last = refs.expression.length - 1;

    if (refs.canCompute) {
      if (!refs.expression.length && !refs.operand) {
        refs.display.value = Calc.compute(refs.expression);
      } else if (!refs.expression.length && refs.operand) {
        refs.expression.push(refs.operand);
        refs.display.value = Calc.compute(refs.expression);
      } else if (refs.expression[last].endsWith(' ')) {
        if (refs.operand) {
          refs.expression.push(refs.operand);
        } else if (!refs.operand) {
          refs.expression.pop();
        }
        refs.display.value = Calc.compute(refs.expression);
      } else {
        refs.expression.push(refs.operand);
        refs.display.value = Calc.compute(refs.expression);
      }
    }
    refs.canCompute = false;
  }
});
