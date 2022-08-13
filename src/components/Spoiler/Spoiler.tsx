import {
  ComponentProps,
  ElementType,
  MouseEvent,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

import styles from './Spoiler.module.scss';

interface OwnProps<T> {
  title?: string;
  htmlContent?: string;
  component?: T extends 'div' | 'li' ? T : 'div';
}

type SpoilerProps<T extends ElementType> = OwnProps<T> &
  Omit<ComponentProps<T>, keyof OwnProps<T>>;

export function Spoiler<T extends ElementType = 'div' | 'li'>({
  title,
  htmlContent,
  component,
  children,
  className,
  ...props
}: SpoilerProps<T>): JSX.Element {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const delay = 200;

  const contentRef = useRef<HTMLDivElement>(null);

  function clickHandler(e: MouseEvent) {
    if (isAnimated) return;
    if (!contentRef.current) return;

    if (isOpen) close();
    else open();
  }

  function open() {
    setIsOpen(true);
    setIsAnimated(true);

    const contentElement = contentRef.current!;

    contentElement.style.height = `${contentElement.scrollHeight}px`;

    setTimeout(() => {
      contentElement.style.height = 'auto';
      setIsAnimated(false);
    }, delay);
  }

  function close() {
    setIsOpen(false);
    setIsAnimated(true);

    const contentElement = contentRef.current!;

    contentElement.style.height = `${contentElement.scrollHeight}px`;

    setTimeout(() => (contentElement.style.height = ''), 0);
    setTimeout(() => setIsAnimated(false), delay);
  }

  const Component = component || 'div';

  return (
    <Component className={cn(className, styles['spoiler'])} {...props}>
      <button
        className={cn(styles['spoiler__btn'], {
          [styles['spoiler__btn_active']]: isOpen,
        })}
        aria-expanded={isOpen}
        onClick={clickHandler}
      >
        <span>{title}</span>
      </button>
      {htmlContent ? (
        <div
          ref={contentRef}
          className={styles['spoiler__content']}
          dangerouslySetInnerHTML={{ __html: htmlContent as string }}
        />
      ) : (
        <div ref={contentRef} className={styles['spoiler__content']}>
          {children}
        </div>
      )}
    </Component>
  );
}
