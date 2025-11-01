# Git Development Workflow

This workflow outlines best practices for git development, branching strategies, commit conventions, and pull request management in the Hyperpage project.

## Prerequisites
- Git repository initialized and connected to GitHub
- GitHub CLI (`gh`) installed and authenticated
- Feature/bug ticket or issue created in project management tool
- Local development environment set up

## Branch Naming Conventions

### Branch Types
- `feature/`: New features and enhancements
- `bugfix/`: Bug fixes
- `hotfix/`: Critical production fixes
- `chore/`: Maintenance tasks (refactoring, tooling)
- `docs/`: Documentation updates

### Naming Guidelines
- Use lowercase letters, numbers, and hyphens only
- Keep branch names descriptive but under 50 characters
- Prefix with ticket number when available: `feature/HP-123-user-authentication`
- Avoid generic names like `fix-bug` or `update-feature`

## Workflow Steps

### Step 1: Prepare Your Workspace

Check current repository status and ensure you're on main branch:

```xml
<execute_command>
<command>git status</command>
<requires_approval>false</requires_approval>
</execute_command>
```

Ensure you're on the main branch and have latest changes:

```xml
<execute_command>
<command>git checkout main && git pull origin main</command>
<requires_approval>false</requires_approval>
</execute_command>
```

### Step 2: Create Feature Branch

Create a new branch for your changes following naming conventions:

```xml
<execute_command>
<command>git checkout -b feature/HP-123-add-user-dashboard</command>
<requires_approval>false</requires_approval>
</execute_command>
```

### Step 3: Make Changes with Staged Commits

#### Stage Related Changes
Use interactive staging to review changes before committing:

```xml
<execute_command>
<command>git add -p</command>
<requires_approval>false</requires_approval>
</execute_command>
```

#### Commit Message Standards
- First line: 50 characters max, imperative mood ("Add", "Fix", "Remove")
- Blank line after title
- Detailed explanation of what and why (not how)
- Reference issue/ticket numbers when applicable

```xml
<execute_command>
<command>git commit -m "feat: add user dashboard component

- Implement responsive dashboard with widgets
- Add dark mode support following design system
- Include loading states and error handling
- Add TypeScript interfaces for dashboard data

Closes #123"</command>
<requires_approval>false</requires_approval>
</execute_command>
```

#### Multiple Commits for Complex Changes
Break large changes into focused commits:

```xml
<execute_command>
<command>git add app/components/Dashboard.tsx && git commit -m "feat: implement dashboard container component"</command>
<requires_approval>false</requires_approval>
</execute_command>
```

```xml
<execute_command>
<command>git add app/components/hooks/useDashboardData.ts && git commit -m "feat: add dashboard data hook with caching"</command>
<requires_approval>false</requires_approval>
</execute_command>
```

### Step 4: Push Changes and Create Pull Request

Push your branch to GitHub:

```xml
<execute_command>
<command>git push -u origin feature/HP-123-add-user-dashboard</command>
<requires_approval>false</requires_approval>
</execute_command>
```

Create pull request using GitHub CLI:

```xml
<execute_command>
<command>gh pr create --title "feat: add user dashboard component" --body "Implement responsive user dashboard with widgets

### Changes
- Add Dashboard component with responsive grid layout
- Include dark mode and theme support
- Add data fetching hook with caching
- Implement loading states and error boundaries

### Testing
- Responsive design tested on mobile and desktop
- Dark mode compatibility verified
- TypeScript errors resolved

Closes #123" --label "feature,dashboard"</command>
<requires_approval>false</requires_approval>
</execute_command>
```

### Step 5: Code Review Process

#### As Author: Request Review
Mark PR ready for review and request reviewers:

```xml
<execute_command>
<command>gh pr ready && gh pr edit --add-label "ready-for-review"</command>
<requires_approval>false</requires_approval>
</execute_command>
```

Request specific reviewers:

```xml
<execute_command>
<command>gh pr edit --add-reviewer @octocat,@hubot</command>
<requires_approval>false</requires_approval>
</execute_command>
```

#### As Reviewer: Review Code
Checkout the branch locally for thorough review:

```xml
<execute_command>
<command>gh pr checkout 123</command>
<requires_approval>false</requires_approval>
</execute_command>
```

Test the changes locally:

```xml
<execute_command>
<command>npm run build && npm run test</command>
<requires_approval>false</requires_approval>
</execute_command>
```

#### Code Review Checklist
- [ ] **Functionality**: Code works as intended
- [ ] **TypeScript**: No type errors or `any` types used inappropriately
- [ ] **Testing**: Unit tests added/updated, all tests pass
- [ ] **Performance**: No obvious performance issues
- [ ] **Security**: No sensitive data exposure, secure practices followed
- [ ] **Architecture**: Follows project patterns and principles
- [ ] **Documentation**: Code is readable, complex logic documented
- [ ] **Responsive Design**: Mobile/desktop compatibility
- [ ] **Accessibility**: ARIA labels, keyboard navigation, screen reader support

