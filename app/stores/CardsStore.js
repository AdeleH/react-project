import alt from '../alt';
import CardsActions from '../actions/CardsActions';

class CardsStore {
    constructor() {
        this.bindActions(CardsActions);
        this.relationships = [];
    }

    onGetRelationshipsSuccess(data) {
        this.relationships = data;
    }

    onGetRelationshipsFail(errorMessage) {
        toastr.error(errorMessage);
    }

    onRemoveRelationshipSuccess(relationshipId) {
        // Find index in the array
        var index = this.relationships.findIndex(relationship => relationship._id == relationshipId);
        // Remove the element at index i but do not change the indexes of the other elements in the array
        delete this.relationships[index];

        toastr.warning('Relationship has been removed.');
    }

    onRemoveRelationshipFail(jqXhr) {
        toastr.error(jqXhr.responseJSON.message);
    }

}

export default alt.createStore(CardsStore);
