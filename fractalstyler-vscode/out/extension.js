"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/extension.ts
var extension_exports = {};
__export(extension_exports, {
  FractalstylerViewProvider: () => FractalstylerViewProvider,
  activate: () => activate,
  deactivate: () => deactivate
});
module.exports = __toCommonJS(extension_exports);
var vscode2 = __toESM(require("vscode"));
var fs2 = __toESM(require("fs"));
var path2 = __toESM(require("path"));

// src/registry.ts
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
function tokenFor(selector) {
  if (/\s/.test(selector)) {
    return null;
  }
  if (selector.includes("[")) {
    return null;
  }
  if (selector.includes(":")) {
    return null;
  }
  const parts = selector.split(".");
  const classes = parts.slice(1);
  if (classes.length === 0) {
    return null;
  }
  return classes[classes.length - 1];
}
function findRegistryUpward(dir) {
  let current = dir;
  for (let depth = 0; depth < 5 && current; depth++) {
    const candidate = path.join(current, "registry.json");
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    const parent = path.dirname(current);
    if (parent === current) {
      break;
    }
    current = parent;
  }
  return null;
}
var ClassRegistry = class {
  entries = /* @__PURE__ */ new Map();
  loadedFrom = "";
  classCount = 0;
  /** Where the registry was read from — shown in the hover/status. */
  get source() {
    return this.loadedFrom;
  }
  get size() {
    return this.classCount;
  }
  all() {
    return [...this.entries.values()];
  }
  get(name) {
    return this.entries.get(name);
  }
  has(name) {
    return this.entries.has(name);
  }
  /**
   * Load the registry, preferring a project-local copy over the bundled one.
   *
   * The bundled copy is refreshed by `npm run sync:registry` at release time,
   * so it is correct for the package version the user installed. A registry.json
   * found next to the project's styles folder is newer still (an ejected copy
   * being edited in place) and wins.
   */
  load(extensionUri, stylesDir) {
    const local = stylesDir ? findRegistryUpward(stylesDir) : null;
    const bundled = path.join(extensionUri.fsPath, "media", "registry.json");
    const chosen = local ?? (fs.existsSync(bundled) ? bundled : null);
    if (!chosen) {
      return false;
    }
    try {
      const rows = JSON.parse(fs.readFileSync(chosen, "utf8"));
      this.ingest(Array.isArray(rows) ? rows : []);
      this.loadedFrom = local ? `${chosen} (project)` : `${chosen} (bundled)`;
      return true;
    } catch {
      return false;
    }
  }
  ingest(rows) {
    this.entries.clear();
    this.classCount = 0;
    for (const row of rows) {
      const selector = row?.class ?? "";
      const token = tokenFor(selector);
      if (!token) {
        continue;
      }
      const description = row?.description ?? "";
      const useful = description && description !== row?.property && !/^\s*[a-z-]+:/.test(description) ? description : "";
      const entry = {
        name: token,
        selector,
        kind: row?.kind ?? "class",
        layer: row?.layer ?? "",
        file: row?.file ?? "",
        property: row?.property ?? "",
        description: useful,
        example: row?.example ?? ""
      };
      const existing = this.entries.get(token);
      if (!existing || !existing.description && entry.description) {
        this.entries.set(token, entry);
      }
    }
    this.classCount = this.entries.size;
  }
};

