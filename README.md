# Cline Rules Repository

This repository contains a comprehensive governance framework for Cline rules, providing structured guidelines, standards, and workflows for effective AI assistant operation and rule management.

## Repository Structure

### Rules Framework (`/Rules/`)
- **META_GOVERNANCE.md** - Governance structure, precedence rules, and management processes for all Cline rules
- **RULE_INDEX.md** - Master navigation and relationship mapping for all global rules
- **baby-steps.md** - Core operational directive defining the fundamental principles for task execution
- **new-task-automation.md** - Task handoff strategy for context preservation and smooth transitions
- **documentation-standards.md** - Universal documentation standards and practices
- **documentation-accuracy.md** - Anti-marketing hype standards for factual accuracy
- **coding-standards.md** - Universal coding standards and best practices
- **rule-templates.md** - Standardized templates for creating consistent, high-quality rules

### Workflows (`/Workflows/`)
- **create-new-workflow.md** - Template for creating new workflows
- **git-development.md** - Git development workflow guidelines
- **self-improving-cline.md** - Self-improvement workflow documentation

### Validation Tools
- **governance-tools.js** - Consolidated governance validation and health monitoring (comprehensive tool)

## Core Features

- **Hierarchical Rule Structure** - Four-level precedence system from meta-governance to implementation
- **Cross-Reference System** - Comprehensive relationship mapping between rules
- **Automated Validation** - Tools for ensuring rule quality and consistency
- **Universal Standards** - Cross-project standards for documentation, coding, and rule creation
- **Context Management** - Systematic approach to task handoffs and continuity

## Getting Started

1. **Review the Index**: Start with `Rules/RULE_INDEX.md` for navigation
2. **Understand Core Principles**: Read `Rules/baby-steps.md` for fundamental methodology
3. **Explore Governance**: Review `Rules/META_GOVERNANCE.md` for rule management framework
4. **Follow Standards**: Use `Rules/documentation-standards.md` and `Rules/coding-standards.md` for consistent creation

## Validation

Run the governance tools to ensure rules meet governance standards:

### Comprehensive Governance Analysis
```bash
node governance-tools.js
```
**Purpose**: Complete governance validation and health monitoring in a single comprehensive analysis  
**Output**: Console report + multiple detailed reports in `reports/` directory

### Reports Generated
- **reports/comprehensive-governance-report.md** - Complete executive summary with validation and health analysis
- **reports/governance-validation-report.md** - Detailed validation findings
- **reports/rule-health-metrics.json** - JSON metrics data for programmatic access
- **reports/rule-health-report.md** - Human-readable health analysis
- **reports/** - All reports are stored in this gitignored directory

## Contributing

Follow the established rule templates in `Rules/rule-templates.md` and ensure all new rules pass validation before submission.

---

**Repository**: https://github.com/dgrauet/cline-rules.git  
**Last Updated**: 2025-01-11  
**Governance Framework**: v1.0
