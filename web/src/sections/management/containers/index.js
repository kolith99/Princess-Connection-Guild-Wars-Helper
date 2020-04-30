/**
 * Created by GuanFei on 2019/11/13. 
 */
'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { increment, decrement} from '../actions/counter';

import UsersForm from '../components/users'

class User extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        
      }
    render() {

        const { dispatch } = this.props;
        function toAddPath(id){
              dispatch(increment(id))
        } 
        function toDelPath(id){
            dispatch(decrement(id))
        }

        return (
            <UsersForm toAddPath={toAddPath} toDelPath={toDelPath} count={this.props.counter.counter.count}>
            </UsersForm>
        );
    }
}

function mapStateToProps(state) {
    return {
        counter: state
    };
}

export default connect(mapStateToProps)(User);

