import React from "react";
import { Flashcard } from './Flashcard';
import { Icon } from './lib';

export class FlashcardManager extends React.Component {
  constructor({ fileData }) {
    super()
    this.state = {
      flashcards: this.initializeFlashcards(fileData),
      index: 0,
      side: 1
    }
    this.fcm = React.createRef();
  }
  initializeFlashcards(fileData) {
    const lines = fileData
      .split('\n')
      .map(line => line.trim())
    const flashcards = lines
      .filter(line => {
        const [question, answer, example] = line.split('|')
        return question
      })
      .map((line, index) => {
        const [question, answer, ...examples] = line.split('|')
        return [
          question,
          answer,
          ...examples
        ]
      })
      .map((flashcardData, index) => ({
        flashcardData, key: index
      })
      )
    return flashcards
  }
  handleTurn() {
    this.setState({
      side: this.state.side * -1,
      turning: true
    })
  }
  handleTurnEnd() {
    this.setState({
      turning: false
    })
  }
  handlePreviousClick() {
    const previousIndex = this.state.index - 1
    if (previousIndex >= 0) {
      this.setState({
        index: previousIndex,
        side: 1
      })
    }
  }
  handleNextClick() {
    const nextIndex = this.state.index + 1
    const numberOfFlashcards = this.state.flashcards.length
    if (nextIndex < numberOfFlashcards) {

      this.setState({
        index: nextIndex,
        side: 1
      })
    }
  }
  handleFirstClick() {
    this.setState({
      index: 0,
      side: 1
    })
  }
  handleLastClick() {
    this.setState({
      index: this.state.flashcards.length - 1,
      side: 1
    })
  }
  handleKeyDown({ keyCode }) {
    console.log(keyCode);
    switch (keyCode) {
      case 39:
        this.handleNextClick()
        break;
      case 37:
        this.handlePreviousClick()
        break;
      case 32:
        this.setState({
          side: this.state.side * -1
        })
      default:
        break;
    }
  }
  componentDidMount() {
    this.fcm.current.focus()
  }
  render() {
    const currentFlashCard = this.state.flashcards[this.state.index]
    return (
      <div className="row align-items-center" style={{ height: '100vh' }}
        onKeyDown={this.handleKeyDown.bind(this)}
        ref={this.fcm}
        tabIndex="0">
        <div className="col" onClick={this.handleFirstClick.bind(this)}>
          <Icon className="angle-double-left" />
        </div>
        <div className="col" onClick={this.handlePreviousClick.bind(this)}>
          <Icon className="caret-square-left" />
        </div>
        <div className="col-8" style={{ height: '100vh' }}>
          <Flashcard total={this.state.flashcards.length} index={this.state.index} {...currentFlashCard} side={this.state.side} onTurn={this.handleTurn.bind(this)} onTurnEnd={this.handleTurnEnd.bind(this)} />
        </div>
        <div className="col" onClick={this.handleNextClick.bind(this)}>
          <Icon className="caret-square-right" />
        </div>
        <div className="col" onClick={this.handleLastClick.bind(this)}>
          <Icon className="angle-double-right" />
        </div>
      </div>
    )
  }
}
