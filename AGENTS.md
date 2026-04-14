# Gift Certificates Manager Example Lab Project

This is an example developer project demonstrating how to build a single-click app to integrate with BigCommerce.

The app is built using Next.js. It incorporates a standard auth workflow enabling single-click installation from a BigCommerce store control panel.

## Lab Steps and Commit History

The commit history of the repository is important and represents the steps of the developer labs. Each commit starting with the `starter` tag demonstrates the code changes in a lab step.

## File Removal - Protected Paths

When creating a clean orphan branch, the following additional file paths should be protected from removal:

* `.env.local`

## Framework Install Command

The base framework is Next.js. Use `pnpm create`:

```
pnpm create next-app@<version> tmp-nextjs-test --ts --no-linter --no-tailwind --no-src-dir --app --no-turbopack --no-import-alias
```

After re-installing the framework, make sure an appropriate version of Node.js is installed according to `.nvmrc` and use `pnpm install` to install dependencies.