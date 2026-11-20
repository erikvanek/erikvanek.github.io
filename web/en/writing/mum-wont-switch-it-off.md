---
title: So Mum wouldn’t switch it off
subtitle: What could a digital assistant for finding your way through social and health services look like?
date: 2025-01-31
translationKey: mamka
translatedFrom: cs
permalink: /writing/mum-wont-switch-it-off/
---

<figure>
  <a href="/documents/writing/uzivatelska-studie-jarmilka.pdf"><img src="/img/writing/mamka/jarmilka-case-thumb.png" alt="Cover page of the study So Mum wouldn’t switch it off"></a>
  <figcaption><a href="/documents/writing/uzivatelska-studie-jarmilka.pdf">Read the full study (PDF, in Czech) →</a></figcaption>
</figure>

Imagine a woman of retirement age who is starting to care for her husband with Alzheimer’s disease. She is exhausted, doesn’t know who to call, and every form and every technical term pushes her further away from help. It was for her, and for people in similarly hard situations, that I designed a digital guide to the network of social and health services as part of the **Interaction Design** course. One quote I noted down while testing one of the prototypes summed up what such a tool should be like: friendly enough **that Mum wouldn’t want to switch it off**.

In Czechia social and health services form a whole network, but finding your way around it is hard even for the professionals who work in those services. Clients often have no idea who or what could actually help them, and the existing tools expect them to understand the language of the field before they can even start using the services. This study followed on from the **Access 4 all** project run by the JINAG agency, which delivers one of the South Moravian Region’s strategic goals: making residents better informed about the services available to them.

My goal was to find the best form for a tool that uses large language models (LLMs) to talk to people in natural language, so that it’s enough to describe your problem in your own words, without knowing the technical names. The tool got the name **Jarmilka**, and it was meant to answer one seemingly trivial question: _“What should I do when…?”_

## Why this?

Demographic change and an ageing population keep pushing demand for social and health services up, while the services themselves struggle with a lack of capacity. One of the reasons it grinds is surprisingly mundane: people know little about who or what could help them. They don’t get help in time because they don’t know what options exist.

So I didn’t want to design yet another static directory or register that puts the burden of finding your way through the options on the end user. I wanted a tool that lets people **find their way through the network of services without having to understand how that network works**: describe their situation in their own words and get to a first concrete step that can bring the help and support they need. To keep the scope manageable, I narrowed the target group to people in situations that need longer-term care and support (Mrs Magda and her husband with Alzheimer’s, Petr, a student with anxiety, Jana, a single mother with an autistic son). I deliberately left sudden and acute crises aside, as they would put a completely different set of demands on the interface.

