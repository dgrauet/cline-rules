---
name: "Documentation Accuracy Standards"
description: "Universal guidelines to prevent marketing hype and false metrics in all Cline project documentation, commits, and communications"
author: "Cline Team"
version: "1.0"
tags: ["documentation", "commits", "accuracy", "technical-writing", "standards"]
globs: ["*.md", "*.ts", "*.js", "*.py", "*.java", "*.go", "*.rs"]
related_rules: ["documentation-standards.md", "coding-standards.md"]
effective_date: "2025-01-11"
review_date: "2025-07-11"
---

# Documentation Accuracy: Universal Anti-Marketing Hype Standards

## Critical Rule: No False Claims in Documentation, Commits, or Communications

**MANDATORY INSTRUCTION**: All documentation, README files, architectural descriptions, commit messages, and chat responses **MUST** accurately reflect the current state of the project. No marketing hype, aspirational claims, or false metrics are allowed across any Cline project.

## Universal Prohibited Content Patterns

### ❌ **False Test Metrics**
- ~~"50/50 unit tests passing"~~ → **If including counts, verify actual numbers**
- ~~"100% success rate"~~ → **Use factual language like "automated tests ensure stability"**
- ~~"56/56 unit tests passed | 0 failed"~~ → **Avoid specific counts with minimal verification**

### ❌ **False Performance Claims**
- ~~"Application loads in under 3 seconds"~~ → **No unsubstantiated performance benchmarks**
- ~~"Tests complete under 30 seconds"~~ → **Remove statements that imply measured but unverified metrics**
- ~~"Zero compiler errors, clean production builds"~~ → **Do not pretend current state is perfect**

### ❌ **False Feature Claims**
- ~~"Advanced adaptive polling with intelligent intervals"~~ → **Describe actual implementation only**
- ~~"Intelligent quota management system"~~ → **Use accurate technical terms**
- ~~"Virtual scrolling for large datasets"~~ → **Only document features that actually exist**

### ❌ **Technology Stack False Claims**
- ~~"Using Framework X components"~~ → **Must match actual dependencies**
- ~~"Eliminated Framework Y dependencies"~~ → **Cannot contradict actual codebase**

### ❌ **Success Targets and Metrics**
- ~~"Reduce errors by 80%"~~ → **No made-up success metrics**
- ~~"Issues reduced by 41%"~~ → **Require actual measurement if including numbers**
- ~~"Target <1% error rate"~~ → **No aspirational targets in completed features**

### ❌ **False Claims in Commit Messages**
- ~~"Fixed critical security vulnerability"~~ → **Only if actually fixed and verified**
- ~~"Optimized performance by 300%"~~ → **Require actual measurements**
- ~~"Added revolutionary new feature"~~ → **Use factual descriptions**
- ~~"Refactored entire codebase for perfection"~~ → **Describe actual changes made**

### ❌ **False Claims in Chat Responses**
- ~~"This solution is enterprise-grade and battle-tested"~~ → **Describe actual implementation**
- ~~"I've implemented the most efficient algorithm possible"~~ → **Stick to factual technical details**
- ~~"This will solve all your problems forever"~~ → **Describe what the change addresses specifically**
- ~~"Zero downtime guaranteed"~~ → **No absolute guarantees without verification**

## Universal Approved Content Patterns

### ✅ **Accurate Documentation**
- **Before**: ~~"Comprehensive testing with 100% success rate"~~
- **After**: "Automated tests ensure reliability and stability"

- **Before**: ~~"All tests passing with 100% success rate"~~
- **After**: "Test suite includes comprehensive coverage"

- **Before**: ~~"Advanced system with intelligent features"~~
- **After**: "System implements feature X with capability Y"

### ✅ **Factual Architecture Descriptions**
- **Before**: ~~"Zero hardcoded logic"~~ (implementation contains conditionals)
- **After**: "Configuration-driven architecture for flexibility"

### ✅ **Honest Quality Assessments**
- **Before**: ~~"Production READY ✅" with specific metrics~~
- **After**: "Project includes automated testing and error handling"

### ✅ **Accurate Commit Messages**
- **Instead of**: ~~"Fixed critical security vulnerability"~~
- **Use**: "Fix input validation in authentication handler"
- **Instead of**: ~~"Optimized performance by 300%"~~ (unmeasured)
- **Use**: "Improve query performance for database lookups"
- **Instead of**: ~~"Added revolutionary new feature"~~
- **Use**: "Add user authentication endpoint with email validation"
- **Instead of**: ~~"Refactored entire codebase for perfection"~~
- **Use**: "Refactor middleware to improve error handling"

