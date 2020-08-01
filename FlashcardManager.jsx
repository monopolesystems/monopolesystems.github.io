import React from "react";
import { Flashcard } from './Flashcard';
import { Icon } from './lib';
import { Swipeable } from 'react-swipeable';

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
        flashcardData, key: index, answered: false
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
  handleAnswer(correct) {
    const flashcards = this.state.flashcards
    flashcards[this.state.index].correct = correct
    flashcards[this.state.index].answered = true
    this.setState({ flashcards })
  }
  componentDidMount() {
    this.fcm.current.focus()
  }
  render() {
    console.log(this.state);
    const currentFlashCard = this.state.flashcards[this.state.index]
    return (
      <div className="row align-items-center" style={{ height: '90vh', margin: 0 }}
        onKeyDown={this.handleKeyDown.bind(this)}
        ref={this.fcm}
        tabIndex="0">
        <nav class="navbar nav fixed-bottom navbar-light bg-light justify-content-left" style={{ height: '5vh', fontSize: '2em' }}>
          <li class="nav-item" onClick={this.handleFirstClick.bind(this)}>
            <Icon className="angle-double-left" />
          </li>
          <li class="nav-item" onClick={this.handlePreviousClick.bind(this)}>
            <Icon className="caret-square-left" />
          </li>
          <div className="navbar-text font-weight-bold">
            <span style={{ marginLeft: 5, marginRight: 5 }} className="text-muted">{this.state.index + 1}</span>
            /<span style={{ marginLeft: 5, marginRight: 5 }} className="text-primary">{this.state.flashcards.length}</span>
          </div>
          <div className="navbar-brand" style={{ fontSize: '1em' }}>
            <span style={{ marginLeft: 5, marginRight: 5 }} className="text-success font-weight-bold">
              {this.state.flashcards.filter(({ correct }) => correct === true).length}
            </span>
            /<span style={{ marginLeft: 5, marginRight: 5 }} className="text-danger font-weight-bold">
              {this.state.flashcards.filter(({ correct }) => correct === false).length}
            </span>
          </div>
          <li class="nav-item" onClick={this.handleNextClick.bind(this)}>
            <Icon className="caret-square-right" />
          </li>
          <li class="nav-item" onClick={this.handleLastClick.bind(this)}>
            <Icon className="angle-double-right" />
          </li>
        </nav>
        <Swipeable
          onSwipedRight={this.handlePreviousClick.bind(this)}
          onSwipedLeft={this.handleNextClick.bind(this)}
          className="col-md-12"
          style={{ height: '75vh' }}>
          <Flashcard
            total={this.state.flashcards.length}
            index={this.state.index}
            {...currentFlashCard}
            side={this.state.side}
            onTurn={this.handleTurn.bind(this)}
            onTurnEnd={this.handleTurnEnd.bind(this)}
            onAnswer={correct => this.handleAnswer(correct)} />
        </Swipeable>
      </div>
    )
  }
}
