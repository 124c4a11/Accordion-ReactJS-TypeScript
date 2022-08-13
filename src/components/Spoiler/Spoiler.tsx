import {
  ComponentProps,
  ElementType,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import cn from 'classnames';

import styles from './Spoiler.module.scss';

interface OwnProps<T> {
  title?: string;
  content?: string;
  component?: T extends 'div' | 'li' ? T : 'div';
  accordion?: boolean;
  opened?: boolean;
}

type SpoilerProps<T extends ElementType> = OwnProps<T> &
  Omit<ComponentProps<T>, keyof OwnProps<T>>;

export function Spoiler<T extends ElementType = 'div' | 'li'>({
  title,
  content,
  className,
  component,
  children,
  accordion = false,
  opened = false,
  ...props
}: SpoilerProps<T>): JSX.Element {
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [delay, setDelay] = useState<number>(0);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (opened && !isOpen) open();
    if (!opened && isOpen) close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, contentRef]);

  useEffect(() => {
    const delay =
      parseFloat(getComputedStyle(contentRef.current!).transitionDuration) *
        1000 || 0;

    setDelay(delay);
  }, [contentRef]);

  function clickHandler(e: MouseEvent) {
    if (accordion) return;
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
        data-role="spoiler-toggle"
        aria-expanded={isOpen}
        onClick={clickHandler}
      >
        <span>{title}</span>
      </button>
      {content ? (
        <div
          ref={contentRef}
          className={styles['spoiler__content']}
          dangerouslySetInnerHTML={{ __html: content as string }}
        />
      ) : (
        <div ref={contentRef} className={styles['spoiler__content']}>
          {children}
        </div>
      )}
    </Component>
  );
}