I described users’ needs, drawn from earlier qualitative research, as four [jobs to be done](https://jobs-to-be-done.com/jobs-to-be-done-a-framework-for-customer-needs-c883cbf61c90) that capture why clients might use a tool like this:

- get through a hard life situation confident of choosing the right service,
- secure a dignified life for myself or my loved ones even when we can manage less on our own,
- find my way through the options for help, trusting the path I choose,
- prevent the situation from getting worse by acting in time.

## How I went about it

I worked through the project following the principles of the **double diamond**. The research half, mapping the needs of clients and other actors, had already happened as part of Access 4 all (15 in-depth interviews with clients, services and representatives of towns and municipalities, building on broad desk research and interviews with the region’s key stakeholders). My study starts from those findings and continues with the second diamond: from exploring the concept to a tested second version of the tool.

<figure>
  <a href="/img/writing/mamka/jarmilka-double-diamond.png"><img src="/img/writing/mamka/jarmilka-double-diamond.png" alt="Double diamond diagram: the left diamond (mapping needs, defining problems) happened within Access 4 all, the right diamond (concept exploration, first version, finding flaws, second version) is the user study"></a>
  <figcaption>The left diamond happened within Access 4 all, the right one is this study. (Click for full resolution.) Double diamond model: <a href="https://www.designcouncil.org.uk/our-resources/the-double-diamond/">Design Council</a>.</figcaption>
</figure>

The first step of the design phase was an **ideation workshop at the AI Days event**. Three groups working in parallel, including people from real services and the CTOs of an established company and an AI startup, explored what LLMs let us do for a tool like this today, and what to actually expect from it. The workshop opened themes that ran through the whole project: escalating to a live person in an emergency, how trustworthy a digital tool can be in sensitive situations, and the pros and cons of anthropomorphism (how far to “humanise” the tool and give it a more “human” identity).

From a review of existing AI tools and the literature I defined the **interaction principles** I leaned on while designing: _learnability_ (the tool is used rarely, so it has to make sense even after a long break), _progressive_ and _staged disclosure_ (don’t show everything at once, and take pressure off the quality of the first interaction), _explorability_ (try the tool safely without fear of mistakes) and honest _progress indicators_ (so users know where they are in the process and what’s coming next). Alongside them, a set of design patterns for AI tool interfaces: _re-stating_ (the system retells what it understood), _suggestions_ and _open input_. Even the name Jarmilka is a deliberate **metaphor**: it sets the expectation that someone is here with me and the system is guiding me.

Then came sketching. I moved from a high-level view to concrete screens, went back to old ideas and threw out the ones that led nowhere. On paper I built myself a modular system so I could quickly lay screen variants side by side. The whole time I kept asking myself one question: _“What’s the leanest version that gets the user to their goal and doesn’t distract them with anything extra?”_ Out of that came a five-step process that Jarmilka guides users through: **trust → describe → check → choose → contact**.

## Testing with people

<figure>
  <a href="/img/writing/mamka/jarmilka-testing-paper.png"><img src="/img/writing/mamka/jarmilka-testing-paper.png" alt="A participant’s hand working through the paper prototype of Jarmilka on a café table, with coffee and notes beside it"></a>
  <figcaption>The paper prototype in action: moderated testing. (Click for full resolution.)</figcaption>
</figure>

I validated the first version with **moderated usability testing** combined with its offshoot **RITE**, which means fix and test as you go. I went through it with five people from the target group, each on the same scenario of six connected tasks, thinking aloud. After the first and third tests I worked changes into the design, so the last two tests were already checking a much better version. Each session ended with the standard **SUS** questionnaire.

The most valuable part was watching where users “got lost”. By far the most problematic moment was the transition between the first and second steps: the layout of the controls changed between them, and users reported visual overload at exactly the moment when trust in the tool hadn’t had time to form yet.

> “I ended up in a different mode and I don’t know what it wants from me here. There’s no trust built up, so I’m scared to write sensitive stuff. It makes me feel all fragile.”

Four themes to improve before the second version crystallised from the observations and data analysis:

- **Visual overload.** The same data in two different elements and forms (bullet points and full text) overwhelmed users more than it helped.
- **Consistent, clear copywriting.** Inconsistent terminology and, in places, language that was too technical and impersonal. (_“The term time perspective is really abstract, I’d have to think about it a lot.”_)
- **Clear navigation between steps.** The transition between steps wasn’t readable enough; I hadn’t got the principle of staged disclosure right yet.
- **More trust.** Building trust at the start is the key moment for a tool like this. Where it was missing, it spoiled the whole rest of the interaction.

## The final version

The findings led to a **second version** that fixes the most serious problems and is built as a digital interactive prototype. I unified the controls, the introduction is friendlier and says up front how long the interaction takes. The wording is more personal and less stigmatising, the follow-up questions are more specific, and in the service detail the confusing elements gave way to a single clear action.

<figure>
  <a href="/img/writing/mamka/jarmilka-laptop.png"><img src="/img/writing/mamka/jarmilka-laptop.png" alt="The opening screen of the final version of Jarmilka in a browser window on a laptop"></a>
  <figcaption>Jarmilka, second version: the opening screen, which welcomes users and builds trust. (Click for full resolution.)</figcaption>
</figure>

You can **[click through the interactive prototype of the second version yourself](https://www.figma.com/proto/bfxhhYTW26rwx3KTTqx1GS/Jarmilka?node-id=9-2&p=f&viewport=237%2C1264%2C0.25&t=yPvV5ZNldI2a81JY-0&scaling=scale-down&content-scaling=fixed&starting-point-node-id=9%3A3)** (in Czech). I wrote up the whole story, from goals and interaction principles through testing to recommended next steps, in a **[study you can read (PDF, in Czech)](/documents/writing/uzivatelska-studie-jarmilka.pdf)**.

## Next steps

There are countless ways to take this further. The most important step is to check that the changes really were for the better. Cheaper unmoderated testing would be plenty for that, this time aimed mainly at **building trust**, which there was no room for in the first round and which turned out to be key. Beyond that there are plenty of ideas that didn’t fit into the first version: voice input, saving and exporting results, passing the gathered information on to services at first contact, elements of [generative UI](https://www.nngroup.com/articles/generative-ui/), or an “I need help right now” feature for acute situations.

Of everything in my DIS studies, this project moved my “hard” design skills forward the most. I was on one project from defining priorities and the research intent all the way to delivering a tested solution, and I value that experience enormously. I enjoyed exploring the hyped topic of AI through a design lens, and I still feel the right patterns are only now being found, and that it’s actually quite fun to be there while it happens. I also summed up the whole story of the study in a [semester presentation](https://www.erikvanek.com/ixd-25/) for the interaction design course.

_And thanks to Verona, Baru and Andrea for the internal design critique, which was one of the highlights of the semester and moved my design a good step further. Thanks also to the JINAG agency for the chance to work on the project, and to everyone who sat down with the paper prototype and honestly thought aloud. Without you, Jarmilka would have stayed just a nice idea._

**[I describe the project in more detail in my bachelor’s thesis (in Czech)](https://www.erikvanek.com/dis-kisk/thesis/)**
