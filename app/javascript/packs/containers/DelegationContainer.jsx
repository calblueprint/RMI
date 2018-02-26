import React from 'react';

class DelegationContainer extends React.Component {

  handleSelect(value) {

  }

  handleChangeEmail(value) {

  }

  handleChangeFirstName(value) {

  }

  handleChangeLastName(value) {

  }

  render() {
    const currentEmail = this.props.email;
    const currentFirstName = this.props.firstName;
    const currentLastName = this.props.lastName;

    return (
    <div>
      Assign to other users:<br></br>

      Email:<br></br>
      <input type="text" value={currentEmail}
        onChange={(e) => this.handleChangeEmail(e.target.value)}
      />

      <select onChange={(e) => this.handleSelect([e.target.value])}
              defaultValue={currentEmail}>
        {Object.values(this.props.contacts).map((contact) => {
          return (<option value={contact.email} key={contact.email}>
              {contact.first_name + contact.last_name}</option>)
        })}
      </select>

      First name:<br></br>
      <input type="text" value={currentFirstName}
        onChange={(e) => this.handleChangeFirstName(e.target.value)}
      />

      Last name:<br></br>
      <input type="text" value={currentLastName}
        onChange={(e) => this.handleChangeLastName(e.target.value)}
      />
    </div>)
  }
}

export default DelegationContainer;
