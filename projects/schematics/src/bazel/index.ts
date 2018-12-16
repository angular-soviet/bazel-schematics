import { Rule, chain, schematic } from '@angular-devkit/schematics';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function bazel(_options: any): Rule {
  return () => {
    return chain([
      schematic('workspace', _options),
      schematic('project', _options)
    ]);
  };
}
