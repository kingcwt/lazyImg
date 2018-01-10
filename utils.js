//==>utils 属于一个项目的公共方法库
var utils=(function () {
    function toArray(ClassAry) {
    /*把类数组转换为数组、兼容所有浏览器*/
    var ary=[];
    try{
        ary=Array.prototype.slice.call(ClassAry);

    }catch(e){
        for(var i=0;i<ClassAry.length;i++){
            ary[ary.length]=ClassAry[i];
        }
    }
return ary;
    }
    function toJSON(str) {
        /*把JSON格式的字符串转化为JSON格式的对象 兼容所有浏览器*/
       return "JSON" in window? JSON.parse(str):eval('('+str+')');

    }
    function getCss(curEle,attr) {
        var value=null;
        var Reg=null;
        if('getComputedStyle' in window){
            value=window.getComputedStyle(curEle,null)[attr]
        }else{
            if(attr==='opacity'){
                value=curEle.currentStyle['filter'];
                var reg=/alpha\(opacity=(.+)\)/;
                reg.test(value)?value=reg.exec(value)[1]/100:value=1;
            }else{
                value=curEle.currentStyle[attr];
            }

        }
        Reg=/^-?\d+(\.\d+)?(px|pt|rem|em)?$/i;
        Reg.test(value)?value=parseFloat(value):null;
        return value;
    }
    function setCss(curEle,attr,value) {
        if(attr==='opacity'){
            curEle['style'].opacity=value;
            curEle['style'].filter='alpha(opacity='+value*100+')';
            return
        }
        !isNaN(value)&&!/(zIndex|lineHeight|zoom)/i.test(value)?value+='px':null;
        curEle['style'][attr]=value;
    }
    function setGroupCss(curEle,opations) {
        if(Object.prototype.toString.call(opations)!=='[object Object]')return;
        for(var attr in opations){
            if(opations.hasOwnProperty(attr)){
                setCss(curEle,attr,opations[attr])
            }

        }

    }
    function Css() {
        var len=arguments.length;
        var fn=getCss;
        var type=Object.prototype.toString.call(arguments[1])==='[object Object]';
        len>=3?fn=setCss:(len===2&&type)?fn=setGroupCss:null;
        return fn.apply(this,arguments);
        // var len=arguments.length;
        // if(len>=3){
        //     setCss.apply(this,arguments);
        //     return;
        // }
        // if(len===2&&Object.prototype.toString.call(arguments[1])==='[object Object]'){
        //     setGroupCss.apply(this,arguments);
        //     return;
        // }
        // return getCss.apply(this,arguments);
    }
    function offset(curEle) {
        var l=curEle.offsetLeft,
            t=curEle.offsetTop,
            p=curEle.offsetParent;
        while (p.tagName!=='BODY'){
            if(!/MSIE 8/i.test(navigator.userAgent)){
                l+=p.clientLeft;
                t+=p.clientTop;
            }
            l+=p.offsetLeft;
            t+=p.offsetTop;
            p=p.offsetParent;
        }
        return{top:t,left:l}
    }
    return {
        toArray:toArray,
        toJSON:toJSON,
        Css:Css,
        offset:offset,
        // getCss:getCss,
        // setCss:setCss,
        // setGroupCss:setGroupCss,
    }
})();


