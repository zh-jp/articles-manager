1. 使用 pnpm 管理依赖
```bash
npm install -g pnpm
```
2. 安装 package.json 中的依赖
```bash
pnpm install
```
3. 启动项目
```bash
pnpm dev
```

# 技术栈
TypeScript
Vue Router
Pinia
ESLint 使代码规范，Prettier 使代码美观

husky (git hooks 工具)往远程仓库提交内容前，触发钩子检查代码。默认全量检查（耗时问题、其他开发者的历史遗留问题）

添加了 lint-staged 仅检查暂存区新添加的代码

sass 预处理样式