// src/completion.ts
var vscode = __toESM(require("vscode"));
var SUPPORTED_LANGUAGES = [
  "html",
  "svelte",
  "vue",
  "astro",
  "javascriptreact",
  "typescriptreact",
  "angular"
];
var TRIGGER_CHARS = ['"', "'", " ", "	"];
function insideClassAttribute(lineBeforeCursor) {
  const openers = [
    /(?<![\w-])(?:class|className|:class|class:)\s*=\s*(?:\{)?\s*$/,
    // Allow a brace between = and the quote so `className={`row ` matches too.
    /(?:class|className|:class|class:)\s*=\s*\{?\s*["'`]([^"'`]*)$/,
    /["'`]\s*(?:class|className|:class|class:)\s*=\s*(?:\{)?\s*$/,
    /\sclass\s*=\s*\{[^}]*$/,
    /\sclass:\s*["'][^"']*$/
  ];
  return openers.some((re) => re.test(lineBeforeCursor));
}
function currentWord(lineBeforeCursor) {
  const match = /([\w-]+)$/.exec(lineBeforeCursor);
  return match ? match[1] : "";
}
function inClassAttributeAt(line, index) {
  const before = line.slice(0, index);
  const opener = /(?<![\w-])(?:class|className|:class|class:)\s*=\s*(?:\{)?\s*["'`]?/g;
  let last = null;
  let m;
  while ((m = opener.exec(before)) !== null) {
    last = m;
  }
  if (!last) {
    return false;
  }
  return !/["'`]/.test(before.slice(last.index + last[0].length));
}
function classesInAttribute(lineBeforeCursor) {
  const match = /(?:class|className|:class|class:)\s*=\s*(?:\{)?\s*["'`]([^"'`]*)$/.exec(
    lineBeforeCursor
  );
  const body = match ? match[1] : "";
  return new Set(
    body.split(/\s+/).map((c) => c.trim()).filter(Boolean)
  );
}
function kindLabel(kind) {
  switch (kind) {
    case "family":
      return "family";
    case "modifier":
      return "modifier";
    case "variant":
      return "variant";
    case "child":
      return "child";
    case "compound":
      return "compound";
    case "element":
      return "element";
    default:
      return "class";
  }
}
function buildItem(entry, alreadyUsed) {
  const item = new vscode.CompletionItem(entry.name, vscode.CompletionItemKind.Class);
  item.detail = entry.selector !== `.${entry.name}` ? entry.selector : void 0;
  item.insertText = entry.name;
  item.filterText = entry.name;
  item.sortText = `${alreadyUsed.has(entry.name) ? "1" : "0"}${entry.name}`;
  item.documentation = new vscode.MarkdownString(hoverBody(entry));
  if (alreadyUsed.has(entry.name)) {
    item.detail = `${item.detail ? `${item.detail} \xB7 ` : ""}already in this class attribute`;
  }
  return item;
}
function hoverBody(entry) {
  const lines = [];
  if (entry.description) {
    lines.push(entry.description);
  } else if (entry.property) {
    lines.push("```sass", entry.property, "```");
  } else {
    lines.push("Fractalstyler class with no recorded description.");
  }
  if (entry.property && entry.description) {
    lines.push("", "```sass", entry.property, "```");
  }
  lines.push("", `*${entry.selector}* \u2014 ${kindLabel(entry.kind)}`);
  if (entry.layer) {
    lines.push(`Layer ${entry.layer} \xB7 \`${entry.file}\``);
  }
  if (entry.example) {
    lines.push("", entry.example.replace(/…/g, "\u2026"));
  }
  return lines.join("\n\n");
}
var ClassCompletionProvider = class {
  constructor(registry) {
    this.registry = registry;
  }
  provideCompletionItems(document, position) {
    const lineBefore = document.lineAt(position.line).text.slice(0, position.character);
    if (!insideClassAttribute(lineBefore)) {
      return [];
    }
    if (this.registry.size === 0) {
      return [];
    }
    const used = classesInAttribute(lineBefore);
    const typed = currentWord(lineBefore);
    const items = [];
    for (const entry of this.registry.all()) {
      if (typed && !entry.name.startsWith(typed)) {
        continue;
      }
      items.push(buildItem(entry, used));
    }
    return items;
  }
};
var ClassHoverProvider = class {
  constructor(registry) {
    this.registry = registry;
  }
  provideHover(document, position) {
    const range = document.getWordRangeAtPosition(position, /[\w-]+/);
    if (!range) {
      return null;
    }
    const word = document.getText(range);
    if (!word) {
      return null;
    }
    const line = document.lineAt(position.line).text;
    if (!inClassAttributeAt(line, range.start.character)) {
      return null;
    }
    const entry = this.registry.get(word);
    if (!entry) {
      return null;
    }
    return new vscode.Hover(new vscode.MarkdownString(hoverBody(entry)), range);
  }
};
function registerClassProviders(context, registry) {
  const selector = SUPPORTED_LANGUAGES.map((language) => ({ language }));
  context.subscriptions.push(
    vscode.languages.registerCompletionItemProvider(selector, new ClassCompletionProvider(registry), ...TRIGGER_CHARS),
    vscode.languages.registerHoverProvider(selector, new ClassHoverProvider(registry))
  );
}

// src/extension.ts
var output = vscode2.window.createOutputChannel("Fractalstyler");
function outputLine(message) {
  output.appendLine(message);
}
function activate(context) {
  context.subscriptions.push(output);
  const provider = new FractalstylerViewProvider(context.extensionUri, context);
  const registry = new ClassRegistry();
  registry.load(context.extensionUri, provider.getStylesDirectory());
  registerClassProviders(context, registry);
  outputLine(
    registry.size ? `Fractalstyler: ${registry.size} classes loaded from ${registry.source}` : "Fractalstyler: registry not found \u2014 class completions are unavailable"
  );
  context.subscriptions.push(
    provider.onStylesDirectoryChanged(() => {
      if (registry.load(context.extensionUri, provider.getStylesDirectory())) {
        outputLine(
          `Fractalstyler: registry reloaded \u2014 ${registry.size} classes from ${registry.source}`
        );
      }
    })
  );
  context.subscriptions.push(
    vscode2.window.registerWebviewViewProvider("fractalstyler.view", provider, {
      webviewOptions: {
        retainContextWhenHidden: true
      }
    })
  );
  context.subscriptions.push(
    vscode2.window.registerWebviewViewProvider("fractalstyler.panelView", provider, {
      webviewOptions: {
        retainContextWhenHidden: true
      }
    })
  );
  context.subscriptions.push(
    vscode2.commands.registerCommand("fractalstyler.openCurrentInEditor", (filename, line) => {
      provider.openCurrentInEditor(filename, line);
    })
  );
  context.subscriptions.push(
    vscode2.commands.registerCommand("fractalstyler.newFile", () => {
      provider.promptNewFile();
    })
  );
  context.subscriptions.push(
    vscode2.commands.registerCommand("fractalstyler.openStylesFolder", () => {
      provider.openStylesFolder();
    })
  );
  context.subscriptions.push(
    vscode2.commands.registerCommand("fractalstyler.pickStylesFolder", () => {
      provider.pickStylesFolder();
    })
  );
  context.subscriptions.push(
    vscode2.commands.registerCommand("fractalstyler.toggleDrawer", () => {
      provider.toggleDrawer();
    })
  );
  context.subscriptions.push(
    vscode2.commands.registerCommand("fractalstyler.focusSearch", () => {
      provider.focusSearch();
    })
  );
  context.subscriptions.push(
    vscode2.commands.registerCommand("fractalstyler.pinCurrentFile", () => {
      provider.togglePinCurrent();
    })
  );
}
function deactivate() {
}
var FractalstylerViewProvider = class _FractalstylerViewProvider {
  constructor(_extensionUri, _context) {
    this._extensionUri = _extensionUri;
    this._context = _context;
    const savedPins = this._context.workspaceState.get("pinnedFiles");
    if (savedPins && Array.isArray(savedPins) && savedPins.length > 0) {
      this.pinnedFiles = savedPins;
    }
    this.setupWatcher();
  }
  _view;
  currentFilename = "_04_layouts.sass";
  pinnedFiles = ["_00_tokens.sass", "_04_layouts.sass"];
  fsWatcher;
  // Track self-saves to prevent file-watcher feedback loops that reset cursor
  lastSavedContent = /* @__PURE__ */ new Map();
  lastSavedTime = /* @__PURE__ */ new Map();
  lastNoDirectoryNotice;
  /**
   * Candidate styles folders, most specific first. The first hit per workspace
   * folder wins, so a project that owns its styles (fractalstyler itself, or an
   * ejected copy) is used from the working tree, and only a project without one
   * falls through to the installed package.
   */
  static SOURCE_CANDIDATES = [
    "src/lib/styles",
    "node_modules/@fractaldesign/fractalstyler/dist/styles",
    "node_modules/@fractaldesign/fractalstyler/styles",
    "src/styles",
    "styles"
  ];
  /**
   * Resolve a possibly-relative configured path against the workspace root.
   */
  resolveConfigured(dir) {
    if (path2.isAbsolute(dir)) {
      return dir;
    }
    const root = vscode2.workspace.workspaceFolders?.[0]?.uri.fsPath;
    return root ? path2.join(root, dir) : dir;
  }
  /**
   * The styles directory to edit, or '' when none could be found.
   *
   * Order: an explicit `fractalstyler.stylesDirectory` always wins, then the
   * first conventional folder present in the workspace. There is deliberately
   * no machine-specific fallback — this used to hardcode an absolute path from
   * the author's laptop, which either pointed nowhere useful or, worse, got
   * mkdir'd into existence on activation.
   */
  getStylesDirectory() {
    const config = vscode2.workspace.getConfiguration("fractalstyler");
    const configured = config.get("stylesDirectory")?.trim();
    if (configured) {
      const resolved = this.resolveConfigured(configured);
      if (fs2.existsSync(resolved)) {
        return resolved;
      }
    }
    for (const folder of vscode2.workspace.workspaceFolders ?? []) {
      for (const rel of _FractalstylerViewProvider.SOURCE_CANDIDATES) {
        const candidate = path2.join(folder.uri.fsPath, rel);
        if (fs2.existsSync(candidate)) {
          return candidate;
        }
      }
    }
    return "";
  }
  updateViewTitle() {
    if (this._view) {
      this._view.description = this.currentFilename;
    }
  }
  setupWatcher() {
    const dir = this.getStylesDirectory();
    if (fs2.existsSync(dir)) {
      this.fsWatcher = vscode2.workspace.createFileSystemWatcher(
        new vscode2.RelativePattern(dir, "**/*.{sass,scss,css}")
      );
      this.fsWatcher.onDidChange(async (uri) => {
        const changedFile = path2.basename(uri.fsPath);
        const lastSaved = this.lastSavedContent.get(changedFile);
        const lastTime = this.lastSavedTime.get(changedFile) || 0;
        const isRecentSelfSave = Date.now() - lastTime < 3e3;
        if (isRecentSelfSave && lastSaved !== void 0) {
          try {
            const diskContent = await fs2.promises.readFile(uri.fsPath, "utf8");
            if (diskContent === lastSaved) {
              await this.sendFileList();
              return;
            }
          } catch {
          }
        }
        if (changedFile === this.currentFilename) {
          await this.loadFile(changedFile, false);
        }
        await this.sendFileList();
      });
      this.fsWatcher.onDidCreate(async () => {
        await this.sendFileList();
      });
      this.fsWatcher.onDidDelete(async (uri) => {
        const deletedFile = path2.basename(uri.fsPath);
        if (this.pinnedFiles.includes(deletedFile)) {
          this.pinnedFiles = this.pinnedFiles.filter((f) => f !== deletedFile);
          await this._context.workspaceState.update("pinnedFiles", this.pinnedFiles);
          this.sendPinnedFiles();
        }
        if (deletedFile === this.currentFilename) {
          const files = await this.readStylesDir();
          if (files.length > 0) {
            await this.loadFile(files[0].filename, true);
          }
        }
        await this.sendFileList();
      });
    }
  }
  resolveWebviewView(webviewView, _context, _token) {
    this._view = webviewView;
    webviewView.webview.options = {
      enableScripts: true,
      localResourceRoots: [this._extensionUri]
    };
    webviewView.webview.html = this.getHtmlForWebview(webviewView.webview);
    this.updateViewTitle();
    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case "ready": {
          await this.initSession();
          break;
        }
        case "save": {
          await this.saveFile(data.filename, data.content);
          break;
        }
        case "loadFile": {
          await this.loadFile(data.filename, true, data.targetLine, data.matchStart, data.matchEnd);
          break;
        }
        case "getFileList": {
          await this.sendFileList();
          break;
        }
        case "createFile": {
          await this.createFile(data.filename);
          break;
        }
        case "openInEditor": {
          await this.openCurrentInEditor(data.filename, data.line);
          break;
        }
        case "openFolder": {
          await this.openStylesFolder();
          break;
        }
        case "togglePin": {
          await this.togglePin(data.filename);
          break;
        }
        case "search": {
          await this.searchStyles(data.query);
          break;
        }
        case "copyText": {
          if (data.text) {
            await vscode2.env.clipboard.writeText(data.text);
            vscode2.window.showInformationMessage(`Copied: ${data.text}`);
          }
          break;
        }
      }
    });
    webviewView.onDidChangeVisibility(() => {
      if (webviewView.visible) {
        this.updateViewTitle();
        this.sendFileList();
        this.sendPinnedFiles();
      }
    });
  }
  async initSession() {
    const dir = this.getStylesDirectory();
    if (!dir) {
      await this.sendMessage({ type: "searchResults", query: "", results: [] });
      this.lastNoDirectoryNotice ??= this.notifyNoDirectory();
      return;
    }
    this.lastNoDirectoryNotice = void 0;
    const files = await this.readStylesDir();
    const config = vscode2.workspace.getConfiguration("fractalstyler");
    const defaultFile = config.get("defaultFile") || "_04_layouts.sass";
    let fileToOpen = defaultFile;
    if (!files.some((f) => f.filename === fileToOpen) && files.length > 0) {
      fileToOpen = files[0].filename;
    }
    if (fileToOpen && fs2.existsSync(path2.join(dir, fileToOpen))) {
      await this.loadFile(fileToOpen, true);
    }
    this.updateViewTitle();
    await this.sendFileList();
    this.sendPinnedFiles();
  }
  async readStylesDir() {
    const dir = this.getStylesDirectory();
    if (!fs2.existsSync(dir)) {
      return [];
    }
    try {
      const entries = await fs2.promises.readdir(dir);
      const styleEntries = entries.filter((f) => !f.startsWith(".") && (f.endsWith(".sass") || f.endsWith(".scss") || f.endsWith(".css")));
      const items = [];
      for (const file of styleEntries) {
        try {
          const stat = await fs2.promises.stat(path2.join(dir, file));
          items.push({
            filename: file,
            title: file,
            size: stat.size,
            mtime: stat.mtimeMs,
            pinned: this.pinnedFiles.includes(file)
          });
        } catch {
        }
      }
      items.sort((a, b) => a.filename.localeCompare(b.filename, void 0, { numeric: true, sensitivity: "base" }));
      return items;
    } catch (e) {
      console.error("Failed to read styles dir", e);
      return [];
    }
  }
  async sendFileList() {
    const files = await this.readStylesDir();
    this.sendMessage({
      type: "fileList",
      files,
      currentFilename: this.currentFilename,
      pinnedFiles: this.pinnedFiles
    });
  }
  sendPinnedFiles() {
    this.sendMessage({
      type: "pinnedFiles",
      files: this.pinnedFiles,
      currentFilename: this.currentFilename
    });
  }
  async togglePin(filename) {
    if (!filename)
      return;
    if (this.pinnedFiles.includes(filename)) {
      this.pinnedFiles = this.pinnedFiles.filter((f) => f !== filename);
    } else {
      this.pinnedFiles.push(filename);
    }
    await this._context.workspaceState.update("pinnedFiles", this.pinnedFiles);
    this.sendPinnedFiles();
    await this.sendFileList();
  }
  async togglePinCurrent() {
    if (this.currentFilename) {
      await this.togglePin(this.currentFilename);
    }
  }
  async loadFile(filename, force = false, targetLine, matchStart, matchEnd) {
    const dir = this.getStylesDirectory();
    const filePath = path2.join(dir, filename);
    if (!fs2.existsSync(filePath)) {
      vscode2.window.showErrorMessage(`Fractalstyler: File ${filename} does not exist.`);
      return;
    }
    try {
      const content = await fs2.promises.readFile(filePath, "utf8");
      this.currentFilename = filename;
      this.updateViewTitle();
      this.sendMessage({
        type: "fileLoaded",
        filename,
        content,
        force,
        targetLine,
        matchStart,
        matchEnd
      });
    } catch (e) {
      vscode2.window.showErrorMessage(`Failed to read file ${filename}: ${e}`);
    }
  }
  async saveFile(filename, content) {
    if (!filename)
      return;
    const dir = this.getStylesDirectory();
    const filePath = path2.join(dir, filename);
    try {
      this.lastSavedContent.set(filename, content);
      this.lastSavedTime.set(filename, Date.now());
      await fs2.promises.writeFile(filePath, content, "utf8");
    } catch (e) {
      vscode2.window.showErrorMessage(`Failed to save ${filename}: ${e}`);
    }
  }
  async searchStyles(query) {
    const q = (query || "").trim();
    if (!q) {
      this.sendMessage({
        type: "searchResults",
        query: "",
        results: []
      });
      return;
    }
    const dir = this.getStylesDirectory();
    if (!fs2.existsSync(dir)) {
      this.sendMessage({ type: "searchResults", query: q, results: [] });
      return;
    }
    const files = await this.readStylesDir();
    const results = [];
    const lowerQ = q.toLowerCase();
    for (const item of files) {
      try {
        const filePath = path2.join(dir, item.filename);
        const content = await fs2.promises.readFile(filePath, "utf8");
        const lines = content.split(/\r?\n/);
        for (let i = 0; i < lines.length; i++) {
          const lineText = lines[i];
          const matchIdx = lineText.toLowerCase().indexOf(lowerQ);
          if (matchIdx !== -1) {
            results.push({
              filename: item.filename,
              line: i + 1,
              lineText: lineText.trim(),
              matchStart: matchIdx,
              matchEnd: matchIdx + q.length
            });
            if (results.length >= 100)
              break;
          }
        }
        if (results.length >= 100)
          break;
      } catch (err) {
        console.error(`Error searching file ${item.filename}`, err);
      }
    }
    this.sendMessage({
      type: "searchResults",
      query: q,
      results
    });
  }
  async createFile(filename) {
    if (!filename)
      return;
    let cleanName = filename.trim();
    if (!cleanName.includes(".")) {
      cleanName += ".sass";
    }
    const dir = this.getStylesDirectory();
    const filePath = path2.join(dir, cleanName);
    if (fs2.existsSync(filePath)) {
      vscode2.window.showWarningMessage(`Fractalstyler: ${cleanName} already exists.`);
      await this.loadFile(cleanName, true);
      return;
    }
    try {
      const initialContent = `@use '00_config' as *
@use '00_tokens' as *

`;
      await fs2.promises.writeFile(filePath, initialContent, "utf8");
      await this.loadFile(cleanName, true);
      await this.sendFileList();
    } catch (e) {
      vscode2.window.showErrorMessage(`Failed to create file: ${e}`);
    }
  }
  async promptNewFile() {
    const filename = await vscode2.window.showInputBox({
      prompt: "Enter new style filename in fractalstyler",
      placeHolder: "_09_custom.sass",
      validateInput: (val) => {
        if (!val || !val.trim())
          return "Filename cannot be empty";
        if (/[\\/:*?"<>|]/.test(val))
          return "Invalid characters in filename";
        return null;
      }
    });
    if (filename) {
      await this.createFile(filename);
    }
  }
  async openCurrentInEditor(filename, line) {
    const file = filename || this.currentFilename;
    if (!file)
      return;
    const dir = this.getStylesDirectory();
    const filePath = path2.join(dir, file);
    if (fs2.existsSync(filePath)) {
      const doc = await vscode2.workspace.openTextDocument(filePath);
      const editor = await vscode2.window.showTextDocument(doc, { preview: false });
      if (line && line > 0) {
        const pos = new vscode2.Position(line - 1, 0);
        editor.selection = new vscode2.Selection(pos, pos);
        editor.revealRange(new vscode2.Range(pos, pos), vscode2.TextEditorRevealType.InCenter);
      }
    }
  }
  async openStylesFolder() {
    const dir = this.getStylesDirectory();
    if (!dir) {
      await this.pickStylesFolder();
      return;
    }
    vscode2.commands.executeCommand("revealFileInOS", vscode2.Uri.file(dir));
  }
  /**
   * Ask the user which folder to edit and persist it to
   * `fractalstyler.stylesDirectory`. This is the manual override for the
   * auto-detection, and the only way to configure the extension on a project
   * whose styles live somewhere unconventional.
   */
  async pickStylesFolder() {
    const picked = await vscode2.window.showOpenDialog({
      canSelectFiles: false,
      canSelectFolders: true,
      canSelectMany: false,
      openLabel: "Use this styles folder",
      title: "Select the fractalstyler styles folder"
    });
    const chosen = picked?.[0];
    if (!chosen) {
      return;
    }
    await vscode2.workspace.getConfiguration("fractalstyler").update("stylesDirectory", chosen.fsPath, vscode2.ConfigurationTarget.Workspace);
    this.disposeWatcher();
    this.setupWatcher();
    await this.initSession();
    this.notifyDirectoryChanged();
    vscode2.window.setStatusBarMessage(
      `Fractalstyler: styles folder set to ${chosen.fsPath}`,
      4e3
    );
  }
  disposeWatcher() {
    this.fsWatcher?.dispose();
    this.fsWatcher = void 0;
  }
  directoryListeners = [];
  /**
   * Notified whenever the resolved styles directory changes — currently only
   * when the user picks a different one. Used to reload the class registry so
   * completions match the folder now being edited.
   */
  onStylesDirectoryChanged(listener) {
    this.directoryListeners.push(listener);
    return new vscode2.Disposable(() => {
      this.directoryListeners = this.directoryListeners.filter((l) => l !== listener);
    });
  }
  notifyDirectoryChanged() {
    for (const listener of this.directoryListeners) {
      listener();
    }
  }
  /**
   * One-shot notice when no styles folder could be found, so activation is
   * silent-but-obvious rather than an empty pane with no explanation.
   */
  notifyNoDirectory() {
    return vscode2.window.showWarningMessage(
      "Fractalstyler: no styles folder found in this workspace.",
      "Choose folder\u2026"
    ).then((choice) => {
      if (choice === "Choose folder\u2026") {
        return this.pickStylesFolder();
      }
      return void 0;
    });
  }
  toggleDrawer() {
    this.sendMessage({
      type: "toggleDrawer"
    });
  }
  focusSearch() {
    this.sendMessage({
      type: "focusSearch"
    });
  }
  sendMessage(msg) {
    if (this._view) {
      this._view.webview.postMessage(msg);
    }
  }
  getHtmlForWebview(webview) {
    const scriptUri = webview.asWebviewUri(
      vscode2.Uri.joinPath(this._extensionUri, "out", "webview.js")
    );
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Fractalstyler</title>
  <style>
    :root {
      --bg: var(--vscode-sideBar-background, var(--vscode-editor-background, #ffffff));
      --fg: var(--vscode-sideBar-foreground, var(--vscode-editor-foreground, #1e1e1e));
      --editor-bg: var(--vscode-editor-background, #ffffff);
      --editor-fg: var(--vscode-editor-foreground, #1e1e1e);
      --gutter-fg: var(--vscode-editorLineNumber-foreground, #999999);
      --gutter-active: var(--vscode-editorLineNumber-activeForeground, #333333);
      --line-color: var(--vscode-editorWidget-border, var(--vscode-widget-border, rgba(128, 128, 128, 0.18)));
      --hover-bg: var(--vscode-list-hoverBackground, rgba(128, 128, 128, 0.08));
      --active-bg: var(--vscode-list-activeSelectionBackground, rgba(128, 128, 128, 0.14));
      --active-fg: var(--vscode-list-activeSelectionForeground, var(--fg));
      --icon-color: var(--vscode-icon-foreground, var(--vscode-foreground, #444444));
      --input-bg: var(--vscode-input-background, rgba(128, 128, 128, 0.06));
      --input-fg: var(--vscode-input-foreground, var(--fg));
      --input-border: var(--vscode-input-border, rgba(128, 128, 128, 0.22));
      --badge-bg: var(--vscode-badge-background, rgba(0, 122, 204, 0.15));
      --badge-fg: var(--vscode-badge-foreground, var(--fg));
      --highlight-bg: var(--vscode-editor-findMatchHighlightBackground, rgba(234, 179, 8, 0.35));
      --font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      --editor-font: var(--vscode-editor-font-family, Menlo, Monaco, 'Courier New', monospace);
      --editor-font-size: var(--vscode-editor-font-size, 13px);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html, body {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: var(--bg);
      color: var(--fg);
      font-family: var(--font-family);
      font-size: 12px;
      user-select: none;
    }

    .container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;
      position: relative;
      --bg: var(--fs-bg, var(--vscode-sideBar-background, var(--vscode-editor-background, #ffffff)));
      --fg: var(--fs-fg, var(--vscode-sideBar-foreground, var(--vscode-editor-foreground, #1e1e1e)));
      --editor-bg: var(--fs-editor-bg, var(--vscode-editor-background, #ffffff));
      --gutter-fg: var(--fs-muted, var(--vscode-editorLineNumber-foreground, #999999));
      --line-color: var(--fs-line, var(--vscode-editorWidget-border, rgba(128, 128, 128, 0.18)));
      --hover-bg: var(--fs-hover, var(--vscode-list-hoverBackground, rgba(128, 128, 128, 0.08)));
      --active-bg: var(--fs-active, var(--vscode-list-activeSelectionBackground, rgba(128, 128, 128, 0.14)));
      --active-fg: var(--vscode-list-activeSelectionForeground, var(--fg));
      --icon-color: var(--fs-icon, var(--vscode-icon-foreground, var(--vscode-foreground, #444444)));
      --input-border: var(--vscode-input-border, rgba(128, 128, 128, 0.22));
      --mono: var(--vscode-editor-font-family, Menlo, Monaco, 'Courier New', monospace);
      box-sizing: border-box;
      background: var(--bg);
      color: var(--fg);
      font-family: var(--vscode-font-family, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif);
      font-size: 12px;
    }

    /* Top Extension Header */
    .extension-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 36px;
      padding: 0 10px;
      background: var(--bg);
      border-bottom: 1px solid var(--line-color);
      flex-shrink: 0;
      gap: 8px;
    }

    .header-left {
      display: flex;
      align-items: center;
      min-width: 0;
      overflow: hidden;
      flex: 1;
    }

    .brand-group {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      overflow: hidden;
    }

    .brand-icon {
      width: 14px;
      height: 14px;
      flex-shrink: 0;
      opacity: 0.85;
    }

    .brand-title {
      font-size: 10px;
      letter-spacing: 0.08em;
      text-transform: capitalize;
      color: var(--fg);
      opacity: 0.85;
      white-space: nowrap;
      flex-shrink: 0;
    }

    .brand-sep {
      color: var(--gutter-fg);
      opacity: 0.6;
      font-size: 11px;
      flex-shrink: 0;
    }

    /* Current File Badge (Right-clickable, clickable to open in main editor) */
    .current-file-badge {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 6px;
      border-radius: 4px;
      background: var(--hover-bg);
      border: 1px solid var(--line-color);
      font-family: var(--mono);
      font-size: 10px;
      color: var(--fg);
      cursor: pointer;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      transition: background-color 0.15s ease, border-color 0.15s ease;
    }

    .current-file-badge:hover {
      background: var(--active-bg);
      border-color: var(--input-border);
    }

    .current-file-badge .open-glyph {
      font-size: 10px;
      opacity: 0.65;
      margin-left: 2px;
    }

    .header-right {
      display: flex;
      align-items: center;
      gap: 4px;
      flex-shrink: 0;
    }

    .header-btn {
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      color: var(--icon-color);
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 4px;
      font-size: 11px;
      transition: background-color 0.15s ease, opacity 0.15s ease;
      flex-shrink: 0;
      padding: 0;
    }

    .header-btn:hover {
      background: var(--hover-bg);
      opacity: 0.9;
    }

    .header-btn:active {
      transform: scale(1.03);
    }

    .header-btn.active {
      background: var(--active-bg);
      color: var(--active-fg);
    }

    /* Pinned Files Bar */
    .pinned-bar {
      display: flex;
      align-items: center;
      height: 28px;
      padding: 0 8px;
      background: var(--bg);
      border-bottom: 1px solid var(--line-color);
      flex-shrink: 0;
      overflow-x: auto;
      gap: 4px;
    }

    .pinned-bar::-webkit-scrollbar {
      height: 2px;
    }

    .pinned-tabs {
      display: flex;
      align-items: center;
      gap: 4px;
      flex: 1;
    }

    .pinned-tab {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 2px 7px;
      border-radius: 3px;
      background: transparent;
      border: 1px solid transparent;
      font-family: var(--editor-font);
      font-size: 11px;
      color: var(--gutter-fg);
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.12s ease;
    }

    .pinned-tab:hover {
      background: var(--hover-bg);
      color: var(--fg);
      border-color: var(--line-color);
    }

    .pinned-tab.active {
      background: var(--active-bg);
      color: var(--fg);
      font-weight: 600;
      border-color: var(--line-color);
    }

    .pinned-tab-unpin {
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      color: inherit;
      font-size: 11px;
      opacity: 0.5;
      padding: 0 1px;
      border-radius: 2px;
      line-height: 1;
    }

    .pinned-tab-unpin:hover {
      opacity: 1;
      background: var(--hover-bg);
    }

    /* Search Bar in Extension Header */
    .search-bar-container {
      display: flex;
      align-items: center;
      padding: 4px 8px;
      background: var(--bg);
      border-bottom: 1px solid var(--line-color);
      flex-shrink: 0;
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      background: var(--input-bg);
      border: 1px solid var(--input-border);
      border-radius: 4px;
      padding: 0 6px;
      height: 26px;
      transition: border-color 0.15s ease;
    }

    .search-input-wrapper:focus-within {
      border-color: var(--vscode-focusBorder, #007acc);
    }

    .search-icon {
      width: 12px;
      height: 12px;
      color: var(--gutter-fg);
      flex-shrink: 0;
      margin-right: 6px;
      opacity: 0.75;
    }

    .search-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      color: var(--input-fg);
      font-family: var(--editor-font);
      font-size: 11px;
      min-width: 0;
    }

    .search-count {
      font-size: 10px;
      color: var(--gutter-fg);
      font-family: var(--editor-font);
      margin-right: 4px;
      white-space: nowrap;
    }

    .search-clear-btn {
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      color: var(--gutter-fg);
      font-size: 11px;
      display: none;
      align-items: center;
      justify-content: center;
      width: 16px;
      height: 16px;
      border-radius: 2px;
    }

    .search-clear-btn:hover {
      color: var(--fg);
      background: var(--hover-bg);
    }

    /* Search Results Panel */
    .search-results-panel {
      display: none;
      flex-direction: column;
      position: absolute;
      top: 96px;
      left: 8px;
      right: 8px;
      max-height: 320px;
      background: var(--bg);
      border: 1px solid var(--line-color);
      border-radius: 6px;
      box-shadow: 0 6px 16px rgba(0, 0, 0, 0.16);
      z-index: 1000;
      overflow-y: auto;
      user-select: none;
    }

    .search-results-panel.active {
      display: flex;
    }

    .search-file-group {
      border-bottom: 1px solid var(--line-color);
    }

    .search-file-group:last-child {
      border-bottom: none;
    }

    .search-file-title {
      font-family: var(--editor-font);
      font-size: 11px;
      font-weight: 700;
      color: var(--fg);
      padding: 6px 10px;
      background: var(--hover-bg);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .search-file-count {
      font-size: 10px;
      font-weight: normal;
      color: var(--gutter-fg);
    }

    .search-result-row {
      display: flex;
      align-items: center;
      padding: 4px 10px 4px 16px;
      cursor: pointer;
      font-family: var(--editor-font);
      font-size: 11px;
      gap: 8px;
      transition: background-color 0.1s ease;
    }

    .search-result-row:hover, .search-result-row.selected {
      background: var(--active-bg);
    }

    .search-line-num {
      color: var(--gutter-fg);
      font-size: 10px;
      width: 24px;
      text-align: right;
      flex-shrink: 0;
    }

    .search-line-snippet {
      color: var(--fg);
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      flex: 1;
    }

    .search-highlight {
      background-color: var(--highlight-bg);
      border-radius: 2px;
      font-weight: 600;
    }

    /* Main View Content Area */
    .view-content {
      position: relative;
      flex: 1;
      width: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
    }

    /* Editor View */
    .editor-wrapper {
      position: relative;
      flex: 1;
      width: 100%;
      height: 100%;
      min-height: 0;
      display: flex;
      flex-direction: column;
      background: var(--editor-bg);
      user-select: text;
    }

    .editor-wrapper.hidden {
      display: none;
    }

    #cm-editor-root {
      flex: 1;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    /* Drawer View (Files List) */
    .drawer-view {
      display: none;
      flex-direction: column;
      flex: 1;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      padding: 8px 12px;
      min-height: 0;
    }

    .drawer-view.active {
      display: flex;
    }

    .doc-list {
      display: flex;
      flex-direction: column;
      width: 100%;
    }

    .doc-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 8px;
      border-bottom: 1px solid var(--line-color);
      cursor: pointer;
      user-select: none;
      transition: background-color 0.15s ease;
      gap: 8px;
    }

    .doc-item:hover {
      background-color: var(--hover-bg);
    }

    .doc-item:first-child {
      border-top: 1px solid var(--line-color);
    }

    .doc-item.selected {
      background-color: var(--active-bg);
    }

    .doc-item-left {
      display: flex;
      align-items: center;
      gap: 6px;
      min-width: 0;
      flex: 1;
    }

    .doc-item-title {
      font-family: var(--editor-font);
      font-size: 12px;
      color: var(--fg);
      letter-spacing: -0.01em;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .doc-item-right {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }

    .doc-pin-btn {
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;
      font-size: 12px;
      opacity: 0.4;
      padding: 2px 4px;
      border-radius: 3px;
      transition: opacity 0.15s ease, background-color 0.15s ease;
    }

    .doc-pin-btn:hover {
      opacity: 1;
      background: var(--hover-bg);
    }

    .doc-pin-btn.pinned {
      opacity: 1;
    }

    /* Custom Right-Click Context Menu */
    .custom-context-menu {
      display: none;
      position: fixed;
      background: var(--bg);
      border: 1px solid var(--line-color);
      border-radius: 5px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.18);
      z-index: 2000;
      padding: 4px 0;
      min-width: 170px;
    }

    .custom-context-menu.active {
      display: block;
    }

    .context-menu-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      font-size: 12px;
      color: var(--fg);
      cursor: pointer;
      transition: background-color 0.12s ease;
    }

    .context-menu-item:hover {
      background-color: var(--hover-bg);
    }

    .context-menu-sep {
      height: 1px;
      background-color: var(--line-color);
      margin: 4px 0;
    }

    /* Inline new file bar */
    .new-file-bar {
      display: none;
      padding: 6px 10px;
      background: var(--hover-bg);
      border-bottom: 1px solid var(--line-color);
    }

    .new-file-bar.active {
      display: flex;
      gap: 8px;
    }

    .new-file-input {
      flex: 1;
      background: var(--editor-bg);
      color: var(--editor-fg);
      border: 1px solid var(--line-color);
      padding: 4px 8px;
      border-radius: 4px;
      font-family: var(--editor-font);
      font-size: 12px;
      outline: none;
    }

    .new-file-input:focus {
      border-color: var(--vscode-focusBorder, #007acc);
    }

    /* Custom thin scrollbar */
    ::-webkit-scrollbar {
      width: 6px;
      height: 6px;
    }
    ::-webkit-scrollbar-track {
      background: transparent;
    }
    ::-webkit-scrollbar-thumb {
      background: rgba(128, 128, 128, 0.25);
      border-radius: 3px;
    }
    ::-webkit-scrollbar-thumb:hover {
      background: rgba(128, 128, 128, 0.45);
    }
  </style>
</head>
<body>
  <div class="container">

    <!-- Top Extension Header -->
    <!--sync:region header-->
    <div class="extension-header">
      <div class="header-left">
        <div class="brand-group">
          <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
            <path d="M14.15 13.91C15.84 12.22 14.77 8.42 11.78 5.43C8.78 2.43 4.98 1.36 3.29 3.05C1.6 4.74 2.67 8.54 5.67 11.54C8.67 14.53 12.46 15.6 14.15 13.91Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M14.15 9.63C15.84 11.31 14.77 15.11 11.78 18.11C8.78 21.11 4.98 22.17 3.29 20.49C1.6 18.8 2.67 15 5.67 12C8.67 9 12.46 7.94 14.15 9.63Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.84 13.91C8.15 12.22 9.22 8.42 12.22 5.43C15.21 2.43 19.01 1.36 20.7 3.05C22.39 4.74 21.32 8.54 18.32 11.54C15.33 14.53 11.53 15.6 9.84 13.91Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M9.84 9.63C8.15 11.31 9.22 15.11 12.22 18.11C15.21 21.11 19.01 22.17 20.7 20.49C22.39 18.8 21.32 15 18.32 12C15.33 9 11.53 7.94 9.84 9.63Z" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <span class="brand-title">FRACTALSTYLER</span>
          <!--sync:keep if-1-->
          <span class="brand-sep">/</span>
          <div class="current-file-badge" id="current-file-badge" title="Right-click for options, click to open in main editor">
            <span id="current-filename-label">_04_layouts.sass</span>
            <span class="open-glyph">\u2197</span>
          </div>
          <!--/sync:keep if-1-->
        </div>
      </div>
      <div class="header-right">
        <!--sync:keep actions-->
        <button class="header-btn" id="btn-pin-toggle" title="Pin / Unpin current file">\u{1F4CC}</button>
        <button class="header-btn" id="btn-new-file" title="New Style File">+</button>
        <!--/sync:keep actions-->
        <button class="header-btn" type="button" aria-label="Toggle files list" aria-controls="drawer-view" id="btn-drawer-toggle" title="Toggle Files List">
          \u2630
        </button>
      </div>
    </div>
    <!--/sync:region header-->

    <!-- Pinned Files Bar (Horizontal tabs right at the top) -->
    <div class="pinned-bar" id="pinned-bar">
      <div class="pinned-tabs" id="pinned-tabs"></div>
    </div>

    <!-- Search Input Bar in Header -->
    <div class="search-bar-container" id="search-bar-container">
      <div class="search-input-wrapper">
        <svg class="search-icon" viewBox="0 0 16 16" fill="currentColor">
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
        <input id="search-input" class="search-input" type="text" placeholder="Search Sass files... (\u2318F)" spellcheck="false" autocomplete="off" />
        <span id="search-count" class="search-count"></span>
        <button id="search-clear-btn" class="search-clear-btn" title="Clear search">\u2715</button>
      </div>
    </div>

    <!-- Search Results Dropdown Panel -->
    <div class="search-results-panel" id="search-results-panel">
      <div id="search-results-list" class="search-results-list"></div>
    </div>

    <!-- Optional New File Bar -->
    <div id="new-file-bar" class="new-file-bar">
      <input id="new-file-input" class="new-file-input" type="text" placeholder="filename.sass" />
    </div>

    <!--sync:region view-content-->
    <div class="view-content">
      <div class="editor-wrapper" id="editor-wrapper">
        <!--sync:keep children-->
        <div id="cm-editor-root"></div>
        <!--/sync:keep children-->
      </div>
      <div id="drawer-view" class="drawer-view">
        <div class="doc-list" id="doc-list">
          <!--sync:keep each-1--><!--/sync:keep each-1-->
        </div>
      </div>
    </div>
    <!--/sync:region view-content-->

    <!-- Custom Right-Click Context Menu -->
    <div class="custom-context-menu" id="custom-context-menu">
      <div class="context-menu-item" id="ctx-open-editor">\u2197 Open in Main Editor</div>
      <div class="context-menu-item" id="ctx-toggle-pin">\u{1F4CC} Pin / Unpin File</div>
      <div class="context-menu-sep"></div>
      <div class="context-menu-item" id="ctx-copy-name">\u{1F4CB} Copy Filename</div>
      <div class="context-menu-item" id="ctx-reveal-os">\u{1F4C1} Reveal in Finder</div>
    </div>

  </div>

  <script src="${scriptUri}"></script>
</body>
</html>`;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FractalstylerViewProvider,
  activate,
  deactivate
});
//# sourceMappingURL=extension.js.map
