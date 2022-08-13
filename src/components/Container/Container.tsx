import { PropsWithChildren } from 'react';

import styles from './Container.module.scss';

export function Container({ children }: PropsWithChildren): JSX.Element {
  return <div className={styles['container']}>{children}</div>;
}
