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
  totalTag.innerHTML = "Totale: " + total + "%";
  if(total!=100){
    totalTag.classList.add("error");
  }
  else{
    totalTag.classList.remove("error");
  }
}

updateSliders();

//bottoni guardia

var guardButtons = [
  document.getElementById("button1"),
  document.getElementById("button2"),
  document.getElementById("button3")
];

for (var i = 0; i < guardButtons.length; i++){
  guardButtons[i].addEventListener("click", activateGuard);
}

var guarded = 0;

function activateGuard(args){
  var index = args.target.id[args.target.id.length-1] - 1;
  guarded = index;

  for (var i = 0; i < guardButtons.length; i++){
    guardButtons[i].classList.remove("active");
  }

  guardButtons[index].classList.add("active");

}

//invio

var week = 0;

var sendButton = document.getElementById("send");

function send(){
  if(week == 0){
    for(var i = 0; i < contents.length; i++){
      contents[i].getElementsByClassName("reports")[0].innerHTML = "";
    }
  }
  newInfo(0);
  newInfo(1);
  //newInfo(2);
  //news();
  week += 1;
}

sendButton.addEventListener("click", send);

//generazione testi

function newInfo(subject){
  var container = document.getElementById("content"+subject);
  container.weeks = container.getElementsByClassName("weeks")[0];
  container.reports = container.getElementsByClassName("reports")[0];

  container.reports.append(newReport(subject));
  container.weeks.append(newWeek(subject));
  if(guarded == subject){
    container.reports.append(newGuardReport(subject));
  }
}

function newWeek(subject){
  var date = document.createElement("div");
  date.classList.add("date");

  var anchor = document.createElement("a");
  anchor.href = "#" + subject + "w0";

  anchor.innerHTML = "Settimana " + parseInt(week + 1);
  date.append(anchor);

  return date;
}

function newReport(subject){
  var text = chooseText(subject);

  var report = document.createElement("div");
  report.classList.add("report");

  var anchor = document.createElement("a");
  anchor.name = subject + "w0";
  anchor.innerHTML = "<b>SETTIMANA " + parseInt(week + 1) + "</b><br><br>"

  report.append(anchor);
  report.innerHTML += text;

  return report;
}

function newGuardReport(subject){
  var text = chooseGuardText(subject);

  var report = document.createElement("div");
  report.classList.add("report");

  report.innerHTML += text;

  return report;
}

function chooseText(subject){
  switch(subject){
    case 0:
      return andrewDick()
    case 1:
      return peterMinson()
    case 2:
      return emmaOrnstein()
  }
}

function chooseGuardText(subject){
  var file = "";
  switch(subject){
    case 0:
      file += "s1b"+parseInt(week+1);
      break;
    case 1:
      break;
    case 2:
      break;
  }

  console.log(file);
  return window[file];
}

function andrewDick(){
  var file = "s1";
  switch(week){
    case 0:
      file += "w1";
      if(values[0]<=25){
        file += "a1";
      }
      else if(values[0]<=45){
        file += "a2";
      }
      else{
        file += "a3";
      }
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
  };

  console.log(file);
  return window[file];
}

function peterMinson(){
  var file = "s2";
  switch(week){
    case 0:
      file += "w1";
      if(values[0]<=25){
        file += "a1";
      }
      else if(values[0]<=45){
        file += "a2";
      }
      else{
        file += "a3";
      }
      break;
    case 1:
      break;
    case 2:
      break;
    case 3:
      break;
  };

  console.log(file);
  return window[file];
}
