import React, { Component } from 'react';
import { Button, Icon } from 'antd';
import tyr from 'Utils/tyr';
import Card from 'Components/Card/Card';

import StudentAssignment from './Assignment/StudentAssignment';
import ProfessorAssignment from './Assignment/ProfessorAssignment';

class AssignmentInfo extends Component {
  state = {
    fetched: false,
    assignment: null
  };

  async componentDidMount() {
    await this.fetchInfo();
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  fetchInfo = async () => {
    const { cid, aid } = this.props.match.params;
    this._mounted = true;
    try {
      const {
        data: { assignment }
      } = await tyr.get(
        `plague_doctor/course/${cid}/assignment/${aid}/details`
      );
      // Prevents state from being updated when component becomes unmounted
      // eslint-disable-next-line no-unused-expressions
      this._mounted && this.setState({ assignment, fetched: true });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

  render() {
    const { fetched, assignment } = this.state;
    const {
      history,
      match: {
        params: { cid }
      }
    } = this.props;

    if (!fetched) return null;
    return (
      <>
        <Button
          type="default"
          style={{ marginLeft: '1rem' }}
          onClick={() => history.push(`/dashboard/course/${cid}`)}
        >
          <Icon type="left" />Back to Course
        </Button>
        <Card>
          {typeof assignment.studentSubmissions !== 'undefined' ? (
            <ProfessorAssignment
              assignment={assignment}
              updateParent={this.fetchInfo}
            />
          ) : (
            <StudentAssignment
              assignment={assignment}
              updateParent={this.fetchInfo}
            />
          )}
        </Card>
      </>
    );
  }
}

export default AssignmentInfo;
