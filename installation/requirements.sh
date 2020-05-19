command -v brew >/dev/null 2>&1 || { 
    echo "Installing Homebrew"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    clear
}

echo "Installing Python"
brew install python
clear

echo "Installing Stockfish"
brew install stockfish
clear

echo "Installing Python Dependancies"
pip3 install -r requirements.txt