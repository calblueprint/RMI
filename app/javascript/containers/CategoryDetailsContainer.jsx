import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactModal from "react-modal";

import { addAnswers } from "../actions/answers";
import { getUnfinishedAnswersForCategoryAndBuilding } from "../selectors/answersSelector";
import { getCategoryById } from '../selectors/categoriesSelector'
import { delegateQuestions } from '../utils/DelegationRequests';
import DelegationContactCard from "../components/DelegationContactCard";

import DelegationInfoContainer from './DelegationInfoContainer';
import DelegationPopover from "../components/DelegationPopover";

/** Renders the main details for a specific category, 
 * including the category name and building name
 */
class CategoryDetailsContainer extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            contact: null
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.performDelegation = this.performDelegation.bind(this); 
    }
    
    toggleModal() {
    this.setState({ showModal: !this.state.showModal });
    }
    
    isDisabled() {
        let answered = this.props.categoryData.answered;
        let total = this.props.categoryData.total;
        return answered === total;
    }

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
    
    onAssignBuildingClick(c) {
        this.toggleModal()
        this.setState({contact: c})
    }
    
    performDelegation() {
        let { answers, buildingId, addAnswers } = this.props;
        let email = this.state.contact.email;
        let firstName = this.state.contact.firstName;
        let lastName = this.state.contact.lastName;
    
        delegateQuestions(answers, buildingId, email, firstName, lastName, addAnswers, this.toggleModal);
    }
    
    modalText() {
        let questionCount = Object.keys(this.props.answers).length;
      return (questionCount <= 1) ? (<p>You are about to assign <span style={{"font-weight": "600"}}>{questionCount} question</span> to</p>)
        : (<p>You are about to assign <span style={{"font-weight": "600"}}>{questionCount} questions</span> to</p>)
    }
    
    
    contactCard() {
        let c = this.state.contact
        if (c) {
          let email = c.email;
          let firstName = c.firstName;
          let lastName = c.lastName;
      
          return <DelegationContactCard
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  handleClickChangeContact={() => {}}
                  handleClickRemoveContact={() => {}}
                  showHeader={false}
                  showChangeBtn={false}
                  showRemoveContactBtn={false}
          />
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
                    <ReactModal  className="delegation--confirmation--modal"
                                 isOpen={this.state.showModal}>
                        <h2>Confirm Assignment</h2>
                        <h4>{this.modalText()}</h4>
                        {this.contactCard()}
                        <button className="btn btn--primary" onClick={this.performDelegation}>Submit</button>
                        <button className="btn btn--secondary" onClick={this.toggleModal}>Cancel</button>
                    </ReactModal>
                    <DelegationPopover
                            label="Assign Category"
                            onSelectedContact={(c) => {this.onAssignBuildingClick(c)}}
                            disabled={this.isDisabled()}
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
    loginUserData: PropTypes.object,
    categoryData: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
      category: getCategoryById(ownProps.categoryId, state),
      answers: getUnfinishedAnswersForCategoryAndBuilding(ownProps.categoryId, ownProps.buildingId, state)
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
