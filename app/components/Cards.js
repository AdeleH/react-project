import React from 'react';
import {Link} from 'react-router';
import CardsStore from '../stores/CardsStore'
import CardsActions from '../actions/CardsActions';

var RELATIONSHIPS = 3; // numer of relationships

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

var Card = React.createClass({
    render: function (){
        return (
            <div className="card flipInX animated" key={this.props.key}>
                <div className="card-content">
                    <div className={"card-header " + this.props.header_class}>
                        <div>
                            <h1 className="card-heading text-center">{this.props.relationship.state}</h1>
                        </div>
                        <div className="remove" onClick={CardsActions.removeRelationship.bind(this, this.props.relationship._id)}>x</div>
                    </div>
                    <div className="card-body">
                        <div className="card-p">
                            <div>
                                <h4 className="text-center">{this.props.relationship.name0}</h4>
                            </div>
                            <br/>
                            <div>
                                <h4 className="text-center">{this.props.relationship.name1}</h4>
                            </div>
                        </div>
                    </div>
                    <nav className="nav-tabs">
                        <ul className="nav nav-pills pull-left">
                            <li><a className={"text-center " + this.props.nav_class} onClick={CardsActions.removeRelationship.bind(this, this.props.relationship._id)}>Remove</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        )
    }
});

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = CardsStore.getState();
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        CardsStore.listen(this.onChange);
        CardsActions.getRelationships();
    }

    componentWillUnmount() {
        CardsStore.unlisten(this.onChange);
    }

    onChange(state) {
        this.setState(state);
    }

    render() {

        var relationshipCards = this.state.relationships.map((relationship, index) => {

            var color="grey"; // default color for NEUTRAL relations
            if (relationship.state == 'ARCHENEMY') {
                var color="pink";
            }
            if (relationship.state == 'ALLIANCE') {
                var color="green";
            }

            var header_class = "card-header-" + color;
            var nav_class = "card-action-" + color;

            if ((this.props.characterId == relationship.id0) || (this.props.characterId == relationship.id1)){
                return (
                    <Card key={relationship._id} relationship={relationship} header_class={header_class} nav_class={nav_class}/>
                )
            }
        });

        return (
            <div className="container">
                {relationshipCards}
                {(this.state.relationships.length == 0) && <EmptyElementMsg msg="No relationship to display. Please add a first new relationship to begin."/>}
            </div>
        )
    }
}

export default Cards;
