/**
 * Created by jiachenpan on 16/11/18.
 */
import CryptoJS from "crypto-js"
import store from "@/store";

// 加密
export function encrypt( src, rawkey ) {
  let key = rawkey ? rawkey : "ahhfkxjf"
  let keyHex = CryptoJS.enc.Utf8.parse( key )
  let ivHex = CryptoJS.enc.Utf8.parse( key )
  let encrypted = CryptoJS.DES.encrypt( src, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  } )
  return encrypted.ciphertext.toString( CryptoJS.enc.Base64 )
}

// 解密
export function decrypt( src, rawkey ) {
  let key = rawkey ? rawkey : "ahhfkxjf"
  var keyHex = CryptoJS.enc.Utf8.parse( key )
  var ivHex = CryptoJS.enc.Utf8.parse( key )
  var decrypted = CryptoJS.DES.decrypt( {
      ciphertext: CryptoJS.enc.Base64.parse( src ),
    },
    keyHex, {
      iv: ivHex,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  )
  return decrypted.toString( CryptoJS.enc.Utf8 )
}

// 下载
export function download( url ) {
  var iframe = document.createElement( 'iframe' );
  iframe.style.display = 'none'
  document.body.appendChild( iframe );
  setTimeout( function () {
    iframe.src = url;
  }, 300 )
}

export function parseTime( time, cFormat ) {
  if ( arguments.length === 0 ) {
    return null;
  }
  const format = cFormat || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if ( typeof time === "object" ) {
    date = time;
  } else {
    if ( typeof time === "string" && /^[0-9]+$/.test( time ) ) {
      time = parseInt( time );
    }
    if ( typeof time === "number" && time.toString().length === 10 ) {
      time = time * 1000;
    }
    date = new Date( time );
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  };
  const time_str = format.replace( /{(y|m|d|h|i|s|a)+}/g, ( result, key ) => {
    let value = formatObj[ key ];
    // Note: getDay() returns 0 on Sunday
    if ( key === "a" ) {
      return [ "日", "一", "二", "三", "四", "五", "六" ][ value ];
    }
    if ( result.length > 0 && value < 10 ) {
      value = "0" + value;
    }
    return value || 0;
  } );
  return time_str;
}

export function formatTime( time, option ) {
  time = +time * 1000;
  const d = new Date( time );
  const now = Date.now();

  const diff = ( now - d ) / 1000;

  if ( diff < 30 ) {
    return "刚刚";
  } else if ( diff < 3600 ) {
    // less 1 hour
    return Math.ceil( diff / 60 ) + "分钟前";
  } else if ( diff < 3600 * 24 ) {
    return Math.ceil( diff / 3600 ) + "小时前";
  } else if ( diff < 3600 * 24 * 2 ) {
    return "1天前";
  }
  if ( option ) {
    return parseTime( time, option );
  } else {
    return (
      d.getMonth() +
      1 +
      "月" +
      d.getDate() +
      "日" +
      d.getHours() +
      "时" +
      d.getMinutes() +
      "分"
    );
  }
}

// 格式化时间
export function getQueryObject( url ) {
  url = url == null ? window.location.href : url;
  const search = url.substring( url.lastIndexOf( "?" ) + 1 );
  const obj = {};
  const reg = /([^?&=]+)=([^?&=]*)/g;
  search.replace( reg, ( rs, $1, $2 ) => {
    const name = decodeURIComponent( $1 );
    let val = decodeURIComponent( $2 );
    val = String( val );
    obj[ name ] = val;
    return rs;
  } );
  return obj;
}

/**
 * @param {Sting} input value
 * @returns {number} output value
 */
export function byteLength( str ) {
  // returns the byte length of an utf8 string
  let s = str.length;
  for ( var i = str.length - 1; i >= 0; i-- ) {
    const code = str.charCodeAt( i );
    if ( code > 0x7f && code <= 0x7ff ) s++;
    else if ( code > 0x7ff && code <= 0xffff ) s += 2;
    if ( code >= 0xdc00 && code <= 0xdfff ) i--;
  }
  return s;
}

export function cleanArray( actual ) {
  const newArray = [];
  for ( let i = 0; i < actual.length; i++ ) {
    if ( actual[ i ] ) {
      newArray.push( actual[ i ] );
    }
  }
  return newArray;
}

export function param( json ) {
  if ( !json ) return "";
  return cleanArray(
    Object.keys( json ).map( key => {
      if ( json[ key ] === undefined ) return "";
      return encodeURIComponent( key ) + "=" + encodeURIComponent( json[ key ] );
    } )
  ).join( "&" );
}

export function param2Obj( url ) {
  const search = url.split( "?" )[ 1 ];
  if ( !search ) {
    return {};
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent( search )
    .replace( /"/g, '\\"' )
    .replace( /&/g, '","' )
    .replace( /=/g, '":"' ) +
    '"}'
  );
}

export function html2Text( val ) {
  const div = document.createElement( "div" );
  div.innerHTML = val;
  return div.textContent || div.innerText;
}

export function objectMerge( target, source ) {
  /* Merges two  objects,
     giving the last one precedence */

  if ( typeof target !== "object" ) {
    target = {};
  }
  if ( Array.isArray( source ) ) {
    return source.slice();
  }
  Object.keys( source ).forEach( property => {
    const sourceProperty = source[ property ];
    if ( typeof sourceProperty === "object" ) {
      target[ property ] = objectMerge( target[ property ], sourceProperty );
    } else {
      target[ property ] = sourceProperty;
    }
  } );
  return target;
}

export function toggleClass( element, className ) {
  if ( !element || !className ) {
    return;
  }
  let classString = element.className;
  const nameIndex = classString.indexOf( className );
  if ( nameIndex === -1 ) {
    classString += "" + className;
  } else {
    classString =
      classString.substr( 0, nameIndex ) +
      classString.substr( nameIndex + className.length );
  }
  element.className = classString;
}

export const pickerOptions = [ {
  text: "今天",
  onClick( picker ) {
    const end = new Date();
    const start = new Date( new Date().toDateString() );
    end.setTime( start.getTime() );
    picker.$emit( "pick", [ start, end ] );
  }
},
{
  text: "最近一周",
  onClick( picker ) {
    const end = new Date( new Date().toDateString() );
    const start = new Date();
    start.setTime( end.getTime() - 3600 * 1000 * 24 * 7 );
    picker.$emit( "pick", [ start, end ] );
  }
},
{
  text: "最近一个月",
  onClick( picker ) {
    const end = new Date( new Date().toDateString() );
    const start = new Date();
    start.setTime( start.getTime() - 3600 * 1000 * 24 * 30 );
    picker.$emit( "pick", [ start, end ] );
  }
},
{
  text: "最近三个月",
  onClick( picker ) {
    const end = new Date( new Date().toDateString() );
    const start = new Date();
    start.setTime( start.getTime() - 3600 * 1000 * 24 * 90 );
    picker.$emit( "pick", [ start, end ] );
  }
} ];

export function getTime( type ) {
  if ( type === "start" ) {
    return new Date().getTime() - 3600 * 1000 * 24 * 90;
  } else {
    return new Date( new Date().toDateString() );
  }
}

export function debounce( func, wait, immediate ) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if ( last < wait && last > 0 ) {
      timeout = setTimeout( later, wait - last );
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if ( !immediate ) {
        result = func.apply( context, args );
        if ( !timeout ) context = args = null;
      }
    }
  };

  return function ( ...args ) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if ( !timeout ) timeout = setTimeout( later, wait );
    if ( callNow ) {
      result = func.apply( context, args );
      context = args = null;
    }

    return result;
  };
}

