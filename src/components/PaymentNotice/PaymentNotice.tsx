import { _Card } from './Card';
import { _Preview } from './Preview';

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
 * Card component for PaymentNotice.
 * Use <PaymentNotice.Card /> instead of direct use.
 * @type {React.ComponentType}
 */
PaymentNotice.Card = _Card;
