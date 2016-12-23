import { WorkFlowContext } from 'fuse-box';
import { Plugin } from 'fuse-box/dist/typings/WorkflowContext';
import { File } from 'fuse-box/dist/typings/File';
export declare type PluginOptions = {
    breakOnError?: boolean;
    format?: string;
    fix?: boolean;
    quiet?: boolean;
    test?: RegExp;
};
export declare type LinterOptions = {
    /**
     * Set to false to disable the use of configuration comments (such as /*eslint-disable *\).
     *
     * Corresponds to --no-inline-config.
     */
    allowInlineConfig?: boolean;
    /**
     * Set to false to disable use of base config.
     * Could be set to an object to override default base config as well.
     */
    baseConfig?: boolean | {};
    /**
     * Operate only on changed files (default: false).
     *
     * Corresponds to --cache.
     */
    cache?: boolean;
    /**
     * Name of the file or directory where the cache will be stored (default: .eslintcache).
     *
     * Corresponds to --cache-location.
     */
    cacheLocation?: string;
    /**
     * The configuration file to use (default: null).
     * Corresponds to -c.
     */
    configFile?: string;
    /**
     * Path to a directory that should be considered as the current working directory.
     */
    cwd?: string;
    /**
     * An array of environments to load (default: empty array).
     * Corresponds to --env.
     */
    envs?: string[];
    /**
     * An array of filename extensions that should be checked for code.
     * The default is an array containing just ".js".
     *
     * Corresponds to --ext.
     */
    extensions?: string[];
    /**
     * True indicates that fixes should be included with the output report,
     * and that errors and warnings should not be listed if they can be fixed.
     * However, the files on disk will not be changed. To persist changes to disk, call outputFixes().
     */
    fix?: boolean;
    /**
     * An array of global variables to declare (default: empty array).
     *
     * Corresponds to --global.
     */
    globals?: string[];
    /**
     * False disables use of .eslintignore, ignorePath and ignorePattern (default: true).
     *
     * Corresponds to --no-ignore.
     */
    ignore?: boolean;
    /**
     * The ignore file to use instead of .eslintignore (default: null).
     *
     * Corresponds to --ignore-path.
     */
    ignorePath?: string;
    /**
     * Glob patterns for paths to ignore. String or array of strings.
     */
    ignorePattern?: string;
    /**
     * Specify the parser to be used (default: espree).
     *
     * Corresponds to --parser.
     */
    parser?: string;
    /**
     * An object containing parser options (default: empty object).
     *
     * Corresponds to --parser-options.
     */
    parserOptions?: any;
    /**
     * An array of plugins to load (default: empty array).
     *
     * Corresponds to --plugin.
     */
    plugins?: any[];
    /**
     * An array of directories to load custom rules from (default: empty array).
     *
     * Corresponds to --rulesdir.
     */
    rulePaths?: string[];
    /**
     * An object of rules to use (default: null).
     *
     * Corresponds to --rule.
     */
    rules?: any;
    /**
     * Set to false to disable use of .eslintrc files (default: true).
     *
     * Corresponds to --no-eslintrc.
     */
    useEslintrc?: boolean;
};
/**
 *
 *
 * @export
 * @class FuseBoxHTMLPlugin
 * @implements {Plugin}
 */
export declare class ESLintPluginClass implements Plugin {
    /**
     *
     *
     * @type {RegExp}
     * @memberOf FuseBoxHTMLPlugin
     */
    context: WorkFlowContext;
    test: RegExp;
    private options;
    private config;
    private engine;
    constructor({test, fix, config, ...opts}?: PluginOptions & {
        config?: LinterOptions;
    });
    /**
     *
     *
     * @param {WorkFlowContext} context
     *
     * @memberOf FuseBoxHTMLPlugin
     */
    init(context: WorkFlowContext): void;
    /**
     *
     *
     * @param {File} file
     *
     * @memberOf FuseBoxHTMLPlugin
     */
    transform(file: File, ast: any): void;
    private printResults(results, file, format);
}
export declare const ESLintPlugin: (opts?: PluginOptions & {
    config?: LinterOptions;
}) => ESLintPluginClass;
