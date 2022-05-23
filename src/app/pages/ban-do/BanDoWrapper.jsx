import { OverlayTrigger, Popover } from 'react-bootstrap-v5'
import React, { useEffect, useState } from 'react'

import { CONFIG } from '../../../helpers/config'
import GoogleMapReact from 'google-map-react';
/* eslint-disable jsx-a11y/anchor-is-valid */
import { requestPOST } from '../../../helpers/baseAPI'
import { toAbsoluteUrl } from '../../../_metronic/helpers'

const BanDoPage = () => {

  const [lat, setLat] = useState(11.701620);
  const [lng, setLng] = useState(108.968977);
  // eslint-disable-next-line no-unused-vars
  const [zoom, setZoom] = useState(10.5);

  const [dataAll, setDataAll] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      var body = {
        "idLinhVuc": "",
        "idChuDe": "",
        "tieuBieu": "",
        "soLuong": 100,
        "phanTrang": 0,
        "sapXep": "ID"
      }
      let res = await requestPOST(CONFIG.PAHT_PATH + '/DanhSachPhanAnh', body)
      let data = res?.data?.phananh ?? []
      if (data && data.length > 0) {
        var _data = []
        data.forEach(i => {
          if (i.Latitude && i.Longitude) {
            i.Latitude = parseFloat(i.Latitude)
            i.Longitude = parseFloat(i.Longitude)
            _data.push(i)
            setLat(i.Latitude)
            setLng(i.Longitude)
          }
        })
        setDataAll(_data)
        setLoading(false)
      }
    }

    try {
      fetchData()
    } catch (error) { }
    return () => { setDataAll([]) }
  }, [])

  const AnyReactComponent = ({ item }) => (
    <OverlayTrigger
      trigger="over"
      key={item.ID}
      placement="auto-start"
      rootClose
      overlay={
        <Popover style={{ maxWidth: '60%' }} id={`${item.ID}-popover`}>

          <Popover.Title as="h3">{item.TieuDe}</Popover.Title>
          <Popover.Content>
            - Nội dung: {item.NoiDung}<br />
            - Địa chỉ: {item.DiaChi}<br />
          </Popover.Content>
        </Popover>
      }
    >
      <img title={item.Ten} style={{color:"red"}} src={toAbsoluteUrl('/media/logos/map-location.png')} width="30" height="30" alt="" />
    </OverlayTrigger>
  );

  return (
    <div className='h-600px'>
      {loading || dataAll.length === 0 ? <></> :
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyCPmrcwqPtSIze8rorai9g0q63BySdWHQg' }}
          defaultCenter={{
            lat: lat,
            lng: lng
          }}
          center={[lat, lng]}
          zoom={zoom}
        >
          {dataAll.map(i => (
            <AnyReactComponent
              key={i.ID}
              lat={i.Latitude}
              lng={i.Longitude}
              item={i}
            />
          ))}
        </GoogleMapReact>
      }
    </div>
  )
}

const BanDoWrapper = () => {
  return (
    <>
      <BanDoPage />
    </>
  )
}

export { BanDoWrapper }
