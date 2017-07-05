import { MyAngular2ProjectPage } from './app.po';

describe('my-angular2-project App', () => {
  let page: MyAngular2ProjectPage;

  beforeEach(() => {
    page = new MyAngular2ProjectPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
