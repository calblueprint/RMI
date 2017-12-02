import React from 'react';

import { loadInitialState } from '../actions/initialState';
import { getBuildings } from '../selectors/buildingsSelector';
import { getName, getEmail} from '../selectors/usersSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class NavigationBarContainer extends React.Component {
    componentDidMount() {
        if (window.INITIAL_STATE) {
            this.props.initActions.loadInitialState(window.INITIAL_STATE);
        }
    }
    render() {
        const buildings = this.props.buildings;
        const name = this.props.name;
        const email = this.props.email;
        return (
            <div className="navbar">
                <Link to= "/buildings">{name}</Link>
                <br/>
                <Link to= "/buildings">{email}</Link>
                <div className="dropdown">
                    <button className="dropbtn" onClick= {myFunction()}>Current Building</button>
                    <div className="dropdown-content">
                        {Object.keys(buildings).map(id => {
                            return (<p>
                                <Link to={`/buildings/${id}`}>{buildings[id].name}</Link>
                            </p>)
                        })}
                        </div>
                </div>
            </div>);
    }
}

function mapStateToProps(state) {
    return {
        buildings: getBuildings(state),
        name: getName(state),
        email: getEmail(state)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        initActions: bindActionCreators({ loadInitialState }, dispatch)
    };
}

function myFunction() {
    if (document.getElementById("dropdown-content")) {
        document.getElementById("dropdown-content").classList.toggle("show");
    }

}

// Close the dropdown if the user clicks outside of it
window.onclick = function(click) {
    if (!click.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("dropdown-content");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBarContainer);
