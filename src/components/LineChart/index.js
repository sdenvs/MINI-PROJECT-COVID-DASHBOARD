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

const RenderLineChart = props => {
  const {dateData, name} = props
  let colortype = '#9A0E31'
  if (name === 'Confirmed') {
    colortype = '#9A0E31'
  } else if (name === 'Active') {
    colortype = '#0A4FA0'
  } else if (name === 'Recovered') {
    colortype = '#216837'
  } else if (name === 'Deceased') {
    colortype = '#474C57'
  } else if (name === 'Tested') {
    colortype = '#9673B9'
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
    <div className={`lineChartStyle ${name}-bg`}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart width={800} height={500} data={dateData}>
          <XAxis
            interval={20}
            dataKey="date"
            stroke={colortype}
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              textTransform: 'uppercase',
            }}
            dy={10}
          />
          <YAxis
            tickFormatter={DataFormater}
            stroke={colortype}
            tickCount={4}
          />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey={name} stroke={colortype} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default RenderLineChart
