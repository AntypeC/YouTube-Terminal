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
var i = 0;
var prompts = ["Username/Email: ", "Password: "];
var currentPrompt = 0;

input.onkeydown = function(e) {
    if (e.keyCode == 13) { // Enter key
        // prevent form submission
        e.preventDefault();
        
        // Check the step, if it's 'email', save the email, update the step to 'password' and show the password prompt
        if (credentials.step === 'email') {
            credentials.email = textarea.innerHTML.slice(boundary);
            credentials.step = 'password';
            typeWriter(e, '\nPassword: ');
        } else if (credentials.step === 'password') {
            credentials.password = textarea.innerHTML.slice(boundary);
            credentials.step = 'loggedIn';
            credentials.loggedIn = true;
            // clear the terminal and show logged-in message
            terminal.innerHTML = 'You are logged in as ' + credentials.email + '.\n';
        }
    }
    if (e.keyCode == 8) {
        // Make sure there is at least one character to delete and that it's within the user input
        if (textarea.innerHTML.length > boundary) {
            textarea.innerHTML = textarea.innerHTML.slice(0, -1);
        }
        // Prevent the browser from going back
        e.preventDefault();
    }
};

function typeWriter(e, text) {
    var textarea = document.querySelector(e);
    if (i < text.length) {
        textarea.scrollTop = textarea.scrollHeight;
        textarea.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => {
            typeWriter(e, text)
        }, speed);
    } else {
        if (credentials.loggedIn == true) {
            terminal.innerHTML += "antype@youtube:~$ ";
        } else if (credentials.step === 'email') {
            textarea.innerHTML += '\nUsername/Email: ';
        } else if (credentials.step === 'password') {
            textarea.innerHTML += '\nPassword: ';
        }
    }
}

// start with the email prompt
typeWriter(prompts[currentPrompt]);

document.addEventListener("click", () => {
    input.focus();
});