/**
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 */
export function deepClone( source ) {
  if ( !source && typeof source !== "object" ) {
    throw new Error( "error arguments", "shallowClone" );
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys( source ).forEach( keys => {
    if ( source[ keys ] && typeof source[ keys ] === "object" ) {
      targetObj[ keys ] = deepClone( source[ keys ] );
    } else {
      targetObj[ keys ] = source[ keys ];
    }
  } );
  return targetObj;
}

export function uniqueArr( arr ) {
  return Array.from( new Set( arr ) );
}

export function createUniqueString() {
  const timestamp = +new Date() + "";
  const randomNum = parseInt( ( 1 + Math.random() ) * 65536 ) + "";
  return ( +( randomNum + timestamp ) ).toString( 32 );
}

export function getDictEntrysByCode( code ) {
  let dicts = store.getters.dicts;
  if ( typeof dicts === "string" ) {
    dicts = JSON.parse( dicts );
  }
  const dictEntrys = dicts.filter( item => {
    return item.dictCode === code;
  } );
  if ( dictEntrys && dictEntrys.length === 1 ) {
    let dicts = []
    dictEntrys[ 0 ].dictItems.forEach( item => {
      dicts.push( {
        name: item.dictItemName,
        code: item.dictItemCode
      } )
    } )
    return dicts;
  } else {
    return [];
  }
}

// 前端正则表达式获取
export function commonRegex( code ) {
  let sourceArr = []
  sourceArr = getDictEntrysByCode( 'COMMON.REGEX' ).filter( item => {
    return item.name == code
  } )
  if ( sourceArr && sourceArr.length > 0 ) {
    return sourceArr[ 0 ].code
  }
}

export function mappingData( source, target ) {
  const obj = {};
  for ( const key in target ) {
    typeof source[ key ] !== "undefined" &&
      source[ key ] !== null &&
      ( obj[ key ] = source[ key ] );
  }
  return obj;
}

export const GLOBAL = {
  LOAD_FAIL: "加载失败",
  LOAD_SUCCESS: "加载成功",
  OPERATE_FAIL: "操作失败",
  OPERATE_SUCCESS: "操作成功"
};

export function serialize( data ) {
  const res = [];
  for ( const key in data ) {
    res.push( key + "=" + ( data[ key ] === null ? "" : data[ key ] ) );
  }
  return res.join( "&" );
}

export function dateFormat( dateTime, fmt ) {
  if ( !dateTime ) {
    return "";
  }
  const date = new Date( Date.parse( dateTime.replace( /-/g, "/" ) ) );
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor( ( date.getMonth() + 3 ) / 3 ),
    S: date.getMilliseconds()
  };
  if ( /(y+)/.test( fmt ) ) {
    fmt = fmt.replace(
      RegExp.$1,
      ( date.getFullYear() + "" ).substr( 4 - RegExp.$1.length )
    );
  }
  for ( var k in o ) {
    if ( new RegExp( "(" + k + ")" ).test( fmt ) ) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[ k ] : ( "00" + o[ k ] ).substr( ( "" + o[ k ] ).length )
      );
    }
  }
  return fmt;
}

