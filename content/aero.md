---
title: "Fresh greens all year long"
date: 2018-03-23T20:02:36+01:00
draft: true
---

This is one of my sideprojects I've been working on mainly during 2016 and 2017. It stems from two major facts (both connected though). First is that one of my biggest hobbies is food. Second is that it's impossible to prepare good food (at least how I see it) without fine ingredients. I do not mean fancy. Rather fresh and full of taste, preferably seasonal and local.

This is even more obvious outside of green season say between mid October til the beginning of May. Grocery stores offer some kind of veggies and fruit, but usually quite blend and tasteless. Not mentioning their carbon footprint. Or is it too much not to expect apples from South America in Central Europe? This easily can get to some rant about globalization, multinational corporations etc. I do not want to get there. At the end, it's the people's purses that drive the economy.

What I wanted to try was to create a prototype of self-supplying system, that would partially satisfy my needs for fresh veggies during off season. It was built using artifical LED lights, DIY aeroponics system and some small tooling for monitoring.


[![Continous herbs harves - clicking on image leads you to three months timelapse video](/img/basil-crops.jpg)](https://www.youtube.com/watch?v=-G95A098uSY "Growing basil in aeroponics timelapse")
*Continous herbs harves - clicking on image leads you to three months timelapse video*

## Feeding ever growing cities

There's another challenging idea related to this project. Thanks to urbanization, more and more people are moving from rural areas to cities. This fact is not going anywhere in next decades if ever.

How to feed them? And how to do that sustainably given the fact that our planet has limited resources? How about water consumption that is soon (actually it [is](https://www.independent.co.uk/environment/cape-town-drought-day-zero-climate-change-global-warming-south-africa-a8236511.html) even as of writing this article) going to be a big issue? It looks like agricultural concepts from past are no longer enough for feeding growing population of people around.

Current foodchains also heavily rely on usage of transportation from countries that have better conditions for growing greens. Especially during winter, only several _lucky_ countries have the chance to grow greens for their own consumption (and for export then as well). It would be nice to reduce this need of environmentally harmful transportation with more ecological ways of planting greens. It might not be applicable to all of them, but hey, something is better than nothing.

## Main idea

All right, so here comes the thing. Main concept was to create low-pressure aeroponics growing system to produce some greens for personal use. Using high quality LED lights as a source of light for plants in winter season. When deciding what material to use for _box_ construction, I was strongly emphasizing potential scalability. Currently we're talking _only_ about scaling horizontally. Using more solid construction, vertical scalability is achievable as well. My idea was to create easily replicable _box_ with base of one square meter roughly 1,5m tall.

![Growing box with lights on](/img/box-in-system.jpg)
*Growing box with lights on*

What's nice about these systems is when designed properly, they are easily maintainable. Depending on your reservoir capacity, it should not be a problem to go for a week long vacation without plants having to suffer. I did and it was nice to see the progress plants have made during that time :). Also there's a huge potential for automation of temperature control, humidity, nutrient solution parameters and many others. Honesly I have not done far with those because I did not consider them important in my case, but those should bring this whole thing to another level.

Majority of used equipment was bought in regular hobby markets with two exceptions. Those are Raspberry PI with USB camera and custom made LED light by my friend [Roman Pavelka](http://romanpavelka.cz/) (thanks for that!).

### Used components

- custom made LED light - 100W red and blue combination - 4 15W red LEDs and 4 10W blue LEDs with best wavelengths available at the time of making,
- grow system consisted of:
	- two euro containers - 60cm width × 30cm depth × 40cm height,
	- low pressure water pump for aquariums - 35W input, 2000l/h lift,
	- some plastic plumbing,
	- rotary jets,
	- timing clock,
- _L-shaped_ profiles similar to create main construction,
- diamond foil to ensure proper light reflection.
- some fans to keep plants moving, have better air circulation and stronger stems
- Raspberry PI with USB camera

There are still two main questions to answer to justify used technology.

#### Why aeroponics? 
The main reason was that I had previous experience with aeroponics and that experience was quite joyful. With reservoir big enough so it's possible to stabilize pH and EC values, aeroponics is pretty simple to setup and maintain later on. One of the biggest advantages of aeroponics (and or hydroponics) is saving water. Water does not get dispersed within soil, it is _recycled_ back to reservoir and used again and again (needs to be changed from time to time though). I have mentioned hydroponics that is at least from my perspective a bit more popular method of growing. The reason I prefer aeroponics more is the fact that root system has more oxygen available (therefore plants should be healthier) and because it's not needed to supply that much nutrients. I believe (but opened to discussion) that moderation in nutrients is a good choice. Also it has economical advantages if nothing else.

#### Why LED lights?
Using LED lights was a no brainer for me. Even though they are still quite expensive, their efficiency seems incomparable to other light sources. This goes hand in hand with the fact, that plants only need specific parts of light spectrum so that photosynthesis happens properly. Second benefit is that they emit hardly any heat so that there's no big need for some temperature adjustment. Their expected lifespan is also important attribute worth considering.

## How it all went

I was growing with two different plant compositions. At first I wanted to grow more demanding plants like tomatoes and strawberries or radishes. Later on I found out it will be a bit easier (especially in terms of manipulation and maintenance) to grow plants that are more similar to each other. Good candidates for these are various types of herbs. Different varieties of basil proved to be really worth growing in terms of harvest volume and taste as well.

![Copious amounts of basil](/img/bush-from-top.jpg)
*Copious amounts of basil*

There are some lessons learnt along the way. Probably the biggest was mentioned in previous paragraph. 

As I had limited amount of space, I wanted to stuff all those types of plants to that place. It just does not work right. Different plants have different needs, grow at different speed, they heights differ etc. Given the fact that the LED panel emits light in _flat fashion_, we want to have all plants more or less of equal height. This was not possible having tomatoes and radishes at the same time.

Secound round of growing was much more enjoyable in terms of harvest volume. It actually ended up that basil has taken over other plants and all of a sudden the box felt like one big bush of basil. I did not mind that. Also in that second round, I started experimenting with cloning. 

One of the reasons that the box is not running right now is that it was situated roughly three meters from my bed. While it is an awesome visual alarm clock when timer set properly, constant turning water pump on and off gets annoying in time. It was possible to make it for those several months, but I would not recommend sleeping next to that to anyone.

![Healthily looking root system](/img/roots.jpg)
*Healthily looking root system*

![Tomatoes root system length illustration](/img/roots-profile.jpg)
*Tomatoes root system length illustration*

Probably the most room for improvement was temperature regulation in reservoir. Recommended temperature lies around 20°C. Especially during hotter months temperature in reservoir tries to match the one in the room. Then roots get sleazy and plants suffer in general. Proper reservoir temperature regulation is inevitable in order to be able to have the system running for longer periods of time.

## Why all this?

Mostly because it's quite fun to have this geeky playground around. When growing aeroponically you have quite fast feedback loop from your plants as opposed to growing _normally_ in soil. When you screw something up, you'll find out really soon :). Plants seem to be more vital, they tast amazingly well. Having this kind of freshness in winter months is really hard to get even in fancier grocery stores around.

Also I wanted to find out how hard is to have whole system running for several months without downtime. Even though I had some minor issues with my plumbing setup, the system was up and running for almost ten months without interruption. I removed artificial light in summertime because it was not necessary to use it.

If I hade one spare room, I'd definitely continue with this. Obvious second step would be to add more automation / monitoring to the whole system.