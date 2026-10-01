# `.agent/` Migration Manifest

Date: 2026-07-28

Scope: documentation-only lossless organization selected provisionally by Q287 and Batch 058.

Guarantees:

- Application source and legacy `agent/` were not written.
- Every source record was partitioned by stable heading boundaries.
- Each partition was written once to a canonical path.
- Old public paths now contain redirect-only stubs.
- Source reconstruction equality was checked in memory before any redirect was written.

## Source partitions

### `questions/picture-frame-platformer.md`

- Original SHA-256: `81be9a88bf3204abc000f43122745a26d499513a1d297bbac544cba0015ac132`
- Original bytes: 411029
- Note: Exact question blocks retained; current combines the original preamble with the live tail.

| Canonical output | SHA-256 | Bytes | Purpose |
|---|---|---:|---|
| `questions/current.md` | `9f1bf87f96b75aebdee3980b0389192c4de7df8eced50a5eb5ca567644080fb0` | 4318 | preamble plus Q291 and answer handling |
| `questions/archive/q001-100.md` | `6147ae782c4b517bdb7fb57d663ea56b3270f638a6b00fb5c7c7c3a4985a9d32` | 82528 | Questions 001-100 and their batch records |
| `questions/archive/q101-200.md` | `71fa2636ddf4fdb9cea220da8c35911e7062b771b9242c8d9df4a63d2c4de1be` | 145788 | Questions 101-200 and their batch records |
| `questions/archive/q201-285.md` | `053b1a692fc288ad58e706e36ac3cf1a6b32cc9128912e030be366cd4ae6adbb` | 166959 | Questions 201-285 and their batch records |
| `questions/archive/q286-290.md` | `7301a34e9403421a359f317567fd4452ad7d1ed389e66ff83e80c83d32d0eeed` | 11436 | Questions 286-290 and Batch 058 |

### `decisions/picture-frame-platformer.md`

- Original SHA-256: `2e4ddcb81fc44d079a1c15bfd345281fadff2033b27ae30830264056a7fec8b4`
- Original bytes: 236622
- Note: Exact decision blocks retained; the working brief remains separate from immutable batch ledgers.

| Canonical output | SHA-256 | Bytes | Purpose |
|---|---|---:|---|
| `decisions/current-brief.md` | `7ae54db18462dc5f4a121ef4a1e2e055610104a33a749a85f348924a6971ae5b` | 34666 | authority preamble plus consolidated brief and override rule |
| `decisions/ledger/b001-020.md` | `6adc414c2ba97e1aa8f3900e9df02a2142998d8ae393b96ee024ebe842c7a35c` | 55612 | Batches 001-020 |
| `decisions/ledger/b021-040.md` | `6aa310a973b805f5e298ad3525cab5eaafb0190c90a1b63338c4ae6535a94b5d` | 68766 | Batches 021-040 |
| `decisions/ledger/b041-058.md` | `bdafc2a928dc0dac9682d124a6f52f40d63aabc4c470ee5fa52e54d67a081ee4` | 77578 | Batches 041-058 |

### `architecture/provisional-skill-graph.md`

- Original SHA-256: `0e57443ca10e7b73b60a383cc39c2f67617d3b5f96f085a525b5025731555595`
- Original bytes: 164470
- Note: Architecture sections retained exactly and separated by ownership topic.

| Canonical output | SHA-256 | Bytes | Purpose |
|---|---|---:|---|
| `current/architecture/overview.md` | `04286b75ef18be28e8c429072d9780fde345427dcd10b8dd610356fdf95f04bc` | 1978 | overview |
| `current/architecture/orchestrators.md` | `a7b1c926463094acebbb86689612eb02d4768a024ac8cb45f47193d3c2a10f50` | 11812 | orchestrators |
| `current/architecture/handoffs.md` | `5dcfb2bc1cf2f5bfe7edcae652d5b3f984a15ed3e0b9b921d70ea6fb8a4a5ceb` | 9965 | handoffs |
| `current/architecture/spatial.md` | `d6249d9886c55ed9cb3833596f8c49204c01340e2b067d440e49dcdf5afc954b` | 5494 | spatial |
| `current/architecture/assembly.md` | `d2b9e281542dc4c7d4d0674644a360e62727e6b101ae2fae110213ecebb0d11b` | 8142 | assembly |
| `current/architecture/activation.md` | `de084996488538e03e8a8156a547107eb69a38aaa6bf799da7d2018d04f87ad8` | 27679 | activation |
| `current/architecture/packages.md` | `0e1591b69c0a070eb3a7f16ce30ede681f317e21d4a507512d5c2553801a1e2a` | 9569 | packages |
| `current/architecture/lower-skills.md` | `062a9ddf42f47e0ea68ba4eaf16b490776baa4f2c22a2b3fe9331e54d1e0b92d` | 18212 | lower-skills |
| `current/architecture/domain-service.md` | `2a3e86292638220ad3e28258f032bac8d9323b0d08c2755817e2581b103c71e1` | 19450 | domain-service |
| `current/architecture/validation.md` | `b556fd6c0928acae85dc856cca7b75d844f3bdc473f839c8dc68f2b0735c09e2` | 24176 | validation |
| `current/architecture/memory-records.md` | `748aa6f2a658bbe0e533d0e6978ddbb7c139b78651e175b7e60664bbf0979759` | 3111 | memory-records |
| `current/architecture/guidance.md` | `76f417b19868caf3c64498787120bc01ab727b06bdbef9591e1999264870fbea` | 1011 | guidance |
| `current/frontier.md` | `75000e72f9d8044df10a9429f456a8e9e091d80f93b10e30c47f8e1c5211e28c` | 859 | frontier |
| `archive/architecture-batch-recap.md` | `84c08eb23e3f5f961a7e23b07e5013c1362016870ff6f96630721367a8d07419` | 23012 | history |

