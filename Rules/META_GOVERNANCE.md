---
name: "Cline Rules Meta-Governance Framework"
description: "Rules about rules themselves - establishes governance structure, precedence rules, and management processes for all Cline rules across global and workspace contexts"
author: "Cline Team"
version: "2.0"
tags: ["meta-governance", "governance", "precedence", "validation", "rule-management"]
globs: ["*.md"]
related_rules: ["RULE_INDEX.md", "baby-steps.md", "rule-templates.md"]
effective_date: "2025-01-11"
review_date: "2025-07-11"
---

# Cline Rules Meta-Governance Framework

This document establishes the governance structure, precedence rules, and management processes for all Cline rules across global and workspace contexts.

## Rule Hierarchy Structure

### Level 1: Meta-Governance Rules (Highest Priority)
- **Purpose**: Rules about rules themselves
- **Scope**: Cross-cutting concerns affecting all other rules
- **Examples**: Governance, versioning, conflict resolution, validation

### Level 2: Core Methodology Rules (High Priority)
- **Purpose**: Universal operational principles and methodologies
- **Scope**: Fundamental behavioral patterns and tool usage
- **Examples**: Baby Steps methodology, task handoff strategies, universal standards

### Level 3: Domain-Specific Rules (Medium Priority)
- **Purpose**: Technology and domain-specific implementations
- **Scope**: Framework-specific patterns, security standards, documentation
- **Examples**: Web dev protocols, project-specific coding standards, security practices

### Level 4: Implementation Rules (Lower Priority)
- **Purpose**: Project-specific architectural decisions
- **Scope**: Individual project patterns and configurations
- **Examples**: Tool integrations, UI implementation, project configuration

## Global-Workspace Rule Relationship Framework

### Universal vs Project-Specific Rule Distribution

**Global Rules (Universal Standards)**:
- **Core Methodology**: Fundamental behavioral patterns applicable across all projects
- **Universal Standards**: Cross-project best practices for documentation, coding, and rule creation
- **Rule Templates**: Standardized structures for creating new rules

**Workspace Rules (Project-Specific)**:
- **Architecture Patterns**: Project-specific design decisions and implementations
- **Security Implementation**: Security practices tailored to the specific project context
- **Configuration Management**: Environment setup and tool integration specific to the project

### Cross-Reference Integration

Global rules serve as foundations that workspace rules extend and implement:

```
Global Foundation (Universal)
├── baby-steps.md (core methodology)
├── coding-standards.md (universal coding practices)
├── documentation-standards.md (universal documentation)
├── rule-templates.md (standardized templates)
└── new-task-automation.md (context management)

Workspace Implementation (Project-Specific)
├── coding-principles.md (extends coding-standards.md)
├── security-practices.md (implements security standards)
├── configuration-guidelines.md (project-specific setup)
└── documentation-guidelines.md (extends documentation-standards.md)
```

### Precedence Rules

1. **Global Rules Take Precedence**: Universal standards override conflicting project-specific rules
2. **Specific Over General**: More specific rules (workspace) can extend but not contradict general rules (global)
3. **Validation Hierarchy**: Global rules provide validation templates that workspace rules must follow
4. **Migration Path**: When global rules are updated, workspace rules must be migrated to maintain compatibility

## Precedence and Conflict Resolution

### Precedence Order
1. **Meta-Governance Rules** > All other rules
2. **Global Core Rules** > Local implementation rules
3. **More Specific Rules** > More general rules
4. **Newer Versioned Rules** > Older versions (with deprecation path)

### Conflict Resolution Process
When conflicts arise between rules:

1. **Identify Rule Levels**: Determine which level each conflicting rule belongs to
2. **Apply Precedence**: Higher level rules take precedence
3. **Check Specificity**: More specific rules override general ones
4. **Version Consideration**: Check version numbers and update dates
5. **Documentation**: Document resolution in affected rule files

### Resolution Examples
```yaml
Conflict: "Global coding standards vs Project-specific patterns"
Resolution: "Global standards take precedence, project patterns must align"
Documentation: "Added reference to global precedence in project rule"

Conflict: "Multiple versions of same rule"
Resolution: "Latest version with deprecation path for older version"
Documentation: "Added version history and migration notes"
```

## Rule Management Lifecycle

### Rule Creation Process
1. **Template Compliance**: Use standardized rule template
2. **Conflict Check**: Verify no conflicts with existing rules
3. **Relationship Mapping**: Identify related rules and dependencies
4. **Quality Validation**: Pass validation checklist
5. **Governance Approval**: Review by meta-governance maintainers

### Rule Update Process
1. **Version Bump**: Increment version number appropriately
2. **Change Documentation**: Document what changed and why
3. **Impact Assessment**: Identify affected rules and dependents
4. **Migration Guide**: Provide upgrade path if breaking changes
5. **Communication**: Notify users of significant changes

### Rule Deprecation Process
1. **Deprecation Notice**: Add deprecation warning with timeline
2. **Migration Guide**: Provide clear path to replacement
3. **Grace Period**: Allow time for migration (typically 30-90 days)
4. **Removal**: Remove deprecated rule after grace period
5. **Archive**: Move to historical reference if valuable

