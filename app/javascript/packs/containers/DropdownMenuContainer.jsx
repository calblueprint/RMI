import {getBuildingByID, getBuildings, getNavBarBuildings} from '../selectors/buildingsSelector'
import {Link} from 'react-router-dom'
import React from 'react'
import {connect} from 'react-redux'

class DropdownMenuContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropped: false,
        };
    }

    show() {
        this.setState({dropped: true});
        document.addEventListener("click", this.hide);
    }

    hide() {
        this.setState({dropped: false});
        document.removeEventListener("click", this.hide);
    }

    render() {
        const buildings = this.props.buildings;
        const currentBuilding = this.props.currentBuilding;
        return (<div>
            <h1> {"Current Building"} </h1>
            <h2>{currentBuilding ? currentBuilding.name : "Choose an Building"}</h2>
            <select className={"dropdown-container" + (this.state.dropped ? " show" : "")} onClick={this.show}>
                {"button"}
                <div className="dropdown-list">
                    {Object.keys(buildings).map(id => {
                        return (
                            <Link key={id} to={`/buildings/${id}`}> {buildings[id].name}</Link>
                        )
                })}
                </div>
            </select>

        </div>);
    }


}

function mapStateToProps(state, ownProps) {
    return {
        buildings: getBuildings(state),
        currentBuilding: getNavBarBuildings(ownProps.match.params.entity, ownProps.match.params.id, state),
    };
}


function mapDispatchToProps(dispatch) {
    return {};
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DropdownMenuContainer);