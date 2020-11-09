---
title: "Design matters 2020 conference review"
date: 2020-11-07
draft: false
layout: article.njk
---

- Organized in Copenhagen in nicely renovated Copenhagen Contemporary industrial building.
- Focused on digital design.
- Includes several (also remote-first) workshops.
- Two day single track with few differences between physical and remote participation.
- Possibility to get remote-first tickets.

## Review format
I'm going to cover most interesting talks from my point of view and then I'm adding few general remarks from remaining talks. Also I'd like to compile a set of pros and cons about the conference in general.

## Talk notes

### Creating Friendly Web Forms For How Humans Really Think
#### Vitaly Friedman
- Super energetic talk driven by Vitaly's inner drive to make forms on web more helpful and usable to their users.
- Web forms often mimic what is being used in paperwork which does not need to necesarily work in digital world.
- It is generally good to *focus on tabbability* (to be able to navigate without the mouse / touchpad interaction). This leads to higher accessibility and helps to speed up user interaction.
	- "Using mouse to move between fields, ready to type takes 1900ms" - then multiply by the amount of user interface controls...
- *Forms should not mimic database structures* but rather human mental models. Bad example is to have two fields for first, second and maybe a middle name. Why can't we just have a name field?
- Avoid dropdowns whenever possbile. Prefer buttons, sliders or at least provide an autocomplete to them. If dropdown is a must, try to have ~ 7 items (7.5 is nice since it shows there's a scroll area) displayed in the list at most. Bad example are looong lists for country selectors.
- Try to pre-fill input fields if possible. It could be even dynamic (e.g. Volvo for Sweden users, Ford for people from USA).
- *'Reward early, punish late'* - general mindset to adhere to when validating data. Good example would be typical 'Repeat your email field'. It is not needed when registering the user for example. If email is such a crucial information, why not double checking it during important action(e.g. first order being finalized)?
	- "60% of customers will consistently copy/paste their email address when asked to verify it in the eCommerce checkout, especially on mobile".
- There are three validation types - premature, immediate & late and all of them are partially wrong and interrupt users. Bad validation can cause severe headache.
- Good practices - [Inline validation in Forms](https://alistapart.com/article/inline-validation-in-web-forms/), [Design checklists by smashing magazine](https://www.dropbox.com/s/ve6m3ngp5rmgu74/interface-design-patterns-checklist-2020.pdf?dl=0).
- There's long debate on whether to mark required or optional fields - ideally mark both. The amount of visual clutter is not high if form does not contain dozens of fields. Use red asterisk and grey (Optional) as investigated by Baymard institute.
- Few fun observations:
	- Datepickers for birthdays starting at current year should contain more sensible default value to limit user clicks .
	- Slider for question: 'Do you have children?' capped with max value of 10.
	- Disabled controls do not often tell the story why they are disabled, it is then hard to find out what needs to be done to enable them.
	- Single column layouts just work the best, no need to be fancy here.
	- Captcha is not what it used to be anymore - "Bots got so advanced that it’s now nearly impossible to generate images that are easy to solve for humans but unsolvable for bots. AI can solve most difficult distorted texts with 99.8% accuracy while humans with 33%.".

### The future of workshops
#### Kea Zhang
- *Difference between workshops and meetings* - workshops try to reach a consensus on a topic with active participation, meetings are more frontal and look more for passive listening.
- There's a significant change in how people collaborate and workshops should adopt to that due to COVID-19.
- What works in person does not need to necesarily work remotely.
- The most problematic part when conducting workshops remotely is *engaging participants*.
- It is way easier to context switch to a next Jira ticket or Slack notification when being participating remotely.
- Key ingredients for a good workshop are *goal, topics & timing*. Those should be ideally prepared upfront so that participants can familiarise with them at their own speed.
- If there's a online workspace needed for a workshop, prepare it in advance.
- Each participant should participate equally (a bit difficult to measure in real world).
- Really important to *open* (e.g. present the agenda well) *and close* (e.g. summarize what was done and follow-up action items) well each session.
- Use warm-up icebreakers to raise the energy levels, even stupid questions like:
	- "If last iteration was an animal, what would it be?", "On a scale 1-10 how would you rate ...?", "What single thing should we celebrate from work done in last iteration?" - just to get people start talking.
	- You can also use something like [mentimeter](https://www.mentimeter.com/) to ask few easier questions connected to workshop topic. It is then easy to visualize participants energy / familiarity with the topic or whatever we ask them.
- It is way harder to self-organize remotely, when a broader audience needs to be present. Consider breaking it into smaller sub-groups.
	- Zoom has a feature called 'break-out'.
	- It could be that the session starts with all participants, then gets broken down into multiple smaller ones and it gets closed again together.
	- Similar to [divergence and convergence](https://miro.medium.com/max/700/1*3noihi4CGXPZAgevbk87Yg.jpeg) principle in double diamond.
	- Goal is the main aim why the workshop. 
- Ensure at least 5 minutes per hour brakes to avoid fatigue.
	- Phrasing "Let's start again 12:05" is way better than "Get back in 5 minutes".
- Attention span is shorter remotely that in person due to the lack of non-verbal signals.

### KHORA – When Virtual Reality becomes the key to treat schizophrenia
#### Nicole Fronc Dumanski
- Project funded by Danish inovation fund.
- Using VR to help people with schizophrenia to 'connect' to inner voices they are hearing in their daily lifes.
- Each delusion gets its own avatar created in virtual reality and voice profile connected to it so that it matches the voice in the head of the patient.
- It is a bit tricky to create the avatar though because it often exists only in a form of a voice.
- Avatar is then being impersonated by a therapist in a way that the patient can 'safely' interact with it.
- The main idea is by having this 'safe space environment' therapists can 'control' the behavior of avatars in a safe way.
- The main assumption is that when patients start to interact more with these visualised avatars, it decreases the chance of patients blindly following their instructions.
- Main focus is given to creating 'bond' between the patient and the avatar.
- Using this controlled environment can also decrease the amount of stress patients are suffering from when being exposed to their delusions.
- It is still experimental technology which demands a lot of technical skills from therapists which is often lacking in their skillsets.
- [Video](https://www.youtube.com/watch?v=AHYau6kk8VI) available here to showcase the whole project.

### Unbiased design: Why it matters
#### Kevin Bickham
- Works for McKinsey & Company which puts diversity and inclusion as one of their core values.
- Main aim of this talk is to identify and try to avoid unconscious biases during design process.
- Interesting question asked - *"Should be design a tool for a political activism?"*.
- "Addressing racial inequities in customer experience can increase the
effectiveness of public services where they are needed most"
- The most important part when tackling the topic of a bias is to focus on empathizing properly.
- Proper empathy is the main tool for proper inclusive research.
- Accessibility should not be just an icing on top of a service but an integral part of service for broader audience.
- They are setting internal KPIs aligned to racial equity that are continously evaluated to promote diversity in McKinsey & Company.
- "Get comfortable with the uncomfortable" mindset
- [Designer's critical alphabet](https://www.etsy.com/listing/725094845/a-designers-critical-alphabet) is a nice little tool to leverage when focusing on doing more inclusive research.
- _meta analysis_ - continuously assessing the research process itself and adopting it if has some missing parts / problems spotted.
- More empathy can be achieved by switching from more top-down HCD into more bottom-up *[CCD(Community-centered-design)](https://jnd.org/community-based-human-centered-design/)*
	- HCD works better for mass production of individual products, CCD is aimed more towards self-organized communities that know what are their problems and can work on their solutions by themselves. They just need a bit of guidance or mentoring.
	- These two approaches can also pretty well work together, not just one or the other.
	- [Scaling down](https://reader.elsevier.com/reader/sd/pii/S2405872617300552?token=FE61644E6A6ECF126A16CED35303282DB4E9A3FA589F861FDCBF9D98CAF8D14F28E5BA42C8991E3903BBB486AF52A622) by Jeremy Meyerson proposes five main principles for CCD:
		- Cultivate a Participatory Mindset—Not an Expert One
		- Make the Process Design-Infused—Not Design-Led
		- Design for People—Not Personas
		- Aim for Engagement—Not Abstraction
		- Build on Assets—Don’t Just Minimize Deficits
	- As usual, it is not a silver bullet - CCD's main drawbacks are that it is easier to get stuck in some rabbit holes compared to HCD. Solutions working for one community does not need to work globally.

### Misinformation – A designer’s toolkit to managing misleading information on Twitter
#### Anita Butler
- Works as a designer in Twitter trying to reuse the spread of missleading information.
- Proactive X reactive approach - depends on the context where is user faced with the platform.
- Core design principals:
	- Encourage good behavior 
	- Be explicit about consequences and rewards
	- Provide clarity
	- Balance flow and friction
- Main idea is to *elevate reliable and de-emphasize irrelevant content*.
- Proactive help in cases like “I stumble upon a news headline about the number of coronavirus cases in China and I immediately share it.” whereas reactive in “I’m angry....I wish there was a way we could know what is real and what is not.”.
- *People share unread content* just based on its headline.
- Showcased their prototyping process with hypothesis "Customers are less likely to retweet unreliable sources if they read the article and notice facts or evidence missing.".
- Case study mostly focused on retweeting behavior.
- Showcased one proactive approach - prompt displayed before retweeting and one reactive - possibly misleading content labeling.
- "When Twitter detects a URL in someone’s tweet, the reader is prompted to consider reading the article before re-tweeting it."
- After few iterations, they were able to:
	- Increase the amount of users that read the content before they retweeted.
	- Decreased the amount of retweets (that's debatable imo), amount of retweets and shares.

## Random notes
- Interesting museum called [Museum of the future](https://www.museumofthefuture.ae/) being constructed in Dubai
- Fun project called [Objective realities](http://www.simonerebaudengo.com/project/objectiverealities) depicts how commonly IoT devices _might_ perceive our world if those were alive
- Mozilla researched that In the US, teens spend ~7.5 hours on screens per day, pre-teens spend ~5 hours.
- Fortnight gets 2.4 bln $ yearly as ingame revenue - completely new in-app economy out there.
- Localizing a service like Wikipedia is a huge problem. Different reading direction, different interaction patterns, best practices, copyrighting. It's not really about _just translating those resources_ to more languages.
- [Wikipedia](https://phabricator.wikimedia.org/) is radically open-sourcing its internal decision processes and product-related debates.
- Dropbox VP of design pro actively blocks part of his weekly schedule to mentor & support colleagues from underrepresented communities.

## Conference Pros & cons
+ Remote-first tickets - it really felt genuine to participate remotely which is not easy to achieve.
+ Everything really well on-time and well prepared.
+ Vitaly's energy during his talk :)
- Maybe missed/false expectations - a good portion of talks were nice to listen to, but did not take that many takeaways from them.
- A lot of time spent saying 'who am I' versus the 'real' content of speakers talks. I'm not that much interested in them, I'm more into hearing their thoughts.
- It felt a bit unbalanced towards technooptimism from my perspective.