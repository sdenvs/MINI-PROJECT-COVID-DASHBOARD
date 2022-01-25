import {
  XAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const RenderBarChart = props => {
  const {active, data} = props
  let colortype = '#9A0E31'
  if (active === 'Confirmed') {
    colortype = '#9A0E31'
  } else if (active === 'Active') {
    colortype = '#0A4FA0'
  } else if (active === 'Recovered') {
    colortype = '#216837'
  } else if (active === 'Deceased') {
    colortype = '#474C57'
  }

  return (
    <div className={`lineChartStyle ${active}-bg`}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} barSize={25}>
          <XAxis
            dataKey="date"
            stroke={`${colortype}`}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <Tooltip />
          <Legend />
          <Bar
            dataKey={active}
            fill={`${colortype}`}
            className="bar"
            label={{
              position: 'center',
              angle: -90,
              fill: '#fff',
              stroke: '#fff',
            }}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RenderBarChart
