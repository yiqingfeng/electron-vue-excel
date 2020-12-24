/**
 * @description JS 浮点数计算处理
 * @author daiq 2020-01-17
 */
/**
 * @description 将指定字符串或数字转换成数字 undefined | null 会被视为 0
 * @param num {string | number} 带转换的数字
 */
function toNumber(num) {
  let data = Number(num);
  if (isNaN(data)) {
    data = 0;
  }
  return data;
}
/**
 * @description 获取数字的最大精度（即最大小数位数）
 */
function getMaxPrecision() {
  var numPrecisions = [];
  var nums = Array.prototype.slice.call(arguments, 0);

  nums.forEach(function (num) {
    var len;

    try {
      len = String(num).split('.')[1].length;
    } catch (err) {
      len = 0;
    }

    numPrecisions.push(len);
  });
  return Math.max.apply(Math, numPrecisions);
}
/**
 * @description 获取数字的精度之和
 */
function getTotalPrecision() {
  var total = 0;
  var nums = Array.prototype.slice.call(arguments, 0);

  nums.forEach(function (num) {
    var len;

    try {
      len = String(num).split('.')[1].length;
    } catch (err) {
      len = 0;
    }

    total += len;
  });
  return total;
}
/**
 * @description 字符串表达式预处理
 * @param {Array|String} expQueue 运算表达式 ['1', '+', '2'] 或 '1 + 2'
 * @returns {Array} 计算队列
 */
var OPERATORS = ['+', '-', '*', '/', '(', ')'];

function preExpCalc() {
  var expQueue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  if (Array.isArray(expQueue)) {
    return expQueue.map(function (item) {
      if (OPERATORS.indexOf(item) === -1) {
        return toNumber(item);
      }

      return item;
    });
  }

  var result = [];
  var temp = '';

  for (var i = 0, len = expQueue.length; i < len; i++) {
    if (OPERATORS.indexOf(expQueue[i]) === -1) {
      temp += expQueue[i];
      continue;
    }
    temp = temp.trim();
    // 判断是否为负号
    if (expQueue[i] === '-' && !temp) {
      temp += expQueue[i];
      continue;
    }
    // 判断是否为左括号
    if (expQueue[i] === '(') {
      result.push(expQueue[i]);
      temp = '';
      continue;
    }
    // 判断前一个符号是否为右括号
    if (result[result.length - 1] === ')') {
      result.push(expQueue[i]);
      temp = '';
      continue;
    }

    result.push(toNumber(temp), expQueue[i]);
    temp = '';
  }

  if (temp) {
    result.push(toNumber(temp));
  }

  return result;
}

/**
 * @description toFixed 四舍五入有问题，重写
 * num * +1精度 / 10 是为了避免数据错误 eg. 271395.225 * 100 === 27139522.499999996
 */
function numberToFixed(num, decimal) {
  var assistNum = Math.pow(10, decimal);
  return (Math.round(10 * assistNum * num / 10) / assistNum).toFixed(decimal);
}

/**
 * @description 浮点数相关计算，所有计算结果均会返回对应字符串
 */
