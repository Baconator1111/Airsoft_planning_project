import React, { Component } from 'react'
// import './ExpandableBox.css'

export default class ExpandableBox extends Component {
    constructor(props) {
        super(props)

        this.state = {
            opened: false
        }
    }

    componentDidMount() {
        if( this.props.close ){
            this.handleClickedBox()
        }
    }

    handleClickedBox() {
        this.setState({ opened: !this.state.opened })
    }

    render() {
        if( this.props.close ){
            this.setState({ opened: false })
        }
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