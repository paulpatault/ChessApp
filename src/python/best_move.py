from stockfish import Stockfish
import sys

STOCKFISH_PATH = "/usr/local/Cellar/stockfish/11/bin/stockfish"

FEN = sys.argv[1]


def main(): 
    stockfish = Stockfish(STOCKFISH_PATH)
    stockfish.set_fen_position(FEN)

    print(stockfish.get_best_move())
    sys.stdout.flush()

if __name__ == "__main__":
    main()