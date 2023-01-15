<h1>Exercise 0.6</h1>
```mermaid
  sequenceDiagram
    participant browser
    participant server


    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    Note right of browser: application/json data
    server->>browser: {"message": "note created"}
```
