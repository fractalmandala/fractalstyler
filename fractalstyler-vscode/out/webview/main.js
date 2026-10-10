"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const codemirror_1 = require("codemirror");
const state_1 = require("@codemirror/state");
const view_1 = require("@codemirror/view");
const commands_1 = require("@codemirror/commands");
const lang_sass_1 = require("@codemirror/lang-sass");
const language_1 = require("@codemirror/language");
const highlight_1 = require("@lezer/highlight");
// Tab Arrow Guide Widget matching user's screenshot
class TabArrowWidget extends view_1.WidgetType {
    toDOM() {
        const span = document.createElement('span');
        span.className = 'cm-tab-arrow';
        span.textContent = '→ ';
        span.style.color = 'rgba(160, 160, 160, 0.45)';
        span.style.userSelect = 'none';
        span.style.pointerEvents = 'none';
        span.style.display = 'inline-block';
        span.style.marginRight = '2px';
        span.style.fontSize = '12px';
        return span;
    }
}
const tabMatcher = new view_1.MatchDecorator({
    regexp: /\t/g,
    decoration: () => view_1.Decoration.widget({
        widget: new TabArrowWidget(),
        side: -1
    })
});
const tabArrowPlugin = view_1.ViewPlugin.fromClass(class {
    decorations;
    constructor(view) {
        this.decorations = tabMatcher.createDeco(view);
    }
    update(update) {
        this.decorations = tabMatcher.updateDeco(update, this.decorations);
    }
}, {
    decorations: v => v.decorations
});
// High-taste Sass Syntax Highlighting matching the user's screenshot
const sassHighlightStyle = language_1.HighlightStyle.define([
    { tag: [highlight_1.tags.keyword, highlight_1.tags.moduleKeyword, highlight_1.tags.controlKeyword], color: '#08a045', fontWeight: '500' }, // @use, @media, as
    { tag: [highlight_1.tags.string, highlight_1.tags.special(highlight_1.tags.string)], color: '#70e000' }, // 'sass:string', '00_config'
    { tag: [highlight_1.tags.lineComment, highlight_1.tags.blockComment, highlight_1.tags.comment], color: '#888888', fontStyle: 'normal' }, // // Gridding golden rules...
    { tag: [highlight_1.tags.className, highlight_1.tags.typeName], color: '#059669', fontWeight: '600' }, // .grid-1, .grid-2
    { tag: [highlight_1.tags.propertyName, highlight_1.tags.attributeName], color: '#004b23' }, // display, grid-template-columns
    { tag: [highlight_1.tags.atom, highlight_1.tags.standard(highlight_1.tags.name), highlight_1.tags.variableName], color: '#70e000' }, // grid, repeat, minmax
    { tag: [highlight_1.tags.number, highlight_1.tags.unit], color: '#38b000' }, // 1, 0, 1025px, 1fr
    { tag: [highlight_1.tags.operator, highlight_1.tags.punctuation, highlight_1.tags.separator], color: '#006400' }
]);
// Theme styling for CodeMirror inside VS Code
const fractalTheme = codemirror_1.EditorView.theme({
    '&': {
        height: '100%',
        fontSize: 'var(--editor-font-size, 11px)',
        fontFamily: 'var(--editor-font, Menlo, Monaco, monospace)',
        backgroundColor: 'var(--editor-bg, #ffffff)',
        color: 'var(--editor-fg, #1e1e1e)'
    },
    '.cm-content': {
        padding: '12px 10px 60px 6px',
        lineHeight: '1.65',
        tabSize: '2',
        caretColor: 'var(--editor-fg, #1e1e1e)'
    },
    '.cm-cursor': {
        borderLeftColor: 'var(--editor-fg, #1e1e1e)',
        borderLeftWidth: '2px'
    },
    '.cm-gutters': {
        backgroundColor: 'var(--editor-bg, #ffffff)',
        color: 'var(--gutter-fg, #bbbbbb)',
        borderRight: 'none',
        paddingLeft: '4px',
        paddingRight: '10px'
    },
    '.cm-lineNumbers .cm-gutterElement': {
        padding: '0 4px',
        minWidth: '26px',
        textAlign: 'right',
        userSelect: 'none'
    },
    '.cm-activeLine': {
        backgroundColor: 'var(--hover-bg, rgba(128, 128, 128, 0.05))'
    },
    '.cm-activeLineGutter': {
        color: 'var(--gutter-active, #1e1e1e)',
        backgroundColor: 'transparent'
    },
    '.cm-selectionBackground, ::selection': {
        backgroundColor: 'var(--vscode-editor-selectionBackground, rgba(0, 122, 204, 0.25)) !important'
    }
});
const vscode = acquireVsCodeApi();
// DOM Elements
const editorWrapper = document.getElementById('editor-wrapper');
const drawerView = document.getElementById('drawer-view');
const docList = document.getElementById('doc-list');
const cmEditorRoot = document.getElementById('cm-editor-root');
const currentFileBadge = document.getElementById('current-file-badge');
const currentFilenameLabel = document.getElementById('current-filename-label');
const btnPinToggle = document.getElementById('btn-pin-toggle');
const btnNewFile = document.getElementById('btn-new-file');
const btnDrawerToggle = document.getElementById('btn-drawer-toggle');
const pinnedBar = document.getElementById('pinned-bar');
const pinnedTabs = document.getElementById('pinned-tabs');
const searchBarContainer = document.getElementById('search-bar-container');
const searchInput = document.getElementById('search-input');
const searchCount = document.getElementById('search-count');
const searchClearBtn = document.getElementById('search-clear-btn');
const searchResultsPanel = document.getElementById('search-results-panel');
const searchResultsList = document.getElementById('search-results-list');
const newFileBar = document.getElementById('new-file-bar');
const newFileInput = document.getElementById('new-file-input');
const customContextMenu = document.getElementById('custom-context-menu');
const ctxOpenEditor = document.getElementById('ctx-open-editor');
const ctxTogglePin = document.getElementById('ctx-toggle-pin');
const ctxCopyName = document.getElementById('ctx-copy-name');
const ctxRevealOs = document.getElementById('ctx-reveal-os');
let currentFilename = '_04_layouts.sass';
let pinnedFilesList = [];
let allFilesList = [];
let isDrawerOpen = false;
let saveTimeout = null;
let isUpdatingDocProgrammatically = false;
let contextTargetFile = '';
let searchDebounceTimeout = null;
let selectedSearchIndex = -1;
let flatSearchResults = [];
// Per-file cursor and scroll cache
const fileStateCache = new Map();
// Save immediately
function saveImmediately() {
    clearTimeout(saveTimeout);
    if (currentFilename) {
        vscode.postMessage({
            type: 'save',
            filename: currentFilename,
            content: editorView.state.doc.toString()
        });
    }
}
// Debounced save
function scheduleSave() {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        saveImmediately();
    }, 350);
}
// Initialize CodeMirror Editor
const state = state_1.EditorState.create({
    doc: '',
    extensions: [
        codemirror_1.basicSetup,
        state_1.EditorState.tabSize.of(2),
        view_1.keymap.of([
            commands_1.indentWithTab,
            {
                key: 'Mod-s',
                run: () => {
                    saveImmediately();
                    return true;
                }
            },
            {
                key: 'Mod-f',
                run: () => {
                    focusSearchInput();
                    return true;
                }
            }
        ]),
        (0, lang_sass_1.sass)({ indented: true }),
        (0, language_1.syntaxHighlighting)(sassHighlightStyle),
        tabArrowPlugin,
        fractalTheme,
        codemirror_1.EditorView.updateListener.of((update) => {
            if (update.docChanged && !isUpdatingDocProgrammatically) {
                scheduleSave();
            }
        })
    ]
});
const editorView = new codemirror_1.EditorView({
    state,
    parent: cmEditorRoot
});
// Update Header File Display and Pin states
function updateActiveFileUI(filename) {
    currentFilename = filename;
    if (currentFilenameLabel) {
        currentFilenameLabel.textContent = filename;
    }
    if (currentFileBadge) {
        currentFileBadge.title = `Active: ${filename} (Click or Right-Click to open in main editor)`;
    }
    const isPinned = pinnedFilesList.includes(filename);
    if (btnPinToggle) {
        btnPinToggle.classList.toggle('active', isPinned);
        btnPinToggle.title = isPinned ? `Unpin ${filename}` : `Pin ${filename}`;
    }
    renderPinnedTabs();
}
// Pinned Tabs Rendering
function renderPinnedTabs() {
    pinnedTabs.innerHTML = '';
    if (pinnedFilesList.length === 0) {
        pinnedBar.style.display = 'none';
        return;
    }
    pinnedBar.style.display = 'flex';
    pinnedFilesList.forEach((file) => {
        const tab = document.createElement('div');
        tab.className = 'pinned-tab' + (file === currentFilename ? ' active' : '');
        tab.title = `Switch to ${file} (Right-click for options)`;
        // Short display label without leading underscores or extension if long
        const cleanLabel = file.replace(/\.(sass|scss|css)$/, '');
        const labelSpan = document.createElement('span');
        labelSpan.textContent = cleanLabel;
        const unpinBtn = document.createElement('button');
        unpinBtn.className = 'pinned-tab-unpin';
        unpinBtn.innerHTML = '&times;';
        unpinBtn.title = `Unpin ${file}`;
        unpinBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            vscode.postMessage({ type: 'togglePin', filename: file });
        });
        tab.appendChild(labelSpan);
        tab.appendChild(unpinBtn);
        tab.addEventListener('click', () => {
            if (file !== currentFilename) {
                saveImmediately();
                vscode.postMessage({ type: 'loadFile', filename: file });
            }
        });
        tab.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showContextMenu(e.clientX, e.clientY, file);
        });
        pinnedTabs.appendChild(tab);
    });
}
// Drawer Toggle
function setDrawerView(open) {
    isDrawerOpen = open;
    if (isDrawerOpen) {
        editorWrapper.classList.add('hidden');
        drawerView.classList.add('active');
        btnDrawerToggle.classList.add('active');
        if (newFileBar)
            newFileBar.classList.remove('active');
        hideSearchResults();
        vscode.postMessage({ type: 'getFileList' });
    }
    else {
        editorWrapper.classList.remove('hidden');
        drawerView.classList.remove('active');
        btnDrawerToggle.classList.remove('active');
        editorView.focus();
    }
}
btnDrawerToggle?.addEventListener('click', () => {
    setDrawerView(!isDrawerOpen);
});
btnPinToggle?.addEventListener('click', () => {
    if (currentFilename) {
        vscode.postMessage({ type: 'togglePin', filename: currentFilename });
    }
});
btnNewFile?.addEventListener('click', () => {
    newFileBar.classList.toggle('active');
    if (newFileBar.classList.contains('active')) {
        newFileInput.value = '';
        newFileInput.focus();
    }
});
newFileInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const val = newFileInput.value.trim();
        if (val) {
            vscode.postMessage({ type: 'createFile', filename: val });
            newFileBar.classList.remove('active');
            setDrawerView(false);
        }
    }
    else if (e.key === 'Escape') {
        newFileBar.classList.remove('active');
    }
});
// Current file badge click & right click
currentFileBadge?.addEventListener('click', (e) => {
    e.stopPropagation();
    vscode.postMessage({ type: 'openInEditor', filename: currentFilename });
});
currentFileBadge?.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    showContextMenu(e.clientX, e.clientY, currentFilename);
});
// Custom Context Menu Handling
function showContextMenu(x, y, filename) {
    contextTargetFile = filename || currentFilename;
    const isPinned = pinnedFilesList.includes(contextTargetFile);
    ctxTogglePin.textContent = isPinned ? '📌 Unpin File' : '📌 Pin File';
    customContextMenu.style.left = `${Math.min(x, window.innerWidth - 180)}px`;
    customContextMenu.style.top = `${Math.min(y, window.innerHeight - 150)}px`;
    customContextMenu.classList.add('active');
}
function hideContextMenu() {
    customContextMenu.classList.remove('active');
}
window.addEventListener('click', (e) => {
    if (!customContextMenu.contains(e.target)) {
        hideContextMenu();
    }
    if (!searchResultsPanel.contains(e.target) && e.target !== searchInput) {
        hideSearchResults();
    }
});
ctxOpenEditor?.addEventListener('click', () => {
    hideContextMenu();
    vscode.postMessage({ type: 'openInEditor', filename: contextTargetFile });
});
ctxTogglePin?.addEventListener('click', () => {
    hideContextMenu();
    vscode.postMessage({ type: 'togglePin', filename: contextTargetFile });
});
ctxCopyName?.addEventListener('click', () => {
    hideContextMenu();
    vscode.postMessage({ type: 'copyText', text: contextTargetFile });
});
ctxRevealOs?.addEventListener('click', () => {
    hideContextMenu();
    vscode.postMessage({ type: 'openFolder' });
});
// Search functionality
function focusSearchInput() {
    searchInput.focus();
    searchInput.select();
    if (searchInput.value.trim()) {
        triggerSearch(searchInput.value.trim());
    }
}
function hideSearchResults() {
    searchResultsPanel.classList.remove('active');
    selectedSearchIndex = -1;
}
function triggerSearch(val) {
    clearTimeout(searchDebounceTimeout);
    if (!val || !val.trim()) {
        hideSearchResults();
        searchClearBtn.style.display = 'none';
        searchCount.textContent = '';
        return;
    }
    searchClearBtn.style.display = 'inline-flex';
    searchDebounceTimeout = setTimeout(() => {
        vscode.postMessage({ type: 'search', query: val.trim() });
    }, 100);
}
searchInput?.addEventListener('input', () => {
    triggerSearch(searchInput.value);
});
searchClearBtn?.addEventListener('click', () => {
    searchInput.value = '';
    triggerSearch('');
    editorView.focus();
});
searchInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hideSearchResults();
        searchInput.blur();
        editorView.focus();
    }
    else if (e.key === 'ArrowDown') {
        e.preventDefault();
        moveSearchSelection(1);
    }
    else if (e.key === 'ArrowUp') {
        e.preventDefault();
        moveSearchSelection(-1);
    }
    else if (e.key === 'Enter') {
        e.preventDefault();
        if (selectedSearchIndex >= 0 && selectedSearchIndex < flatSearchResults.length) {
            const match = flatSearchResults[selectedSearchIndex];
            selectSearchResult(match);
        }
    }
});
function moveSearchSelection(delta) {
    if (flatSearchResults.length === 0)
        return;
    selectedSearchIndex += delta;
    if (selectedSearchIndex < 0)
        selectedSearchIndex = flatSearchResults.length - 1;
    if (selectedSearchIndex >= flatSearchResults.length)
        selectedSearchIndex = 0;
    const rows = searchResultsList.querySelectorAll('.search-result-row');
    rows.forEach((r, idx) => {
        if (idx === selectedSearchIndex) {
            r.classList.add('selected');
            r.scrollIntoView({ block: 'nearest' });
        }
        else {
            r.classList.remove('selected');
        }
    });
}
function selectSearchResult(match) {
    hideSearchResults();
    setDrawerView(false);
    saveImmediately();
    vscode.postMessage({
        type: 'loadFile',
        filename: match.filename,
        targetLine: match.line,
        matchStart: match.matchStart,
        matchEnd: match.matchEnd
    });
}
// Render search results
function renderSearchResults(query, results) {
    flatSearchResults = results || [];
    searchResultsList.innerHTML = '';
    selectedSearchIndex = -1;
    if (!results || results.length === 0) {
        searchCount.textContent = '0';
        searchResultsList.innerHTML = '<div style="padding: 12px; text-align: center; opacity: 0.6; font-size: 11px;">No matches found</div>';
        searchResultsPanel.classList.add('active');
        return;
    }
    searchCount.textContent = `${results.length}`;
    // Group matches by filename
    const grouped = new Map();
    for (const r of results) {
        const arr = grouped.get(r.filename) || [];
        arr.push(r);
        grouped.set(r.filename, arr);
    }
    let rowIdx = 0;
    grouped.forEach((fileMatches, fname) => {
        const groupDiv = document.createElement('div');
        groupDiv.className = 'search-file-group';
        const headerDiv = document.createElement('div');
        headerDiv.className = 'search-file-title';
        headerDiv.innerHTML = `<span>${fname}</span><span class="search-file-count">${fileMatches.length}</span>`;
        groupDiv.appendChild(headerDiv);
        fileMatches.forEach((m) => {
            const thisIdx = rowIdx++;
            const row = document.createElement('div');
            row.className = 'search-result-row' + (thisIdx === 0 ? ' selected' : '');
            if (thisIdx === 0)
                selectedSearchIndex = 0;
            const lineNum = document.createElement('span');
            lineNum.className = 'search-line-num';
            lineNum.textContent = `${m.line}`;
            const snippet = document.createElement('span');
            snippet.className = 'search-line-snippet';
            // Highlight match in snippet
            const lowerText = m.lineText.toLowerCase();
            const lowerQ = query.toLowerCase();
            const idx = lowerText.indexOf(lowerQ);
            if (idx !== -1) {
                const before = m.lineText.slice(0, idx);
                const matchStr = m.lineText.slice(idx, idx + query.length);
                const after = m.lineText.slice(idx + query.length);
                snippet.appendChild(document.createTextNode(before));
                const hl = document.createElement('span');
                hl.className = 'search-highlight';
                hl.textContent = matchStr;
                snippet.appendChild(hl);
                snippet.appendChild(document.createTextNode(after));
            }
            else {
                snippet.textContent = m.lineText;
            }
            row.appendChild(lineNum);
            row.appendChild(snippet);
            row.addEventListener('click', () => {
                selectSearchResult(m);
            });
            groupDiv.appendChild(row);
        });
        searchResultsList.appendChild(groupDiv);
    });
    searchResultsPanel.classList.add('active');
}
// Jump CodeMirror to target line and selection
function jumpToLineAndCol(lineNum, startCol, endCol) {
    try {
        const totalLines = editorView.state.doc.lines;
        const clampedLineNum = Math.max(1, Math.min(lineNum, totalLines));
        const line = editorView.state.doc.line(clampedLineNum);
        const anchor = line.from + (startCol !== undefined ? Math.min(startCol, line.length) : 0);
        const head = line.from + (endCol !== undefined ? Math.min(endCol, line.length) : (startCol !== undefined ? Math.min(startCol, line.length) : line.length));
        editorView.dispatch({
            selection: { anchor, head },
            scrollIntoView: true
        });
        editorView.focus();
    }
    catch (err) {
        console.error('Failed to jump to line', err);
    }
}
// Render drawer file list
function renderFileList(files, activeFilename) {
    allFilesList = files || [];
    docList.innerHTML = '';
    if (!files || files.length === 0) {
        docList.innerHTML = '<div style="padding: 30px; text-align: center; opacity: 0.5;">No styles found</div>';
        return;
    }
    files.forEach((file) => {
        const item = document.createElement('div');
        const isSelected = file.filename === activeFilename;
        const isPinned = pinnedFilesList.includes(file.filename);
        item.className = 'doc-item' + (isSelected ? ' selected' : '');
        const left = document.createElement('div');
        left.className = 'doc-item-left';
        const titleSpan = document.createElement('span');
        titleSpan.className = 'doc-item-title';
        titleSpan.textContent = file.filename;
        left.appendChild(titleSpan);
        const right = document.createElement('div');
        right.className = 'doc-item-right';
        const pinBtn = document.createElement('button');
        pinBtn.className = 'doc-pin-btn' + (isPinned ? ' pinned' : '');
        pinBtn.textContent = '📌';
        pinBtn.title = isPinned ? 'Unpin file' : 'Pin file';
        pinBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            vscode.postMessage({ type: 'togglePin', filename: file.filename });
        });
        right.appendChild(pinBtn);
        item.appendChild(left);
        item.appendChild(right);
        item.addEventListener('click', () => {
            if (file.filename !== currentFilename) {
                saveImmediately();
                vscode.postMessage({
                    type: 'loadFile',
                    filename: file.filename
                });
            }
            setDrawerView(false);
        });
        item.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showContextMenu(e.clientX, e.clientY, file.filename);
        });
        docList.appendChild(item);
    });
}
// Handle incoming messages from Extension host
window.addEventListener('message', (event) => {
    const message = event.data;
    switch (message.type) {
        case 'fileLoaded': {
            const isSameFile = message.filename === currentFilename;
            const currentDoc = editorView.state.doc.toString();
            // If same file and content didn't change (e.g. self-save confirmation):
            if (isSameFile && currentDoc === message.content && !message.targetLine) {
                // Absolutely DO NOT touch editor state or cursor!
                updateActiveFileUI(message.filename);
                setDrawerView(false);
                break;
            }
            if (isSameFile) {
                // Document updated while viewing the same file (e.g. external format or edit)
                // PRESERVE CURSOR AND SCROLL POSITION SO IT NEVER SHOOTS TO TOP!
                const prevSelection = editorView.state.selection;
                const prevScrollTop = editorView.scrollDOM.scrollTop;
                const prevScrollLeft = editorView.scrollDOM.scrollLeft;
                const newDocLen = message.content.length;
                const anchor = Math.min(prevSelection.main.anchor, newDocLen);
                const head = Math.min(prevSelection.main.head, newDocLen);
                isUpdatingDocProgrammatically = true;
                editorView.dispatch({
                    changes: { from: 0, to: editorView.state.doc.length, insert: message.content },
                    selection: { anchor, head },
                    scrollIntoView: false
                });
                isUpdatingDocProgrammatically = false;
                requestAnimationFrame(() => {
                    editorView.scrollDOM.scrollTop = prevScrollTop;
                    editorView.scrollDOM.scrollLeft = prevScrollLeft;
                });
            }
            else {
                // Switching to a different file
                // 1. Cache previous file state
                if (currentFilename) {
                    fileStateCache.set(currentFilename, {
                        selection: {
                            anchor: editorView.state.selection.main.anchor,
                            head: editorView.state.selection.main.head
                        },
                        scrollTop: editorView.scrollDOM.scrollTop,
                        scrollLeft: editorView.scrollDOM.scrollLeft
                    });
                }
                updateActiveFileUI(message.filename);
                // 2. Load new file content
                isUpdatingDocProgrammatically = true;
                const cached = fileStateCache.get(message.filename);
                const newDocLen = message.content.length;
                const anchor = cached ? Math.min(cached.selection.anchor, newDocLen) : 0;
                const head = cached ? Math.min(cached.selection.head, newDocLen) : 0;
                editorView.dispatch({
                    changes: { from: 0, to: editorView.state.doc.length, insert: message.content },
                    selection: { anchor, head },
                    scrollIntoView: false
                });
                isUpdatingDocProgrammatically = false;
                if (cached && !message.targetLine) {
                    requestAnimationFrame(() => {
                        editorView.scrollDOM.scrollTop = cached.scrollTop;
                        editorView.scrollDOM.scrollLeft = cached.scrollLeft;
                    });
                }
            }
            if (message.targetLine) {
                jumpToLineAndCol(message.targetLine, message.matchStart, message.matchEnd);
            }
            setDrawerView(false);
            break;
        }
        case 'fileList': {
            if (message.pinnedFiles) {
                pinnedFilesList = message.pinnedFiles;
            }
            renderFileList(message.files, message.currentFilename || currentFilename);
            updateActiveFileUI(message.currentFilename || currentFilename);
            break;
        }
        case 'pinnedFiles': {
            pinnedFilesList = message.files || [];
            renderPinnedTabs();
            updateActiveFileUI(message.currentFilename || currentFilename);
            break;
        }
        case 'searchResults': {
            renderSearchResults(message.query, message.results);
            break;
        }
        case 'toggleDrawer': {
            setDrawerView(!isDrawerOpen);
            break;
        }
        case 'focusSearch': {
            focusSearchInput();
            break;
        }
    }
});
// Signal extension host that webview is ready
vscode.postMessage({ type: 'ready' });
//# sourceMappingURL=main.js.map