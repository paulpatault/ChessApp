// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
/*
 * Copyright (c) 2020, Jeff Hlywa (jhlywa@gmail.com)
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 *    this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 *
 *----------------------------------------------------------------------------*/


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

function getPieceAt(FEN, pos) {
    const { Chess } = require('./js/chess.js');

    const chess = new Chess();
    if (chess.load(FEN.slice(0, -1))) {
        const res = chess.get(pos)['type'];
        switch (res) {
            case 'r':
                return 'Rook';
            case 'k':
                return 'Knight';
            case 'b':
                return 'Bishop';
            case 'q':
                return 'Queen';
            case 'k':
                return 'King';
            case 'p':
                return 'Pawn';
            default:
                return res;
        }
    }
    return "null"
}

function analyse() {
    /*
    python /Users/patault/Documents/GitHub/ChessApp/src/python/analyse.py --dir /Users/patault/Documents/GitHub/ChessApp/src/python/saved_models/frozen_graph.pb --filepath /Users/patault/Desktop/test.png
    */
    const { spawn } = require('child_process');
    const dir = __dirname + "/python"

    const file = document.querySelector('input[type=file]').files[0];
    let path = file['path'];

    let child = spawn("python", [`${dir}/analyse.py`, "--dir", `${dir}/saved_models/frozen_graph.pb`, "--filepath", `${path}`, "--verbose", "False"]);

    // ADD {"--unflip" "--active", "b"} if joueur == black
    if (!document.getElementById('wtp').checked) {
        child = spawn("python", [`${dir}/analyse.py`, "--dir", `${dir}/saved_models/frozen_graph.pb`, "--unflip", "--active", "b", "--filepath", `${path}`, "--verbose", "False"]);
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("res").textContent = "";

    child.stdout.setEncoding('utf8');
    child.stdout.on('data', (FEN) => {

        let bestMove = spawn("python3", [`${dir}/best_move.py`, FEN]);

        console.log(FEN)
        bestMove.stdout.setEncoding('utf8');
        bestMove.stdout.on('data', (BESTMOVE) => {

            document.getElementById("loading").style.display = "none";

            let beg = BESTMOVE[0] + BESTMOVE[1];
            let end = BESTMOVE[2] + BESTMOVE[3];

            let piece = getPieceAt(FEN, beg);
            console.log(`Piece: ${piece}, beg: ${beg}`);
            document.getElementById("res").textContent = `${piece}(${beg}) — ${end}`;

        });

    });
}
