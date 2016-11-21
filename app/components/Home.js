import React from 'react';
import {Link} from 'react-router';
import HomeStore from '../stores/HomeStore'
import HomeActions from '../actions/HomeActions';
import {first, without, findWhere} from 'underscore';
import Cards from './Cards.js';

var AVATARS = 4; // number of avatars

var EmptyElementMsg = React.createClass({
    getInitialState: function(){
        return {
            msg: "No character to display. Please add a first new character to begin."
        }
    },
    render: function(){
        return (
            <h4 className="emptyCarouselMsg black-color text-center">{this.props.msg}</h4>
        )
    }
});

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = HomeStore.getState();
        this.onChange = this.onChange.bind(this);

        // bind context on functions
        this._goBack = this._goBack.bind(this);
        this._goNext = this._goNext.bind(this);
    }

    componentDidMount() {
        HomeStore.listen(this.onChange);
        HomeActions.getCharacters();
    }

    componentWillUnmount() {
        HomeStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    _goBack() {
        let _activeCarouselItem = ((this.state.activeCarouselItem == 0) ? (this.state.characters.length - 1) : (this.state.activeCarouselItem - 1))
        this.setState({
            activeCarouselItem: _activeCarouselItem,
        });
    }

    _goNext() {
        let _activeCarouselItem = ((this.state.activeCarouselItem == (this.state.characters.length - 1)) ? 0 : (this.state.activeCarouselItem + 1))
        this.setState({
            activeCarouselItem: _activeCarouselItem,
        });
    }

    getActiveCharacterId() {
        return (this.state.characters.length !== 0 ?
            this.state.characters[this.state.activeCarouselItem]._id : "")
    }

    render() {

        var get_img = function(index) {
            // Img src
            var rand = parseInt(index) % AVATARS + 1;
            var img_src = "img/avatars/"+ rand + "_250x250.png";
            return img_src;
        }

        var characterSlides = this.state.characters.map((character, index) => {
            return (
                <div key={character._id} className={(parseInt(index) == this.state.activeCarouselItem ? "item active" : "item")}>
                    <div className="row-fluid">
                        <div className="span3 character">
                            <a href="javascript: void 0;" className="thumbnail">
                                <img src={get_img(index)} alt="Image" />
                            </a>
                            <h4 className="text-center black-color">{character.name}</h4>
                        </div>
                    </div>
                </div>
            );
        });

        return (
            <div className="container">
                <div className="row">
                    <div className="span12">
                        <div className="well">
                            <div id="myCarousel" className="carousel slide" data-interval="false">
                                <ol className="carousel-indicators">
                                {
                                    this.state.characters.forEach(function(character, index){
                                        if (index == 0) {
                                            return <li data-target="#myCarousel" data-slide-to={index} className="active"></li>;
                                        }
                                        return <li data-target="#myCarousel" data-slide-to={index}></li>;
                                    })
                                }
                                </ol>
                                <div className="carousel-inner">
                                {characterSlides}
                                </div>
                                <a className="left carousel-control" href="#myCarousel" data-slide="prev" onClick={this._goBack}>‹</a>
                                <a className="right carousel-control" href="#myCarousel" data-slide="next" onClick={this._goNext}>›</a>
                                {(this.state.characters.length == 0) && <EmptyElementMsg msg="No character to display. Please add a first new character to begin."/>}
                            </div>
                        </div>
                    </div>
                </div>
                <Cards characterId={this.getActiveCharacterId()} />
            </div>
        )
    }
}

export default Home;