#### Submit Review Comments
Add inline comments and approve/request changes:

```xml
<execute_command>
<command>gh pr review 123 --comment -b "Looks good overall, just a small suggestion for error handling"</command>
<requires_approval>false</requires_approval>
</execute_command>
```

### Step 6: Address Feedback and Iterate

#### Make Additional Commits on Branch
After review feedback, make improvements and commit:

```xml
<execute_command>
<command>git add . && git commit -m "fix: improve error handling in dashboard component

Address reviewer feedback:
- Add try/catch blocks for API calls
- Implement proper error messages
- Add loading state indicators"</command>
<requires_approval>false</requires_approval>
</execute_command>
```

Push updates and notify reviewers:

```xml
<execute_command>
<command>git push && gh pr comment 123 -b "Addressed review feedback with improved error handling"</command>
<requires_approval>false</requires_approval>
</execute_command>
```

### Step 7: Merge Pull Request

#### Choose Merge Strategy

**For feature branches with detailed commit history:**
- Use **Merge Commit** to preserve full commit history
- Provides traceability of individual changes

**For simple features or refactoring:**
- Use **Squash and Merge** to create clean, single commit
- Reduces noise in main branch history

**For bug fixes:**
- Use **Rebase and Merge** for linear history
- Simplifies debugging with linear commit chain

#### Merge the Pull Request
Once approved and CI passes, merge using GitHub CLI:

```xml
<execute_command>
<command>gh pr merge 123 --merge --delete-branch</command>
<requires_approval>true</requires_approval>
</execute_command>
```

Or for squash merge:

```xml
<execute_command>
<command>gh pr merge 123 --squash --delete-branch</command>
<requires_approval>true</requires_approval>
</execute_command>
```

### Step 8: Repository Maintenance

#### Update Local Main Branch
After merge, update local main and cleanup:

```xml
<execute_command>
<command>git checkout main && git pull origin main</command>
<requires_approval>false</requires_approval>
</execute_command>
```

#### Clean Up Stale Branches
Regularly clean up merged branches:

```xml
<execute_command>
<command>git branch -d feature/completed-feature</command>
<requires_approval>false</requires_approval>
</execute_command>
```

#### Sync with Remote
Prune remote tracking branches:

```xml
<execute_command>
<command>git fetch --prune</command>
<requires_approval>false</requires_approval>
</execute_command>
```

## Advanced Git Operations

### Rebasing to Main
Keep feature branch up-to-date with latest main:

```xml
<execute_command>
<command>git checkout main && git pull && git checkout feature/HP-123 && git rebase main</command>
<requires_approval>false</requires_approval>
</execute_command>
```

### Handling Merge Conflicts
If conflicts occur during rebase:

```xml
<execute_command>
<command>git status</command>
<requires_approval>false</requires_approval>
</execute_command>
```

Edit conflicted files, then continue rebase:

```xml
<execute_command>
<command>git add resolved-file.ts && git rebase --continue</command>
<requires_approval>false</requires_approval>
</execute_command>
```

Abort rebase if needed:

```xml
<execute_command>
<command>git rebase --abort</command>
<requires_approval>false</requires_approval>
</execute_command>
```

### Interactive Rebase for Commit Cleanup
Clean up commit history before creating PR:

```xml
<execute_command>
<command>git rebase -i HEAD~3</command>
<requires_approval>false</requires_approval>
</execute_command>
```

## Commit Message Conventions

Follow Conventional Commits for automated changelog generation:

```
type(scope): description

[optional body]

[optional footer]
```

### Types
- `feat`: New features
- `fix`: Bug fixes
- `docs`: Documentation updates
- `style`: Code style changes (formatting, semicolons)
- `refactor`: Code refactoring
- `test`: Test additions/updates
- `chore`: Maintenance tasks

### Examples
- `feat: add dark mode toggle to dashboard`
- `fix: resolve memory leak in data fetching hook`
- `docs: update API documentation for tool integration`
- `refactor: extract dashboard widgets into separate components`

## Best Practices

### General Guidelines
- **Small, Focused Commits**: Each commit should do one thing well
- **Frequent Commits**: Commit early and often to avoid large PRs
- **Descriptive Messages**: Write commit messages explaining what and why
- **Atomic Changes**: Changes should be reviewable in isolation
- **Branch Hygiene**: Keep branches short-lived and focused

