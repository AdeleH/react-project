import alt from '../alt';

import $ from 'jquery';

class AddRelationshipActions {
    constructor() {
        this.generateActions(
            'addRelationshipSuccess',
            'addRelationshipFail',
            'updateNameZero',
            'updateNameOne',
            'invalidName',
            'updateStateField'
        );
    }

    addRelationship(name0, name1, stateField) {
        $.ajax({
            type: 'POST',
            url: '/api/relationships',
            data: {name0: name0, name1: name1, stateField: stateField}
        })
        .done((data) => {
            this.actions.addRelationshipSuccess(data.message);
        })
        .fail((jqXhr) => {
            this.actions.addRelationshipFail(jqXhr.responseJSON.message);
        });
    }
}

export default alt.createActions(AddRelationshipActions);
