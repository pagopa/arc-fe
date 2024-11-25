import React from 'react';
import PullPaymentsModal from './PullPaymentsModal';
import AssistanceBackModal from './AssistanceBackModal';
import DetailNoticeInfoModal from './DetailNoticeInfoModal';
import utils from 'utils';

const ModalSystem = () => {
  const { isOpen, id } = utils.modal.status;
  return isOpen.value ? (
    <>
      <DetailNoticeInfoModal open={id.value === utils.modal.ModalId.PAYMENT_NOTICE_MODAL} />
      <PullPaymentsModal open={id.value === utils.modal.ModalId.OPTIN} />
      <AssistanceBackModal open={id.value === utils.modal.ModalId.ASSISTANCEBACK} />
    </>
  ) : null;
};
export { ModalSystem };
