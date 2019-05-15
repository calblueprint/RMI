import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import ReactModal from "react-modal";
import PropTypes from "prop-types";

import { addAnswers } from "../actions/answers";

import { percentAnswered } from "../selectors/answersSelector";
import { getNameByBuildingId } from "../selectors/buildingsSelector";

import DelegationContactCard from "../components/DelegationContactCard";
import DelegationPopover from "../components/DelegationPopover";
import CategoryContainer from "./CategoryContainer";
import { getUnfinishedAnswersForBuilding } from "../selectors/answersSelector";

import { delegateQuestions } from "../utils/DelegationRequests";

import FAIcon from "../components/FAIcon";
import linkIcon from "@fortawesome/fontawesome-free-solid/faExternalLinkAlt";

/** Renders the main information for the building, including the name and
 * the table containing the status of each category */
class PortfolioBuildingInfoContainer extends React.Component {
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
    return this.props.buildingStatus === 1;
  }

  getStatusForBuilding() {
    if (this.props.buildingStatus == 1) {
      return "Completed";
    } else if (this.props.buildingStatus == 0) {
      return "Not Started";
    }
    return "In Progress";
  }

  getDotStatusForBuilding() {
    if (this.props.buildingStatus == 1) {
      return "green";
    } else if (this.props.buildingStatus > 0) {
      return "yellow";
    }
  }

  mapCategorytoContainer() {
    let categoriesData = this.props.categoriesData;
    let pId = this.props.portfolioId;
    return Object.keys(categoriesData).map(id => {
      return (
        <CategoryContainer
          portfolioId={pId}
          categoryId={id}
          categoryData={categoriesData[id]}
          key={id}
        />
      );
    });
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
    let buildingId = this.props.buildingId;

    return (
      <div className="building__details" key={this.props.buildingId}>
        <div className="building_info">
          <div>
            <span className="small_header">BUILDING</span>
            <h2>
              <Link to={`/buildings/${this.props.buildingId}/`}>
                {this.props.name + " "}
                <FAIcon
                  iconObj={linkIcon}
                  style={{ position: "relative", top: "-3px" }}
                />
              </Link>
            </h2>
            <span className={"dot " + this.getDotStatusForBuilding()} />
            {this.getStatusForBuilding()}
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <ReactModal className="delegation--confirmation--modal modal"
                        isOpen={this.state.showModal}>
              <h2>Confirm Assignment</h2>
              <h4>{this.modalText()}</h4>
              {this.contactCard()}
              <button className="btn btn--primary" onClick={this.performDelegation}>Submit</button>
              <button className="btn btn--secondary" onClick={this.toggleModal}>Cancel</button>
            </ReactModal>
            <DelegationPopover
                  label="Assign Building"
                  onSelectedContact={(c) => {this.onAssignBuildingClick(c)}}
                  disabled={this.isDisabled()}
            />
            <button
              style={{ marginLeft: "10px" }}
              className="btn btn--neutral"
              href={`download/${buildingId}`}
            >
              Export CSV
            </button>
          </div>
        </div>
        <br />
        <table className="portfolio_category_info">
          <thead>
            <tr className="cat_names">
              <th className="small_header">QUESTIONS</th>
              <th className="small_header">STATUS</th>
              <th className="small_header">PEOPLE ASSIGNED</th>
            </tr>
          </thead>
          <tbody>{this.mapCategorytoContainer()}</tbody>
        </table>
      </div>
    );
  }
}

PortfolioBuildingInfoContainer.propTypes = {
  portfolioId: PropTypes.string.isRequired,
  buildingId: PropTypes.number.isRequired,
  categoriesData: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    name: getNameByBuildingId(ownProps.buildingId, state),
    buildingStatus: percentAnswered(ownProps.buildingId, state),
    answers: getUnfinishedAnswersForBuilding(ownProps.buildingId, state),
    delegateQuestions: (userDetails, addAnswers) =>
      delegateBuildingQuestions(
        ownProps.buildingId,
        userDetails,
        state,
        addAnswers
      )
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
)(PortfolioBuildingInfoContainer);
