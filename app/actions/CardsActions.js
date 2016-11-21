import alt from '../alt';

import $ from 'jquery';

class CardsActions {
    constructor() {
        this.generateActions(
            'getRelationshipsSuccess',
            'getRelationshipsFail',
            'removeRelationshipSuccess',
            'removeRelationshipFail',
        );
    }

    getRelationships() {
        $.ajax({ url: '/api/relationships' })
        .done(data => {
            this.actions.getRelationshipsSuccess(data);
        })
        .fail(jqXhr => {
            this.actions.getRelationshipsFail(jqXhr.responseJSON.message);
        });
    }

    removeRelationship(relationshipId) {
        $.ajax({
            type: 'POST',
            url: '/api/relationship/delete',
            data: { relationshipId: relationshipId }
        })
        .done(() => {
            this.actions.removeRelationshipSuccess(relationshipId);
        })
        .fail((jqXhr) => {
            this.actions.removeRelationshipFail(jqXhr);
        });
    }
}

export default alt.createActions(CardsActions);
