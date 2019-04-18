import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCategoryById } from '../selectors/categoriesSelector'
import PropTypes from 'prop-types';
import DelegationInfoContainer from './DelegationInfoContainer';

class CategoryDetailsContainer extends React.Component {    
    delegationInfo() {
        let userData = this.props.userData;
        let catData = this.props.categoryData;
        let delegations = catData.delegations;
        
        if (delegations) {
            return delegations.map((d) => {
                let email = d.email

                if (userData && userData[email]) {
                    d.lastActive = userData[email];
                }
                return (<DelegationInfoContainer delegation={d}></DelegationInfoContainer>)
            })
        } else {
            return (<span>No one assigned yet</span>);
        }
    }
    
    
    render() {
        let catName = this.props.category.name;
        let buildingName = this.props.buildingName;

        return (
            <div>
                <div>
                    <span className="small_header">QUESTIONS</span>
                    <h2>{catName}</h2>
                    <p>for {buildingName}</p>
                    <br></br>
                    <span className='building__link'>
                        <Link to={`/buildings/${this.props.buildingId}/edit/${this.props.categoryId}`}>Open {catName} Questions</Link>
                    </span>   
                </div>
                <div className='delegations_list'>
                    <span className="small_header">PEOPLE</span>  
                    {this.delegationInfo()} 
                </div>
            </div>
        );
    }
}

CategoryDetailsContainer.propTypes = {
    buildingId: PropTypes.number.isRequired,
    buildingName: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    userData: PropTypes.object.isRequired,
    categoryData: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
      category: getCategoryById(ownProps.categoryId, state),
    };
  }
  
function mapDispatchToProps(dispatch) {
    return {
        clickAction: (portfolioId, buildingId) => {
        dispatch(viewBuildingDetails(portfolioId, buildingId));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryDetailsContainer);