### ✅ **Factual Chat Responses**
- **Instead of**: ~~"This solution is enterprise-grade and battle-tested"~~
- **Use**: "This implementation follows standard architectural patterns"
- **Instead of**: ~~"I've implemented the most efficient algorithm possible"~~
- **Use**: "This implementation uses optimized search algorithm for better performance"
- **Instead of**: ~~"This will solve all your scaling problems forever"~~
- **Use**: "This caching layer will reduce database load for this specific use case"
- **Instead of**: ~~"Zero downtime guaranteed"~~
- **Use**: "The deployment process includes health checks to minimize service disruption"

## Universal Verification Requirements

**MANDATORY CHECKS** before documenting:

### 1. Implementation Claims Verification
- [ ] Verify actual dependencies match documented frameworks
- [ ] Check codebase for claimed functionality
- [ ] Confirm performance claims with actual testing
- [ ] Validate architectural descriptions against code structure

### 2. Feature Implementation Verification
- [ ] Code search for claimed functionality
- [ ] Verify technology stack claims against configuration files
- [ ] Check build processes for claimed capabilities
- [ ] Test documented features to ensure they work as described

### 3. Architecture Claims Verification
- [ ] Review actual codebase for architectural consistency
- [ ] Verify component/system architecture matches documentation
- [ ] Check separation of concerns claims
- [ ] Validate design pattern implementations

### 4. Communication Verification
- [ ] Review commit messages for factual accuracy before publishing
- [ ] Ensure descriptions match actual implementation without superlatives
- [ ] Verify technical claims with actual code or measurements
- [ ] Cross-reference documentation against implemented features

## Universal Documentation Writing Rules

### Rule 1: Use Factual Language
- **Avoid**: Superlatives like "enterprise-grade", "production-ready", "revolutionary"
- **Use**: Specific, verifiable descriptions like "Framework-based implementation with TypeScript"

### Rule 2: No Aspirational Features as Current
- **Wrong**: Documenting roadmap items as completed features
- **Right**: Keep development plans separate from current capabilities

### Rule 3: Include Technical Context, Not Marketing
- **Wrong**: "Advanced system with intelligent processing"
- **Better**: "System implements algorithm X for processing pattern Y"

### Rule 4: Regular Documentation Audits
- Periodic reviews required to ensure accuracy across all projects
- Flag any statements that claim perfect or absolute states
- Require code verification for all quantitative claims
- Maintain consistency with actual project capabilities

### Rule 5: Use Factual Language in All Communications
- **Commit Messages**: Focus on what was actually changed, not impact claims
- **Chat Responses**: Describe technical implementations precisely without superlatives
- **Avoid Hype Phrases**: Terms like "amazing", "incredible", "game-changing" have no place in technical communication
- **Be Specific**: Use concrete examples and references to implementation details

### Rule 6: No Aspirational Claims Anywhere
- **Commits**: Don't claim fixes or improvements that may be partially implemented
- **Chat**: Don't promise outcomes or benefits beyond demonstrable reality
- **Documentation**: Keep development goals separated from current capabilities
- **Verification Required**: Any claim of improvement must be backed by evidence

## Universal High-Risk Documentation Areas

### Must Verify Before Publishing
- **README.md and project documentation** - Always verify claims against reality
- **Commit Messages** - Factually describe actual changes made
- **Chat and Communication** - Describe implementation without marketing language
- **Architecture documentation** - Technical claims must match implementation
- **Feature documentation** - Features should exist and work as described
- **Performance documentation** - Claims should be based on actual measurements

## Cross-References

### Depends On
- **[Documentation Standards](documentation-standards.md)** - Universal documentation guidelines
- **[Coding Standards](coding-standards.md)** - Code quality and accuracy standards

### Extends
- **Technical Communication**: Provides specific anti-hype guidelines for all Cline documentation
- **Quality Assurance**: Implements verification requirements for documentation accuracy

### See Also
- **[Meta-Governance Framework](META_GOVERNANCE.md)** - Rules about rules and quality standards
- **[Rule Templates](rule-templates.md)** - Template standards for rule creation

---

**Final Rule**: **When writing any documentation, commit messages, or engaging in technical communications, always prefer factual accuracy over marketing appeal. Claims that cannot be immediately verified against the actual implementation are prohibited.**

**Application**: This rule applies universally across all Cline projects and must be followed by all team members and AI assistants when creating or modifying technical content.
