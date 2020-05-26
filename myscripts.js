
var modal = document.getElementById("myModal");
var Add_roommate = document.getElementById("tab_add_roommate");
//----------variables----------//

var day = "";
var month = "";
var year = "";
var currentDate = "";
var monthStartDay = "";
var CheckWork = {};

var monthTextArray = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var dayTextArray = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var person = [
  {
    "Name": "MyRoom",
    "Color": "",
    "Date": []
  },
  {
    "Name": "New",
    "Color": "#7FEBC2",
    "Date": [[14, 5, 2020, "ซักผ้า"], [16, 5, 2020, "ล้างจาน"]]
  },
  {
    "Name": "Deen",
    "Color": "#FF8585",
    "Date": [[24, 5, 2020, "ตากผ้า"], [23, 5, 2020, "รีดผ้า"]]
  }
];
var human;
const db = firebase.firestore();
// ดัน
db.collection("store").add({
  nameRes: "aaa",
  desc: "bbb",
});
// ดึง
db.collection('store').get().then(snapshot => {
  snapshot.forEach(doc => {
    console.log(doc.data().nameRes)
  });
});
//----------functions----------//

function getMonthInfo(year, month) {

  //use current month to find number of days in month
  //i dont know why i have to add 1 to month
  var startDate = new Date(year, month + 1, 0);
  var monthLength = startDate.getDate();

  var startDate = new Date(year, month, 1);
  var monthStartDay = startDate.getDay();

  return [monthLength, monthStartDay];

}


function drawCal(monthInfo) {

  var daysInMonth = monthInfo[0];
  var monthStartDays = monthInfo[1];

  //clear cal tbody
  $("#cal").empty();
  $("#cal").append("<tr><td>sun</td><td>mon</td><td>tue</td><td>wed</td><td>thu</td><td>fri</td><td>sat</td>");

  //create empty row, append to to tbody
  var $rowOut = $("<tr></tr>");
  $("#cal").append($rowOut);

  //shift first row by month start date
  for (var i = 1; i <= monthStartDays; i++) {
    var $day = "<td></td>";
    $("#cal tr:last").append($day);
  }

  //for each day, append a td to the row
  var dayOfmonth = [];
  var colorOfPerson = {};
  

  for (var j = 1; j < person.length; j++) {
    for (let i = 0; i < person[j].Date.length; i++) {
      if (person[j].Date[i][1] == month + 1 && (person[j].Name == human || human == undefined || human == "MyRoom")) {
        dayOfmonth.push(person[j].Date[i][0]);
        colorOfPerson[person[j].Date[i][0]] = person[j].Color;
        CheckWork[person[j].Date[i][0]] = person[j].Date[i][3];
      }
    }

  }
  for (var i = 1; i <= daysInMonth; i++) {
    
    if (dayOfmonth.includes(i)) {
      var $day = "<td style='background: " + colorOfPerson[i] + "' value="+ CheckWork[i] +"><a>" + (i) + "</a></td>";
    }
    else {
      var $day = "<td><a>" + (i) + "</a></td>";
    }

    // console.log(person[j].Date[0] == i, person[j].Date[1] == month+1, person[j].Date[2] == year);

    $("#cal tr:last").append($day);

    //if day 7 (w/shift), append row contaning 7 days to tbody and clear row
    if ((i + monthStartDays) % 7 == 0 & i != 0) {
      $("#cal").append($rowOut);
      $rowOut = "<tr></tr>";
      $("#cal").append($rowOut);
    }
  }

}
function Check_Person(){
  human = document.getElementById("select_top").value;
  drawCal(getMonthInfo(year, month));
  
}
//----------wiring----------//

$(".button_left").click(function () {

  month--;

  if (month < 0) {
    year--;
    month = 11;
  }

  //left button click
  $(".cal_head span").text(monthTextArray[month] + " " + year);
  drawCal(getMonthInfo(year, month));

});

//right button click
$(".button_right").click(function () {

  month++;

  if (month > 11) {
    year++;
    month = 0;
  }

  $(".cal_head span").text(monthTextArray[month] + " " + year);
  drawCal(getMonthInfo(year, month));

});

$("#cal").on("click", "td", function (e) {

  e.preventDefault();
  //$(this).parent().addClass("circle");

  var outputDate = month + "," + $(this).text() + "," + year;
  CheckWork = outputDate.split();
  $("#outputText").text(outputDate);
  document.getElementById("WorkOnDay").innerHTML  = this.getAttribute("value");

  SeeWork.style.display = "block";
  

});

//----------run----------//

//get current month and year
currentDate = new Date();
year = currentDate.getFullYear();
month = currentDate.getMonth();

//get text month name from month number and write to span
$(".cal_head span").text(monthTextArray[month] + " " + year);

//inital calander draw based on current month
drawCal(getMonthInfo(year, month));

function Add_Work() {
  modal.style.display = "block";
}
function addRoomMatePage() {
  Add_roommate.style.display = "block";
}

function close_tab() {
  modal.style.display = "none";
  Add_roommate.style.display = "none";
  SeeWork.style.display = "none";
}

function addToDoList() {
  var doing = document.getElementById("doing").value;
  for (let k = 0; k < person.length; k++) {
    if (People.value == person[k].Name) {
      Add_roommate.style.display = "none";
      document.getElementById("doing").value = "";
      person[k].Do.push(doing);
    }
  }
  if (personBar.value == People.value) {
    var btn = document.createElement("BUTTON");
    btn.innerHTML = document.getElementById("add_btn_ToDoList").appendChild(btn);
    btn.innerHTML = doing;
    btn.classList.add('mt');
    btn.classList.add('btn');
    btn.classList.add('btn-secondary');
    modal.style.display = "none";
    person[k].Do.push(doing);
  }
}


