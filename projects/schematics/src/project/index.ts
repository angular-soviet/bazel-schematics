import { Rule, SchematicContext, Tree, apply, url, template, move, chain, branchAndMerge, mergeWith } from '@angular-devkit/schematics';
import { getWorkspace, getProjectTargets } from 'schematics-utilities';
import { getWorkspaceProject, getDefaultProjectName, getBuildTarget, getWorkspaceBuild, WorkspaceBuild } from '../utils';

interface ProjectBuildOptions extends WorkspaceBuild {
    projectName: string;
    sourceRoot: string;
}

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function project(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const rootWorkspace = getWorkspace(tree);

        const projectName = _options.projectName || getDefaultProjectName(rootWorkspace);
        const project = getWorkspaceProject(rootWorkspace, projectName);
        const sourceRoot = project.sourceRoot;

        const targets = getProjectTargets(project);
        const target = getBuildTarget(targets);

        const buildOptions = getWorkspaceBuild(target);

        console.log(project);

        if (sourceRoot) {
            const templateSource = apply(url('./files'), [
                template(normalazeOptions({
                    ...buildOptions,
                    projectName,
                    sourceRoot
                })),
                move(sourceRoot)
            ]);

            return chain([
                branchAndMerge(chain([
                    mergeWith(templateSource)
                ]))
            ]);
        }
    };
}

function normalazeOptions(options: ProjectBuildOptions): ProjectBuildOptions {
    return {
        ...options,
        index: normalazePath(options.sourceRoot, options.index),
        main: normalazePath(options.sourceRoot, options.main),
        polyfills: normalazePath(options.sourceRoot, options.polyfills),
        tsConfig: normalazePath(options.sourceRoot, options.tsConfig)
    };
}

function normalazePath(from: string, to: string): string {
    return to.replace(from + '/', '');
}
