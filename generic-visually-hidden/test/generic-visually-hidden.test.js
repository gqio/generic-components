import { html, fixture, expect } from '@open-wc/testing';
import '../index.js';

describe('generic-visually-hidden', () => {
  it('a11y', async () => {
    const el = await fixture(html`
      <generic-visually-hidden></generic-visually-hidden>
    `);

    await expect(el).to.be.accessible();
  });
});
