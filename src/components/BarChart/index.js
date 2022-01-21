import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
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
  const DataFormater = number => {
    switch (true) {
      case number > 1000000000:
        return `${(number / 1000000000).toString()}B`
      case number > 1000000:
        return `${(number / 1000000).toString()}M`
      case number > 1000:
        return `${(number / 1000).toString()}K`
      default:
        return number.toString()
    }
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
            valueFormatter={DataFormater}
            dataKey={active}
            fill={`${colortype}`}
            className="bar"
            label={{position: 'top', fill: '#fff', stroke: colortype}}
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RenderBarChart
