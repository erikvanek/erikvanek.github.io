#!/usr/bin/env python3
"""
URL Registry Management Script for Second Brain
Manages clean URLs, handles collisions, and validates the registry.
"""

import os
import json
import re
import argparse
from pathlib import Path

def generate_slug(title):
    """Generate a clean URL slug from a title."""
    # Remove common suffixes
    title = re.sub(r' - Reading Notes$', '', title)
    title = re.sub(r' \(.*?\)$', '', title)  # Remove parenthetical content
    
    # Convert to slug
    slug = title.lower()
    slug = re.sub(r'[^\w\s-]', '', slug)  # Remove special chars & emojis
    slug = re.sub(r'\s+', '-', slug)      # Replace spaces with hyphens
    slug = re.sub(r'-+', '-', slug)       # Collapse multiple hyphens
    slug = slug.strip('-')                # Remove leading/trailing hyphens
    
    return slug

def load_registry(registry_path):
    """Load the URL registry from JSON file."""
    if os.path.exists(registry_path):
        with open(registry_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    else:
        return {
            "urls": {},
            "meta": {
                "last_updated": "",
                "total_urls": 0,
                "categories": {
                    "book": 0,
                    "knowledge": 0,
                    "project": 0,
                    "area": 0
                }
            }
        }

def save_registry(registry, registry_path):
    """Save the URL registry to JSON file."""
    from datetime import datetime
    
    # Update metadata
    registry["meta"]["last_updated"] = datetime.now().strftime("%Y-%m-%d")
    registry["meta"]["total_urls"] = len(registry["urls"])
    
    # Count categories
    categories = {"book": 0, "knowledge": 0, "project": 0, "area": 0}
    for url_data in registry["urls"].values():
        category = url_data.get("category", "unknown")
        if category in categories:
            categories[category] += 1
    registry["meta"]["categories"] = categories
    
    with open(registry_path, 'w', encoding='utf-8') as f:
        json.dump(registry, f, indent=2, ensure_ascii=False)

def check_collision(slug, registry):
    """Check if slug exists and find next available version."""
    if slug not in registry["urls"]:
        return slug
    
    # Find next available number
    counter = 2
    while f"{slug}-{counter}" in registry["urls"]:
        counter += 1
    
    return f"{slug}-{counter}"

def add_url(title, file_path, category, registry_path):
    """Add a new URL to the registry."""
    registry = load_registry(registry_path)
    
    # Generate slug
    base_slug = generate_slug(title)
    final_slug = check_collision(base_slug, registry)
    
    # Add to registry
    registry["urls"][final_slug] = {
        "title": title,
        "file": file_path,
        "category": category,
        "created": datetime.now().strftime("%Y-%m-%d")
    }
    
    save_registry(registry, registry_path)
    
    return final_slug

def validate_registry(registry_path, notes_dir):
    """Validate URL registry for duplicates and broken file references."""
    registry = load_registry(registry_path)
    errors = []
    warnings = []
    
    # Check for duplicate slugs (should never happen with proper collision handling)
    slugs_seen = set()
    for slug in registry["urls"]:
        if slug in slugs_seen:
            errors.append(f"Duplicate slug found: '{slug}'")
        slugs_seen.add(slug)
    
    # Check file references
    for slug, data in registry["urls"].items():
        file_path = os.path.join(notes_dir, data["file"])
        if not os.path.exists(file_path):
            errors.append(f"File not found for slug '{slug}': {data['file']}")
    
    # Check for files with slugs that aren't in registry
    markdown_files = []
    for root, dirs, files in os.walk(notes_dir):
        for file in files:
            if file.endswith('.md'):
                rel_path = os.path.relpath(os.path.join(root, file), notes_dir)
                markdown_files.append(rel_path)
    
    registered_files = set(data["file"] for data in registry["urls"].values())
    unregistered_files = []
    
    for file_path in markdown_files:
        if file_path not in registered_files:
            # Check if file has slug in frontmatter
            full_path = os.path.join(notes_dir, file_path)
            try:
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    if 'slug:' in content and 'permalink:' in content:
                        unregistered_files.append(file_path)
            except:
                pass
    
    if unregistered_files:
        warnings.append(f"Files with slugs not in registry: {len(unregistered_files)}")
        for file_path in unregistered_files[:5]:  # Show first 5
            warnings.append(f"  - {file_path}")
    
    return errors, warnings

def main():
    parser = argparse.ArgumentParser(description='Manage URL registry for Second Brain')
    parser.add_argument('command', choices=['add', 'validate', 'generate'], 
                       help='Command to execute')
    parser.add_argument('--notes-dir', default='../..', 
                       help='Path to notes directory')
    parser.add_argument('--title', help='Title for URL generation')
    parser.add_argument('--file', help='File path relative to notes directory')
    parser.add_argument('--category', choices=['book', 'knowledge', 'project', 'area'],
                       help='Category for the URL')
    
    args = parser.parse_args()
    
    notes_dir = Path(args.notes_dir).resolve()
    registry_path = notes_dir / '_data' / 'url-registry.json'
    
    if args.command == 'add':
        if not all([args.title, args.file, args.category]):
            print("Error: --title, --file, and --category are required for 'add' command")
            return
        
        slug = add_url(args.title, args.file, args.category, registry_path)
        print(f"Added URL: /{slug}/ -> {args.file}")
        
    elif args.command == 'validate':
        errors, warnings = validate_registry(registry_path, notes_dir)
        
        if errors:
            print("❌ ERRORS:")
            for error in errors:
                print(f"  {error}")
        
        if warnings:
            print("⚠️  WARNINGS:")
            for warning in warnings:
                print(f"  {warning}")
        
        if not errors and not warnings:
            print("✅ URL registry validation passed!")
            
    elif args.command == 'generate':
        if not args.title:
            print("Error: --title is required for 'generate' command")
            return
            
        slug = generate_slug(args.title)
        registry = load_registry(registry_path)
        final_slug = check_collision(slug, registry)
        
        print(f"Generated slug: {final_slug}")
        if final_slug != slug:
            print(f"  (collision detected, incremented from: {slug})")

if __name__ == "__main__":
    from datetime import datetime
    main()
