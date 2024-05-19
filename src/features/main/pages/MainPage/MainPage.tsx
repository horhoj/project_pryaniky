import { useEffect } from 'react';
import { mainDataSlice } from '../../store/mainDataSlice';
import { EditForm } from '../../components/EditForm';
import { AddForm } from '../../components/AddForm';
import styles from './MainPage.module.scss';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { WorkLayout } from '~/features/layouts/WorkLayout';
import { Spinner } from '~/ui/Spinner';
import { Columns, Table } from '~/ui/Table';
import { getUUID } from '~/utils/getUUID';
import { FetchUserdocsResponseDataItem } from '~/api/userdocs.types';
import { Button } from '~/ui/Button';
import { FormResponseErrors } from '~/ui/FormResponseErrors';
import { Flex } from '~/ui/Flex';

const COLUMNS: Columns<FetchUserdocsResponseDataItem> = [
  { id: getUUID(), title: 'doc name', key: 'documentName' },
  { id: getUUID(), title: 'doc type', key: 'documentType' },
  { id: getUUID(), title: 'doc status', key: 'documentStatus' },
  { id: getUUID(), title: 'company sig name', key: 'companySignatureName' },
  { id: getUUID(), title: 'employee number', key: 'employeeNumber' },
  {
    id: getUUID(),
    title: 'employee sig name',
    key: 'employeeSignatureName',
  },
  { id: getUUID(), title: 'company sig date', key: 'companySigDate' },

  { id: getUUID(), title: 'employee sig date', key: 'employeeSigDate' },
];

export function MainPage() {
  const fetchUserdocsRequest = useAppSelector(
    (state) => state.mainData.fetchUserdocsRequest,
  );

  const deleteUserdocsRequest = useAppSelector(
    (state) => state.mainData.deleteUserDocRequest,
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    return () => {
      dispatch(mainDataSlice.thunks.fetchUserdocsThunk());
    };
  }, []);

  const handleDelete = (rowId: string) => {
    if (confirm('Delete?')) {
      dispatch(mainDataSlice.thunks.deleteDocThunk(rowId));
    }
  };
  const handleEdit = (rowId: string) => {
    dispatch(mainDataSlice.actions.setEditRowId(rowId));
    dispatch(mainDataSlice.actions.setIsEdit(true));
  };

  const handleAdd = () => {
    dispatch(mainDataSlice.actions.setIsAdd(true));
  };

  const handleRefetch = () => {
    dispatch(mainDataSlice.thunks.fetchUserdocsThunk());
  };

  return (
    <>
      <Spinner
        isShow={
          fetchUserdocsRequest.isLoading || deleteUserdocsRequest.isLoading
        }
      />
      <EditForm />
      <AddForm />

      <WorkLayout>
        {deleteUserdocsRequest.error && (
          <FormResponseErrors
            responseErrors={deleteUserdocsRequest.error}
            title={'Delete error'}
          />
        )}
        {fetchUserdocsRequest.error && (
          <FormResponseErrors
            responseErrors={fetchUserdocsRequest.error}
            title={'Fetch error'}
          />
        )}
        <Flex>
          <Button onClick={handleAdd} className={styles.docListBtn}>
            add userdoc
          </Button>
          <Button onClick={handleRefetch} className={styles.docListBtn}>
            refetch docs
          </Button>
        </Flex>
        {/* <DevView data={fetchUserdocsRequest} /> */}
        {fetchUserdocsRequest.data?.data && (
          <Table<FetchUserdocsResponseDataItem>
            data={fetchUserdocsRequest.data.data}
            columns={COLUMNS}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
      </WorkLayout>
    </>
  );
}
