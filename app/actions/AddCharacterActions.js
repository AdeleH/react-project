import alt from '../alt';

import $ from 'jquery';

class AddCharacterActions {
    constructor() {
        this.generateActions(
            'addCharacterSuccess',
            'addCharacterFail',
            'updateName',
            'invalidName',
        );
    }

    addCharacter(name) {
        $.ajax({
            type: 'POST',
            url: '/api/characters',
            data: {name: name}
        })
        .done((data) => {
            this.actions.addCharacterSuccess(data.message);
        })
        .fail((jqXhr) => {
            this.actions.addCharacterFail(jqXhr.responseJSON.message);
        });
    }
}

export default alt.createActions(AddCharacterActions);
