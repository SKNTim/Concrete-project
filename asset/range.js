var docnull = "";
$(document).ready(function(){
     
$("#Inside_diameter").keyup(function(){
/*$("#Inside_diameter").css("background-color","#D6D6FF");*/
if(document.getElementsByName('Inside_diameter')[0].value < 300 && document.getElementsByName('Inside_diameter')[0].value > 200){
    $("#Inside_diameter_default").html(data[0].Inside_diameter);
    $("#Inside_diameter_positive").html(data[0].Inside_diameter_positive);
    $("#Inside_diameter_negative").html(data[0].Inside_diameter_negative);
    $("#Inside_diameter").css("color","red");
        
    }
if(document.getElementsByName('Inside_diameter')[0].value < 1101 && document.getElementsByName('Inside_diameter')[0].value > 901){
    if(document.getElementsByName('Inside_diameter')[0].value > 1000 || document.getElementsByName('Inside_diameter')[0].value <= 994){
            //$("#Inside_diameter").css("background-color","red"); 
            $("#Inside_diameter").css("color","red"); 
        }
    $("#Inside_diameter_default").html("1000");
    $("#Inside_diameter_positive").html("+0");
    $("#Inside_diameter_negative").html("-6");
    }
if(document.getElementsByName('Inside_diameter')[0].value == docnull){
    $("#Inside_diameter").css("color","black"); 
    $("#Inside_diameter_default").html("預設值");
    $("#Inside_diameter_positive").html("+");
    $("#Inside_diameter_negative").html("-");
    }
    });   
});