import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router';
import { addMsg } from '../../actions/auth.actions';
import tyr from '../../utils/tyr';
import SideNav from '../../components/sidenav';
import * as Views from './views';
import './styles.scss';

class Dashboard extends Component {
  state = {};

  async componentDidMount() {
    const { history } = this.props;
    try {
      await tyr.get('auth/logged_in');
      // const { data } = await tyr.get('plague_doctor/dashboard');
      /* eslint-disable-next-line */
      // this.setState({ data });
    } catch (e) {
      addMsg('ERR', 'Not Authorized', 'Please Login');
      history.push('/login');
    }
  }

  render() {
    const { match } = this.props;
    return (
      <div className="dashboard">
        <SideNav />
        <div className="content-dashboard">
          <Switch>
            <Route exact path={`${match.url}/`} component={Views.Default} />
            <Route
              exact
              path={`${match.url}/course/:cid`}
              component={() => <div>course page</div>}
            />
            <Route
              path={`${match.url}/course/:cid/assignment/:aid`}
              component={() => <div>course assignment page</div>}
            />
            <Route
              path="*"
              component={() => <Redirect to={`${match.url}/`} />}
            />
          </Switch>
        </div>
      </div>
    );
  }
}
export default connect(
  null,
  { addMsg }
)(Dashboard);
