import { mainDataSlice } from '../../store/mainDataSlice';
import { Userdoc } from '../../types';
import { DocumentForm } from '../DocumentForm';
import { Modal } from '~/ui/Modal';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { ModalContent } from '~/ui/Modal/ModalContent';

const initialState: Userdoc = {
  companySigDate: '',
  companySignatureName: '',
  documentName: '',
  documentStatus: '',
  documentType: '',
  employeeNumber: '',
  employeeSigDate: '',
  employeeSignatureName: '',
};

export function AddForm() {
  const dispatch = useAppDispatch();

  const isAdd = useAppSelector((state) => state.mainData.isAdd);

  const handleClose = () => {
    dispatch(mainDataSlice.actions.setIsAdd(false));
  };

  const handleSubmit = (values: Userdoc) => {
    dispatch(mainDataSlice.thunks.addUserDocThunk({ data: values }));
  };

  const addUserdocRequest = useAppSelector(
    (state) => state.mainData.addUserdocsRequest,
  );

  return (
    <Modal isOpen={isAdd} onClose={handleClose}>
      <ModalContent>
        <DocumentForm
          initialValues={initialState}
          onSubmit={handleSubmit}
          title={'Add doc'}
          isLoading={addUserdocRequest.isLoading}
          responseErrors={addUserdocRequest.error}
          onCancel={handleClose}
        />
      </ModalContent>
    </Modal>
  );
}
