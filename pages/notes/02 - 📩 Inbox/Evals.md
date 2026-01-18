---
resources:
  - https://open.spotify.com/episode/7JBDnz8nqN305VkGcxUeZL?si=ba58ebc3eb354422
  - https://edwinchen.ai/blog/you-are-your-objective-function
  - https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents
date_created: 2026-01-12
date_updated: 2026-01-12
---
- a technique for evaluation of LLM model performance
- Evals make problems and behavioral changes visible before they affect users, and their value compounds over the lifecycle of an agent
- Evals also shape how quickly you can adopt new models.
- An **evaluation** (“eval”) is a test for an AI system: give an AI an input, then apply grading logic to its output to measure success
	- **Single-turn evaluations** are straightforward: a prompt, a response, and grading logic
	- **multi-turn evaluations** have become increasingly common
- When does the need for evals occur
	- The breaking point often comes **when users report the agent feels worse after changes**, and the team is ‘flying blind’ with no way to verify except to guess and check
	- Absent evals, debugging is reactive
	- Evals are especially useful at the start of agent development to explicitly encode expected behavior
- Eval types
	- Capability
		- **Capability or “quality” evals** ask “what can this agent do well?”
	- Regression
		- **Regression evals** ask “does the agent still handle all the tasks it used to?”
		- Should have a nearly 100% pass rate
		- Protect against backsliding
- Defining eval tasks is **one of the best ways to stress-test whether the product requirements are concrete enough** to start building
- **eval-driven development**: build evals to define planned capabilities before agents can fulfill them, then iterate until the agent performs well
## Building evals
### Key notions
- - A **task** (a.k.a **problem** or **test case**) is a single test with defined inputs and success criteria
- Each attempt at a task is a **trial**. Because model outputs vary between runs, we run multiple trials to produce more consistent results.
- A **grader** is logic that scores some aspect of the agent’s performance. A task can have multiple graders, each containing multiple assertions (sometimes called **checks**)**.**
- A **transcript** (also called a **trace** or **trajectory**) is the complete record of a trial, including outputs, tool calls, reasoning, intermediate results, and any other interactions.
- The **outcome** is the final state in the environment at the end of the trial.
- An **evaluation suite** is a collection of tasks designed to measure specific capabilities or behaviors
## Grader types
Each grader evaluates some portion of either the transcript or the outcome.
### Code-based
•  String match checks (exact, regex, fuzzy, etc)  
• Binary tests (fail-to-pass, pass-to-pass)  
• Static analysis (lint, type, security)  
• Outcome verification  
• Tool calls verification (tools used, parameters)  
• Transcript analysis (turns taken, token usage)
### Model-based
- Rubric-based scoring
- Natural language assertions
- Pairwise comparison
- Reference-based evaluation
- Multi-judge consensus
### Human
- SME review
- Crowdsourced judgment
- Spot-check sampling
- A/B testing
- Inter-annotator agreement
# Evaluation
- For each task, scoring can be weighted (combined grader scores must hit a threshold), binary (all graders must pass), or a hybrid.
## Evaluating conversational agents
- Unlike traditional chatbots, they maintain state, use tools, and take actions mid-conversation
- conversational agents present a distinct challenge: the quality of the interaction itself is part of what you're evaluating
- Effective evals for conversational agents usually rely on verifiable end-state outcomes and rubrics that capture both task completion and interaction quality
- Unlike most other evals, they often require a second LLM to simulate the user
## Evaluating research agents
- **Research agents** gather, synthesize, and analyze information, then produce output like an answer or report
- What counts as “comprehensive,” “well-sourced,” or even “correct” depends on context: a market scan, due diligence for an acquisition, and a scientific report each require different standards.
## Metrics
- Two typical metrics used in evaluation
- Both metrics are useful, and which to use depends on product requirements: 
	- pass@k for tools where one success matters
	- pass^k for agents where consistency is essential.
