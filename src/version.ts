const semver = require('semver');
let { version } = require('../package.json');
const { execSync } = require('child_process');

const execSyncCmd = (cmd:string) => {
    const rst =  execSync(cmd);
    return rst.toString("utf8").trim();
};
// const version = '1.2.3-alpha.1';

const parsed = semver.parse(version);

console.log(parsed);

// Output: { major: 1, minor: 2, patch: 3, pre: [ 'alpha', 1 ], raw: '1.2.3-alpha.1', version: '1.2.3-alpha.1' }

// const versionNext = semver.inc(version, 'prerelease', '');

// console.log(versionNext);

/*  校验分支规范：
    本地开发需求feature/x.xx.x  -> major.minor.patch-alpha.[x+1]
    hotfix/x.xx.x-test  -> major.minor.patch+1-beta.[x+1]
    version/x.xx.x  -> major.minor.patch-beta.[x+1]
    master_gray  =>  major.minor.patch-rc.[x+1]
    master  =>  [major+1].[minor+1].[patch+1]
 */
enum SEMVER_PREFIX {
    INNER = 'alpha',
    OPEN = 'beta',
    CANDIDATE = 'rc',
    OFFICAL = ''
}
enum BRANCHNAME_PREFIX {
    feature = 'feature',
    dev = 'dev',
    hotfix = 'hotfix',
    version ='version',
    master ='master'
}

const PrereleasePrefixMap = {
    feature: 'alpha',
    dev: 'alpha',
    hotfix: 'beta',
    version:'beta',
    master:''
};

const branchName = execSyncCmd('git branch --show-current') ?? 'feature';
const branchNamePrefix = [];
console.log('branchName', (branchName.split('/'))[0]);

const thePrereleasePrefix = PrereleasePrefixMap[branchName as keyof typeof PrereleasePrefixMap];
const createVersion = (v:string) => {
    if(thePrereleasePrefix) {
        const theVersion = semver.inc(v, 'prerelease', thePrereleasePrefix);
        console.log(theVersion);
    } else {
        let versionType = ''; // 交互式选择版本号
        const theVersion = semver.inc(v, versionType);
    }
};

const createVersionDev = (v:string) => {
    const versionDev = semver.inc(v, 'prerelease', 'alpha');
    console.log(versionDev); // 1.2.3-beta.2
    return versionDev;
}

const createVersionTest = (v:string) => {
    const versionTest = semver.inc(v, 'prerelease', 'beta');
    console.log(versionTest); // 1.2.3-beta.2
    return versionTest;
}
const createVersionTestHotFix = (v:string) => {
    const versionTestHotfix = semver.inc(v, 'prerelease', 'beta');
    console.log(versionTestHotfix); // 1.2.3-beta.2
    return versionTestHotfix;
}

const createVersionOnline = (v:string) => {
    const versionOnline = semver.inc(v, 'patch');
    console.log(versionOnline); // 1.2.3-beta.2
    return versionOnline;
}
const createVersionHotfix = (v:string) => {
    const versionHotfix = semver.inc(v, 'patch');
    console.log(versionHotfix); // 1.2.3-beta.2
    return versionHotfix;
}

const  createVersionNew = (v:string, vType='minor') => {
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