var _default = {
  /**
   * @description 设置数字的精度
   */
  setNumberDecimal: function (num, decimal) {
    if (isNaN(num) || isNaN(decimal) || Number(decimal) < 0) {
      return num;
    }

    return numberToFixed(num, decimal);
  },

  /**
   * @description 获取数组中最大精度
   */
  getMaxNumberDecimal: function (nums) {
    return getMaxPrecision.apply(this, nums);
  },

  /**
   * @description 两数相加，未传值时默认为 0
   * @param {Number | String} num1 | num2 参与计算的数
   * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
   */
  addCalc: function () {
    var num1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var num2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var decimal = arguments.length > 2 ? arguments[2] : undefined;
    var maxPrecision = getMaxPrecision(num1, num2);
    // var assistNum = 10 ** maxPrecision; // 268.34 * 100 === 26833.999999999996
    var assistNum = Math.pow(10, maxPrecision);

    var result = (this.mulCalc(num1, assistNum) + this.mulCalc(num2, assistNum)) / assistNum;
    return this.setNumberDecimal(result, decimal);
  },

  /**
   * @description 两数相减
   * @param {Number | String} num1 | num2 参与计算的数
   * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
   */
  subCalc: function subCalc() {
    var num1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var num2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var decimal = arguments.length > 2 ? arguments[2] : undefined;
    var result = this.addCalc(num1, -Number(num2));
    return this.setNumberDecimal(result, decimal);
  },

  /**
   * @description 两数相乘
   * @param {Number | String} num1 | num2 参与计算的数
   * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
   */
  mulCalc: function mulCalc() {
    var num1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var num2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    var decimal = arguments.length > 2 ? arguments[2] : undefined;
    var assistNum = Math.pow(10, getTotalPrecision(num1, num2));
    var result = String(num1).replace('.', '') * String(num2).replace('.', '') / assistNum;
    return this.setNumberDecimal(result, decimal);
  },

  /**
   * @description 两数相除
   * @param {Number | String} num1 | num2 参与计算的数
   * @param {Number} decimal 计算精度，如果传递，则返回进行精度控制后的结果。
   */
  divCalc: function divCalc() {
    var num1 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var num2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var decimal = arguments.length > 2 ? arguments[2] : undefined;
    var maxPrecision = getMaxPrecision(num1, num2);
    var assistNum = Math.pow(10, maxPrecision);
    var result = this.mulCalc(num1, assistNum) / this.mulCalc(num2, assistNum);
    return this.setNumberDecimal(result, decimal);
  },

  /**
   * @description 字符串表达式四则运算
   * todos: 后续可以考虑支持小括号
   * @param {Array|String} expQueue 运算表达式 ['1', '+', '2'] 或 '1 + 2'
   * @param {Number} decimal 计算精度
   *      计算精度如果传递，则每次计算都会进行精度控制（即会存在精度损失）。
   *      场景：涉及多重计算时，与后台保持一致
   */
  expCalc: function expCalc(expQueue, decimal) {
    var _this = this;

    var queue = preExpCalc(expQueue);
    /**
     * 利用 栈 进行表达式求值 https://www.cnblogs.com/lulipro/p/7450886.html
     * 通过将中缀表达式装换为后缀表达式，便不再需要分界符 '(' ')'，同时运算符的优先级也会比较清晰
     * 逆波兰算法 1. 转换为后缀表达式  2. 依据特殊计算规则  eg. 2 * (3 + 4) => 2 (3 4 +) *
     */
    // 将计算队列转换成 逆波兰表达式队列

    var convert = function convert() {
      var queue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var numberStack = [];
      var operatorStack = [];

      var isAddOrSub = function isAddOrSub(item) {
        return item === '+' || item === '-';
      };

      queue.forEach(function (item) {
        // 操作数直接进入队列
        if (!OPERATORS.includes(item)) {
          numberStack.push(item);
          return;
        } // 如果操作符栈为空，或当前操作符为 '(' 左分界符时，直接压入栈中

        var flag = true;
        while (flag) {
          if (operatorStack.length === 0 || item === '(') {
            operatorStack.push(item);
            break;
          }

          var lastOperator = operatorStack.pop(); // `)` 的优先级最高，只要操作符不为 `(` 则一直输出

          if (item === ')') {
            if (lastOperator !== '(') {
              numberStack.push(lastOperator);
              continue;
            } // 跳出循环，不需要输出 `(`


            break;
          }

          if (lastOperator === '(') {
            operatorStack.push(lastOperator, item);
            break;
          } // '+' '-' 操作符的优先级最低


          if (isAddOrSub(item) && !isAddOrSub(lastOperator)) {
            numberStack.push(lastOperator);
            continue;
          }

          operatorStack.push(lastOperator, item);
          break;
        }
      });

      while (operatorStack.length) {
        var lastOperator = operatorStack.pop();

        if (lastOperator !== '(') {
          numberStack.push(lastOperator);
        }
      }

      return numberStack;
    }; // 计算处理逆波兰表达式队列


    var calculate = function calculate() {
      var polishArr = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      // var operators = ['+', '-', '*', '/'];
      var result = [];
      polishArr.forEach(function (item) {
        if (!OPERATORS.includes(item)) {
          return result.push(item);
        }

        var num2 = result.pop();
        var num1 = result.pop();

        switch (item) {
          case '+':
            result.push(_this.addCalc(num1, num2, decimal));
            break;

          case '-':
            result.push(_this.subCalc(num1, num2, decimal));
            break;

          case '*':
            result.push(_this.mulCalc(num1, num2, decimal));
            break;

          case '/':
            result.push(_this.divCalc(num1, num2, decimal));
            break;
        }
      });
      return result.pop();
    };

    return calculate(convert(queue));
  }
};
export default _default;
