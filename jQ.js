// 一个简单JQuery的实现 //

function $(selector) {
     var dom;
     // 通过id获取DOM对象，通过#标示，返回id为adom的DOM对象
     // $("#pat")
     if (/^#\w+$/i.test(selector)) {
          dom = document.getElementById(selector.slice(1)).nodeName.toLowerCase();
          return dom;
     }
     // 通过样式名称获取DOM对象，返回第一个样式定义包含selector的对象
     // (".classa")
     if (/^\.\w+$/i.test(selector)) {
          dom = document.getElementsByClassName(selector.slice(1))[0].nodeName.toLowerCase();
          return dom;
     }
     // 通过tagName获取DOM对象，返回第一个selector标签对象
     // $("a")
     if (/^\w+$/i.test(selector)) {
          dom = document.getElementsByTagName(selector)[0].nodeName.toLowerCase();
          return dom;
     }
     // 通过attribute匹配获取DOM对象，返回第一个包含属性selector的对象
     // $("[data-log]")
     if(/^\[\w+(?:-)*\w+\]$/i.test(selector)) {
          var tags = document.getElementsByTagName("*");
          var att = /\w+(?:-)*\w+/i.exec(selector)[0];
          for(var i = 0, len = tags.length; i < len; i++) {
               if(tags[i].getAttribute(att) != null) {
                    dom = tags[i].nodeName.toLowerCase();
               }
          }
          return dom;
     }
     // 通过attribute匹配获取DOM对象，返回第一个包含属性值的对象
     // $("[data-time=2015]")
     if(/^\[\w+(?:-)*\w+=\w+\]$/i.test(selector)) {
          var tags = document.getElementsByTagName("*");
          var att = /\w+(?:-)*\w+/i.exec(selector)[0];
          var val = /=(\w+)/i.exec(selector)[1];
          for(var i = 0, len = tags.length; i < len; i++) {
               if(tags[i].getAttribute(att) == val) {
                    dom = tags[i].nodeName.toLowerCase();
               }
          }
          return dom;
     }
     // 通过简单的组合提高查询便利性，返回指定id的DOM所包含的所有子节点中，第一个样式定义包含指定样式的对象
     // $("#adom .classa")
     if(/^#|\.\w+\s+(#|.)\w+$/i.test(selector)) {
          var id = /^#\w+/i.exec(selector)[0].slice(1);
          var classname = /\.\w+/i.exec(selector)[0].slice(1);
          var idd = document.getElementById(id);
          dom = idd.getElementsByClassName(classname)[0].nodeName.toLowerCase();
          return dom;
     }
}

// 可以通过id获取DOM对象，通过#标示，例如
console.log($("#pat")); // 返回id为adom的DOM对象   //span

// 可以通过tagName获取DOM对象，例如
console.log($("a")); // 返回第一个<a>对象          //a

// 可以通过样式名称获取DOM对象，例如
console.log($(".classa")); // 返回第一个样式定义包含classa的对象   //a

// 可以通过attribute匹配获取DOM对象，例如
console.log($("[data-log]")); // 返回第一个包含属性data-log的对象    //li

console.log($("[data-time=2015]")); // 返回第一个包含属性data-time且值为2015的对象  //span

// 可以通过简单的组合提高查询便利性，例如
console.log($("#adom .classa")); //a
//返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