export function dateTimeFormat( date, fmt ) {
  if ( !date ) {
    return "";
  }
  const o = {
    "M+": date.getMonth() + 1,
    "d+": date.getDate(),
    "h+": date.getHours(),
    "m+": date.getMinutes(),
    "s+": date.getSeconds(),
    "q+": Math.floor( ( date.getMonth() + 3 ) / 3 ),
    S: date.getMilliseconds()
  };
  if ( /(y+)/.test( fmt ) ) {
    fmt = fmt.replace(
      RegExp.$1,
      ( date.getFullYear() + "" ).substr( 4 - RegExp.$1.length )
    );
  }
  for ( var k in o ) {
    if ( new RegExp( "(" + k + ")" ).test( fmt ) ) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? o[ k ] : ( "00" + o[ k ] ).substr( ( "" + o[ k ] ).length )
      );
    }
  }
  return fmt;
}

// 获取两时间之差(月)
export function getMonthByData( start, end ) {
  if ( start ) {
    start = start && start.split( "-" );
    end = end && end.split( "-" );
    const month =
      ( end[ 0 ] - start[ 0 ] ) * 12 +
      ( end[ 1 ] - start[ 1 ] ) +
      ( end[ 2 ] - start[ 2 ] >= 0 ? 0 : -1 );
    return month;
  }
}

// 获取当前日期
export function getNowFormatDate() {
  const date = new Date();
  const seperator = "-";
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if ( month >= 1 && month <= 9 ) {
    month = "0" + month;
  }
  if ( strDate >= 1 && strDate <= 9 ) {
    strDate = "0" + strDate;
  }
  const curDate = year + seperator + month + seperator + strDate;
  return curDate;
}

// 时间戳转化世家格式
export function transformTime( time ) {
  if ( time ) {
    const date = new Date( time );
    const y = date.getFullYear();
    const M = date.getMonth() + 1;
    const d = date.getDate();
    return y + "-" + addZero( M ) + "-" + addZero( d );
  } else {
    return "";
  }
}

