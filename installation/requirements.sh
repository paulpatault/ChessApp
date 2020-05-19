command -v brew >/dev/null 2>&1 || { 
    echo "Installing Homebrew"
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
    export PATH="/usr/local/bin:$PATH"
    clear
}

echo "Installing Python"
brew install python

echo "Installing Stockfish"
brew install stockfish

echo "Installing Python Dependancies"
pip3 install -r installation/requirements.txt

clear

echo "Installing Node"
brew install node

echo "Installing Node Dependancies"
npm install