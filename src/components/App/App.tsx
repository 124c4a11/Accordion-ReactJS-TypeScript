import { data } from '../../assets/data/data';
import { Accordion } from '../Accordion/Accordion';
import { Container } from '../Container/Container';
import { Spoiler } from '../Spoiler/Spoiler';
import { SpoilerGroup } from '../SpoilerGroup/SpoilerGroup';

export function App(): JSX.Element {
  return (
    <Container>
      <h1>Multilevel Spoiler</h1>
      <Spoiler title="Level 1">
        <SpoilerGroup>
          {data.map(({ id, content }) => (
            <Spoiler
              key={id}
              title="- Level 2"
              content={content}
              component="li"
            />
          ))}
        </SpoilerGroup>
      </Spoiler>

      <h2 className="h1">Spoiler Group</h2>
      <SpoilerGroup>
        <Spoiler title="Level 1">
          <SpoilerGroup>
            {data.map(({ id, content }) => (
              <Spoiler key={id} title="- Level 2" content={content} />
            ))}
          </SpoilerGroup>
        </Spoiler>

        {data.map(({ id, title, content }) => (
          <Spoiler key={id} title={title} content={content} component="li" />
        ))}
      </SpoilerGroup>

      <h2 className="h1">Accordion</h2>
      <Accordion>
        <Spoiler title="Level - 1">
          <Accordion>
            {data.map(({ id, content }) => (
              <Spoiler key={id} title="- Level - 2" content={content} />
            ))}
          </Accordion>
        </Spoiler>

        {data.map(({ id, title, content }) => (
          <Spoiler key={id} title={title} content={content} />
        ))}
      </Accordion>
    </Container>
  );
}
