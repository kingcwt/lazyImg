var newRender=(function () {
    var _newsData=null;
    var _newsBox=document.getElementById('newsBox');

    //==>获取数据
    function queryData() {
        var xhr=new XMLHttpRequest();
        xhr.open('get','data.json',false);
        xhr.onreadystatechange=function () {
            if(xhr.readyState===4&&xhr.status===200){
                _newsData=JSON.parse(xhr.responseText);
            }
        };
        xhr.send(null);

    }
    //==>绑定到页面
    function bindHtml() {
        if(!_newsData) return;
        var str='';
        for(var i=0;i<_newsData.length;i++){
            var item=_newsData[i];
            str+=` <li><a href="#">
        <div class="imgBox">
            <img src=""  data-img="${item.img}">
        </div>
        <div class="con">
            <p class="title">${item.title}</p>
            <span class="iconfont icon-63">${item.count}</span>
        </div>
    </a></li>`
        }
        _newsBox.innerHTML=str;
    }
    //==>计算出那些图片需要延迟加载
    function computed() {
        var imgList=document.getElementsByTagName('img');
        for(var i=0;i<imgList.length;i++){
            var curImg=imgList[i],
                curBox=curImg.parentNode;
            if(curImg.isLoad) continue;//如果当前图片已经处理 就不在处理 直接执行下轮循环
            var A=utils.offset(curBox).top+curBox.offsetHeight;
            var B=document.documentElement.clientHeight+document.documentElement.scrollTop;
            if(A<B){
                lazyImg(curImg)
            }
        }
    }
    //==>给每张图片延迟加载
    function lazyImg(curImg) {
        curImg.isLoad=true;//==>避免重复处理
        var tempImg=new Image();

        tempImg.onload=function () {
            curImg.src=this.src;
            curImg.style.display='block';
            tempImg=null;
        };
        tempImg.src=curImg.getAttribute('data-img'); //把赋地址放到事件下面 处理一些浏览器不兼容问题
    }
    return{
        init:function () {
            //=>模块入口
           queryData();
            bindHtml();
            setTimeout(function () {
                computed();
            },500);
            window.onscroll=computed
        }
    }

})();
newRender.init();