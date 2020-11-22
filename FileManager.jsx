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
        <Navbar color="dark" dark fixed expand style={{ height: '5vh', fontSize: '2em' }}>
          <NavbarBrand style={{ fontSize: '1em' }}>Flashcards</NavbarBrand>
          <NavbarToggler />
          <Nav className="navbar-nav ml-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Load
              </DropdownToggle>
              <DropdownMenu right>
                {Object.keys(this.data).map((name) => {
                  return (
                    <DropdownItem
                      style={{ fontSize: '2em' }}
                      key={name}
                      onClick={_ => this.setState({ fileData: this.data[name] })}>
                      {name}
                    </DropdownItem>
                  )
                })}
                <DropdownItem
                  style={{ fontSize: '2em' }}
                  onClick={_ => this.setState({ fileData: null })}>Unload content</DropdownItem>
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
      </div>
    )
  }
}
