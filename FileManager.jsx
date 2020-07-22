import React from "react";
import { FlashcardManager } from './FlashcardManager';
import data from './data';
import { Navbar, NavbarBrand, Row, NavItem, NavLink, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, NavbarToggler } from 'reactstrap';

const TEST_DATA = `question1|answer1|example1
question2|answer2|example21|example22
question3|answer3`

// const germanFlag = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDUgMyI+DQo8cGF0aCBkPSJtMCwwaDV2M2gtNXoiLz4NCjxwYXRoIGZpbGw9IiNkMDAiIGQ9Im0wLDFoNXYyaC01eiIvPg0KPHBhdGggZmlsbD0iI2ZmY2UwMCIgZD0ibTAsMmg1djFoLTV6Ii8+DQo8L3N2Zz4NCg=='

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
  onFileChange(name) {
  }
  render() {
    return (
      <div>
        <Navbar color="dark" dark fixed expand style={{height: '5vh'}}>
          <NavbarBrand>Flashcards</NavbarBrand>
          <NavbarToggler />
          <Nav className="" mr-auto navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Load
              </DropdownToggle>
              <DropdownMenu>
                {Object.keys(this.data).map((name) => {
                  return (
                    <DropdownItem
                      key={name}
                      onClick={_ => this.setState({ fileData: this.data[name] })}>
                      {name}
                    </DropdownItem>
                  )
                })}
                <DropdownItem onClick={_ => this.setState({ fileData: null })}>Unload content</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        </Navbar>
        {this.state.fileData ?
          <div className="col-12">
            <FlashcardManager
              fileData={this.state.fileData}
            />
          </div>
          :
          null
        }
        { /* <Row style={{ margin: 0 }}>
          <div className="col-xl-3 col-lg-2"></div>
          {
            !this.state.fileData ?
              <div className="col-xl-6 col-md-8" style={{ display: 'flex', flexDirection: 'column', height: '90vh' }}>
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

          {/* <div className="col-xl-3 col-lg-2">
            {
              this.state.fileData ?
                <Icon
                  className="times"
                  onClick={() => { if (confirm('Do you want to remove the loaded flashcards?')) this.setState({ fileData: null }) }} />
                : null
            }
          </div> */}
        {/* </Row> */}
      </div>
    )
  }
}
