//------------------------------------navbar script------------------------------------
var menu = document.getElementsByClassName("accordion");
for (var i = 0; i < menu.length; i++) {
  menu[i].addEventListener("click", function() {
    var panel = this.nextElementSibling;
    if (panel.style.maxHeight) {
	  this.classList.toggle("active");
      panel.style.maxHeight = null;
    } else {
      panel.style.maxHeight = panel.scrollHeight + "px";
	  this.classList.toggle("active");
    }
  });
}
var language = document.getElementById("language").children;
for (var i = 0; i < language.length; i++){
	language[i].addEventListener("click", function() {
		toggler = document.getElementById("language")
		toggler.style.maxHeight = null;
		document.getElementsByClassName("accordion")[0].classList.toggle("active");
		filter_maker(this.innerText, "language");
});
}
var category = document.getElementById("category").children;
for (var i = 0; i < category.length; i++){
	category[i].addEventListener("click", function() {
		document.getElementById("category").style.maxHeight = null;
		document.getElementsByClassName("accordion")[1].classList.toggle("active");
		filter_maker(this.innerText, "category");
});
}
//-----------------------------------------------------------------------------------
//----------------------------------Tags Script--------------------------------------
tag_maker(tags);

var tag = document.getElementsByClassName("btn-2");
for (var i = 0; i < tag.length; i++){
	tag[i].addEventListener("click", function() {
	filter_maker(this.innerText, this.id);
});
}

var input = document.getElementById("tagfilter");
input.addEventListener("input", function() {
	var tags = document.querySelectorAll(".btn-2");
	if (this.value.length > 0) {
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
            var nome = tag.innerText;
            var exp = new RegExp(this.value, "i");;
            if (exp.test(nome)) {
                tag.classList.remove("hidden");
		    }
			else {
				tag.classList.add("hidden");
            }
        }
    } else {
        for (var i = 0; i < tags.length; i++) {
            var tag = tags[i];
				tag.classList.add('hidden');
        }
    }
});
//-----------------------------------------------------------------------------------
//------------------------------------Functions--------------------------------------
function filter_maker(text, class_value){
    var check = filter_checker(text);
	var nav_btn = document.getElementsByClassName("nav-btn")[0];
	if (nav_btn.classList.contains("hidden")){
	  nav_btn.classList.toggle("hidden");
	}
	if (check == true){
		var node = document.createElement("a");
		var textnode = document.createTextNode(text);
		node.appendChild(textnode);
		node.classList.add(class_value);	
		nav_btn.appendChild(node);
		filter_searcher();
	}
}

function filter_searcher(){
	var verifier = null;
	var tags_filter = [];
	var doujinshi_id = [];
	var filter_tag = document.getElementsByClassName("nav-btn")[0].children;
	filter_tag[filter_tag.length-1].addEventListener("click", function() {
		this.remove();
		try{
			filter_searcher();
		}
		catch{
			var gallery = document.getElementsByClassName("gallery");
			for (var i = 0; i < gallery.length; i++){
				gallery[i].classList.remove("hidden");
			}
		}
	});
	for (var i=0; i < filter_tag.length; i++){
		var fclass = filter_tag[i].className;
		var fname = filter_tag[i].innerText.toLowerCase();
		tags_filter.push([fclass, fname])
	}
	for (var i=0; i < data.length; i++){
		for (var j=0; j < tags_filter.length; j++){
			try{
				if(data[i][tags_filter[j][0]].includes(tags_filter[j][1])){
					verifier = true;
				}
				else{
					verifier = false;
					break
				}
			}
			catch{
				verifier = false;
					break
			}
		}
		if (verifier){doujinshi_id.push(data[i].Folder);}
	}
	var gallery = document.getElementsByClassName("gallery");
	for (var i = 0; i < gallery.length; i++){
		gtext = gallery[i].children[0].children[1].innerText;
		if(doujinshi_id.includes(gtext)){
			gallery[i].classList.remove("hidden");
		}
		else{
		gallery[i].classList.add("hidden");
		}
	}

	console.log(doujinshi_id)
}

function filter_checker(text){
    var filter_tags = document.getElementsByClassName("nav-btn")[0].children;
	if (filter_tags == null){return true;}
	for (var i=0; i < filter_tags.length; i++){
		if (filter_tags[i].innerText == text){return false;}
	}
	return true;
}

function tag_maker(data){
	for (i in data){
		for (j in data[i]){
			var node = document.createElement("button");
			var textnode = document.createTextNode(data[i][j]);
			node.appendChild(textnode);
			node.classList.add("btn-2");
			node.setAttribute('id', i);
			node.classList.add("hidden");
			document.getElementById("tags").appendChild(node);
		}
	}
}