export function addZero( m ) {
  return m < 10 ? "0" + m : m;
}

export function formatDate( date ) {
  if ( !date ) {
    date = new Date();
  }
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let s =
    year +
    "-" +
    ( month < 10 ? "0" + month : month ) +
    "-" +
    ( day < 10 ? "0" + day : day );
  return s;
}

export function SelectedTime( data ) {
  if ( data == '1' ) {
    const data = formatDate( new Date() );
    return [ data, data ];
  }
  if ( data == '2' ) {
    const Nowdate = new Date()
    const data = formatDate(
      new Date( Nowdate - ( Nowdate.getDay() - 1 ) * 86400000 )
    )
    const WeekFirstDay = new Date(
      Nowdate - ( Nowdate.getDay() - 1 ) * 86400000
    )
    const date = formatDate(
      new Date( ( WeekFirstDay / 1000 + 6 * 86400 ) * 1000 )
    )
    return [ data, date ];
  }
  if ( data == '3' ) {
    const Nowdate = new Date()
    const data = formatDate(
      new Date( Nowdate.getFullYear(), Nowdate.getMonth(), 1 )
    )
    const MonthNextFirstDay = new Date(
      Nowdate.getFullYear(),
      Nowdate.getMonth() + 1,
      1
    )
    const date = formatDate( new Date( MonthNextFirstDay - 86400000 ) )
    return [ data, date ];
  }
}

/**
 * 公用表单弹出框
 * initTable 初始化方法名
 * name 动态弹框名称
 *  */
export function dialogInitForm( _this, selection, initTable, name ) {
  const instance = instance || _this[ name ]( {
    $props: {
      selection: selection
    },
    $events: {
      refreshTable: initTable,
      close() {
        instance.remove()
      }
    }
  } )
  instance.isShow( selection )
}

/**
 * 全角转半角
 *  */
export function toCDB( str ) {
  let tmp = ""
  for ( let i = 0; i < str.length; i++ ) {
    if ( str.charCodeAt( i ) == 12288 ) {
      tmp += String.fromCharCode( str.charCodeAt( i ) - 12256 )
      continue
    }
    if ( str.charCodeAt( i ) > 65280 && str.charCodeAt( i ) < 65375 ) {
      tmp += String.fromCharCode( str.charCodeAt( i ) - 65248 )
    } else {
      tmp += String.fromCharCode( str.charCodeAt( i ) )
    }
  }
  return tmp
}

// 判断是否是数组及有没有值
export function isArrayAndIsEmpty( data ) {
  if ( data && data instanceof Array && data.length > 0 ) {
    return true
  } else {
    return false
  }
}

export function parseJSONString( data ) {
  return JSON.parse( data, ( key, value ) => {
    if ( typeof value == 'number' ) {
      return value.toString()
    }
    return value
  } )
}

// 树结构，去除空childrens
export function deleteChildrens( data ) {
  if ( data ) {
    let dataString = JSON.stringify( data )
    let dataArr = dataString.replace( /\"childrens\":\[\]\,/g, "" )
    let dataArrChild = dataArr.replace( /\,\"childrens\":\[\]/g, "" )
    return JSON.parse( dataArrChild )
  }
}

// 根据身份证号获取基本信息，例如出生日期、年龄、性别
export function getInfoByIdCard( idCard, infoType ) {
  if ( infoType == 1 ) {
    //获取出生日期
    var birth =
      idCard.substring( 6, 10 ) +
      '/' +
      idCard.substring( 10, 12 ) +
      '/' +
      idCard.substring( 12, 14 )
    return birth
  }
  if ( infoType == 2 ) {
    //获取性别
    if ( parseInt( idCard.substr( 16, 1 ) ) % 2 == 1 ) {
      //男
      return 'F'
    } else {
      //女
      return 'M'
    }
  }
  if ( infoType == 3 ) {
    //获取年龄
    var myDate = new Date()
    var month = myDate.getMonth() + 1
    var day = myDate.getDate()
    var age = myDate.getFullYear() - idCard.substring( 6, 10 ) - 1
    if (
      idCard.substring( 10, 12 ) < month ||
      ( idCard.substring( 10, 12 ) == month && idCard.substring( 12, 14 ) <= day )
    ) {
      age++
    }
    return age
  }
}