## Quality Standards

### Rule Template Requirements
All rules must include:
- **YAML Frontmatter**: Standard metadata structure
- **Clear Objective**: Specific, measurable purpose
- **Actionable Content**: Concrete do/don't patterns
- **Examples**: Practical implementation examples
- **Cross-References**: Links to related rules
- **Version Information**: Current version and update history

### Validation Checklist
Before publishing any rule:
- [ ] Follows established template structure
- [ ] Includes proper YAML frontmatter
- [ ] Contains clear, actionable instructions
- [ ] Has practical examples where applicable
- [ ] References related rules appropriately
- [ ] Passes conflict resolution check
- [ ] Includes version and author information
- [ ] Uses consistent terminology
- [ ] Provides implementation guidance
- [ ] Includes validation criteria

### Quality Metrics
- **Rule Length**: Optimal 50-200 lines
- **Specificity Score**: Higher is better (concrete vs abstract)
- **Actionability Score**: Percentage of content that's actionable
- **Relationship Density**: Number of meaningful cross-references
- **Update Frequency**: Regular maintenance indicates health

## Cross-Reference System

### Reference Types
- **See Also**: Complementary rules that enhance understanding
- **Replaces**: Superseded rules with migration information
- **Depends On**: Prerequisite rules required for understanding
- **Extends**: Rules that build upon base concepts
- **Conflicts With**: Rules that have explicit conflicts

### Reference Format
```markdown
## See Also
- [Related Rule](path) - Brief explanation of relationship
- [Implementation Guide](path) - How to apply this rule

## Replaces
- [Deprecated Rule](path) - Why it was replaced
- Migration: [Instructions for updating](path)

## Depends On
- [Prerequisite Rule](path) - Must understand first
- [Foundation Concept](path) - Base knowledge required

## Extends
- [Base Rule](path) - What this rule builds upon
- [Example Application](path) - Real-world usage

## Conflicts With
- [Conflicting Rule](path) - Explicit contradiction and resolution
```

## Governance Roles and Responsibilities

### Rule Maintainers
- **Global Rules**: Cline core team
- **Workspace Rules**: Project maintainers
- **Meta-Governance**: System administrators

### Review Process
1. **Peer Review**: At least one other maintainer reviews changes
2. **Impact Assessment**: Evaluate effects on existing rules
3. **Quality Check**: Verify against standards and templates
4. **Approval**: Formal approval by appropriate governance level
5. **Documentation**: Update indexes and cross-references

### Change Management
- **Small Changes**: Direct merge with review
- **Breaking Changes**: Extended review and migration planning
- **Structural Changes**: Governance committee approval required
- **Emergency Changes**: Fast-track process with post-facto review

## Implementation Timeline

### Phase 1: Foundation (Current)
- Establish governance framework
- Create rule hierarchy structure
- Define precedence rules
- Build validation templates
- **COMPLETED**: Global-Workspace relationship framework

### Phase 2: Consolidation
- Migrate existing rules to new structure
- Resolve conflicts and redundancies
- Create cross-reference system
- Build master rule index

### Phase 3: Automation
- Implement rule validation tools
- Create discovery and search systems
- Add usage analytics and health metrics
- Automate governance processes

### Phase 4: Evolution
- Continuous improvement processes
- Community contribution frameworks
- Advanced analytics and insights
- Predictive rule management

This meta-governance framework ensures that Cline rules remain consistent, discoverable, and maintainable while allowing for evolution and improvement over time.

## Cross-References

### Depends On
- **[Baby Steps™ Methodology](baby-steps.md)** - Core operational principles that all governance rules must follow
- **[Cline Rules Templates](rule-templates.md)** - Standardized templates that governance rules must implement
- **[Documentation Standards](documentation-standards.md)** - Universal documentation practices that governance rules must follow

### Extends
- **Universal Standards Framework**: Applies governance principles to all Cline rule systems across projects
- **Quality Assurance Framework**: Implements validation criteria and health monitoring for rule systems

### See Also
- **[RULE_INDEX.md](RULE_INDEX.md)** - Navigation index for all global rules in the governance system
- **[Task Handoff Strategy](new-task-automation.md)** - Workflow automation rules that must comply with governance standards
- **[Documentation Accuracy Standards](documentation-accuracy.md)** - Anti-hype standards that governance communications must follow

### Replaces
- **Version 1.0 Meta-Governance**: Consolidated all governance rules into comprehensive 2.0 framework
- **Pre-Governance Rules**: Replaced informal rule management with structured governance approach
- **Migration Guide**: [Guidelines for migrating to v2.0 governance framework](governance-migration-guide.md)

### Conflicts With
- **None**: This is the highest-priority rule and takes precedence over all other governance rules
- **Resolution**: When conflicts arise with lower-level rules, this meta-governance framework takes precedence

## Validation Checklist
- [ ] **YAML Frontmatter**: Complete and properly formatted
- [ ] **Cross-Reference Sections**: All relationship types included
- [ ] **Hierarchy Definition**: Rule precedence levels clearly defined
- [ ] **Quality Standards**: Validation criteria established
- [ ] **Version Control**: Semantic versioning implemented
