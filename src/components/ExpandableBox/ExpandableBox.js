import React, { Component } from 'react'
import './expandableBox.css'

export default class ExpandableBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            opened: false
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.close) {
            this.setState((prevProp) => {
                return {
                    opened: false
                }
            })
        }
    }

    handleClickedBox() {
        // console.log('clicked box hit')
        this.setState((prevProp) => {
            return {
                opened: !prevProp.opened
            }
        })
    }

    render() {
        // console.log( this.props )
        return (
            <div>
                <button className={ this.props.style } onClick={() => this.handleClickedBox()}>
                    <div className={this.state.opened ? 'expanded' : 'notExpanded'} >
                        {this.props.boxTitle}
                    </div>
                </button>
                {this.state.opened ? this.props.children : null}
            </div>
        )
    }
}