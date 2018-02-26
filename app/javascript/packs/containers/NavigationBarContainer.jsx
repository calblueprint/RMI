import React from 'react';

import { loadInitialState } from '../actions/initialState';
import { getBuildings } from '../selectors/buildingsSelector';
import { getName, getEmail} from '../selectors/usersSelector';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DropdownMenuContainer from 'DropdownMenuContainer'
import { Link } from 'react-router-dom';
import {}

class NavigationBarContainer extends React.Component {
    componentDidMount() {
        if (window.INITIAL_STATE) {
            this.props.initActions.loadInitialState(window.INITIAL_STATE);
        }
    }
    render() {
        return(
            <DropdownMenuContainer {...this.props}/>
            // <CategoryContainer/>

            )


    }
}

function mapStateToProps(state) {
    return {
        buildings: getBuildings(state),
        currentBuilding: getNavBarBuildings(ownProps.match.params.entity, ownProps.match.params.id, state),
    //    currentCategory: getCurrentCategory(ownProps.match.params.entity, ownProps.match.params.id, state),
    //    categories:  getCategories(ownProps.match.params.entity, ownProps.match.params.id, state)
    //    answers: getRemainingAnswers(getAnswers(ownProps.match.params.entity, ownProps.match.params.id, state))
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
