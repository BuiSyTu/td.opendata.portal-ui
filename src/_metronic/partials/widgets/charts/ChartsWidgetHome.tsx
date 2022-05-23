/* eslint-disable jsx-a11y/anchor-is-valid */
import Highcharts, {Series} from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import React, {useEffect, useState} from 'react'
import {requestPOST, requestGET} from '../../../../../src/helpers/baseAPI'
import {CONFIG} from '../../../../helpers/config'
import {useHistory} from 'react-router-dom'

type Props = {
  className: string
  hightChat: string
}

const ChartsWidgetHome: React.FC<Props> = ({className, hightChat}) => {
  const history = useHistory()
  const [option, setOption] = useState({
    DaXuLy: 0,
    DangXuLy: 0,
    QuaHan: 0,
  })
  let dt = new Array()
  useEffect(() => {
    const fetchData = async () => {
      var body = {
        token:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2NDE0NTk0NjIsImV4cCI6MTY0MjM0ODY2Miwic3ViIjoiZGVtbzEiLCJoYXNocHdkIjoiVzJPZ2xzb3VDL0I5QVAyM0NIaEtoQT09IiwiY29udGV4dCI6eyJ1c2VyIjp7InVzZXJOYW1lIjoiZGVtbzEiLCJkaXNwbGF5TmFtZSI6ImRlbW8xIiwib3JnYW5pemF0aW9uSWQiOiIifX19.KUrKbbHwriqRe5m9j0k6o05exeZnxoZzgqJD1pYKK74',
      }
      let res = await requestPOST(CONFIG.PAHT_PATH + '/ThongKeXuLy', body)
      let data = res?.data ?? []
      setOption(data)
    }
    fetchData()
  }, [])
  dt = [
    {
      name: 'Đã xử lý',
      y: option?.DaXuLy,
      color: '#66BB6A',
    },
    {
      name: 'Đang xử lý',
      y: option?.DangXuLy,
      color: '#19AADE',
    },
    {
      name: 'Quá hạn',
      y: option?.QuaHan,
      color: '#EE9A3A',
    },
  ]
  var options = {
    chart: {
      type: 'pie',
      renderTo: 'container',
    },
    title: {
      text: '',
    },
    plotOptions: {
      pie: {
        innerSize: '50%',
        dataLabels: {
          enabled: true,
          format: '{point.percentage:.1f} %',
          distance: -30,
        },
        showInLegend: true,
      },
    },
    legend: {
      useHTML: true,
      align: 'center',
      y: 0,
      x: 0,
      padding: 0,
      margin: 0,
      itemStyle: {"fontSize": "13px", "fontWeight": "normal", "fontFamily": "arial"}
    },
    series: [
      {
        name: 'Hồ sơ',
        states: {
          inactive: {
            opacity: 1,
          },
          select: {
            opacity: 0.5,
          },
        },
        data: dt,
      },
    ],
    credits: {
      enabled: false,
    },
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header px-3'>
        <h3 className='card-title align-items-start flex-column'>
          <span
            onClick={() => {
              history.push('/thong-ke')
            }}
            className='card-label fw-bold fs-lg-5 fs-6 m-0'
          >
            Thống kê xử lý
          </span>
        </h3>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body card-body-chart p-0'>
        {/* begin::Chart */}
        <HighchartsReact containerProps={{ style: { height: "100%" } }} highcharts={Highcharts} options={options} />
        {/* <div ref={chartRef} id='kt_charts_widget_2_chart' style={{ height: '350px' }}></div> */}
        {/* end::Chart */}
        {/* <div id='customLegend'></div> */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export {ChartsWidgetHome}
