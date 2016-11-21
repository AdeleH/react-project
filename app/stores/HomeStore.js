import alt from '../alt';
import HomeActions from '../actions/HomeActions';

class HomeStore {
    constructor() {
        this.bindActions(HomeActions);
        this.characters = [];
        this.activeCarouselItem = 0;
    }

    onGetCharactersSuccess(data) {
        this.characters = data;
    }

    onGetCharactersFail(errorMessage) {
        toastr.error(errorMessage);
    }

}

export default alt.createStore(HomeStore);
