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

var footerBtn = document.getElementById("menu-btn");
var footer = document.getElementById("footer");

footerBtn.addEventListener("click", toggleMenu);

function toggleMenu(){
  if(footer.classList.contains("active")){
    footer.classList.remove("active");
    footerBtn.innerHTML = "^";
  }
  else{
    footer.classList.add("active");
    footerBtn.innerHTML = "V";
  }
}
