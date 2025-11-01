import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Cline Rules Governance Tools - Consolidated Validation and Health Monitoring
 * Combines governance validation and rule health monitoring into a single comprehensive tool
 */
class GovernanceTools {
  constructor() {
    this.rulesPath = path.join(__dirname, 'Rules');
    this.workflowsPath = path.join(__dirname, 'Workflows');
    this.reportsPath = path.join(__dirname, 'reports');
    this.validationReportPath = path.join(this.reportsPath, 'governance-validation-report.md');
    this.healthMetricsPath = path.join(this.reportsPath, 'rule-health-metrics.json');
    this.healthReportPath = path.join(this.reportsPath, 'rule-health-report.md');
    this.errors = [];
    this.warnings = [];
    this.score = 0;
  }

  /**
   * Run comprehensive governance analysis including both validation and health monitoring
   */
  async runComprehensiveAnalysis() {
    console.log('🏥🔍 Starting Comprehensive Cline Rules Governance Analysis...\n');
    
    const startTime = Date.now();
    
    // Step 1: Governance Compliance Validation
    console.log('=== STEP 1: GOVERNANCE VALIDATION ===');
    await this.validateAllRules();
    
    // Step 2: Health Metrics Analysis
    console.log('\n=== STEP 2: HEALTH METRICS ANALYSIS ===');
    const healthData = await this.generateHealthReport();
    
    // Step 3: Generate comprehensive report
    console.log('\n=== STEP 3: COMPREHENSIVE REPORT GENERATION ===');
    this.generateComprehensiveReport(healthData);
    
    const duration = ((Date.now() - startTime) / 1000).toFixed(2);
    console.log(`\n🎉 Governance analysis completed in ${duration}s`);
    console.log(`📈 Overall Governance Score: ${this.calculateOverallScore(healthData)}/100`);
    console.log(`✅ Compliance Status: ${this.errors.length === 0 ? 'PASS' : 'NEEDS ATTENTION'}`);
    
    return {
      validation: {
        errors: this.errors,
        warnings: this.warnings,
        score: this.score,
        passed: this.errors.length === 0
      },
      health: healthData,
      overall_score: this.calculateOverallScore(healthData),
      duration_seconds: parseFloat(duration)
    };
  }

