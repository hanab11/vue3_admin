prettier和eslint：prettier主要针对写法错误，eslint主要针对逻辑错误，（如报错，新配置需重启）
pnpm的优点：node_modules非常直观，只展示最外层的依赖库，内层的基础依赖库全放在.pnpm文件夹里

# 配置说明

package.json =依赖包
pnpm-lock.yaml =pnpm生成的依赖锁（版本）
tsconfig.json tsconfig.node.json =ts的配置
vite.config.ts =vite的配置
commitlint.config.cjs =git提交校验
.eslintrc.cjs .eslintignore =eslint配置、规则、对谁忽略
.stylelintrc.cjs .stylelintignore =stylelint配置、规则、对谁忽略
.prettierrc.json .prettierignore =prettier配置、规则、对谁忽略
.env.development .env.production .env.test =env环境变量，默认使用development

.husky/pre-commit 提交之前的配置（一般是提交格式化）
.husky/commit-msg 提交消息的配置（一般是提交校验）
src/vite-env.d.ts env环境变量的配置（不同环境不同数据）

《git提交校验》现在当我们填写`commit`信息的时候，前面就需要带着下面的`subject`和`: `
'feat',//新特性、新功能
'fix',//修改bug
'docs',//文档修改
'style',//代码格式修改, 注意不是 css 修改
'refactor',//代码重构
'perf',//优化相关，比如提升性能、体验
'test',//测试用例修改
'chore',//其他修改, 比如改变构建流程、或者增加依赖库、工具等
'revert',//回滚到上一个版本
'build',//编译相关的修改，例如发布版本、对项目构建或者依赖的改动

# Vue 3 + TypeScript + Vite

This template should help get you started developing with Vue 3 and TypeScript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support For `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
   1. Run `Extensions: Show Built-in Extensions` from VSCode's command palette
   2. Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.
