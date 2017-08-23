import { JLaserToolsPage } from './app.po';

describe('j-laser-tools App', () => {
  let page: JLaserToolsPage;

  beforeEach(() => {
    page = new JLaserToolsPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
