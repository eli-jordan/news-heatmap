import { ProdInfraKafkaCommanderPage } from './app.po';

describe('prod-infra-kafka-commander App', () => {
  let page: ProdInfraKafkaCommanderPage;

  beforeEach(() => {
    page = new ProdInfraKafkaCommanderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
