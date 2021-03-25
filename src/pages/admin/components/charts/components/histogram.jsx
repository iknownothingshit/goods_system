import React from 'react';
import {
    Chart,
    Interval,
    Tooltip,
    Axis,
    Point
} from 'bizcharts';

const data = [
    { count: '家用电器', sales: 38 },
    { count: '日常用品', sales: 52 },
    { count: '零食', sales: 61 },
    { count: '花卉', sales: 45 },
];


function Histogram() {
    return <Chart height={300} autoFit data={data} >
        <Interval position="count*sales" />
    </Chart>
}

export default Histogram
