import { Rule, SchematicContext, Tree, apply, template, url, chain, mergeWith, move, branchAndMerge } from '@angular-devkit/schematics';
import { getProjectTargets, getWorkspace } from 'schematics-utilities';
import { getBuildTarget, getWorkspaceBuild, getWorkspaceProject, getDefaultProjectName } from '../utils';

const defaultOptions = {
    useNpm: false,
    useNodeModules: true
};

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function workspace(_options: any): Rule {
    return (tree: Tree, _context: SchematicContext) => {
        const rootWorkspace = getWorkspace(tree);

        const projectName = _options.projectName || getDefaultProjectName(rootWorkspace);
        const project = getWorkspaceProject(rootWorkspace, projectName);

        const targets = getProjectTargets(project);
        const target = getBuildTarget(targets);

        const buildOptions = getWorkspaceBuild(target);

        const templateSource = apply(url('./files'), [
            template({ ...defaultOptions, ...buildOptions, projectName }),
            move(tree.root.path)
        ]);

        return chain([
            branchAndMerge(chain([
                mergeWith(templateSource)
            ]))
        ]);
    };
}
