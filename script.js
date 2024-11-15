// Accessing button
let btn = document.querySelector("#btn");

// Accessing content of the button
let content = document.querySelector("#content").innerText;

// Accessing voice gif
let voice = document.querySelector("#voice");

// Function to make our assistant speak
function speak(text){   // text - Whatever we pass text it will speak
    let text_speak = new SpeechSynthesisUtterance(text);  // SpeechSynthesisUtterance - It is a web speech API which is used to convert the text into voice
    text_speak.rate = 1;   // rate - It specifies the speed of voice
    text_speak.pitch = 1;    // pitch - It specifies the pitch of voice
    text_speak.volume = 1;    // volume - It specifies the volume of voice
    text_speak.lang = "hi-GB";  // lang - It will be used to change the language and change the voice to male and female
    // hi - It is used for language as Hindi
    // GB - It is used for changing the voice to girl 
    window.speechSynthesis.speak(text_speak);    // It is a command in JavaScript to make the browser speak
}

// Code to make our assistant say good morning or good night according to the timing automatically
function wishMe(){
    let day = new Date();   // Date() :- It is the object through which we can access the functions which gives us real time
    let hours = day.getHours();   // getHours() :- It is the function which is used to get hours in real time
    if (hours >= 0 && hours < 12){
        speak("Good Morning Sir");    // It will wish 'Good Morning Sir' when we load website during 0 to 12 hrs
    }
    else if (hours >= 12 && hours < 16){
        speak("Good afternoon Sir");    // It will wish 'Good afternoon Sir' when we load website during 12 to 16 hrs
    }
    else {
        speak("Good Evening Sir");    // It will wish 'Good Evening Sir' when we load website except any hours mentioned in if and else if statement
    }
}
// window.addEventListener('load', ()=>{     // It will call wishMe() function whenever we load the web page and will greet us according to the current time
//     wishMe();
// })

let speechRecognition = window.speechRecognition || window.webkitSpeechRecognition;  // It is used for making the speech recognition available on the different web browsers
let recognition = new speechRecognition();   // We created an object for speechRecognition
recognition.onresult=(event) => {    // This function is used to tell what virtual assistant will speak when it will start talking
    let currentIndex = event.resultIndex;
    let transcript = event.results[currentIndex][0].transcript;   // It is used for accessing whatever we spoke during chatting with virtual assistant
    content.innerText = transcript;  // It will show the text of whatever you spoke on btn
    takeCommand(transcript.toLowerCase());  // It will take all the elements
}

btn.addEventListener("click", ()=>{   // It is used for making virtual assistant to listen to the user
    recognition.start();
    btn.style.display = "none";      // It will disappear when we talk
    voice.style.display = "block";   // It will appear when we talk
})

function takeCommand(message){
    btn.style.display = "flex";     // It will appear when it will execute our task
    voice.style.display = "none";   // It will disappear when it will execute our task
    if (message.includes("Hello") || message.includes("Hey") || message.includes("Hi")){    // It will be used to make what the virtual assistant should speak when our message includes 'Hello', 'Hey' and 'Hi'
        speak("Hello sir, what can I help you ?");    // So it will say "Hello sir, what can I help you ?"
    }
    else if (message.includes("Who are you ?")){
        speak("I am virtual assistant, created by Mayur sir");
    }
    else if (message.includes("open youtube")){
        speak("Opening youtube...")
        window.open("https://www.youtube.com");    // It will open youtube
    }
    else if (message.includes("open google")){
        speak("Opening google...");
        window.open("https://www.google.com/");
    }
    else if (message.includes("open instagram")){
        speak("Opening instagram...");
        window.open("https://www.instagram.com/");
    }
    else if (message.includes("open facebook")){
        speak("Opening facebook...");
        window.open("https://www.facebook.com/");
    }
    else if (message.includes("open calulator")){
        speak("opening calculator...");
        window.open("calculator://");
    }
    else if (message.includes("open whatsapp")){
        speak("opening whatsapp...");
        window.open("whatsapp://");
    }
    else if (message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric", minute:"numeric"});
        speak(time);
    }
    else if (message.includes("time")){
        let date = new Date().toLocaleString(undefined,{day:"numeric", month:"short", year:"numeric"});
        speak(date);
    }
    else {
        let finalText = "This is what i found on internet regarding " + message.replace("shipra", "") || message.replace("shifra", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("shipra", "")}`, "_blank");
    }
}
