from tensorflow_chessbot import getFEN
from stockfishpy.stockfishpy import *
import argparse
import chess as chess

STOCKFISH_PATH = "/usr/local/Cellar/stockfish/11/bin/stockfish"


def letter_to_i(s):
    if s == "a" or s == "A":
        return 0
    if s == "b" or s == "B":
        return 1
    if s == "c" or s == "C":
        return 2
    if s == "d" or s == "D":
        return 3
    if s == "e" or s == "E":
        return 4
    if s == "f" or s == "F":
        return 5
    if s == "g" or s == "G":
        return 6
    if s == "h" or s == "H":
        return 7


if __name__ == "__main__":

    parser = argparse.ArgumentParser(
        description="Predict a chessboard FEN from supplied local image link or URL"
    )
    parser.add_argument(
        "--url",
        default="http://imgur.com/u4zF5Hj.png",
        help="URL of image (ex. http://imgur.com/u4zF5Hj.png)",
    )
    parser.add_argument("--filepath", help="filepath to image (ex. u4zF5Hj.png)")
    parser.add_argument(
        "--unflip",
        default=False,
        action="store_true",
        help="revert the image of a flipped chessboard",
    )
    parser.add_argument("--active", default="w")
    parser.add_argument("--dir", default=None)
    parser.add_argument("--verbose", default=True)
    args = parser.parse_args()
    FEN = getFEN(args)

    chessEngine = Engine(STOCKFISH_PATH, param={"Threads": 2, "Ponder": "true"})
    chessEngine.ucinewgame()
    # print(f"here : {FEN}_")

    chessEngine.setposition(FEN)

    # print("here")
    move = chessEngine.bestmove()
    # print("here")

    board = chess.Board(FEN)
    # print("here")

    s = chess.square(letter_to_i(move["bestmove"][0]), int(move["bestmove"][1]) - 1)
    # print("here")

    m2 = move["bestmove"][2] + move["bestmove"][3]
    out = f"{board.piece_at(s)}{chess.square_name(s)} -> {m2}"
    print(out)
    sys.stdout.flush()
