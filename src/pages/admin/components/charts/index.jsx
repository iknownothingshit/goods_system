import React, { useState } from 'react'
import { Select } from 'antd'

import Pie from './components/pie'
import Histogram from './components/histogram'
import './index.less'

function Charts() {
    const { Option } = Select;

    const [curChart, setCurChart] = useState(1)

    const handleChange = (e) => {
        setCurChart(e);
    }

    return (
        <div className="charts">
            <section className="select">
                <Select style={{ width: '30%' }} defaultValue='1' onChange={handleChange}>
                    <Option value='1'>饼状图</Option>
                    <Option value='2'>条形图</Option>
                </Select>
            </section>
            <section className="charts-section">
                <p className="title">月销售量占比</p>
                {curChart == 1 ? <Pie /> : <Histogram />}
            </section>
        </div>
    );
}

export default Charts
