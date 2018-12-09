var root_url ="http://comp426.cs.unc.edu:3001/"
var airports;
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
    $(document).on("input",".searchbox",function(){
        autocomplete_airport();
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
  </div>')
}
function show_results(){
    if(pilot_boolean){
        create_pilot_shit()
    }
    else{
    let body;
    let from = $('#from').val();
    let to = $('#to').val();
    let departure = $('#departure').val();
    let instances;
    let departure_id = 157225;
    let arrival_id =157246;

    $.ajax(root_url + '/flights?filter[departure_id]='+departure_id+'&filter[arrival_id]='+arrival_id,
	       {
		   type: 'GET',
           xhrFields: {withCredentials: true},
		   success: (response) => {
               instances=response;
               alert(instances);
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

}
}
function autocomplete_airport(){
    alert(airports[1].text())
    input = $(event.target).val();
    for (i = 0; i < airports.length; i++) {
        /*check if the item starts with the same letters as the text field value:*/
        if (airports[i][1].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
}}}

function create_pilot_shit() {
    let d_time = $('.d_time')[0].value;
    let a_time = $('.a_time')[0].value;
    let d_date = $('.d_date')[0].value;
    alert(d_date);
    
}
