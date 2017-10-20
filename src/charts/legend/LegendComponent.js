import React from 'react';
import PropTypes from 'prop-types';
import LegendChart from './LegendChart';


export default class Legend extends React.Component {

    static defaultProps = {
        chart: LegendChart,
    }

    static propTypes = {
        /**
         * Gets or Sets the colorSchema of the chart
         */
        colorSchema: PropTypes.arrayOf(PropTypes.string),
        /**
         * Gets or Sets the height of the legend chart
         */
        height: PropTypes.number,
        /**
         * Highlights a line entry by fading the rest of lines
         */
        highlight: PropTypes.number,
        /**
         * Gets or Sets the horizontal mode on the legend
         */
        isHorizontal: PropTypes.bool,
        /**
         * Gets or Sets the margin of the legend chart
         */
        margin: PropTypes.object,
        /**
         * Gets or Sets the markerSize of the legend chart. This markerSize will determine 
         * the horizontal and vertical size of the colored marks added as color 
         * identifiers for the chart's categories.
         */
        markerSize: PropTypes.number,
        /**
         * Gets or Sets the number format of the legend chart
         */
        numberFormat: PropTypes.string,
        /**
         * Gets or Sets the width of the chart
         */
        width: PropTypes.number,
        /**
         * The data to be used by the chart
         */
        data: PropTypes.array.isRequired,
        /**
         * Internally used, do not overwrite.
         */
        chart: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);

        // We want to make this throw an error if no data is provided
        if (!props.data) {
            throw new Error('Data is required!');
        }
    }

    componentDidMount() {
        this.props.chart.create(this._rootNode, this.props.data, this._getChartConfiguration());
    }

    componentDidUpdate() {
        this.props.chart.update(this._rootNode, this.props.data, this._getChartConfiguration());
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

        return configuration;
    }

    _setRef(componentNode) {
        if (componentNode) {
            this._rootNode = componentNode;
        }
    }

    render() {
        return (
            <div className="legend-container" ref={this._setRef.bind(this)} />
        );
    }
}
