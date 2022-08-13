import {
  Children,
  cloneElement,
  Key,
  MouseEvent,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { SpoilerGroup, SpoilerGroupProps } from '../SpoilerGroup/SpoilerGroup';

interface AccordionProps extends SpoilerGroupProps {
  children: ReactNode | ReactNode[];
}

type ActiveId = Key | null | undefined;

export function Accordion({ children, ...props }: AccordionProps): JSX.Element {
  const [activeId, setActiveId] = useState<ActiveId>();

  function clickHandler(e: MouseEvent, id: ActiveId) {
    e.stopPropagation();

    const path = e.nativeEvent.composedPath();
    const toggle = path.find(
      (item) => (item as HTMLElement).dataset?.role === 'spoiler-toggle',
    );

    if (!toggle) return;

    if (id === activeId) return setActiveId(undefined);

    setActiveId(id);
  }

  return (
    <SpoilerGroup {...props}>
      {Children.map(children as ReactElement[], (item) =>
        cloneElement(item, {
          onClick: (e: MouseEvent) => clickHandler(e, item.key),
          opened: item.key === activeId,
          accordion: true,
        }),
      )}
    </SpoilerGroup>
  );
}
