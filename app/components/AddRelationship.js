import React from 'react';

import AddRelationshipStore from '../stores/AddRelationshipStore';
import AddRelationshipActions from '../actions/AddRelationshipActions';

class AddRelationship extends React.Component {
    constructor(props) {
        super(props);
        this.state = AddRelationshipStore.getState(); // name0, name1, stateField, helpBlock, name0ValidationState, name1ValidationState
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        AddRelationshipStore.listen(this.onChange);
    }

    componentWillUnmount() {
        AddRelationshipStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();

        var name0 = this.state.name0.trim();
        var name1 = this.state.name1.trim();
        var stateField = this.state.stateField; // default value

        if (name0 && name1) {
            AddRelationshipActions.addRelationship(name0, name1, stateField);
        } else {
            this.refs.nameTextField.focus();
            AddRelationshipActions.invalidName();
        }
    }

    render() {
        return (
            <div className="">
                <div className='row'>
                    <div className='col-sm-12'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>Add a new relationship</div>
                            <div className='panel-body'>
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className={'form-group ' + this.state.name0ValidationState}>
                                        <label className='control-label'>Character Name #1</label>
                                        <input type='text' className='form-control' ref='nameTextField' value={this.state.name0} onChange={AddRelationshipActions.updateNameZero} autoFocus/>
                                    </div>
                                    <div className={'form-group ' + this.state.name1ValidationState}>
                                        <label className='control-label'>Character Name #2</label>
                                        <input type='text' className='form-control' ref='nameTextField' value={this.state.name1} onChange={AddRelationshipActions.updateNameOne} />
                                    </div>
                                    <div className='form-group'>
                                        <label className='control-label'>Select the type of relationship: </label>
                                        <select onChange={AddRelationshipActions.updateStateField} defaultValue={this.state.stateField}>
                                            <option value="NEUTRAL">NEUTRAL</option>
                                            <option value="ALLIANCE">ALLIANCE</option>
                                            <option value="ARCHENEMY">ARCHENEMY</option>
                                        </select>
                                    </div>
                                    <div className='form-group'>
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

export default AddRelationship;
