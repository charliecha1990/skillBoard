import { withMessageContext } from "/imports/ui/helpers/MessageContext";
import SearchPage from "/imports/ui/pages/SearchPage";
import { Meteor } from "meteor/meteor";
import { withTracker } from "meteor/react-meteor-data";
import DataSet from "/imports/api/dataSet/DataSet";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import { generateFields } from "/imports/util/getDatabaseFields";
import User from "/imports/api/users/User";
import callWithPromise from "../../util/callWithPromise";


let frontendSkills = generateFields("frontend");
let backendSkills = generateFields("backend");
let dataSkills = generateFields("data");



export default compose(
  withRouter,
  withTracker(() => {
    let found = false;
    const dataSetsHandle = Meteor.subscribe("dataSets");
    Meteor.subscribe("users");
    let dataSet = DataSet.find(
      { userId: Meteor.userId() }
    ).fetch();

    // if(dataSet.length===0){
    //   dataSet = createEmptyObject();
    // }
    // let dataSets = DataSet.find({}).fetch();
    if (dataSet.length > 0) {
      dataSet = dataSet[0];
      let user = User.findOne({ _id: dataSet.userId });
      dataSet["name"] = user.profile.firstName + " " + user.profile.lastName;
      found = true;
    }
    return {
      dataSet,
      found,
      connected: Meteor.status().connected,
      loading: !dataSetsHandle.ready(),
      frontendSkills,
      backendSkills,
      dataSkills
    };
  }),
  withMessageContext
)(SearchPage);
