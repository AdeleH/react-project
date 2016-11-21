import alt from '../alt';
import AddCharacterActions from '../actions/AddCharacterActions';

class AddCharacterStore {
    constructor() {
        this.bindActions(AddCharacterActions);
        this.name = '';
        this.helpBlock = '';
        this.nameValidationState = '';
    }

    onAddCharacterSuccess(successMessage) {
        this.nameValidationState = 'has-success';
        this.helpBlock = successMessage;
    }

    onAddCharacterFail(errorMessage) {
        this.nameValidationState = 'has-error';
        this.helpBlock = errorMessage;
    }

    onUpdateName(event) {
        this.name = event.target.value;
        this.nameValidationState = '';
        this.helpBlock = '';
    }

    onInvalidName() {
        this.nameValidationState = 'has-error';
        this.helpBlock = 'Please enter a character name.';
    }

}

export default alt.createStore(AddCharacterStore);
