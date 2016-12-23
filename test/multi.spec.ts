import * as should from 'should';
import { FuseBox, BabelPlugin } from 'fuse-box';
import { ESLintPlugin } from '../index';

describe('handle multiple files', () => {
  it('should lint all', async () => {
    const fuseBox = FuseBox.init({
      homeDir: `${__dirname}/fixtures`,
      plugins: [ESLintPlugin({ config: { useEslintrc: true } })],
    });
    should(await fuseBox.bundle('>multifile.js')).not.be.empty();
  });
});
