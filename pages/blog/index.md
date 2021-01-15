---
layout: blog.njk
title: Blog
date: 2020-11-11
---
## yo yo yo blog :)


{% for post in collections.posts %}
{{ post.data.title }}
{% endfor %}