#!/usr/bin/env python3
"""
Process large chat data file and extract most relevant conversations
"""

import json
import os
import re
from datetime import datetime
from pathlib import Path

def calculate_relevance_score(conversation):
    """Calculate relevance score for a conversation"""
    score = 0
    
    # Convert conversation to text for analysis
    text = str(conversation).lower()
    
    # Project-specific keywords (highest weight)
    project_keywords = ['a1betting', 'prizepicks', 'arbitrage', 'ensemble', 'betting', 'prediction']
    score += sum(5 for keyword in project_keywords if keyword in text)
    
    # Technical keywords
    technical_keywords = ['react', 'typescript', 'python', 'api', 'component', 'service', 'fastapi']
    score += sum(3 for keyword in technical_keywords if keyword in text)
    
    # Implementation keywords
    implementation_keywords = ['implement', 'create', 'build', 'fix', 'debug', 'error', 'function']
    score += sum(2 for keyword in implementation_keywords if keyword in text)
    
    # Code presence
    if '```' in str(conversation):
        score += 10
    if any(pattern in text for pattern in ['import ', 'export ', 'const ', 'function ', 'class ']):
        score += 5
    
    # Length bonus
    if len(text) > 500:
        score += 2
    if len(text) > 1000:
        score += 3
    
    return score

def extract_conversation_text(conversation):
    """Extract readable text from conversation data"""
    texts = []
    
    if isinstance(conversation, dict):
        # Look for common text fields
        for key in ['text', 'content', 'richText', 'message']:
            if key in conversation:
                value = conversation[key]
                if isinstance(value, str):
                    texts.append(value)
                elif isinstance(value, dict) and 'text' in value:
                    texts.append(str(value['text']))
        
        # Look for messages array
        if 'messages' in conversation:
            messages = conversation['messages']
            if isinstance(messages, list):
                for msg in messages:
                    if isinstance(msg, dict):
                        for field in ['content', 'text', 'message']:
                            if field in msg:
                                texts.append(str(msg[field]))
    
    return '\n'.join(texts) if texts else str(conversation)

def process_chat_data_file(input_file):
    """Process the large chat data file in chunks"""
    print(f"Processing large chat data file: {input_file}")
    
    # Read file size
    file_size = os.path.getsize(input_file)
    print(f"File size: {file_size / (1024*1024):.1f} MB")
    
    # Try to load the file
    try:
        with open(input_file, 'r', encoding='utf-8') as f:
            print("Loading chat data (this may take a moment)...")
            data = json.load(f)
    except Exception as e:
        print(f"Error loading file: {e}")
        return None
    
    print(f"Loaded data with {len(data.get('conversations', []))} conversations")
    
    # Process conversations
    conversations = data.get('conversations', [])
    processed_conversations = []
    
    print("Processing conversations...")
    for i, conv in enumerate(conversations):
        if i % 100 == 0:
            print(f"  Processed {i}/{len(conversations)} conversations")
        
        # Calculate relevance score
        relevance_score = calculate_relevance_score(conv)
        
        # Extract readable text
        readable_text = extract_conversation_text(conv)
        
        # Only keep conversations with some relevance
        if relevance_score > 0 or len(readable_text) > 100:
            processed_conv = {
                'id': f"conv_{i}",
                'relevance_score': relevance_score,
                'source_table': conv.get('source_table', 'unknown'),
                'source_key': conv.get('source_key', 'unknown'),
                'content': readable_text,
                'original_data': conv
            }
            processed_conversations.append(processed_conv)
    
    print(f"Kept {len(processed_conversations)} relevant conversations")
    
    # Sort by relevance score
    processed_conversations.sort(key=lambda x: x['relevance_score'], reverse=True)
    
    return processed_conversations

def categorize_conversations(conversations):
    """Categorize conversations by topic"""
    categories = {
        'High Priority A1Betting': [],
        'Frontend Development': [],
        'Backend Development': [],
        'API Development': [],
        'Database & Models': [],
        'Authentication & Security': [],
        'Testing & Debugging': [],
        'Performance & Optimization': [],
        'General Implementation': [],
        'Other': []
    }
    
    for conv in conversations:
        content = conv['content'].lower()
        assigned = False
        
        # High priority A1Betting specific
        if any(keyword in content for keyword in ['a1betting', 'prizepicks', 'arbitrage', 'ensemble']):
            categories['High Priority A1Betting'].append(conv)
            assigned = True
        
        # Frontend
        elif any(keyword in content for keyword in ['react', 'component', 'tsx', 'jsx', 'frontend', 'ui']):
            categories['Frontend Development'].append(conv)
            assigned = True
        
        # Backend
        elif any(keyword in content for keyword in ['python', 'fastapi', 'backend', 'server', 'endpoint']):
            categories['Backend Development'].append(conv)
            assigned = True
        
        # API
        elif any(keyword in content for keyword in ['api', 'endpoint', 'route', 'request', 'response']):
            categories['API Development'].append(conv)
            assigned = True
        
        # Database
        elif any(keyword in content for keyword in ['database', 'sqlite', 'model', 'schema', 'query']):
            categories['Database & Models'].append(conv)
            assigned = True
        
        # Auth
        elif any(keyword in content for keyword in ['auth', 'login', 'user', 'security', 'token']):
            categories['Authentication & Security'].append(conv)
            assigned = True
        
        # Testing
        elif any(keyword in content for keyword in ['test', 'debug', 'error', 'bug', 'fix']):
            categories['Testing & Debugging'].append(conv)
            assigned = True
        
        # Performance
        elif any(keyword in content for keyword in ['performance', 'optimization', 'cache', 'speed']):
            categories['Performance & Optimization'].append(conv)
            assigned = True
        
        # Implementation
        elif any(keyword in content for keyword in ['implement', 'create', 'build', 'develop']):
            categories['General Implementation'].append(conv)
            assigned = True
        
        if not assigned:
            categories['Other'].append(conv)
    
    # Remove empty categories
    return {k: v for k, v in categories.items() if v}

