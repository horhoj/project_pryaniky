import { useMemo } from 'react';
import { mainDataSlice } from '../../store/mainDataSlice';
import { Userdoc } from '../../types';
import { DocumentForm } from '../DocumentForm';
import { getUserdocForEdit } from '../../helpers';
import styles from './EditForm.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { Modal } from '~/ui/Modal';

export function EditForm() {
  const dispatch = useAppDispatch();
  const rowId = useAppSelector((state) => state.mainData.editRowId);
  const isEdit = useAppSelector((state) => state.mainData.isEdit);
  const rows = useAppSelector(
    (state) => state.mainData.fetchUserdocsRequest.data?.data,
  );

  const initialState = useMemo(
    () => getUserdocForEdit(rowId, rows),
    [rows, rowId],
  );

  const handleClose = () => {
    dispatch(mainDataSlice.actions.setIsEdit(false));
  };

  const handleSubmit = (values: Userdoc) => {
    if (rowId === null) {
      return;
    }
    dispatch(
      mainDataSlice.thunks.patchUserDocsThunk({ data: values, id: rowId }),
    );
  };

  const patchUserdocRequest = useAppSelector(
    (state) => state.mainData.patchUserdocsRequest,
  );

  return (
    <Modal isOpen={isEdit} onClose={handleClose}>
      <div className={styles.EditForm} onMouseDown={(e) => e.stopPropagation()}>
        {initialState && (
          <DocumentForm
            initialValues={initialState}
            isLoading={patchUserdocRequest.isLoading}
            responseErrors={patchUserdocRequest.error}
            onSubmit={handleSubmit}
            title={'Edit doc'}
          />
        )}
      </div>
    </Modal>
  );
}
