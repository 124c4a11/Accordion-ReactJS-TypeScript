import { data } from '../../assets/data/data';
import { Container } from '../Container/Container';
import { Spoiler } from '../Spoiler/Spoiler';
import { SpoilerGroup } from '../SpoilerGroup/SpoilerGroup';

export function App(): JSX.Element {
  return (
    <Container>
      <h1>Multilevel Spoiler</h1>
      <Spoiler title="Level 1">
        <SpoilerGroup>
          {data.map(({ title, content }, ndx) => (
            <Spoiler key={ndx} title="- Level 2" htmlContent={content} />
          ))}
        </SpoilerGroup>
      </Spoiler>

      <h2 className="h1">Spoiler Group</h2>
      <SpoilerGroup>
        {data.map(({ title, content }, ndx) => (
          <Spoiler
            key={ndx}
            title={title}
            htmlContent={content}
            component="li"
          />
        ))}
      </SpoilerGroup>
    </Container>
  );
}
