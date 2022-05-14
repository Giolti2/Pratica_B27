//cartelle
var folders = [
  document.getElementById("folder0"),
  document.getElementById("folder1"),
  document.getElementById("folder2"),
  document.getElementById("folder3")
];

var contents = [
  document.getElementById("content0"),
  document.getElementById("content1"),
  document.getElementById("content2"),
  document.getElementById("content3")
];

for (var i = 0; i<folders.length; i++){
  folders[i].addEventListener("click", changeFolder);
}

function changeFolder(args){
  var index = args.target.id[args.target.id.length-1];

  for (var i = 0; i<contents.length; i++){
    contents[i].classList.remove("active");
  }
  contents[index].classList.add("active");

  for (var i = 0; i<folders.length; i++){
    folders[i].classList.remove("active");
    folders[i].classList.add("inactive");
  }
  folders[index].classList.add("active");
  folders[index].classList.remove("inactive");

}

//menu footer
var footerBtn = document.getElementById("menu-btn");
var footer = document.getElementById("footer");
var footerArrow = footerBtn.children[0];

footerBtn.addEventListener("click", toggleMenu);

function toggleMenu(){
  if(footer.classList.contains("active")){
    footer.classList.remove("active");
    footerArrow.innerHTML = "expand_less"
  }
  else{
    footer.classList.add("active");
    footerArrow.innerHTML = "expand_more"
  }
}

//slider soverglianza
var sliders = [
  document.getElementById("slider1"),
  document.getElementById("slider2"),
  document.getElementById("slider3")
];

for (var i = 0; i<sliders.length; i++){
  sliders[i].tag = document.getElementById("value"+parseInt(i+1));
  sliders[i].addEventListener("input", updateSliders);
}

var values = [];

for (var i = 0; i<sliders.length; i++){
  values.push(parseInt(sliders[i].value*5));
  sliders[i].tag.innerHTML = values[i] + "%";
}

var totalTag = document.getElementById("total");

function updateSliders(){
  for (var i = 0; i<sliders.length; i++){
    values[i] = parseInt(sliders[i].value*5);
    sliders[i].tag.innerHTML = values[i] + "%";
  }
  var total = values[0]+values[1]+values[2]
  totalTag.innerHTML = total + "%";
  if(total!=100){
    totalTag.classList.add("error");
  }
  else{
    totalTag.classList.remove("error");
  }
}

updateSliders();
console.log(values);
