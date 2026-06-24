# Output Rules

Status: active

Template:

Use the current contents of output.md as the deploy chat message.

Variables that may be supported later:

- output = contents of output.md
- title = first line of output.md
- summary = short summary line from output.md
- changed_files = changed files from the current push
- live_url = live deployed page URL

Rules:

- Keep messages very short.
- Do not include repo metadata unless requested.
- Do not include old history.
- Only describe the latest push.
- Update output.md on every agent-made change.
