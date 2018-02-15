import React, { Component } from 'react'
// import './ExpandableBox.css'

export default class ExpandableBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            opened: false
        }
    }

    handleClickedBox() {
        this.setState((prevState) => {
            return {
                opened: !prevState.opened
            }
        })
    }

    render() {
        return (
            <div>
                <div className={this.state.opened ? 'expanded' : 'notExpanded'} onClick={() => this.handleClickedBox()}>
                    {this.props.boxTitle}
                </div>
                {this.state.opened ? this.props.children : null}
            </div>
        )
    }
}