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
    <a class = "pilot_log">Pilot</a>\
    <a class = "pass_log">Passenger</a>\
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

    }
    else{
        pilot_boolean = false;
        build_login_page();
    }
}

function add_pilotpage(){
    if(!logged_in){
        add_base_div();
        
    }
    else{
        pilot_boolean=true;
        build_login_page();
    }
}

function add_loginpage(){
    $('body').append('<div class="login_div">Log into to Fluber<br>\
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
function add_base_div(){
    
    $('body').append('<div class = background_div></div>');
    $('.background_div').append('<div class = base_div></div>');
    $('.base_div').append('<div class="">Add to your schedule<br>\
    <input type="text" class = "textbox searchbox"  placeholder = "Flying From">\
    <input type="text" class = "textbox searchbox"  placeholder = "Flying To"><br>\
    <input type = "date" class = textbox searchbox" placeholder = "Departure"><br>\
    <button id="Search_btn">Search</button>\
    <div id ="mesg_div"</div>\
  </div>')
}
