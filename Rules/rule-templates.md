---
name: "Cline Rules Templates"
description: "Standardized templates and validation criteria for creating consistent, high-quality Cline rules"
author: "Cline Team"
version: "1.0"
tags: ["templates", "rule-creation", "validation", "standards"]
globs: ["*.md"]
related_rules: ["documentation-standards.md", "coding-standards.md"]
effective_date: "2025-01-11"
review_date: "2025-07-11"
---

# Cline Rules Templates

This document provides standardized templates and validation criteria for creating consistent, high-quality Cline rules across all projects.

## Rule Creation Template

### Template: Core Rule Structure

```yaml
---
name: "Descriptive Rule Name"
description: "Brief explanation of what this rule accomplishes and its scope"
author: "Author/Team Name"
version: "1.0"
tags: ["tag1", "tag2", "category"]
globs: ["file-patterns/**/*"]
related_rules: ["related-rule1.md", "related-rule2.md"]
replaces: ["obsolete-rule.md"]
applies_to: ["workspace", "global", "both"]
priority: ["critical", "high", "medium", "low"]
effective_date: "2025-01-11"
review_date: "2026-01-11"
---

# Rule Title

## Objective
[Clear, concise statement of what this rule accomplishes]

## Scope
[Define what this rule covers and what it doesn't]

## Core Principles
[3-6 bullet points of fundamental concepts]

## Implementation Guidelines
[Detailed do/don't patterns with examples]

## Validation Criteria
[How to verify this rule is being followed]

## Cross-References
### Depends On
- [Prerequisite Rule](link) - Required understanding

### Extends
- [Base Rule](link) - Builds upon this foundation

### See Also
- [Complementary Rule](link) - Works together
- [Related Implementation](link) - Practical examples

## Examples
### ✅ Correct Usage
```markdown
[Correct pattern example]
```

### ❌ Incorrect Usage
```markdown
[Incorrect pattern to avoid]
```

## Quality Checklist
- [ ] Clear objective statement
- [ ] Proper YAML frontmatter
- [ ] Actionable instructions
- [ ] Examples provided
- [ ] Cross-references included
- [ ] No conflicting guidance
- [ ] Review date set
```

### Template: Workflow Rule

```yaml
---
name: "Workflow Name"
description: "Step-by-step process for [specific task]"
author: "Team Name"
version: "1.0"
tags: ["workflow", "automation", "process"]
globs: ["target-files/**/*"]
related_rules: ["prerequisite-rule.md"]
---

# Workflow Name

## Objective
[What this workflow accomplishes]

## Prerequisites
- [Prerequisite 1]
- [Prerequisite 2]
- [Required tools or setup]

## Detailed Steps

### Step 1: [Action]
1. [Substep A]
2. [Substep B]
   - [Detail or example]
3. [Substep C]

### Step 2: [Action]
1. [Substep A]
2. [Substep B]

## Validation
- [ ] Step 1 completed successfully
- [ ] Step 2 completed successfully
- [ ] Expected output generated
- [ ] Quality checks passed

## Output
- **Generated Files**: [list of files created]
- **Expected Results**: [what should be achieved]
- **Success Criteria**: [how to verify completion]
```

### Template: Implementation Rule

```yaml
---
name: "Implementation Pattern Name"
description: "Specific implementation approach for [technology/context]"
author: "Development Team"
version: "1.0"
tags: ["implementation", "code", "pattern"]
globs: ["src/**/*.ts", "src/**/*.tsx"]
related_rules: ["coding-standards.md", "architecture-patterns.md"]
---

# Implementation Pattern Name

## Pattern Description
[What this pattern addresses and why it's used]

## Context
- **When to Use**: [Situations where this applies]
- **When NOT to Use**: [Situations where this doesn't apply]
- **Prerequisites**: [Required understanding or setup]

## Implementation Structure

### File Organization
```
project/
├── pattern-implementation/
│   ├── index.ts           # Entry point
│   ├── types.ts           # TypeScript interfaces
│   ├── implementation.ts  # Core logic
│   └── examples/          # Usage examples
```

### Code Pattern
```typescript
// Example implementation
interface PatternInterface {
  // Type definitions
}

// Core implementation
export class PatternImplementation implements PatternInterface {
  constructor(private config: Config) {
    // Validation
  }

  // Key methods
  public method(): Result {
    // Implementation
  }
}
```

### Usage Examples
```typescript
// Basic usage
const instance = new PatternImplementation(config);
const result = await instance.method();

