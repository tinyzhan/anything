　(function(w){
  //工厂
  function chunya(selector, context){
      return new chunya.fn.init(selector, context);
  }
  //给原型提供一个简写方式
  chunya.fn = chunya.prototype = {
    
    createContentLeft:function(dataJson){
    function throttle(fun, delay = 500) {
        let last, deferTimer;
        return function (args) {
            let that = this;
            let _args = arguments;
            let now = +new Date();
            if (last && now < last + delay) {
                clearTimeout(deferTimer);
                deferTimer = setTimeout(function () {
                    last = now;
                    fun.apply(that, _args);
                }, delay)
            } else {
                last = now;
                fun.apply(that, _args);
            }
        }
        }
    if(!dataJson){return;}
    for(let i=0;i<dataJson.length;i++){
        let a=document.createElement("a");
        a.innerHTML=dataJson[i].title;
        let ul=document.createElement("ul");
        //ul.setAttribute("id","content-left-nav");
        ul.setAttribute("class","content-left-nav");
        if(i==0){
            a.setAttribute("id","first");
        }
        if(dataJson[i].href){
            a.setAttribute("href",dataJson[i].href);
            //a.setAttribute("target","iframe_right");
            ul.appendChild(a);
        }else{
            a.setAttribute("href","#");
           // a.setAttribute("id","special");
           a.setAttribute("class","special");
            let div=document.createElement("div");       
            div.setAttribute("class","trangile-black-right");
            a.appendChild(div);
            //ul.setAttribute("id","special-container");
            ul.setAttribute("class","special-container");
            ul.appendChild(a);
            if(dataJson[i].children){
                for(let j=0;j<dataJson[i].children.length;j++){
                    let li=document.createElement("li");
                   //li.setAttribute("id","content-left-li");
                    li.setAttribute("class","content-left-li");
                    let a=document.createElement("a");
                    a.innerHTML=dataJson[i].children[j].title;
                    a.setAttribute("href",dataJson[i].children[j].href);
                    //a.setAttribute("target","iframe_right");
                    li.appendChild(a);
                    ul.appendChild(li);
                    }
                  }
            }
        $("#contain-left-self").append(ul);
    }

    $(document).ready(function() {
      let sp=$(".special");
      let spd= $(".special div");
      let as = $(".content-left-nav > a");
      let ass=$(".special").nextAll("li");
      let cla= $(".content-left-li > a");
      $("#first").addClass("select-style");
      ass.hide();
      //点无二级选项
      as.click(function(){
              $(this).nextAll("li").toggle("show");
              ass.hide();
              $(this).addClass("select-style");
              as.not($(this)).removeClass("select-style");
              sp.removeClass("select-style2");
              cla.removeClass("select-style");
              spd.removeClass("trangile-white-right");
              spd.removeClass("trangile-white-bottom");
              spd.addClass("trangile-black-right");
            });
        for(let i=0;i<sp.length;i++){
              $(sp[i]).click(throttle(function(){
                console.log($(this).html())
                $(this).addClass("select-style2");
                $(this).find("div").removeClass("trangile-black-right");
                if($(this).find("div").hasClass("trangile-white-bottom")){
                    $(this).find("div").removeClass("trangile-white-bottom");
                    $(this).find("div").addClass("trangile-white-right");
                }else{
                    $(this).find("div").addClass("trangile-white-bottom");
                    $(this).find("div").removeClass("trangile-white-right");
                }
                as.removeClass("select-style");
                $(this).nextAll("li").toggle("show");
                sp.not($(this)).removeClass("select-style2");
                sp.not($(this)).nextAll("li").hide();
              }));
            }
        cla.click(function(){ 
              $(this).addClass("contain-left-self-focus");
              cla.not($(this)).removeClass("contain-left-self-focus");
              as.removeClass("select-style");
          });
        });
    },

    createCheckbox:function(){
      $(document).ready(function(){
        let items=$(".i_checkbox");
        let items_mini=$(".i_checkbox_mini");
        let main=$("#main_checkbox");
        let main_mini=$("#main_checkbox_mini");
        let flag=true;
        main.click(function(){
            main.toggleClass("checked_backgroundcolor");
            main_mini.toggleClass("checkedsymbol");
            if(flag){
               for(let i=0;i< items_mini.length;i++){
                items.eq(i).addClass("checked_backgroundcolor");
                items_mini.eq(i).addClass("checkedsymbol");
               }
                flag=false;
            }else{
                for(let i=0;i< items_mini.length;i++){
                    items.eq(i).removeClass("checked_backgroundcolor");
                    items_mini.eq(i).removeClass("checkedsymbol");
                }
                flag=true;
            }
        });
        for(let i=0;i<items.length;i++){
            items[i].onclick = function(){
                $(this).toggleClass("checked_backgroundcolor");
                $(this).children().toggleClass("checkedsymbol");
                main.addClass("checked_backgroundcolor");
                main_mini.addClass("checkedsymbol");
                flag=false;
                for(let j=0;j<items_mini.length;j++){ 
                if(!$(items_mini[j]).hasClass("checkedsymbol")){
                    main.removeClass("checked_backgroundcolor");
                    main_mini.removeClass("checkedsymbol");
                    flag=true;
                    break;//一旦进入判断不再执行循环,对性能提升
                    }
                }
            };
        }
    });
    },
    createCheckboxAndKeepStatus:function(){//根据value存入状态
        $(document).ready(function(){
            let items=$(".i_checkbox");
            let items_mini=$(".i_checkbox_mini");
            let main=$("#main_checkbox");
            let main_mini=$("#main_checkbox_mini");
            let flag=true;
            let data_arr=[];
            main.click(function(){
                main.toggleClass("checked_backgroundcolor");
                main_mini.toggleClass("checkedsymbol");
                if(flag){
                   for(let i=0;i< items_mini.length;i++){
                    items.eq(i).addClass("checked_backgroundcolor");
                    items_mini.eq(i).addClass("checkedsymbol");
                   }
                   for (let i = 0; i < items.length; i++) {//存入状态
                    if ($(items_mini[i]).hasClass("checkedsymbol")) {
                      data_arr.push(items[i].getAttribute("value"));
                      }
                    }
                    flag=false;
                }else{
                    for(let i=0;i< items_mini.length;i++){
                        items.eq(i).removeClass("checked_backgroundcolor");
                        items_mini.eq(i).removeClass("checkedsymbol");
                    }
                    for (let i = 0; i < items.length; i++) {//存入状态
                        if (data_arr.length) {
                          let index=data_arr.indexOf(items[i].getAttribute("value"));
                          data_arr.splice(index,1);
                          }
                        } 
                    flag=true;
                }
                if(data_arr.length){//保持状态
                    data_arr.forEach(function(element){
                        if($("[value="+element+"]").length){
                        $("[value="+element+"]").get(0).checked=true;
                        }  
                    })
                }
            });
            for(let i=0;i<items.length;i++){
                items[i].onclick = function(){
                    $(this).toggleClass("checked_backgroundcolor");
                    $(this).children().toggleClass("checkedsymbol");
                    main.addClass("checked_backgroundcolor");
                    main_mini.addClass("checkedsymbol");
                    flag=false;
                    if ($(this).hasClass("checked_backgroundcolor")) {//存入状态
                        data_arr.push($(this).attr("value"));
                    }else{
                      if (data_arr.length) {
                        let index=data_arr.indexOf($(this).attr("value"));
                        data_arr.splice(index,1);
                        }
                    }
                    if(data_arr.length){//保持状态
                        data_arr.forEach(function(element){
                            if($("[value="+element+"]").length){
                            $("[value="+element+"]").get(0).checked=true;
                            }  
                        })
                    }
                    for(let j=0;j<items_mini.length;j++){ 
                    if(!$(items_mini[j]).hasClass("checkedsymbol")){
                        main.removeClass("checked_backgroundcolor");
                        main_mini.removeClass("checkedsymbol");
                        flag=true;
                        break;//一旦进入判断不再执行循环,对性能提升
                        }
                    } 
                    //console.log(data_arr)
                };
            }
        });       
    },
    createDropMenu:function(){
         // let city=["11","22"];
    let button,menu,dropMenu,now_value;
    init();
    function init() {
        button=document.getElementById("btn-drop");
        menu=document.getElementById("menu_list");
        dropMenu=document.getElementById("dropMenu");
        // for(let i=0;i<city.length;i++){
        //     let li=document.createElement("li");
        //     li.textContent=city[i];
        //     menu.appendChild(li);
        // }
        //button.firstElementChild.textContent=city[0];
        button.firstElementChild.textContent=$("#first_default").text();
        //dropMenu.addEventListener("mouseleave",mouseLeaveHandler);
        button.addEventListener("click",clickHandler);
        menu.addEventListener("click",menuClickHandler);

    }
    // function mouseLeaveHandler(e) {
    //     menu.style.display="none";
    //     $("#span_tool").addClass("triangle");
    //     $("#span_tool").removeClass("triangle-top");
    // }
    function clickHandler(e) {
      if( menu.style.display=="block"){
        menu.style.display="none";
        $("#span_tool").addClass("triangle");
        $("#span_tool").removeClass("triangle-top");
      }else{
        menu.style.display="block";
        $("#span_tool").removeClass("triangle");
        $("#span_tool").addClass("triangle-top");
      }
    }
    function menuClickHandler(e) {
        if(e.target.constructor===HTMLUListElement)return;
        button.firstElementChild.textContent=e.target.textContent;
        menu.style.display="none";
        now_value=e.target.textContent;
        $("#menu_list li").removeClass("light_blue");
        $(e.target).addClass("light_blue");
        $("#span_tool").addClass("triangle");
        $("#span_tool").removeClass("triangle-top");
    }
    }
      
  }




















  
  //init才是chunya中真正的构造函数
  let init = chunya.fn.init = function(selector, context){                                
  };
  //把构造函数的原型，替换为chunya工厂的原型
  //这么做的目的是为了实现chunya的插件机制，让外界可以通过chunya方便的进行扩展
  init.prototype = chunya.fn;
  w.chunya = chunya;
}(window));
