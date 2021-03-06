// SWAP LANGUAGE --------------------------------------------------------
//     to access languages, __Language.innerHTML (from or to)
function swapLanguages() {
    var fromLanguage = document.getElementById("fromLanguage");
    var toLanguage = document.getElementById("toLanguage");

    var holder = fromLanguage.innerHTML;

    fromLanguage.innerHTML = toLanguage.innerHTML;
    toLanguage.innerHTML = holder;
    
}


// CLEAR INPUT BUTTON ---------------------------------------------------
function clearInput() {
    document.getElementById("inputText").value = "";
    document.getElementById("outputText").innerHTML = "";
}


// COPY OUTPUT BUTTON ---------------------------------------------------
function copyOutput() {
    var copyText = document.getElementById("outputText").innerHTML;
    navigator.clipboard.writeText(copyText);
}


// TEXT TO SPEECH -------------------------------------------------------
var text = document.getElementById("outputText");
var language = document.getElementById("toLanguage");

function textToSpeech() {
    if (!speechSynthesis.speaking || speechSynthesis.pause()){
        speechText = text.innerHTML;
        var speechVoice = new SpeechSynthesisUtterance();
        var voices = speechSynthesis.getVoices();
        speechVoice.voice = voices[2];
        speechVoice.text = speechText;

        if (language.innerHTML == "ENGLISH") {
            speechVoice.lang = 'en-US';
        }

        else {
            speechVoice.lang = 'fil-PH';
        }

        speechSynthesis.speak(speechVoice);
    }
}


// SPEECH TO TEXT -------------------------------------------------------
var textarea = document.getElementById('inputText');
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function speechToText() {
    recognition.start();

    recognition.onresult = function (e) {
        var transcript = e.results[0][0].transcript;
        inputText.value = transcript;
        checkForTranslation();
    }
}


// OPEN FEEDBACK --------------------------------------------------------
function openFeedback() {
    window.open('https://www.tinyurl.com/SalamaThanksFeedbackForm1', '_blank').focus();
}


// CONTACT INFO ---------------------------------------------------------
function contactInfo() {
    window.open('mailto:kate.mariene.baldonado@eee.upd.edu.ph?cc=peter.john.flores@eee.upd.edu.ph&cc=emilio.leion.tamayo@eee.upd.edu.ph&cc=eliezer.jasper.de.gucena@eee.upd.edu.ph&subject=SalamaThanks%20Website%20Contact');
}


// INPUT TO OUTPUT ------------------------------------------------------
function checkForTranslation() {
    var input = document.getElementById("inputText").value;
    var output = document.getElementById("outputText");
    var fromLanguage = document.getElementById("fromLanguage").innerHTML;

    fromLanguage = fromLanguage.toLowerCase();

    
    if (fromLanguage == "english") {
        
        fetch('https://hf.space/embed/SalamaThanks/SalamaThanksV1/+/api/predict/', { method: "POST", body: JSON.stringify({"data":[ "English-to-Filipino",  input]})
            , headers: { "Content-Type": "application/json" } })
            .then(response => response.json())
            .then(data => { output.innerHTML = data.data  ; console.log(JSON.stringify(data)); })
    }

    else if (fromLanguage == "filipino") {
        console.log(fromLanguage);
        fetch('https://hf.space/embed/SalamaThanks/SalamaThanksV1/+/api/predict/', { method: "POST", body: JSON.stringify({"data":[ "Filipino-to-English",  input]})
            , headers: { "Content-Type": "application/json" } })
            .then(response => response.json())
            .then(data => { output.innerHTML = data.data  ; console.log(JSON.stringify(data)); })
    }

    else {
        output.innerHTML = "";
    }
}
