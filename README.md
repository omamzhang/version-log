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
  - 
 - 版本日志记录生成 git commit (log规范) / git tag / remote tag / release
  - keep a change log / commitizen 询问的方式
  - commit lint / husks
  - tag / changelog.md

