import { useMutation } from '@tanstack/react-query';
import utils from 'utils';
import { CartItem } from 'models/Cart';
import { AxiosError } from 'axios';
import { ArcErrors } from 'routes/routes';

const getRedirect = (data: string) => {
  const re = /URL=([^"]+)/;
  const match = data.match(re);
  if (!match) {
    throw new Error(`missing URL in ${data}`);
  }
  const url = match ? match[1] : 'No URL found';
  return url;
};

export const usePostCarts = ({
  onSuccess,
  onError
}: {
  onSuccess: (url: string) => void;
  onError?: (error: string) => void;
}) => {
  const carts = useMutation({
    mutationFn: async ({ notices, email }: { notices: CartItem[]; email?: string }) => {
      const request = utils.converters.cartItemsToCartsRequest(notices);
      const { data } = await utils.cartsClient.postCarts({ ...request, emailNotice: email });
      return data;
    },
    onSuccess: (data: string) => onSuccess(getRedirect(data)),
    onError: (error: AxiosError) => {
      if (!onError) return;
      if (error.code == 'ERR_BAD_REQUEST' && error.response?.status === 422) {
        return onError(ArcErrors['422']);
      }
      onError(ArcErrors['423']);
    }
  });

  return carts;
};
