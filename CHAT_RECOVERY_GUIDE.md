# Cursor Chat History Recovery Guide

This guide will help you recover lost chat history from Cursor's workspace storage using the provided Python and Node.js scripts.

## Prerequisites

- Python 3.7+ (for `export_chats.py`)
- Node.js (for `clean_history.js`)
- Access to your Cursor workspace storage directory

## Step 1: Locate Your Workspace Storage

On Windows, your Cursor workspace storage is typically located at:
```
%APPDATA%\Cursor\User\workspaceStorage
```

To navigate there:
1. Press `Win + R`
2. Type `%APPDATA%\Cursor\User\workspaceStorage`
3. Press Enter

## Step 2: Export Chat History

Use the Python script to search through SQLite databases and export chat history:

### Basic Usage
```bash
python export_chats.py
```

### Advanced Usage Examples

**Search for specific keywords:**
```bash
python export_chats.py --keywords A1Betting react typescript api implementation
```

**Search within a date range:**
```bash
python export_chats.py --start-date 2024-11-01 --end-date 2024-12-01
```

**Search last 7 days:**
```bash
python export_chats.py --days-back 7
```

**Combine keywords and date range:**
```bash
python export_chats.py --keywords betting prediction ensemble --days-back 14 --output my_chat_export.json
```

**Use custom storage path:**
```bash
python export_chats.py --storage-path "C:\Custom\Path\To\Storage" --keywords react component
```

## Step 3: Clean and Organize Data

Use the Node.js script to process the exported data:

### Basic Usage
```bash
node clean_history.js cursor_chat_export_20241201_143022.json
```

### Custom Output Directory
```bash
node clean_history.js cursor_chat_export_20241201_143022.json my_cleaned_chats
```

## Suggested Search Strategies

### Phase 1: Broad Search
Start with general project keywords to cast a wide net:
```bash
python export_chats.py --keywords A1Betting betting prediction --days-back 30
```

### Phase 2: Technical Focus
Search for specific technical discussions:
```bash
python export_chats.py --keywords react typescript component api fastapi --days-back 21
```

### Phase 3: Implementation Details
Look for specific implementation discussions:
```bash
python export_chats.py --keywords implement create build fix debug error --days-back 14
```

### Phase 4: Feature-Specific
Search for specific features you're trying to recover:
```bash
python export_chats.py --keywords authentication dashboard analytics ensemble arbitrage --days-back 30
```

## Understanding the Output

### From export_chats.py
- Creates a JSON file with raw chat data from SQLite databases
- Shows which databases were searched and how many records found
- Includes metadata about the search parameters

### From clean_history.js
- Creates organized folders with cleaned chat history
- Groups conversations by topic (Frontend, Backend, API, etc.)
- Generates both JSON and readable text files
- Provides a summary with relevance scores

### Output Structure
```
cleaned_chat_history/
├── summary_[timestamp].txt              # Human-readable summary
├── summary_[timestamp].json             # Detailed summary data
├── all_conversations_[timestamp].json   # All conversations
├── frontend_development_[timestamp].json # Frontend-related chats
├── frontend_development_[timestamp].txt  # Readable frontend chats
├── backend_development_[timestamp].json  # Backend-related chats
├── backend_development_[timestamp].txt   # Readable backend chats
└── ... (other topic groups)
```

## Tips for Effective Recovery

### 1. Start Broad, Then Narrow
- Begin with general keywords and wider date ranges
- Use the results to identify more specific search terms
- Refine your searches based on what you find

### 2. Use Multiple Keyword Sets
Different conversations might use different terminology:
- Technical: `react typescript python api`
- Functional: `betting prediction arbitrage ensemble`
- Development: `implement create build debug fix`

### 3. Check Different Time Periods
If you don't find what you're looking for:
- Try different date ranges
- Some conversations might be older than expected
- Use `--days-back` with larger numbers (30, 60, 90 days)

### 4. Review All Output Files
- Start with the summary file for an overview
- Check the highest-scoring conversations first
- Use text files for easier reading
- JSON files for programmatic analysis

### 5. Iterative Refinement
- Run multiple searches with different parameters
- Combine results from different searches
- Look for patterns in successful searches

## Common Search Keywords by Category

### Project-Specific
- `A1Betting`
- `prizepicks`
- `arbitrage`
- `ensemble`
- `betting`
- `prediction`
- `sportsbook`

### Frontend Development
- `react`
- `typescript`
- `component`
- `tsx`
- `jsx`
- `ui`
- `frontend`
- `dashboard`

### Backend Development
- `python`
- `fastapi`
- `api`
- `endpoint`
- `backend`
- `server`
- `database`
- `sqlite`

### Implementation
- `implement`
- `create`
- `build`
- `develop`
- `fix`
- `debug`
- `error`
- `issue`
- `solution`

## Troubleshooting

### No Results Found
1. Check if the storage path exists
2. Try broader keywords
3. Expand the date range
4. Verify Cursor is storing chat history

### Low-Quality Results
1. Increase the relevance threshold in `clean_history.js`
2. Add more specific project keywords
3. Filter by conversation length

### Performance Issues
1. Limit the date range for large searches
2. Use more specific keywords to reduce data volume
3. Process results in smaller batches

## Advanced Usage

### Custom Keyword Lists
Edit the `projectKeywords` array in `clean_history.js` to add your specific terms.

### Multiple Storage Locations
If you have multiple Cursor installations or backup locations:
```bash
python export_chats.py --storage-path "C:\Backup\Cursor\Storage" --keywords your_keywords
```

### Combining Multiple Exports
You can run multiple exports and combine the results:
```bash
# Export from different time periods
python export_chats.py --start-date 2024-10-01 --end-date 2024-10-31 --output october.json
python export_chats.py --start-date 2024-11-01 --end-date 2024-11-30 --output november.json

# Clean each separately
node clean_history.js october.json october_cleaned
node clean_history.js november.json november_cleaned
```

## Next Steps After Recovery

1. **Review the Summary**: Start with the summary file to understand what was recovered
2. **Prioritize by Relevance**: Focus on high-scoring conversations first
3. **Reconstruct Implementation**: Use code snippets and discussions to rebuild lost work
4. **Document Findings**: Create notes about what you've recovered for future reference
5. **Backup Strategy**: Set up regular exports to prevent future data loss

## Support

If you encounter issues:
1. Check that all prerequisites are installed
2. Verify file paths and permissions
3. Try with smaller datasets first
4. Review the console output for error messages

Remember: The quality of recovery depends on how much chat history Cursor has stored and how specific your search terms are. Be patient and try multiple approaches for the best results. 