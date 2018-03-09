---
title: Sitemap
layout: page

isFooterMenu: true
pageOrder: 10

carouselImg: thin/thin-4.jpg
testimonials: false
---
<p>Each page available on this website is listed below.</p>

<ul>
    {% for page in site.pages %}
        <li class="<%= if page.id is @document.id then 'active' else 'inactive' %>">
            <a href="<%= @getUrl(page.url) %>">
                {{ page.title }}
            </a>
        </li>
    {% endfor %}
</ul>