### [**pass@k**](https://proceedings.neurips.cc/paper/2019/file/7298332f04ac004a0ca44cc69ecf6f6b-Paper.pdf)
- measures the likelihood that an agent gets at least one correct solution in _k_ attempts
- A score of 50% pass@1 means that a model succeeds at half the tasks in the eval on its first try
### [**pass^k**](https://arxiv.org/abs/2406.12045)
- measures the probability that _all k_ trials succeed
- If your agent has a 75% per-trial success rate and you run 3 trials, the probability of passing all three is (0.75)³ ≈ 42%
# Building evals for agents
- think of it like eval-driven agent development
	- define success early, measure it clearly, and iterate continuously
## Steps
### Collecting initial eval dataset
#### 0. Start early
   - 0-50 simple tasks drawn from real failures is a great start
   - More mature agents may need larger, more difficult evals to detect smaller effects, but it’s best to take the 80/20 approach in the beginning
   - Early on, product requirements naturally translate into test cases
#### 1. Start with what you already test manually
- Converting user-reported failures into test cases ensures your suite reflects actual usage
#### 2. Write clearly defined tasks with reference solutions
- **A good task is one where two domain experts would independently reach the same pass/fail verdict**
- Ambiguity in task specifications becomes noise in metrics
- agents shouldn’t fail due to ambiguous specs
- For each task, it’s useful to create a reference solution: a known-working output that passes all graders
#### 3. Build balanced problem sets
- Test both the cases where a behavior _should_ occur and where it _shouldn't_
- **One-sided evals create one-sided optimization**
- if you only test whether the agent searches when it should, you might end up with an agent that searches for almost everything
- Striking the right balance between undertriggering (not searching when it should) or overtriggering (searching when it shouldn’t) might be difficult
### Design the eval harness and graders
#### 4. Build a robust eval environment
- it is essential that the agent in the eval functions roughly the same as the agend used in production and the environment does not add any additional noise
- Each trial should be “isolated” by starting from a clean environment.
- Unnecessary shared state between runs (leftover files, cached data, resource exhaustion) can cause correlated failures due to infrastructure flakiness rather than agent performance
#### 5. Design graders well
- great eval design involves choosing the best graders for the agent and the tasks
- choose deterministic graders where possible, LLM graders where necessary or for additional flexibility, and using human graders judiciously for additional validation
- There is a common instinct to check that agents followed very specific steps like a sequence of tool calls in the right order
	- *his approach too rigid and results in overly brittle tests, as agents regularly find valid approaches that eval designers didn’t anticipate*
- **it’s often better to grade what the agent produced, not the path it took**
- For tasks with multiple components, build in partial credit
	- A support agent that correctly identifies the problem and verifies the customer but fails to process a refund is meaningfully better than one that fails immediately
	- It’s important to represent this continuum of success in results.
- **To avoid hallucinations, give the LLM a way out like providing an instruction to return “Unknown” when it doesn’t have enough information**
- **The agent shouldn’t be able to easily “cheat” the eval. Tasks and graders should be designed so that passing genuinely requires solving the problem rather than exploiting unintended loopholes**
### Maintain and use the eval long-term
#### 6. Check the transcripts
- You won't know if your graders are working well unless you read the transcripts and grades from many trials
- When a task fails, the transcript tells you whether the agent made a genuine mistake or whether your graders rejected a valid solution
#### 7. Monitor for eval saturation
- An eval at 100% tracks regressions but provides no signal for improvement
- **Eval saturation** occurs when an agent passes all of the solvable tasks, leaving no room for improvement
- As evals approach saturation, progress will also slow, as only the most difficult tasks remain
- **Do not take eval scores at face value until someone digs into the details of the eval and reads some transcripts**
#### 8. Keep evaluation suites healthy through open contribution
- An eval suite is a living artifact which needs ongoing attention and clear ownership to remain useful
- What proved most effective (at Anthropic) was establishing dedicated evals teams to own the core infrastructure, while domain experts and product teams contribute most eval tasks and run the evaluations themselves
- For AI product teams, owning and iterating on evaluations should be as routine as maintaining unit tests.