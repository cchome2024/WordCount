<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# LexiCount Pro - Word Frequency Analyzer

A professional tool to analyze word frequency in Word (.docx) and PDF documents, featuring advanced filtering and visualization.

## Features

- 📄 **Multi-format Support**: Analyze Word (.docx) and PDF files
- 📊 **Dual Statistics**: Two separate word frequency tables
  - Allowed words table (677 predefined words)
  - Other words table (excluding common everyday words)
- 🔍 **Advanced Filtering**: Filter by minimum word length
- 📋 **Copy Functions**: Copy full data or words only
- 🔄 **Reset Function**: Clear all data and start fresh

## Quick Start

**Prerequisites:** Node.js

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the app:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

See [使用说明.md](./使用说明.md) for detailed usage instructions in Chinese.

### Basic Workflow

1. **Upload Files**: Click or drag & drop .docx or .pdf files
2. **Wait for Processing**: Files are processed automatically
3. **View Results**: Two statistics tables are displayed
4. **Filter (Optional)**: Set minimum word length for "Other Words" table
5. **Copy Data**: Use copy buttons to export data
6. **Reset**: Click "Reset Analysis" button to clear all data

## Features Details

### Dual Statistics Tables

1. **Allowed Words Table**: Only counts words from a predefined list of 677 words
2. **Other Words Table**: Counts words not in the list, excluding common everyday words

### Copy Functions

- **Copy Full**: Copy rank, word, and count (tab-separated, Excel-ready)
- **Copy Words Only**: Copy only the words (one per line)

### Filter Options

- Set minimum word length (3-10 letters) for "Other Words" table
- Filter applies in real-time

### Reset Function

- Located at the top-right corner
- Clears all uploaded files and statistics
- Resets the application to initial state

## File Format Support

- ✅ **Supported**: 
  - Word documents (.docx)
  - PDF files with text content
  
- ❌ **Not Supported**:
  - Scanned PDFs (image-based, requires OCR)
  - Encrypted PDFs (requires password)
  - Corrupted or invalid files

## Technical Details

- Built with React + TypeScript
- Uses PDF.js for PDF parsing
- Uses Mammoth.js for Word document parsing
- Vite for build tooling

## View in AI Studio

View your app in AI Studio: https://ai.studio/apps/drive/1p2DwVT5hd7UqI4efPy_s-PxGIKembNoq

## License

MIT
