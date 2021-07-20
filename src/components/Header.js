import React, {Component} from 'react'
import PropTypes from 'prop-types'


class Header extends Component {
    static propTypes = {
        appLabel: PropTypes.string.isRequired
    }

    render() {
        const { appLabel } = this.props
        return (
            <div className='app-title'>
                <h1>{appLabel}</h1>
            </div>
        )
    }
}

export default Header