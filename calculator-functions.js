var numbers = [];
var operators = [];
var current_display = "";
var total_display = "";
var current_number = 0;
var reset_total = false;
var is_negative = true;
var spammer = false;

function add_operator(operator) {
    // this creates a negative input just by assigning a negative sign to the current input
    if (is_negative && operator == "-") {
        current_display = "-";
        document.getElementById("current_display").innerHTML = current_display;
        return;
    }
    // This is so the user can click the equals sign and receive the sum of their calculation and begin a new one
    // based on the sum of the previous one
    if (reset_total) {
        total_display = "";
        reset_total = false;
    } else {
        numbers.push(parseInt(current_number));
    }
    operators.push(operator);
    update_total_display(current_number + " " + operator + " ");
    document.getElementById("current_display").innerHTML = "0";
    current_display = "";
    is_negative = true;
    spammer = false;
}

function update_current_display(toadd) {
    current_display = current_display + toadd;
    current_number = parseInt(current_display);
    document.getElementById("current_display").innerHTML = current_display;
    is_negative = false;
}

function update_total_display(toadd) {
    total_display = total_display + toadd;
    document.getElementById("total_display").innerHTML = total_display;
}

function clearit() {
    numbers = [];
    numbers = [];
    operators = [];
    current_display = "";
    total_display = "";
    current_number = 0;
    reset_total = false;
    is_negative = true;
    spammer = false;
    document.getElementById("current_display").innerHTML = "0";
    document.getElementById("total_display").innerHTML = total_display;
}

function calculate() {
    // if the *clears throat* YOUser decides to spam the equals button it just won't do anything
    if (spammer) {
        return;
    }
    update_total_display(current_display);
    numbers.push(current_number);

    // This section is where the total is calculated according to the order of operations
    // each for loop is looking for a specific operation type in the operators list eg divide "/" and will loop until there is none left
    // it iterates from the beginning of the list until it finds the specified operator and begins the loop again after a calculation is performed
    while (operators.includes('/')) {
        for (let i = 0; i <= operators.length; i++) {
            if (operators[i] == '/') {
                // the corresponding number in the number list is re assigned based on a calculation
                numbers[i] = numbers[i] / numbers[i + 1];
                // seeing as the two numbers are merged based on the calculation and re assigned to the list
                // the second number is removed from the list
                numbers.splice(i + 1, 1);
                // and the corresponding operator is removed
                operators.splice(i, 1);
                // the for loop breaks and if the specified operator is still in the operators list the for loop begins again completing the calculation from left to right
                break;
            }
        }
    }


    while (operators.includes('X')) {
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] == 'X') {
                numbers[i] = numbers[i] * numbers[i + 1];
                numbers.splice(i + 1, 1);
                operators.splice(i, 1);
                break;
            }
        }
    }

    while (operators.includes('+')) {
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] == '+') {
                numbers[i] = numbers[i] + numbers[i + 1];
                numbers.splice(i + 1, 1);
                operators.splice(i, 1);
                break;
            }
        }
    }

    while (operators.includes('-')) {
        for (let i = 0; i < operators.length; i++) {
            if (operators[i] == '-') {
                numbers[i] = numbers[i] - numbers[i + 1];
                numbers.splice(i + 1, 1);
                operators.splice(i, 1);
                break;
            }
        }
    }

    current_number = numbers[0];
    current_display = current_number.toString();
    document.getElementById("current_display").innerHTML = current_display;
    update_total_display("=" + current_number);
    reset_total = true;
    spammer = true;
}
