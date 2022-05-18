//footer sostitutivo

var footer2 = `
<div class="subject">
  <div class="input-field">
    <div class="nametag">ANDREW DICK</div>
    <button id="button1-2">Segnala</button>
  </div>
</div>
<div class="subject">
  <div class="input-field">
    <div class="nametag">PETER MINSON</div>
    <button id="button2-2">Segnala</button>
  </div>
</div>
<div class="subject">
  <div class="input-field">
    <div class="nametag">EMMA ORNSTEIN</div>
    <button id="button3-2">Segnala</button>
  </div>
</div>
<div id="total"></div>
<div>
  <button id="send-2">INVIA</button>
</div>
`

//seganalazioni

var reportButtons = [
  document.getElementById("button1-2"),
  document.getElementById("button2-2"),
  document.getElementById("button3-2")
];

var reported = [0,0,0];

for(var i = 0; i < reportButtons.length; i++){
  reportButtons[i].addEventListener("click", reportSubject);
  reportButtons[i].subject = i;
}

function reportSubject(args){
  reported[args.target.subject] = 1 - reported[args.target.subject];

  if(args.target.classList.contains("active")){
    args.target.classList.remove("active")
  }
  else{
    args.target.classList.add("active")
  }

}

document.getElementById("send-2").addEventListener("click", reportConfirm);

function reportConfirm(){

  var temp = document.getElementsByClassName("folder");

  for(var i = 0; i < temp.length; i++){
    temp[i].style.display = "none";
    console.log(temp[i])
  }

  temp = document.getElementsByClassName("content");

  for(var i = 0; i < temp.length; i++){
    temp[i].style.display = "none";
    console.log(temp[i])
  }

  document.getElementById("footer").style.display = "none";

  if(!reported[0] && reported[2]){ //finale rivoluzione
    document.getElementsByClassName("header")[0].style.display = "none";
  }

  var file = "e";

  console.log(reported.toString());
  switch(reported.toString()){
    case "0,0,0":
      file += "0";
      break;
    case "0,0,1":
      file += "r";
      break;
    case "0,1,0":
      file += "2";
      break;
    case "0,1,1":
      file += "r";
      break;
    case "1,0,0":
      file += "4";
      break;
    case "1,0,1":
      file += "5";
      break;
    case "1,1,0":
      file += "6";
      break;
    case "1,1,1":
      file += "7";
      break;
  }

  document.getElementById("ending").style.display = "flex";

  var text = document.createElement("div");
  text.classList.add("report");
  text.id = "end-report";
  console.log(file)
  console.log(window[file])
  text.innerHTML = window[file];

  document.getElementById("ending").children[0].append(text);

}

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
var total;

var totalTag = document.getElementById("total");

function updateSliders(){
  for (var i = 0; i<sliders.length; i++){
    values[i] = parseInt(sliders[i].value*5);
    sliders[i].tag.innerHTML = values[i] + "%";
  }
  total = values[0]+values[1]+values[2]
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
var guardHistory = [ [], [], [] ];

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
  if(total == 100){
    if(week == 0){
      for(var i = 0; i < contents.length-1; i++){
        contents[i].getElementsByClassName("reports")[0].innerHTML = "";
      }
    }

    for(var i = 0; i < guardHistory.length; i++){
      guardHistory[i][week] = 0;
    }
    guardHistory[guarded][week] = 1;

    newInfo(0);
    newInfo(1);
    newInfo(2);
    news();
    week += 1;

    if (week > 3){
      changeMenu();
    }
  }
}

sendButton.addEventListener("click", send);

//finale

function changeMenu(){
  document.getElementById("footer1").style.display = "none"
  document.getElementById("footer2").style.display = "flex"
}

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

function news(){
  var container = document.getElementById("news");
  var temp = "n"+parseInt(week+1)
  container.innerHTML = window[temp];
}

function newWeek(subject){
  var date = document.createElement("div");
  date.classList.add("date");

  var anchor = document.createElement("a");
  anchor.href = "#" + subject + "w" + week;

  anchor.innerHTML = "Settimana " + parseInt(week + 1);
  date.append(anchor);

  return date;
}

function newReport(subject){
  var text = chooseText(subject);

  var report = document.createElement("div");
  report.classList.add("report");

  var anchor = document.createElement("a");
  anchor.name = subject + "w" + week;
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
      file += "s2b";
      file += guardHistory[1].reduce((partialSum, a) => partialSum + a, 0);
      break;
    case 2:
    file += "s3b";
    file += guardHistory[2].reduce((partialSum, a) => partialSum + a, 0);
      break;
  }

  console.log(file);
  return window[file];
}

function andrewDick(){
  var file = "s1w"+parseInt(week+1);

  if(values[0]<=25){
    file += "a1";
  }
  else if(values[0]<=45){
    file += "a2";
  }
  else{
    file += "a3";
  }

  if(week > 0 && week < 3 && guardHistory[0][parseInt(week-1)]){
    file += "x";
  }

  console.log(file);
  return window[file];
}

function peterMinson(){
  var file = "s2w"+parseInt(week+1);;

  if(values[1]<=25){
    file += "a1";
  }
  else if(values[1]<=45){
    file += "a2";
  }
  else{
    file += "a3";
  }

  if(week == 1 && guardHistory[0][parseInt(week-1)]){
    file += "x";
  }

  console.log(file);
  return window[file];
}

function emmaOrnstein(){
  var file = "s3w"+parseInt(week+1);

  if(values[2]<=45){
    file += "a1";
  }
  else{
    file += "a2";
  }

  if(week > 0 && week < 3 && guardHistory[0][parseInt(week-1)]){
    file += "x";
  }

  console.log(file);
  return window[file];
}
