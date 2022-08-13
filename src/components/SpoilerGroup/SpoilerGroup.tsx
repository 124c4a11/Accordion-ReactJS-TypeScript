import { DetailedHTMLProps, ReactNode } from 'react';
import cn from 'classnames';

import styles from './SpoilerGroup.module.scss';

interface SpoilerGroupProps
  extends DetailedHTMLProps<
    React.HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  children?: ReactNode;
}

export function SpoilerGroup({
  children,
  className,
  ...props
}: SpoilerGroupProps): JSX.Element {
  return (
    <ul className={cn(className, styles['spoiler-group'])} {...props}>
      {children}
    </ul>
  );
}
