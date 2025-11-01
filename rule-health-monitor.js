import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Cline Rules Governance Health Monitoring System
 * Tracks governance framework compliance, rule quality metrics, and maintenance health
 */
class RuleHealthMonitor {
  constructor() {
    this.rulesPath = path.join(__dirname, 'Rules');
    this.workflowsPath = path.join(__dirname, 'Workflows');
    this.reportsPath = path.join(__dirname, 'reports');
    this.metricsPath = path.join(this.reportsPath, 'rule-health-metrics.json');
    this.reportPath = path.join(this.reportsPath, 'rule-health-report.md');
  }

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
    
    fs.writeFileSync(this.metricsPath, JSON.stringify(data, null, 2));
    console.log(`📊 Health metrics saved to: ${this.metricsPath}`);
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

    fs.writeFileSync(this.reportPath, report);
    console.log(`📄 Health report saved to: ${this.reportPath}`);
  }
}

// Run health monitoring if called directly
const monitor = new RuleHealthMonitor();
monitor.generateHealthReport().then(data => {
  console.log(`\n🏥 Overall Rule Health: ${data.overall_health}/100`);
  console.log(`✅ Compliant Rules: ${data.metrics.compliance_rate}%`);
  process.exit(0);
}).catch(error => {
  console.error('Health monitoring failed:', error);
  process.exit(1);
});

export default RuleHealthMonitor;
