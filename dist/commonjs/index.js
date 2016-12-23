"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
const eslint_1 = require("eslint");
const path_1 = require("path");
/**
 *
 *
 * @export
 * @class FuseBoxHTMLPlugin
 * @implements {Plugin}
 */
class ESLintPluginClass {
    constructor(_a = {}) {
        var { test, fix, config } = _a, opts = __rest(_a, ["test", "fix", "config"]);
        this.test = /\.js(x)?$/;
        this.options = {
            format: 'stylish',
            breakOnError: true
        };
        this.config = {};
        this.options = __assign({}, this.options, { fix }, opts);
        this.config = __assign({}, this.config, config);
        if (fix) {
            this.config.fix = fix;
        }
        if (test !== undefined) {
            this.test = test;
        }
    }
    /**
     *
     *
     * @param {WorkFlowContext} context
     *
     * @memberOf FuseBoxHTMLPlugin
     */
    init(context) {
        this.context = context;
        context.allowExtension(".jsx?");
        this.engine = new eslint_1.CLIEngine(this.config);
    }
    /**
     *
     *
     * @param {File} file
     *
     * @memberOf FuseBoxHTMLPlugin
     */
    transform(file, ast) {
        const { fix, format, quiet, breakOnError } = this.options;
        const report = this.engine.executeOnText(file.contents, file.absPath);
        if (fix) {
            eslint_1.CLIEngine.outputFixes(report);
            const [result] = report.results.filter(({ output }) => !!output);
            if (result && result.output) {
                file.contents = result.output;
            }
        }
        this.printResults(report.results, file, format);
        if (breakOnError && report.errorCount > 0) {
            throw new Error(`[ESLint Plugin]: ESLint Failed for file ${path_1.relative(process.cwd(), file.absPath)}`);
        }
    }
    printResults(results, file, format) {
        if (this.options.quiet) {
            results = this.engine.getErrorResults(results);
        }
        const formatter = this.engine.getFormatter(format);
        const output = formatter(results);
        console.info(output);
    }
}
exports.ESLintPluginClass = ESLintPluginClass;
;
exports.ESLintPlugin = (opts = {}) => {
    return new ESLintPluginClass(opts);
};
