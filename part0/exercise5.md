<h1>Exercise 0.5</h1>

```mermaid
  sequenceDiagram
      participant browser
      participant server

      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
      server->>browser: html
      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
      server->>browser: main.css
      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
      server->>browser: spa.js
      browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
      server->>browser: data.json
 ```
