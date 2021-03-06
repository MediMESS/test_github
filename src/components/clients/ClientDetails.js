import React, { Component } from "react";
import { Link } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import Clients from "./Clients";
import { PropTypes } from "prop-types";
import classnames from "classnames";

class ClientDetails extends Component {
  render() {
    const { client } = this.props;
    if (client) {
      return (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/" className="btn-link btn">
                <i className="fas fa-arrow-circle-left"></i> Back To Dashboard
              </Link>
            </div>
            <div className="col-md-6">
              <div className="btn-group float-right">
                <Link className="btn btn-dark" to={`/client/edit/${client.id}`}>
                  Edit
                </Link>
                <button className="btn btn-danger">Delete</button>
              </div>
            </div>
          </div>

          <hr />

          <div className="card">
            <h3 className="card-header">
              {client.firstName} {client.lastName}
            </h3>
            <div  ="card-body">
              <div className="row">
                <div className="col col-md-8 col-sm-6">
                  <h4>
                    Client ID:
                    <span className="text-secondary">{client.id}</span>
                  </h4>
                </div>
                <div className="col  col-md-4 col-sm-6">
                  <h3 className="pull-right">
                    Balance:{" "}
                    <span
                      className={classnames({
                        "text-danger": client.balance > 0,
                        "text-success": client.balance === 0,
                      })}
                    >
                      ${parseFloat(client.balance).toFixed(2)}
                    </span>
                  </h3>
                </div>
              </div>

              <hr />
              <ul className="list-group"></ul>
              <li className="list-group-item">Contact Email: {client.email}</li>
              <li className="list-group-item">Contact Phone: {client.phone}</li>
            </div>
          </div>
        </div>
      );
    } else return <Spinner />;
  }
}

Clients.propTypes = {
  firestore: PropTypes.object.isRequired,
};
export default compose(
  firestoreConnect((props) => [
    { collection: "clients", storeAs: "client", doc: props.match.params.id },
  ]),
  connect((state, props) => ({
    client: state.firestore.ordered.client && state.firestore.ordered.client[0],
  }))
)(ClientDetails);
