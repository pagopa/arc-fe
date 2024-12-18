import { describe, it, expect, beforeEach } from 'vitest';
import { cartState, toggleCartDrawer, addItem, resetCart } from './CartStore';
import { toEuroOrMissingValue } from 'utils/converters';
import { CartItem } from 'models/Cart';

describe('cartStore', () => {
  beforeEach(resetCart);

  it('toggles the cart drawer state', () => {
    toggleCartDrawer();

    expect(cartState.value.isOpen).toBeTruthy();

    toggleCartDrawer();

    expect(cartState.value.isOpen).toBeFalsy();
  });

  it('add item to the cart the cart correctly', () => {
    const item: CartItem = {
      amount: 100,
      paFullName: 'ACI',
      paTaxCode: '77777777',
      nav: 'testNav123',
      iuv: 'testIuv123',
      description: 'A nice description'
    };
    addItem(item);

    expect(cartState.value.items).toStrictEqual([item]);
    expect(cartState.value.items.length).toBe(1);
    expect(cartState.value.amount).toBe(toEuroOrMissingValue(item.amount));

    const anotherItem: CartItem = {
      amount: 367,
      paFullName: 'ACI',
      paTaxCode: '77777778',
      nav: 'testNav123',
      iuv: 'testIuv123',
      description: 'A nice description'
    };
    addItem(anotherItem);

    expect(cartState.value.items).toStrictEqual([item, anotherItem]);
    expect(cartState.value.items.length).toBe(2);
    expect(cartState.value.amount).toBe(toEuroOrMissingValue(item.amount + anotherItem.amount));
  });
});
