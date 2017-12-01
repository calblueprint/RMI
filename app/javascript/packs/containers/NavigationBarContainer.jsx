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
        // const buildings = this.props.buildings;
        // const name = this.props.name;
        // const email = this.props.email;
        // return (
        //     <div class="navbar">
        //         <a href= "/buildings">{name}</a>
        //         <a href= "/buildings">{email}</a>
        //         <div class="dropdown">
        //             <button class="dropbtn">Select A Building
        //                 <i class="fa fa-caret-down"></i>
        //             </button>
        //             <div class="dropdown-content">
        //                 {Object.keys(buildings).map(id => {
        //                     return (<p>
        //                         <Link to={`/buildings/${id}`}>{buildings[id].name}</Link>
        //                     </p>)
        //                 })}
        //                 </div>
        //         </div>
        //     </div>);
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

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NavigationBarContainer);
