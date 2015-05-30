function fileList() {

	var addlist = document.getElementById("addList"), //新增分类id
		menulist = document.getElementById("menuList"), //最外层ul的id
		lis = document.getElementById("list").getElementsByTagName("li"), //所有的li
		as = document.getElementById("list").getElementsByTagName("a"), //所有的a
		imgs = document.getElementById("list").getElementsByTagName("img"),
		turn, // 中间值 传递this

		//设置一个当前的点击变量，存放之后需要添加子元素的父元素，初始为外层ul
		currentClick = menulist;


	//设置事件程序对象
	var EventUtil = {
		addHandler: function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false);
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler);
			} else {
				element["on" + type] = handler;
			}
		},
		getEvent: function(event) {
			return event ? event : window.event;
		},
		getTarget: function(event) {
			return event.target || event.srcElement;
		},
		stopPropagation: function(event) {
			if (event.stopPropagation) {
				event.stopPropagation();
			} else {
				event.cancelBubble = true;
			}
		}
	};

	function addColor(ele) {
		for (var j = 0, lenj = as.length;　 j < lenj; j++) {

			as[j].style.backgroundColor = "";
		}
		if (ele.innerHTML !== "默认分类") {
			ele.style.backgroundColor = "#F7F7F4";
			if (ele.nextElementSibling !== null) {

				if (ele.nextElementSibling.nodeName.toLowerCase() === "ul") {
					currentClick = ele.nextElementSibling;
				}
			} else {
				turn = ele.parentNode;
				currentClick = turn;
			}
		}
	}

	function delColor() {
		for (var i = 0, len = as.length; i < len; i++) {
			as[i].style.backgroundColor = "";
			currentClick = menulist;
		}
	}

	function Click(ele) {
		if (ele.nextElementSibling !== null) {
			if (ele.nextElementSibling.nodeName.toLowerCase() == "ul") {
				if (ele.nextElementSibling.style.display == "none") {
					ele.nextElementSibling.style.display = "block";
					currentClick = this.nextElementSibling; //把子列表存入currentClick，将文件添加当前展开的子列表
				} else {
					ele.nextElementSibling.style.display = "none";
				}
			}
		}
	}

	// 事件委托，利用冒泡将事件绑在最外层元素上。
	menulist.onclick = function(event) {
		var as = document.getElementById("list").getElementsByTagName("a"),
			i = 0,
			len = as.length;

		event = EventUtil.getEvent(event);
		var target = EventUtil.getTarget(event);

		for (; i < len; i++) {
			if (event.target === as[i]) {
				addColor(as[i]);
				currentClick !== turn && Click(as[i]);
				return;     //退出函数，如果点击对象不是分类，执行deColor();
			}
		}
		delColor();
	};

	/* 删除文件 */
	function Mouseover_o(element) {

		element.onmouseenter = function() {

			for (var i = 0, len = this.childNodes.length; i < len; i++) {
				if (this.childNodes[i].nodeName.toLowerCase() == "img") {
					this.childNodes[i].style.display = "inline-block";

					this.childNodes[i].onmouseup = function(event) {
						var event = EventUtil.getEvent(event);
						if (event.button == 0) {

							var bool = confirm("确定要删除吗?");
							if (bool) {
								element.parentNode.parentNode.removeChild(element.parentNode);
							}
						}
					};
				}
			}
		};
		element.onmouseleave = function() {

			for (var i = 0, len = imgs.length; i < len; i++) {
				imgs[i].style.display = "none";
			}
		};
	}

	//新增分类，因为不在menuList里，所以不能用事件委托
	addlist.onclick = function() {
		var name = prompt("名称:"),
			newli = document.createElement("li"),
			newa = document.createElement("a"),
			newimg = document.createElement("img"),
			newul = document.createElement("ul");

		if (name.length !== 0) {

			if (currentClick == turn) { //给新添加的文件夹添加文件

				currentClick.appendChild(newul);
				currentClick = newul;

				currentClick.appendChild(newli);
				newli.appendChild(newa);
				newa.innerHTML = name;
				newa.appendChild(newimg);
				newimg.src = "img/del.jpg";

				Mouseover_o(newa);

			} else { //给已有文件添加文件文件夹 或者 添加文件夹
				currentClick.appendChild(newli);
				newli.appendChild(newa);
				newa.innerHTML = name;
				newa.appendChild(newimg);
				newimg.src = "img/del.jpg";

				Mouseover_o(newa);
			}
		}

	};

	for (var i = 0, len = as.length; i < len; i++) {
		Mouseover_o(as[i]);
	}
}
fileList();



// bug1: i、len重复定义。js没有块级作用域。
// bug2: 把收放的click绑在li上面，由于li包含子元素ul，点击子元素ul也会执行收放。应该绑在a
//       上，再判断a的下一个元素是不是ul来判断有没有子列表。
// bug3: for循环的length使用先前定义的，长度改变之后变量没变导致空值。
//       每使用for的length重新定义，以免混乱。
// bug4：在把name赋给a的innerHTML之前添加子元素，会把子元素覆盖掉。应该在执行innerHTML之后添加。
// bug5: 鼠标放在元素上时img会闪烁。因为：mouseout鼠标位于一个元素的上方，然后用户将其移入另一个元素时触发，这个
//       元素可能是它的子元素，所以当鼠标放在元素上时img即显示又隐藏，因此会闪烁。
// bug6: 同时给元素和document添加点击事件，元素会冒泡到document元素，执行document的事件函数，覆盖掉元素的事件函数。
// bug7: 鼠标左键event.button == 0。右键：2，中间键1。