def save_processed_data(conversations, categories, output_dir):
    """Save processed data to files"""
    output_path = Path(output_dir)
    output_path.mkdir(exist_ok=True)
    
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    
    # Save top conversations (highest relevance)
    top_conversations = conversations[:50]  # Top 50 most relevant
    with open(output_path / f"top_conversations_{timestamp}.json", 'w', encoding='utf-8') as f:
        json.dump(top_conversations, f, indent=2, ensure_ascii=False, default=str)
    
    # Save categorized conversations
    for category, convs in categories.items():
        if convs:
            filename = category.lower().replace(' ', '_').replace('&', 'and')
            
            # Save JSON
            with open(output_path / f"{filename}_{timestamp}.json", 'w', encoding='utf-8') as f:
                json.dump(convs[:20], f, indent=2, ensure_ascii=False, default=str)  # Top 20 per category
            
            # Save readable text
            with open(output_path / f"{filename}_{timestamp}.txt", 'w', encoding='utf-8') as f:
                f.write(f"{category} - Recovered Chat History\n")
                f.write("=" * 50 + "\n\n")
                
                for i, conv in enumerate(convs[:10]):  # Top 10 for text files
                    f.write(f"=== Conversation {i+1} (Score: {conv['relevance_score']}) ===\n")
                    f.write(f"Source: {conv['source_table']} / {conv.get('source_key', 'unknown')}\n")
                    f.write(f"Content:\n{conv['content']}\n\n")
                    f.write("=" * 80 + "\n\n")
    
    # Save summary
    summary = {
        'total_conversations': len(conversations),
        'categories': {cat: len(convs) for cat, convs in categories.items()},
        'top_10_scores': [conv['relevance_score'] for conv in conversations[:10]],
        'processing_timestamp': timestamp
    }
    
    with open(output_path / f"summary_{timestamp}.json", 'w', encoding='utf-8') as f:
        json.dump(summary, f, indent=2)
    
    # Save readable summary
    with open(output_path / f"summary_{timestamp}.txt", 'w', encoding='utf-8') as f:
        f.write("A1Betting Chat History Recovery Summary\n")
        f.write("=" * 50 + "\n\n")
        f.write(f"Total conversations processed: {len(conversations)}\n")
        f.write(f"Processing date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n\n")
        
        f.write("Categories:\n")
        for cat, convs in categories.items():
            f.write(f"  {cat}: {len(convs)} conversations\n")
        
        f.write(f"\nTop 10 conversation scores: {summary['top_10_scores']}\n\n")
        
        f.write("Recommended next steps:\n")
        f.write("1. Start with 'High Priority A1Betting' conversations\n")
        f.write("2. Review 'Frontend Development' and 'Backend Development' for implementation details\n")
        f.write("3. Check 'Testing & Debugging' for known issues and solutions\n")
        f.write("4. Look at 'API Development' for integration patterns\n")
    
    print(f"Processed data saved to: {output_path}")
    return output_path

def main():
    print("Large Chat Data Processor")
    print("=" * 40)
    
    # Look for the extracted chat data file
    chat_files = list(Path('.').glob('organized_chat_data_*.json'))
    if not chat_files:
        print("No organized chat data files found. Please run extract_chat_data.py first.")
        return
    
    # Use the most recent file
    input_file = max(chat_files, key=lambda f: f.stat().st_mtime)
    print(f"Using input file: {input_file}")
    
    # Process the data
    conversations = process_chat_data_file(input_file)
    if not conversations:
        print("Failed to process chat data")
        return
    
    print(f"\nProcessed {len(conversations)} conversations")
    print(f"Top 10 relevance scores: {[conv['relevance_score'] for conv in conversations[:10]]}")
    
    # Categorize conversations
    print("\nCategorizing conversations...")
    categories = categorize_conversations(conversations)
    
    print("Category distribution:")
    for cat, convs in categories.items():
        print(f"  {cat}: {len(convs)} conversations")
    
    # Save processed data
    output_dir = save_processed_data(conversations, categories, "recovered_chat_history")
    
    print(f"\n🎉 Chat history recovery complete!")
    print(f"📁 Results saved to: {output_dir}")
    print("\n📋 Next steps:")
    print("1. Review the summary file for an overview")
    print("2. Start with 'high_priority_a1betting_*.txt' for project-specific conversations")
    print("3. Check other category files based on what you're trying to recover")
    print("4. Use the JSON files for detailed analysis")

if __name__ == "__main__":
    main() 