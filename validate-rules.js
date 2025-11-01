import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Cline Rules Governance Validation Tool
 * Automatically validates all rule and workflow files against governance standards
 */
class RuleValidator {
  constructor() {
    this.rulesPath = path.join(__dirname, 'Rules');
    this.workflowsPath = path.join(__dirname, 'Workflows');
    this.reportsPath = path.join(__dirname, 'reports');
    this.reportPath = path.join(this.reportsPath, 'governance-validation-report.md');
    this.errors = [];
    this.warnings = [];
    this.score = 0;
  }

  // Convert absolute path to relative path for consistent reporting
  toRelativePath(filePath) {
    try {
      const relative = path.relative(process.cwd(), filePath);
      return relative.startsWith('..') ? filePath : relative;
    } catch {
      return filePath;
    }
  }

  async validateAllRules() {
    console.log('🔍 Starting Cline Rules Governance Validation...\n');
    
    // Validate Rules directory
    await this.validateRulesDirectory();
    
    // Validate Workflows directory
    await this.validateWorkflowsDirectory();
    
    // Check governance framework cross-references
    this.validateCrossReferences();
    
    // Generate report
    this.generateReport();
    
    return {
      errors: this.errors,
      warnings: this.warnings,
      score: this.score,
      passed: this.errors.length === 0
    };
  }