// With error handling
try {
  const result = await instance.method();
  // Handle success
} catch (error) {
  // Handle errors appropriately
}
```

## Integration Points
- **Dependencies**: [What this depends on]
- **Provides**: [What this makes available]
- **Configurability**: [How to customize]

## Testing Strategy
```typescript
// Unit test structure
describe('PatternImplementation', () => {
  it('should handle valid input', () => {
    // Test implementation
  });

  it('should handle invalid input', () => {
    // Test error handling
  });
});
```

## Migration Guide
### From Previous Pattern
1. [Migration step 1]
2. [Migration step 2]
3. [Verification step]

### Breaking Changes
- [Change 1]: [Impact and mitigation]
- [Change 2]: [Impact and mitigation]
```

## Validation Checklist

### Content Quality
- [ ] **Objective Clarity**: Rule has a clear, specific purpose
- [ ] **Actionable Content**: Provides concrete do/don't patterns
- [ ] **Examples**: Includes both correct and incorrect usage
- [ ] **Cross-References**: Properly references related rules
- [ ] **Scope Definition**: Clearly defines what is and isn't covered

### Structural Quality
- [ ] **YAML Frontmatter**: Complete and properly formatted
- [ ] **Heading Structure**: Logical hierarchy with proper markdown
- [ ] **Code Blocks**: Properly formatted with language specification
- [ ] **Lists**: Consistent formatting with proper nesting
- [ ] **Links**: Working references to other rules and resources

### Technical Quality
- [ ] **No Conflicts**: No contradictory guidance with existing rules
- [ ] **Versioning**: Appropriate version number and review date
- [ ] **Maintainability**: Easy to update and extend
- [ ] **Testability**: Rules can be validated against implementation
- [ ] **Accessibility**: Clear language and logical structure

### Relationship Quality
- [ ] **Dependency Mapping**: Clearly identifies prerequisites
- [ ] **Extension Points**: Shows how rule builds on others
- [ ] **Conflict Resolution**: Addresses potential conflicts
- [ ] **Migration Path**: Provides upgrade guidance when applicable

## Quality Metrics

### Rule Health Indicators
- **Length**: 50-200 lines optimal (metadata + content)
- **Specificity**: High (concrete examples) > Low (abstract concepts)
- **Actionability**: >70% of content provides actionable guidance
- **Relationships**: 2-5 meaningful cross-references per rule
- **Maintenance**: Regular updates indicate rule health

### Anti-Pattern Detection
- **Overly Generic**: Vague, non-actionable guidance
- **Overly Specific**: Too narrow, not reusable
- **Orphaned**: No references to or from other rules
- **Conflicting**: Contradicts existing rules
- **Outdated**: No recent updates or review dates

## Automated Validation (Future)

### Linting Rules
- Check YAML frontmatter completeness
- Verify cross-reference validity
- Ensure consistent formatting
- Detect duplicate content
- Validate tag usage

### Quality Gates
- New rules must pass validation checklist
- Rule updates require impact assessment
- Breaking changes need migration guides
- Cross-reference consistency checks
- Version number increment validation

## Example Validation Report

```yaml
rule_validation:
  rule_name: "example-rule.md"
  status: "PASS"
  score: 85/100
  issues: []
  suggestions:
    - "Consider adding more specific examples"
    - "Add cross-reference to related guidelines"
  last_validated: "2025-01-11"
  validator: "Meta-Governance Framework"
```

This template system ensures consistent, high-quality rules that are maintainable, discoverable, and actionable across the Cline ecosystem.

## Cross-References

### Depends On
- **[Documentation Standards](documentation-standards.md)** - Universal documentation guidelines
- **[Coding Standards](coding-standards.md)** - Code-related standards and patterns

### Extends
- **Rule Creation Framework**: Provides standardized approach to rule development
- **Quality Assurance**: Implements validation criteria for rule quality

### See Also
- **[Baby Steps™ Methodology](baby-steps.md)** - Core operational principles
- **[Task Handoff Strategy](new-task-automation.md)** - Workflow management

### Replaces
- **Project-Specific Templates**: Consolidates universal template standards from project-specific versions

---

**Usage Guidelines:**
- Always use these templates as starting points for new rules
- Customize templates to fit specific project needs while maintaining structure
- Validate all new rules against the quality checklist
- Update templates as governance standards evolve
