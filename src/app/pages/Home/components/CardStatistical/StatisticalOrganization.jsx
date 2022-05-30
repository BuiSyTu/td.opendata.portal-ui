import React, { useEffect, useState } from 'react'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'

const StatisticalOrganization = () => {
    const [options, setOptions] = useState(null)
    const color = ["#636efa", "#ef553c", "#54cd96", "#ab63fa", "#f9a15a", "#40d3f3", "#f36692", "#b6e880", "#f097ff", "#fecb52", "#444fdb", "#f7a799", "#67fcc9", "#e0c6fc"]

    useEffect(() => {
        const _data = [
            {
                name: 'Văn phòng UBND tỉnh',
                y: 25
            },
            {
                name: 'Sở Công thương',
                y: 10
            },
            {
                name: 'Sở Giáo dục và Đào tạo',
                y: 5
            },
            {
                name: 'Sở Giao thông vận tải',
                y: 8
            },
            {
                name: 'Sở Kế hoạch và Đầu tư',
                y: 11
            },
            {
                name: 'Sở Khoa học và Công nghệ',
                y: 9
            },
            {
                name: 'Sở Lao động -Thương Binh và Xã hội',
                y: 13
            },
            {
                name: 'Sở Tài chính',
                y: 23
            },
            {
                name: 'Sở Tài nguyên và Môi trường',
                y: 5
            }
        ];

        const isBig = window.innerWidth > 1199;
        const legendBig = {
            align: 'right',
            verticalAlign: 'middle',
            layout: 'vertical',
            useHTML: true,
            y: 0,
            x: 0,
            padding: 10,
            margin: 0,
            itemWidth: 240,
            maxHeight: 250,
            labelFormat: '<span>{name}</span>: <b class="fw-bolder ms-auto fs-6" style="color: {color}">{y}</b><br/>',
            itemStyle: { "fontSize": "13px", "fontWeight": "normal", "fontFamily": "roboto", "lineHeight": "25px", "top": "-3px" }
        };

        const legendSmall = {
            align: 'left',
            verticalAlign: 'bottom',
            layout: 'horizontal',
            useHTML: true,
            y: 0,
            x: 0,
            padding: 0,
            margin: 0,
            labelFormat: '<span>{name}</span>: <b class="fw-bolder ms-auto">{y}</b><br/>',
            itemStyle: { "fontSize": "13px", "fontWeight": "normal", "fontFamily": "arial" }
        }
        const option = {
            chart: {
                type: 'pie',
                renderTo: 'containersss'
            },
            colors: color,
            title: {
                text: '',
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
                    innerSize: '50%',
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
            credits: {
                enabled: false,
            },
        };
        setOptions(option)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "280px" } }} />
    )
}

export default StatisticalOrganization