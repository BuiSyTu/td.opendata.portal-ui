import styles from './CRUDModal.module.scss'

import { Button, Modal, Spin, Typography } from 'antd'
import { memo } from 'react'
import classNames from 'classnames/bind'

const { Text } = Typography
const cx = classNames.bind(styles)

type Props = {
  modalVisible: boolean,
  handleOk?: any,
  handleCancel?: any,
  isLoading?: any,
  typeModal?: any,
  buttonLoading?: any,
  title?: string,
}

const CRUDModal: React.FC<Props> = ({
  children,
  modalVisible,
  handleOk,
  handleCancel,
  isLoading,
  typeModal,
  buttonLoading,
  title,
}) => {
  const footer = [
    typeModal === 'view' ? (
      <></>
    ) : (
      <Button
        key='Ok'
        type='primary'
        htmlType='submit'
        size='middle'
        className={cx('ok-btn')}
        icon={<i className='las la-save' style={{ color: '#fff' }}></i>}
        onClick={() => {
          handleOk()
        }}
        loading={buttonLoading}
      >
        <Text style={{ color: '#FFF', paddingLeft: 5 }}> {'Lưu'}</Text>
      </Button>
    ),
    <Button
      key='Cancel'
      type='primary'
      size='middle'
      className={cx('cancel-btn')}
      icon={<i className='las la-times' style={{ color: '#757575' }}></i>}
      onClick={() => {
        handleCancel()
      }}
    >
      <Text style={{ color: '#757575', paddingLeft: 5 }}>
        {' '}
        {typeModal === 'view' ? 'Đóng' : 'Hủy'}
      </Text>
    </Button>,
  ]

  return (
    <Modal
      width={1200}
      visible={modalVisible}
      title={<Text style={{ fontWeight: '500', color: '#fff' }}>{title}</Text>}
      onOk={handleOk}
      onCancel={handleCancel}
      closeIcon={<i className='las la-times' style={{ color: '#fff', fontSize: 20 }}></i>}
      footer={footer}
    >
      <Spin spinning={isLoading}>
        {children}
      </Spin>
    </Modal>
  )
}

export default memo(CRUDModal)