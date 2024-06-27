import React from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import './ui/chart.css';

interface ChartProps {
    data: { count: number; date: string }[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
    const formattedData = data.map((item) => ({
        count: item.count,
        date: new Date(item.date).toLocaleString(),
    }));

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border border-gray-200 rounded shadow-lg">
                    <p className="label">{`${label}`}</p>
                    <p className="intro">{`${payload[0].value}`}</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div
            className={`relative h-96 w-5/6 bg-white border-solid border-2 border-gray-200 rounded-lg shadow-lg chart-container ${formattedData.length === 0 ? 'chart-blur' : ''}`}
        >
            {formattedData.length === 0 && (
                <div className="no-results">Aucun résultat trouvé</div>
            )}
            <div className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                        data={formattedData}
                        margin={{ top: 50, right: 30, left: 20, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                        <XAxis
                            dataKey="date"
                            tick={{ fontSize: 12, fill: '#666' }}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: '#666' }}
                            allowDecimals={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="bottom"
                            height={36}
                            formatter={() => 'Nombre de résultats'}
                        />
                        <Line
                            type="monotone"
                            dataKey="count"
                            stroke="#f97316"
                            strokeWidth={2}
                            activeDot={{ r: 8 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default Chart;
