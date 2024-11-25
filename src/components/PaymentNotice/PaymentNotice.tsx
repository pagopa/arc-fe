import { _Preview } from './Preview';
import { _Card } from './Card';
import { _Detail } from './Detail';
import { _Empty } from './Empty';
import { _Error } from './Error';
import { _List } from './List';
import { _Info } from './Info';

/**
 * PaymentNotice is the main component for handling payment notices.
 * It includes sub-components for displaying payment notice elements.
 *
 * Example: <PaymentNotice.Preview/>
 * @component
 */
export const PaymentNotice = () => {};

/**
 * Preview component for PaymentNotice.
 * Use <PaymentNotice.Preview /> instead of direct use.
 * @type {React.ComponentType}
 */
PaymentNotice.Preview = _Preview;

/**
 * Empty component for PaymentNotice.
 * Use <PaymentNotice.Empty /> instead of direct use.
 * @type {React.ComponentType}
 */
PaymentNotice.Empty = _Empty;

/**
 * Error component for PaymentNotice.
 * Use <PaymentNotice.Error /> instead of direct use.
 * @type {React.ComponentType}
 */
PaymentNotice.Error = _Error;

/**
 * Card component for PaymentNotice.
 * Use <PaymentNotice.Card /> instead of direct use.
 * @type {React.ComponentType}
 */
PaymentNotice.Card = _Card;

/**
 * Detail component for PaymentNotices.
 * Use <PaymentNotice._Detail /> instead of direct use.
 * @type {React.ComponentType}
 */
PaymentNotice.Detail = _Detail;

/* * List component for PaymentNotice.
 * Use <PaymentNotice.List /> instead of direct use.
 * @type {React.ComponentType}
 */
PaymentNotice.List = _List;

/* * Info  component for PaymentNotice list.
 * Use <PaymentNotice.Info /> instead of direct use.
 * @type {React.ComponentType}
 */
PaymentNotice.Info = _Info;
