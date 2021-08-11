// set function parseTime,formatTime to filter
export {
  parseTime,
  formatTime,
  dateFormat
}
from '@/utils'

function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化*/
export function numberFormatter(num, digits) {
  if (!num) return ''
  const si = [{
      value: 1e18,
      symbol: 'E'
    },
    {
      value: 1e15,
      symbol: 'P'
    },
    {
      value: 1e12,
      symbol: 'T'
    },
    {
      value: 1e9,
      symbol: 'G'
    },
    {
      value: 1e6,
      symbol: 'M'
    },
    {
      value: 1e3,
      symbol: 'k'
    }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (
        (num / si[i].value + 0.1)
        .toFixed(digits)
        .replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
      )
    }
  }
  return num.toString()
}

export function toThousandFilter(num) {
  return (+num || 0)
    .toString()
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

/**
 * 字典值过滤器
 * @param value 字典code
 * @param dicts 字典数组
 * @returns {string}
 */
export function dictFormat(value, dicts) {
  if (dicts == undefined || dicts.length == 0) {
    return ''
  }
  let name = ''
  dicts.forEach(item => {
    if (item.code == value || item.code == value) {
      name = item.name
    }
  })
  return name || value
}
/**
 *
 * @param {*} value
 * @param {*} dicts
 */
export function isNullOrEmpty(value, defaultEmptyValue) {
  if (value && value != 'NaN' && value != 'null' && value != 'undefined') {
    return value
  } else {
    return value + '' === '0' ? value : (defaultEmptyValue || '--')
  }
}

/**
 * 字典值过滤器
 * @param value 字典code
 * @param dicts 字典数组
 * @returns {string}
 */
export function dictFormats(value, dicts,splitChart) {
  if (value === undefined || dicts === undefined || dicts.length === 0) {
    return ''
  }
  const _code = value.toString().split(',')
  const names = []
  _code &&
    _code.forEach(el => {
      dicts.forEach(item => {
        if (item.code == el || item.code == Number(el)) {
          names.push(item.name)
        }
      })
    })
  return names.join(splitChart||',') || value
}

/**
 * @description 格式化金额
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认0位
 * @param decPoint：小数点符号 默认.
 * @param thousandsSep：千分位符号 默认为,
 */
export function formatMoney(number, decimals = 0, decPoint = '.', thousandsSep = ',') {
  if (number == 0) return 0;
  if (!number) return ''
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  let n = !isFinite(+number) ? 0 : +number
  let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  let sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  let dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s = ''
  let toFixedFix = function (n, prec) {
    return parseFloat(n).toFixed(prec)
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  let re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

/**
 * 格式化利率
 * @param loanRate
 */
export function formatLoanRate(loanRate) {
  let value = Math.round(parseFloat(loanRate) * 10000) / 10000
  const xsd = value.toString().split('.')
  if (xsd.length === 1) {
    value = value.toString() + '.0000'
    return value
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + '000'
    } else if (xsd[1].length < 3) {
      value = value.toString() + '00'
    } else if (xsd[1].length < 4) {
      value = value.toString() + '0'
    }
    return value
  }
}
/**
 * 格式化利率 控制小数位(默认保留两位小数)
 * @param loanRate
 */
export function formatRate(loanRate, num) {
  if (loanRate) {
    if (loanRate == 0) {
      return '0'
    }
    num = num ? num : 2
    return Number(loanRate).toFixed(Number(num))
  } else {
    return '-'
  }
}
/**
 * 手机号脱敏
 * @param str
 */
export function changePhone(str) {
  const reg = /^(\d{3})\d*(\d{4})$/
  const phone = str && str.replace(reg, '$1****$2')
  return phone
}
/**
 * 身份证号脱敏
 * @param str
 */
export function changeIdCard(str) {
  const reg = /^(\d{6})\d*(\d{4})$/
  const phone = str && str.replace(reg, '$1********$2')
  return phone
}
/**
 * 判断表单数据是否变化
 * @param a：form表单 b：form表单深拷贝数据源
 */
export function isObjectValueEqual(a, b) {
  var aProps = Object.getOwnPropertyNames(a)
  var bProps = Object.getOwnPropertyNames(b)
  if (aProps.length != bProps.length) {
    return false
  }
  for (var i = 0; i < aProps.length; i++) {
    var propName = aProps[i]
    if (
      (a[propName] == null ? '' : a[propName] + '') !=
      (b[propName] == null ? '' : b[propName] + '')
    ) {
      return false
    }
  }
  return true
}

export function withEmptyTxt(val) {
  if (val === undefined || val === '' || val === null) {
    return '-'
  }
  return val
}

export function isEmpty(val) {
  if (!Number(val) || !val) {
    return '-'
  }
}

// 时间戳格式化年月日
export function formatDate(date) {
  date = new Date(date)
  let fmt = 'yyyy/MM/dd hh:mm:ss'
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : ('00' + str).substr(str.length)
      )
    }
  }
  return fmt
}


// 根据身份证号获取基本信息，例如出生日期、年龄、性别
export function getInfoByIdCard(idCard, infoType) {
  if (!(idCard && infoType)) return '--'
  if (idCard.length < 15) return '--'
  if (infoType == 1) {
    //获取出生日期
    var birth =
      idCard.substring(6, 10) +
      "-" +
      idCard.substring(10, 12) +
      "-" +
      idCard.substring(12, 14)
    return birth
  }
  if (infoType == 2) {
    //获取性别
    if (parseInt(idCard.substr(16, 1)) % 2 == 1) {
      //男
      return "男"
    } else {
      //女
      return "女"
    }
  }
  if (infoType == 3) {
    //获取年龄
    var myDate = new Date()
    var month = myDate.getMonth() + 1
    var day = myDate.getDate()
    var age = myDate.getFullYear() - idCard.substring(6, 10) - 1
    if (
      idCard.substring(10, 12) < month ||
      (idCard.substring(10, 12) == month && idCard.substring(12, 14) <= day)
    ) {
      age++
    }
    return age
  }
}
