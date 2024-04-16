// git.service.ts

import { Injectable } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as childProcess from 'child_process';

@Injectable()
export class GitUtil {
    async initializeProjects(parentFolderPath: string, projectsFolderName: string): Promise<void> {
        const projectsFolderPath = `${parentFolderPath}/${projectsFolderName}`;

        try {
            const projects = await fs.readdir(projectsFolderPath);
            console.log(['projects', projects]);

            let names = {
                '3837': 'https://harshilsolanki:glpat-P9Ngmy716_qjzxYty3ss@git.zerozone.com/ace-infoway/animesh-santoki/3837.git',
                '3863': 'https://harshilsolanki:glpat-P9Ngmy716_qjzxYty3ss@git.zerozone.com/ace-infoway/animesh-santoki/3863.git',
                '3921': 'https://harshilsolanki:glpat-P9Ngmy716_qjzxYty3ss@git.zerozone.com/ace-infoway/animesh-santoki/3921.git',
                '3971': 'https://harshilsolanki:glpat-P9Ngmy716_qjzxYty3ss@git.zerozone.com/ace-infoway/animesh-santoki/3971.git',
            }

            for (const project of projects) {
                const projectFolderPath = `${projectsFolderPath}/${project}`;
                // console.log(['project', project]);
                // console.log(['projectFolderPath', projectFolderPath]);
                let url = names[project];
                console.log(['URL:' + url]);

                if ((await fs.stat(projectFolderPath)).isDirectory() && url) {
                    // Navigate into the project folder
                    process.chdir(projectFolderPath);

                    // Run git commands
                    console.log(['Test-1']);
                    childProcess.execSync('git init');
                    console.log(['Test-2']);
                    // childProcess.execSync(`git remote add origin https://git.zerozone.com/ace-infoway/animesh-santoki/${project}.git`);
                    // childProcess.execSync(`git remote add origin ${names[project]}`);
                    childProcess.execSync(`git config remote.origin.url ${url}`);
                    console.log(['Test-3']);
                    childProcess.execSync('git add .');
                    console.log(['Test-4']);
                    const gitStatus = childProcess.execSync('git status --porcelain').toString().trim();
                    console.log(['Test-5']);
                    if (gitStatus !== '') {
                        console.log(['Test-5.1']);
                        childProcess.execSync('git commit -m "Project Initialized"');
                        console.log(['Test-5.2']);
                        childProcess.execSync('git push --set-upstream origin master');
                    } else {
                        console.log(`No changes to commit in ${project}. Skipping commit.`);
                    }
                    console.log(['Test-6']);

                    // Navigate back to the projects folder
                    process.chdir(projectsFolderPath);
                }
            }
        } catch (error) {
            throw new Error(`Error initializing projects: ${error.message}`);
        }
    }
}

async function executeGitUtil() {
    try {
        console.log(['START GIT PROCESS']);
        const gitUtil = new GitUtil();
        await gitUtil.initializeProjects('/home/harshil/Desktop/Harshil Refrences/Rajkot-Code backup', 'animesh')
            .then(() => console.log("Migrations executed successfully in all databases"))
            .catch(error => console.error("Error executing migrations:", error));


        console.log(['END GIT PROCESS']);
    } catch (error) {
        console.error("Migration process failed:", error);
    }
}

executeGitUtil();