  /**
   * Validate all rules and workflows for governance compliance
   */
  async validateAllRules() {
    console.log('🔍 Starting Cline Rules Governance Validation...\n');
    
    // Validate Rules directory
    await this.validateRulesDirectory();
    
    // Validate Workflows directory
    await this.validateWorkflowsDirectory();
    
    // Check governance framework cross-references
    this.validateCrossReferences();
    
    // Generate report
    this.generateValidationReport();
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
    const relativePath = path.relative(process.cwd(), filePath);
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
    const relativePath = path.relative(process.cwd(), filePath);
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
    const relativePath = path.relative(process.cwd(), filePath);
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
    const relativePath = path.relative(process.cwd(), filePath);
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

  generateValidationReport() {
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
  }

  /**
   * Generate health report for all rules and workflows
   */
  async generateHealthReport() {
    console.log('🏥 Generating Rule Health Report...\n');
    
    const healthData = {
      timestamp: new Date().toISOString(),
      overall_health: 0,
      rules: [],
      metrics: {},
      recommendations: []
    };

    // Analyze Rules directory
    if (fs.existsSync(this.rulesPath)) {
      const ruleFiles = fs.readdirSync(this.rulesPath)
        .filter(file => file.endsWith('.md'));
      
      for (const file of ruleFiles) {
        const filePath = path.join(this.rulesPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        const ruleHealth = this.analyzeRuleHealth(file, content, 'rules');
        healthData.rules.push(ruleHealth);
      }
    }

    // Analyze Workflows directory
    if (fs.existsSync(this.workflowsPath)) {
      const workflowFiles = fs.readdirSync(this.workflowsPath)
        .filter(file => file.endsWith('.md'));
      
      for (const file of workflowFiles) {
        const filePath = path.join(this.workflowsPath, file);
        const content = fs.readFileSync(filePath, 'utf8');
        
        const ruleHealth = this.analyzeRuleHealth(file, content, 'workflows');
        healthData.rules.push(ruleHealth);
      }
    }

    // Calculate overall health
    healthData.overall_health = this.calculateOverallHealth(healthData.rules);
    healthData.metrics = this.calculateMetrics(healthData.rules);
    healthData.recommendations = this.generateRecommendations(healthData);

    // Save health report
    this.saveHealthReport(healthData);
    this.generateHealthMarkdown(healthData);
    
    return healthData;
  }

  analyzeRuleHealth(fileName, content, category = 'rules') {
    const wordCount = content.split(/\s+/).length;
    const basePath = category === 'workflows' ? this.workflowsPath : this.rulesPath;
    const lastModified = fs.statSync(path.join(basePath, fileName)).mtime;
    const daysSinceModified = Math.floor((Date.now() - lastModified.getTime()) / (1000 * 60 * 60 * 24));
    
    // Quality scores
    const frontmatterScore = content.includes('---') ? 100 : 0;
    const crossRefScore = content.includes('### Depends On') || content.includes('### Extends') ? 100 : 0;
    const actionabilityScore = this.calculateActionabilityScore(content);
    
    // Health indicators
    const health_score = Math.round((frontmatterScore + crossRefScore + actionabilityScore) / 3);
    
    return {
      file_name: fileName,
      category: category,
      health_score,
      word_count: wordCount,
      days_since_modified: daysSinceModified,
      frontmatter_compliant: frontmatterScore > 0,
      cross_referenced: crossRefScore > 0,
      last_modified: lastModified.toISOString(),
      quality_breakdown: {
        frontmatter: frontmatterScore,
        cross_references: crossRefScore,
        actionability: actionabilityScore
      }
    };
  }

  calculateActionabilityScore(content) {
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
    
    return Math.min(100, actionableCount * 10);
  }

  calculateOverallHealth(rules) {
    if (rules.length === 0) return 0;
    const totalHealth = rules.reduce((sum, rule) => sum + rule.health_score, 0);
    return Math.round(totalHealth / rules.length);
  }

  calculateMetrics(rules) {
    const total_rules = rules.length;
    const compliant_rules = rules.filter(r => r.health_score >= 80).length;
    const average_words = Math.round(rules.reduce((sum, r) => sum + r.word_count, 0) / total_rules);
    const average_age = Math.round(rules.reduce((sum, r) => sum + r.days_since_modified, 0) / total_rules);
    
    return {
      total_rules,
      compliant_rules,
      compliance_rate: Math.round((compliant_rules / total_rules) * 100),
      average_words,
      average_age_days: average_age,
      maintenance_needed: rules.filter(r => r.days_since_modified > 90).length
    };
  }

  generateRecommendations(healthData) {
    const recommendations = [];
    
    if (healthData.overall_health < 70) {
      recommendations.push("Overall rule health is below optimal. Focus on frontmatter compliance and cross-references.");
    }
    
    if (healthData.metrics.compliance_rate < 50) {
      recommendations.push("Less than 50% of rules meet quality standards. Prioritize rule template compliance.");
    }
    
    if (healthData.metrics.maintenance_needed > 0) {
      recommendations.push(`${healthData.metrics.maintenance_needed} rules haven't been updated in 90+ days. Review for relevance.`);
    }
    
    const inactiveRules = healthData.rules.filter(r => r.days_since_modified > 180);
    if (inactiveRules.length > 0) {
      recommendations.push(`${inactiveRules.length} rules are over 6 months old. Consider archiving or updating.`);
    }
    
    return recommendations;
  }

  saveHealthReport(data) {
    // Ensure reports directory exists
    if (!fs.existsSync(this.reportsPath)) {
      fs.mkdirSync(this.reportsPath, { recursive: true });
    }
    
    fs.writeFileSync(this.healthMetricsPath, JSON.stringify(data, null, 2));
    console.log(`📊 Health metrics saved to: ${this.healthMetricsPath}`);
  }

  generateHealthMarkdown(data) {
    const report = `# Cline Rules Governance Health Report

Generated: ${data.timestamp}

## Overall Health Score: ${data.overall_health}/100

### Key Metrics
- **Total Rules & Workflows**: ${data.metrics.total_rules}
- **Compliant Rules**: ${data.metrics.compliant_rules}
- **Compliance Rate**: ${data.metrics.compliance_rate}%
- **Average Word Count**: ${data.metrics.average_words}
- **Average Age**: ${data.metrics.average_age_days} days
- **Maintenance Needed**: ${data.metrics.maintenance_needed} files

### Governance Framework Analysis

#### Rules Directory Health
${data.rules.filter(r => r.category === 'rules').map(rule => `
##### ${rule.file_name}
- **Health Score**: ${rule.health_score}/100
- **Word Count**: ${rule.word_count}
- **Days Since Modified**: ${rule.days_since_modified}
- **Frontmatter Compliant**: ${rule.frontmatter_compliant ? '✅' : '❌'}
- **Cross-Referenced**: ${rule.cross_referenced ? '✅' : '❌'}
`).join('\n')}

#### Workflows Directory Health
${data.rules.filter(r => r.category === 'workflows').map(rule => `
##### ${rule.file_name}
- **Health Score**: ${rule.health_score}/100
- **Word Count**: ${rule.word_count}
- **Days Since Modified**: ${rule.days_since_modified}
- **Frontmatter Compliant**: ${rule.frontmatter_compliant ? '✅' : '❌'}
- **Cross-Referenced**: ${rule.cross_referenced ? '✅' : '❌'}
`).join('\n')}

### Recommendations for Governance Improvement
${data.recommendations.map(rec => `- ${rec}`).join('\n')}

### Quality Breakdown by Category
| File | Category | Frontmatter | Cross-References | Actionability |
|------|----------|-------------|------------------|---------------|
${data.rules.map(rule => `| ${rule.file_name} | ${rule.category} | ${rule.quality_breakdown.frontmatter}% | ${rule.quality_breakdown.cross_references}% | ${rule.quality_breakdown.actionability}% |`).join('\n')}

### Governance Framework Status
- **Meta-Governance Compliance**: ${data.rules.filter(r => r.frontmatter_compliant).length}/${data.rules.length} files
- **Cross-Reference Network**: ${data.rules.filter(r => r.cross_referenced).length}/${data.rules.length} files connected
- **Template Standardization**: ${Math.round((data.metrics.compliance_rate || 0))}% compliance rate
`;

    fs.writeFileSync(this.healthReportPath, report);
    console.log(`📄 Health report saved to: ${this.healthReportPath}`);
  }

  generateComprehensiveReport(healthData) {
    // Ensure reports directory exists
    if (!fs.existsSync(this.reportsPath)) {
      fs.mkdirSync(this.reportsPath, { recursive: true });
    }
    
    const overallScore = this.calculateOverallScore(healthData);
    
    const report = `# Cline Rules Comprehensive Governance Report

Generated: ${new Date().toISOString()}

## Executive Summary
- **Overall Governance Score**: ${overallScore}/100
- **Governance Compliance Score**: ${this.score}/100
- **Rule Health Score**: ${healthData.overall_health}/100
- **Status**: ${this.errors.length === 0 ? 'EXCELLENT ✅' : 'NEEDS ATTENTION ⚠️'}
- **Total Rules & Workflows**: ${healthData.metrics.total_rules}
- **Compliance Rate**: ${healthData.metrics.compliance_rate}%

## Governance Framework Validation Results

### Errors (${this.errors.length})
${this.errors.length > 0 ? this.errors.map(e => `- ${e}`).join('\n') : 'None - All governance standards met ✅'}

### Warnings (${this.warnings.length})
${this.warnings.length > 0 ? this.warnings.map(w => `- ${w}`).join('\n') : 'None - No warnings detected ✅'}

## Rule Health Analysis

### Key Health Metrics
- **Overall Health**: ${healthData.overall_health}/100
- **Compliant Rules**: ${healthData.metrics.compliant_rules}/${healthData.metrics.total_rules}
- **Average Word Count**: ${healthData.metrics.average_words} words
- **Maintenance Needed**: ${healthData.metrics.maintenance_needed} files

### Detailed File Analysis
${healthData.rules.map(rule => `
#### ${rule.file_name} (${rule.category})
- **Health Score**: ${rule.health_score}/100
- **Word Count**: ${rule.word_count}
- **Days Since Modified**: ${rule.days_since_modified}
- **Frontmatter**: ${rule.frontmatter_compliant ? '✅ Compliant' : '❌ Missing'}
- **Cross-References**: ${rule.cross_referenced ? '✅ Connected' : '❌ Missing'}
- **Actionability**: ${rule.quality_breakdown.actionability}%
`).join('\n')}

## Recommendations
${healthData.recommendations.map(rec => `- ${rec}`).join('\n')}

## Next Steps
${overallScore >= 90 ? 
  '🎉 **EXCELLENT**: Governance framework is in outstanding condition. Continue current practices.' :
  overallScore >= 70 ?
  '✅ **GOOD**: Governance framework meets standards. Minor improvements recommended.' :
  '🔧 **NEEDS ATTENTION**: Address critical issues to improve governance compliance.'
}

### Action Items:
${this.errors.length > 0 ? '- **CRITICAL**: Address all validation errors immediately' : '- ✅ No critical issues found'}
${this.warnings.length > 0 ? '- Review and address warnings to improve quality' : '- ✅ No warnings to address'}
${healthData.metrics.maintenance_needed > 0 ? '- Review files that need maintenance updates' : '- ✅ All files are current'}
- Regular governance analysis ensures ongoing compliance
- Monitor health trends for proactive maintenance
`;

    const comprehensiveReportPath = path.join(this.reportsPath, 'comprehensive-governance-report.md');
    fs.writeFileSync(comprehensiveReportPath, report);
    console.log(`📄 Comprehensive report saved to: ${comprehensiveReportPath}`);
  }

  calculateOverallScore(healthData) {
    // Weighted average of validation score and health score
    const validationWeight = 0.4;
    const healthWeight = 0.6;
    
    return Math.round((this.score * validationWeight) + (healthData.overall_health * healthWeight));
  }
}

// Run comprehensive analysis if called directly
const tools = new GovernanceTools();
tools.runComprehensiveAnalysis().then(result => {
  console.log(`\n🏆 Final Overall Score: ${result.overall_score}/100`);
  console.log(`📋 Validation: ${result.validation.passed ? 'PASSED' : 'FAILED'} (${result.validation.errors.length} errors)`);
  console.log(`🏥 Health: ${result.health.overall_health}/100 (${result.health.metrics.compliance_rate}% compliant)`);
  console.log(`⏱️ Analysis completed in ${result.duration_seconds}s`);
  process.exit(result.validation.passed && result.overall_score >= 70 ? 0 : 1);
}).catch(error => {
  console.error('Comprehensive governance analysis failed:', error);
  process.exit(1);
});

export default GovernanceTools;
