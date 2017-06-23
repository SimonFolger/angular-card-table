import { AngularCardTablePage } from './app.po';

describe('angular-card-table App', () => {
  let page: AngularCardTablePage;

  beforeEach(() => {
    page = new AngularCardTablePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
