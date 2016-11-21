import alt from '../alt';

import $ from 'jquery';

class HomeActions {
    constructor() {
        this.generateActions(
            'getCharactersSuccess',
            'getCharactersFail',
        );
    }

    getCharacters() {

        $.ajax({ url: '/api/characters' })
        .done(data => {
            this.actions.getCharactersSuccess(data);
        })
        .fail(jqXhr => {
            this.actions.getCharactersFail(jqXhr.responseJSON.message);
        });
    }

}

export default alt.createActions(HomeActions);
