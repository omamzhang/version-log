// const { execSync } = require('child_process');
const fs = require('fs');

// 获取当前日期和时间作为标签
const getTag = () => {
  const timestamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').replace(/\.\d+Z$/, '');
  return `v${timestamp}`;
};

// 生成日志文件名
const getLogFileName = (tag:string) => {
  return `log_${tag}.txt`;
};

// 生成日志信息
const generateLog = (tag:string, commitMessage:string) => {
  const logEntry = `Tag: ${tag}\nLog message: ${commitMessage}\n\n`;
  return logEntry;
};

// 执行 Git 命令
const executeGitCommand = (command:string) => {
  try {
    const output = execSync(command, { encoding: 'utf8' });
    return output.trim();
  } catch (error) {
    console.error(`Failed to execute Git command: ${command}`);
    console.error(error);
    return '';
  }
};

// 自动生成日志并打标签
const generateLogAndTag = () => {
  const tag = getTag();

  // 获取最新的提交信息
  const latestCommit = executeGitCommand('git log --format=%B -n 1 HEAD');

  // 生成日志信息
  const logEntry = generateLog(tag, latestCommit);

  // 写入日志文件
  const logFileName = getLogFileName(tag);
  fs.writeFileSync(logFileName, logEntry);

  // 提交日志文件
  executeGitCommand(`git add ${logFileName}`);
  executeGitCommand(`git commit -m "Add log file for tag ${tag}"`);
  executeGitCommand(`git tag ${tag}`);
  executeGitCommand('git push --tags');
};

// 示例使用：调用 generateLogAndTag() 函数来生成日志并打标签
generateLogAndTag();