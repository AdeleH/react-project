import alt from '../alt';
import AddRelationshipActions from '../actions/AddRelationshipActions';

class AddRelationshipStore {
    constructor() {
        this.bindActions(AddRelationshipActions);
        this.name0 = '';
        this.name1 = '';
        this.stateField = 'NEUTRAL'; // default value
        this.helpBlock = '';
        this.name0ValidationState = '';
        this.name1ValidationState = '';
    }

    onAddRelationshipSuccess(successMessage) {
        this.name0ValidationState = 'has-success';
        this.name1ValidationState = 'has-success';
        this.helpBlock = successMessage;
    }

    onAddRelationshipFail(errorMessage) {
        if (!this.name0) {
            this.name0ValidationState = 'has-error';
        }
        if (!this.name1) {
            this.name1ValidationState = 'has-error';
        }
        if (this.name0 && this.name1 && (this.name0 == this.name1)) {
            this.name0ValidationState = 'has-error';
            this.name1ValidationState = 'has-error';
        }
        this.helpBlock = errorMessage;
    }

    onUpdateNameZero(event) {
        this.name0 = event.target.value;
        this.name0ValidationState = '';
        this.helpBlock = '';
    }

    onInvalidName() {
        var msg = ""
        if (!this.name0) {
            this.name0ValidationState = 'has-error';
            msg += 'Please enter a valid name for the charactere #1. ';
        }
        if (!this.name1) {
            this.name1ValidationState = 'has-error';
            msg += 'Please enter a valid name for the charactere #2.';
        }
        if (this.name1 && this.name2 && (this.name0 == this.name1)) {
            this.name0ValidationState = 'has-error';
            this.name1ValidationState = 'has-error';
            msg += 'The names of the characters can not be the same.';
        }
        this.helpBlock = msg;
    }

    onUpdateNameOne(event) {
        this.name1 = event.target.value;
        this.name1ValidationState = '';
        this.helpBlock = '';
    }

    onUpdateStateField(event) {
        this.stateField = event.target.value;
    }

}

export default alt.createStore(AddRelationshipStore);
