// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

function previewFile() {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();
    console.log(file['path']);
    reader.addEventListener("load", function () {
        // convert image file to base64 string
        preview.src = reader.result;
    }, false);
    if (file) {
        reader.readAsDataURL(file);
    }
}

function analyse() {
    /*
    python /Users/patault/Documents/GitHub/CHESS_GUI/tensorflow_chessbot-chessfenbot/analyse.py --dir /Users/patault/Documents/GitHub/CHESS_GUI/tensorflow_chessbot-chessfenbot/saved_models/frozen_graph.pb --filepath /Users/patault/Desktop/test.png
    */
    const { spawn } = require('child_process');
    const dir = __dirname + "/python"

    const file = document.querySelector('input[type=file]').files[0];
    let path = file['path'];

    let child;

    // ADD "--active", "b", if joueur == black
    if (document.getElementById('wtp').checked) {
        child = spawn("python", [`${dir}/analyse.py`, "--dir", `${dir}/saved_models/frozen_graph.pb`, "--filepath", `${path}`, "--verbose", "False"]);
    } else {
        child = spawn("python", [`${dir}/analyse.py`, "--dir", `${dir}/saved_models/frozen_graph.pb`, "--active", "b", "--filepath", `${path}`, "--verbose", "False"]);
    }
    console.log(child)
    document.getElementById("loading").style.display = "block";
    document.getElementById("res").textContent = "";

    // use child.stdout.setEncoding('utf8'); if you want text chunks
    child.stdout.on('data', (chunk) => {
        document.getElementById("loading").style.display = "none";
        let out = chunk.toString();
        document.getElementById("res").textContent = out;
        if (out.length >= 9) {
            let piece = out[0];
            let start = out[1] + out[2];
            let end = out[7] + out[8];
            console.log(`out : ${out}`);
            console.log(`piece : ${piece}`);
            console.log(`start : ${start}`);
            console.log(`end : ${end}`);
        } else {
            console.warn('py-error');
        }
    });
}
