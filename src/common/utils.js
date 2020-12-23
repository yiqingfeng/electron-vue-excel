/**
 * @description 通用处理
 */
/**
 * @description 获取字段操作符的数据
 */
export function getFieldOperatorData(data) {
  const operators = [{
      label: '等于',
      value: 'EQ',
    },
    {
      label: '不等于',
      value: 'N',
    }, {
      label: '大于',
      value: 'GT',
    }, {
      label: '小于',
      value: 'LT',
    }, {
      label: '大于或等于',
      value: 'GTE',
    }, {
      label: '小余或等于',
      value: 'LTE',
    }, {
      //   label: '属于',
      //   value: 'IN',
      // },
      // {
      //   label: '不属于',
      //   value: 'NIN',
    // }, {
      label: '为空（未填写）',
      value: 'IS',
    }, {
      label: '不为空',
      value: 'NIS',
    },
  ];
  if (data) {
    return operators.find(o => o.value === data) || null;
  }
  return operators;
}

export function isMatchForOperatorData(operator, data, target) {
  const actions = {
    'EQ': (d, t) => String(d) === String(t),
    'N': (d, t) => String(d) === String(t),
    'GT': (d, t) => Number(d) > Number(t),
    'LT': (d, t) => Number(d) < Number(t),
    'GTE': (d, t) => Number(d) >= Number(t),
    'LTE': (d, t) => Number(d) <= Number(t),
    // 'IN': (d, t) => Number(d) === Number(t),
    // 'NIN': (d, t) => String(d) === String(t),
    'IS': (d) => d === undefined || d === null,
    'NIS': (d) => d !== undefined || d !== null,
  };
  const action = actions[operator] || function () {
    return true
  };
  return action(data, target);
}
