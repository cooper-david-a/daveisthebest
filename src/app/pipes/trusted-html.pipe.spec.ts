import { TrustedHtmlPipe } from './trusted-html.pipe';

describe('TrustedHtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new TrustedHtmlPipe();
    expect(pipe).toBeTruthy();
  });
});
