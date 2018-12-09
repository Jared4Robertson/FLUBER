var root_url ="http://comp426.cs.unc.edu:3001/"
var airports;
var airport_names = [];
var flight_num = 420;
$(document).ready(()=>{
    $(document).on("click",".login_button",function(){
        build_login_page();
      });
    $(document).on("click",".home_button",function(){
        build_home_page();
      });
    $(document).on("click",".pass_log",function(){
        build_passenger_page();
      });
    $(document).on("click",".pilot_log",function(){
        build_pilot_page();
      });
    $(document).on("click","#login_btn",function(){
        check_login();
      });
    $(document).on("click","#Search_btn",function(){
        show_results();
      })
      $.ajax(root_url + 'sessions',
      {
      type: 'POST',
      xhrFields: {withCredentials: true},
      data:{
      "user": {
          username: "jaredrob",
          password: "730093312"
      }
   },
      success: () => {
      },
      error: () => {
          alert('error');
      }
      });
      $.ajax(root_url + '/airports',
      {
      type: 'GET',
      xhrFields: {withCredentials: true},
      success: (response) => {
          airports=response;
          for(i=0;i<airports.length;i++){
              airport_names.push(airports[i].name);
          }
      },
      error: () => {
          alert('error');
      }
      });


})
let login_name = "guest";
let pilot_boolean = false;
let logged_in = false;
let log_label = "Log in";

function build_home_page (){
    $("body").empty();
    add_navbar();
    add_homepage();   
}
function build_passenger_page(){
    $('body').empty();
    add_navbar();
    add_passpage();
}    
function build_pilot_page(){
    $("body").empty();
    add_navbar();
    add_pilotpage();
}
function build_login_page(){
    $('body').empty();
    log_label="Log in";
    login_name="guest";
    logged_in=false;
    add_navbar();
    add_loginpage();
}
function add_navbar(){
    $('body').append('<div id="navbar_div">\
    <a class = "home_button">FLUBER</a>\
    <a class = "pass_log">Passenger</a>\
    <a class = "pilot_log">Pilot</a>\
    <a class = "login_button">'+log_label+'</a>\
    <a class = "user">'+login_name+'</a>\
</div>')
}

function add_homepage(){
    $('body').append( $('body').append('<div id="Passenger_login_div"> \
    <div class = "Advertisement"><br>Fly the way <br> you want</div>\
        <div class="button_holder1">Find and Book a Flight<br><br><br><br> \
        <div class = "blue_button pass_log">Passenger</div></div>\
        <div class = "button_holder2">Captain an Aircraft<br><br><br><br>\
        <div class = "blue_button pilot_log">Pilot</div></div>\
      </div>\
      <div id="mesg_div"></div>\
      <div id="Pilot_login_div">\
      </div>'))
}

function add_passpage(){
    if(!logged_in){
        pilot_boolean=false;
        add_pass_div();
    }
    else{
        pilot_boolean = false;
        build_login_page();
    }
}

function add_pilotpage(){
    if(!logged_in){
        pilot_boolean=true;
        add_pilot_div();
        
    }
    else{
        pilot_boolean=true;
        build_login_page();
    }
}

