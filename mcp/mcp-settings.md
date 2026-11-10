# MCP Settings

Add this to activate the MCP server in your agent client.

```json
{
  "mcpServers": {
    "fractalstyler": {
      "command": "npx",
      "args": ["-y", "@fractaldesign/fractalstyler", "mcp"]
    }
  }
}
```

The server speaks MCP over stdio. It is TypeScript, run through the package's
launcher — it needs **Node 22.18 or newer**, which is what the package asks
for.

Working on the package itself? Point at the source instead of the published
package:

```json
{
  "mcpServers": {
    "fractalstyler": {
      "command": "node",
      "args": ["/absolute/path/to/packages/fractalstyler/mcp/server.ts"]
    }
  }
}
```
