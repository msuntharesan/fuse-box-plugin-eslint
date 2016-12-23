import * as should from 'should';
import { FuseBox, BabelPlugin } from 'fuse-box';
import { ESLintPlugin } from '../index';

describe('with module requires', () => {
  it('should not lint npm modules', async () => {
    const fuseBox = FuseBox.init({
      homeDir: `${__dirname}/fixtures`,
      plugins: [ESLintPlugin({ config: { useEslintrc: true } })],
    });
    should(await fuseBox.bundle('>node-req.js')).not.be.empty();
  });
});
