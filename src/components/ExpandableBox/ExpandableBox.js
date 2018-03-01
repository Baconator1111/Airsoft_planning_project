import React, { Component } from 'react'
// import './ExpandableBox.css'

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
                <button>
                    <div className={this.state.opened ? 'expanded' : 'notExpanded'} onClick={() => this.handleClickedBox()}>
                        {this.props.boxTitle}
                    </div>
                </button>
                {this.state.opened ? this.props.children : null}
            </div>
        )
    }
}