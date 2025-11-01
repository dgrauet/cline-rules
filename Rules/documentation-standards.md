---
name: "Documentation Standards"
description: "Universal documentation standards and practices for Cline rules and project documentation"
author: "Cline Team"
version: "1.0"
tags: ["documentation", "standards", "writing", "guidelines"]
globs: ["*.md", "*.ts", "*.tsx", "*.js", "*.jsx"]
related_rules: ["rule-templates.md", "coding-standards.md"]
effective_date: "2025-01-11"
review_date: "2025-07-11"
---

# Documentation Standards

This document provides universal documentation standards and practices applicable across all Cline projects and rule systems.

## Core Documentation Principles

### Structure and Organization
- **Clear Hierarchy**: Use consistent heading levels (#, ##, ###) for logical structure
- **Logical Flow**: Organize content from general to specific concepts
- **Consistent Formatting**: Maintain uniform formatting across all documentation
- **Actionable Content**: Every section should provide clear, actionable guidance

### Content Quality Standards

#### Writing Style
- **Clarity Over Complexity**: Use clear, simple language over technical jargon
- **Consistent Terminology**: Maintain consistent terms throughout documentation
- **Active Voice**: Prefer active voice for direct, engaging instruction
- **Proofread**: Ensure spelling, grammar, and accuracy before publishing

#### Code Examples
- **Language Specification**: Always specify language for code blocks (```typescript, ```bash, etc.)
- **Complete Examples**: Provide complete, runnable code examples
- **Context Explanation**: Explain what the code does, not just what it is
- **Best Practices**: Include both correct and incorrect usage patterns

## Documentation Types

### Rule Documentation
Rule files should follow standardized structure with:
- **YAML Frontmatter**: Complete metadata for discovery and governance
- **Clear Objectives**: Specific purpose statement in objective section
- **Implementation Guidelines**: Actionable do/don't patterns
- **Cross-References**: Proper relationship mapping with other rules
- **Examples**: Practical usage examples for clarification

### Code Documentation

#### Component Documentation
- **JSDoc Comments**: Use JSDoc for complex logic and public APIs
- **Type Definitions**: Maintain TypeScript interfaces for type safety
- **Usage Examples**: Include usage patterns and examples
- **Change History**: Document significant changes and decisions

#### API Documentation
- **Endpoint Descriptions**: Clear explanation of API endpoints
- **Parameter Documentation**: Complete parameter specifications
- **Response Examples**: Sample responses for each endpoint
- **Error Handling**: Document error cases and responses

## Documentation Maintenance

### Version Control Practices
- **Meaningful Commits**: Use descriptive commit messages for documentation changes
- **Change Tracking**: Track significant documentation updates with dates
- **Review Process**: Require peer review for substantial documentation changes
- **Consistency**: Keep documentation synchronized with implementation changes

### Quality Assurance
- **Link Validation**: Ensure all internal and external links are working
- **Content Accuracy**: Regularly verify accuracy of technical information
- **Completeness**: Ensure documentation covers all public interfaces
- **Accessibility**: Use clear language and logical structure for accessibility

## Cross-References and Navigation

### Internal References
- **Relative Paths**: Use relative paths for internal documentation links
- **Anchor Links**: Use anchor links for section navigation within documents
- **Cross-Document Links**: Link related documentation for discoverability

### External References
- **Resource Links**: Link to relevant external resources and documentation
- **Documentation Standards**: Reference external style guides and standards
- **Tool Documentation**: Link to tool and framework documentation when relevant

## Cross-References

### Depends On
- **[Baby Steps™ Methodology](baby-steps.md)** - Core operational principles
- **[Rule Templates](rule-templates.md)** - Standardized rule creation structure
- **[Coding Standards](coding-standards.md)** - Code-related documentation standards

### Extends
- **Universal Standards**: Applies to all Cline documentation across projects
- **Rule Ecosystem**: Provides foundation for consistent rule documentation

### See Also
- **[Documentation Guidelines](TODO-implementation.md)** - Workspace-specific implementation details
- **[Avoid Marketing Hype](avoid-marketing-hype.md)** - Documentation accuracy rules

### Replaces
- **Project-Specific Documentation Guidelines**: Consolidates universal standards from project-specific versions

---

**Quality Checklist:**
- [ ] Consistent formatting and structure
- [ ] Clear, actionable content
- [ ] Proper cross-references
- [ ] Complete code examples
- [ ] Maintained version control history
