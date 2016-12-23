import { readFile, readFileSync, writeFile } from 'fs';
import * as should from 'should';
import { FuseBox, BabelPlugin } from 'fuse-box';
import { ESLintPlugin } from '../index';

describe('error reporting', () => {
  it('should print errors when linter fails', async () => {
    const fuseBox = FuseBox.init({
      homeDir: `${__dirname}/fixtures`,
      plugins: [ESLintPlugin({ config: { useEslintrc: true } })],
    });
    should(await fuseBox.bundle('>error.js')).eql(undefined);
  });
  it('should report continue to build when linter fails', async () => {
    const fuseBox = FuseBox.init({
      homeDir: `${__dirname}/fixtures`,
      plugins: [ESLintPlugin({ breakOnError: false, config: { useEslintrc: true } })],
    });
    should(await fuseBox.bundle('>error.js')).not.be.empty();
  });
});
