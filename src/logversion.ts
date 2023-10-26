const semver = require('semver');
let { version } = require('../package.json');
const { execSync } = require('child_process');

const execSyncCmd = (cmd) => {
    const rst =  execSync(cmd);
    return rst.toString("utf8").trim();
};
// const version = '1.2.3-alpha.1';

const parsed = semver.parse(version);

console.log(parsed);

// Output: { major: 1, minor: 2, patch: 3, pre: [ 'alpha', 1 ], raw: '1.2.3-alpha.1', version: '1.2.3-alpha.1' }

// const versionNext = semver.inc(version, 'prerelease', '');

// console.log(versionNext);


// execSyncCmd();

const createVersionDev = (v) => {
    const versionDev = semver.inc(v, 'prerelease', 'alpha');
    console.log(versionDev); // 1.2.3-beta.2
    return versionDev;
}

const createVersionTest = (v) => {
    const versionTest = semver.inc(v, 'prerelease', 'beta');
    console.log(versionTest); // 1.2.3-beta.2
    return versionTest;
}
const createVersionTestHotFix = (v) => {
    const versionTestHotfix = semver.inc(v, 'prerelease', 'beta');
    console.log(versionTestHotfix); // 1.2.3-beta.2
    return versionTestHotfix;
}

const createVersionOnline = (v) => {
    const versionOnline = semver.inc(v, 'patch');
    console.log(versionOnline); // 1.2.3-beta.2
    return versionOnline;
}
const createVersionHotfix = (v) => {
    const versionHotfix = semver.inc(v, 'patch');
    console.log(versionHotfix); // 1.2.3-beta.2
    return versionHotfix;
}

const  createVersionNew = (v, vType='minor') => {
    const versionNew = semver.inc(v, `pre${vType}`, 'alpha');
    console.log(versionNew); // 1.2.3-beta.2
    return versionNew;
}

// 新版本开发 →  本地开发特性 →  测试 →  热修复 →  新版本 → 热修复
console.log(`\n【开发】alpha阶段(初始)`);
console.log(`新特性(缺省)`);
version = createVersionNew(version);
console.log(`新版本`);
version = createVersionNew(version, 'major');
console.log(`问题修复`);
version = createVersionNew(version, 'patch');
console.log(`\n【开发】alpha阶段`);
version = createVersionDev(version);
version = createVersionDev(version);
console.log(`\n【测试】beta阶段`);
version = createVersionTest(version);
console.log(`\n【测试】阶段-热修复`);
version = createVersionTestHotFix(version);
version = createVersionTestHotFix(version);
console.log(`\n【上线】阶段`);
version = createVersionOnline(version);
console.log(`\n【上线】阶段 - 热修复`);
version = createVersionHotfix(version);

console.log(`\n新版本`);
version = createVersionNew(version, 'major');
console.log(`\n流程循环`);
version = createVersionDev(version);
version = createVersionDev(version);
version = createVersionTest(version);
version = createVersionTestHotFix(version);
version = createVersionTestHotFix(version);
version = createVersionOnline(version);
version = createVersionHotfix(version);