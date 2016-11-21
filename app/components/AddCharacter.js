import React from 'react';
import AddCharacterStore from '../stores/AddCharacterStore';
import AddCharacterActions from '../actions/AddCharacterActions';

class AddCharacter extends React.Component {
    constructor(props) {
        super(props);
        this.state = AddCharacterStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AddCharacterStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AddCharacterStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();

        var name = this.state.name.trim();

        if (!name) {
            AddCharacterActions.invalidName();
            this.refs.nameTextField.focus();
        }

        if (name) {
            AddCharacterActions.addCharacter(name);
        }
    }

    render() {
        return (
            <div className="">
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>Add Character</div>
                            <div className='panel-body'>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className={'form-group ' + this.state.nameValidationState}>
                                        <label className='control-label'>Character Name</label>
                                        <input
                                            type='text'
                                            className='form-control'
                                            ref='nameTextField'
                                            value={this.state.name}
                                            onChange={AddCharacterActions.updateName}
                                            autoFocus/>
                                        <span className='help-block'>{this.state.helpBlock}</span>
                                    </div>
                                    <button type='submit' className='btn btn-primary'>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddCharacter;