### `design/provisional-player-experience.md`

- Original SHA-256: `4959c22a433ccd1bd5a2c99fa85d9e8f1559014ac68a2fe747b643b68f39d2a5`
- Original bytes: 81187
- Note: Player-facing sections retained exactly and separated into bounded current topics.

| Canonical output | SHA-256 | Bytes | Purpose |
|---|---|---:|---|
| `current/brief.md` | `92b5d6542b75f3d28564fa58ffaa2b2a48ae2d69b33ee3f520115a10a3c72b4f` | 7826 | brief |
| `current/player-experience/placement.md` | `9b5958e0617a8492b983ebb454b3ea038164afd84a56d38e263f5390f3e5fdb8` | 24500 | placement |
| `current/player-experience/play.md` | `297a40561a5abbd73e90f49560868cfd264122f8db2d499b10a34c6b7cc86892` | 6213 | play |
| `current/player-experience/spatial-visual.md` | `42f6033cca3465d5b36c09ec0af211d8dd283579418feacf7adc729156d9ad95` | 13110 | spatial-visual |
| `current/player-experience/variants.md` | `cda2b5ead4c50df7b9393bd0e327bee1a8d91b66df0a1b20c7d7fb3abdc506dd` | 22387 | variants |
| `current/player-experience/architecture-proof.md` | `804c50154f3018334b0334a9ddc3d50481f05d45e58a5ab6009c54c0dd91df3b` | 7151 | architecture-proof |

### `evidence/current-app-state.md`

- Original SHA-256: `889de9241cea4e0a0f43e1335639a78dbcc9010dae18d3ef5b52ed29cd9127a6`
- Original bytes: 63611
- Note: Evidence sections retained exactly and separated by proof domain.

| Canonical output | SHA-256 | Bytes | Purpose |
|---|---|---:|---|
| `evidence/app-state.md` | `19dbe71886f81d02d5181d0fefb1ede75622f6ff2acc64acbc81fc33b1a6317b` | 53541 | repository, route, runtime, persistence, interaction, and feedback evidence |
| `evidence/spatial.md` | `da3fe8be87d0dbac90c0f686fc1e37fb75eba28e641da1f52639014259ad3f08` | 4693 | spatial-transform evidence |
| `evidence/assets-provenance.md` | `3ca14d0ca576966df6636c5d628153d453e2d8de581b39e3cdc9509813c1e643` | 782 | staged asset evidence |
| `evidence/orchestration.md` | `188ea9475e3870c7ba8ddeee2c5a6c241842fa16a8665dc9c0605d6d2683461c` | 2636 | legacy and proposed orchestration gaps |
| `archive/pre-cleanup-record-shape.md` | `c468855d969b9d82173b756de8cc999d423236c790d97a0046acc1d22aa29a43` | 872 | pre-migration record-size evidence |
| `evidence/boundary.md` | `fe2aa341bd70c8ecf42e712a52c605ddfccc69bf8ba77cfa940f4caa120e96ec` | 1087 | evidence limits and finale-source boundary |

### `ideas/picture-frame-platformer.md`

- Original SHA-256: `f3715717bfb8aaf35b8b6e4bdab1556c5b3d07479d588a1c10fe24fd9835478f`
- Original bytes: 78290
- Note: Idea sections retained exactly; repetitive override reminders moved out of the live idea surface.