### Pull Request Best Practices
- **Descriptive Title**: Clear, concise description of changes
- **Detailed Description**: Explain what, why, and how
- **Small Scope**: Keep PRs under 500 lines when possible
- **Link Issues**: Reference related tickets/issues
- **Add Screenshots**: For UI changes, include before/after images
- **Request Review**: Proactively request specific reviewers
- **Respond Promptly**: Address review feedback quickly

### Code Review Standards
- **Be Constructive**: Focus on code quality, not personal preferences
- **Explain Reasoning**: Provide context for suggested changes
- **Acknowledge Good Code**: Recognize well-written implementations
- **Balance Perfection vs Progress**: Accept reasonable solutions
- **Test Changes**: Reviewers should test functionality locally

## CLI Safety Considerations

When using GitHub CLI commands (especially with MCP tools like `create_pull_request`), special attention must be paid to PR body content to prevent shell command errors caused by special characters, quotes, and excessive length.

### PR Body Content Sanitization

#### Special Character Handling
- **Escape shell metacharacters**: Use backslashes to escape `$`, `` ` ``, `"`, `'`, `\`, and shell control characters
- **Avoid multi-line complexity**: Replace actual newlines with `\n` sequences or use file-based approach
- **Handle quotes carefully**: Single quotes are safer for content with double quotes; escape embedded quotes appropriately
- **URL encoding**: For URLs with special characters, consider URL encoding or storing in files

#### Common Problem Characters
Problematic characters that can break CLI commands:
- `$` (variable substitution)
- `` ` `` (command substitution)
- `"` (quote handling)
- `'` (quote handling)
- `\` (escape sequences)
- `;` and `|` (command separators)
- Parentheses `( )` and curly braces `{ }` in certain contexts

#### Safe Escaping Examples
```bash
# Instead of problematic content:
gh pr create --body "Fix $500 bug in authentication ($auth)" --title "Security fix"

# Use escaped version:
gh pr create --body "Fix \$500 bug in authentication (\$auth)" --title "Security fix"

# Or for complex content:
gh pr create --title "Security fix" --body-file pr-body.md
```

### Length Limits and Performance

#### Command Line Length Restrictions
- **Windows**: 8191 characters (approximately 8KB)
- **Linux/macOS**: 128KB to 2MB depending on shell
- **GitHub CLI limitations**: Practical limit around 64KB for PR bodies

#### Best Practices for Long Content
- Use `--body-file` flag for PR bodies over 1000 characters
- Create temporary markdown files for complex formatted content
- Consider referencing external documentation for very detailed PRs

#### File-Based PR Creation Example
For complex PR bodies, create a file and reference it:

```bash
# Create PR body file
cat > pr-body.md << 'EOF'
## Security Fix Summary

This PR addresses authentication vulnerabilities including:

### Changes
- Fixed password validation bypass ($500 security issue)
- Added rate limiting for login attempts
- Implemented stronger password requirements

### Testing
- All existing tests pass
- Added security test suite
- Penetration testing completed

### References
- Security audit report: [internal-link]
- Ticket: ISSUE-123

> **Note**: Special characters like `$500` are handled safely in file format.
EOF

# Create PR using file
gh pr create --title "Security: Fix authentication bypass" --body-file pr-body.md

# Clean up
rm pr-body.md
```

### MCP Tool Safety Guidelines

When using MCP tools like `create_pull_request` that interface with CLI commands:

#### Content Preprocessing Requirements
- **Sanitize input data**: Remove or escape shell metacharacters before passing to CLI
- **Validate content length**: Check total command length stays within shell limits
- **Use file-based approach**: For complex content with formatting, code blocks, or special characters
- **Error handling**: Implement fallback to file-based creation if inline content fails

#### Safe Implementation Pattern
```typescript
// Example MCP tool usage pattern
const createSafePR = (title: string, body: string) => {
  const sanitizedBody = sanitizeForCLI(body);

  if (sanitizedBody.length > MAX_INLINE_LENGTH || needsFileBased(sanitizedBody)) {
    // Use file-based approach
    return createPullRequest({
      title,
      bodyFile: writeTempBodyFile(sanitizedBody)
    });
  } else {
    // Use inline approach
    return createPullRequest({
      title,
      body: sanitizedBody
    });
  }
};
```

#### Prevention Checklist
- [ ] Review PR body for special shell characters before CLI execution
- [ ] Test commands with sample data containing potential problem characters
- [ ] Implement length validation (under 1000 chars preferred for inline)
- [ ] Use `--body-file` for content with code blocks, links, or complex formatting
- [ ] Escape dollar signs, backticks, and quotes in inline content
- [ ] Avoid embedding shell commands or variables in PR descriptions

This workflow ensures consistent, high-quality development practices across the Hyperpage project.
