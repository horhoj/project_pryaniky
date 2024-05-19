import styles from './AboutPages.module.scss';
import { FormTitle } from '~/ui/FormTitle';
import { WorkLayout } from '~/features/layouts/WorkLayout';

export function AboutPages() {
  return (
    <WorkLayout>
      <div className={styles.AboutPages}>
        <FormTitle>Предложения</FormTitle>
        <ul>
          <li>
            необходим специальный АПИ Эндпойнт для проверки работоспособности
            токена, так как на текущий момент делать такую проверку посредством
            загрузки списка документов нецелесообразно (так как возможен вариант
            когда нам этот список не нужен)
          </li>
          <li>
            Нужно добавить пагинацию для АПИ, что бы не запрашивать целиком весь
            список документов
          </li>
          <li>
            Нужно добавить фильтрацию для документов, так как при большом кол-ве
            документов перебирать их постарнично нецелесообразно
          </li>
        </ul>
      </div>
    </WorkLayout>
  );
}
