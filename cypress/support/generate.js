import { build, fake, sequence } from 'test-data-bot';

const userBuilder = build('User').fields({
  email: sequence(x => `jack${x}@test.com`),
  password: fake(f => f.internet.password()),
});

export { userBuilder };
