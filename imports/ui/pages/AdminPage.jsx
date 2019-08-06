import React from 'react';
import { Route } from 'react-router';
import { withTracker } from 'meteor/react-meteor-data';

import User from '/imports/api/users/User';
import callWithPromise from '/imports/util/callWithPromise';

import PageBase from '../components/PageBase';
import AdminTab from '../components/admin/AdminTab';
import Loading from '../components/Loading';
import RejectDialog from '../components/admin/RejectDialog';
import { Provider } from "../helpers/Context";


import Grid from '@material-ui/core/Grid';

class AdminPage extends React.Component {

  state = {
    rejectDialogOpen: false,
    notice: ''
  };

  handleApprove = ids => {
    console.log('selected IDs are:', ids)

    ids.forEach( id => {
      const paras = {
        dataSet_id: id,
        approve: true
      } 
  
    callWithPromise('dataSet.approve', paras)
      .then(id => console.log(id))
      .then(() => {})

    callWithPromise('history.create', paras)
    .then(id => console.log(id))
    .then(() => {})
    });
    
  };

  handleReject= (ids) => {
    ids.forEach( id => {
      const paras = {
        dataSet_id: id,
        approve: false
      } 

      const dataSetId = id;
  
    callWithPromise('dataSet.approve', paras)
      .then(id => console.log(id))
      .then(() => {})
    })

    callWithPromise('dataSet.search', dataSetId)
    .then(response =>{
      callWithPromise('history.create', response)
    })
    .then(() => {})
  };



/******************************** Event handlers for reject dialog   *******************************/
  
  handleRejectDialogClose = () => {
    this.setState({ rejectDialogOpen: false})
  };

  handleSendRejection = reason => {
    this.setState({ rejectDialogOpen: false, notice: reason})
  };
  
  handleNoticeChange = event => {
    this.setState({ notice: event.target.value})
  };


/********************************************************************************/  

  render() {
    const { users, showRemoved, dataSet, requestArray, loading, requestHistory,  ...props } = this.props;
    const { rejectDialogOpen, notice } = this.state;


    if (loading) {
      return <PageBase {...props}><Loading /></PageBase>;
    }

    return (
      <PageBase {...props}>
        <Provider value={this.state.notice}>
        <Grid container justify="center">
          <Grid item xs={12}>
            <AdminTab 
              requestHistory={requestHistory}
              requestArray={requestArray}
              onApprove={this.handleApprove} 
              onReject={this.handleReject}
            />
            <RejectDialog
              open={rejectDialogOpen} 
              notice={notice}
              onClose={this.handleRejectDialogClose}
              onSend={this.handleSendRejection}
              onNoticeChange={this.handleNoticeChange}
            />
          </Grid>
        </Grid>
        </Provider>
      </PageBase>
    );
  }
}

export default withTracker(() => {
  const usersHandle = Meteor.subscribe('users.all', { includeDeleted: true });

  return {
    loading: !(usersHandle.ready()),
    users: User.find({}, {
      disableEvents: true
    }).fetch(),
  };
})(AdminPage);
