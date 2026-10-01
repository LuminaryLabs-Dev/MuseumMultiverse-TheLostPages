### Candidate Performance Gate

Batch 056 provisionally defines three predeclared G8 classes—C1 minimum, C2
standard, and C3 enhanced—selected and pinned before activation, while leaving
direct user override open. Every class retains the same authoritative `60 Hz`
simulation, route geometry, collision, commands, hazards, critical cues,
checkpoints, saves, completion, and rewards. Only dressing, particles, shadows,
secondary motion, texture resolution, and other already-proven neutral
presentation may scale.

| Budget | C1 minimum | C2 standard | C3 enhanced |
| --- | ---: | ---: | ---: |
| Active-render p95 frame interval | `22.2 ms` | `16.7 ms` | `16.7 ms` |
| Active-render p99 frame interval | `33.3 ms` | `25 ms` | `25 ms` |
| Fully cached placement-ready p95 | `2.5 s` | `2.0 s` | `1.5 s` |
| Page 05 current-variant critical transfer | `16 MiB` | `20 MiB` | `28 MiB` |
| Accounted decoded CPU plus GPU live memory | `256 MiB` | `384 MiB` | `512 MiB` |
| Maximum preparation-staging overhead | `25%` | `25%` | `25%` |
| Leased active or resumable route bytes | `64 MiB` | `96 MiB` | `128 MiB` |
| Origin-cache soft limit | `256 MiB` | `512 MiB` | `768 MiB` |

Across every class, the candidate additionally requires:

- command-to-present p95 `<=50 ms`, zero app-attributable main-thread tasks
  `>=50 ms`, zero observed tasks `>=100 ms`, zero dropped or merged semantic
  ticks, and no backlog beyond four ticks without the typed state-preserving
  performance pause;
- on a pinned `10 Mbps`, `80 ms` reference profile, cold shell interaction p95
  `<=3.0 s`, warm interaction `<=1.0 s`, and compressed initial shell transfer
  `<=2.5 MiB`;
- only neutral optional dressing may stream after the critical current-variant
  set; required gameplay, cues, recovery, or readability content may not;
- cache preflight retains at least the greater of `64 MiB` or `20%` of origin
  quota as headroom, otherwise blocking reveal with the exact `Make Space`
  recovery instead of evicting leased bytes;
- the committed `1500 ms` checkpoint fold or `200 ms` reduced-motion crossfade,
  `<=2 ms` incremental GPU work, `<=8 MiB` transition memory, no
  transition-time I/O or compilation, and one-rendered-frame atomic reveal;
- a `20 min` foreground soak with no session loss, critical thermal warning,
  unplanned tier change, performance pause, or more than `10%` degradation
  between p95 frame time at minutes 3-5 and minutes 16-20;
- after twenty route enter/exit and ten cancel/retry cycles, zero additional
  RAF loops, workers, WebGL contexts, event listeners, leases, reservations,
  or scene roots, with accounted memory returning within the greater of
  `8 MiB` or `5%` of magazine baseline in `5 s`.

Each of the six physical gate devices contributes five cold launches, ten
warm/cached activations, three complete runs, one soak, and the lifecycle
cycles. Evidence reports p50, p95, p99, and worst per device and binds the
exact build, runtime, catalog, recipe, assets, tier manifest, calibration, and
frame hashes. No aggregate may hide an individual device failure. O5 fails the
supported class when any hard limit fails. These targets are discovery
proposals, not measured current capability or an implemented profiler.

Current result: all gates are unproven for the proposed combined experience.

