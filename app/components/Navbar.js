import React from 'react';
import {Link} from 'react-router';

import Modal from 'react-modal';
import AddCharacter from './AddCharacter.js';
import AddRelationship from './AddRelationship.js';
import HomeActions from '../actions/HomeActions.js';
import CardsActions from '../actions/CardsActions.js'

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        width                 : '66.7%'
    }
};


class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            addCharacterModalIsOpen: false,
            addRelationshipModalIsOpen: false,
        }

        // bind context on functions
        this.openAddCharacterModal = this.openAddCharacterModal.bind(this);
        this.openAddRelationshipModal = this.openAddRelationshipModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openAddCharacterModal() {
        this.setState({
            addCharacterModalIsOpen: true
        });
    }

    openAddRelationshipModal() {
        this.setState({
            addRelationshipModalIsOpen: true
        });
    }

    closeModal() {
        HomeActions.getCharacters(); // the trick
        CardsActions.getRelationships(); // the trick
        if (this.state.addCharacterModalIsOpen) {
            this.setState({
                addCharacterModalIsOpen: false,
            });
        }
        if (this.state.addRelationshipModalIsOpen) {
            this.setState({
                addRelationshipModalIsOpen: false
            });
        }
    }

    render() {
        return (
            <div>
                <nav className='navbar navbar-default navbar-static-top'>
                    <div id='navbar' className='navbar-collapse collapse'>
                        <ul className='nav navbar-nav'>
                            <li><Link to='/'>Overview all characters and relationships</Link></li>
                            <li><a onClick={this.openAddCharacterModal}>Add a character</a></li>
                            <li><a onClick={this.openAddRelationshipModal}>Add a relationship</a></li>
                        </ul>
                    </div>
                </nav>
                <Modal
                    isOpen={this.state.addCharacterModalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}>
                    <div className="">
                        <AddCharacter />
                        <div className="row">
                            <div className="col-sm-12 close-modal">
                                <a onClick={this.closeModal}>Close</a>
                            </div>
                        </div>
                    </div>
                </Modal>
                <Modal
                    isOpen={this.state.addRelationshipModalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}>
                    <div className="">
                        <AddRelationship />
                        <div className="row">
                            <div className="col-sm-12 close-modal">
                                <a onClick={this.closeModal}>Close</a>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Navbar;
