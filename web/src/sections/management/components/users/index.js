/**
 * Created by PengLing on 2019/09/11. 
 */
'use strict';

import React, { Component } from 'react';
import Users from './Users.jsx';

class UsersForm extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      
        return (
            <div className='pageSection'>
                <Users toAddPath={this.props.toAddPath} toDelPath={this.props.toDelPath} count={this.props.count}>
                </Users>
            </div>
        );
    }
}

export default UsersForm;
