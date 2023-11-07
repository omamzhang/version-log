module.exports = {
    types: [
      { value: 'feat', name: 'feat:     新增功能' },
      { value: 'fix', name: 'fix:      修复 bug' },
      { value: 'docs', name: 'docs:     文档变更' },
      { value: 'style', name: 'style:    代码样式变更(不影响功能，例如空格、格式化、缺少分号等)' },
      { value: 'refactor', name: 'refactor: 代码重构(既不修复 bug 也不添加功能)' },
      { value: 'perf', name: 'perf:     性能优化' },
      { value: 'test', name: 'test:     新增或修改测试用例' },
      { value: 'build', name: 'build:    变更项目构建或外部依赖(例如 scopes: webpack、gulp、npm 等)' },
      { value: 'ci', name: 'ci:       更改持续集成软件的配置文件和 package 中的 scripts 命令等(例如 scopes: Travis、Circle、BrowserStack、SauceLabs 等)' },
      { value: 'chore', name: 'chore:    对构建过程或辅助工具和库的更改(不影响源文件、测试用例)' },
      { value: 'revert', name: 'revert:   回滚 commit' },
      { value: 'WIP', name: 'WIP:      正在进行中的 commit' },
    ],
  
    scopes: [
      { name: 'app' },
      { name: 'server' },
      { name: 'client' },
      { name: 'docs' },
      { name: 'other' },
    ],
  
    allowCustomScopes: true,
    allowBreakingChanges: ['feat', 'fix'],
  };
  