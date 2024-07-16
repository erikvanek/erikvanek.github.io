---
title: Is Coding dead? A LLM-assisted prototyping case study
date: 2024-07-16
layout: blog.njk
tags: ["posts", "AI", "design"]
permalink: /{{page.fileSlug}}/
---

As a service designer with a background in coding, I've always been fascinated by the intersection of design and technology. I have experimented with a tiny pet project that showcases the transformative power of AI in the prototyping process.

{% assign nalevyPath = '/plaAIground/mindsort/mindsort.mp4' %}
{% assign nalevyTitle = 'Evolving prototype in time. Check out the live version!' %}
{% render 'videofigure.njk', path: nalevyPath, title: nalevyTitle %}

This article provides a detailed walkthrough of how I used AI to rapidly prototype a web application, offering insights for designers looking to leverage similar tools. Whole process did not take more than 30 minutes.

See interactive demo of what we're building [here](www.erikvanek.com/plAIground/mindsort/) 🚀


#### Step 1: Data Gathering and Initial Concept
{% render 'prompt.njk', code: 'Scrape to the bone two websites I give you as an attachment. One is a registry of social services in my region, the other one is a registry of health services in whole country. I want you to scrape all different types of services those two pillars serve to their clients and customers and then we do something more with it. Display those services you scraped as a comma-separated list of services.' %}

This prompt kickstarted the project. While the AI couldn't actually scrape websites, it provided a comprehensive list of health and social services based on the information shared. This step simulated the data gathering process that would typically involve actual web scraping or data analysis.

#### Step 2: Data Processing and Categorization
{% render 'prompt.njk', code: 'Reduce them to some broader categories based on similarity, say 20-30 tops.' %}

The AI condensed the extensive list into 20 broader categories. This step mimics the data analysis and synthesis phase of a design process, where raw data is transformed into more manageable, meaningful categories.

#### Step 3: Designing the Game Interface
{% render 'prompt.njk', code: 'From those categories create an interactive single page website that is an interactive card-sorting game which starts with user seeing all those categories. And then by intuitively combing them they can combine and thus categories of services.' %}

This prompt led to the creation of a basic HTML structure for the card sorting game, including drag-and-drop functionality and category creation. It demonstrates how complex design requirements can be communicated to AI and translated into functional code.
#### Step 4: Enhancing User Experience

{% render 'prompt.njk', code: 'Add a feature that allows to name each cluster' %}

The AI added functionality for users to name their created categories, enhancing the game's interactivity. This illustrates how specific feature requests can be easily implemented through AI assistance.
#### Step 5: Adding Result Submission
{% render 'prompt.njk', code: 'Add a feature that allows to send the results of the categorization to an email address kemboi@ezekiel.yup' %}

This prompt resulted in the addition of a "Send Results" button that compiles the user's categorizations and opens an email client with a pre-filled message. It showcases how AI can handle more complex functionalities involving data compilation and external actions.
#### Step 6: Improving Visual Design and User Guidance
{% render 'prompt.njk', code: 'Add a visual cue to nudge users to create between 6-8 categories. Use mild tones of pastel colors and add a counter that nudges positively to create more categories if there are less than 6. Be playful in copyrighting and use some sort of gratification pattern when there are 3, 2 and 1 category remaining to 6.' %}

The AI implemented a category counter with encouraging messages and visual feedback, using pastel colors to enhance the game's aesthetic appeal. This step demonstrates how AI can be directed to implement specific design patterns and user experience enhancements.
#### Step 7: Mobile Optimization
{% render 'prompt.njk', code: 'Make it mobile friendly' %}

This led to responsive design changes, ensuring the game works well on both desktop and mobile devices. It shows how AI can adapt existing code to meet different device requirements.
#### Step 8: Bug Fixes and Final Touches
The last few exchanges involved identifying and fixing a bug with the double-click functionality and making final adjustments to the code. This iterative process mirrors real-world development cycles where testing and refinement are crucial.
Reflections on the Process

### This project demonstrates several key points about AI-assisted prototyping in service design:

- Rapid Iteration: The ability to quickly generate and modify code allows for fast prototyping and experimentation.
- Bridging Design and Development: Designers with basic coding knowledge can create functional prototypes without extensive development skills.
- AI as a Collaborative Tool: The AI serves as a knowledgeable partner, offering solutions and suggestions throughout the design process.
- Importance of Clear Communication: The quality of the output heavily depends on the clarity and specificity of the prompts.
- Limitations and Oversight: While AI can generate code quickly, human oversight is crucial for ensuring functionality, security, and alignment with design goals.
- Learning Opportunity: Working with AI can help designers better understand coding principles and best practices.

### Challenges and Considerations
While this process was highly efficient, it's important to note some challenges:

- Prompt Engineering: Crafting effective prompts is a skill that requires practice and refinement.
- Consistency: Ensuring consistency across different AI-generated code segments can be challenging.
- Complex Functionalities: More advanced features may require more detailed prompts or human intervention.
- Testing and Validation: Thorough testing is crucial, as AI-generated code may contain unforeseen bugs or issues.

# Conclusion
AI-assisted prototyping represents a significant leap forward in the field of service or digital design. It allows designers to rapidly bring ideas to life, test concepts, and iterate quickly. However, it doesn't replace the need for design thinking or coding knowledge. Instead, it amplifies these skills, allowing designers to work more efficiently and focus on higher-level design challenges.

As this technology continues to evolve, we can expect even more sophisticated tools that further blur the lines between design and development. For service designers, embracing these tools while maintaining a critical eye and strong design principles will be key to success in this new landscape.

I encourage fellow designers to experiment with AI in their prototyping process. Start small, be curious, and don't be afraid to iterate. The future of design is here, and it's more accessible than ever.