function add_loginpage(){
    $('body').append('<div class = "background_div3"></div>')
    $('.background_div3').append('<div class="login_div">Log into to Fluber<br>\
    <input type="text" class = "textbox" id="login_user" placeholder = "Username"><br>\
    <input type="password" class = "textbox" id="login_pass" placeholder = "Password"><br>\
    <button id="login_btn">Log in</button>\
    <div id ="mesg_div"</div>\
  </div>')
}
function check_login(){
    let user = $('#login_user').val();
    let pass = $('#login_pass').val();
    if(user.toLowerCase()=="jaredrob"){
        if(pass.toLowerCase()=="730093312"){
            login_name="Jared";
            logged_in = true;

        }
    }
    else if(user.toLowerCase()=="tin"){
        if(pass.toLowerCase()=="730093313"){
            login_name="Tin";
            logged_in=true;
        }
    }
    else{
        $('#mesg_div').html("Login failed. Try again.");
    }
    if(logged_in){
    log_label = "Log out";    
    console.log(user);
    if(pilot_boolean){
        build_pilot_page();
    }
    else{
        build_passenger_page();
    }
}
}
function add_pilot_div(){
    
    $('body').append('<div class = background_div></div>');
    $('.background_div').append('<div class = base_div_pilot></div>');
    $('.base_div_pilot').append('<div class="">\
    <div class = "title">Create and Captain a Flight</div><br>\
    <input type="text" class = "textbox searchbox" id="from" placeholder = "Flying From">\
    <input type="text" class = "textbox searchbox" id = "to"  placeholder = "Flying To"><br>\
    <input type="time" class = "textbox searchbox d_time" id = "departure">\
    <text class="depart_text">- Departure Time</text><br>\
    <input type="time" class = "textbox searchbox a_time" id = "arrival">\
    <text class="depart_text">- Arrival Time</text><br>\
    <input type="date" class = "textbox searchbox d_date" id = "date">\
    <text class="depart_text">- Date</text><br>\
    <button id="Search_btn">Create</button>\
    <div id ="mesg_div"</div>\
  </div>')
  autocomplete(document.getElementById("from"), airport_names);
  autocomplete(document.getElementById("to"), airport_names);
}
function add_pass_div(){
    $('body').append('<div class = background_div2></div>');
    $('.background_div2').append('<div class = base_div_passenger></div>');
    $('.base_div_passenger').append('<div class="">\
    <div class = "title">Find a flight</div><br>\
    <input type="text" class = "textbox searchbox" id="from" placeholder = "Flying From">\
    <input type="text" class = "textbox searchbox" id = "to" placeholder = "Flying To"><br>\
    <input type="date" class = "textbox searchbox" id = "departure" placeholder = "Departure"><br>\
    <button id="Search_btn">Search</button>\
    <div id ="mesg_div"</div>\
  </div>');
  autocomplete(document.getElementById("from"), airport_names);
  autocomplete(document.getElementById("to"), airport_names);

}
function show_results(){
    let flight;
    if(pilot_boolean){
        create_pilot_shit()
    }
    else{
    
    let body;
    let from = $('#from').val();
    let to = $('#to').val();
    let departure = $('#departure').val();
    
    let is_date=(!departure=="")
    for(i=0;i<airports.length;i++){
         if(airport_names[i].toUpperCase()==to.toUpperCase()){
             to_id =airports[i].id;
         }
         if(airport_names[i].toUpperCase()==from.toUpperCase()){
            from_id =airports[i].id;
        }
        }

    $.ajax(root_url + '/flights?filter[departure_id]='+from_id+'&filter[arrival_id]='+to_id,
	       {
		   type: 'GET',
           xhrFields: {withCredentials: true},
		   success: (response) => {
               flight=response;
               if(is_date){
               for(i=0;i<airports;i++){
               if(!flight[i].departs_at.slice(0,10)==departure){
                    flight.remove(flight[i]);
               }
               console.log(flight);
               }
           }
           console.log(flight.length);
           fill_div(flight);

        },
		   error: () => {
		       alert('error');
		   }
           });
    if (pilot_boolean){
        body = $(".background_div");
    }
    else{
        body = $(".background_div2");
    }
    body.empty();
    function fill_div(flight){
        body.append('<div id="flight_Title">Click to book</div>');
        body.append('<div id="flight_div_holder"></div>');
        for(let i=0;i<flight.length;i++){
            $('#flight_div_holder').append('<div id ="'+flight[i].id+'"class="flight_div">'+flight[i].number+'</div>');
        }
    }

}
}

function create_pilot_shit() {
    let d_time = $('.d_time')[0].value;
    let a_time = $('.a_time')[0].value;
    let d_date = $('.d_date')[0].value;
    alert(d_date);
    
}
function autocomplete(inp, arr) {
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false;}
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        $(this).after(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
          /*check if the item starts with the same letters as the text field value:*/
          if (arr[i].toUpperCase().indexOf(val.toUpperCase())> -1) {
            /*create a DIV element for each matching element:*/
            b = document.createElement("DIV");
            /*make the matching letters bold:*/
            b.innerHTML = arr[i].substr(0,arr[i].toUpperCase().indexOf(val.toUpperCase()));
            b.innerHTML += "<strong>" + arr[i].substr(arr[i].toUpperCase().indexOf(val.toUpperCase()), val.length) + "</strong>";
            b.innerHTML += arr[i].substr(arr[i].toUpperCase().indexOf(val.toUpperCase())+val.length);
            /*insert a input field that will hold the current array item's value:*/
            b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
            /*execute a function when someone clicks on the item value (DIV element):*/
            b.addEventListener("click", function(e) {
                /*insert the value for the autocomplete text field:*/
                inp.value = this.getElementsByTagName("input")[0].value;
                /*close the list of autocompleted values,
                (or any other open lists of autocompleted values:*/
                closeAllLists();
            });
            a.appendChild(b);
          }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
          /*If the arrow DOWN key is pressed,
          increase the currentFocus variable:*/
          currentFocus++;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 38) { //up
          /*If the arrow UP key is pressed,
          decrease the currentFocus variable:*/
          currentFocus--;
          /*and and make the current item more visible:*/
          addActive(x);
        } else if (e.keyCode == 13) {
          /*If the ENTER key is pressed, prevent the form from being submitted,*/
          e.preventDefault();
          if (currentFocus > -1) {
            /*and simulate a click on the "active" item:*/
            if (x) x[currentFocus].click();
          }
        }
    });
    function addActive(x) {
      /*a function to classify an item as "active":*/
      if (!x) return false;
      /*start by removing the "active" class on all items:*/
      removeActive(x);
      if (currentFocus >= x.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (x.length - 1);
      /*add class "autocomplete-active":*/
      x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
      /*a function to remove the "active" class from all autocomplete items:*/
      for (var i = 0; i < x.length; i++) {
        x[i].classList.remove("autocomplete-active");
      }
    }
    function closeAllLists(elmnt) {
      /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
      var x = document.getElementsByClassName("autocomplete-items");
      for (var i = 0; i < x.length; i++) {
        if (elmnt != x[i] && elmnt != inp) {
          x[i].parentNode.removeChild(x[i]);
        }
      }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
  }