import React from "react";
import ReactModal from "react-modal";

class Modal extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const states = [
			"Alabama",
			"Alaska",
			"Arizona",
			"Arkansas",
			"California",
			"Colorado",
			"Connecticut",
			"Delaware",
			"Florida",
			"Georgia",
			"Hawaii",
			"Idaho",
			"Illinois",
			"Indiana",
			"Iowa",
			"Kansas",
			"Kentucky",
			"Louisiana",
			"Maine",
			"Maryland",
			"Massachusetts",
			"Michigan",
			"Minnesota",
			"Mississippi",
			"Missouri",
			"Montana",
			"Nebraska",
			"Nevada",
			"New_Hampshire",
			"New_Jersey",
			"New_Mexico",
			"New_York",
			"North_Carolina",
			"North_Dakota",
			"Ohio",
			"Oklahoma",
			"Oregon",
			"Pennsylvania",
			"Rhode_Island",
			"South_Carolina",
			"South_Dakota",
			"Tennessee",
			"Texas",
			"Utah",
			"Vermont",
			"Virginia",
			"Washington",
			"West_Virginia",
			"Wisconsin",
			"Wyoming",
			"District_of_Columbia",
			"Puerto_Rico",
			"Guamto",
			"American_Samoa",
			"Virgin_Islands",
			"Northern_Mariana_Islands"
		];
		return (
			<ReactModal isOpen={this.props.showModal}>
				<form onSubmit={this.props.createBuilding}>
					<label>
						Building Name
						<input type="text" name="name" />
					</label>
					<br />
					<label>
						Email Add;ress
						<input type="text" name="email" />
					</label>
					<br />
					<label>
						First Name
						<input type="text" name="first" />
					</label>
					<br />
					<label>
						Last Name
						<input type="text" name="last" />
					</label>
					<br />
					<label>
						Address
						<input type="text" name="address" />
					</label>
					<br />
					<label>
						City
						<input type="text" name="city" />
					</label>
					<br />
					<label>
						State
						<select>
							{states.map(state => {
								return (
									<option type="text" id="state" value={state}>
										{state}
									</option>
								);
							})}
						</select>
					</label>
					<br />
					<label>
						ZIP Code
						<input type="number" name="zip" />
					</label>
					<br />
					Building Type
					<label>
						<select>
							{Object.keys(this.props.building_types).map(building_type => {
								return (
									<option type="text" id="building" value={building_type}>
										{this.props.building_types[building_type].name}
									</option>
								);
							})}
						</select>
					</label>
					<input type="submit" value="Submit" />
				</form>

				<div>{this.props.errors}</div>
				<button onClick={this.props.toggleModal}>Close Modal</button>
			</ReactModal>
		);
	}
}

export default Modal;
