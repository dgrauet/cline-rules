---
name: "Coding Standards"
description: "Universal coding standards and best practices for Cline projects"
author: "Cline Team"
version: "1.0"
tags: ["coding", "standards", "best-practices", "quality"]
globs: ["*.ts", "*.tsx", "*.js", "*.jsx", "*.py", "*.java", "*.go", "*.rs"]
related_rules: ["documentation-standards.md", "rule-templates.md"]
effective_date: "2025-01-11"
review_date: "2025-07-11"
---

# Coding Standards

This document provides universal coding standards and best practices applicable across all Cline projects.

## Core Code Standards

### Language Standards
- **TypeScript First**: Use TypeScript for all new code with proper type definitions
- **Type Safety**: Maintain strict type safety across interfaces and components
- **Modern JavaScript**: Use ES6+ features and modern syntax patterns
- **Descriptive Naming**: Use clear, descriptive variable and function names

### Code Organization
- **Single Responsibility**: Each function/component should have one clear purpose
- **Consistent Structure**: Organize code with consistent patterns across projects
- **Modular Design**: Create reusable, modular components and functions
- **Clear Separation**: Separate concerns between different layers

## Language-Specific Standards

### TypeScript/JavaScript Standards
- **Strict Mode**: Always use strict mode and strict type checking
- **Interface First**: Define interfaces before implementing classes
- **Generic Usage**: Use generics for reusable, type-safe functions
- **Async/Await**: Prefer async/await over promises for better readability
- **Error Handling**: Implement comprehensive error handling patterns

### React Standards
- **Functional Components**: Use functional components over class components
- **Hooks Pattern**: Follow React hooks patterns and best practices
- **Component Structure**: Organize components with clear props and state management
- **Performance**: Use React.memo and useMemo for performance optimization

## Code Quality Standards

### Readability
- **Consistent Formatting**: Follow consistent code formatting standards
- **Clear Comments**: Add comments for complex logic, not obvious code
- **Self-Documenting Code**: Write code that explains itself through good naming
- **Line Length**: Keep lines under 100 characters for readability

### Testing
- **Test Coverage**: Maintain adequate test coverage for critical functionality
- **Unit Tests**: Write unit tests for all core business logic
- **Integration Tests**: Include integration tests for component interactions
- **Test Patterns**: Follow consistent testing patterns and frameworks

## Development Practices

### Version Control
- **Meaningful Commits**: Use descriptive commit messages
- **Atomic Commits**: Keep commits focused on single changes
- **Branch Strategy**: Follow consistent branching and merging strategies
- **Code Review**: Require code reviews for all changes

### Documentation
- **API Documentation**: Document all public interfaces and APIs
- **Inline Comments**: Add comments for complex algorithms and business logic
- **README Updates**: Update documentation when making significant changes
- **Change Logs**: Maintain changelogs for user-facing changes

## Security Standards

### Input Validation
- **Always Validate**: Validate all user inputs and external data
- **Type Safety**: Use type checking to prevent type confusion vulnerabilities
- **Sanitization**: Sanitize data before processing or storage
- **Error Handling**: Don't expose sensitive information in error messages

### Authentication & Authorization
- **Secure Tokens**: Use secure token generation and storage
- **Principle of Least Privilege**: Grant minimal necessary permissions
- **Session Management**: Implement secure session management
- **Audit Trails**: Log security-relevant events

## Performance Standards

### Optimization
- **Profile First**: Profile code before optimizing
- **Efficient Algorithms**: Choose appropriate algorithms for the use case
- **Lazy Loading**: Implement lazy loading for large datasets
- **Caching**: Use caching strategies where appropriate

### Resource Management
- **Memory Leaks**: Prevent memory leaks through proper cleanup
- **Resource Disposal**: Always dispose of resources (file handles, network connections)
- **Garbage Collection**: Write code that is friendly to garbage collection
- **Concurrent Handling**: Handle concurrent operations safely

## Error Handling

### Error Patterns
- **Graceful Degradation**: Handle errors gracefully with fallback mechanisms
- **Error Boundaries**: Use error boundaries to contain error propagation
- **Logging**: Log errors with sufficient context for debugging
- **User Experience**: Provide meaningful error messages to users

### Recovery
- **Retry Logic**: Implement appropriate retry logic for transient failures
- **Circuit Breakers**: Use circuit breakers for external service failures
- **Fallback Strategies**: Provide fallback strategies when primary paths fail
- **Monitoring**: Monitor error rates and patterns

## Cross-References

### Depends On
- **[Documentation Standards](documentation-standards.md)** - Documentation guidelines for code
- **[Rule Templates](rule-templates.md)** - Template patterns for code-related rules

### Extends
- **Universal Standards**: Applies to all coding across Cline projects
- **Quality Framework**: Part of the overall quality and governance framework

### See Also
- **[Baby Steps™ Methodology](baby-steps.md)** - Core principles for code development
- **[Security Practices](security-practices.md)** - Security-specific coding guidelines

### Replaces
- **Project-Specific Coding Standards**: Consolidates universal coding standards from project-specific versions

---

## Quality Checklist

### Code Standards
- [ ] TypeScript strict mode compliance
- [ ] Proper type definitions for all interfaces
- [ ] Consistent code formatting
- [ ] Descriptive variable and function names

### Security
- [ ] Input validation implemented
- [ ] No sensitive data exposure
- [ ] Secure authentication patterns
- [ ] Proper error handling

### Performance
- [ ] Efficient algorithms chosen
- [ ] Memory leaks prevented
- [ ] Appropriate caching strategies
- [ ] Performance profiling completed

### Documentation
- [ ] Public APIs documented
- [ ] Complex logic commented
- [ ] README updated
- [ ] Tests adequately cover functionality

---

**Usage Guidelines:**
- These standards apply universally across all Cline projects
- Project-specific extensions should be added in workspace rules
- Always validate code against these standards before deployment
- Update standards as technology evolves and new best practices emerge
