# Lost Pages Experience Model

Status: supporting content scaffold

## Purpose

This document defines what a Lost Pages page experience must contain before an agent builds or changes it.

## Required experience anatomy

```text
Experience
├── page identity
├── printed-page promise
├── QR route
├── Start AR / fallback gate
├── scene setup
├── interaction loop
├── feedback system
├── reward state
├── debug state
└── copy-sync contract
```

## Page identity

Each experience needs:

- page number
- title
- slug
- QR title
- collectible/reward
- primary verb
- story beat
- print page path
- source module path

## Launch states

1. **Unloaded** — user has opened route but runtime has not started.
2. **Start gate** — page explains what will happen and offers `Start AR` or fallback.
3. **Scene ready** — visual surface has loaded.
4. **Interaction active** — player can perform the page verb.
5. **Reward ready** — objective complete and collectible can be claimed or shown.
6. **Complete** — progress is persisted and user can exit, replay, or continue.

## Desktop vs phone behavior

Desktop debug routes may simulate the experience. Phone AR routes should not be claimed as tested until the phone path is actually tested and recorded.

## Copy-sync contract

The following must not drift:

```text
print/magazine-pages/<page>.md
src/experiences/<slug>/copy.js
src/ar/registry/experiences.js
launcher QR label
public route
page docs
reward slot
```

## Agent build rule

Before changing implementation, an auto agent must read the page folder under `docs/pages/`, confirm the slug and route, then inspect only the implementation files needed for that page.
