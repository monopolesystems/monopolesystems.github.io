import React from "react";
import { Icon } from './lib';
export class Flashcard extends React.Component {
  constructor({ flashcardData, index, total, side, onTurn, onTurnEnd, onAnswer }) {
    super()
    const [question, answer, ...examples] = flashcardData
    this.state = {
      question,
      answer,
      examples,
      side,
      showExample: false,
      turning: false,
      index,
      total
    }
  }
  handleToggleExample(e) {
    this.setState({
      showExample: !this.state.showExample
    })
    e.stopPropagation()
  }
  render() {
    const [question, answer, ...examples] = this.props.flashcardData
    const cardStyle = {
      position: 'absolute',
      top: 0,
      backfaceVisibility: 'hidden',
      height: '100%',
      width: '100%',
      transformStyle: 'preserve-3d',
      fontWeight: 'bold',
    }
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* <div style={{ flexGrow: 1 }}></div> */}
        <div
          style={{
            flexGrow: 2
          }}
          onTransitionEnd={this.props.onTurnEnd.bind(this)}
          className={'card-container ' + (this.props.side > 0 ? '' : 'flip')}>
          <div
            style={cardStyle}
            onClick={this.props.onTurn.bind(this)}>
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', backgroundColor: 'bisque' }}>
              <div style={{ flexGrow: 1, textAlign: 'center', fontWeight: 'bold', height: 0 }}>
                {/* {this.props.index + 1} / {this.props.total} */}
              </div>
              <div style={{
                textAlign: 'center',
                fontSize: '2em'
              }}>
                {question}
              </div>
              <div style={{ flexGrow: 1 }}></div>
            </div>
          </div>
          <div
            style={{
              ...cardStyle,
              transform: 'rotateY(180deg)',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'center',
              backgroundColor: 'khaki'
            }}
            onClick={this.props.onTurn.bind(this)}>
            <div style={{
              flexGrow: 2,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: examples.length ? 'flex-end' : 'center'
            }}>
              <div style={{
                fontSize: '2em'
              }}>
                {answer}
              </div>
            </div>
            {
              examples.length ?
                <div style={{
                  flexGrow: 1,
                  fontSize: '1em',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  height: '10vh'
                }}>
                  <button
                    className="btn btn-link btn-sm"
                    style={{ width: 200, margin: 20, padding: 0 }}
                    onClick={this.handleToggleExample.bind(this)}>
                    {this.state.showExample ? 'Hide' : 'Show'} Examples
                    </button>
                  {
                    examples.map((example, index) => <div style={{
                      visibility: this.state.showExample ? 'visible' : 'hidden'
                    }} key={index} className="font-italic text-muted">{example}</div>)
                  }
                </div> :
                null
            }
            <div style={{
              flexGrow: 1,
              // display: 'flex',
              // flexDirection: 'row',
              // justifyContent: 'space-around',
              margin: 30
            }}>
            <button onClick={e=>{this.props.onAnswer(false); e.preventDefault()}} className="btn btn-lg btn-danger" style={{width: '30vw'}}><Icon className="thumbs-down"/></button>
            <button onClick={e=>{this.props.onAnswer(true); e.preventDefault(); e.stopPropagation()}} className="btn btn-lg btn-success" style={{width: '30vw'}}><Icon className="thumbs-up"/></button>
            </div>
          </div>
        </div>
        {/* <div style={{ flexGrow: 1 }}></div> */}
      </div>
    )
  }
}