| Canonical output | SHA-256 | Bytes | Purpose |
|---|---|---:|---|
| `ideas/current.md` | `3a46ebf5ee3412f769a8dd3d841f93d2f26f4da97c42282c60eaf48655a3c88a` | 1078 | current synthesis and preserved scope signal |
| `ideas/provisional-direction.md` | `a6160774a8993c5d6c61b138b7ac6e5dae6b726d34743542079b5d9961271e20` | 36706 | provisional working direction |
| `ideas/evidence-and-intentions.md` | `f1482886c2a78411ba3c71af43e5ceb2690cc367c88b77dcfb4244778bce9a88` | 1495 | verified/proposed split and preserved intentions |
| `ideas/open.md` | `78f22fe78e97442f90ba4581cf784e8ef16833d9c279b4303d99aa2a4ce193f7` | 35891 | live unresolved production and design details |
| `archive/override-reminders.md` | `d709229ddf4b8c303148be20c309527acd0cc587fb7a342dd8aa8841aef3e8f0` | 3120 | historical batch override reminders |

## Migration-time Output Snapshot

Hashes below capture the immediate migration output before later canonical-current edits. Live hashes are authoritative in `../current/index.md` and the topic indexes.

| Path | SHA-256 | Lines |
|---|---|---:|
| `questions/current.md` | `9f1bf87f96b75aebdee3980b0389192c4de7df8eced50a5eb5ca567644080fb0` | 110 |
| `questions/archive/q001-100.md` | `6147ae782c4b517bdb7fb57d663ea56b3270f638a6b00fb5c7c7c3a4985a9d32` | 2190 |
| `questions/archive/q101-200.md` | `71fa2636ddf4fdb9cea220da8c35911e7062b771b9242c8d9df4a63d2c4de1be` | 3137 |
| `questions/archive/q201-285.md` | `053b1a692fc288ad58e706e36ac3cf1a6b32cc9128912e030be366cd4ae6adbb` | 3092 |
| `questions/archive/q286-290.md` | `7301a34e9403421a359f317567fd4452ad7d1ed389e66ff83e80c83d32d0eeed` | 204 |
| `decisions/current-brief.md` | `7ae54db18462dc5f4a121ef4a1e2e055610104a33a749a85f348924a6971ae5b` | 482 |
| `decisions/ledger/b001-020.md` | `6adc414c2ba97e1aa8f3900e9df02a2142998d8ae393b96ee024ebe842c7a35c` | 1473 |
| `decisions/ledger/b021-040.md` | `6aa310a973b805f5e298ad3525cab5eaafb0190c90a1b63338c4ae6535a94b5d` | 1636 |
| `decisions/ledger/b041-058.md` | `bdafc2a928dc0dac9682d124a6f52f40d63aabc4c470ee5fa52e54d67a081ee4` | 1696 |
| `current/architecture/overview.md` | `04286b75ef18be28e8c429072d9780fde345427dcd10b8dd610356fdf95f04bc` | 48 |
| `current/architecture/orchestrators.md` | `a7b1c926463094acebbb86689612eb02d4768a024ac8cb45f47193d3c2a10f50` | 189 |
| `current/architecture/handoffs.md` | `5dcfb2bc1cf2f5bfe7edcae652d5b3f984a15ed3e0b9b921d70ea6fb8a4a5ceb` | 190 |
| `current/architecture/spatial.md` | `d6249d9886c55ed9cb3833596f8c49204c01340e2b067d440e49dcdf5afc954b` | 114 |
| `current/architecture/assembly.md` | `d2b9e281542dc4c7d4d0674644a360e62727e6b101ae2fae110213ecebb0d11b` | 159 |
| `current/architecture/activation.md` | `de084996488538e03e8a8156a547107eb69a38aaa6bf799da7d2018d04f87ad8` | 437 |
| `current/architecture/packages.md` | `0e1591b69c0a070eb3a7f16ce30ede681f317e21d4a507512d5c2553801a1e2a` | 178 |
| `current/architecture/lower-skills.md` | `062a9ddf42f47e0ea68ba4eaf16b490776baa4f2c22a2b3fe9331e54d1e0b92d` | 134 |
| `current/architecture/domain-service.md` | `2a3e86292638220ad3e28258f032bac8d9323b0d08c2755817e2581b103c71e1` | 278 |
| `current/architecture/validation.md` | `b556fd6c0928acae85dc856cca7b75d844f3bdc473f839c8dc68f2b0735c09e2` | 355 |
| `current/architecture/memory-records.md` | `748aa6f2a658bbe0e533d0e6978ddbb7c139b78651e175b7e60664bbf0979759` | 82 |
| `current/architecture/guidance.md` | `76f417b19868caf3c64498787120bc01ab727b06bdbef9591e1999264870fbea` | 17 |
| `current/frontier.md` | `75000e72f9d8044df10a9429f456a8e9e091d80f93b10e30c47f8e1c5211e28c` | 16 |
| `archive/architecture-batch-recap.md` | `84c08eb23e3f5f961a7e23b07e5013c1362016870ff6f96630721367a8d07419` | 339 |
| `current/brief.md` | `92b5d6542b75f3d28564fa58ffaa2b2a48ae2d69b33ee3f520115a10a3c72b4f` | 140 |
| `current/player-experience/placement.md` | `9b5958e0617a8492b983ebb454b3ea038164afd84a56d38e263f5390f3e5fdb8` | 365 |
| `current/player-experience/play.md` | `297a40561a5abbd73e90f49560868cfd264122f8db2d499b10a34c6b7cc86892` | 117 |
| `current/player-experience/spatial-visual.md` | `42f6033cca3465d5b36c09ec0af211d8dd283579418feacf7adc729156d9ad95` | 207 |
| `current/player-experience/variants.md` | `cda2b5ead4c50df7b9393bd0e327bee1a8d91b66df0a1b20c7d7fb3abdc506dd` | 368 |
| `current/player-experience/architecture-proof.md` | `804c50154f3018334b0334a9ddc3d50481f05d45e58a5ab6009c54c0dd91df3b` | 119 |
| `evidence/app-state.md` | `19dbe71886f81d02d5181d0fefb1ede75622f6ff2acc64acbc81fc33b1a6317b` | 820 |
| `evidence/spatial.md` | `da3fe8be87d0dbac90c0f686fc1e37fb75eba28e641da1f52639014259ad3f08` | 73 |
| `evidence/assets-provenance.md` | `3ca14d0ca576966df6636c5d628153d453e2d8de581b39e3cdc9509813c1e643` | 22 |
| `evidence/orchestration.md` | `188ea9475e3870c7ba8ddeee2c5a6c241842fa16a8665dc9c0605d6d2683461c` | 45 |
| `evidence/boundary.md` | `fe2aa341bd70c8ecf42e712a52c605ddfccc69bf8ba77cfa940f4caa120e96ec` | 21 |
| `ideas/current.md` | `3a46ebf5ee3412f769a8dd3d841f93d2f26f4da97c42282c60eaf48655a3c88a` | 27 |
| `ideas/provisional-direction.md` | `a6160774a8993c5d6c61b138b7ac6e5dae6b726d34743542079b5d9961271e20` | 555 |
| `ideas/evidence-and-intentions.md` | `f1482886c2a78411ba3c71af43e5ceb2690cc367c88b77dcfb4244778bce9a88` | 34 |
| `ideas/open.md` | `78f22fe78e97442f90ba4581cf784e8ef16833d9c279b4303d99aa2a4ce193f7` | 513 |
| `archive/override-reminders.md` | `d709229ddf4b8c303148be20c309527acd0cc587fb7a342dd8aa8841aef3e8f0` | 40 |

