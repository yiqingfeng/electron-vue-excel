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
      label: '属于',
      value: 'IN',
    },
    {
      label: '不属于',
      value: 'NIN',
    },
    {
      label: '为空（未填写）',
      value: 'IS',
    },
    {
      label: '不为空',
      value: 'NIS',
    },
  ];
  if (data) {
    return operators.find(o => o.value === data) || null;
  }
  return operators;
}
