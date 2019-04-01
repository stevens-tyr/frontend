/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Empty } from 'antd';

import Card from 'Components/Card';
import tyr from '../../../utils/tyr';
import './styles.scss';

class Courses extends Component {
  state = {
    fetched: false
  };

  async componentDidMount() {
    this._mounted = true;
    try {
      const { data } = await tyr.get('plague_doctor/dashboard');
      // Prevents state from being updated when component becomes unmounted
      this._mounted && this.setState({ ...data, fetched: true });
    } catch (e) {
      console.error(e);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
  }

  render() {
    const { user, fetched, courses } = this.state;
    if (!fetched) return null; // im lazy
    return (
      <>
        <h1>{user.firstName}'s Courses</h1>
        <div>{JSON.stringify(courses)}</div>
      </>
    );
  }
}

export default Courses;
