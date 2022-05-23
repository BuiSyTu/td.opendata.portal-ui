import './Chart.scss'

/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react'

import { CONFIG } from '../../../helpers/config'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { Spin } from 'antd';
import { requestPOST } from '../../../helpers/baseAPI'

const StatisticalPage = () => {
  const [options, setOptions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      var body = {
      }
      let res = await requestPOST(`${CONFIG.PAHT_PATH}/ThongKeXuLy`, body)
      var _res = res?.data ?? null;
      var _data = [];
      if (res) {
        _data.push({ name: 'Đã xử lý', y: _res.DaXuLy, color: '#66BB6A' });
        _data.push({ name: 'Đang xử lý', y: _res.DangXuLy, color: '#19AADE' });
        _data.push({ name: 'Quá hạn', y: _res.QuaHan, color: '#EE9A3A' });
      }

      var option = {
        chart: {
          type: 'pie',
          renderTo: 'container',
        },
        title: {
          text: 'Biểu đồ thống kê xử lý',
        },
        plotOptions: {
          pie: {
            //innerSize: '50%',
            dataLabels: {
              enabled: true,
              format: '{point.percentage:.1f} %',
              distance: -50,
            },
            showInLegend: true,
          },
        },

        series: [
          {
            name: 'Phản ánh',
            states: {
              inactive: {
                opacity: 1,
              },
              select: {
                opacity: 0.5,
              },
            },

            data: _data,
          },
        ],
        credits: {
          enabled: false,
        },
      };
      setOptions(option);
      setIsLoading(false)
    }

    try {
      fetchData()
    } catch (error) { }
    return () => {
    }
  }, [])

  return <div className='col-xl-12'>
    {isLoading ? (
      <div className='d-flex justify-content-center align-items-center h-100'>
        <Spin size='large' />
      </div>
    ) : (
      <div className='card border shadown-sm p-lg-1'>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

    )}
  </div>
}

const StatisticalCatergory = () => {
  const [options, setOptions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const color = ["#ffe033", "#54acff", "#ff8b1f", "#d42013", "#3cd615", "#2f15d9"]
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      var body = {
        "code": "linh-vuc"
      }
      let res = await requestPOST(`${CONFIG.PAHT_PATH}/ThongKeXuLy`, body)
      var _res = res?.data?.linhVuc ?? null;
      var _data = [];
      if (_res) {
        for (var i = 0; i < _res.length; i++)
          _data.push({ name: _res[i].TenLinhVuc, y: _res[i].SoLuongPhanAnh, color: color[i], drilldown: _res[i].TenLinhVuc });
      }
      var option = {
        chart: {
          type: 'column',
          renderTo: 'container',
        },
        title: {
          text: 'Biểu đồ thống kê PAKN theo lĩnh vực',
        },
        tooltip: {
          // headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
          pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.0f}</b><br/>'
        },
        xAxis: {
          type: 'category'
        },
        yAxis: {
          title: {
            text: 'Số lượng phản ảnh kiến nghị'
          }
        },
        legend: {
          enabled: false
        },
        plotOptions: {
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.0f}'
            }
          }
        },
        series: [
          {
            data: _data,
          },
        ],
        credits: {
          enabled: false,
        },
      };
      setOptions(option);
      setIsLoading(false)
    }

    try {
      fetchData()
    } catch (error) { }
    return () => {
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div className='col-xl-12'>
    {isLoading ? (
      <div className='d-flex justify-content-center align-items-center h-100'>
        <Spin size='large' />
      </div>
    ) : (
      <div className='card border shadown-sm mt-4 p-lg-2'>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

    )}
  </div>
}

const StatisticalUnit = () => {
  const [options, setOptions] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const color = ["#d42013", "#3cd615", "#2f15d9", "#ffe033", "#54acff", "#ff8b1f"]
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      var body = {
        "code": "don-vi"
      }
      let res = await requestPOST(`${CONFIG.PAHT_PATH}/ThongKeXuLy`, body)
      var _res = res?.data?.donVi ?? null;
      var _data = [];
      var _sum = 0;
      if (_res) {
        for (var i = 0; i < _res.length; i++)
        if(_res[i].SoLuongPhanAnh > 0) {
          _sum+= _res[i].SoLuongPhanAnh;
          _data.push({ name: _res[i].TenDonVi, y: _res[i].SoLuongPhanAnh, color: color[i] })
        }
      }

      var isBig = window.innerWidth > 1199;

      var legendBig = {
          align: 'right',
          verticalAlign: 'bottom',
          layout: 'vertical',
          useHTML: true,
          y: 0,
          x: 0,
          padding: 10,
          margin: 0,
          itemWidth: 230,
          maxHeight: 280,
          labelFormat: '<span>{name}</span>: <b class="fw-bolder ms-auto fs-3" style="color: {color}">{y}</b><br/>',
          itemStyle: {"fontSize": "13px", "fontWeight": "normal", "fontFamily": "arial", "lineHeight": "23px"}
      };

      var legendSmall = {
          align: 'left',
          verticalAlign: 'bottom',
          layout: 'horizontal',
          useHTML: true,
          y: 0,
          x: 0,
          padding: 0,
          margin: 0,
          labelFormat: '<span>{name}</span>: <b class="fw-bolder ms-auto">{y}</b><br/>',
          itemStyle: {"fontSize": "13px", "fontWeight": "normal", "fontFamily": "arial"}
      }
      var subtitle = {
        text: `<span style="font-size: 15px; font-weight: 500">Tổng số phản ánh:</span> ${_sum}`,
        style: {
          color: '#666',
          fontWeight: 'bold',
          fontFamily: 'arial',
          fontSize: '2.5rem',
          borderBottom: '1px solid'
        },
        useHTML: true,
        verticalAlign: 'top',
        align: 'right',
        y: 80,
        x: -20
      }
      var option = {
        chart: {
          type: 'pie',
          renderTo: 'container',
        },
        title: {
          text: 'Biểu đồ thống kê PAKN theo đơn vị',
        },
        tooltip: {
          pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              enabled: false
            },
            showInLegend: true
          },
          series: {
            borderWidth: 0,
            dataLabels: {
              enabled: true,
              format: '{point.y:.0f}'
            }
          }
        },
        legend: isBig ? legendBig : legendSmall,
        series: [
          {
            data: _data,
          },
        ],
        subtitle: isBig ? subtitle : '',
        credits: {
          enabled: false,
        },
      };
      setOptions(option);
      setIsLoading(false)
    }

    try {
      fetchData()
    } catch (error) { }
    return () => {
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <div className='col-xl-12'>
    {isLoading ? (
      <div className='d-flex justify-content-center align-items-center h-100'>
        <Spin size='large' />
      </div>
    ) : (
      <div className='card border shadown-sm p-lg-1'>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>

    )}
  </div>
}



const StatisticalWrapper = () => {
  return (
    <>
      <div className='' style={{ fontSize: "20px", width: "100%" }}>
        <div className='row'>
          <div className='col-lg-6 col-xl-5'>
            <StatisticalPage />
          </div>
          <div className='col-lg-6 col-xl-7 mt-5 mt-lg-0'>
            <StatisticalUnit />
          </div>
        </div>

        <StatisticalCatergory />

      </div>
    </>
  )
}

export { StatisticalWrapper }
