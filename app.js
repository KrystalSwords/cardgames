const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Card {
    constructor(suit, value) { //store value as number
        this.suit = suit;
        this.value = value;
    }

    getSuit() { //returns suit
        return this.suit;
    }

    getValue() { //returns value as number
        return this.value;
    }

    displayValue() { //returns value as string
        if (this.value >= 2 && this.value <= 10) {
            return this.value.toString();
        }
        else if (this.value = 1) {
            return "A";
        }
        else if (this.value = 11) {
            return "J";
        }
        else if (this.value = 12) {
            return "Q";
        }
        else if (this.value = 13) {
            return "K";
        }
        else {
            console.log("ya done fucked up sweet tits");
            return error;
        }
    }

    cardToString() {
        let cardstring = "";
        if (this.value >= 2 && this.value <= 10) {
            cardstring = cardstring + this.value.toString();
        }
        else if (this.value = 1) {
            cardstring = cardstring + "A";
        }
        else if (this.value = 11) {
            cardstring = cardstring + "J";
        }
        else if (this.value = 12) {
            cardstring = cardstring + "Q";
        }
        else if (this.value = 13) {
            cardstring = cardstring + "K";
        }
        else {
            cardstring = cardstring + "ya done fucked up sweet tits";
        }
        cardstring = cardstring + " of " + this.suit;
        return cardstring;
    }
}

class Deck {
    constructor() {
        const maindeck = [];
        const suitarray = ["Hearts", "Diamonds", "Clubs", "Spades"];
        let deckcount = 0;
        for (let j = 0; j <= 3; j++) {
            for (let i = 1; i <= 13; i++) {
                maindeck[deckcount] = new Card(suitarray[j], i);
                deckcount++;
            }
        }
        this.maindeck = maindeck;
        this.deckIndex = 51;
    }

    printDeck() {
        for (let k = 0; k <= 51; k++) {
            console.log(this.maindeck[k]);
        }
    }

    shuffleDeck() {
        let currentIndex = this.deckIndex, randomIndex;

        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [this.maindeck[currentIndex], this.maindeck[randomIndex]] = [this.maindeck[randomIndex], this.maindeck[currentIndex]];
        }
        randomIndex = Math.floor(Math.random() * currentIndex);
        [this.maindeck[51], this.maindeck[randomIndex]] = [this.maindeck[randomIndex], this.maindeck[51]];
    }

    drawCard() {
        return this.maindeck.pop();
    }
}

class Player {
    constructor() {
        this.hand = [];
    }

    addToHand(newcard) {
        this.hand.push(newcard);
    }

    returnHand() {
        return this.hand;
    }

    returnHandPosition(pos) {
        return this.hand[pos];
    }

    returnHandLength() {
        return this.hand.length;
    }

    returnHandTotal() {
        let handtotal = 0;
        this.hand.forEach(card => handtotal = handtotal + card.getValue());
        return handtotal;
    }

}

class Blackjack {
    constructor() {
        this.player1 = new Player();
        this.dealer = new Player();
    }

    maingame() {
        const bjdeck = new Deck();
        const prompt = require('prompt-sync')();
        let gameflag = true;
        let userinput;
        let winner = -1;
        for (let i = 0; i <= 100; i++) {
            bjdeck.shuffleDeck();
        }

        this.player1.addToHand(bjdeck.drawCard());
        this.player1.addToHand(bjdeck.drawCard());
        this.dealer.addToHand(bjdeck.drawCard());
        this.dealer.addToHand(bjdeck.drawCard());

        while (gameflag) {
            console.log("Your hand is: ");
            for (let i = 0; i < this.player1.returnHandLength(); i++) {
                console.log(this.player1.returnHandPosition(i).cardToString());
            }
            console.log("Your opponent is showing:");
            console.log(this.dealer.returnHandPosition(0).cardToString());
            userinput = prompt("Hit or stay?");
            if (userinput === "hit") {
                console.log("You choose to hit.");
                //console.log(this.player1.returnHandTotal())
                this.player1.addToHand(bjdeck.drawCard());
                if (this.player1.returnHandTotal() > 21) {
                    console.log("You busted!! Dealer wins!");
                    gameflag = false;
                }
            }
            else if (userinput === "stay") {
                console.log("You choose to stay.");
                gameflag = false;
            }
            else {
                console.log("ya done fucked up sweet tits");
                gameflag = false;
            }
            
        }

        if (this.player1.returnHandTotal() <= 21) {
            gameflag = true;
            console.log("Dealer's turn: ");
        }
        
        while (gameflag) {
            if (this.dealer.returnHandTotal() < 17) {
                console.log("Dealer hits.");
                this.dealer.addToHand(bjdeck.drawCard());
                if (this.dealer.returnHandTotal() > 21) {
                    console.log("Dealer busted! You win!!");
                    gameflag = false;
                }
            }
            else {
                console.log("Dealer stays.");
                gameflag = false;
            }
        }

        if (this.dealer.returnHandTotal() <= 21 && this.player1.returnHandTotal() <= 21) {
            gameflag = true;
        }

        if (gameflag) {
            console.log("Dealer's hand: ");
            this.dealer.returnHand().forEach(card => console.log(card.cardToString()));
            console.log("Player's hand: ");
            this.player1.returnHand().forEach(card => console.log(card.cardToString()));

            if (this.dealer.returnHandTotal() >= this.player1.returnHandTotal()) {
                console.log("Dealer wins!");
            }
            else if (this.player1.returnHandTotal() > this.dealer.returnHandTotal()) {
                console.log("Player 1 wins!")
            }
        }
        return null;
    }
}

const playbj = new Blackjack();
playbj.maingame();
