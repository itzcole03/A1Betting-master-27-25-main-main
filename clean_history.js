#!/usr/bin/env node

/**
 * Cursor Chat History Cleaner
 * Processes exported chat history to filter, clean, and organize conversations
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class ChatHistoryCleaner {
    constructor() {
        this.projectKeywords = [
            // General project keywords
            'A1Betting', 'betting', 'prediction', 'arbitrage', 'ensemble',
            'prizepicks', 'sportsbook', 'odds', 'model', 'algorithm',
            
            // Technical keywords
            'react', 'typescript', 'python', 'fastapi', 'sqlite', 'api',
            'frontend', 'backend', 'component', 'service', 'hook',
            
            // Feature keywords
            'authentication', 'dashboard', 'analytics', 'monitoring',
            'performance', 'optimization', 'caching', 'database',
            
            // Development keywords
            'bug', 'fix', 'implement', 'refactor', 'debug', 'test',
            'deployment', 'production', 'staging', 'development'
        ];
        
        this.irrelevantPatterns = [
            /^[\s\n]*$/,  // Empty or whitespace only
            /^(ok|yes|no|thanks|thank you)[\s\n]*$/i,  // Simple responses
            /^[\d\s\-_]+$/,  // Just numbers, spaces, dashes, underscores
            /^[^\w\s]{1,10}$/,  // Just special characters
            /loading\.\.\./i,
            /please wait/i,
            /^error:?\s*$/i
        ];
    }

    /**
     * Load and parse the exported chat history JSON file
     */
    loadChatHistory(filePath) {
        try {
            if (!fs.existsSync(filePath)) {
                throw new Error(`File not found: ${filePath}`);
            }

            const content = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(content);
        } catch (error) {
            console.error(`Error loading chat history: ${error.message}`);
            process.exit(1);
        }
    }

    /**
     * Check if content is relevant based on project keywords
     */
    isRelevantContent(content) {
        if (!content || typeof content !== 'string') {
            return false;
        }

        const lowerContent = content.toLowerCase();
        
        // Check for project keywords
        const hasProjectKeywords = this.projectKeywords.some(keyword => 
            lowerContent.includes(keyword.toLowerCase())
        );

        // Check for code patterns
        const hasCodePatterns = /```|`[^`]+`|function|class|import|export|const|let|var|def |async |await |\.tsx?|\.py|\.js|\.json/i.test(content);

        // Check for implementation discussions
        const hasImplementationKeywords = /implement|create|build|develop|fix|debug|error|issue|problem|solution|how to|need to|should|would|could/i.test(content);

        return hasProjectKeywords || hasCodePatterns || hasImplementationKeywords;
    }

    /**
     * Check if content should be filtered out as irrelevant
     */
    isIrrelevantContent(content) {
        if (!content || typeof content !== 'string') {
            return true;
        }

        return this.irrelevantPatterns.some(pattern => pattern.test(content.trim()));
    }

    /**
     * Clean markdown formatting and normalize text
     */
    cleanMarkdown(text) {
        if (!text || typeof text !== 'string') {
            return '';
        }

        return text
            // Preserve code blocks but clean them
            .replace(/```(\w+)?\n([\s\S]*?)```/g, (match, lang, code) => {
                return `\`\`\`${lang || ''}\n${code.trim()}\n\`\`\``;
            })
            // Clean inline code
            .replace(/`([^`\n]+)`/g, '`$1`')
            // Remove excessive whitespace but preserve structure
            .replace(/\n{3,}/g, '\n\n')
            .replace(/[ \t]+/g, ' ')
            // Clean up common markdown artifacts
            .replace(/^\s*[>#*-]\s*/gm, '')
            .replace(/\*\*(.*?)\*\*/g, '$1')
            .replace(/\*(.*?)\*/g, '$1')
            .replace(/~~(.*?)~~/g, '$1')
            .trim();
    }

    /**
     * Extract and clean conversations from the raw data
     */
    extractConversations(chatData) {
        const conversations = [];
        
        if (!chatData.results || !Array.isArray(chatData.results)) {
            console.log('No results found in chat data');
            return conversations;
        }

        chatData.results.forEach((dbResult, dbIndex) => {
            console.log(`Processing database: ${dbResult.database_path}`);
            
            if (!dbResult.tables) {
                return;
            }

            Object.entries(dbResult.tables).forEach(([tableName, records]) => {
                console.log(`  Processing table: ${tableName} (${records.length} records)`);
                
                records.forEach((record, recordIndex) => {
                    // Try to extract meaningful content from various possible column names
                    const possibleContentFields = ['content', 'message', 'text', 'data', 'value', 'body'];
                    const possibleTimestampFields = ['timestamp', 'created', 'updated', 'date', 'time', 'created_at'];
                    const possibleUserFields = ['user', 'role', 'author', 'sender', 'user_id'];

                    let content = '';
                    let timestamp = null;
                    let user = '';

                    // Extract content
                    for (const field of possibleContentFields) {
                        if (record[field] && typeof record[field] === 'string') {
                            content = record[field];
                            break;
                        }
                    }

                    // If no direct content field, try to serialize the whole record
                    if (!content) {
                        const recordStr = JSON.stringify(record, null, 2);
                        if (this.isRelevantContent(recordStr)) {
                            content = recordStr;
                        }
                    }

                    // Extract timestamp
                    for (const field of possibleTimestampFields) {
                        if (record[field]) {
                            timestamp = record[field];
                            break;
                        }
                    }

                    // Extract user
                    for (const field of possibleUserFields) {
                        if (record[field] && typeof record[field] === 'string') {
                            user = record[field];
                            break;
                        }
                    }

                    // Filter and clean content
                    if (content && !this.isIrrelevantContent(content) && this.isRelevantContent(content)) {
                        const cleanedContent = this.cleanMarkdown(content);
                        
                        if (cleanedContent.length > 10) { // Minimum content length
                            conversations.push({
                                id: crypto.createHash('md5').update(`${dbIndex}-${tableName}-${recordIndex}`).digest('hex'),
                                database: path.basename(dbResult.database_path),
                                table: tableName,
                                content: cleanedContent,
                                timestamp: timestamp,
                                user: user,
                                relevanceScore: this.calculateRelevanceScore(cleanedContent),
                                originalRecord: record
                            });
                        }
                    }
                });
            });
        });

        return conversations.sort((a, b) => {
            // Sort by relevance score first, then by timestamp
            if (a.relevanceScore !== b.relevanceScore) {
                return b.relevanceScore - a.relevanceScore;
            }
            
            if (a.timestamp && b.timestamp) {
                return new Date(b.timestamp) - new Date(a.timestamp);
            }
            
            return 0;
        });
    }

    /**
     * Calculate relevance score for content
     */
    calculateRelevanceScore(content) {
        let score = 0;
        const lowerContent = content.toLowerCase();

        // Project-specific keywords (higher weight)
        const projectSpecificKeywords = ['a1betting', 'prizepicks', 'arbitrage', 'ensemble'];
        score += projectSpecificKeywords.filter(keyword => 
            lowerContent.includes(keyword)
        ).length * 5;

        // Technical keywords
        const technicalKeywords = ['react', 'typescript', 'python', 'api', 'component', 'service'];
        score += technicalKeywords.filter(keyword => 
            lowerContent.includes(keyword)
        ).length * 3;

        // Code presence
        if (/```[\s\S]*```/.test(content)) {
            score += 10; // Code blocks are highly relevant
        }
        if (/`[^`\n]+`/.test(content)) {
            score += 3; // Inline code
        }

        // Implementation discussions
        const implementationKeywords = ['implement', 'create', 'build', 'fix', 'debug'];
        score += implementationKeywords.filter(keyword => 
            lowerContent.includes(keyword)
        ).length * 2;

        // Length bonus (longer conversations are often more valuable)
        if (content.length > 500) score += 2;
        if (content.length > 1000) score += 3;

        return score;
    }

    /**
     * Group conversations by topic/theme
     */
    groupConversations(conversations) {
        const groups = {
            'Frontend Development': [],
            'Backend Development': [],
            'Authentication & Security': [],
            'Database & Models': [],
            'API Development': [],
            'Testing & Debugging': [],
            'Deployment & Production': [],
            'Performance & Optimization': [],
            'General Discussion': []
        };

        conversations.forEach(conv => {
            const content = conv.content.toLowerCase();
            let assigned = false;

            // Frontend
            if (/react|component|tsx|jsx|frontend|ui|ux|css|html/.test(content)) {
                groups['Frontend Development'].push(conv);
                assigned = true;
            }

            // Backend
            if (/python|fastapi|backend|api|server|endpoint/.test(content)) {
                groups['Backend Development'].push(conv);
                assigned = true;
            }

            // Auth
            if (/auth|login|user|security|token|jwt|session/.test(content)) {
                groups['Authentication & Security'].push(conv);
                assigned = true;
            }

            // Database
            if (/database|sqlite|model|schema|query|table/.test(content)) {
                groups['Database & Models'].push(conv);
                assigned = true;
            }

            // API
            if (/api|endpoint|route|request|response|http/.test(content)) {
                groups['API Development'].push(conv);
                assigned = true;
            }

            // Testing
            if (/test|debug|error|bug|fix|issue/.test(content)) {
                groups['Testing & Debugging'].push(conv);
                assigned = true;
            }

            // Deployment
            if (/deploy|production|docker|build|ci\/cd/.test(content)) {
                groups['Deployment & Production'].push(conv);
                assigned = true;
            }

            // Performance
            if (/performance|optimization|cache|speed|memory/.test(content)) {
                groups['Performance & Optimization'].push(conv);
                assigned = true;
            }

            // Default group
            if (!assigned) {
                groups['General Discussion'].push(conv);
            }
        });

        // Remove empty groups
        Object.keys(groups).forEach(key => {
            if (groups[key].length === 0) {
                delete groups[key];
            }
        });

        return groups;
    }

    /**
     * Generate summary report
     */
    generateSummary(conversations, groups) {
        const summary = {
            totalConversations: conversations.length,
            averageRelevanceScore: conversations.reduce((sum, conv) => sum + conv.relevanceScore, 0) / conversations.length,
            topConversations: conversations.slice(0, 10).map(conv => ({
                id: conv.id,
                relevanceScore: conv.relevanceScore,
                preview: conv.content.substring(0, 200) + '...',
                timestamp: conv.timestamp
            })),
            groupSummary: {}
        };

        Object.entries(groups).forEach(([groupName, convs]) => {
            summary.groupSummary[groupName] = {
                count: convs.length,
                averageScore: convs.reduce((sum, conv) => sum + conv.relevanceScore, 0) / convs.length,
                topConversation: convs[0] ? {
                    preview: convs[0].content.substring(0, 200) + '...',
                    score: convs[0].relevanceScore
                } : null
            };
        });

        return summary;
    }

    /**
     * Save cleaned and organized data
     */
    saveResults(conversations, groups, summary, outputDir = 'cleaned_chat_history') {
        // Create output directory
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');

        // Save all conversations
        fs.writeFileSync(
            path.join(outputDir, `all_conversations_${timestamp}.json`),
            JSON.stringify(conversations, null, 2)
        );

        // Save grouped conversations
        Object.entries(groups).forEach(([groupName, convs]) => {
            const filename = groupName.toLowerCase().replace(/[^a-z0-9]/g, '_');
            fs.writeFileSync(
                path.join(outputDir, `${filename}_${timestamp}.json`),
                JSON.stringify(convs, null, 2)
            );

            // Also save as readable text
            const textContent = convs.map((conv, index) => {
                return `=== Conversation ${index + 1} (Score: ${conv.relevanceScore}) ===\n` +
                       `Database: ${conv.database}\n` +
                       `Table: ${conv.table}\n` +
                       `Timestamp: ${conv.timestamp || 'Unknown'}\n` +
                       `User: ${conv.user || 'Unknown'}\n\n` +
                       `${conv.content}\n\n`;
            }).join('\n' + '='.repeat(80) + '\n\n');

            fs.writeFileSync(
                path.join(outputDir, `${filename}_${timestamp}.txt`),
                textContent
            );
        });

        // Save summary
        fs.writeFileSync(
            path.join(outputDir, `summary_${timestamp}.json`),
            JSON.stringify(summary, null, 2)
        );

        // Save readable summary
        const readableSummary = `Chat History Recovery Summary
Generated: ${new Date().toISOString()}

OVERVIEW:
- Total conversations found: ${summary.totalConversations}
- Average relevance score: ${summary.averageRelevanceScore.toFixed(2)}

GROUP BREAKDOWN:
${Object.entries(summary.groupSummary).map(([group, data]) => 
    `- ${group}: ${data.count} conversations (avg score: ${data.averageScore.toFixed(2)})`
).join('\n')}

TOP 10 MOST RELEVANT CONVERSATIONS:
${summary.topConversations.map((conv, index) => 
    `${index + 1}. Score: ${conv.relevanceScore} - ${conv.preview}`
).join('\n\n')}
`;

        fs.writeFileSync(
            path.join(outputDir, `summary_${timestamp}.txt`),
            readableSummary
        );

        return outputDir;
    }

    /**
     * Main processing function
     */
    process(inputFile, outputDir) {
        console.log('Cursor Chat History Cleaner');
        console.log('=' * 40);
        console.log(`Input file: ${inputFile}`);
        console.log(`Output directory: ${outputDir}\n`);

        // Load chat history
        console.log('Loading chat history...');
        const chatData = this.loadChatHistory(inputFile);
        console.log(`Loaded data from ${chatData.export_info.databases_searched} databases\n`);

        // Extract and clean conversations
        console.log('Extracting and cleaning conversations...');
        const conversations = this.extractConversations(chatData);
        console.log(`Found ${conversations.length} relevant conversations\n`);

        if (conversations.length === 0) {
            console.log('No relevant conversations found. Try adjusting search keywords or date range.');
            return;
        }

        // Group conversations
        console.log('Grouping conversations by topic...');
        const groups = this.groupConversations(conversations);
        console.log(`Organized into ${Object.keys(groups).length} groups\n`);

        // Generate summary
        console.log('Generating summary...');
        const summary = this.generateSummary(conversations, groups);

        // Save results
        console.log('Saving results...');
        const savedDir = this.saveResults(conversations, groups, summary, outputDir);

        console.log(`\nProcessing complete!`);
        console.log(`Results saved to: ${savedDir}`);
        console.log(`\nSummary:`);
        console.log(`- Total conversations: ${summary.totalConversations}`);
        console.log(`- Average relevance score: ${summary.averageRelevanceScore.toFixed(2)}`);
        console.log(`- Groups created: ${Object.keys(groups).length}`);

        console.log(`\nNext steps:`);
        console.log(`1. Review the summary file for an overview`);
        console.log(`2. Check individual group files for specific topics`);
        console.log(`3. Look at the highest-scoring conversations first`);
        console.log(`4. Use the text files for easier reading`);
    }
}

// Main execution
function main() {
    const args = process.argv.slice(2);
    
    if (args.length === 0) {
        console.log('Usage: node clean_history.js <exported_chat_file.json> [output_directory]');
        console.log('');
        console.log('Example:');
        console.log('  node clean_history.js cursor_chat_export_20241201_143022.json');
        console.log('  node clean_history.js cursor_chat_export_20241201_143022.json my_cleaned_chats');
        process.exit(1);
    }

    const inputFile = args[0];
    const outputDir = args[1] || 'cleaned_chat_history';

    const cleaner = new ChatHistoryCleaner();
    cleaner.process(inputFile, outputDir);
}

if (require.main === module) {
    main();
}

module.exports = ChatHistoryCleaner; 