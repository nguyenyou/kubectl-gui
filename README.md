# Kubectl GUI

## Pre-requisites:

- Node.js v16.15

```
curl -fsSL https://fnm.vercel.app/install | bash
```
Add the following to your .zshrc profile:

```
eval "$(fnm env --use-on-cd)"
```

- Rust 1.65.0
```
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

## How to build
```
corepack enable
pnpm install
pnpm tauri build
```