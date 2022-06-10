import classNames from 'classnames/bind';
import styles from './Popper.module.scss';

const cx = classNames.bind(styles);

interface WrapperProps {
    children?: any,
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
    return <div className={cx('wrapper')}>{children}</div>;
}

export default Wrapper;