## Post-Migration Bounded-File Refinement

Eight large active partitions were split again at existing semantic boundaries. Concatenating each listed child sequence reproduces its migration-time parent hash exactly.

| Migration-time parent | Canonical child sequence | Reconstructed SHA-256 |
|---|---|---|
| `evidence/app-state.md` | `evidence/app-state.md` + `evidence/page05.md` + `evidence/content-runtime.md` + `evidence/page08-progression.md` + `evidence/interaction-feedback.md` | `19dbe71886f81d02d5181d0fefb1ede75622f6ff2acc64acbc81fc33b1a6317b` |
| `current/architecture/activation.md` | `current/architecture/activation.md` + `current/architecture/release-operations.md` + `current/architecture/shared-platformer.md` | `de084996488538e03e8a8156a547107eb69a38aaa6bf799da7d2018d04f87ad8` |
| `current/player-experience/variants.md` | `current/player-experience/variants.md` + `current/player-experience/sections-feedback.md` + `current/player-experience/finale-completion.md` | `cda2b5ead4c50df7b9393bd0e327bee1a8d91b66df0a1b20c7d7fb3abdc506dd` |
| `current/player-experience/placement.md` | `current/player-experience/placement.md` + `current/player-experience/content-integrity.md` | `9b5958e0617a8492b983ebb454b3ea038164afd84a56d38e263f5390f3e5fdb8` |
| `current/architecture/validation.md` | `current/architecture/validation.md` + `current/architecture/performance.md` | `b556fd6c0928acae85dc856cca7b75d844f3bdc473f839c8dc68f2b0735c09e2` |
| `ideas/provisional-direction.md` | `ideas/provisional-direction.md` + `ideas/provisional-direction-visual-gameplay.md` | `a6160774a8993c5d6c61b138b7ac6e5dae6b726d34743542079b5d9961271e20` |
| `ideas/open.md` | `ideas/open.md` + `ideas/open-batch-frontier.md` | `78f22fe78e97442f90ba4581cf784e8ef16833d9c279b4303d99aa2a4ce193f7` |
| `decisions/current-brief.md` | `decisions/current-brief.md` + `decisions/current-brief-gameplay.md` | `7ae54db18462dc5f4a121ef4a1e2e055610104a33a749a85f348924a6971ae5b` |

Live current-record index: `../current/index.md`.
