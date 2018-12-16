import { experimental } from '@angular-devkit/core';
import { Rule, filter } from '@angular-devkit/schematics';
import { WorkspaceSchema } from 'schematics-utilities';
import { pick, flatten } from 'underscore';

export type WorkspaceProject = experimental.workspace.WorkspaceProject;
export type WorkspaceTool = experimental.workspace.WorkspaceTool;
export type WorkspaceTarget = WorkspaceTool[keyof WorkspaceTool];
export interface WorkspaceBuild {
    index: string;
    main: string;
    polyfills: string;
    tsConfig: string;
    assets: string[];
    styles: string[];
    scripts: string[];
}

export function selectTemplate(...paths: string[] | string[][]): Rule {
    const names: string[] = flatten(paths);
    return filter(path => names.includes(path));
}

export function getDefaultProjectName(workspace: WorkspaceSchema): string {
    return workspace.defaultProject as string;
}

export function getWorkspaceProject(workspace: WorkspaceSchema, projectName: string): WorkspaceProject {
    const project = workspace.projects[projectName];

    if (project) {
        return project;
    }

    throw new Error(`Cannot find ${projectName} in angular.json.`);
}

export function getBuildTarget(targets: WorkspaceTool, targetName?: string): WorkspaceTarget {
    if (!targetName) {
        return getDefaultBuildTarget(targets);
    }

    const target = targets[targetName];
    if (target) {
        return target;
    }

    throw new Error('Cannot find build target in angular.json.');
}

const builder = '@angular-devkit/build-angular:browser';
export function getDefaultBuildTarget(targets: WorkspaceTool): WorkspaceTarget {
    const target = Object.values(targets).find((_) => _.builder === builder);

    if (target) {
        return target;
    }

    throw new Error('Cannot find default build target in angular.json.');
}

const WORKSPACE_ATTRIBUTES = ['name', 'index', 'main', 'polyfills', 'tsConfig', 'assets', 'styles', 'scripts'];
export function getWorkspaceBuild(target: WorkspaceTarget): WorkspaceBuild {
    return pick(target.options, WORKSPACE_ATTRIBUTES);
}
