import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as fs from 'fs-extra';
import * as childProcess from 'child_process';

@Injectable()
export class GitUtil implements OnApplicationBootstrap {

    async onApplicationBootstrap() {
        try {
            console.log(['START GIT PROCESS']);

            const path = `/home/harshil/Desktop/Harshil Refrences/Rajkot-Code backup/animesh`;
            const folders = await fs.readdir(path);
            console.log(['Folders', folders]);

            let names = {
                '3837': 'https://harshilsolanki:glpat-P9Ngmy716_qjzxYty3ss@git.zerozone.com/ace-infoway/animesh-santoki/3837.git',
                '3863': 'https://harshilsolanki:glpat-P9Ngmy716_qjzxYty3ss@git.zerozone.com/ace-infoway/animesh-santoki/3863.git',
                '3921': 'https://harshilsolanki:glpat-P9Ngmy716_qjzxYty3ss@git.zerozone.com/ace-infoway/animesh-santoki/3921.git',
                '3971': 'https://harshilsolanki:glpat-P9Ngmy716_qjzxYty3ss@git.zerozone.com/ace-infoway/animesh-santoki/3971.git',
            }

            for (const folder of folders) {
                const projectFolderPath = `${path}/${folder}`;
                let url = names[folder];
                console.log(['URL:' + url]);

                if ((await fs.stat(projectFolderPath)).isDirectory() && url) {
                    
                    process.chdir(projectFolderPath);   // Navigate into the project folder
                    console.log(['Test-1']);
                    childProcess.execSync('git init');
                    console.log(['Test-2']);
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
                        console.log(`No changes to commit in ${folder}. Skipping commit.`);
                    }
                    console.log(['Test-6']);

                    // Navigate back to the projects folder
                    process.chdir(path);
                }
            }

            console.log(['END GIT PROCESS']);
        } catch (error) {
            throw new Error(`Error initializing projects: ${error.message}`);
        }
    }
}
