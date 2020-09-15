import React from 'react';
// import Link from 'react-router-dom/Link';
// import Redirect from 'react-router/Redirect';

export default class FilterLabelList extends React.Component {
    state = {
        redirect: false,
        url: this.props.location.url ? this.props.location.url.toLowercase() : '',
    };
    // eslint-disable-next-line class-methods-use-this
    UNSAFE_componentWillMount() {
        const url = this.props.location.pathname ? this.props.location.pathname.toLowerCase() : undefined;
       
    }
    render() {
        if (this.state.redirect) {
            return (
                <div>
                    {/* // <Redirect to='/' /> */}
                </div>
            );
        }
        return (
            null
        );
    }
}
