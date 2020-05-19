from stockfishpy.stockfishpy import *

STOCKFISH_PATH = "/usr/local/Cellar/stockfish/11/bin/stockfish"

FEN = "r5k1/pR2Qppp/4p3/5b2/P4P2/2r4P/6PK/5q2 b - - 0 1"

chessEngine = Engine(STOCKFISH_PATH, param={"Threads": 2, "Ponder": "true"})

chessEngine.ucinewgame()
chessEngine.setposition(FEN)
move = chessEngine.bestmove()

print(move["bestmove"])
""" 
import chess

board = chess.Board(FEN)

board.fen()
 """
