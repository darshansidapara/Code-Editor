var editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  mode: "text/x-c++src",
  theme: "oceanic-next",
  lineNumbers: true,
  autoCloseBrackets: true,
});
editor.setSize(Math.max(window.innerWidth * 0.7, 400), "500");
var width = window.innerWidth;
var input = document.getElementById ("input")
var output = document.getElementById ("output" )
var run = document-getElementById("run")
editor.setSize(0.7 * width, "500");
var option = document.getElementById("inlineFormSelectPref")
option.addEventListener("change",function(){
    if(option.value == "Java"){
        editor.setOption("mode","text/x-java")
    }
    else if(option.value == "Python"){
        editor.setOption("mode","text/x-python")
    }
    else if(option.value == "C"){
        editor.setOption("mode","text/x-csrc")
    }
    else{
        editor.setOption("mode","text/x-c++src")
    }
})

run.addEventListener('click', async () => {
    try {
        const code = editor.getValue();
        const input = input.value;
        const lang = option.value;

        const oData = await fetch('https://darshansidapara.github.io/Code-Editor/compile', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                code,
                input,
                lang
            })
        });

        const d = await oData.json();
        output.value = d.output;
    } catch (error) {
        console.error(error);
    }
});
