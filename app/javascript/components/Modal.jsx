import React from "react";
import ReactModal from "react-modal";

import FAIcon from "../components/FAIcon";
import downArrow from "@fortawesome/fontawesome-free-solid/faChevronDown";
import { states } from "../constants/states.js";
class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<ReactModal className="modal building-modal" isOpen={this.props.showModal}>
				<form onSubmit={this.props.createBuilding}>
				<h2>Add Building</h2>
					<label>
						<h4>Building Name</h4>
						<input className="input__range" type="text" name="name" />
					</label>
					<br />
					<label>
						<h4>Address</h4>
						<input type="text" name="address" />
					</label>
					<br />
					<label>
						<h4>City</h4>
						<input type="text" name="city" />
					</label>
					<br />
					<h4>Building Type</h4>
					<label>
						<div className="select-wrapper">
						<select id="building" className="dropdown">
							{Object.keys(this.props.building_types).map(building_type => {
								return (
									<option type="text" value={building_type}>
										{this.props.building_types[building_type].name}
									</option>
								);
							})}
						</select>
						<FAIcon
						className="down-arrow"
						iconObj={downArrow}
						style={{ position: "relative", top: "2px"}}
						/>
						</div>
					</label>
				</form>

				<div>{this.props.errors}</div>
				<input type="submit" value="Submit" className="btn btn--primary" onClick={this.props.toggleModal}/>
						{/*TODO: Change so the input doesn't close until the form is submitted + doesn't exit if not submitted*/}
				<button className="btn btn--secondary" onClick={this.props.toggleModal}>Cancel</button>
			</ReactModal>
		);
	}
}

export default Modal;
