import axios from 'axios';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import './Statistics.css';

const Statistics = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings');
                const groupedData = _.chain(response.data)
                    .groupBy('activity')
                    .map((value, key) => ({
                        name: key,
                        Duration: _.sumBy(value, 'duration')
                    }))
                    .value();
                setData(groupedData);
            } catch (error) {
                console.error('Error fetching training data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <BarChart
    width={800}
    height={400}
    data={data}
    margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 50
    }}
    barSize={40}
>
    <CartesianGrid strokeDasharray="3 3" stroke="#7dc8f6c2"/>
    <XAxis dataKey="name" interval={0} tick={{ angle: -40, textAnchor: 'end' }} height={70} />
    <YAxis />
    <Tooltip formatter={(value, name) => [`${value} mins`, name]} />
    <Legend />
    <Bar dataKey="Duration" fill="#8884d8" className="custom-bar" />
</BarChart>
        </div>
    );
};

export default Statistics;
