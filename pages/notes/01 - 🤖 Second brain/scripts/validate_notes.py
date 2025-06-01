#!/usr/bin/env python3
"""
Note Link Validation Script for Second Brain
Validates that all links in "Related notes" sections point to existing files
in the allowed knowledge folders.
"""

import os
import re
from pathlib import Path
import argparse

def find_markdown_files(directory):
    """Find all markdown files in a directory and subdirectories."""
    markdown_files = []
    for root, dirs, files in os.walk(directory):
        for file in files:
            if file.endswith('.md'):
                markdown_files.append(os.path.join(root, file))
    return markdown_files

def extract_links_from_content(content):
    """Extract all [[wiki-style]] links from content."""
    # Pattern to match [[link]] or [[link|display text]]
    pattern = r'\[\[([^\]|]+)(?:\|[^\]]+)?\]\]'
    matches = re.findall(pattern, content)
    return matches

def find_related_notes_section(content):
    """Find and extract links from the 'Related notes' section."""
    lines = content.split('\n')
    in_related_section = False
    related_links = []
    
    for line in lines:
        # Check if we're entering the Related notes section
        if line.strip().lower() in ['## related notes', '# related notes']:
            in_related_section = True
            continue
        
        # Check if we're entering a new section (end of Related notes)
        if in_related_section and line.strip().startswith('#'):
            break
            
        # Extract links from the Related notes section
        if in_related_section:
            links = extract_links_from_content(line)
            related_links.extend(links)
    
    return related_links

def build_knowledge_index(knowledge_dir):
    """Build an index of all available notes in the knowledge base."""
    knowledge_index = {}
    
    # Valid directories for knowledge notes
    valid_dirs = [
        "1 - 🚀 Projects",
        "2 - 🌱 Areas", 
        "3 - 📚 Resources"
    ]
    
    for valid_dir in valid_dirs:
        full_path = os.path.join(knowledge_dir, valid_dir)
        if os.path.exists(full_path):
            markdown_files = find_markdown_files(full_path)
            for file_path in markdown_files:
                # Extract filename without extension as the note title
                note_title = os.path.splitext(os.path.basename(file_path))[0]
                knowledge_index[note_title] = file_path
    
    return knowledge_index

def validate_note_links(file_path, knowledge_index, notes_dir):
    """Validate all links in a note's Related notes section."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        print(f"Warning: Could not read {file_path} (encoding issue)")
        return []
    
    related_links = find_related_notes_section(content)
    invalid_links = []
    
    for link in related_links:
        # Check if link points to forbidden directories
        if any(forbidden in link for forbidden in ['04 - 💽 RAW', '99 - 📄 To process']):
            invalid_links.append({
                'link': link,
                'issue': 'Links to forbidden directory (RAW or To process)',
                'file': file_path
            })
            continue
        
        # Extract just the note title from the link
        note_title = link.split('/')[-1]  # Get the last part after any path
        
        # Check if the note exists in our knowledge index
        if note_title not in knowledge_index:
            invalid_links.append({
                'link': link,
                'issue': 'Note does not exist in knowledge base',
                'file': file_path
            })
    
    return invalid_links

def check_ai_summary_needed(file_path):
    """Check if a note needs an AI-assisted summary."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
    except UnicodeDecodeError:
        return None
    
    # Check if it already has an AI summary
    has_summary = 'AI-assisted summary' in content or 'ai-assisted summary' in content
    
    # Count characters (excluding frontmatter)
    lines = content.split('\n')
    in_frontmatter = False
    content_lines = []
    
    for line in lines:
        if line.strip() == '---':
            in_frontmatter = not in_frontmatter
            continue
        if not in_frontmatter:
            content_lines.append(line)
    
    content_without_frontmatter = '\n'.join(content_lines)
    char_count = len(content_without_frontmatter)
    
    return {
        'char_count': char_count,
        'has_summary': has_summary,
        'needs_summary': char_count > 1500 and not has_summary
    }

def main():
    parser = argparse.ArgumentParser(description='Validate note links in Second Brain')
    parser.add_argument('notes_dir', help='Path to the notes directory')
    parser.add_argument('--check-summaries', action='store_true', 
                      help='Also check for missing AI summaries')
    
    args = parser.parse_args()
    
    notes_dir = Path(args.notes_dir)
    knowledge_dir = notes_dir / "10 - 🧠 Knowledge"
    
    if not knowledge_dir.exists():
        print(f"Error: Knowledge directory not found at {knowledge_dir}")
        return
    
    # Build index of available knowledge notes
    print("Building knowledge base index...")
    knowledge_index = build_knowledge_index(knowledge_dir)
    print(f"Found {len(knowledge_index)} notes in knowledge base")
    
    # Find all markdown files to validate
    all_markdown_files = find_markdown_files(str(notes_dir))
    
    print(f"\nValidating links in {len(all_markdown_files)} notes...")
    
    total_invalid_links = []
    notes_needing_summaries = []
    
    for file_path in all_markdown_files:
        # Validate links
        invalid_links = validate_note_links(file_path, knowledge_index, str(notes_dir))
        total_invalid_links.extend(invalid_links)
        
        # Check AI summaries if requested
        if args.check_summaries:
            summary_check = check_ai_summary_needed(file_path)
            if summary_check and summary_check['needs_summary']:
                notes_needing_summaries.append({
                    'file': file_path,
                    'char_count': summary_check['char_count']
                })
    
    # Report results
    print(f"\n=== VALIDATION RESULTS ===")
    print(f"Total files checked: {len(all_markdown_files)}")
    print(f"Invalid links found: {len(total_invalid_links)}")
    
    if total_invalid_links:
        print(f"\n🚨 INVALID LINKS:")
        for invalid in total_invalid_links:
            rel_path = os.path.relpath(invalid['file'], str(notes_dir))
            print(f"  📄 {rel_path}")
            print(f"     🔗 Link: [[{invalid['link']}]]")
            print(f"     ❌ Issue: {invalid['issue']}")
            print()
    
    if args.check_summaries and notes_needing_summaries:
        print(f"\n📝 NOTES NEEDING AI SUMMARIES ({len(notes_needing_summaries)}):")
        for note in notes_needing_summaries:
            rel_path = os.path.relpath(note['file'], str(notes_dir))
            print(f"  📄 {rel_path} ({note['char_count']} chars)")
    
    if not total_invalid_links and (not args.check_summaries or not notes_needing_summaries):
        print("✅ All validations passed!")

if __name__ == "__main__":
    main()
