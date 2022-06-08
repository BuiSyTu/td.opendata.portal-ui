import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './AccountItem.module.scss';

const cx = classNames.bind(styles);

function AccountItem({ icon, content, borderTop = false, to }) {
    return (
        <div className={cx(
            'wrapper',
            borderTop ? 'border-top' : '',
        )}>
            <Link to={to} className={cx('info')}>
                <i className={icon}></i>
                <span className={cx('name')}>{content}</span>
            </Link>
        </div >
    );
}

export default AccountItem;