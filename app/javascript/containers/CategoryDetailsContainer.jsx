import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addAnswers } from "../actions/answers";
import { getCategoryById } from '../selectors/categoriesSelector'
import { delegateCategoryQuestions } from '../utils/DelegationRequests';

import DelegationInfoContainer from './DelegationInfoContainer';
import DelegationPopover from "../components/DelegationPopover";

/** Renders the main details for a specific category, 
 * including the category name and building name
 */
class CategoryDetailsContainer extends React.Component {    
    delegationInfo() {
        let loginUserData = this.props.loginUserData;
        let catData = this.props.categoryData;
        let delegations = catData.delegations;
        
        if (delegations) {
            return delegations.map((d) => {
                let email = d.email

                if (loginUserData && loginUserData[email]) {
                    d.lastActive = loginUserData[email];
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
        let delegateQuestions = this.props.delegateQuestions;
        
        return (
            <div>
                <div>
                    <span className="small_header">QUESTIONS</span>
                    <h2>{catName}</h2>
                    <p>for {buildingName}</p>
                    <br></br>
                    <DelegationPopover
                            label="Assign Category"
                            onSelectedContact={(contact) => delegateQuestions(contact, this.props.addAnswers)}
                    />
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
    loginUserData: PropTypes.object.isRequired,
    categoryData: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
      category: getCategoryById(ownProps.categoryId, state),
      delegateQuestions: (userDetails, addAnswers) => delegateCategoryQuestions(ownProps.categoryId, ownProps.buildingId, userDetails, state, addAnswers)
    };
  }
  
function mapDispatchToProps(dispatch) {
    return {
        addAnswers: (answers, buildingId) => {
            dispatch(addAnswers(answers, buildingId));
        }
    };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CategoryDetailsContainer);
