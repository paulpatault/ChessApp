from tensorflow_chessbot import getFEN
import argparse
import sys


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

    print(FEN)
    sys.stdout.flush()
