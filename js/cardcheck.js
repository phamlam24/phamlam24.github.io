function processHTML(resultString, resultColor){
    $("#answer").text(resultString);
    $("#answer").removeClass("bg-light");
    $("#answer").removeClass("bg-warning");
    $("#answer").removeClass("bg-danger");
    $("#answer").removeClass("bg-success");
    $("#answer").removeClass("bg-info");
    $("#answer").removeClass("text-white");
    $("#answer").removeClass("text-dark");
    if(resultColor=="success"){
        $("#answer").addClass("bg-success");
        $("#answer").addClass("text-white");
    }
    if(resultColor=="danger"){
        $("#answer").addClass("bg-danger");
        $("#answer").addClass("text-white");
    }
    if(resultColor=="info"){
        $("#answer").addClass("bg-info");
        $("#answer").addClass("text-white");
    }
    if(resultColor=="warning"){
        $("#answer").addClass("bg-warning");
        $("#answer").addClass("text-dark");
    }
}

$(document).ready(function(){
    $("#card_check").click(function(){
        console.log("hello");
        var s = $("#cardname").val();
        var numberArray = [];
        var is_real_card = true;
        var potential_card = true;
        var good_algorithm = true;
        var is_number = true;
        for(i in s){
            var num_in_ascii = s.charCodeAt(i);
            if(num_in_ascii == 32) continue;
            else if(num_in_ascii >= 48 && num_in_ascii <= 57) numberArray.push(num_in_ascii-48);
            else{
                is_real_card = false;
                good_algorithm = false;
                potential_card = false;
                is_number = false;
                break;
            }
        }
        if(is_real_card && numberArray.length!=0){
            // for(i in numberArray) console.log(numberArray);
            var array_length = numberArray.length;
            if(array_length!=16){
                is_real_card = false;
                potential_card = false;
            } 
            var sumofNumbers = 0;
            var is_2nd_digit = false;
            for(i in numberArray){
                if(is_2nd_digit) sumofNumbers += 2*numberArray[array_length-1-i];
                else sumofNumbers += numberArray[array_length-1-i];
                is_2nd_digit = !is_2nd_digit;
            }
            console.log(sumofNumbers);
            if(sumofNumbers%10!=0){
                good_algorithm = false;
                is_real_card = false;
            } 
        }
        var result_string = "";
        var result_color = "";      
        if(is_real_card){
            processHTML("This is a real card!","success");
        }
        else if(good_algorithm){
            processHTML("This is a number and it fits the algorithm, but it don't have 16 numbers, so it's probably not a real card.","warning");
        }
        else if(potential_card){
            processHTML("This is a potential credit card, but it failed to fit in the algorithm. It's a fake card.","danger");
        }
        else if(is_number){
            processHTML("This is a number, but it neither fit the algorithm nor is a potential credit card.","danger");
        }
        else{
            processHTML("You have letters or symbols in your card number. Please try again.","info");
        }
    })
});