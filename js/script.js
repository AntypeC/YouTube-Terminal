var terminal = document.getElementById("terminal");
var input = document.getElementById("invisibleInput");
var output = document.getElementById("output");

var credentials = {
    loggedIn: false,
    step: "email",
    email: "",
    password: "",
}

var speed = 50; // change to a larger value for a faster typing effect
var i = 1;
var prompts = ["Username/Email: ", "Password: "];
var currentPrompt = 0;
var boundary = 0;

function readTextFile(file) {
    var ascii
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if(rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                ascii = rawFile.responseText;
            }
        }
    }
    rawFile.send(null);
    return ascii;
}

input.focus();
input.onkeyup = function(e) {
    if (e.keyCode == 13) { // Enter key
        // prevent form submission
        e.preventDefault();
        
        // Check the step, if it's 'email', save the email, update the step to 'password' and show the password prompt
        if (credentials.step === 'email') {
            credentials.email = output.innerHTML.slice(boundary);
            console.log("email: "+credentials.email)
            credentials.step = 'password';
            typeWriter('\nPassword: ');
        } else if (credentials.step === 'password') {
            credentials.password = output.innerHTML.slice(boundary);
            console.log("password: "+credentials.password)
            credentials.step = 'loggedIn';
            credentials.loggedIn = true;
            // clear the terminal and show logged-in message
            output.innerHTML = 'You are logged in as ' + credentials.email + '.\n';
        }
    }
    if (e.keyCode == 8) {
        // Make sure there is at least one character to delete and that it's within the user input
        if (output.innerHTML.length > boundary) {
            output.innerHTML = output.innerHTML.slice(0, -1);
        }
        // Prevent the browser from going back
        e.preventDefault();
    }
    else {
        output.innerHTML += this.value;
        this.value = '';
    }
};

function typeWriter(text) {
    if (i < text.length) {
        output.scrollTop = output.scrollHeight;
        output.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => {
            typeWriter(text)
        }, speed);
    } else {
        if (credentials.loggedIn == true) {
            terminal.innerHTML += "antype@youtube:~$ ";
        } else if (credentials.step === 'email') {
            output.innerHTML += '\nUsername/Email: ';
            boundary = output.innerHTML.length;
        } else if (credentials.step === 'password') {
            output.innerHTML += '\nPassword: ';
            boundary = output.innerHTML.length;
        }

    }
}

// start with the email prompt
typeWriter("Welcome to YouTube Terminal");

document.addEventListener("click", () => {
    input.focus();
});