  async validateRulesDirectory() {
    console.log('📁 Validating Rules directory...');
    
    if (!fs.existsSync(this.rulesPath)) {
      this.errors.push('Rules directory not found');
      return;
    }
    
    const files = fs.readdirSync(this.rulesPath)
      .filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      await this.validateRuleFile(path.join(this.rulesPath, file), 'rule');
    }
  }

  async validateWorkflowsDirectory() {
    console.log('📂 Validating Workflows directory...');
    
    if (!fs.existsSync(this.workflowsPath)) {
      this.warnings.push('Workflows directory not found - skipping workflow validation');
      return;
    }
    
    const files = fs.readdirSync(this.workflowsPath)
      .filter(file => file.endsWith('.md'));
    
    for (const file of files) {
      await this.validateRuleFile(path.join(this.workflowsPath, file), 'workflow');
    }
  }

  async validateRuleFile(filePath, type) {
    const content = fs.readFileSync(filePath, 'utf8');
    const fileName = path.basename(filePath);
    
    console.log(`  ✓ Validating ${fileName}...`);
    
    // Check frontmatter
    this.validateFrontmatter(content, filePath);
    
    // Check structure
    this.validateStructure(content, filePath);
    
    // Check cross-references
    this.validateFileCrossReferences(content, filePath, type);
    
    // Check quality metrics
    this.validateQualityMetrics(content, filePath);
  }

  validateFrontmatter(content, filePath) {
    const relativePath = this.toRelativePath(filePath);
    const frontmatterMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
    
    if (!frontmatterMatch) {
      this.errors.push(`${relativePath}: Missing or invalid YAML frontmatter`);
      return;
    }
    
    const frontmatter = frontmatterMatch[1];
    const requiredFields = ['name', 'description', 'author', 'version'];
    
    // Parse frontmatter (simple regex-based parsing)
    const fields = {};
    frontmatter.split('\n').forEach(line => {
      const match = line.match(/^(\w+):\s*(.+)$/);
      if (match) {
        fields[match[1]] = match[2].replace(/^["']|["']$/g, '');
      }
    });
    
    // Check required fields
    requiredFields.forEach(field => {
      if (!fields[field]) {
        this.errors.push(`${relativePath}: Missing required frontmatter field: ${field}`);
      }
    });
    
    // Check version format
    if (fields.version && !/^\d+\.\d+$/.test(fields.version)) {
      this.warnings.push(`${relativePath}: Version should follow semantic versioning (x.y)`);
    }
  }

  validateStructure(content, filePath) {
    const relativePath = this.toRelativePath(filePath);
    const sections = ['#', '##', '###'].map(level => 
      content.match(new RegExp(`^${level}\\s+.+$`, 'gm')) || []
    ).flat();
    
    if (sections.length < 2) {
      this.warnings.push(`${relativePath}: Consider adding more structure with headings`);
    }
    
    // Check for minimum content
    const wordCount = content.split(/\s+/).length;
    if (wordCount < 50) {
      this.warnings.push(`${relativePath}: Consider expanding content (current: ${wordCount} words)`);
    }
  }

  validateFileCrossReferences(content, filePath, type) {
    const relativePath = this.toRelativePath(filePath);
    const hasCrossRefs = content.includes('### Depends On') || 
                        content.includes('### Extends') || 
                        content.includes('### See Also');
    
    if (!hasCrossRefs) {
      this.warnings.push(`${relativePath}: Missing cross-reference sections`);
    }
    
    // Check for external references
    const externalRefs = content.match(/\[[^\]]+\]\([^)]*\)/g) || [];
    if (externalRefs.length === 0) {
      this.warnings.push(`${relativePath}: No external references found`);
    }
  }

  validateQualityMetrics(content, filePath) {
    const relativePath = this.toRelativePath(filePath);
    // Check actionability (simple heuristic)
    const actionablePatterns = [
      /must\s+(not\s+)?[a-z]/gi,
      /should\s+(not\s+)?[a-z]/gi,
      /never/gi,
      /always/gi,
      /required/gi,
      /prohibited/gi
    ];
    
    const actionableCount = actionablePatterns.reduce((count, pattern) => {
      return count + (content.match(pattern) || []).length;
    }, 0);
    
    if (actionableCount < 3) {
      this.warnings.push(`${relativePath}: Consider adding more actionable content (found: ${actionableCount} actionable statements)`);
    }
  }

  validateCrossReferences() {
    console.log('🔗 Validating governance framework cross-references...');
    
    // Check that RULE_INDEX.md exists
    const ruleIndexPath = path.join(this.rulesPath, 'RULE_INDEX.md');
    if (!fs.existsSync(ruleIndexPath)) {
      this.errors.push('RULE_INDEX.md is missing from Rules directory');
    }
    
    // Check that META_GOVERNANCE.md exists
    const metaGovPath = path.join(this.rulesPath, 'META_GOVERNANCE.md');
    if (!fs.existsSync(metaGovPath)) {
      this.errors.push('META_GOVERNANCE.md is missing from Rules directory');
    }
  }

  generateReport() {
    console.log('\n📊 Governance Validation Report');
    console.log('================================\n');
    
    if (this.errors.length === 0 && this.warnings.length === 0) {
      console.log('🎉 All governance rules passed validation!');
      this.score = 100;
    } else {
      if (this.errors.length > 0) {
        console.log(`❌ Errors (${this.errors.length}):`);
        this.errors.forEach(error => console.log(`   ${error}`));
        console.log('');
      }
      
      if (this.warnings.length > 0) {
        console.log(`⚠️  Warnings (${this.warnings.length}):`);
        this.warnings.forEach(warning => console.log(`   ${warning}`));
        console.log('');
      }
      
      // Calculate score
      this.score = Math.max(0, 100 - (this.errors.length * 20) - (this.warnings.length * 5));
    }
    
    console.log(`📈 Governance Compliance Score: ${this.score}/100`);
    
    // Save detailed report
    this.generateDetailedReport();
  }

  generateDetailedReport() {
    // Ensure reports directory exists
    if (!fs.existsSync(this.reportsPath)) {
      fs.mkdirSync(this.reportsPath, { recursive: true });
    }
    
    const report = `# Cline Rules Governance Validation Report

Generated: ${new Date().toISOString()}

## Summary
- **Total Errors**: ${this.errors.length}
- **Total Warnings**: ${this.warnings.length}  
- **Governance Compliance Score**: ${this.score}/100
- **Status**: ${this.errors.length === 0 ? 'PASS ✅' : 'FAIL ❌'}

## Governance Framework Validation

### Rules Directory Validation
- **Path**: ${this.rulesPath}
- **Status**: ${fs.existsSync(this.rulesPath) ? '✅ Found' : '❌ Missing'}

### Workflows Directory Validation
- **Path**: ${this.workflowsPath}
- **Status**: ${fs.existsSync(this.workflowsPath) ? '✅ Found' : '⚠️ Missing'}

## Errors
${this.errors.length > 0 ? this.errors.map(e => `- ${e}`).join('\n') : 'None - All governance standards met ✅'}

## Warnings
${this.warnings.length > 0 ? this.warnings.map(w => `- ${w}`).join('\n') : 'None - No warnings detected ✅'}

## Governance Framework Requirements Check
- ✅ **YAML Frontmatter**: Required on all rule files
- ✅ **Cross-Reference Sections**: Depends On, Extends, See Also
- ✅ **Actionable Content**: Must/Should/Never/Always patterns
- ✅ **Version Control**: Semantic versioning (x.y)
- ✅ **Rule Index**: RULE_INDEX.md navigation file
- ✅ **Meta-Governance**: META_GOVERNANCE.md foundation

## Next Steps
${this.errors.length > 0 ? 
  '🔧 **Critical**: Address all errors before deploying governance rules.' :
  '🎉 **Ready**: Governance framework is compliant and ready for production use.'
}

### Recommended Actions:
${this.warnings.length > 0 ? '- Review and address warnings to improve governance quality' : '- Continue maintaining current governance standards'}
- Regular validation runs ensure ongoing compliance
- Monitor health reports for maintenance needs
`;

    fs.writeFileSync(this.reportPath, report);
    console.log(`📄 Detailed governance report saved to: ${this.reportPath}`);
  }
}

// Run validation if called directly
const validator = new RuleValidator();
validator.validateAllRules().then(result => {
  process.exit(result.passed ? 0 : 1);
}).catch(error => {
  console.error('Validation failed:', error);
  process.exit(1);
});

export default RuleValidator;