function mockupClick(pageToHide, pageToShow) {
  document.querySelector('#' + pageToHide).style.display = "none";
  document.querySelector('#' + pageToShow).style.display = "block";
}

function backToHome() {
  document.querySelector('#Create_Room').style.display = "none";
  document.querySelector('#Join_Room').style.display = "none";
  document.querySelector('#Code_Room').style.display = "none";
  document.querySelector('#Edit_Roommate').style.display = "none";
  document.querySelector('#Status').style.display = "none";
  document.querySelector('#MyRoom').style.display = "none";
  document.querySelector('#home').style.display = "block";
}
function AddRoomMate() {
  var Data = {
    "Name": document.getElementById("NewName").value,
    "Color": document.getElementById("ColorInData").value,
    "Date": []
  }
  person.push(Data);
  Add_roommate.style.display = "none";
  document.getElementById("NewName").value = "";
}



function SelectRoomMate() {
  var personBar = document.getElementById('select_top');
  var People = document.getElementById('selectPeople');
  for (let j = 0; j < person.length + 1; j++) {
    personBar.remove(personBar.length - 1);
    People.remove(People.length - 1);
  }
  for (var i = 0; i < person.length; i++) {
    personBar.innerHTML = personBar.innerHTML +
      '<option value ='+ person[i].Name +'>' + person[i].Name + '</option>';
  }
  for (let k = 1; k < person.length; k++) {
    People.innerHTML = People.innerHTML +
      '<option>' + person[k].Name + '</option>';
  }
}


// function show(personBar) {
//   var text = '';
//   var list = document.getElementById("add_btn_ToDoList");
//   while (list.hasChildNodes()) {
//     list.removeChild(list.firstChild);
//   }
//   for (let i = 1; i < person.length; i++) {
//         var btn = document.createElement("BUTTON");
//         text = person[i].Name;
//         var doing = text;
//         btn.innerHTML = document.getElementById("add_btn_ToDoList").appendChild(btn);
//         btn.innerHTML = doing;
//         btn.classList.add('mt');
//         btn.classList.add('btn');
//         btn.classList.add('btn-secondary');
//         modal.style.display = "none";
//   }
// }

function SaveWork() {
  var time = WhenToDo.value.split("-");
  var AddWorkToDO = [];
  for (let i = 0; i < person.length; i++) {
    if (person[i].Name == selectPeople.value) {
      AddWorkToDO[0] = Number(time[2]);
      AddWorkToDO[1] = Number(time[1]);
      AddWorkToDO[2] = Number(time[0]);
      AddWorkToDO[3] = doing.value;
      person[i].Date.push(AddWorkToDO);
    }
  }
  document.getElementById("cal").innerHTML = "";
  drawCal(getMonthInfo(year, month));
  modal.style.display = "none";
  document.getElementById("doing").value = "";
}
function show() {
  var list = document.getElementById("AddRoomateInRoom");
  while (list.hasChildNodes()) {
    list.removeChild(list.firstChild);
  }
  for (let i = 1; i < person.length; i++) {
    var box_div = document.createElement("DIV");
    box_div.classList.add('input-group');
    box_div.classList.add('md-3');
    box_div.classList.add('box_preson');
    box_div.style.width = '90%';
    box_div.id = i;
    var box_color = document.createElement("INPUT");
    box_color.classList.add('input_color');
    box_color.classList.add('InputBase');
    box_color.setAttribute("type", "color");
    box_color.id = "color";
    box_color.value = person[i].Color;

    var input_bar = document.createElement("INPUT");
    input_bar.classList.add('form-control');
    input_bar.classList.add('input_person');
    input_bar.value = person[i].Name;
    var box_Del = document.createElement("DIV");
    box_Del.classList.add('input-group-append');
    var btn_Del = document.createElement("SPAN");
    btn_Del.classList.add('btn_del');
    btn_Del.classList.add('input-group-text');
    btn_Del.style.color = '#FF5757';
    document.getElementById("AddRoomateInRoom").appendChild(box_div);
    box_div.appendChild(box_color);
    box_div.appendChild(input_bar);


    box_div.appendChild(box_Del);
    box_Del.appendChild(btn_Del);
    btn_Del.appendChild(document.createTextNode("X"));
    btn_Del.addEventListener("click", function () { del_roommate(this); });
  }
}

function del_roommate(x) {
  var del_mate = document.getElementById('AddRoomateInRoom');
  var div_check = x.parentNode.parentNode;
  del_mate.innerHTML = '';
  person.splice(div_check.id, 1);
  show();
  SelectRoomMate();
}

function save() {
  var Data_Before_Save = document.getElementById('AddRoomateInRoom');
  for (let j = 1; j < person.length; j++) {
    var Data_Check = Data_Before_Save.childNodes[j - 1].childNodes[1].value;
    var Data_Color_check = Data_Before_Save.childNodes[j - 1].childNodes[0].value;
    person[j].Name = Data_Check;
    person[j].Color = Data_Color_check;
  }
  SelectRoomMate();
  drawCal(getMonthInfo(year, month));


}

function Copy() {
  /* Get the text field */
  var copyText = document.getElementById("password");
  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  document.execCommand('copy');

}

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})
