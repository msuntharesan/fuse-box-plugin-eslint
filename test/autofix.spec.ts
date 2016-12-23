import { readFile, readFileSync, writeFile } from 'fs';
import * as should from 'should';
import { FuseBox, BabelPlugin } from 'fuse-box';
import { ESLintPlugin } from '../index';

describe('autofix contents', () => {
  const sourcePath = `${__dirname}/fixtures/fixable.js`;
  let originalSource;
  beforeEach((done) => {
    readFile(sourcePath, 'utf-8', (err, s) => {
      originalSource = s;
      done();
    });
  });
  afterEach((done) => {
    writeFile(sourcePath, originalSource, done);
  });
  it('should auto fix Errors', async () => {
    const fuseBox = FuseBox.init({
      homeDir: `${__dirname}/fixtures`,
      plugins: [ESLintPlugin({ fix: true, config: { useEslintrc: true } })],
    });
    should(await fuseBox.bundle('>fixable.js')).not.be.empty();
    const fixed = readFileSync(sourcePath, 'utf-8');
    should(fixed).not.equal(originalSource);
  });
});