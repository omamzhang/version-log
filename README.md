# version-log
打版本及生成变更日志库

##  前言
当谈到 Git commit 规范校验时，通常是指使用工具或脚本来强制执行一组预定义的规则，以确保提交消息的一致性和规范性。这有助于团队成员更好地理解和管理代码库的提交历史。

以下是一些常见的 Git commit 规范校验工具和规范：

1. CommitLint：CommitLint 是一个 Git 钩子工具，可用于在提交时校验提交消息是否符合规范。它使用配置文件定义规则，例如提交消息的格式、长度、语法等。您可以在 https://commitlint.js.org/ 了解更多信息。

2. Husky：Husky 是一个 Git 钩子管理工具，它可以与 CommitLint 结合使用，以在提交时自动执行规范校验。您可以在 https://typicode.github.io/husky/#/ 了解更多信息。

3. Conventional Commits：Conventional Commits 是一种常见的 Git commit 规范约定，它定义了一组规则来描述提交消息的结构和格式。这种约定有助于自动生成版本号、生成变更日志等。您可以在 https://www.conventionalcommits.org/ 详细了解。

4. Git Commit Message Convention：Git Commit Message Convention 是一种类似于 Conventional Commits 的约定，它定义了一组规则来描述提交消息的结构和格式。您可以在 https://gist.github.com/stephenparish/9941e89d80e2bc58a153 了解更多信息。

请注意，这些工具和规范并非代码，而是用于帮助开发团队在协作时保持一致的提交规范。您可以根据自己的需求选择和配置适合您团队的工具和规范。


## 流程节点
### 日志内容来源
Git 自动生成日志通常是通过使用 Git Hooks 实现的。具体来说，可以使用 Git 的 post-commit 钩子，在每次提交代码后自动执行一个脚本来生成日志。

#### 方式一  commit钩子脚本
每次代码提交信息,自动将信息写入日志文件. 示例`post-commit`钩子脚本：

``` shell
#!/bin/sh

# Get the commit message
message=$(git log -1 HEAD --pretty=format:%s)

# Get the author and date
author=$(git log -1 HEAD --pretty=format:%an)
date=$(git log -1 HEAD --pretty=format:%ad)

# Write the commit information to a log file
echo "$date $author: $message" >> commit.log

```

#### 定制化模板第三方库
定制化地生成日志，可以使用一些第三方工具，比如 Git Changelog Generator。这个工具可以根据 Git 提交记录自动生成 Markdown 格式的日志，包括版本号、作者、日期、提交信息等。
``` shell
npm install -g conventional-changelog-cli
# -p 参数指定了使用的提交格式
# -i 参数指定了生成的日志文件名
# -s 参数表示将生成的日志追加到现有的日志文件中
conventional-changelog -p angular -i CHANGELOG.md -s
```

## 目标
 - 版本号自增  package.json version / remote version
  - 环境
  - 分支规范
 - 版本日志记录生成 git commit (log规范) / git tag / remote tag / release
  - keep a change log / commitizen 询问的方式
  - commit lint / husks
  - tag / changelog.md


## 版本号自增

 **Semver preRelease 值**         | **使用场景**
--------------------------|--------------------------------------------------------------------------
 alpha                    | 内部测试版本，用于在开发过程中进行内部测试和反馈。不建议在生产环境中使用。
 beta                     | 公测版本，用于向外部用户发布，收集反馈并进行最后的修改。不建议在生产环境中使用。
 rc \(release candidate\) | 候选发布版本，用于进行最后的功能验证和性能测试。不建议在生产环境中使用。
 "" \(空字符串\)              | 正式版本，经过充分测试，可以用于生产环境。
 "1\.2\.3\-pre\.1"        | 预发行版本，表示当前是下一个主版本的预发行版本，例如：1\.2\.3\-pre\.1 表示下一个主版本将是 1\.2\.3。
 "1\.2\.3\-alpha\.1"      | alpha 版本，表示当前是一个内部测试版本，例如：1\.2\.3\-alpha\.1 表示当前是 1\.2\.x 系列的 alpha 版本。。
 "1\.2\.3\-beta\.1"       | beta 版本，表示当前是一个公测版本，例如：1\.2\.3\-beta\.1 表示当前是 1\.2\.x 系列的 beta 版本。


 **交互式CLI依赖库** | **功能介绍**                                              | **示例地址**                                    
---------------|-------------------------------------------------------|---------------------------------------------
 Inquirer\.js  | 提供交互式命令行用户界面，支持多种提问类型、回答存储、校验和过滤等功能。                  | https://github\.com/SBoudrias/Inquirer\.js  
 inquirer      | 基于enquirer\.js的fork版本，继承了enquirer\.js的所有功能，并进行了改进和优化。 | https://github\.com/terkelg/inquirer        
 Commander\.js | 用于构建用户友好的命令行界面，支持自动生成帮助和使用说明等功能。                      | https://github\.com/tj/commander\.js        
 CLI\-table3   | 用于在命令行中创建表格，支持自定义样式和布局等功能。                            | https://www\.npmjs\.com/package/cli\-table3 
 Chalk         | 用于在控制台中输出带颜色和样式的文字，支持跨平台使用。                           | https://www\.npmjs\.com/package/chalk       
 Ora           | 用于在命令行中显示加载动画，支持自定义样式和配置等功能。                          | https://www\.npmjs\.com/package/ora         


