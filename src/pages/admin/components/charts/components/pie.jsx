import React from 'react';
import {
	Chart,
	Interval,
	Tooltip,
	Axis,
	Coordinate,
	Interaction,
	getTheme
} from 'bizcharts';

function Pie(props) {
	const data = [
		{ item: '零食', count: 40, percent: 0.4 },
		{ item: '花卉', count: 21, percent: 0.2 },
		{ item: '家用电器', count: 17, percent: 0.21 },
		{ item: '日常用品', count: 13, percent: 0.19 },
	];

	const cols = {
		percent: {
			formatter: val => {
				val = val * 100 + '%';
				return val;
			},
		},
	};


	return (
		<Chart height={300} data={data} scale={cols} autoFit>
			<Coordinate type="theta" radius={0.75} />
			<Tooltip showTitle={false} />
			<Axis visible={false} />
			<Interval
				position="percent"
				adjust="stack"
				color="item"
				style={{
					lineWidth: 1,
					stroke: '#fff',
				}}
				label={['count', {
					content: (data) => {
						return `${data.item}: ${data.percent * 100}%`;
					},
				}]}
				state={{
					selected: {
						style: (t) => {
							const res = getTheme().geometries.interval.rect.selected.style(t);
							return { ...res, fill: 'red' }
						}
					}
				}}
			/>
			<Interaction type='element-single-selected' />
		</Chart>
	);
}

export default Pie
