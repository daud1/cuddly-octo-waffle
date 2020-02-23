import React, { Component } from 'react';
import { connect } from "react-redux";
import $ from "jquery";
import ACTIONS from "../redux/action";
import Select from "react-select";

class LocationSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            location: null,
        };
    }

    componentDidMount() {
        var typingTimer;
        var doneTypingInterval = 5000;
        var $input = $("#react-select-6-input");

        const { handleGoogleLocationAutocompleteChange } = this.props;
        $input.on("keyup", function () {
            const { value } = this;
            console.log('KEY UP');
            clearTimeout(typingTimer);
            typingTimer = setTimeout(handleGoogleLocationAutocompleteChange(value), doneTypingInterval);
        });

        $input.on("keydown", function () {
            console.log('KEY DOWN');
            clearTimeout(typingTimer);
        });
    }

    handleSelect = location => {
        this.setState({ location });
    }

    render() {
        const { location } = this.state;
        const { styles, options } = this.props
        return (
            <Select
                styles={styles}
                value={location}
                onChange={this.handleSelect}
                options={options}
                placeholder="Search for location..."
            />
        );
    }
}

const mapStateToProps = state => ({
    user: state.user
});

const mapDispatchToProps = dispatch => ({
    removeUser: () => dispatch(ACTIONS.removeUser()),
    setLoading: loading => dispatch(ACTIONS.setLoading(loading)),
    setNotification: notification => dispatch(ACTIONS.setNotification(notification))
});

export default connect(mapStateToProps, mapDispatchToProps)(LocationSelector);
