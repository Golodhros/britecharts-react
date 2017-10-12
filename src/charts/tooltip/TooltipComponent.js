import React from 'react';
import PropTypes from 'prop-types';
import tooltip from './tooltipChart';


export default class TooltipComponent extends React.Component {

    static PropTypes = {
        children: PropTypes.node.isRequired,

        dateFormat: PropTypes.string,
        dateLabel: PropTypes.string,
        locale: PropTypes.string,
        nameLabel: PropTypes.string,
        shouldShowDateInTitle: PropTypes.bool,
        title: PropTypes.string,
        topicLabel: PropTypes.string,
        valueFormat: PropTypes.string,
        valueLabel: PropTypes.string,
        topicsOrder: PropTypes.arrayOf(PropTypes.string),
    }

    static childContextTypes = {
        customMouseOver: PropTypes.func,
        customMouseMove: PropTypes.func,
        customMouseOut: PropTypes.func,
    }

    static defaultProps = {
        chart: tooltip,
    }

    state = {
        isActive: false,
        x: 0,
        y: 0,
        dataPoint: {},
        topicColorMap: {}
    }

    getChildContext() {
        return {
            customMouseMove: this._handleMouseMove.bind(this),
            customMouseOut: this._handleMouseOut.bind(this),
            customMouseOver: this._handleMouseOver.bind(this),
        };
    }

    componentDidMount() {
        let tooltipContainer = this._rootNode.querySelector('.metadata-group .vertical-marker-container');

        this.props.chart.create(tooltipContainer, this._getChartConfiguration());
    }

    componentDidUpdate() {
        let tooltipContainer = this._rootNode.querySelector('.metadata-group .vertical-marker-container');

        this.props.chart.update(tooltipContainer, this._getChartConfiguration(), this.state);
    }

    componentWillUnmount() {
        this.props.chart.destroy(this._rootNode);
    }

    /**
     * We want to remove the chart and data from the props in order to have a configuration object
     * @return {Object} Configuration object for the chart
     */
    _getChartConfiguration() {
        let configuration = {...this.props};

        delete configuration.data;
        delete configuration.chart;
        delete configuration.children;

        return configuration;
    }

    _handleMouseMove(dataPoint, topicColorMap, x, y) {
        // Update Tooltip State
        this.setState((state) => ({
            ...state,
            dataPoint,
            isActive: false,
            topicColorMap,
            x,
            y,
        }));

        if (this.props.children.props.customMouseMove) {
            this.props.children.props.customMouseMove(dataPoint, topicColorMap, x, y);
        }
    }

    _handleMouseOut() {
        // Update Tooltip State
        this.setState((state) => ({...state, isActive: false}));

        if (this.props.children.props.customMouseOut) {
            this.props.children.props.customMouseOut();
        }
    }

    _handleMouseOver() {
        // Update Tooltip State
        this.setState((state) => ({...state, isActive: true}));

        if (this.props.children.props.customMouseOver) {
            this.props.children.props.customMouseOver();
        }
    }

    _setRef(componentNode) {
        if (componentNode) {
            this._rootNode = componentNode;
        }
    }

    render() {
        return (
            <div className="tooltip-chart-wrapper" ref={this._setRef.bind(this)} >
                {this.props.children}
            </div>
        );
    }

}
