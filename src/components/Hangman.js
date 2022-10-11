import React, { Component } from "react";
import { randomWord } from "./texts";

import step0 from "./img/0.png";
import step1 from "./img/1.png";
import step2 from "./img/2.png";
import step3 from "./img/3.png";
import step4 from "./img/4.png";
import step5 from "./img/5.png";
import step6 from "./img/6.png";

let gameStat;
class Hangman extends Component {
    static defaultProps = {
        maxWrong: 5,
        images: [step0, step1, step2, step3, step4, step6],
    };

    constructor(props) {
        super(props);
        this.state = {
            mistake: 0,
            guessed: new Set(),
            answer: randomWord(),
        };
        this.handleGuess = this.handleGuess.bind(this);
        this.keyPress = this.keyPress.bind(this);
        window.addEventListener("keydown", this.keyPress);
    }

    guessedWord() {
        return this.state.answer
            .split("")
            .map((bingo) => (this.state.guessed.has(bingo) ? bingo : "_"));
    }

    handleGuess(value) {
        let letter = value;
        this.setState((st) => ({
            guessed: st.guessed.add(letter),
            mistake: st.mistake + (st.answer.includes(letter) ? 0 : 1),
        }));
    }

    keyPress(event) {
        /**
         * 8 = backspace
         * 13 = enter
         * 32 = space
         * 65 = A (Capital)
         * 90 = Z (Capital)
         * 97 = a (Small)
         * 122 = z (Small)
         */
        if (gameStat === "YOU WON" || gameStat === "YOU LOST") {
            if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 32) {
                this.resetButton();
            }
        } else if (
            (event.keyCode >= 65 && event.keyCode <= 90) ||
            (event.keyCode >= 97 && event.keyCode <= 122)
        ) {
            this.handleGuess(event.key);
        } else if (
            event.keyCode === 8 ||
            event.keyCode === 13 ||
            event.keyCode === 32
        ) {
            this.resetButton();
        } else {
        }
    }

    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map((letter) => (
            <button
                key={letter}
                value={letter}
                onClick={(e) => this.handleGuess(e.target.value)}
                disabled={this.state.guessed.has(letter)}
            >
                {letter}
            </button>
        ));
    }

    resetButton = () => {
        this.setState({
            mistake: 0,
            guessed: new Set(),
            answer: randomWord(),
        });
    };

    render() {
        const { mistake, answer } = this.state;
        const { maxWrong, images } = this.props;
        const gameOver = mistake >= maxWrong;
        const altText = `${mistake}/${maxWrong} wrong guesses`;
        const isWinner = this.guessedWord().join("") === answer;
        gameStat = this.generateButtons();
        if (isWinner) {
            gameStat = "YOU WON";
        }
        if (gameOver) {
            gameStat = "YOU LOST";
        }
        const textStyle = {
            color: "white",
            padding: "10px",
            fontFamily: "Arial"
          };

    return (
      <div className="Hangman" align="center">
        <nav className="navbar navbar-expand-lg">
          <p style={textStyle}>Hangman AIForesee Frontend Test</p>
          <span className="d-xl-none d-lg-none text-primary">
            Guessed wrong: {mistake}
          </span>
          <div className="collapse navbar-collapse" id="navbarText">
            <p style={textStyle}> Wrong : {mistake}</p>
          </div>
        </nav >
        <p className="text-center">
          <img src={images[mistake]} alt={altText} />
        </p>
        <p className="text-center text-light">
          Guess the Programming Language ?
        </p>
        <p className="Hangman-word text-center">
          {!gameOver ? this.guessedWord() : answer}{" "}
        </p>

        <p className="text-center text-warning mt-4">{gameStat}</p>

        <div>
          <p className="text-center">
            <button className="Hangman-reset" onClick={this.resetButton}>
              Reset
            </button>
          </p>
        </div>
      </div >
    );
    }
}

export default Hangman;