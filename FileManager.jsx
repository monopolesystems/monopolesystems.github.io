import React from "react";
import { FlashcardManager } from './FlashcardManager';
import { Icon } from './lib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import data from './data';

const TEST_DATA = `question1|answer1|example1
question2|answer2|example21|example22
question3|answer3`

const germanFlag = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDUgMyI+DQo8cGF0aCBkPSJtMCwwaDV2M2gtNXoiLz4NCjxwYXRoIGZpbGw9IiNkMDAiIGQ9Im0wLDFoNXYyaC01eiIvPg0KPHBhdGggZmlsbD0iI2ZmY2UwMCIgZD0ibTAsMmg1djFoLTV6Ii8+DQo8L3N2Zz4NCg=='

export class FileManager extends React.Component {
  constructor({ }) {
    super()
    this.fileReader = new FileReader()
    this.fileReader.onloadend = () => this.setState({
      fileData: this.fileReader.result
    })
    this.state = {
      fileData: null,
      // fileData: TEST_DATA,
    }
    this.data = data || {}
  }
  onFileChange(event) {
    this.fileReader.readAsText(event.target.files[0])
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-2"></div>
          {
            !this.state.fileData ?
              <div className="col-xl-6 col-md-8" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <div style={{ flexGrow: 1 }}></div>
                <div style={{ flexGrow: 1 }}>
                  <p>Select Input File</p>
                  <input
                    type="file"
                    id="file"
                    onChange={this.onFileChange.bind(this)}
                  />
                  <br />
                  <br />
                  <div style={{ flexGrow: 1, alignItems: 'flex-start' }}>
                    {
                      Object.keys(this.data)
                        .map(x =>
                          <div>
                            <button
                              key={x}
                              onClick={_ => this.setState({ fileData: this.data[x] })}
                              className="btn-sm btn btn-link">Load {x}</button>
                          </div>
                        )
                    }
                  </div>
                </div>
              </div>
              :
              null
          }

          {this.state.fileData ?
            <div className="col-xl-6 col-lg-8">
              <FlashcardManager
                fileData={this.state.fileData}
              />
            </div>
            :
            null
          }
          <div className="col-xl-3 col-lg-2">
            {
              this.state.fileData ?
                <Icon
                  className="times"
                  onClick={() => { if (confirm('Do you want to remove the loaded flashcards?')) this.setState({ fileData: null }) }} />
                : null
            }
          </div>
        </div>
      </div>
    )
  }
}
