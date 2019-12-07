import React, { Component } from 'react';

export class AlertBox extends Component {
    render() {
        return (
            <div>
                {this.props.msg !== '' &&
                    <p id="alert" role="alert">{this.props.msg}</p>
                }
            </div>
        );
    }
}