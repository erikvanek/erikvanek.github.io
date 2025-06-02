---
title: "PKM Improvement 1 - Project Knowledge Maps"
date_created: 2025-06-01
tags:
  - knowledge-management
  - project-management
  - design-practice
  - implementation-guide
status: ready
effort: low
priority: high
---

# PKM Improvement 1: Project Knowledge Maps

## 🎯 **Objective**

Create a pre-project routine that generates curated knowledge maps linking relevant past insights to current project challenges, making your knowledge immediately actionable.

## 💡 **The Problem This Solves**

Currently, your knowledge and active projects operate in separate workflows. You have excellent insights captured in Resources, but they don't automatically surface when starting new design work. This creates missed opportunities to apply past learning and builds inconsistency across projects.

## 🛠️ **Implementation Plan**

### Step 1: Create the Knowledge Map Template (15 minutes)

Create this template in your Templates folder:

```markdown
---
title: "[PROJECT NAME] - Knowledge Map"
date_created: YYYY-MM-DD
project: "[PROJECT NAME]"
tags:
  - project-knowledge-map
  - [project-specific-tags]
---

# [PROJECT NAME] - Knowledge Map

## Project Context
- **Objective**: [Brief project goal]
- **Key Challenges**: [Primary challenges anticipated]
- **Stakeholders**: [Main stakeholders involved]
- **Timeline**: [Project duration]

## Relevant Knowledge from Second Brain

### Design Methodologies
*[Links to relevant methodology notes from Resources]*

### Past Project Learnings  
*[Links to relevant insights from previous [[Process reflection]] notes]*

### Anti-patterns to Avoid
*[Lessons learned about what NOT to do]*

### Stakeholder Management Insights
*[Relevant notes about working with similar stakeholder types]*

### Tools and Templates
*[Existing templates, frameworks, tools that apply]*

### Experimental Opportunities
*[New approaches from Resources you want to test on this project]*

## Knowledge Gaps Identified
*[Areas where you lack knowledge but need it for this project]*

## Success Metrics for Knowledge Application
- [ ] Applied [X] past insights to project approach
- [ ] Avoided [Y] previously identified anti-patterns  
- [ ] Tested [Z] new methodologies from research

## Related Notes
- [[🔥 Project planning]]
- [Link to actual project folder when created]
```

### Step 2: Integrate with Project Kickoff (10 minutes setup)

Add to your existing [[🔥 Project planning]] note:

**Before starting any new project:**
1. Create knowledge map using template
2. Ask Claude: "Based on my knowledge base, what insights should I review for [project type/context]?"
3. Spend 20 minutes linking relevant existing notes
4. Identify 1-2 knowledge gaps to address during project
5. Set intention to test 1 new approach from your Resources

### Step 3: Create Knowledge Feedback Loop (5 minutes)

Enhance your existing [[Process reflection]] template by adding:

```markdown
## Knowledge Application Review
- **Which past insights proved most valuable?**
- **What anti-patterns did I successfully avoid?**
- **Which experimental approaches worked/didn't work?**
- **What new insights should be added to Resources?**
- **How can the Knowledge Map process be improved?**
```

## 🎯 **Quick Start Guide**

### For Your Next Project:

1. **Before project kickoff** (20 minutes):
   - Create knowledge map using template
   - Ask Claude to suggest relevant notes from your Resources
   - Link 5-7 most relevant existing notes
   - Identify 1-2 knowledge gaps

2. **During project execution**:
   - Reference knowledge map when facing challenges
   - Add notes when applying past insights successfully
   - Document when experimental approaches work/fail

3. **Project completion**:
   - Update [[Process reflection]] with knowledge application results
   - Add new insights to relevant Resource notes
   - Update anti-patterns based on new learnings

## 📊 **Success Metrics**

**Week 1**: First knowledge map created for new project
**Week 2**: Successfully applied 2+ past insights during project work  
**Week 4**: Knowledge map process refined and integrated into standard workflow

## 🔧 **Integration Points**

### With Weekly Planning
- Schedule 20-minute knowledge map creation for new projects
- Block time for knowledge gap research when identified

### With Weekly Review  
- Check: "Did I create knowledge maps for new projects this week?"
- Review: "How did past insights help with current work?"

### With Existing Workflows
- Links to your current [[🔥 Project planning]] process
- Enhances existing [[Process reflection]] routine
- Builds on established [[Knowledge Retrieval]] practices

## 💡 **Claude Prompts for Implementation**

### For Knowledge Map Creation:
```
Claude, I'm starting a new [project type] project with these characteristics: [brief description]. 

Please help me create a knowledge map by:
1. Scanning my Resources folder for relevant methodologies
2. Identifying past project reflections that might apply
3. Suggesting tools/templates from my knowledge base
4. Highlighting potential anti-patterns to avoid

Focus on actionable insights I can immediately apply.
```

### For Gap Identification:
```
Claude, based on this project knowledge map, what knowledge gaps do you see? What should I research or learn before/during this project to increase success probability?
```

## 🚀 **Next Steps**

1. **This week**: Create knowledge map template in Templates folder
2. **Next project**: Apply process and gather feedback  
3. **After 2 projects**: Refine template based on experience
4. **Month 1 complete**: Move to [[PKM Improvement 2 - Learning Loops]]

## 🔗 **Related Improvements**

- **Builds toward**: [[PKM Improvement 2 - Learning Loops]] (enhanced project reflections)
- **Synergizes with**: [[Knowledge Retrieval]] (existing Claude prompts)
- **Enhances**: [[🔥 Project planning]] (current project workflow)

## 📝 **Implementation Notes**

*[Add your experience notes here as you implement]*

- **What worked well**:
- **What needs adjustment**:
- **Unexpected benefits**:
- **Time required in practice**:
