import { data } from '../../assets/data/data';
import { Container } from '../Container/Container';
import { Spoiler } from '../Spoiler/Spoiler';

export function App(): JSX.Element {
  return (
    <Container>
      <h1>Spoiler</h1>
      <Spoiler title="Level 1">
        {data.map(({ title, content }, ndx) => (
          <Spoiler key={ndx} title="Level - 2" htmlContent={content} />
        ))}
      </Spoiler>
    </Container>
  );
}
